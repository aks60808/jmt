import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useUser, SignInButton, UserButton, auth } from "@clerk/nextjs";
import { RouterOutputs, api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { useState } from "react";
import { LoadingPage, LoadingSpinner } from "~/components/loading";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import RatingStars from "~/components/ratingstars";
import { toast } from "react-hot-toast";

type PostWIthUser = RouterOutputs["posts"]["getAll"][number];
const PostView = (props: PostWIthUser) => {
  const { post, author } = props;
  return (
    <div key={post.id} className="flex gap-3 p-4 ">
      <div className="flex-col">
        <div className="flex items-center pb-3">
          <Image
            src={author.profilePicture}
            alt={`${author.username}`}
            className="mr-1 h-14 w-14 rounded-full"
            width={56}
            height={56}
          />
          <div className=" ml-3 flex flex-col">
            <div className="flex flex-col text-slate-600">
              <div className="flex justify-start">
                <span>{author.username}</span>
              </div>

              <span className="flex">{`${post.createdAt.toDateString()}`}</span>
              <RatingStars rating={post.rate} fixed={true} />
            </div>
          </div>
        </div>

        <span className="flex  text-left">{post.content}</span>
      </div>
    </div>
  );
};
const CreatePostWizard = () => {
  const { user } = useUser();
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [input, setInput] = useState<string>("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage) {
        if (errorMessage[0]) toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });

  if (!user) return null;
  return (
    <div className=" flex w-full flex-col  items-center justify-between  gap-3">
      {/* first row */}
      <div className="flex w-full  gap-3">
        <Image
          src={user.profileImageUrl}
          alt="profile"
          className="h-14 w-14 rounded-full"
          width={56}
          height={56}
        />
        <div className="flex flex-col">
          <span className="flex">{user.fullName}</span>
          <RatingStars
            hoverHandler={setHoverRating}
            rating={5}
            fixed={false}
            hoverRating={hoverRating}
          />
        </div>
      </div>
      {/* second row textarea */}
      <div className="flex w-full  gap-3">
        <Textarea
          rows={10}
          className=""
          placeholder="Leave your review here :)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isPosting}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
            }
          }}
        />
      </div>
      {/* third row */}

      <div className="flex items-center">
        {input !== "" && !isPosting && (
          <Button
            variant="outline"
            className="flex h-8 w-14 rounded-md border bg-slate-400 text-slate-100 "
            onClick={() => {
              mutate({ content: input, rate: hoverRating ?? 5 });
            }}
          >
            Post
          </Button>
        )}
        {isPosting && <LoadingSpinner />}
      </div>
    </div>
  );
};
const CocktailSection = () => {
  const { data, isLoading: postsLoading } = api.cocktails.getAll.useQuery();
  if (postsLoading) return <LoadingPage />;
  console.log("cocktails", data);
  if (!data) return null;
  return (
    <div>
      <ul className="flex flex-wrap  justify-evenly p-2">
        {/* {[...data]?.map((cocktail) => {
          return <li key={cocktail.name}>{cocktail.name}</li>;
        })} */}

        <li className="p-2">
          <Image
            width={100}
            height={200}
            alt="cocktail1"
            src="/cocktail1.jpg"
          />
          {data[0]?.name}
        </li>
        <li className="p-2">
          <Image
            width={100}
            height={200}
            alt="cocktail1"
            src="/cocktail1.jpg"
          />
          {data[1]?.name}
        </li>
      </ul>
    </div>
  );
};

const ReviewsPosts = () => {
  const { data, isLoading: dataLoading } = api.posts.getAll.useQuery();
  if (dataLoading)
    return (
      <div className=" mb-6 flex w-full gap-3 rounded-2xl border-2 p-6">
        <div className="w-full">
          <SkeletonPost />
        </div>
      </div>
    );
  if (!data) return null;
  console.log("posts", data);
  return (
    <div className=" mb-6 flex w-full gap-3 rounded-2xl border-2 p-6">
      <div className="w-full">
        {[...data]?.map((fullPost) => (
          <PostView {...fullPost} key={fullPost.post.id} />
        ))}
      </div>
    </div>
  );
};

const SkeletonPost = () => {
  return (
    <div className="flex gap-3 p-4 ">
      <div className="flex-col">
        <div className="flex pb-3">
          <Skeleton className="h-12 w-12 rounded-full bg-slate-100" />
          <div className=" ml-3 flex flex-col">
            <div className="flex flex-col gap-3 text-slate-600">
              <Skeleton className="h-4 w-[100px] bg-slate-100" />
              <Skeleton className="h-4 w-[100px] bg-slate-100" />{" "}
            </div>
          </div>
        </div>
        <Skeleton className="h-4 w-[400px] bg-slate-100" />
      </div>
    </div>
  );
};
const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();
  const [reviewClicked, setReviewClicked] = useState<boolean>(false);
  // start fetching asap (react will use this cache)
  api.posts.getAll.useQuery();
  api.cocktails.getAll.useQuery();
  // return empty div if user isn't loaded yet
  if (!userLoaded) return <div />;

  return (
    <>
      <PageLayout>
        <div className="">
          <div className="flex cursor-default  flex-col items-center justify-center">
            <div className="h-screen w-full bg-[url('/bar.JPG')] bg-cover bg-center">
              <div
                className="flex h-screen w-full flex-col items-center  justify-center bg-slate-600/50 
             backdrop-brightness-75"
              >
                <span className=" text-center text-5xl  text-slate-100">
                  Welcome to JMT Bistro
                </span>
                <p className="text-xl italic text-slate-100">
                  A place to lift your spirit
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col py-2 text-center">
          {/* <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-300 dark:bg-gray-700 md:my-10" /> */}

          <div className="border-1 border-slate-900 ">
            <a className=" text-3xl">Cocktail Released</a>
            <p className="italic">
              Cocktails inspired by local ingredients and fascinating stories
            </p>
            <CocktailSection />
          </div>
          {/* <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-300 dark:bg-gray-700 md:my-10" /> */}

          <div className="border-1 border-slate-900 ">
            <h2 className="text-3xl">Reviews</h2>
            <div className="container pt-3">
              <ReviewsPosts />
              {!isSignedIn && (
                <span className="flex justify-center pb-3 italic text-slate-400">
                  Sign in to leave your review🥰
                </span>
              )}
              <div>
                {isSignedIn && !reviewClicked && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setReviewClicked(!reviewClicked);
                    }}
                    className="bold rounded-xl border bg-slate-800 p-3 text-xl text-slate-100"
                  >
                    Leave your review!
                  </button>
                )}
              </div>
              {isSignedIn && reviewClicked && (
                <div className="flex p-6">
                  <CreatePostWizard />
                </div>
              )}
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Home;

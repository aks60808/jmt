import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useUser, SignInButton, UserButton, auth } from "@clerk/nextjs";
import { RouterOutputs, api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { useState } from "react";
import { LoadingPage, LoadingSpinner } from "~/components/loading";

type PostWIthUser = RouterOutputs["posts"]["getAll"][number];
const PostView = (props: PostWIthUser) => {
  const { post, author } = props;
  return (
    <div key={post.id} className="flex gap-3 p-4 ">
      <Image
        src={author.profilePicture}
        alt={`${author.username}`}
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <div className=" flex flex-col">
        <div className="flex text-slate-600">
          <span className="mr-3">{author.username}</span>
          <span className="flex">{`on ${post.createdAt.toDateString()}`}</span>
        </div>

        <span className="flex">{post.content}</span>
      </div>
    </div>
  );
};
const CreatePostWizard = () => {
  const { user } = useUser();
  if (!user) return null;
  return (
    <div className="flex  gap-3 ">
      <Image
        src={user.profileImageUrl}
        alt="profile"
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <input
        placeholder="leave your review"
        className="bg-transparent outline-none"
      />
    </div>
  );
};
const CocktailSection = () => {
  const { data, isLoading: postsLoading } = api.cocktails.getAll.useQuery();
  if (postsLoading) return <LoadingPage />;
  console.log("data", data);
  return (
    <div>
      <ul className="flex flex-wrap justify-evenly p-2">
        <li className="p-2">
          <Image
            width={100}
            height={200}
            alt="cocktail1"
            src="/cocktail1.jpg"
          />
          Monk
        </li>
        <li className="p-2">
          <Image
            width={100}
            height={200}
            alt="cocktail1"
            src="/cocktail1.jpg"
          />
          Monk
        </li>
        <li className="p-2">
          <Image
            width={100}
            height={200}
            alt="cocktail1"
            src="/cocktail1.jpg"
          />
          Monk
        </li>
        <li className="p-2">
          <Image
            width={100}
            height={200}
            alt="cocktail1"
            src="/cocktail1.jpg"
          />
          Monk
        </li>
        <li className="p-2">
          <Image
            width={100}
            height={200}
            alt="cocktail1"
            src="/cocktail1.jpg"
          />
          Monk
        </li>
        <li className="p-2">
          <Image
            width={100}
            height={200}
            alt="cocktail1"
            src="/cocktail1.jpg"
          />
          Monk
        </li>
        <li className="p-2">
          <Image
            width={100}
            height={200}
            alt="cocktail1"
            src="/cocktail1.jpg"
          />
          Monk
        </li>
      </ul>
    </div>
  );
};
const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();
  const { data, isLoading: dataLoading } = api.posts.getAll.useQuery();
  // start fetching asap (react will use this cache)
  // api.posts.getAll.useQuery();
  // return empty div if user isn't loaded yet
  if (!userLoaded) return <div />;
  if (dataLoading) return <LoadingPage />;
  if (!data) return <div>Something went wrong</div>;
  // if (isSignedIn && !user.id) return <div>loading...</div>;
  console.log("user", user);
  console.log("posts", data);
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
                  {" "}
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
          <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-300 dark:bg-gray-700 md:my-10" />

          <div className="border-1 border-slate-900 ">
            <h2 className="pb-6 text-3xl">Reviews</h2>
            <div className="container">
              {user && (
                <div className=" mb-6 flex w-full gap-3 rounded-2xl border-2 p-6">
                  <div className="w-full">
                    {[...data]?.map((fullPost) => (
                      <PostView {...fullPost} key={fullPost.post.id} />
                    ))}
                  </div>
                </div>
              )}
              {isSignedIn && (
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

import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { useState } from "react";

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();
  // start fetching asap (react will use this cache)
  // api.posts.getAll.useQuery();
  // return empty div if user isn't loaded yet
  if (!userLoaded) return <div />;
  // if (isSignedIn && !user.id) return <div>loading...</div>;

  return (
    <>
      <PageLayout>
        <div className="">
          <Image
            src="/bar.jpg"
            alt="JMT bar"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        <div className="flex flex-col text-center">
          <div className=" flex flex-col p-4 ">
            <h1 className="text-5xl">Welcome to JMT Bistro</h1>
            <p className=" text-xl italic">A place to lift your spirit</p>
          </div>

          <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-300 dark:bg-gray-700 md:my-10" />

          <div className="border-1 border-slate-900 ">
            <a className=" text-3xl">Cocktail Released</a>
            <p className="italic">
              Cocktails inspired by local ingredients and fascinating stories
            </p>
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
          </div>
          <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-300 dark:bg-gray-700 md:my-10" />

          <div className="border-1 border-slate-900 ">
            <h2 className="pb-6 text-3xl">Reviews</h2>
            <div className="container">
              {user && (
                <div className="mb-6 flex gap-3 rounded-2xl border-2 p-6">
                  <Image
                    src={user.profileImageUrl}
                    className="h-14 w-14  rounded-full "
                    alt={`@${user.username}'s profile picture`}
                    width={56}
                    height={56}
                  />
                  <div className="flex flex-col">
                    <div className="flex gap-1 text-slate-300">
                      <Link href={`/@${user.username}`}>
                        <span>{`@${user.username} `}</span>
                      </Link>
                      {/* <Link href={`/post/${post.id}`}>
                            <span className="font-thin">{` · ${dayjs(
                              post.createdAt
                            ).fromNow()}`}</span>
                          </Link> */}
                    </div>
                    <p className=" text-left text-xl">
                      Excellent taste and presentation. French style portions
                      size . We went for the set menu with 3 dishes: entree,
                      main and dessert. But if one person in the table wants to
                      go for a single dish can't. All in all out.😍
                    </p>
                  </div>
                </div>
              )}
              {isSignedIn && (
                <div className="flex p-6">
                  <Image
                    src={user.profileImageUrl}
                    className="mr-2 h-14  w-14 rounded-full "
                    alt={`@${user.username}'s profile picture`}
                    width={56}
                    height={56}
                  />
                  <input
                    placeholder="Leave a comment here!"
                    className="grow bg-transparent outline-none"
                    type="text"
                    // value={input}
                    // onChange={(e) => setInput(e.target.value)}
                    // onKeyDown={(e) => {
                    //   if (e.key === "Enter") {
                    //     e.preventDefault();
                    //     if (input !== "") {
                    //       mutate({ content: input });
                    //     }
                    //   }
                    // }}
                    // disabled={isPosting}
                  />
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

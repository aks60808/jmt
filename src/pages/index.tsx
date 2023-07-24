import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";

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
        <div className=" p-6">
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
          <span className="text-5xl">Welcome to JMT Bistro</span>
          <span className=" text-xl italic">A place to lift your soul</span>
        </div>
        <div className="border-b border-slate-400 p-6">
          {!isSignedIn && (
            <div className="flex justify-center">
              <SignInButton />
            </div>
          )}
          {isSignedIn && (
            <div className="flex flex-row">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: 56,
                      height: 56,
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
      </PageLayout>
    </>
  );
};

export default Home;

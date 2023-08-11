import type { PropsWithChildren } from "react";
import NavBar from "./navbar";
import Footer from "./footer";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className=" flex h-screen flex-col">
      <div className="">
        <NavBar />
      </div>
      <div className="mb-20 max-h-full overflow-auto">{props.children}</div>
      <div className="fixed bottom-0 block  w-full bg-gray-800 p-1">
        <Footer />
      </div>
    </main>
  );
};

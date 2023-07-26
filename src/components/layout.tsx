import type { PropsWithChildren } from "react";
import NavBar from "./navbar";
import Footer from "./footer";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="overflow-none flex h-screen">
      <div className="flex h-full w-full flex-col   ">
        <NavBar />
        {props.children}
        <Footer />
      </div>
    </main>
  );
};

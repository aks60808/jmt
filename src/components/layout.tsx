import type { PropsWithChildren } from "react";
import NavBar from "./navbar";
import Footer from "./footer";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex   select-none  flex-col overscroll-none">
      <div className="flex">
        <NavBar />
      </div>

      <div className="mb-20 flex max-h-full flex-col overflow-auto ">
        {props.children}
      </div>
      <div className=" flex">
        <Footer />
      </div>
    </main>
  );
};

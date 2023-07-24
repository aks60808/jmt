import type { PropsWithChildren } from "react";
import NavBar from "./navbar";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="overflow-none flex h-screen justify-center">
      <div className="flex h-full w-full flex-col border-x border-slate-400 ">
        <NavBar />
        {props.children}
      </div>
    </main>
  );
};

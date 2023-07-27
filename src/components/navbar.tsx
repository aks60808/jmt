"use client";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";

import * as React from "react";

import Link from "next/link";
import { toast } from "react-hot-toast";
import { set } from "zod";
const NavBar = () => {
  const { isSignedIn, user } = useUser();

  const [clicked, setClicked] = React.useState(false);

  function handleClick() {
    setClicked(!clicked);
  }

  return (
    <nav className="mx-auto w-full bg-slate-800  px-2 text-slate-100">
      <div className="flex justify-between">
        <div className="flex space-x-4">
          {/* LOGO */}
          <div>
            <Link href={"/"} className="flex items-center p-3">
              <img
                src="/cocktail-logo.svg"
                className="mr-2 h-8"
                alt="JMT Logo"
              />
              <span className="font-bold">JMT</span>
            </Link>
          </div>

          {/* PRIMARY NAV */}
          <div className="hidden items-center space-x-1 md:flex">
            <Link className="px-3 py-4 hover:text-slate-400" href="/">
              Home
            </Link>
            <Link className="px-3 py-4 hover:text-slate-400" href="/request">
              Request a Drink
            </Link>
          </div>
        </div>
        {/* manage user state */}
        <div className="mr-2 hidden items-center  md:flex">
          {!isSignedIn && (
            <a className="px-3 py-4 hover:text-slate-400">
              <SignInButton />
            </a>
          )}
          {isSignedIn && (
            <div className="flex">
              <span className="px-2">
                Welcome, {user.username ?? user.fullName}
              </span>
              <UserButton afterSignOutUrl={"/"} />
            </div>
          )}
        </div>
        {/* mobile button goes here */}
        <div className="flex items-center space-x-2 md:hidden">
          <button onClick={handleClick} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          {isSignedIn && <UserButton afterSignOutUrl={"/"} />}
        </div>
      </div>
      {/* mobile menu */}
      <div className={`${clicked ? "" : "hidden"} md:hidden`}>
        <Link className="block px-2 py-3 text-sm hover:text-slate-400" href="/">
          Home
        </Link>
        <Link
          className="block px-2 py-3 text-sm hover:text-slate-400"
          href="/request"
        >
          Request a Drink
        </Link>
        {!isSignedIn && (
          <a className="block px-2 py-3 text-sm hover:text-slate-400">
            <SignInButton />
          </a>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoHomeOutline, IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-center w-full max-w-md p-8 mx-auto text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="h-40 w-40 bg-[var(--cl-snd-200)] rounded-full bg-muted flex items-center justify-center">
                <IoSearch className="h-20 w-20 text-muted-foreground opacity-50" />
              </div>
              <div className="absolute bg-[var(--cl-snd-200)]  -bottom-2 -right-2 h-[4rem] w-[4rem] rounded-full bg-muted flex items-center justify-center">
                <span className="text-2xl font-bold">404</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold">Page not found</h1>
          <p className="text-muted-foreground mt-2">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="flex-1 flex justify-center items-center gap-[1rem] cursor-pointer bg-[var(--cl-snd-700)] text-white hover:bg-[var(--cl-snd-500)] border border-[var(--cl-snd-300)] rounded py-[0.5rem]">
              <Link
                to={"/"}
                className="flex items-center justify-center w-full"
              >
                <IoHomeOutline className="mr-2 h-4 w-4" />
                Go to homepage
              </Link>
            </button>

            <button
              className="flex-1 cursor-pointer flex justify-center items-center hover:bg-[var(--cl-snd-300)] border border-[var(--cl-snd-300)] rounded py-[0.5rem]"
              onClick={() => window.history.back()}
            >
              <GoArrowLeft className="mr-2 h-4 w-4" />
              Go back
            </button>
          </div>

          <div className="pt-6 border-t mt-6 border-[var(--cl-snd-200)]">
            <p className="text-sm mb-4">Looking for one of these pages?</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                to={"/login"}
                className="text-sm text-primary hover:underline"
              >
                Login
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                to={"/signup"}
                className="text-sm text-primary hover:underline"
              >
                Sign up
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                to={"/forgotPassword"}
                className="text-sm text-primary hover:underline"
              >
                Forgot password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

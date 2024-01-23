"use client";



import { ModeToggle } from "./theme-toggle";

import LogOutButton from "./logout-btn";

export const NavbarRoutes = () => {

  return (
    <>
      {/* {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )} */}
      <div className="flex gap-x-2 ml-auto justify-center items-center">
        {/* toggle dark mode button */}
        <ModeToggle />
        {/* login Button */}
        <LogOutButton />
      </div>
    </>
  );
};
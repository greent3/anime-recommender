import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ThemeIcon } from "../../buttons/ToggleThemeSwitch";

export const navTab = () => {

}

export const Navbar = () => {

  const pageNames = [
    {
      name: 'Home', url: '/'
    },
    {
      name: 'Profile', url: '/profile'
    },
    {
      name: 'Explore', url: '/explore'
    },
    {
      name: 'Watchlist', url: '/watchlist'
    }
  ]

  return (
    <>
      <div className="w-full h-20 pt-2  bg-lightPrimary dark:bg-darkPrimary flex flex-row justify-center items-center">
        <div className="container mx-auto px-4 ">
          <div className="flex justify-between items-center  ">
            <ThemeIcon />
            <ul className="hidden md:flex gap-x-20">
              {pageNames.map((p, index) => (
                <li key={`navtab-${index}`}>
                  <Link href={p.url} className="group" >
                    <p className=" text-lightSecondary dark:text-darkSecondary font-semibold text-2xl ">{p.name}</p>
                    <div className=" w-full h-1 opacity-0 group-hover:opacity-100 bg-lightSecondary dark:bg-darkSecondary" />
                  </Link>
                </li>
              ))}
            </ul>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "3rem",
                    height: "3rem",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ThemeIcon } from "../../buttons/ToggleThemeSwitch";

export const Navbar = () => {
  const pageNames = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Profile",
      url: "/profile",
    },
    {
      name: "Explore",
      url: "/explore",
    },
    {
      name: "Watchlist",
      url: "/watchlist",
    },
  ];

  return (
    <div className="bg-lightPrimary dark:bg-darkPrimary flex  h-20 w-full flex-row items-center justify-center pt-2">
      <div className="container mx-auto px-4 ">
        <div className="flex items-center justify-between  ">
          <ThemeIcon />
          <ul className="hidden gap-x-20 md:flex">
            {pageNames.map((p, index) => (
              <li key={`navtab-${index}`}>
                <Link href={p.url} className="group">
                  <p className=" text-lightSecondary dark:text-darkSecondary text-2xl font-semibold ">
                    {p.name}
                  </p>
                  <div className=" bg-lightSecondary dark:bg-darkSecondary h-1 w-full opacity-0 group-hover:opacity-100" />
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
  );
};

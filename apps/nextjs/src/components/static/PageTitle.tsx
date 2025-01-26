import React from "react";

interface PageTitleProps {
  title: string;
}

function PageTitle({ title }: PageTitleProps) {
  return (
    <div className=" flex w-full justify-center  text-center">
      <p className=" text-5xl font-semibold">{title}</p>
    </div>
  );
}

export default PageTitle;

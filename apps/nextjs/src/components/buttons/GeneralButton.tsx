import React from "react";

interface GeneralButtonProps {
  text?: string;
  emoji?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>, value?: number) => void;
}

function GeneralButton({
  text,
  emoji,
  bgColor = "bg-lightSecondary dark:bg-darkSecondary",
  textColor = "text-lightPrimary dark:text-darkPrimary",
  handleClick,
}: GeneralButtonProps) {
  return (
    <button
      type="button"
      className={`flex h-12 w-48 items-center justify-center gap-2 rounded-3xl p-2 text-sm font-semibold transition-all md:text-lg ${bgColor} ${textColor}`}
      onClick={handleClick}
    >
      {emoji && <span>{emoji}</span>}
      {text && <p>{text}</p>}
    </button>
  );
}

export default GeneralButton;

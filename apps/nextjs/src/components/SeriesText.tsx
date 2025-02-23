interface SeriesTextProps {
  label: string | null;
  text?: string | null;
}

export function SeriesText({ label, text }: SeriesTextProps) {
  return (
    <div
      className={`flex w-full flex-row items-baseline  ${
        label == "Bio" ? " h-2/6" : "h-1/6"
      } `}
    >
      <div className=" justify-start pr-2 text-2xl font-semibold">
        {label + ":"}
      </div>
      {text ? (
        <div className="  text-lightTertiary dark:text-darkTertiary  text-left">
          <text>
            {text.length < 300 ? text : text.slice(0, 277) + "... "}
            <text className=" dark:text-darkSecondary text-lightSecondary  ">
              {text.length > 300 && " click to read more"}
            </text>
          </text>
        </div>
      ) : (
        <div>{"Unknown"}</div>
      )}
    </div>
  );
}

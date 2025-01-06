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
      <div className=" pr-2 text-2xl font-semibold">{label + ":"}</div>
      {text ? (
        <div className="  text-lightTertiary dark:text-darkTertiary">
          {text.length < 300 ? text : text.slice(0, 297) + "..."}
        </div>
      ) : (
        <div>{"Unknown"}</div>
      )}
    </div>
  );
}

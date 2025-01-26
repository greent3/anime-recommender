import clsx from "clsx";

interface ColumnHeaderProps {
  styles: string;
  title: string;
}

export const ColumnHeader = ({ styles, title }: ColumnHeaderProps) => {
  return (
    <th className={clsx("dark:text-darkTertiary text-lightTertiary", styles)}>
      {title}
    </th>
  );
};

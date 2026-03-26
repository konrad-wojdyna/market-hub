type Size = "sm" | "lg" | "xl";

const NameInitials = ({
  initials,
  size = "lg",
  showOnlineDot = true,
}: {
  initials: string;
  size?: Size;
  showOnlineDot?: boolean;
}) => {
  const sizeClasses: Record<Size, string> = {
    sm: "w-7 h-7 text-xs",
    lg: "w-10 h-10 text-lg",
    xl: "w-14 h-14 text-xl",
  };

  const dotClasses: Record<Size, string> = {
    sm: "w-2 h-2",
    lg: "w-3 h-3",
    xl: "w-4 h-4",
  };

  const initalFontSize: Record<Size, string> = {
    sm: "text-sm",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <div
      className={`flex items-center justify-center relative rounded-md bg-purple-800 text-white
    ${sizeClasses[size]}`}
    >
      <small className={`${initalFontSize[size]}`}>{initials}</small>
      {showOnlineDot && (
        <div
          className={`absolute -bottom-1 -right-1 rounded-full bg-green-400 border border-white ${dotClasses[size]}`}
        ></div>
      )}
    </div>
  );
};
export default NameInitials;

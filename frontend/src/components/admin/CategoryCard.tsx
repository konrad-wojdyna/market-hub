type CategoryCardProps = {
  primaryText: string;
  amount: number;
  className?: string;
};

const CategoryCard = ({
  primaryText,
  amount,
  className,
}: CategoryCardProps) => {
  return (
    <article className="flex-1 flex flex-col gap-2 bg-white p-4 border border-gray-200 rounded-md">
      <p className="text-sm text-gray-500">{primaryText}</p>
      <p className={`self-start font-bold text-2xl ${className}`}>{amount}</p>
    </article>
  );
};
export default CategoryCard;

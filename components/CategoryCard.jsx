import Link from "next/link";

const CategoryCard = ({ title, image }) => {
  return (
    <div className="w-[265px] flex flex-col items-center">
      <Link href={`/category/${title}`}>
        <div className="flex flex-col cursor-pointer items-center">
          <img
            className="w-[225px] h-[225px] object-cover origin-center"
            src={image}
            alt={title}
          />
          <h2 className="mt-[8px] text-sm md:text-lg font-semibold h-[56px]">
            {title}
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;

import Link from "next/link";

const ProductCard = ({ data }) => {
  const { slug, title, price, image } = data;

  return (
    <Link href={`/product/${slug}`}>
      <div className="w-[265px] px-[18px] py-[36px] rounded-xl bg-background flex flex-col">
        <img
          className="rounded-lg w-[265px] h-[265px] object-cover origin-center"
          src={image}
          alt="title"
        />
        <h2 className="mt-[8px] text-lg font-semibold">{title}</h2>
        <h2 className="mt-[4px] text-base font-semibold">
          {"£"}
          {price}
        </h2>
      </div>
    </Link>
  );
};

export default ProductCard;

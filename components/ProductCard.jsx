import Link from "next/link";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../store/addToCartSlice";
import { syncLocalCart } from "../utils/cart";
import toast from "react-hot-toast";

const ProductCard = ({ data }) => {
  const { _id, slug, title, price, image, usualPrice } = data;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItemToCart({ _id, slug, price, title, image }));
    syncLocalCart(_id, slug, price, title, image);
    return toast.success("Product added to cart");
  };

  return (
    <div className="product-card w-[265px] px-[18px] py-[16px] rounded-xl bg-background flex flex-col">
      <Link href={`/product/${slug}`}>
        <div className="flex flex-col cursor-pointer">
          <img
            className="rounded-lg w-[225px] h-[225px] object-cover origin-center"
            src={image}
            alt={title}
          />
          <h2 className="mt-[8px] text-lg font-semibold h-[56px]">{title}</h2>
          <h2 className="mt-[4px] text-base font-semibold flex flex-row items-center gap-[16px]">
            <span className={usualPrice !== price ? `line-through` : ""}>
              {"£"}
              {usualPrice}
            </span>
            {usualPrice !== price && (
              <span className="text-danger">
                {"£"}
                {price}
              </span>
            )}
          </h2>
        </div>
      </Link>
      <button
        className="mt-[16px] bg-primary hover:bg-dark hover:text-light transition px-[16px] py-[8px] mx-[16px] rounded-full text-lg font-semibold cursor-pointer"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;

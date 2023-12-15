import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/addToCartSlice";
import { syncLocalCart } from "../../utils/cart";

const ProductPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [productData, setProductData] = useState({});
  const [isLoading, setIsLoading] = useState("loading"); // loading, loaded, error

  useEffect(() => {
    if (!slug) return;

    setIsLoading("loading");
    axios
      .get(`/api/product?productId=${slug}`)
      // .then((res) => console.log("DATA: ", res.data.data))
      .then((response) => setProductData(response.data.data))
      .catch((err) => setIsLoading("error"))
      .then(() => setIsLoading("loaded"));
  }, [slug]);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        slug: productData.slug,
        price: productData.price,
        title: productData.title,
        image: productData.image,
      })
    );
    syncLocalCart(
      productData.slug,
      productData.price,
      productData.title,
      productData.image
    );
  };

  if (isLoading === "loading") {
    return <Spinner />;
  }

  return (
    <section className="px-[50px] mt-[60px]">
      <div className="w-[100%] flex flex-row items-start justify-start gap-[60px]">
        <div className="min-w-[40%]">
          <img src={productData.image} alt={productData.title} />
        </div>
        <div className="flex flex-col items-start gap-[16px]">
          <h2 className="text-2xl font-semibold">{productData.title}</h2>
          <h1 className="text-4xl font-bold">
            {"£"}
            {productData.price}
            {".00"}
          </h1>
          <ul className="list-disc ml-[16px]">
            {productData.description.split(". ").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <button
            onClick={handleAddToCart}
            className="mt-[24px] text-xl font-semibold px-[36px] py-[12px] rounded-full bg-primary text-dark"
          >
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
};
export default ProductPage;

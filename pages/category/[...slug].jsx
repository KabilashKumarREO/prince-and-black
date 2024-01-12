import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import ProductCard from "../../components/ProductCard";
import serverApi from "../../utils/serverApi";

const CategoryPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState("loading"); // loading, loaded, error

  useEffect(() => {
    if (!slug) return;

    setIsLoading("loading");
    axios;
    serverApi
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/product/category-products?categoryId=${slug}`
      )
      .then((response) => setProducts(response.data.products))
      .catch((err) => setIsLoading("error"))
      .then(() => setIsLoading("loaded"));
  }, [slug]);

  if (isLoading === "loading") {
    return <Spinner />;
  }

  return (
    <section className="min-h-[100vh] px-[48px] my-[60px] flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px]">
        {isLoading === "loaded" &&
          products.map((product) => (
            <ProductCard key={product.slug} data={product} />
          ))}
      </div>
    </section>
  );
};
export default CategoryPage;

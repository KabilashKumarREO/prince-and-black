import axios from "axios";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState("loading"); // loading, loaded, error

  useEffect(() => {
    setIsLoading("loading");
    axios
      .get(`/api/products`)
      .then((response) => setProducts(response.data.products))
      .catch((err) => setIsLoading("error"))
      .then(() => setIsLoading("loaded"));
  }, []);

  if (isLoading === "loading") {
    return <Spinner />;
  }

  return (
    <section className="px-[48px] my-[60px] flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px]">
        {isLoading === "loaded" &&
          products.map((product) => (
            <ProductCard key={product.slug} data={product} />
          ))}
      </div>
    </section>
  );
};

export default ProductsPage;

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Spinner from "./Spinner";
import axios from "axios";

const ProductList = () => {
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
    <div className="w-[100%] flex flex-row flex-wrap justify-center items-start gap-[36px]">
      {products.slice(0, 4).map((product) => (
        <ProductCard key={product.slug} data={product} />
      ))}
    </div>
  );
};

export default ProductList;

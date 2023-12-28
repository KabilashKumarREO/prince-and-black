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
    <div
      id="product-list"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-center items-center gap-[36px]"
    >
      {products.slice(0, 4).map((product) => (
        <ProductCard key={product.slug} data={product} />
      ))}
    </div>
  );
};

export default ProductList;

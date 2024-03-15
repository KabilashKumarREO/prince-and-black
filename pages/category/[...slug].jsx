import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import ProductCard from "../../components/ProductCard";
import serverApi from "../../utils/serverApi";
import { SERVER_URL, sdkKey_prod, urlTemplate_prod } from "../../config";

import {
  createInstance,
  OptimizelyProvider,
  useDecision,
} from "@optimizely/react-sdk";

const optimizely = createInstance({
  sdkKey: sdkKey_prod,
  datafileOptions: {
    updateInterval: 1000,
    autoUpdate: true,
    urlTemplate: urlTemplate_prod,
  },
});

const CategoryPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState("loading"); // loading, loaded, error
  const [isQA, setIsQA] = useState(false);

  const userId = (Math.floor(Math.random() * 999999) + 100000).toString();

  useEffect(() => {
    if (!slug) return;

    if (slug[0] === "Fashion") {
      optimizely.track("pageview_fashion_plp");
    }

    setIsLoading("loading");
    axios;
    serverApi
      .get(`${SERVER_URL}/product/category-products?categoryId=${slug}`)
      .then((response) => setProducts(response.data.products))
      .catch((err) => setIsLoading("error"))
      .then(() => setIsLoading("loaded"));

    const reoQACookie = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("reoQA="));

    if (reoQACookie && reoQACookie.split("=")[1] == "true") {
      setIsQA(true);
    }
  }, [slug]);

  if (isLoading === "loading") {
    return <Spinner />;
  }

  return (
    <OptimizelyProvider
      optimizely={optimizely}
      user={{ id: userId, attributes: { reoQA: isQA } }}
    >
      <section className="min-h-[100vh] px-[48px] my-[60px] flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px]">
          {isLoading === "loaded" &&
            products.map((product) => (
              <Decide key={product._id} slug={slug[0]} product={product} />
            ))}
        </div>
      </section>
    </OptimizelyProvider>
  );
};
export default CategoryPage;

const Decide = ({ slug, product }) => {
  const [decision] = useDecision("discount_fashion_react", {
    autoUpdate: false,
  });
  const percentage = decision.variables["percentage"];

  if (decision?.enabled && slug === "Fashion") {
    const discountedProduct = {
      ...product,
      price: product.usualPrice * (1 - percentage / 100),
    };
    return <ProductCard data={discountedProduct} />;
  } else {
    return <ProductCard data={product} />;
  }
};

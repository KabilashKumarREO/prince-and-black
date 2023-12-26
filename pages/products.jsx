import axios from "axios";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import { productData } from "../productData";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState("loading"); // loading, loaded, error
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    setIsLoading("loading");
    axios
      .get(`/api/products`)
      .then((response) => {
        setProducts(response.data.products);
        setSelectedProducts(response.data.products);
      })
      .catch((err) => setIsLoading("error"))
      .then(() => setIsLoading("loaded"));

    const uniqueCategories = [
      ...new Set(productData.map((item) => item.category).flat(1)),
    ];
    setCategories(uniqueCategories);
  }, []);

  // Change handler for checkboxes
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let updatedCatList;
    // Update the selected checkboxes based on the checkbox's value
    if (checked) {
      updatedCatList = [...selectedCategories, value];
      setSelectedCategories(updatedCatList);
    } else {
      updatedCatList = selectedCategories.filter(
        (checkbox) => checkbox !== value
      );
      setSelectedCategories(updatedCatList);
    }

    if (updatedCatList.length === 0) {
      setSelectedProducts(products);
    } else {
      const getSelectedProducts = products.filter((product) =>
        product.category.some((cat) => updatedCatList.includes(cat))
      );
      setSelectedProducts(getSelectedProducts);
    }
  };

  if (isLoading === "loading") {
    return <Spinner />;
  }

  return (
    <main className="px-[16px] md:px-[48px] flex flex-row w-[100%] justify-center relative">
      <aside className="hidden md:flex sticky top-[116px] w-[200px] h-[100%] my-[60px] flex-col items-start">
        <h2 className="font-semibold text-xl">Categories</h2>
        <div className="flex flex-col items-start gap-[8px] mt-[8px]">
          {categories.map((option) => (
            <div key={option} className="flex flex-row items-center gap-[4px]">
              <input
                type="checkbox"
                id={option}
                value={option}
                checked={selectedCategories.includes(option)}
                onChange={handleCheckboxChange}
              />
              <label className="font-medium" htmlFor={option}>
                {option}
              </label>
            </div>
          ))}
        </div>
      </aside>
      <section className="w-[calc(100% - 200px)] my-[60px] flex items-start justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px]">
          {isLoading === "loaded" &&
            selectedProducts.map((product) => (
              <ProductCard key={product.slug} data={product} />
            ))}
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;

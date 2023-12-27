import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import ProductList from "../components/ProductList";
import { productData } from "../productData";
import CategoryCard from "../components/CategoryCard";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(productData.map((item) => item.category).flat(1)),
    ];
    setCategories(uniqueCategories);
  }, []);

  return (
    <main>
      <Banner />
      <section
        id="shop-by-categories"
        className="flex flex-col items-center justify-center px-[36px] md:px-[60px] my-[60px] gap-[48px]"
      >
        <h2 className="text-3xl font-bold text-center">Shop by Categories</h2>
        <div className="w-[100%] flex flex-row justify-center items-start gap-0">
          {categories.map((cat) => (
            <CategoryCard
              key={cat}
              title={cat}
              image={`/assets/category/${cat}.png`}
            />
          ))}
        </div>
      </section>
      <section
        id="black-friday"
        className="flex flex-col items-center justify-center px-[36px] md:px-[60px] my-[60px] gap-[48px]"
      >
        <h2 className="text-5xl font-bold text-center">
          <span className="text-primary">Prince &</span> Black Friday Deals
        </h2>
        <ProductList />
      </section>
    </main>
  );
};

export default Home;

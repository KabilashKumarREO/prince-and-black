import Banner from "./components/Banner";
import ProductList from "./components/ProductList";

const Home = () => {
  return (
    <main>
      <Banner />
      <section className="flex flex-col items-center justify-center mt-[60px] gap-[48px]">
        <h2 className="text-5xl font-bold">
          <span className="text-primary">Prince &</span> Black Friday Deals
        </h2>
        <ProductList />
      </section>
    </main>
  );
};

export default Home;

import axios from "axios";
import ProductCard from "../components/ProductCard";

const fetchProduct = async () => {
  const products = await axios.post(`${process.env.DOMAIN_URL}/api/products`);
  return products.data.data;
};

const ProductsPage = async () => {
  const response = await fetchProduct();

  return (
    <section className="px-[48px] my-[60px]">
      <div className="grid grid-cols-4 gap-[16px]">
        {response.map((product) => (
          <ProductCard key={product.slug} data={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsPage;

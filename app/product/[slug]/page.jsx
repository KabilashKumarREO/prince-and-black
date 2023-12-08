import axios from "axios";

const fetchProduct = async (productId) => {
  const product = await axios.post(`${process.env.DOMAIN_URL}/api/product`, {
    slug: productId,
  });
  return product.data.data;
};

const ProductPage = async (props) => {
  const productId = props.params.slug;

  const { slug, title, price, description, image, category } =
    await fetchProduct(productId);

  return (
    <section className="px-[50px] mt-[60px]">
      <div className="w-[100%] flex flex-row items-start justify-start gap-[60px]">
        <div className="min-w-[40%]">
          <img src={image} alt={title} />
        </div>
        <div className="flex flex-col items-start gap-[16px]">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <h1 className="text-4xl font-bold">
            {"£"}
            {price}
            {".00"}
          </h1>
          <ul className="list-disc ml-[16px]">
            {description.split(". ").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <button className="mt-[24px] text-xl font-semibold px-[36px] py-[12px] rounded-full bg-primary text-dark">
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
};
export default ProductPage;

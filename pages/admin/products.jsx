import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import serverApi from "../../utils/serverApi";
import slugify from "slugify";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const categories = ["Sports", "Electricals", "Fashion", "Gifts", "Books"];
  const userData = useSelector((state) => state.userState);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState("loading"); // loading, loaded, error
  const [isAdded, setIsAdded] = useState("loaded"); // loading, loaded, error
  const [newProduct, setNewProduct] = useState({
    title: "",
    imageUrl: "",
    price: "",
    description: "",
    category1: "",
    category2: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (userData.email && !userData.isAdmin) {
      router.replace("/");
    }
  }, [userData]);

  useEffect(() => {
    setIsLoading("loading");
    serverApi
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/get-all`)
      .then((response) => {
        setProducts(response.data.products);
        setSelectedProducts(response.data.products);
      })
      .then(() => setIsLoading("loaded"))
      .catch((err) => setIsLoading("error"));
  }, []);

  const generateToken = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let token = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setIsAdded("loading");
    serverApi
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/add`, {
        slug: slugify(newProduct.title) + "-" + generateToken(),
        title: newProduct.title,
        price: newProduct.price,
        description: newProduct.description,
        image: newProduct.imageUrl,
        category1: newProduct.category1,
        category2: newProduct.category2,
      })
      .then((response) => {
        console.log(response.data);
        setIsAdded("loaded");
        setNewProduct({
          slug: "",
          title: "",
          imageUrl: "",
          price: "",
          description: "",
          category1: "",
          category2: "",
        });
        toast.success("Product added successfully.");
      })
      .then(() => router.reload())
      .catch((err) => setIsLoading("error"));
  };

  return (
    <section className="min-h-[100vh] px-[18px] md:px-[60px] my-[36px] md:my-[60px] flex flex-col items-center gap-[24px]">
      <div id="admin-product-form">
        <h2 className="text-2xl font-bold text-left">Add a Product</h2>
        <form
          className="mt-[16px] flex flex-col gap-[6px]"
          onSubmit={handleAddProduct}
        >
          <div className="w-[100%] flex flex-row gap-[8px]">
            <input
              type="text"
              className="w-[40%]"
              placeholder="Title"
              required
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
            />
            <input
              type="text"
              className="w-[40%]"
              placeholder="Image URL"
              required
              value={newProduct.imageUrl}
              onChange={(e) =>
                setNewProduct({ ...newProduct, imageUrl: e.target.value })
              }
            />
            <input
              type="number"
              className="w-[30%]"
              placeholder="Price"
              required
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
          </div>
          <div>
            <textarea
              type="text"
              className="w-[100%]"
              placeholder="Description"
              required
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
          </div>
          <div className="w-[100%] flex flex-row gap-[8px]">
            <select
              type="text"
              className="w-[100%]"
              placeholder="Category 1"
              value={newProduct.category1}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category1: e.target.value })
              }
            >
              <option value="" disabled>
                Category 1
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              type="text"
              className="w-[100%]"
              placeholder="Category 2"
              value={newProduct.category2}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category2: e.target.value })
              }
            >
              <option value="" disabled>
                Category 2
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <button
            disabled={isAdded === "loading"}
            className="mt-[16px] px-[16px] py-[4px] border-2 border-primary hover:border-dark bg-primary text-dark font-semibold cursor-pointer rounded transition"
          >
            Add
          </button>
        </form>
      </div>
      {isLoading ? (
        <div>
          <h2 className="text-2xl font-bold text-center">Products</h2>
          <table
            id="products-table"
            className="w-[100%] max-w-[1050px] mt-[24px]"
          >
            <thead>
              <tr>
                <td>Product</td>
                <td>Title</td>
                <td>Price</td>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.slug}>
                  <td>
                    <img src={item.image} alt={item.slug} />
                  </td>
                  <td>{item.title}</td>
                  <td>£{item.price}.00</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Spinner />
      )}
    </section>
  );
};

export default AdminProducts;

import { productData } from "../../productData";

export const config = {
  api: { bodyParser: false },
};

const handler = (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      return;
    case "GET":
      return getProductData(req, res);
    default:
      return res.status(404).send("Not found!");
  }
};

const getProductData = async (req, res) => {
  try {
    const slug = req.query.productId;

    const product = await productData.filter((item) => item.slug === slug);

    if (product.length === 0)
      return res.status(400).json({ message: "Product not found" });

    return res.json({ data: product[0] });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default handler;

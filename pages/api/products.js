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
      return getAllProducts(req, res);
    default:
      return res.status(404).send("Not found!");
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productData.filter((item) => item);
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;

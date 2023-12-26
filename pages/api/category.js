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
      return getCategoryData(req, res);
    default:
      return res.status(404).send("Not found!");
  }
};

const getCategoryData = async (req, res) => {
  try {
    const slug = req.query.categoryId;

    const products = await productData.filter((item) =>
      item.category.includes(slug)
    );

    if (products.length === 0)
      return res.status(400).json({ message: "Category not found" });

    return res.json({ products });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default handler;

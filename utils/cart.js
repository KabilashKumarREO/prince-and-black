export const syncLocalCart = (slug, price, title, image) => {
  let localCart;
  let localCartStr = localStorage.getItem("cart");
  if (!localCartStr) {
    localCart = [];
  } else {
    localCart = JSON.parse(localCartStr);
  }
  localCart.push({ slug, price, title, image });
  localStorage.setItem("cart", JSON.stringify(localCart));
};

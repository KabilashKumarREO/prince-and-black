export const syncLocalCart = (slug, price, title, image) => {
  let localCart;
  let localCartStr = localStorage.getItem("cart");
  if (!localCartStr) {
    localCart = [];
  } else {
    localCart = JSON.parse(localCartStr);
  }
  // localCart.push({ slug, price, title, image });

  if (localCart.length === 0) {
    let newItem = { slug, price, title, image };
    newItem.quantity = 1;
    localCart.push(newItem);
  } else {
    const existingItem = localCart.some((item) => item.slug === slug);
    if (!existingItem) {
      let newItem = { slug, price, title, image };
      newItem.quantity = 1;
      localCart.push(newItem);
    } else {
      let objIndex = localCart.findIndex((obj) => obj.slug === slug);
      localCart[objIndex].quantity += 1;
    }
  }

  localStorage.setItem("cart", JSON.stringify(localCart));
};

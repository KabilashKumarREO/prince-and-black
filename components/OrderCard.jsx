// {
//     "_id": "65a65ebac6e65cd69c16127d",
//     "orderId": "PW-TJYHR1Q1",
//     "accountEmail": "test@test.com",
//     "cart": [
//         {
//             "_id": "65a650db64a2b9b72324a53e",
//             "slug": "Car-on-road-7A9E3K",
//             "title": "Car on road",
//             "price": 699,
//             "image": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         }
//     ],
//     "firstName": "Kabilash",
//     "lastName": "S",
//     "country": "United Kingdom",
//     "streetAddress": "7-217/D-10, NGO COLONY, KOTTAR POST,, NAGERCOIL-2,, KANYAKUMARI DISTRICT.",
//     "city": "NAGERCOIL",
//     "province": "TAMILNADU",
//     "zipcode": "629002",
//     "createdAt": "2024-01-16T10:47:22.241Z",
//     "updatedAt": "2024-01-16T10:47:22.241Z",
//     "__v": 0
// }

const OrderCard = ({ order }) => {
  const formatDate = (inputDateString) => {
    const date = new Date(inputDateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  return (
    <div className="w-[100%] p-[16px] border-2 rounded-lg border-dark flex flex-col items-stretch justify-start">
      <div className="text-sm sm:text-base md:text-lg font-semibold flex flex-row items-center justify-between pb-[16px] border-b-2 border-primary">
        <h2>Order ID: {order?.orderId}</h2>
        <h2>Placed on: {formatDate(order?.createdAt)}</h2>
        <h2>Order value: £{order?.totalPrice}.00</h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="mt-[16px] text-sm sm:text-base md:text-lg font-semibold">
          Items in the order
        </h2>
        <table id="order-table" className="w-[100%] max-w-[1050px]">
          <thead>
            <tr>
              <td>Product</td>
              <td>Title</td>
              <td>Price</td>
            </tr>
          </thead>
          <tbody>
            {order?.cart?.map((item) => (
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
    </div>
  );
};

export default OrderCard;

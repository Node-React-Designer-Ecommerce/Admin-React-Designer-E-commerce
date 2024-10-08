import { useContext, useEffect, useState } from "react";
import { getAllOrders } from "../Utilities/Api/ordersapi";
import Skelton from "../components/Skelton";
import AuthContext from "../context/AuthContext";
import ShowMore from "../Icons/ShowMore";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getAllOrders();
        console.log(data);
        setOrders(data.data.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [user]);

  if (loading) {
    <div>
      <Skelton />
    </div>;
  }
  return (
    <div className="overflow-x-auto ">
      <div className="w-full">
        <table className="table text-2xl">
          {/* head */}
          <thead className="text-center text-2xl text-black">
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox hidden" />
                </label>
              </th>
              <th className="text-start">Customer</th>
              <th className="text-start">Email</th>
              <th className="text-start">Items</th>
              <th>OrderStatus</th>
              <th>PaymentStatus</th>
              <th>Total Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Map through products and render each row */}
            {orders.map((order, index) => (
              <tr key={order._id}>
                <th>
                  <div>{index + 1}</div>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="capitalize">{order.customer?.name}</div>
                      <div className="text-sm opacity-50">
                        {order.createdAt}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-[18px] opacity-80">{order.customer.email}</td>
                <td className="flex justify-center ">
                  <button  onClick={() => document.getElementById('my_modal_3').showModal()}><ShowMore /></button>
                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>
                      <p className="py-2">Order Details</p>
                      <table className="w-full table-auto">
                        <thead>
                          <tr>
                            <th className=" p-2">Image</th>
                            <th className=" p-2">Name</th>
                            <th className=" p-2">Description</th>
                            <th className=" p-2">Price</th>
                            <th className=" p-2">Quantity</th>
                            <th className=" p-2">Size</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items &&
                            order.items.map((item, index) => (
                              <tr key={index} className="border-b text-sm">
                                <td><div className="mask mask-squircle px-0 h-14 w-14">
                                  <img src={item.product.image} alt={item.product.name} />
                                </div></td>
                                <td className="text-center  p-1 text-[18px]">{item.product.name}</td>
                                <td className="text-center  p-1 text-[18px]">{item.product.description}</td>
                                <td className="text-center  p-1 text-[18px]">{item.price}</td>
                                <td className="text-center  p-1 text-[18px]">{item.quantity}</td>
                                <td className="text-center  p-1 text-[18px]">{item.size}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </dialog>
                </td>
                <td className="text-sm text-center">{order.orderStatus}</td>
                <td className="text-sm text-center">{order.orderStatus}</td>
                <td className="text-center">{order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
  );
}

export default Orders;

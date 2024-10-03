import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Auth/AuthContext";
import { getAllOrders } from "../Api/ordersapi";
import Skelton from "../components/Skelton";

function Orders() {
const [orders , setOrders] = useState([]);
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
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  fetchProducts();
}, [user]);


if (loading) {
  <div><Skelton /></div>
}
  return (
    <div className="overflow-x-auto ">
      <div className="w-full">
        <table className="table text-2xl">
          {/* head */}
          <thead className="text-xl ">
            <tr >
              <th>
                <label>
                  <input type="checkbox" className="checkbox hidden" />
                </label>
              </th>
              <th>Customer</th>
              <th className="text-center">Items</th>
              <th>OrderStatus</th>
              <th>PaymentStatus</th>
              <th>Total Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Map through products and render each row */}
            {orders.map((order) => (
              <tr key={order._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox hidden" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className=" capitalize">{order.customer}</div>
                      <div className="text-sm opacity-50">{order.createdAt}</div>
                    </div>
                  </div>
                </td>
                <td >{order.items && order.items.map((item, index) => (
                  <div className="px-10" key={index}>
                    <div className="flex items-start  w-full max-w-xs gap-5">
                      <p className="text-center text-[20px]"> {item.price}</p>
                      <p className="opacity-65 ">{"-"}</p>
                      <p className="text-center text-[20px]"> {item.quantity}</p>
                      <p className="opacity-65 ">{"-"}</p>
                      <p className="text-center text-[20px]"> {item.size}</p>
                    </div>
                  </div>
                ))}</td>
                <td className="text-sm text-center">{order.orderStatus}</td>
                <td className="text-sm text-center">{order.orderStatus}</td>
                <td className="text-center">{order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Orders
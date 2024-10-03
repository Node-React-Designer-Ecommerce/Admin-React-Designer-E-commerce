import { useContext, useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "./../Api/productsapi";
import DeleteIcon from "./../Icons/DeleteIcon"
import { AuthContext } from "../Auth/AuthContext";
import Skelton from "../components/Skelton";
import { Link } from "react-router-dom";
import EditIcon from "../Icons/EditIcon";


function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getAllProducts();
        setProducts(data.data.data.products);
        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id,);
      setProducts((prevProducts) => prevProducts.filter(product => product._id !== id))
      console.log("Product deleted successfully")
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

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
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Quantity & Size</th>
              <th ></th>
              <th> 
                <div className="flex gap-3">
                <Link to={"/add-product"} className="font-bold btn">
                  Add Product
                </Link>
              </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Map through products and render each row */}
            {products.map((product) => (
              <tr key={product._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox hidden" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-16 w-16">
                        <img src={product.image} alt={product.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold capitalize">{product.name}</div>
                      <div className="text-sm opacity-50">{product.createdAt}</div>
                    </div>
                  </div>
                </td>
                <td>{product.price}</td>
                <td className="w-32">
                  <div className="text-sm opacity-75 text-center">{product.description}</div>
                </td>
                <td >{product.stock && product.stock.map((item, index) => (
                  <div className="px-10" key={index}>
                    <div className="flex items-start  w-full max-w-xs gap-5">
                      <p className="text-center text-[20px]"> {item.quantity}</p>
                      <p className="opacity-65 ">{"-"}</p>
                      <p className="text-center text-[20px]"> {item.size}</p>
                    </div>
                  </div>
                ))}</td>
                <td>
                  <button onClick={() => handleDelete(product._id)}><DeleteIcon /></button>
                </td>
                <td>
                  <Link to={`/edit-product/${product._id}`}><EditIcon /></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>

      </div>
    </div>
  );
}

export default Products;

import { useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "./../Api/productsapi";
import DeleteIcon from "./../Icons/DeleteIcon"

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.data.data.products);
        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter(product => product._id !== id))
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  return (
    <div className="overflow-x-auto">
      {/* <h1 className="text-5xl p-3  underline  underline-offset-8">Products</h1> */}
      <div className="w-full">
        <table className="table text-2xl">
          {/* head */}
          <thead className="text-xl ">
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox hidden" />
                </label>
              </th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Quantity & Size</th>
              <th></th>
              <th></th>
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
                        <img
                          src={product.image}
                          alt={product.name} // Use product name for alt text
                        />
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;

import { useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "../Utilities/Api/productsapi";
import DeleteIcon from "./../Icons/DeleteIcon";
import Skelton from "../components/Skelton";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditIcon from "../Icons/EditIcon";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getAllProducts();
        console.log(data);
        if (category) {
          const filteredProducts = data.data.data.products.filter(
            (product) =>
              product.category?.name.toLowerCase() === category.toLowerCase()
          );
          setProducts(filteredProducts);
        } else {
          setProducts(data.data.data.products); // عرض جميع المنتجات
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    <div>
      <Skelton />
    </div>;
  }
  return (
    <div className="overflow-x-auto ">
      <div className="mb-4 flex justify-center">
        <button onClick={() => {setActiveFilter("all"); navigate("/products");}}
          className={`btn ${activeFilter === "all" ? "btn-active" : ""}`}> All
        </button>
        <button onClick={() => {setActiveFilter("man"); navigate("/products/man");}}
         className={`btn ms-2 ${activeFilter === "man" ? "btn-active" : ""}`}>Man
        </button>
        <button onClick={() => {setActiveFilter("women"); navigate("/products/women");}}
          className={`btn ms-2 ${activeFilter === "women" ? "btn-active" : ""}`}>Women
        </button>
        <button onClick={() => {setActiveFilter("kids"); navigate("/products/kids");}}
          className={`btn ms-2 ${activeFilter === "kids" ? "btn-active" : ""}`}>Kids
        </button>
      </div>
      <div className="w-full">
        <table className="table text-2xl">
          {/* head */}
          <thead className="text-center text-black text-2xl">
            <tr>
              <th></th>
              <th className="text-start">Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Quantity & Size</th>
              <th></th>
              <th>
                <div className="flex">
                  <Link
                    to={"/add-product"}
                    className="font-bold btn "
                  >
                    Add Product
                  </Link>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Map through products and render each row */}
            {products.map((product, index) => (
              <tr key={product._id}>
                <th>
                  <div>{index + 1}</div>
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
                      <div className="text-sm opacity-50">
                        {product.createdAt}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{product.price}</td>
                <td className="w-32">
                  <div className="text-sm opacity-75 text-center">
                    {product.description}
                  </div>
                </td>
                <td className="text-[19px] text-center">
                  {product.category?.name}
                </td>
                <td>
                  {product.stock &&
                    product.stock.map((item, index) => (
                      <div className="px-10" key={index}>
                        <div className="flex items-start  w-full max-w-xs gap-5">
                          <p className="text-center text-[20px]">
                            {" "}
                            {item.quantity}
                          </p>
                          <p className="opacity-65 ">{"-"}</p>
                          <p className="text-center text-[20px]">
                            {" "}
                            {item.size}
                          </p>
                        </div>
                      </div>
                    ))}
                </td>
                <td className="pt-4">
                  <button onClick={() => handleDelete(product._id)}>
                    <DeleteIcon />
                  </button>
                </td>
                <td>
                  <Link to={`/edit-product/${product._id}`}>
                    <EditIcon />
                  </Link>
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

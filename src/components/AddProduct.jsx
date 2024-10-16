import { useEffect, useState } from "react";
import { addProduct } from "../Utilities/Api/productsapi";
import { useNavigate } from "react-router";
import { getCategories } from "../Utilities/Api/categoryapi";
import ArrowBack from "../Icons/ArrowBack";

function AddProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: [{
      quantity: 0,
      size: ""
    }],
    image: "",
    error: {}
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data.data.categories);
        console.log(response);
      } catch (error) {
        console.log("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) {
      console.error("Form validation failed");
      return;
    }
    const formDataToSend = new FormData();
    console.log(formDataToSend);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formData.stock.forEach((item, index) => {
      formDataToSend.append(`stock[${index}][quantity]`, item.quantity);
      formDataToSend.append(`stock[${index}][size]`, item.size);
    });

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    try {
      const res = await addProduct(formDataToSend);
      setFormData(res.data.data.product);
      navigate("/products");
      console.log("Product added successfully", res);
    } catch (error) {
      console.log("Error Add Product", error);
    }
  };

  const handleStockChange = (index, e) => {
    const { name, value } = e.target;
    const updatedStock = [...formData.stock];
    updatedStock[index][name] = value;
    setFormData((prevState) => ({
      ...prevState,
      stock: updatedStock,
    }));
  };

  const addStockField = () => {
    setFormData((prevState) => ({
      ...prevState,
      stock: [...prevState.stock, { quantity: 0, size: "" }],
    }));
  };

  const handleChange = (e) => {
    let state = { ...formData };
    state[e.target.name] = e.target.value;
    setFormData(state);
  };

  /////validation////
  const validate = () => {
    let isValid = true;
    let errors = {};
    const { name, description, price, image } = formData;
    if (!name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }
    if (!description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }
    if (price <= 0) {
      errors.price = "Price must be greater than 0";
      isValid = false;
    }
    formData.stock.forEach((item, index) => {
      if (item.quantity <= 0) {
        errors[`stockQuantity${index}`] = "Quantity must be greater than 0";
        isValid = false;
      }
      if (!item.size.trim()) {
        errors[`stockSize${index}`] = "Size is required";
        isValid = false;
      }
    });
    if (!image) {
      errors.image = "Product image is required";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  return (
    <div className="flex justify-center py-10 md:py-16">

      <form onSubmit={handleSubmit} className="flex flex-col w-full sm:w-1/2 lg:w-1/3 h-auto gap-4 md:shadow-xl p-10 rounded-2xl">
        <div className="flex justify-center relative">
          <button  onClick={() => window.history.back()} className="btn btn-xs left-1 w-10 h-10 absolute rounded-3xl">
            <ArrowBack/>
          </button>
          <p className="font-bold text-4xl text-mintColor">Add Product</p>
        </div>
        {/* Name */}
        <label htmlFor="name" className="">Name</label>
        <input
          id="name"
          className="input input-bordered"
          name="name"
          value={formData.name}
          type="text"
          placeholder="Name.."
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-[12px]">{errors.name}</p>}

        {/* Description */}
        <label htmlFor="description" className="">Description</label>
        <input
          id="description"
          className="input input-bordered"
          name="description"
          value={formData.description}
          type="text"
          placeholder="Description.."
          onChange={handleChange}
        />
        {errors.description && <p className="text-red-500 text-[12px]">{errors.description}</p>}

        {/* Price */}
        <label htmlFor="price" className="">Price</label>
        <input
          id="price"
          className="input input-bordered"
          name="price"
          value={formData.price}
          type="number"
          min='0'
          placeholder="Product price.."
          onChange={handleChange}
        />
        {errors.price && <p className="text-red-500 text-[12px]">{errors.price}</p>}

        {/* Stock */}
        {formData.stock.map((stockItem, index) => (
          <div key={index} className="flex gap-2">
            <div className="flex flex-col">

              {/* Quantity */}
              <label htmlFor={`quantity${index}`} className="">Quantity</label>
              <input
                id={`quantity${index}`}
                className="input input-bordered"
                name="quantity"
                value={stockItem.quantity}
                type="number"
                min='0'
                placeholder="Quantity.."
                onChange={(e) => handleStockChange(index, e)}
              />
              {errors[`stockQuantity${index}`] && <p className="text-red-500 text-[12px] pt-2">{errors[`stockQuantity${index}`]}</p>}
            </div>
            <div className="flex flex-col">

              {/* Size */}
              <label htmlFor={`size${index}`}>Size</label>
              <select
                id={`size${index}`}
                className="input px-3 input-bordered"
                name="size"
                value={stockItem.size}
                onChange={(e) => handleStockChange(index, e)}
              >
                <option value="" disabled>Select Size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              {errors[`stockSize${index}`] && <p className="text-red-500 text-[12px] pt-2">{errors[`stockSize${index}`]}</p>}
            </div>
          </div>
        ))}
        <button type="button" className="btn bg-mintColor hover:bg-mintColor text-white" onClick={addStockField}>Add Another Size</button>

        {/* Category */}
        <label htmlFor="category" className="">Category</label>
        <select
          id="category"
          className="input input-bordered"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-[12px]">{errors.category}</p>}

        {/* Image */}
        <label htmlFor="image" className="">Image</label>
        <input
          id="image"
          className="file-input file-input-bordered file-input-md w-full max-w-xs"
          name="image"
          onChange={handleImageChange}
          type="file"
        />
        {errors.image && <p className="text-red-500 text-[12px]">{errors.image}</p>}

        <button className="btn bg-mintColor hover:bg-mintColor text-white">Add</button>
      </form>
    </div>
  );
}

export default AddProduct;

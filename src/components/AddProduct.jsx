import { useEffect, useState } from "react"
import { addProduct } from "../Api/productsapi";
import { useNavigate } from "react-router";
import { getCategories } from "../Api/categoryapi";

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
    console.log(formDataToSend)
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
      setFormData(res.data.data.product)
      navigate("/products");
      console.log("Product added sucessfully", res);
    } catch (error) {
      console.log("Error Add Product", error)
    }
  }

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
const validate = () =>{
  let isValid = true;
  let errors = {};
  const { name , description, price, image} = formData;
  if(!name.trim()) {
      errors.name = "Name is required"
      isValid = false;
  }
  if(!description.trim()){
      errors.description = "Descriptions is required";
      isValid = false;
  }
  if(price <= 0){
      errors.price = "Price must be greater than 0"
      isValid = false;
  }
  formData.stock.forEach((item, index)=> {
      if (item.quantity <= 0) {
          errors[`stockQuantity${index}`] = "Quantity must be greater than 0";
          isValid = false;
      }
      if (!item.size.trim()) {
          errors[`stockSize${index}`] = "Size is required";
          isValid = false;
      }
  })
  if(!image)  {
      errors.image = "Product image is required"
      isValid = false;
  }
  setErrors(errors)
  return isValid;
}
  return (
    <div className="flex justify-center py-40">
      <form onSubmit={handleSubmit} className="flex flex-col h-auto gap-4 shadow-xl p-10 rounded-2xl">
        <input className="input input-bordered" name="name" value={formData.name} type="text" placeholder="Product name.." onChange={handleChange} />
        {errors.name && <p className="text-red-500 text-[12px]">{errors.name}</p>}
        <input className="input input-bordered" name="description" value={formData.description} type="text" placeholder="Product description.." onChange={handleChange} />
        {errors.description && <p className="text-red-500 text-[12px]">{errors.description}</p>}
        <input className="input input-bordered" name="price" value={formData.price} type="number" placeholder="Product price.." onChange={handleChange} />
        {errors.price && <p className="text-red-500 text-[12px]">{errors.price}</p>}
        {formData.stock && formData.stock.map((stockItem, index) => (
          <div key={index} className="flex gap-2">
            <input className="input input-bordered" name="quantity" value={stockItem.quantity} type="number" placeholder="Quantity.." onChange={(e) => handleStockChange(index, e)} />
            {errors.quantity && <p className="text-red-500 text-[12px]">{errors.quantity}</p>}
            <input className="input input-bordered" name="size" value={stockItem.size} type="text" placeholder="Size.." onChange={(e) => handleStockChange(index, e)} />
            {errors.size && <p className="text-red-500 text-[12px]">{errors.size}</p>}
          </div>
        ))}
        <button type="button" className="btn" onClick={addStockField}>
          Add Another Size
        </button>
         <select className="input input-bordered" name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-[12px]">{errors.category}</p>}
        <input className="file-input file-input-bordered file-input-md w-full max-w-xs" name="image" onChange={handleImageChange} type="file" />
        {errors.image && <p className="text-red-500 text-[12px]">{errors.image}</p>}
        <button className="btn"> Add</button>
      </form>
    </div>
  )
}

export default AddProduct
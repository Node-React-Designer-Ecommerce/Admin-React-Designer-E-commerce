import { useContext, useState } from "react"
import { addProduct } from "../Api/productsapi";
import { AuthContext } from "../Auth/AuthContext";

function AddProduct() {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: [{
      quantity: 0,
      size: ""
    }],
    image: "",
    error: {}
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const formDataToSend = new FormData();
    console.log(formDataToSend)
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formData.stock.forEach((item, index) => {
      formDataToSend.append(`stock[${index}][quantity]`, item.quantity);
      formDataToSend.append(`stock[${index}][size]`, item.size);
    });

    if (formData.image) {
      formDataToSend.append("image", formData.image); // رفع الصورة إذا كانت موجودة
    }
    try {
      const res = await addProduct(formDataToSend, headers);
      setFormData(res.data)
      console.log("Product added sucessfully", res);
    } catch (error) {
      console.log("Error Add Product", error)
    }
  }

  const handleStockChange = (index, e) => {
    const { name, value } = e.target;
    const updatedStock = [...formData.stock];
    updatedStock[index][name] = value; // تحديث العنصر المطلوب في المصفوفة
    setFormData((prevState) => ({
      ...prevState,
      stock: updatedStock,
    }));
  };


  const addStockField = () => {
    setFormData((prevState) => ({
      ...prevState,
      stock: [...prevState.stock, { quantity: 0, size: "" }], // إضافة عنصر جديد
    }));
  };

  const handleChange = (e) => {
    let state = { ...formData };
    state[e.target.name] = e.target.value;
    setFormData(state);
  };

  return (
    <div className="flex justify-center pt-56">
      <form onSubmit={handleSubmit} className="flex flex-col w-96 h-auto gap-4 shadow-xl p-10 rounded-2xl">
        <input className="input input-bordered" name="name" value={formData.name} type="text" placeholder="Product name.." onChange={handleChange} />
        <input className="input input-bordered" name="description" value={formData.description} type="text" placeholder="Product description.." onChange={handleChange} />
        <input className="input input-bordered" name="price" value={formData.price} type="number" placeholder="Product price.." onChange={handleChange} />
        {formData.stock && formData.stock.map((stockItem, index) => (
          <div key={index} className="flex gap-2">
            <input className="input input-bordered" name="quantity" value={stockItem.quantity} type="number" placeholder="Quantity.." onChange={(e) => handleStockChange(index, e)} />
            <input className="input input-bordered" name="size" value={stockItem.size} type="text" placeholder="Size.." onChange={(e) => handleStockChange(index, e)} />
          </div>
        ))}
        <button type="button" className="btn" onClick={addStockField}>
          Add Another Size
        </button>
        <input className="file-input file-input-bordered file-input-md w-full max-w-xs" name="image" onChange={handleImageChange} type="file" />
        <button className="btn"> Add</button>
      </form>

    </div>
  )
}

export default AddProduct
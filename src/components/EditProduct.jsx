import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getOneProduct, updateProduct } from "../Utilities/Api/productsapi";
import { getCategories } from '../Utilities/Api/categoryapi';
import ArrowBack from "../Icons/ArrowBack";

function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        category: "",
        stock: [{
            quantity: 0,
            size: ""
        }],
        error: {}
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getOneProduct(id);
                console.log("Fetched product data:", res.data.data.product);
                setFormData({
                    ...formData,
                    name: res.data.data.product.name || "",
                    description: res.data.data.product.description || "",
                    price: res.data.data.product.price || 0,
                    category: res.data.data.product.category || "",
                    stock: res.data.data.product.stock || [{ quantity: 0, size: "" }],
                    error: {}
                });
            } catch (error) {
                console.error("Error fetching product", error);
            }
        }

        const fetchCategories = async () => {
            try {
                const res = await getCategories();
                setCategories(res.data.data.categories);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };

        fetchProduct();
        fetchCategories();
    }, [id]);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!validate()) {
            console.error("Form validation failed");
            return;
        }
        try {
            const res = await updateProduct(id, formData);
            console.log(res.data)
            setFormData(res.data)
            navigate("/products")
            console.log("Product updated successfully", res);
        } catch (error) {
            if (error.res) {
                console.log("Error response data:", error.res.data);
            } else {
                console.log("Error message:", error.message);
            }
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
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCategoryChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            category: e.target.value,
        }));
    };

    const validate = () => {
        let isValid = true;
        let errors = {};
        const { name, description, price } = formData;
        if (!name.trim()) {
            errors.name = "Name is required";
            isValid = false;
        }
        if (!description.trim()) {
            errors.description = "Descriptions is required";
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

        setErrors(errors);
        return isValid;
    };

    return (
        <div className="flex justify-center py-10 md:py-16">
            <form onSubmit={handleSubmit} className="flex flex-col w-full sm:w-1/2 lg:w-1/3 h-auto gap-4 md:shadow-xl p-10 rounded-2xl">
                <div className="flex justify-center relative">
                    <button onClick={() => window.history.back()} className="btn btn-xs left-1 w-10 h-10 absolute rounded-3xl">
                        <ArrowBack />
                    </button>
                    <p className="font-bold text-4xl text-mintColor">Edit Product</p>
                </div>

                {/* Name */}
                <label htmlFor="name">Name</label>
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
                <label htmlFor="description">Description</label>
                <input
                    id="description"
                    className="input input-bordered"
                    name="description"
                    value={formData.description}
                    type="text"
                    placeholder="Product description.."
                    onChange={handleChange}
                />
                {errors.description && <p className="text-red-500 text-[12px]">{errors.description}</p>}

                {/* Price */}
                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    className="input input-bordered"
                    name="price"
                    value={formData.price}
                    type="number"
                    min="0"
                    placeholder="Price.."
                    onChange={handleChange}
                />
                {errors.price && <p className="text-red-500 text-[12px]">{errors.price}</p>}

                {/* Stock */}
                {formData.stock.map((stockItem, index) => (
                    <div key={index} className="flex gap-2">
                        <div className="flex flex-col">
                            <label htmlFor={`quantity${index}`}>Quantity</label>
                            <input
                                id={`quantity${index}`}
                                className="input input-bordered"
                                name="quantity"
                                value={stockItem.quantity}
                                type="number"
                                min="0"
                                placeholder="Quantity.."
                                onChange={(e) => handleStockChange(index, e)}
                            />
                            {errors[`stockQuantity${index}`] && <p className="text-red-500 text-[12px] pt-2">{errors[`stockQuantity${index}`]}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor={`size${index}`}>Size</label>
                            <select
                                id={`size${index}`}
                                className="input px-5 input-bordered"
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

                <button type="button" className="btn bg-mintColor hover:bg-mintColor text-white" onClick={addStockField}>
                    Add Another Size
                </button>

                {/* Category */}
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    className="input input-bordered"
                    name="category"
                    value={formData.category}
                    onChange={handleCategoryChange}
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
                {errors.category && <p className="text-red-500 text-[12px]">{errors.category}</p>}

                <button className="btn bg-mintColor hover:bg-mintColor text-white">Edit</button>
            </form>
        </div>
    );
}

export default EditProduct;

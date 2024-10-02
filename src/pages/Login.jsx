import axios from "axios";
import { useContext, useState } from "react"
import { useNavigate } from "react-router";
import { AuthContext } from "../Auth/AuthContext";

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        errors: {},
    });

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        const errors = validate();
        if (errors) return;
        try {
            console.log("Sending data:", {
                email: formData.email,
                password: formData.password,
            });
            const response = await axios.post("https://react-node-designer.glitch.me/api/v1/users/login", {
                email: formData.email,
                password: formData.password,
            });
            console.log(response.data);
            if (response.data && response.data.data) {
                const token = response.data.data.token;
                const role = response.data.data.role;
                if (role === "admin") {
                    console.log(token, role);
                    login(token, role);
                    navigate("/");
                } else {
                    setErrorMessage("Access denied. Only admins can log in.");
                }
            } else {
                setErrorMessage(
                    response.data.message || "Login failed. Please try again."
                );
            }
        } catch (error) {
            console.error("Login error:", error.response); // طباعة الخطأ للحصول على مزيد من التفاصيل
            setErrorMessage(
                error.response ? error.response.data.message : error.message
            );
        }
    };

    const handleChange = (e) => {
        let state = { ...formData };
        state[e.target.name] = e.target.value;
        setFormData(state);
    };

    const validate = () => {
        const errors = {};
        const { email, password } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;

        if (email.trim() === "") {
            errors.email = "Email is required!";
        }  else if (!emailRegex.test(email)) {
            errors.email = "Please enter a valid email address!";
        }

        if (password.trim() === "") {
            errors.password = "Password is required!";
        } else if (!passwordRegex.test(password)){
            errors.password = "Password must contain at least one number and one special character!";
        }

        if (Object.keys(errors).length > 0) {
            setFormData((prevState) => ({ ...prevState, errors }));
            return errors;
        }
        setFormData((prevState) => ({ ...prevState, errors: {} }));
        return null;
    };

    return (
        <div className="flex justify-center pt-40 h-full">
            <form onSubmit={handleSubmit} className="flex flex-col w-96 h-auto gap-4 shadow-2xl p-10 rounded-md">
                <p>Welcome on dashboard .. </p>
                <div className="input-group">
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input type="text" onChange={handleChange} value={formData.email} name="email" placeholder="Email" />
                    </label>
                        {formData.errors.email && (
                            <div className="text-red-500 text-[12px]">
                                {formData.errors.email}
                            </div>
                        )}
                </div>
                <div className="input-group">
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                        </svg>
                        <input type="password" onChange={handleChange} value={formData.password} name="password" placeholder="Password" />
                    </label>
                        {formData.errors.password && (
                            <div className="text-red-500 text-[12px]">
                                {formData.errors.password}
                            </div>
                        )}
                    <div className="flex justify-center pt-6">
                        <button className="btn">Login</button>
                    </div>
                    {errorMessage && (
                        <div className="text-red-500 mt-5">{errorMessage}</div>
                    )}
                </div>
            </form>
        </div>

    )
}

export default Login
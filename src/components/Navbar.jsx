import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import ButtonToggle from "../Icons/ButtonToggle";
import AuthContext from "../context/AuthContext";


function Navbar() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="relative"> 
        <div className="navbar bg-base-100 w-full fixed z-20 px-8 ">
            <div className="flex-1">
                <Link to={"/"} className="font-mono font-bold text-2xl hidden md:block "> <img className="h-9" src="/sammlyLogo.png" alt="" />
                </Link>
                <ButtonToggle />
            </div>
            <div className="flex-none gap-2">
                <div className="form-control hidden">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-20 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="/user.jpg" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li className="hidden"><Link to={"/login"}>Login</Link></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Navbar
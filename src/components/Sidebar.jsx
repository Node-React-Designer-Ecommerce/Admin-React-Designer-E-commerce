import { Link, Outlet } from "react-router-dom";
import ButtonToggle from "../Icons/ButtonToggle";
import CategroyIcon from "../Icons/CategroyIcon";
import HomeIcon from "../Icons/HomeIcon";
import ProductsIcon from "../Icons/ProductsIcon";
import UsersIcon from "../Icons/UsersIcon";
import OrderIcon from "../Icons/OrderIcon";


export default function Sidebar() {
    return (
        <div className="drawer lg:drawer-open flex">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu text-xl font-bold bg-base-200 min-h-full w-80 p-10 gap-6 flex items-start">
                    {/* Sidebar content here */}
                    <li><Link to={"/"} className="m-auto"><HomeIcon/> Dashboard</Link></li>
                    <li><Link to={"products"} className="m-auto"><ProductsIcon/> Products</Link></li>
                    <li><Link to={"categories"} className="m-auto"><CategroyIcon/> Categories</Link></li>
                    <li><Link to={"users"} className="m-auto"><UsersIcon/>Users</Link></li>
                    <li><Link to={"orders"} className="m-auto">
                   <OrderIcon/> Orders</Link></li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex justify-center">
                <div className="flex-1 p-10">
                    <Outlet />
                    <ButtonToggle />
                </div>
            </div>
        </div>
    )
}

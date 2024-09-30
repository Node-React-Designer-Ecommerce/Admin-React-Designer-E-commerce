import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Users from "./pages/Users";
import Orders from './pages/Orders';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path="/" element={<Home/>}>
      <Route path="products" element={<Products/>}/>
      <Route path="categories" element={<Categories/>}/>
      <Route path="users" element={<Users/>}/>
      <Route path="orders" element={<Orders/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

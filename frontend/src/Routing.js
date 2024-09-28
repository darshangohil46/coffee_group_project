import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home";
import Order from "./Pages/Order";
import Drinks from "./Pages/Drinks";
import Food from "./Pages/Food";
import CoffeeAtHome from "./Pages/Coffe At Home";
import Merchandise from "./Pages/Merchandies";
import Coffeculture from "./Pages/Coffeeculture";
import ReadyToEat from "./Pages/Ready To Eat";
import Serch from "./Pages/serch";
import Cart from "./Pages/Cart";
import { useState } from "react";
import UserDashboard from "./Pages/UserDashboard";
import NoPage from "./Pages/NoPage";
import Bestseller from "./Pages/Bestseller";


function Routing() {
    let [notify, setnotify] = useState(false)
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App value={{ 'notify': notify, 'setnotify': setnotify }} />}>
                        <Route index element={<Home  value={{ 'setnotify': setnotify }}/>}></Route>
                        <Route path="Order" element={<Order />}>
                            <Route index element={<Bestseller value={{ 'setnotify': setnotify }} />}></Route>
                            <Route path="drinks" element={<Drinks value={{ 'setnotify': setnotify }} />}></Route>
                            <Route path="Food" element={<Food value={{ 'setnotify': setnotify }} />}></Route>
                            <Route path="CoffeeAtHome" element={<CoffeeAtHome value={{ 'setnotify': setnotify }} />}></Route>
                            <Route path="Merchandise" element={<Merchandise value={{ 'setnotify': setnotify }} />}></Route>
                            <Route path="ReadyToEat" element={<ReadyToEat value={{ 'setnotify': setnotify }} />}></Route>
                        </Route>
                        <Route path="Coffeculture" element={<Coffeculture />}></Route>
                        <Route path="Serch" element={<Serch value={{ 'setnotify': setnotify }} />}></Route>
                        <Route path="Cart" element={<Cart />}></Route>
                    </Route>
                    <Route path="userdashboard" element={<UserDashboard value={{ 'setnotify': setnotify }}/>}></Route>
                    <Route path="*" element={<NoPage />}></Route>
                    <Route path="/404" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Routing;
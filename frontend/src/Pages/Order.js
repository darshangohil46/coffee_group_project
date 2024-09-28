import { Link, Outlet,useLocation  } from "react-router-dom";
import { useEffect,useState} from "react";
const Order =()=>{
    let [path,setPath]=useState("")
    const Location = useLocation();
    let categoriescss="hover:text-[#4A8A66] hover:border-b-2 hover:border-b-[#4A8A66] pb-[15px]"
    let categoriesAcss="border-b-[#4A8A66] border-b-2 font-bold pb-[15px] text-[#4A8A66]"
    useEffect(()=>{
        document.body.className="Order_Body";
        const currentPath = Location.pathname.split('/')[2];
        setPath(currentPath ? currentPath : "");
    },[Location])
    return(
        <>

            <div className='bg-[#1e3932] py-2 sm:py-6'>
                <div className=' text-white  text-lg tracking-wide w-full'>
                    <div className='px-4  sm:px-0 md:w-4/5 m-auto flex justify-between items-center gap-5'>
                        <p className='text-sm sm:text-xl max-w-md sm:max-w-xl font-light'>Home  &gt;  Menu</p>
                    </div> 
                </div>
            </div>

            <div className="flex w-full py-4 bg-[#F2F0EB] m-auto border-b-[#DEE2E6] border-b-2 ">
                 <ul className="px-4  sm:px-0 md:w-4/5 m-auto flex items-center gap-5 text-[#0000007d] ">
                    <li className="pr-[40px] border-r border-r-[#D5D3CE] "><Link to="" className={`${categoriescss} ${ path == ""? categoriesAcss : ""}`}>Bestseller</Link></li>
                    <li className="px-[40px] border-r border-r-[#D5D3CE] "><Link to="drinks" className={`${categoriescss} ${ path == "drinks" ? categoriesAcss : ""}`}>Drinks</Link></li>
                    <li className="px-[40px] border-r border-r-[#D5D3CE] "><Link to="Food" className={`${categoriescss} ${ path == "Food" ? categoriesAcss : ""}`}>Food</Link></li>
                    <li className="px-[40px] border-r border-r-[#D5D3CE]  "><Link to="Merchandise" className={` ${categoriescss} ${ path === "Merchandise" ? categoriesAcss : ""}`}>Merchandise</Link></li>
                    <li className="px-[40px] border-r border-r-[#D5D3CE]"><Link to="CoffeeAtHome" className={` ${categoriescss} ${ path === "CoffeeAtHome" ? categoriesAcss : ""}`}>Coffee At Home</Link></li>
                    <li className="px-[40px] "><Link to="ReadyToEat" className={` ${categoriescss} ${ path === "ReadyToEat" ? categoriesAcss : ""}`}>Ready To Eat</Link></li>
                 </ul>
            </div>
            <Outlet/>
        </>
    )
}
export default Order;
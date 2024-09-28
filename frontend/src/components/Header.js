import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Login from '../Pages/Login';
function Header({ value }) {
  const Location = useLocation();
  const navigatee = useNavigate();
  let [login, setLogin] = useState(false)

  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    // Fetch user authentication data
    fetch('http://localhost:8000/api/user-auth/', {
      method: 'GET',
      credentials: 'include', // Ensure cookies/credentials are included
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Check if the user data exists (i.e., authentication was successful)
        if (data.user) {
          console.log("User ID:", data.user.id);
          console.log("Cart data:", data.user.cart);

          // Update authentication state and user data
          setUserId(data.user.id);
          setData(data.user);
        } else {
          console.log("Authentication failed:", data.message);
        }
      })
      .catch(error => console.error("Fetch error:", error));
  }, []); // Empty dependency array to run the effect once on component mount

  const Slogin = (value) => {
    setLogin(value)
  }
  const serch = () => {
    navigatee("serch")
  }
  return (
    <>
      <div className='flex justify-center p-[15px] shadow-md w-full border-b-[#DEE2E6] border-b-2 bg-white'>
        <div className='min-w-[40px] mr-[80px] max-w-[100px] '>
          <img src={`${process.env.PUBLIC_URL}/Logo.png`} className=' h-[50px]' />
        </div>
        <div className='flex gap-10 lg:gap-16  md:mr-[400px]  align-middle my-auto text-slate-500  text-[18px] '>
          <a href="/" className={`hover:text-[#4A8A66] ${Location.pathname.split('/')[1] == "" ? 'text-[#00754A] font-bold border-b-2 border-b-[#00754A] pb-2' : ""}`}>Home</a>
          <Link to="/Order" className={`hover:text-[#4A8A66] ${Location.pathname.split('/')[1] == "Order" ? 'text-[#00754A] font-bold border-b-2 border-b-[#00754A] pb-2' : ""}`}>Menu </Link>
          <Link to="/Cart" className={` relative hover:text-[#4A8A66] ${Location.pathname.split('/')[1] == "Cart" ? 'text-[#00754A] font-bold border-b-2 border-b-[#00754A] pb-2' : ""}`} onClick={() => { value.setnotify(false) }}>
            <span class={`absolute left-9 top-1 flex h-2 w-2 ${value.notify ? 'block' : 'hidden'}`}>
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[red] opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-[red]"></span>
            </span>
            Cart</Link>
        </div>
        <div className=' text-xl text-slate-500 w-full max-w-[300px] shadow-md flex my-auto py-2 px-5 rounded-full mr-[80px] ' onClick={serch} >
          <img src="	https://www.starbucks.in/assets/icon/search.svg"></img>
          <input type="text" id="serchh" className='text-sm w-full bg-transparent border-none outline-none px-3' placeholder="Looking for something specific ?" />
        </div>

        {Boolean(window.localStorage.getItem('loggedIn')) != true &&
          <>
            <div className='text-xl text-slate-500 my-auto ' style={{ width: "150px" }} onClick={() => { setLogin(true) }}>
              <img src="https://www.starbucks.in/assets/icon/account_thin.svg" />
            </div>
          </>
        }
        {Boolean(window.localStorage.getItem('loggedIn')) == true  &&
          <>
            <div className='text-xl text-slate-500 my-auto ' style={{ width: "150px" }} onClick={() => { navigatee("/userdashboard") }}>
              <img src="https://www.starbucks.in/assets/icon/account_thin.svg" />
            </div>
          </>
        }
      </div>
      {login && <Login skip={Slogin} />}
    </>
  )
}
export default Header
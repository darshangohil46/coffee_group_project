import React, { useEffect, useState } from 'react';
import './UserDashboard.css';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';


const UserDashboard = ({ value }) => {
  let navigate = useNavigate()
  let [trandingItems, setItem] = useState([1, 2, 3])
  let [historydata, setDataH] = useState([])
  let [billDetails, setBillDetails] = useState(null)
  const [data, setData
  ] = useState(null);
  const [my_data, setmy_data] = useState(null)


  useEffect(() => {
    fetch('http://localhost:8000/api/user-auth/', {
      method: 'GET',
      credentials: 'include', // Include credentials (e.g., cookies) if needed
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
        console.log("Fetched data:", data);

        if (data.user) {
          console.log("User ID:", data.user.id);

          setUserId(data.user.id);
          setData(data.user);
          setmy_data(data.user.username)
          console.log("Cart data:", data.user.cart);

        } else {
          console.log("Authentication failed:", data.message);
        }
      })
      .catch(error => console.error("Fetch error:", error));


    // Step 2: Fetch data from API
    fetch("http://127.0.0.1:8000/api/bestseller/")
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setItem(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);



  useEffect(() => {
    fetch('http://localhost:8000/api/user-orders/', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setDataH(data.orders || []); // Ensure 'orders' is an array
        console.log(data.orders)
      })
  }, [])


  const [drinks, setDrinks] = useState([]);
  const [userId, setUserId] = useState(undefined);
  const addToCart = (drink) => {
    console.log(drink);


    const cartItem = {
      user_id: userId,
      cart_details: {
        title: drink.title,
        price: drink.price,
        img: drink.img,
        description: drink.description,
      }
    };
    console.log(cartItem);

    fetch('http://localhost:8000/api/coffee-cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItem),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Item added to cart successfully:", data);
      })
      .catch(error => {
        console.error("Error adding item to cart:", error);
      });
  };


  const groupItems = (items) => {
    return items.reduce((acc, item) => {
      const existingItem = acc.find(i => i.title === item.title);
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity
      } else {
        acc.push({ ...item, quantity: 1 }); // Add new item with quantity 1
      }
      return acc;
    }, []);
  };
  if (Boolean(window.localStorage.getItem('loggedIn'))) {
    return (
      <>

        <Sidebar />
        <div className="dashboard-content mx-[5px]" style={{ marginLeft: "260px" }}>
          <h2 className='text-[35px] font-bold'>Welcome, {my_data}</h2>

          <div className="trending-section">
            <h3 className='text-[20px] font-bold text-gray-800'>Trending Items</h3>
            <div className="trending-cards pt-3 px-[60px]">

              {
                trandingItems.slice(0, 3).map(items => {

                  return (
                    <>
                      <div className='flex relative w-[360px] px-4 bg-[#F9F9F9] py-4 rounded-[8px] item_container mr-[28px] my-[30px] scaleA'>
                        <div>
                          <img src={items.img == "https://www.starbucks.in/assets/icon/placeholder.svg" ? "https://starbucksstatic.cognizantorderserv.com/Items/Small/108056.jpg" : items.img} className='rounded-full absolute left-[-40px] top-[23px] my-auto shadow-xl' style={{ maxWidth: '150px', maxHeight: '120px' }} />
                        </div>
                        <div className='flex flex-col ml-[70px] w-full'>
                          <div className='px-4 mb-[5px] mt-[20px]' style={{ minHeight: "80px" }}>
                            <div className='mb-1'>
                              <img src="https://www.starbucks.in/assets/icon/veg.svg" alt="veg-item" style={{ width: '16px', height: '16px' }} />
                            </div>
                            <div className='mb-1.5 text-[18px] font-medium'>
                              {items.title}
                            </div>
                            <div className='mb-2 text-[13px] font-normal text-[#21252976] FontTitle'>
                              {items.description}
                            </div>
                          </div>
                          <div className='flex flex-row justify-between px-3 mt-4'>
                            <div className='text-[20px] font-serif font-normal'>₹ {items.price}</div>
                            <button onClick={() => {
                              addToCart(items)
                              value.setnotify(true)
                              Swal.fire({
                                title: 'Success!',
                                text: 'Item added successfully!',
                                icon: 'success',
                                confirmButtonText: 'OK',
                                customClass: {
                                  popup: 'swal-popup',
                                  confirmButton: 'swal-AccountOk', // Optional: Custom class for styling
                                },
                              });
                            }} className='px-6 py-2 bg-[#00754A] hover:bg-[#979797] rounded-[30px] text-[14px] font-bold text-[#C6C6C6] Add_item'>Add Item</button>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })
              }

            </div>
          </div>

          <div className="transaction-history p-4 bg-[#edededb0] rounded-[20px] mt-5" >
            <h3 className="mb-4 text-[20px] font-bold text-[black] ml-4" style={{ color: 'black' }}>Transaction History</h3>
            <div className="overflow-x-auto p-4 ">
              <div className="bg-gray-800 text-white rounded-[15px] shadow-xl mb-4 p-4">
                <div className="grid grid-cols-5 gap-4  pb-2">
                  <div className="font-semibold">#</div>
                  <div className="font-semibold">Date</div>
                  <div className="font-semibold">Item Name</div>
                  <div className="font-semibold">Total Items</div>
                  <div className="font-semibold">Amount (₹)</div>
                </div>
              </div>

              <div className="bg-white rounded-[20px] shadow-md">
                {
                  historydata.map(items => {
                    return (
                      <>
                        <div className="border-b border-gray-300 rounded-[20px] hover:bg-gray-200 transition duration-200 cursor-pointer p-4 grid grid-cols-5 gap-4" onClick={() => {
                          setBillDetails(Array(items))

                          if (billDetails) { document.getElementById("BILL").style.display = "flex"; }
                        }}>
                          <div>00{items.id}</div>
                          <div>{items.order_time.split('T')[0]}</div>
                          <div>{items.cart_items[0].title}</div>
                          <div>{items.cart_items.length}</div>
                          <div>₹ {items.total_price}</div>
                        </div>
                      </>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>

        {billDetails && billDetails.map(element => {
          return (
            <>
              <div id="BILL" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 hidden ">

                <div className="bg-white rounded-[15px] shadow-lg w-[52%]  p-8 text-center scaleA">
                  <h2 className="text-3xl font-bold text-gray-800  my-4 font-mono">Bill Details</h2>

                  {/* Order Date */}
                  <div className="flex justify-between mb-4">
                    <p className="text-lg font-medium text-gray-700">Order Date</p>
                    <p className="text-gray-600">{element.order_time.split('T')[0]}</p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-300 my-4" />

                  {/* Coffee Items */}
                  <div className="mb-4">
                    <div className="text-lg font-bold text-[#808080c5] flex py-2 font-serif ">Coffee Items</div>
                    {
                      groupItems(element.cart_items).map(item => (
                        <div className="flex justify-between my-2" key={item.id}>
                          <span className='font-serif'>{item.title} (x {item.quantity})</span>
                          <span className="font-[500] font-serif">₹ {item.price * item.quantity}</span>
                        </div>
                      ))
                    }

                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-300 my-4" />

                  {/* Delivery Fee */}
                  <div className="flex justify-between mb-4">
                    <p className="text-lg font-medium text-gray-700 font-serif">Delivery Fee</p>
                    <p className="text-gray-600 font-serif">₹ 100</p>
                  </div>

                  <div className="h-[1px]  my-4 border-dashed  border-[1px]" />

                  {/* Grand Total */}
                  <div className="flex justify-between mb-4">
                    <p className="text-xl font-bold text-gray-800 font-serif">Total Amount</p>
                    <p className="text-2xl font-semibold text-gray-900 font-serif">₹{element.total_price}</p>
                  </div>


                  {/* Close Button */}
                  <div className="mt-6">
                    <button
                      onClick={() => { document.getElementById("BILL").style.display = "none"; }}
                      className="px-4 py-3 mt-4 bg-[#1F2937] w-full rounded-[15px] text-white hover:bg-[#1f2937cb] transition"
                      aria-label="Close Bill" id='closeBill'
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        document.getElementById("closeBill").style.display = "none";
                        document.getElementById("pdfdownload").style.display = "none";
                        window.print()
                        document.getElementById("closeBill").style.display = "block";
                        document.getElementById("pdfdownload").style.display = "block";
                      }}
                      className="px-4 py-3 mt-4 bg-[white] w-full rounded-[15px] text-[#1F2937] transition border font-bold border-[gray]"
                      aria-label="Close Bill" id='pdfdownload'>
                      Get PDF Receipt
                    </button>
                  </div>
                </div>
              </div>
            </>
          )
        })}


      </>
    );
  }
  else {
    return (
      <>
        {
          navigate('404')
        }
      </>
    )
  }
};

export default UserDashboard;
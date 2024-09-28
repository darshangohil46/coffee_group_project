import { useState, useEffect } from "react";

const Bestseller = ({ value }) => {
    const [drinks, setDrinks] = useState([]);
    const [data, setData] = useState(null);
    const [userId, setUserId] = useState(undefined);

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
                setDrinks(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const addToCart = (drink) => {

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


    return (
        <>
            <div className="sm:px-0 md:w-4/5 m-auto ">
                <p className="font-bold text-[#000000c4] mt-20 text-[18px]">Bestseller</p>
                <p className="text-[#000000af] mt-2 mb-7">Everyone's favorite Starbucks put together in a specially curated collection</p>
            </div>

            <div className="sm:px-0 w-[80%] mx-auto flex flex-wrap items-center mb-24 ">
                {
                    drinks.map((drink, index) => (
                        <div key={index} className='flex w-[420px] px-4 bg-[#F9F9F9] py-5 rounded-[8px] item_container mr-[28px] my-[15px] scaleA'>
                            <div>
                                <img src={drink.img == "https://www.starbucks.in/assets/icon/placeholder.svg" ? "https://starbucksstatic.cognizantorderserv.com/Items/Small/108056.jpg" : drink.img}
                                    className='rounded-full'
                                    style={{ maxWidth: "99px", maxHeight: "99px" }}
                                    alt={drink.title}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <div className='px-4 mb-[5px]' style={{ minHeight: "150px" }}>
                                    {/* <div className='mb-1'>
                                        <img src="https://www.starbucks.in/assets/icon/veg.svg" alt="veg-item" style={{ width: '16px', height: '16px' }} />
                                    </div> */}
                                    <div className='mb-1.5 text-[18px] font-medium'>
                                        {drink.title}
                                    </div>
                                    <div className='mb-2 text-[13px] font-normal text-[#21252976] FontTitle'>
                                        {drink.description}
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between px-3'>
                                    <div className='text-[20px] font-serif font-normal'>₹ {drink.price}</div>
                                    <button onClick={() => {
                                        if(Boolean(window.localStorage.getItem('loggedIn'))){
                                            addToCart(drink)
                                            value.setnotify(true)
                                        }
                                    }} className='px-6 py-2 bg-[#00754A] hover:bg-[#979797] rounded-[30px] text-[14px] font-bold text-[#C6C6C6] Add_item'>Add Item</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default Bestseller;

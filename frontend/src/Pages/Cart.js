import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import Swal from 'sweetalert2';
import '../App.css'

function Cart() {
    const [quantities, setQuantities] = useState({}); // Track quantities for each item
    const [data, setData] = useState(null);
    const [userId, setUserId] = useState(undefined);
    const [cartItems, setCartItems] = useState([]); // State to hold cart items
    const [deliveryFee, setDeliveryFee] = useState(0); // Example delivery fee
    const [change, setChange] = useState(0)
    const [discount, setDiscount] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/user-auth/', {
            method: 'GET',
            credentials: 'include', // Include credentials (e.g., cookies) if needed
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.user) {
                    setUserId(data.user.id);
                    setData(data.user);
                    setCartItems(data.user.cart || []);
                    let dummyCart = []
                    data.user.cart.map(items => {
                        let checkItems = true
                        console.log(items)
                        dummyCart.map(items2 => {
                            if (items.cart_details.title == items2.cart_details.title) {
                                checkItems = false
                                items2.cart_details.quantities = items2.cart_details.quantities + 1
                            }
                        })
                        if (checkItems) {
                            items.cart_details.quantities = 1;
                            dummyCart.push(items)
                        }
                    })
                    console.log(dummyCart)
                    setCartItems(dummyCart)
                    let dummyquantities = {}
                    dummyCart.map(items => {
                        dummyquantities[items.cart_details.title] = items.cart_details.quantities
                    })
                    setQuantities(dummyquantities)
                    if (data.user.cart) {
                        setDeliveryFee(100)
                    }
                    console.log("Cart data:", data.user.cart);
                } else {
                    console.log("Authentication failed:", data.message);
                }
            })
            .catch(error => console.error("Error:", error));
    }, [change]);

    // subtotal, total
    const subtotal = cartItems.reduce((total, item) => {
        const price = parseFloat(item.cart_details.price);
        return total + price * (quantities[item.cart_details.title] || 1);
    }, 0);
    let total = subtotal + deliveryFee - (subtotal * discount);

    const applyDiscount = (percentage) => {
        setDiscount(percentage);
    };


    const addToCart = async (item) => {
        const cartItem = {
            user_id: userId,
            cart_details: {
                title: item.cart_details.title,
                price: item.cart_details.price,
                img: item.cart_details.img,
                description: item.cart_details.description,
            }
        };
        console.log(cartItem);

        await fetch('http://localhost:8000/api/coffee-cart/', {
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
        if (change) {
            setChange(0)
        }
        else {
            setChange(1)
        }
        window.location.reload()
    };

    // remove from cart
    const removeItemFromCart = async (title, ress) => {

        if (ress) {
            let askRemove = false
            await Swal.fire({
                title: 'Remove Item?',
                text: `Are you sure you want to remove ${title} from your cart?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#FF4757', // Custom confirm button color
                cancelButtonColor: '#1E90FF',   // Custom cancel button color
                confirmButtonText: 'Yes, remove it',
                cancelButtonText: 'No, keep it',
                customClass: {
                    title: 'swal-title',
                    popup: 'swal-popup',
                    content: 'swal-content',
                    confirmButton: 'swal-confirm',
                    cancelButton: 'swal-cancel',
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    askRemove = true
                }
            });
            if (askRemove) {
                await fetch(`http://localhost:8000/api/cart/remove/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ Itemtitle: title, res: true })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message) {
                            console.log(data.message);
                            if (cartItems.length == 1)
                                window.location.reload();
                        } else {
                            console.error(data.error);
                        }
                    })
                    .catch(error => console.error("Error:", error));
                if (change) {
                    setChange(0)
                }
                else {
                    setChange(1)
                }
            };
        }
        else {
            await fetch(`http://localhost:8000/api/cart/remove/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Itemtitle: title, res: false })
            })
                .then(response => response.json())
                .then(data => {

                    if (data.message) {
                        console.log(data.message);
                        console.log(cartItems.length)
                    } else {
                        console.error(data.error);
                    }
                })
                .catch(error => console.error("Error:", error));
            if (change) {
                setChange(0)
            }
            else {
                setChange(1)
            }
        }
    }

    // when place order button cliked
    function placeOrder() {
        try {
            const response = fetch('http://localhost:8000/api/place-order/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ discount: discount })
            });

            const result = response.json();
            if (response.ok) {
                console.log('Order placed successfully:', result);

            } else {
                console.error('Error placing order:', result.error);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <>
            <div className='bg-[#1e3932] py-2 sm:py-6 mb-6'>
                <div className='text-white text-lg tracking-wide w-full'>
                    <div className='px-4 sm:px-0 md:w-4/5 m-auto flex justify-between items-center gap-5'>
                        <p className='text-sm sm:text-xl max-w-md sm:max-w-xl font-light'>Home &gt; Cart</p>
                    </div>
                </div>
            </div>

            {Boolean(window.localStorage.getItem('loggedIn')) == true &&
                <>
                    {cartItems.map((item) => (
                        <div key={item.cart_details.title} className='flex px-4 bg-[#F9F9F9] py-5 rounded-[15px] item_container mx-auto w-[80%] my-[15px] scaleA'>
                            <div>
                                <img src={item.cart_details.img} alt={item.cart_details.title} className='rounded-full' style={{ maxWidth: "99px", maxHeight: "99px" }} />
                            </div>
                            <div className='flex flex-col w-full'>
                                <div className='px-4'>
                                    <div className='text-[20px] font-bold font-serif' style={{ textOverflow: "ellipsis" }}>
                                        {item.cart_details.title}
                                    </div>
                                    <div className='mb-6 text-[20px] font-serif font-normal'>₹ {item.cart_details.price}</div>
                                    <div className="justify-between flex">
                                        <div className="py-1.5 bg-[#80808014] rounded-[30px] text-[18px] font-bold text-[black] font-serif inline-block shadow-sm">
                                            <div className="inline px-4 py-2 bg-white rounded-[13px] font-extrabold hover:bg-[#00754A] hover:text-white" onClick={() => removeItemFromCart(item.cart_details.title, false)}>
                                                <i className="ri-subtract-fill"></i>
                                            </div>
                                            <div className="px-5 inline">{quantities[item.cart_details.title]}</div>
                                            <div className="inline px-4 py-2 bg-white rounded-[13px] font-extrabold hover:bg-[#00754A] hover:text-white" onClick={() => addToCart(item)}>
                                                <i className="ri-add-fill"></i>
                                            </div>
                                        </div>
                                        <i
                                            className="ri-delete-bin-6-fill text-[#0000009e] hover:text-[#ff0000dd]"
                                            style={{ fontSize: "22px" }}
                                            onClick={() => removeItemFromCart(item.cart_details.title, true)} // Call the function on click
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}


                    <div className='flex w-[80%] flex-col px-4 bg-[#F9F9F9] py-5 rounded-[15px] item_container mx-auto my-[15px] scaleA'>
                        <div className="flex justify-between w-full px-4 font-bold text-[#000000cb] font-serif mb-3">
                            <div>Bill Details</div>
                        </div>
                        <div className="flex justify-between w-full px-4 font-bold text-[#8080807f] mb-1.5">
                            <div>Item total</div>
                            <div className="font-serif">₹ {subtotal.toFixed(2)}</div>
                        </div>
                        <div className="flex justify-between w-full px-4 font-bold text-[#8080807f] mb-1.5">
                            <div>Delivery Fee</div>
                            <div className="font-serif">₹ {deliveryFee}</div>
                        </div>
                        {discount &&
                            <>

                                <div className="flex justify-between w-full px-4 font-bold text-[#8080807f] mb-1.5">
                                    <div>Applied Discount</div>
                                    <div className="font-serif">{discount * 100} %</div>
                                </div>
                                <div className="flex justify-between w-full px-4 font-bold text-[#8080807f] mb-1.5">
                                    <div>Discount amount</div>
                                    <div className="font-serif">{(subtotal * discount).toFixed(2)}</div>
                                </div>
                            </>
                        }
                        <hr className="mt-3" />
                        <div className="flex justify-between w-full px-4  text-[18px] font-bold text-[#000000cb] my-2 font-serif">
                            <div>GRAND TOTAL</div>
                            <div>₹ {total.toFixed(2)}</div>
                        </div>
                    </div>
                    {/* copen------------------------------------------------------------------------------------ */}
                    <div className="w-[80%] mx-auto bg-[#00754A] hover:bg-[#979797] px-4 py-5 text-center rounded-[16px] text-white item_container font-semibold text-[20px] mb-14 hover:cursor-pointer" onClick={() => {
                        if (deliveryFee > 0) {
                            document.getElementById('mainCoupen').style.display = 'block';
                        }
                        else {

                        }
                    }}>
                        Apply coupon
                    </div>
                    <div id="mainCoupen" className="hidden bg-gray-100 p-4 rounded shadow-md mx-[200px]">
                        <div onClick={() => { { applyDiscount(0.20) }  }} className="text-blue-600 font-semibold mb-2 rounded-[15px] cursor-pointer shadow-md p-5 bg-[#80808059]">
                            Flate 20% - Get 20% off on order above 2500
                        </div>
                        <div onClick={() => { if (total > 5000) { applyDiscount(0.50) } else { alert("Please select item worth 5000 or more") } }} className="text-green-600 font-semibold rounded-[15px] cursor-pointer shadow-md p-5 bg-[#80808071]">
                            Flate 50% - Get 20% off on order above 5000
                        </div>
                    </div>
                    <div className="w-[80%] mx-auto bg-[#00754A] hover:bg-[#979797] px-4 py-5 text-center rounded-[16px] text-white item_container font-semibold text-[20px] mb-14 hover:cursor-pointer" onClick={() => {
                        if (deliveryFee > 0) {
                            Swal.fire({
                                title: "Order Placed!",
                                text: "Thank you for your order. We will process it shortly.",
                                icon: "success",
                                button: "Okay",
                                customClass: {
                                    popup: 'swal-popup',
                                    confirmButton: 'swal-AccountOk', // Optional: Custom class for styling
                                },
                            }).then(result => {
                                placeOrder()
                                if (result.isConfirmed) {
                                    window.location.reload()
                                }
                            })
                        }
                        else {
                            Swal.fire({
                                title: "Order Not Placed",
                                text: "You cannot place an order because the item was not found.",
                                icon: "error",
                                button: "Okay",
                                customClass: {
                                    popup: 'swal-popup',
                                    confirmButton: 'swal-AccountOk', // Optional: Custom class for styling
                                },
                            });
                        }
                    }}>
                        Place Order
                    </div>
                </>
            }

            {deliveryFee == 0 & Boolean(window.localStorage.getItem('loggedIn')) != true &&
                <>
                    <div className="text-center mt-4 font-semibold text-[20px] w-full text-[#000000b7]">
                        <img src='https://www.starbucks.in/assets/images/noSearchFound.svg' className="mx-auto" />
                        <div className="mt-7">No items found. Please explore.</div>
                    </div>
                </>
            }
        </>
    );
}

export default Cart;

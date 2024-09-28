import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

function Home({value}) {
  const [finalData, setFinalData] = useState([]);
  const [randomData, setRandomData] = useState([]); // To store random 3 items
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let Data = [];

        // Fetch drinks data
        const drinkResponse = await fetch("http://127.0.0.1:8000/api/drink/");
        const drinkData = await drinkResponse.json();
        Data = [...Data, ...drinkData];

        // Fetch food data
        const foodResponse = await fetch("http://127.0.0.1:8000/api/food/");
        const foodData = await foodResponse.json();
        Data = [...Data, ...foodData];

        // Fetch merchandise data
        const merchandiseResponse = await fetch("http://127.0.0.1:8000/api/merchandise/");
        const merchandiseData = await merchandiseResponse.json();
        Data = [...Data, ...merchandiseData];

        // Fetch coffee at home data
        const coffeeAtHomeResponse = await fetch("http://127.0.0.1:8000/api/coffee-at-home/");
        const coffeeAtHomeData = await coffeeAtHomeResponse.json();
        Data = [...Data, ...coffeeAtHomeData];

        // Fetch ready-to-eat data
        const readyToEatResponse = await fetch("http://127.0.0.1:8000/api/ready-to-eat/");
        const readyToEatData = await readyToEatResponse.json();
        Data = [...Data, ...readyToEatData];

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

        setFinalData(Data);
        const shuffledData = Data.sort(() => 0.5 - Math.random());
        const selectedData = shuffledData.slice(0, 3);
        setRandomData(selectedData);
        console.log(selectedData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addToCart = (drink) => {

    const cartItem = {
        user_id: userId,
        cart_details: {
            title: drink.title,
            price: drink.price,
            img: drink.img,
            description: drink.text,
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
      <div className='bg-[#1e3932] py-2 sm:py-6'>
        <div className=' text-white  text-lg tracking-wide w-full'>
          <div className='px-4  sm:px-0 md:w-4/5 m-auto flex justify-between items-center gap-5'>
            <p className='text-sm sm:text-xl max-w-md sm:max-w-xl font-light'>A world of rewards awaits you!</p>
            {/* <Link to={"/rewards"} className='text-sm border-2 px-2 py-1 rounded-full whitespace-nowrap'>Know More</Link> */}
          </div>
        </div>
      </div>

      {/* Handcrafted Curations */}
      <div className='bg-white py-14 rounded-b-[25px] shadow-md'>
        <div className='px-2  sm:px-0 md:w-4/5 m-auto'>
          <h1 className='text-[#1e3932] text-2xl font-bold mb-6'>Handcrafted Curations</h1>
          <div className='flex items-center text-center flex-wrap justify-around'>
            <a className="flex justify-center items-center flex-col  " >
              <Link to="Order"><img src={"https://www.starbucks.in/assets/icon/Bestseller.webp"} className="w-32 h-32 drop-shadow-xl sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full hover:border-2 border-green-600 border-solid m-1 scaleA" /></Link>
              <p className='font-medium text-sm whitespace-normal sm:whitespace-nowrap mt-2 '>Bestseller</p>
            </a>

            <a className="flex justify-center items-center flex-col " >
              <Link to="Order/drinks"><img src={"	https://www.starbucks.in/assets/icon/Drinks.webp"} className="w-32 h-32 drop-shadow-xl  sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full hover:border-2 border-green-600 border-solid m-1 scaleA" /></Link>
              <p className='font-medium text-sm whitespace-normal sm:whitespace-nowrap mt-2 '>Drinks</p>
            </a>

            <a className="flex justify-center items-center flex-col " >
              <Link to="/Order/Food"><img src={"https://www.starbucks.in/assets/icon/Food.webp"} className="w-32 h-32 drop-shadow-xl  sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full hover:border-2 border-green-600 border-solid m-1 scaleA" /></Link>
              <p className='font-medium text-sm whitespace-normal sm:whitespace-nowrap mt-2 '>Food</p>
            </a>

            <a className="flex justify-center items-center flex-col " >
              <Link to="/Order/Merchandise"><img src={"https://starbucksstatic.cognizantorderserv.com/Items/Small/114615_1.png"} className="w-32 h-32 drop-shadow-xl  sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full hover:border-2 border-green-600 border-solid m-1 scaleA" /></Link>
              <p className='font-medium text-sm whitespace-normal sm:whitespace-nowrap mt-2 '>Merchandise</p>
            </a>

            <a className="flex justify-center items-center flex-col " >
              <Link to="/Order/CoffeeAtHome"><img src={"https://www.starbucks.in/assets/icon/CoffeeAtHome.webp"} className="w-32 h-32 drop-shadow-xl  sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full hover:border-2 border-green-600 border-solid m-1 scaleA" /></Link>
              <p className='font-medium text-sm whitespace-normal sm:whitespace-nowrap mt-2 '>Coffee At Home</p>
            </a>

            <a className="flex justify-center items-center flex-col " >
              <Link to="/Order/ReadyToEat"><img src={"https://www.starbucks.in/assets/icon/ReadyToEat.webp"} className="w-32 h-32 drop-shadow-xl sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full hover:border-2 border-green-600 border-solid m-1 scaleA" /></Link>
              <p className='font-medium text-sm whitespace-normal sm:whitespace-nowrap mt-2 '>Ready To Eat</p>
            </a>
          </div>
        </div>
      </div>


      {/* Barista Recommends */}
      <div className="h-[300px] py-7 ">
        <div className='px-4 md:px-0  sm:px-0 md:w-4/5 m-auto relative'>
          <h1 className='text-[#1e3932] text-2xl font-bold mb-4'>Barista Recommends</h1>
          <div className='my-10'>
            <div className='flex gap-2 md:gap-6 overflow-x-scroll w-full absolute top-16 sm:px-4 scrollbar-none'  >
              {
                randomData.map(items => {
                  return (<>

                    <div className='w-full bg-white border max-w-sm min-w-[400px] sm:min-w-[425px] py-4 px-5 box-border rounded-[8px] border-slate-400 BOX mb-4' style={{ borderColor: "rgba(0, 0, 0, .175)" }}>
                      <div className='flex gap-4'>
                        <img src={items.img} className='w-20 bg-red-500 h-20 rounded-[10px] object-cover' />
                        <div>
                          <img src={'https://www.starbucks.in/assets/icon/veg.svg'} className='' />
                          <h3 className='font-semibold'>{items.title}</h3>
                          <p className='text-xs text-gray-400'>{items.text}</p>
                        </div>
                      </div>
                      <div className='flex justify-between font-semibold my-2 mt-4' style={{ alignItems: "center" }}>
                        <p className="font-serif font-light">₹ <span>{items.price}</span></p>
                        <button 
                        onClick={() => {
                          if(Boolean(window.localStorage.getItem('loggedIn'))){
                              addToCart(items)
                              value.setnotify(true)
                          }}}className='text-white bg-[#00754A] hover:bg-[#1e3932] px-6 py-2 rounded-full text-[12px] ADD_item_Btn'>Add Item</button>
                      </div>
                    </div>
                  </>)
                })
              }
            </div>
          </div >
        </div>
      </div>



      < section className='rounded-t-[30px] shadow-md' style={{ backgroundColor: "white" }} >
        <div className='p-8 px-2 sm:px-0 md:w-4/5 m-auto relative mt-3'>
          <div className='flex  items-center w-full justify-between '>
            <h1 className='text-[#1e3932] text-2xl font-bold m-0'>Learn more about the world of coffee!</h1>
            <Link to="/Coffeculture"><button className='text-green-800 font-semibold m-0'>Discover More</button></Link>
          </div>

          <div className='h-96 w-full my-10 rounded-[10px] overflow-hidden relative cursor-pointer'>
            <img src={'https://preprodtsbstorage.blob.core.windows.net/cms/uploads/ICW_Live_Event_Day5_41f11ca3d2.jpg'} className="h-full w-full object-cover" />
            <div className='h-full bg-black bg-opacity-40 hover:bg-opacity-70 w-full absolute top-0 transition-all p-7 flex flex-col justify-between'>
              <p className='bg-green-50 rounded-[5px] w-24 text-[12px] p-1 font-bold text-green-600 text-center'>Coffee Culture</p>
              <div className='text-white'>
                <h2 className='text-3xl font-bold py-5 text-white'>Art & Science Of Coffee Brewing</h2>
                <p>Master the perfect brew with Starbucks! Learn the art and science of coffee brewing.</p>
                <Link to="/Coffeculture"><button className='bg-white text-black w-full max-w-[200px] font-semibold text-sm py-2 rounded-full mt-8'>Learn More</button></Link>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-center sm:hidden'>
          <button className='bg-black text-white font-bold px-3 py-1 rounded-full'>Discover More</button>
        </div>
      </section >
      <Footer />
    </>
  )
}
export default Home;
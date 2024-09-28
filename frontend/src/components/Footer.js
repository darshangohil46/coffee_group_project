import { Link } from "react-router-dom";
import { BsInstagram, BsTwitter } from 'react-icons/bs'
import { CgFacebook } from "react-icons/cg"
const Footer =()=>{
    return(
        <>
        <div className='bg-[#0e382c] w-full py-5 hidden sm:block'>
            <div className='p-8 px-4 sm:px-0 md:w-4/5 m-auto relative mt-12 '>
                <div className='grid grid-cols-5'>
                    <div className='min-w-[30px] text-white font-bold text-[25px]'>
                        BORCELLE
                    </div>
                    <div className='flex flex-col text-white'>
                        <a to={""} className="font-bold text-lg mb-4">AboutUS</a>
                        <a to={""} className="text-sm mb-6">Our Heritage</a>
                        <a to={""} className="text-sm mb-6">Our Company</a>
                        <a to={""} className="text-sm mb-6">Coffee house</a>
                    </div>
                    <div className='flex flex-col text-white'>
                        <a to={""} className="font-bold text-lg mb-4">Responsibility</a>
                        <a to={""} className="text-sm mb-6">Community</a>
                        <a to={""} className="text-sm mb-6">Ethical Sourcing</a>
                        <a to={""} className="text-sm mb-6">Enviroment</a>
                        <a to={""} className="text-sm mb-6">Diversity</a>
                    </div>
                    <div className='flex flex-col text-white'>
                        <a to={""} className="font-bold text-lg mb-4">Quick as</a>
                        <a to={""} className="text-sm mb-6">Carees</a>
                        <a to={""} className="text-sm mb-6">Season's Gifting</a>
                        <a to={""} className="text-sm mb-6">FAQs</a>
                        <a to={""} className="text-sm mb-6">Customer Service</a>
                        <a to={""} className="text-sm mb-6">Delivery</a>
                    </div>
                    <div className='flex flex-col text-white'>
                        <a to={""} className="font-bold text-lg mb-4">SOCIAL MEDIA</a>
                        <div className='flex gap-5 text-2xl'>
                            <a href='#'><BsInstagram /></a>
                            <a href='#'><CgFacebook /></a>
                            <a href='#'><BsTwitter /></a>
                        </div>
                    </div>
                </div>

                <div className='border-t border-solid mt-16 text-gray-100 py-3 flex justify-between'>
                        <div className='text-sm'>
                            <a to={""} className="pr-5 border-r">Web Accessiblity</a>
                            <a to={""} className="pr-3 pl-3 border-r">Privacy Statement</a>
                            <a to={""} className="pr-3 pl-3 border-r">Terms of Use</a>
                            <a to={""} className="pr-3 pl-3">Contact Us</a>
                        </div>
                        <p className='text-xs'>© 2023 Borcelle Coffee Company. All rights reserved.</p>
                </div>
            </div>

        </div>
        </>
    )
}
export default Footer;
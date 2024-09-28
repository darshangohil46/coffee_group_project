import { useEffect } from "react";

const Coffeculture =()=>{
    useEffect(()=>{
          document.body.className="serch_body"
    },[])
    return(
        <>
           <div className="w-[80%] m-auto my-3 text-[#000000a4]"> Home &gt; Coffeculture</div>
           <div className="w-[80%] m-auto">
              <div className="font-bold text-[#000000aa] text-[24px]">
              Art & Science of Coffee Brewing
              </div>
              <p className='bg-green-50 rounded-[5px] w-14 text-[12px] p-1 font-bold text-green-600 text-center my-4'>Aricales</p>
              <div className="text-[#000000aa] my-2 text-[18px]">
              Balance artistry and precision in brewing with "Art & Science of Coffee Brewing."
              </div>
              <div className="text-[#000000aa] my-2 text-[18px]">
              Demystify the barista's craft and elevate your home brewing skills.
              </div>
              <img src="https://preprodtsbstorage.blob.core.windows.net/cms/uploads/ICW_Live_Event_Day5_1_decd6c1b6f.jpg" className="rounded-[15px] my-7"/>
           </div>
        </>
    )
}
export default Coffeculture ;
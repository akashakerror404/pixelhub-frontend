import React from 'react'
import logo from '../../../static/blog hero.jpg';

function Bloghero() {
  return (
    <div>



        
        <div class="flex  ">
            <div class="w-full bg-[#90c6e8] justify-center items-center ">
                
            <div className="flex flex-shrink-0 items-center justify-center ">
                <img
                  className="md:h-96 h-56 w-auto"
                  src={logo}
                  alt="Your Company"
                />
              </div>

            </div>
            </div>
                
    </div>
  )
}

export default Bloghero

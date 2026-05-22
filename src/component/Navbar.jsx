import React, { useState } from "react";
import { Link } from "react-router-dom";

import { IoMdSearch } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

const Navbar = () => {

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div>

      {/* DESKTOP NAVBAR */}
      <nav className='flex justify-between pt-[27px] hidden md:block'>

        <div className="flex">

          <div className='flex items-center gap-[2rem]'>

            <div className='text-white font-bold text-[40px] ml-[20px]'>
              M
            </div>

    <ul className='flex text-[22px] gap-[25px] mt-[10px] text-white'>
          
          <li>
         <Link to="/">Home</Link>
        </li>

          <li><a href="#creativity">Creativity</a></li>
          <li><a href="#selfies">Selfies</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#highlightening">Highlightening</a></li>
   
        
       <li>
         <Link to="/Login">Login</Link>
        </li>

      <li>
        <Link to="/Signup">Signup</Link>
       </li>
</ul>

          </div>

          <div className='flex ml-[11%]'>

            <div className="relative inline-block text-white font-bold">

              <IoMdSearch className="text-white absolute left-[18px] top-1/3" />

              <input
                type='text'
                placeholder='search or create'
                className='p-[10px] border-[1px] text-[15px] rounded-[8px] m-[10px] pl-[30px] border-white text-white'
              />

            </div>

          </div>

        </div>

      </nav>


      {/* MOBILE NAVBAR */}
      <div className="flex justify-between px-[15px] pt-[15px] md:hidden">

        <div className="flex items-center gap-[20px]">

          <p className="text-[30px] text-white font-bold">
            magnific
          </p>

          {/* CLICKABLE HAMBURGER */}
          {
            openMenu ? (
              <IoClose
                onClick={() => setOpenMenu(false)}
                className="text-white text-[35px] cursor-pointer"
              />
            ) : (
              <CiMenuBurger
                onClick={() => setOpenMenu(true)}
                className="text-white text-[30px] cursor-pointer"
              />
            )
          }

        </div>

        <div className="flex gap-[20px] pt-[10px]">

          <IoMdSearch className="text-white mt-[5px] text-[25px]" />

        </div>

      </div>


      {/* MOBILE MENU */}
      {
        openMenu && (
          <div className="md:hidden bg-black text-white flex flex-col gap-[25px] p-[20px] text-[22px]">
             
              <li>
         <Link to="/">Home</Link>
        </li>

            
            <a href="#creativity">Creativity</a>
            <a href="#selfies">Selfies</a>
            <a href="#about">About</a>
            <a href="#highlightening">Highlightening</a>
            
              <li>
         <Link to="/Login">Login</Link>
        </li>

            <li>
        <Link to="/Signup">Signup</Link>
       </li>

          </div>
        )
      }

    </div>
  )
}

export default Navbar
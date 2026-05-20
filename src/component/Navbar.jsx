import React, { useState } from "react";
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
              Magnific
            </div>

            <ul className='flex text-[22px] gap-[25px] mt-[10px] text-white'>
              <li><a href="#home">Home</a></li>
              <li><a href="#creativity">Creativity</a></li>
              <li><a href="#selfies">Selfies</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#highlightening">Highlightening</a></li>
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

            <button className='bg-transparent border-[2px] text-[17px] p-[10px] m-[10px] rounded-[8px] border-white text-white'>
              Login
            </button>

            <button className='bg-yellow-400 font-bold rounded-[7px] mr-[10px] p-[6px]'>
              Sign Up
            </button>

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

          <button className='bg-yellow-400 font-bold rounded-[7px] mr-[10px] p-[6px]'>
            Login
          </button>

        </div>

      </div>


      {/* MOBILE MENU */}
      {
        openMenu && (
          <div className="md:hidden bg-black text-white flex flex-col gap-[25px] p-[20px] text-[22px]">

            <a href="#home">Home</a>
            <a href="#creativity">Creativity</a>
            <a href="#selfies">Selfies</a>
            <a href="#about">About</a>
            <a href="#highlightening">Highlightening</a>

          </div>
        )
      }

    </div>
  )
}

export default Navbar
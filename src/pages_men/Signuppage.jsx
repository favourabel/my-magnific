import React from 'react';
import Navbar from '../component/Navbar';

const Signuppage = () => {
  return (
    <div className='bg-black min-h-screen'>

      <Navbar />

      {/* SIGNUP CONTAINER */}
      <div className='bg-gray-700 w-[95%] md:w-[80%] m-auto rounded-[8px] py-[40px] mt-[60px]'>

        {/* FORM SECTION */}
        <form className='w-[90%] sm:w-[70%] md:w-[45%] lg:w-[30%] m-auto mt-[30px]'>

          {/* HEADING */}
          <div>
            <p className='text-green-400 text-[22px] md:text-[30px] font-bold text-center'>
              Create an Account with us today
            </p>

            <p className='text-green-400 text-[35px] md:text-[45px] font-bold text-center mt-[10px]'>
              Sign up
            </p>
          </div>

          {/* EMAIL */}
          <div>
            <input
              type='text'
              placeholder='Email'
              className='border-[2px] p-[12px] text-[17px] rounded-[8px] mt-[40px] w-full bg-transparent text-white'
            />
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type='password'
              placeholder='Password'
              className='border-[2px] p-[12px] text-[17px] rounded-[8px] mt-[20px] w-full bg-transparent text-white'
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <input
              type='password'
              placeholder='Confirm Password'
              className='border-[2px] p-[12px] text-[17px] rounded-[8px] mt-[20px] w-full bg-transparent text-white'
            />
          </div>

          {/* PHONE NUMBER */}
          <div>
            <input
              type='text'
              placeholder='Phone Number'
              className='border-[2px] p-[12px] text-[17px] rounded-[8px] mt-[20px] w-full bg-transparent text-white'
            />
          </div>

          {/* BUTTON */}
          <button className='text-[17px] bg-green-500 p-[12px] text-black rounded-[8px] mt-[40px] mb-[20px] w-full font-bold'>
            Signup
          </button>

        </form>

      </div>

    </div>
  )
}

export default Signuppage;
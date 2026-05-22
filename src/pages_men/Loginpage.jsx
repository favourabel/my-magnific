import React from 'react'
import Navbar from '../component/Navbar';

const App = () => {
  return (
    <div className='bg-black min-h-screen'>

      <Navbar />

      {/* LOGIN CONTAINER */}
      <div className='w-[95%] md:w-[80%] m-auto bg-gray-700 rounded-[8px] py-[60px] mt-[60px]'>

        {/* FORM BOX */}
        <div className='w-[90%] sm:w-[70%] md:w-[45%] lg:w-[30%] m-auto mt-[20px]'>

          <form>

            <div>
              <p className='text-green-400 text-[22px] md:text-[30px] mt-[20px] text-center'>
                Hello WelcomeBack to Magnific
              </p>
            </div>

            <p className='text-green-500 text-[40px] md:text-[50px] font-bold mt-[20px] text-center'>
              Login
            </p>

            {/* EMAIL INPUT */}
            <input
              type='text'
              placeholder='Email'
              className='border-[2px] p-[12px] text-[17px] rounded-[8px] mt-[20px] w-full bg-transparent text-white'
            />

            {/* PASSWORD INPUT */}
            <input
              type='password'
              placeholder='Password'
              className='border-[2px] p-[12px] text-[17px] rounded-[8px] mt-[25px] w-full bg-transparent text-white'
            />

            {/* FORGOT PASSWORD */}
            <a href='' className='text-[15px] text-white block mt-[10px]'>
              forgot password?
            </a>

            {/* BUTTON */}
            <button className='text-[17px] bg-green-500 p-[12px] text-black rounded-[8px] mt-[40px] mb-[20px] w-full font-bold'>
              Login
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default App;
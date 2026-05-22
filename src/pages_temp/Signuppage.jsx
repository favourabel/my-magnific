import React from 'react';
import Navbar from '../component/Navbar';


const Signuppage = () => {
  return (
    <div style={{backgroundColor : "black"}}>
        
          <Navbar />

         <div style={{backgroundColor : "grey"}} className=' w-[80%] m-auto rounded-[8px] py-[30px] mt-[60px]'>
              
          <form className='flex-col md:flex-row w-[25%] m-auto bg-grey-500 mt-[50px]'>

                 <div className='flex-col md:flex-row'>
                  <p className='text-green-400 text-[30px] font-bold'>Create an Account with us today</p>
             <p className='text-green-400 text-[40px]'>Sign up</p>
                </div>

                    <div>
             <input type='text' placeholder='Email' className='border-[2px] p-[10px] text-black font-bold text-[17px] rounded-[8px] mt-[40px] w-[110%] text-white' />
                    </div>

                    <div>
             <input type='password' placeholder='password'  className='border-[2px] p-[10px] text-black font-bold text-[17px] rounded-[8px] mt-[20px] w-[110%] text-white' />
                    </div>

                    <div>
             <input type='password' placeholder='confirm password' className='border-[2px] p-[10px] text-black font-bold text-[17px] rounded-[8px] mt-[20px] w-[110%] text-white'/>
                    </div>

                    <div>
             <input type='text' placeholder='phone number' className='border-[2px] p-[10px] text-black font-bold text-[17px] rounded-[8px] mt-[20px] w-[110%] text-white'/>
                  </div>
          </form>
           
            <center>
             <button className='text-[17px] bg-green-500 p-[12px] text-black rounded-[8px] m-auto mt-[40px] w-[28%] ml-[40px] mb-[60px]'>Signup</button>
           </center>

         </div>

       </div>

  )
}

export default Signuppage;

import React from 'react'
import Navbar from '../component/Navbar';



const App = () => {
  return (
    <div style={{backgroundColor: "black"}}>
         
         <Navbar />

      <div style={{backgroundColor: "grey"}} className='w-[80%] m-auto pt-[20px] rounded-[8px] py-[60px] mt-[60px]'>
         
           <div className='w-[25%] m-auto bg-grey-500 mt-[50px]'>

        <form className=''>
            <div>
          <p className='text-green-400 text-[30px] mt-[30px]'>Hello WelcomeBack to Magnific</p>
           </div>

          <p className='text-green-500 text-[50px] font-bold'>Login</p>
           
           <input type='text' placeholder='Email'  className='border-[2px] p-[10px] text-black font-bold text-[17px] rounded-[8px] mt-[20px] w-[120%] text-white'/>

           <input type='Password' placeholder='password' className='border-[2px] p-[10px] text-black font-bold text-[17px] rounded-[8px] mt-[25px] w-[120%] mb-[10px] text-white'/>

           <a href='' className='text-[15px] '>forgot password?</a>
        </form>
               <center>
           <button className='text-[17px] bg-green-500 p-[12px] text-black rounded-[8px] m-auto mt-[40px] mb-[60px] w-[120%]'>Login</button>
              </center>
            
    </div>

      </div>
      
    </div>
  )
}

export default App;
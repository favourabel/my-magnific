import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import { useNavigate } from 'react-router-dom';

const App = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    captcha: "",
  });

  const [message, setMessage] = useState("");

  // CAPTCHA CODE
  const captchaCode = "MAGNIFIC123";

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // EMAIL VALIDATION
    if (!formData.email.includes("@")) {
      setMessage("Email must include @");
      return;
    }

    // PASSWORD VALIDATION
    if (formData.password.length < 8) {
      setMessage("Password must be at least 8 characters");
      return;
    }

    // CAPTCHA VALIDATION
    if (formData.captcha !== captchaCode) {
      setMessage("Captcha verification failed");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("userData"));

    if (!savedUser) {

      setMessage("No account found");

      return;
    }

    if (
  formData.email === savedUser.email &&
  formData.password === savedUser.password
) {
  localStorage.setItem("isLogin", true);

  setMessage("Login successful");

  setTimeout(() => {
    navigate("/dashBoard");
  }, 2000); // delay before redirect

} else {

  if (formData.email !== savedUser.email) {
    setMessage("This email does not exist");
  } else {
    setMessage("Invalid password");
  }
}

  };

  return (
    <div className='bg-black min-h-screen'>

      <Navbar />

      {/* LOGIN CONTAINER */}
      <div className='w-[95%] md:w-[80%] m-auto bg-gray-700 rounded-[8px] py-[60px] mt-[60px]'>

        {/* FORM BOX */}
        <div className='w-[90%] sm:w-[70%] md:w-[45%] lg:w-[30%] m-auto mt-[20px]'>

          <form onSubmit={handleSubmit}>

            <div>
              <p className='text-green-400 text-[22px] md:text-[30px] mt-[20px] text-center'>
                Hello Welcome Back to Magnific
              </p>
            </div>

            <p className='text-green-500 text-[40px] md:text-[50px] font-bold mt-[20px] text-center'>
              Login
            </p>

            {/* EMAIL INPUT */}
            <div>
              <input
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                type='email'
                placeholder='Email'
                className='border-[2px] p-[12px] text-[17px] rounded-[8px] mt-[20px] w-full bg-transparent text-white'
              />

              {formData.email && !formData.email.includes("@") && (
                <p className='text-red-400 mt-[5px]'>
                  Email must include @
                </p>
              )}
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <input
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                type='password'
                placeholder='Password'
                className='border-[2px] p-[12px] text-[17px] rounded-[8px] mt-[25px] w-full bg-transparent text-white'
              />

              {formData.password && formData.password.length < 8 && (
                <p className='text-red-400 mt-[5px]'>
                  Password must be at least 8 characters
                </p>
              )}
            </div>

            {/* CAPTCHA SECTION */}
            <div className='mt-[25px]'>

              <p className='text-white mb-[10px]'>
                Verify you are not a bot
              </p>

              <div className='bg-black text-green-400 text-center p-[12px] rounded-[8px] font-bold tracking-[4px]'>
                {captchaCode}
              </div>

              <input
                name='captcha'
                value={formData.captcha}
                onChange={handleChange}
                required
                type='text'
                placeholder='Enter captcha code'
                className='border-[2px] p-[12px] text-[17px] rounded-[8px] mt-[15px] w-full bg-transparent text-white'
              />

              {formData.captcha &&
                formData.captcha !== captchaCode && (
                <p className='text-red-400 mt-[5px]'>
                  Captcha code is incorrect
                </p>
              )}

            </div>

            {/* FORGOT PASSWORD */}
            <a href='' className='text-[15px] text-white block mt-[10px]'>
              Forgot password?
            </a>

            {/* BUTTON */}
            <button
              type='submit'
              className='text-[17px] bg-green-500 p-[12px] text-black rounded-[8px] mt-[40px] mb-[20px] w-full font-bold'
            >
              Login
            </button>

            {message && (
              <p className='text-white text-center'>{message}</p>
            )}

          </form>

        </div>

      </div>

    </div>
  );
};

export default App;
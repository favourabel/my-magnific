import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import { useNavigate } from 'react-router-dom';

const Signuppage = () => {

  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    photo: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  // IMAGE HANDLE FUNCTION
  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    // IMAGE SIZE VALIDATION
    if (file.size > 2 * 1024 * 1024) {
      setMessage("Image too large. Please upload below 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {

      const base64 = reader.result;

      setImageUrl(base64);

      setFormData((prev) => ({
        ...prev,
        photo: base64,
      }));
    };

    reader.readAsDataURL(file);
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    // EMAIL VALIDATION
    if (!formData.email.includes("@")) {
      setMessage("Email must include @");
      return;
    }

    // FIRST NAME VALIDATION
    if (formData.firstName.trim() === "") {
      setMessage("Please input your first name");
      return;
    }

    // LAST NAME VALIDATION
    if (formData.lastName.trim() === "") {
      setMessage("Please input your last name");
      return;
    }

    // COUNTRY VALIDATION
    if (formData.country.trim() === "") {
      setMessage("Please input your country");
      return;
    }

    // PASSWORD VALIDATION
    if (formData.password.length < 8) {
      setMessage("Password must be at least 8 characters");
      return;
    }

    // CONFIRM PASSWORD VALIDATION
    if (formData.confirmPassword.length < 8) {
      setMessage("Confirm password must be at least 8 characters");
      return;
    }

    // PASSWORD MATCH VALIDATION
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    // PHONE NUMBER VALIDATION
    if (formData.phoneNumber.trim() === "") {
      setMessage("Please input your phone number");
      return;
    }

    // IMAGE VALIDATION
    if (!formData.photo) {
      setMessage("Please upload an image");
      return;
    }

    // CHECK IF EMAIL EXISTS
    const existingUser = JSON.parse(localStorage.getItem("userData"));

    if (existingUser && existingUser.email === formData.email) {
      setMessage("This email already exists");
      return;
    }

    try {

      // SAVE USER DATA TO LOCAL STORAGE
      localStorage.setItem("userData", JSON.stringify(formData));

      setMessage("Signup successful");

      // NAVIGATE TO LOGIN PAGE AFTER 2 SECONDS
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {

      setMessage("Storage error: image too large. Try smaller image.");
    }
  };



  return (
    <div className='bg-black min-h-screen px-[10px] sm:px-[20px]'>

      <Navbar />

      <div className='bg-gray-700 w-full sm:w-[95%] md:w-[80%] m-auto rounded-[8px] py-[30px] sm:py-[40px] mt-[40px] sm:mt-[60px] px-[15px] sm:px-[20px]'>

        <form
          className='w-full sm:w-[85%] md:w-[60%] lg:w-[40%] xl:w-[30%] m-auto mt-[20px] sm:mt-[30px]'
          onSubmit={handleSubmit}
        >

          <div>
            <p className='text-green-400 text-[18px] sm:text-[22px] md:text-[30px] font-bold text-center'>
              Create an Account with us today
            </p>

            <p className='text-green-400 text-[30px] sm:text-[35px] md:text-[45px] font-bold text-center mt-[10px]'>
              Sign up
            </p>
          </div>

          <div>

            <input
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              type='email'
              placeholder='Email'
              className='border-[2px] p-[10px] mt-[30px] w-full bg-transparent text-white'
            />

            {!formData.email.includes("@") && formData.email !== "" && (
              <p className='text-red-500 mt-[5px]'>
                Email must contain @
              </p>
            )}



            <input
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              required
              type='text'
              placeholder='First Name'
              className='border-[2px] p-[10px] mt-[20px] w-full bg-transparent text-white'
            />

            {formData.firstName === "" && (
              <p className='text-red-500 mt-[5px]'>
                Please input your first name
              </p>
            )}



            <input
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              required
              type='text'
              placeholder='Last Name'
              className='border-[2px] p-[10px] mt-[20px] w-full bg-transparent text-white'
            />

            {formData.lastName === "" && (
              <p className='text-red-500 mt-[5px]'>
                Please input your last name
              </p>
            )}



            <input
              name='country'
              value={formData.country}
              onChange={handleChange}
              required
              type='text'
              placeholder='Country'
              className='border-[2px] p-[10px] mt-[20px] w-full bg-transparent text-white'
            />

            {formData.country === "" && (
              <p className='text-red-500 mt-[5px]'>
                Please input your country
              </p>
            )}

          </div>



          <div>

            <input
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              type='password'
              placeholder='Password'
              className='border-[2px] p-[10px] mt-[20px] w-full bg-transparent text-white'
            />

            {formData.password.length > 0 &&
              formData.password.length < 8 && (
              <p className='text-red-500 mt-[5px]'>
                Minimum password length is 8 characters
              </p>
            )}



            <input
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              type='password'
              placeholder='Confirm Password'
              className='border-[2px] p-[10px] mt-[20px] w-full bg-transparent text-white'
            />

            {formData.confirmPassword.length > 0 &&
              formData.confirmPassword.length < 8 && (
              <p className='text-red-500 mt-[5px]'>
                Minimum confirm password length is 8 characters
              </p>
            )}

          </div>



          <div>

            <input
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              type='text'
              placeholder='Phone Number'
              className='border-[2px] p-[10px] mt-[20px] w-full bg-transparent text-white'
            />

            {formData.phoneNumber === "" && (
              <p className='text-red-500 mt-[5px]'>
                Please input your phone number
              </p>
            )}

          </div>



          {/* IMAGE INPUT */}
          <div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className='mt-[20px] text-white'
            />

          </div>



          <button
            type='submit'
            className='bg-green-500 p-[12px] mt-[35px] w-full font-bold'
          >
            Signup
          </button>



          {message && (
            <p className='text-white text-center mt-[10px]'>
              {message}
            </p>
          )}

        </form>

      </div>

    </div>
  );
};

export default Signuppage;
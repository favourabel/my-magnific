import { useState, useEffect, useRef } from "react";

import cocacola from "../assets/coca-cola.svg";
import ogilvy from "../assets/ogilvy.svg";
import rga from "../assets/rga.svg";
import wonder from "../assets/wonder.svg";
import guess from "../assets/guess.svg";
import nubank from "../assets/nu-bank.svg";
import { IoMdSearch } from "react-icons/io";
import myvideo from "../assets/myvideo.webm";
import fausto from "../assets/fausto.jpg";
import kids from "../assets/kids.jpg";
import panitan from "../assets/panitan.jpg";
import look from "../assets/look.jpg";
import vitaly from "../assets/vitaly.jpg";
import ben from "../assets/ben.jpg";
import samsung from "../assets/samsung.jpg";
import contentcreation from "../assets/content creation.mp4";
import { CiMenuBurger } from "react-icons/ci";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

export default function App() {

  // 🔥 ANIME SLIDER DATA
  const items = [
    "Generate images",
    "Shoot cinematic videos",
    "Build workflows",
    "Video upscaling",
    "Direct photoshoots",
    "Cast characters",
    "Stay on brand",
  ];

  const [active, setActive] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const [openIndex, setOpenIndex] = useState(null);

  const handleShow = (index) => {
    setOpenIndex(index);

    setTimeout(() => {
      setOpenIndex(null);
    }, 3000);
  };

 // 🔥 SCROLL REF FIXED
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;

    let scrollPosition = 0;
    const speed = 2.0;

    const interval = setInterval(() => {
      if (!container) return;

      scrollPosition += speed;

      container.scrollLeft = scrollPosition;

      if (scrollPosition >= container.scrollWidth - container.clientWidth) {
        scrollPosition = 0;
      }
  }, 10);

    return () => clearInterval(interval);
 }, []);


 const images = [ben, samsung];
const [current, setCurrent] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, 2000);

  return () => clearInterval(interval);
}, []);

  // ✅ TEXT ANIMATION LOGIC (FIXED — removed duplicate function)
  const [text, setText] = useState("");

  const message =
    "Sorry there are no Reels for now";

  const handleClick = () => {
    setText("");

    let words = message.split(" ");
    let index = 0;

    const interval = setInterval(() => {
      setText((prev) => prev + words[index] + " ");
      index++;

      if (index === words.length) {
        clearInterval(interval);
      }
    }, 300);
  };

  return (
    <div>

      <div style={{ backgroundColor: "black" }}>

          <Navbar/>

        {/* HERO */}
        <div className='flex-col md:flex-row flex justify-between items-start' id= "home">

          <div>
            <h1 className='text-[55px] mt-[13%] font-bold ml-[10%] text-yellow-400'>
              The creative platform<br />
              to direct your best work
            </h1>

            <p className='ml-[10%] text-[20px] mt-[40px] text-white'>
              Every AI model for video, image, and audio. Intelligent workflows for professional<br />
              control and collaboration. On-brand production at any scale.
            </p>

            <div>
              <button
                onClick={handleClick}
                className="ml-[10%] mt-[40px] text-[20px] m-[15px] text-white bg-yellow-400 p-[10px] rounded-[8px]"
              >
                start creating Reels
              </button>

              <p className="text-white text-[20px] ml-[10%] mt-[20px]">
                {text}
              </p>
            </div>

          </div>

          {/* RIGHT ANIMATION */}
          <div className="mr-[10%] mt-[13%]">
            <div className="flex flex-col gap-6">

              {items.map((text, i) => {
                const isActive = i === active;

                return (
                  <div key={i} className={`flex items-center gap-3 transition-all duration-500 ${isActive ? "text-white text-3xl font-bold" : "text-white/30 text-xl"}`}>
                    <span className={`${isActive ? "opacity-100" : "opacity-0"} text-pink-400`}>▶</span>
                    <span>{text}</span>
                  </div>
                );
              })}

            </div>
          </div>

        </div>

        {/* TRUST */}
        <p className='text-yellow-400 text-[20px] text-center mt-[90px] pb-[60px]'>
          Trusted by 1M+ subscribers—creatives, enterprises, agencies and studios
        </p>

        <div className='flex-col md:flex-row flex items-center justify-center mt-[60px] gap-[40px] pb-[80px]'>
          <img src={cocacola} className='w-[80px]' />
          <img src={ogilvy} className='w-[80px]' />
          <img src={rga} className='w-[80px]' />
          <img src={wonder} className='w-[80px]' />
          <img src={guess} className='w-[80px]' />
          <img src={nubank} className='w-[80px]' />
        </div>

      </div>

      {/* SECTION */}
      <div style={{ backgroundColor: "#1A1A1A" }} className='flex-col md:flex-row flex gap-[80px] justify-center' id="creativity">

        <div>
          <p className='text-[26px] pt-[20px] text-white ml-[20px]'>
            The world's creative library.<br />
            Ready to use.
          </p>

          <div className='text-white ml-[20px] pt-[35px] cursor-pointer' onClick={() => handleShow(0)}>
            <p>Photos</p>
            {openIndex === 0 && <p>Millions of high quality images</p>}
          </div>

          <div className='text-white ml-[20px] pt-[35px] cursor-pointer' onClick={() => handleShow(1)}>
            <p>Vectors and Illustrations</p>
            {openIndex === 1 && <p>Editable photoshop file with every every layout intact</p>}
          </div>

          <div className='text-white ml-[20px] pt-[35px]' onClick={() => handleShow(2)}>
            <p>Templates</p>
            {openIndex === 2 && <p className='text-[17px]'>
              Pro-designed templates for every formats and<br />
              brands.
            </p>}
          </div>

        </div>

        <video src={myvideo} autoPlay loop muted className="w-full h-[500px] object-cover" />

      </div>
 
      {/* SCROLL IMAGES */}
     <div style={{ backgroundColor: "black" }} className="flex-col md:flex-row pt-[14%] pb-[10%] overflow-hidden" id="selfies">

        <style>
          {`
            .hide-scrollbar {
              overflow-x: scroll;
              scrollbar-width: none;
            }

            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        <div className="flex gap-[10px] hide-scrollbar" ref={scrollRef}>
          <img src={fausto} className="w-[350px] rounded-[8px] border-3 border-yellow-400" />
          <img src={kids} className="w-[350px] rounded-[8px] border-3 border-yellow-400" />
          <img src={panitan} className="w-[350px] rounded-[8px] border-3 border-yellow-400" />
          <img src={look} className="w-[350px] rounded-[8px] border-3 border-yellow-400" />
          <img src={vitaly} className="w-[350px] rounded-[8px] border-3 border-yellow-400" />
        </div>

      </div>


      <div style={{ backgroundColor: "#1A1A1A" }} className="flex-col md:flex-row flex gap-[6%] pt-[40px]" id="about">

        <div className="flex-col md:flex-row pt-[50px] ml-[40px]">
          <img
            src={images[current]}
            className="w-[500px] rounded-[8px] h-[600px] mb-[90px]"
          />
        </div>

        <div className="flex-col md:flex-row">
          <p className="text-[50px] pt-[15%] text-yellow-400 font-bold">About</p>

          <p className="text-[20px] pt-[50px] text-white">
            Our platform is a powerful all-in-one online tool that<br />
            allows users to edit photos and videos directly in their<br />
            browser without needing to download any software. It is
          </p>

          <p className="text-[20px] pt-[20px] text-white">
            designed for content creators, designers, influencers,<br />
            and everyday users who want to produce high-quality visual<br />
            content quickly and easily.With an intuitive and user-friendly
          </p>

          <p className="text-[20px] pt-[20px] text-white">
            interface, users can upload their images or videos and instantly<br />
            start editing with advanced tools and creative features. The platform<br />
            includes a wide range of filters, effects, and adjustment options that<br />
            help transform ordinary media into eye-catching content.
          </p>
        </div>

      </div>

        <div>
          
  <div style={{ backgroundColor: "#000" }} className=" py-[10%] flex justify-center h-[900px] " id="highlightening">
     <video
    src={contentcreation}
    controls
    autoPlay
    loop
    className="w-[70%] rounded-[10px]"/>
   </div>

        </div>

        <div style={{ backgroundColor: "#1A1A1A" }} className="py-[10%]">

        <Footer/>
</div>
    </div>
  );
}


import React from 'react'

const Footer = () => {
  return (
    <div>
       <div className="flex-col md:flex-row flex gap-[60px] text-white text-[30px] items-center justify-center">

    <p
      className="cursor-pointer hover:text-yellow-400 transition-all duration-300"
      onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
    >
      home
    </p>

    <p
      className="cursor-pointer hover:text-yellow-400 transition-all duration-300"
      onClick={() => document.getElementById("creativity")?.scrollIntoView({ behavior: "smooth" })}
    >
      creativity
    </p>

    <p
      className="cursor-pointer hover:text-yellow-400 transition-all duration-300"
      onClick={() => document.getElementById("selfies")?.scrollIntoView({ behavior: "smooth" })}
    >
      selfies
    </p>

    <p
      className="cursor-pointer hover:text-yellow-400 transition-all duration-300"
      onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
    >
      about
    </p>

    <p
      className="cursor-pointer hover:text-yellow-400 transition-all duration-300"
      onClick={() => document.getElementById("highlightening")?.scrollIntoView({ behavior: "smooth" })}
    >
      highlightening
    </p>

  </div>

    </div>
  )
}

export default Footer;

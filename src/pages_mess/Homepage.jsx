import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Asset Imports ───────────────────────────────────────────
import cocacola from "../assets/coca-cola.svg";
import ogilvy from "../assets/ogilvy.svg";
import rga from "../assets/rga.svg";
import wonder from "../assets/wonder.svg";
import guess from "../assets/guess.svg";
import nubank from "../assets/nu-bank.svg";
import myvideo from "../assets/myvideo.webm";
import fausto from "../assets/fausto.jpg";
import kids from "../assets/kids.jpg";
import panitan from "../assets/panitan.jpg";
import look from "../assets/look.jpg";
import vitaly from "../assets/vitaly.jpg";
import ben from "../assets/ben.jpg";
import samsung from "../assets/samsung.jpg";
import contentcreation from "../assets/content creation.mp4";

// ─── Icon Imports ────────────────────────────────────────────
import { IoMdSearch } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";

// ─── Component Imports ───────────────────────────────────────
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";


/* ═══════════════════════════════════════════════════════════════
   REUSABLE ANIMATION COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

/**
 * FloatingParticles
 * Renders subtle animated dots in the background for visual depth.
 */
function FloatingParticles() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-yellow-400/20 rounded-full"
          style={{ left: p.left, top: p.top }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/**
 * GlowOrb
 * A blurred colored circle used as ambient background lighting.
 */
function GlowOrb({ color, size, top, left, delay = 0 }) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl pointer-events-none"
      style={{ background: color, width: size, height: size, top, left }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
      transition={{ duration: 6, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

/**
 * SectionDivider
 * A thin gradient line placed between sections for visual separation.
 */
function SectionDivider() {
  return (
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
  );
}


/* ═══════════════════════════════════════════════════════════════
   ANIMATION VARIANTS (used with Framer Motion)
   ═══════════════════════════════════════════════════════════════ */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};


/* ═══════════════════════════════════════════════════════════════
   DATA CONSTANTS
   ═══════════════════════════════════════════════════════════════ */

const SLIDER_ITEMS = [
  "Generate images",
  "Shoot cinematic videos",
  "Build workflows",
  "Video upscaling",
  "Direct photoshoots",
  "Cast characters",
  "Stay on brand",
];

const BRAND_LOGOS = [cocacola, ogilvy, rga, wonder, guess, nubank];

const GALLERY_IMAGES = [fausto, kids, panitan, look, vitaly];

const ABOUT_IMAGES = [ben, samsung];

const ACCORDION_ITEMS = [
  {
    title: "Photos",
    description: "Millions of high quality images",
  },
  {
    title: "Vectors and Illustrations",
    description: "Editable photoshop file with every layout intact",
  },
  {
    title: "Templates",
    description: "Pro-designed templates for every format and brand.",
  },
];

const REELS_MESSAGE = "Sorry there are no Reels for now";


/* ═══════════════════════════════════════════════════════════════
   MAIN APP COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function App() {

  /* ─── Slider auto-rotation ─────────────────────────────────── */
  const [active, setActive] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDER_ITEMS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  /* ─── Accordion toggle with auto-close ─────────────────────── */
  const [openIndex, setOpenIndex] = useState(null);

  const handleShow = (index) => {
    setOpenIndex(index);
    setTimeout(() => setOpenIndex(null), 3000);
  };

  /* ─── Horizontal gallery auto-scroll ───────────────────────── */
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

  /* ─── About section image carousel ─────────────────────────── */
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ABOUT_IMAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  /* ─── Typewriter text effect ────────────────────────────────── */
  const [text, setText] = useState("");

  const handleClick = () => {
    setText("");
    const words = REELS_MESSAGE.split(" ");
    let index = 0;

    const interval = setInterval(() => {
      setText((prev) => prev + words[index] + " ");
      index++;
      if (index === words.length) clearInterval(interval);
    }, 300);
  };


  /* ═══════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════ */

  return (
    <div className="overflow-x-hidden bg-black">

      {/* ╔═══════════════════════════════════════════════════════╗
         ║  SECTION 1 — HERO                                    ║
         ╚═══════════════════════════════════════════════════════╝ */}
      <section className="relative min-h-screen bg-black" id="home">

        {/* Background effects */}
        <GlowOrb color="rgba(250,204,21,0.15)" size="600px" top="-10%" left="-10%" delay={0} />
        <GlowOrb color="rgba(236,72,153,0.1)" size="400px" top="50%" left="70%" delay={2} />
        <FloatingParticles />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(250,204,21,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Navigation */}
        <div className="relative z-10">
          <Navbar />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start gap-12 px-6 sm:px-10 lg:px-16 xl:px-24 pt-20 lg:pt-32">

          {/* Left column — headline + CTA */}
          <motion.div
            className="max-w-2xl w-full"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Animated gradient title */}
            <motion.h1
              variants={staggerChild}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] font-bold leading-tight"
            >
              <motion.span
                className="inline-block"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #facc15, #f472b6, #a78bfa, #facc15)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                The creative platform
              </motion.span>
              <br />
              <span className="text-yellow-400">to direct your best work</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={staggerChild}
              className="text-base sm:text-lg md:text-xl text-gray-300 mt-8 leading-relaxed"
            >
              Every AI model for video, image, and audio. Intelligent workflows
              for professional control and collaboration. On-brand production at
              any scale.
            </motion.p>

            {/* CTA button */}
            <motion.div variants={staggerChild} className="mt-10">
              <motion.button
                onClick={handleClick}
                className="text-base sm:text-lg md:text-xl text-black font-semibold bg-yellow-400 px-8 py-3 rounded-xl relative overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(250,204,21,0.5)" }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Shine sweep on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">Start Creating Reels</span>
              </motion.button>

              {/* Typewriter response */}
              <AnimatePresence>
                {text && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-white text-base sm:text-lg mt-5 bg-white/5 backdrop-blur-sm inline-block px-4 py-2 rounded-lg border border-white/10"
                  >
                    {text}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Right column — animated feature list */}
          <motion.div
            className="w-full lg:max-w-md mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="flex flex-col gap-5 relative pl-6">

              {/* Glowing active indicator bar */}
              <motion.div
                className="absolute left-0 w-[3px] bg-gradient-to-b from-yellow-400 via-pink-400 to-purple-500 rounded-full"
                style={{ height: "36px" }}
                animate={{ top: `${active * 52}px` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />

              {SLIDER_ITEMS.map((label, i) => {
                const isActive = i === active;
                return (
                  <motion.div
                    key={i}
                    className={`flex items-center gap-3 transition-all duration-500 cursor-default
                      ${isActive
                        ? "text-white text-xl sm:text-2xl lg:text-3xl font-bold"
                        : "text-white/30 text-base sm:text-lg lg:text-xl hover:text-white/50"
                      }`}
                    animate={isActive ? { x: 8 } : { x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span
                      className="text-pink-400"
                      animate={
                        isActive
                          ? { opacity: 1, scale: 1, rotate: 0 }
                          : { opacity: 0, scale: 0.5, rotate: -90 }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      ▶
                    </motion.span>
                    <span>{label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Trust bar ─────────────────────────────────────────── */}
        <motion.p
          className="text-yellow-400/80 text-sm sm:text-base md:text-lg text-center mt-20 sm:mt-28 pb-8 px-4 tracking-wide relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Trusted by 1M+ subscribers — creatives, enterprises, agencies and studios
        </motion.p>

        {/* Brand logos */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 pb-20 px-6 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {BRAND_LOGOS.map((logo, i) => (
            <motion.img
              key={i}
              src={logo}
              alt="brand logo"
              className="w-16 sm:w-20 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              variants={staggerChild}
              whileHover={{ scale: 1.15, y: -5 }}
            />
          ))}
        </motion.div>
      </section>


      {/* ╔═══════════════════════════════════════════════════════╗
         ║  SECTION 2 — CREATIVE LIBRARY                        ║
         ╚═══════════════════════════════════════════════════════╝ */}
      <section className="relative bg-[#1A1A1A] overflow-hidden" id="creativity">

        <SectionDivider />

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 justify-center items-center px-6 sm:px-10 lg:px-16 xl:px-24 py-16 lg:py-24">

          {/* Left — text + accordion */}
          <motion.div
            className="w-full lg:w-1/3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
          >
            <h2 className="text-2xl sm:text-3xl text-white font-semibold leading-snug">
              <span className="text-yellow-400">The world's</span> creative library.
              <br />
              Ready to use.
            </h2>

            {/* Accordion list */}
            <div className="mt-8 space-y-6">
              {ACCORDION_ITEMS.map((item, index) => (
                <motion.div
                  key={index}
                  className="cursor-pointer group"
                  onClick={() => handleShow(index)}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0"
                      animate={
                        openIndex === index
                          ? { scale: [1, 1.8, 1], backgroundColor: "#f472b6" }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    />
                    <p className="text-base sm:text-lg text-white group-hover:text-yellow-400 transition-colors duration-300 font-medium">
                      {item.title}
                    </p>
                  </div>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="text-sm sm:text-[15px] text-gray-400 ml-5 mt-2 border-l-2 border-yellow-400/30 pl-3"
                      >
                        {item.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — video preview */}
          <motion.div
            className="w-full lg:w-2/3 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
          >
            <video
              src={myvideo}
              autoPlay
              loop
              muted
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-2xl"
            />
            {/* Left-fade gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-transparent to-transparent pointer-events-none rounded-2xl" />
          </motion.div>
        </div>
      </section>


      {/* ╔═══════════════════════════════════════════════════════╗
         ║  SECTION 3 — IMAGE GALLERY (auto-scroll)             ║
         ╚═══════════════════════════════════════════════════════╝ */}
      <section className="relative bg-black py-16 sm:py-20 lg:py-28 overflow-hidden" id="selfies">

        {/* Section heading */}
        <motion.div
          className="text-center mb-10 sm:mb-14 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Beautiful <span className="text-yellow-400">Creations</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Hide native scrollbar */}
        <style>{`
          .hide-scrollbar { overflow-x: scroll; scrollbar-width: none; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>

        {/* Scrolling image strip */}
        <motion.div
          className="flex gap-4 sm:gap-5 hide-scrollbar px-4 sm:px-6"
          ref={scrollRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              className="relative flex-shrink-0 group"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={img}
                alt={`gallery ${i + 1}`}
                className="w-[260px] sm:w-[300px] md:w-[350px] h-[180px] sm:h-[220px] md:h-[250px] object-cover rounded-xl border-2 border-yellow-400/30 group-hover:border-yellow-400 transition-all duration-500"
              />
              {/* Hover glow overlay */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-yellow-400/20 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Edge fade masks */}
        <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
      </section>


      {/* ╔═══════════════════════════════════════════════════════╗
         ║  SECTION 4 — ABOUT                                   ║
         ╚═══════════════════════════════════════════════════════╝ */}
      <section className="relative bg-[#1A1A1A] overflow-hidden" id="about">

        <SectionDivider />
        <GlowOrb color="rgba(250,204,21,0.08)" size="500px" top="20%" left="60%" delay={1} />

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 px-6 sm:px-10 lg:px-16 xl:px-24 py-16 lg:py-24 relative z-10">

          {/* Left — image carousel */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
          >
            <div className="relative overflow-hidden rounded-2xl w-full max-w-[500px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current}
                  src={ABOUT_IMAGES[current]}
                  alt="about showcase"
                  className="w-full h-[350px] sm:h-[450px] lg:h-[550px] object-cover rounded-2xl"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </AnimatePresence>

              {/* Bottom gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Pulsing border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2"
                animate={{
                  borderColor: [
                    "rgba(250,204,21,0)",
                    "rgba(250,204,21,0.3)",
                    "rgba(250,204,21,0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>

            {/* Carousel dots */}
            <div className="flex gap-2 justify-center mt-6">
              {ABOUT_IMAGES.map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i === current ? "bg-yellow-400" : "bg-white/20"
                  }`}
                  animate={i === current ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right — about text */}
          <motion.div
            className="w-full lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
          >
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl text-yellow-400 font-bold"
              animate={{
                textShadow: [
                  "0 0 20px rgba(250,204,21,0)",
                  "0 0 20px rgba(250,204,21,0.3)",
                  "0 0 20px rgba(250,204,21,0)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              About
            </motion.h2>

            {/* Animated underline */}
            <motion.div
              className="h-1 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mt-4 mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            <div className="space-y-5 text-gray-300 text-base sm:text-lg leading-relaxed">
              <p>
                Our platform is a powerful all-in-one online tool that allows
                users to edit photos and videos directly in their browser
                without needing to download any software. It is
              </p>
              <p>
                designed for content creators, designers, influencers, and
                everyday users who want to produce high-quality visual content
                quickly and easily. With an intuitive and user-friendly
              </p>
              <p>
                interface, users can upload their images or videos and instantly
                start editing with advanced tools and creative features. The
                platform includes a wide range of filters, effects, and
                adjustment options that help transform ordinary media into
                eye-catching content.
              </p>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ╔═══════════════════════════════════════════════════════╗
         ║  SECTION 5 — VIDEO HIGHLIGHT                         ║
         ╚═══════════════════════════════════════════════════════╝ */}
      <section className="relative bg-black overflow-hidden" id="highlightening">

        <GlowOrb color="rgba(250,204,21,0.06)" size="700px" top="30%" left="40%" delay={0} />

        <motion.div
          className="py-16 sm:py-20 lg:py-28 flex flex-col items-center justify-center min-h-[500px] sm:min-h-[600px] lg:min-h-[800px] relative z-10 px-4 sm:px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          {/* Section label */}
          <motion.span
            className="text-yellow-400/60 text-xs sm:text-sm uppercase tracking-[0.3em] font-medium mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Content
          </motion.span>

          {/* Video with decorative corners */}
          <motion.div
            className="relative w-full max-w-5xl rounded-2xl overflow-hidden group"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
          >
            <video
              src={contentcreation}
              controls
              autoPlay
              loop
              className="w-full rounded-2xl"
            />

            {/* Subtle border on hover */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none group-hover:border-yellow-400/30 transition-colors duration-500" />

            {/* Corner accent marks */}
            {["top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl",
              "top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl",
              "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl",
              "bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl",
            ].map((classes, i) => (
              <div
                key={i}
                className={`absolute w-6 sm:w-8 h-6 sm:h-8 border-yellow-400/50 pointer-events-none ${classes}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>


      {/* ╔═══════════════════════════════════════════════════════╗
         ║  SECTION 6 — FOOTER                                  ║
         ╚═══════════════════════════════════════════════════════╝ */}
      <footer className="relative bg-[#1A1A1A]">

        <SectionDivider />

        <motion.div
          className="py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Footer />
        </motion.div>
      </footer>
    </div>
  );
}
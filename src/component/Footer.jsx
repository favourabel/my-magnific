import React from "react";

const Footer = () => {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10 bg-[#0a0a0a] text-white">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.10),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
        {/* Main footer card */}
        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_10px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-10">
          {/* =========================
              Top Section (Brand + Copy)
             ========================= */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              {/* Brand badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-white/60">
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
                Magnific
              </span>

              {/* Headline */}
              <h2 className="mt-5 text-3xl font-semibold leading-tight text-white md:text-5xl">
                Turn ideas into videos,
                <span className="text-white/55">
                  {" "}
                  and videos into powerful content.
                </span>
              </h2>
            </div>

            {/* Supporting text */}
            <p className="max-w-md text-sm leading-7 text-white/50 md:text-base">
              A modern platform for creators to edit videos, shape stories, and
              produce content that connects with audiences.
            </p>
          </div>

          {/* =========================
              Navigation Section (Cards)
             ========================= */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {/* Card 01 */}
            <button
              type="button"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
              onClick={() =>
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/35">
                01
              </span>

              <div className="mt-8 flex items-end justify-between">
                <span className="text-lg font-medium capitalize">home</span>
                <span className="text-white/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-yellow-300">
                  ↗
                </span>
              </div>
            </button>

            {/* Card 02 */}
            <button
              type="button"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
              onClick={() =>
                document
                  .getElementById("creativity")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/35">
                02
              </span>

              <div className="mt-8 flex items-end justify-between">
                <span className="text-lg font-medium capitalize">
                  creativity
                </span>
                <span className="text-white/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-yellow-300">
                  ↗
                </span>
              </div>
            </button>

            {/* Card 03 */}
            <button
              type="button"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
              onClick={() =>
                document
                  .getElementById("selfies")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/35">
                03
              </span>

              <div className="mt-8 flex items-end justify-between">
                <span className="text-lg font-medium capitalize">selfies</span>
                <span className="text-white/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-yellow-300">
                  ↗
                </span>
              </div>
            </button>

            {/* Card 04 */}
            <button
              type="button"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/35">
                04
              </span>

              <div className="mt-8 flex items-end justify-between">
                <span className="text-lg font-medium capitalize">about</span>
                <span className="text-white/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-yellow-300">
                  ↗
                </span>
              </div>
            </button>

            {/* Card 05 */}
            <button
              type="button"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
              onClick={() =>
                document
                  .getElementById("highlightening")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/35">
                05
              </span>

              <div className="mt-8 flex items-end justify-between">
                <span className="text-lg font-medium capitalize">
                  highlightening
                </span>
                <span className="text-white/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-yellow-300">
                  ↗
                </span>
              </div>
            </button>
          </div>

          {/* =========================
              Bottom Bar (Legal + Social)
             ========================= */}
          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} All rights reserved.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/45">
                Tiktok
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/45">
                Facebook
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/45">
                Instagram
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
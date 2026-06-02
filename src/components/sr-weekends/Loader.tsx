import React from "react";

const Loader = () => {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#143D59] via-[#1B75BB] to-[#49C0B5]"
      aria-label="Loading"
      role="status"
    >
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative flex flex-col items-center text-center text-white">
        <div className="relative mb-8 flex h-28 w-28 items-center justify-center rounded-[2rem] bg-white/15 shadow-2xl ring-1 ring-white/20 backdrop-blur-md">
          <div className="absolute inset-0 rounded-[2rem] bg-white/10 animate-pulse" />

          <i className="fa-solid fa-umbrella-beach relative text-5xl" />

          <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1B75BB] shadow-lg">
            <i className="fa-solid fa-calendar-days text-sm" />
          </span>
        </div>

        <h2 className="text-2xl font-bold sm:text-4xl">
          Loading Summer Reception
        </h2>

        <p className="mt-3 max-w-md text-white/75">
          Finding the latest IAESTE weekends and events...
        </p>

        <div className="mt-8 flex gap-2">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-white [animation-delay:-0.3s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-white [animation-delay:-0.15s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
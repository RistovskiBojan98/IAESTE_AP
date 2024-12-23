import React from "react";
import StatsInfo from "./statsInfo";

const metrics = [
  { id: 1, stat: "18", emphasis: "Member countries" },
  { id: 2, stat: "50+", emphasis: "Local Committees" },
  { id: 3, stat: "1K+", emphasis: "Internships" },
  { id: 4, stat: "1.5K+", emphasis: "Student Members" },
];

export default function Stats() {
  return (
    <div className="relative bg-[#0B3D59]">
      {/* image */}
      <div className="absolute inset-x-0 bottom-0 h-80 xl:top-0 xl:h-full">
        <div className="h-full w-full xl:grid xl:grid-cols-2">
          <div className="h-full xl:relative xl:col-start-2 hidden xl:block">
            <img
              className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
              src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
              alt="People working on laptops"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bgGradient mix-blend-multiply"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-flow-col-dense xl:grid-cols-2 xl:gap-x-8">
        <div className="relative py-12 xl:col-start-1">
          <h2 className="text-white text-3xl font-semibold">
            About us
          </h2>
          {/* Cer & Core segment */}
          <StatsInfo id={1} />
          {/* Website's idea segment */}
          <StatsInfo id={2} />

          <div className="mt-12 grid grid-cols-2 gap-y-12 gap-x-6 sm:grid-cols-2">
            {metrics.map((item) => (
              <p key={item.id}>
                <span className="block text-4xl font-semibold text-white">
                  {item.stat}
                </span>
                <span className="mt-1 block text-base text-gray-300">
                  <span className="font-medium text-white">
                    {item.emphasis}
                  </span>{" "}
                </span>
              </p>
            ))}
          </div>

          <p className="mt-10 text-lg text-gray-300">
            <b>Feel like applying to one of the hundreds of our internships?</b>
            <br />
            Visit:{" "}
            <a href="https://iaeste.org/internships" className="text-white font-medium underline hover:text-sky-300">
              IAESTE.org/internships
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

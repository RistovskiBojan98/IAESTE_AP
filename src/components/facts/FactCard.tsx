import React from "react";

interface FactCardProps {
  fact: string;
}

const FactCard: React.FC<FactCardProps> = ({ fact }) => (
  <article className="group relative min-h-[220px] overflow-hidden rounded-[2rem] bg-white p-6 shadow-lg ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl hover:ring-[#27A9E1]/30">
    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#49C0B5]/10 blur-2xl transition group-hover:bg-[#49C0B5]/20" />

    <svg
      height="46"
      viewBox="0 0 63 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-6 right-6 z-0 opacity-20 transition group-hover:scale-110"
    >
      <path
        d="M27.6 33.9V63.9H4.24683e-07V36.3L13.2 -1.64509e-05H27.6L16.5 33.9H27.6ZM62.7 33.9V63.9H35.1V36.3L48.3 -1.64509e-05H62.7L51.6 33.9H62.7Z"
        fill="#1B75BB"
      />
    </svg>

    <div className="relative z-10">
      <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B75BB]/10 text-xl text-[#1B75BB] transition group-hover:scale-105">
        <i className="fa fa-lightbulb" />
      </span>

      <p className="text-lg font-bold leading-7 text-[#143D59]">
        {fact}
      </p>
    </div>
  </article>
);

export default FactCard;
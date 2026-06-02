import React from "react";

interface FoodCardProps {
  title: string;
  description: string;
}

const FoodCard: React.FC<FoodCardProps> = ({ title, description }) => (
  <article className="group relative overflow-hidden rounded-[2rem] bg-white p-6 shadow-lg ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl hover:ring-[#27A9E1]/30">
    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#49C0B5]/10 blur-2xl transition group-hover:bg-[#49C0B5]/20" />

    <div className="relative">
      {/* <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B75BB]/10 text-xl text-[#1B75BB] transition group-hover:scale-105">
        <i className="fa fa-utensils" />
      </span> */}

      <h3 className="text-xl font-bold text-[#143D59]">
        {title}
      </h3>

      {!!description && (
        <p className="mt-4 border-t border-slate-100 pt-4 leading-7 text-slate-600">
          {description}
        </p>
      )}
    </div>
  </article>
);

export default FoodCard;
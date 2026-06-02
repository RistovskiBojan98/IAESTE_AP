import React from "react";

interface OtherInfoCardProps {
  title: string;
  description: string;
}

const OtherInfoCard: React.FC<OtherInfoCardProps> = ({ title, description }) => {
  return (
    <article className="group relative h-72 overflow-hidden rounded-[2rem] bg-white p-6 shadow-lg ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl hover:ring-[#8B5CF6]/30">
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#8B5CF6]/10 blur-2xl transition group-hover:bg-[#8B5CF6]/20" />

      <div className="relative z-10 flex h-full flex-col">
        <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8B5CF6]/10 text-xl text-[#8B5CF6] transition group-hover:scale-105">
          <i className="fa fa-circle-info" />
        </span>

        <h3 className="text-xl font-bold text-[#143D59]">
          {title}
        </h3>

        {!!description && (
          <div
            className="mt-4 flex-1 overflow-y-auto border-t border-slate-100 pt-4 leading-7 text-slate-600"
            style={{ scrollbarWidth: "thin" }}
          >
            {description.split("\n").map((paragraph, index) =>
              paragraph.trim() ? <p key={index}>{paragraph}</p> : null
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default OtherInfoCard;
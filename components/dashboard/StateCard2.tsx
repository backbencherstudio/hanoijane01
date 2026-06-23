import React from "react";

type StateCard2Props = {
  title: string;
  value: string | number;
};

const StateCard2 = ({ title, value }: StateCard2Props) => {
  return (
    <div className="p-5 rounded-xl bg-white border border-[#EAECF0]">
      <p className="md:text-lg text-[#5E5F79]">{title}</p>
      <p className="text-xl md:text-2xl font-semibold">{value}</p>
    </div>
  );
};

export default StateCard2;

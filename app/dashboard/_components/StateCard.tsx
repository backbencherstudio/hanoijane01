import { StateData } from "@/data/dashboard/homeData";
import React from "react";

interface StateCardProps {
  state: StateData;
}

const StateCard = ({ state }: StateCardProps) => {
  const Icon = state.icon;

  return (
    <div className={`${state.bg_color} rounded-xl pl-1`}>
      <div className={`${state.bg_color2} p-4 rounded-xl flex justify-between`}>
        <div>
          <h4 className="text-sm font-medium text-[#6C7278]">{state.title}</h4>
          <p className="text-2xl lg:text-[28px] text-text-primary font-bold mt-3">
            {state.value}
          </p>
          <p
            className={`text-xs font-medium px-1 py-0.5 rounded-[5px] mt-5 w-fit ${state.text_bg_color} ${state.text_color} ${state.border}`}
          >
            {state.info}
          </p>
        </div>
        <div
          className={`p-2 rounded-xs w-fit h-fit ${state.text_color} ${state.text_bg_color}`}
        >
          <Icon className="w-4.5 h-4.5 text-primary" />{" "}
        </div>
      </div>
    </div>
  );
};

export default StateCard;

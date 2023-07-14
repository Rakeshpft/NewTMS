import React from "react";

interface SalesOverviewProps {
  name?: string;
  image?: string;
  variant: "small" | "large" | "normal" | "wide";
}
const SalesOverview = ({ name, image, variant }: SalesOverviewProps) => {
  return (
    <>
      <div className={`widget ${variant}`}>
        <div className="left">
          <img src={`./icons/${image}.svg`} alt="icon" height={45} />
          <span className="title">{name || "Default Name"}</span>
        </div>
      </div>
    </>
  );
};

export default SalesOverview;

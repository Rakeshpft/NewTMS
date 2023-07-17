import React from "react";
interface MoreWidgetProps {
  name?: string;
  image?: string;
  variant: "small" | "large" | "normal" | "wide";
}
const MoreWidget = ({ name, image, variant }: MoreWidgetProps) => {
  return (
    <>
      <div className={`morewidget ${variant}`}>
        <div className="leftmore pt-2 px-2">
          <img src={`./icons/${image}.svg`} alt="icon" height={30} />
          <span className="titlemore">{name || "Default Name"}</span>
        </div>
      </div>
    </>
  );
};

export default MoreWidget;

import React from "react";
import { useMediaQuery } from "react-responsive";

interface CompanyLogoProps {
  height?: string | number;
  shrinkOnSmallScreen?: boolean;
}
const CompanyLogo = ({ height, shrinkOnSmallScreen }: CompanyLogoProps) => {
  const below576 = useMediaQuery({ query: "(max-width: 576px)" });
  height = height || "30";

  return (
    <>
      {below576 && shrinkOnSmallScreen ? (
        <img
          src="/images/tmslogo.png"
          alt="company-logo"
          height={height}
        />
      ) : (
        <img
          src="/images/tmslogo.png"
          alt="company-logo"
          height={height}
        />
      )}
    </>
  );
};

export default CompanyLogo;

import { useContext } from "react";
import { ProfileUpdateContext } from "./profileContext";

export const useProfileContext = () => {

  const { state, setState } = useContext(ProfileUpdateContext);

  if (setState === undefined) {
    throw new Error("Must have setState defined");
  }

  return {
    ...state
  }
};

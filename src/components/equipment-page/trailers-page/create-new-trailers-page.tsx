import React from "react";
import CreateNewTrailerForm from "./createNewTrailersForm";
import { useParams } from "react-router-dom";


const CreateNewTrailerPage = () => {
  const params = useParams();
  const trailer_id = params.id ? parseInt(params.id,10) : 0;
  return(
    <CreateNewTrailerForm trailer_id={trailer_id} />
  );
};

export default CreateNewTrailerPage;

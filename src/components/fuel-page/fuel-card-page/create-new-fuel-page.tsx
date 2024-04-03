import React from "react";
import CreateFuelCardPage from "./fuel-page-form";
import { useParams } from "react-router-dom";

const CreateNewFuelPage = () => {
  const params = useParams();
  const fuel_card_id = params.id ? parseInt(params.id,10) : 0;

  const handleSubmit=(x:any)=>{
    alert(x.fuel_card_id);
  }
  return (
    <>
      <CreateFuelCardPage fuel_card_id={fuel_card_id} handleSubmit={handleSubmit} />
    </>
  );
};

export default CreateNewFuelPage;

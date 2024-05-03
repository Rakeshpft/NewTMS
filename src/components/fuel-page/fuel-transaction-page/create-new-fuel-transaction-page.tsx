import React from "react";
import CreateFuelTransactionPage from "./fuel-transaction-form";
import { useParams } from "react-router-dom";

const CreateNewFuelTransactionPage = () => {
  const params = useParams();
  const fuel_transaction_id = params.id ? parseInt(params.id,10) : 0;

  return (
    <>
      <CreateFuelTransactionPage fuel_transaction_id={fuel_transaction_id} />
    </>
  );
};

export default CreateNewFuelTransactionPage;

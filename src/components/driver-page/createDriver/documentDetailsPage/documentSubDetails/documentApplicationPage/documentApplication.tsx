import React from "react";
import { BasicTable } from "../../../../../../features/table/BasicTable";
import { tableHeadCells } from "./documentApplication.constant";

const DocumentApplication = () => {

  
  return (

    <>
      <BasicTable
        emptyState={false}
        tableData={[]}
        tableHeadCells={tableHeadCells}
        loading={false}
        tableCells={[]}
      />
    </>
  );
};

export default DocumentApplication;

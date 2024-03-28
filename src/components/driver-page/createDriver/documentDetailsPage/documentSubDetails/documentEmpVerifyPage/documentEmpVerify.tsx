import React from "react";
import { BasicTable } from "../../../../../../features/table/BasicTable";
import { tableHeadCells } from "./documentEmpVerify.constant";

const DocumentEmpVerify = () => {
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

export default DocumentEmpVerify;

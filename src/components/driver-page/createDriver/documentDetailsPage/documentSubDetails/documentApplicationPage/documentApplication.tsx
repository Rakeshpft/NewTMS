import React from "react";
import { BasicTable } from "../../../../../../features/table/BasicTable";
import { tableCells, tableHeadCells } from "./documentApplication.constant";
import { IDriverDocApp } from "../../../../../../services/tms-objects/driver.types";

interface IFilterDocApp {
  filterDocApp : IDriverDocApp[]
}
const DocumentApplication = ( {filterDocApp} : IFilterDocApp ) => {

  

  return (

    <>
      <BasicTable
        emptyState={false}
        tableData={filterDocApp}
        tableHeadCells={tableHeadCells}
        loading={false}
        tableCells={tableCells}
      />
    </>
  );
};

export default DocumentApplication;

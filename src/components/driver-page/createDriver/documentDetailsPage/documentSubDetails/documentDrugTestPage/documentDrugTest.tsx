import React from 'react'
import { BasicTable } from '../../../../../../features/table/BasicTable'
import { tableHeadCells } from './documentDrugTest.constant'

const DocumentDrugTest = () => {
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
  )
}

export default DocumentDrugTest
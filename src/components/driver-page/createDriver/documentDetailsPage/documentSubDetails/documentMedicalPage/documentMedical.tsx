import React from 'react'
import { BasicTable } from '../../../../../../features/table/BasicTable'
import { tableHeadCells } from './documentMedical.constant'

const DocumentMedical = () => {
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

export default DocumentMedical
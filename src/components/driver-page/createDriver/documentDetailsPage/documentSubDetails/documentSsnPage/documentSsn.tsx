import React from 'react'
import { BasicTable } from '../../../../../../features/table/BasicTable'
import { tableHeadCells } from './documentSsn.constant'

const DocumentSsn = () => {
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

export default DocumentSsn
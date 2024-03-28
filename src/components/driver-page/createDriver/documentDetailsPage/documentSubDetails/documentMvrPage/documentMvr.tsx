import React from 'react'
import { BasicTable } from '../../../../../../features/table/BasicTable'
import { tableHeadCells } from './documentMvr.constant'

const DocumentMvr = () => {
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

export default DocumentMvr
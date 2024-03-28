import React from 'react'
import { tableHeadCells } from './documentCdl.constant'
import { BasicTable } from '../../../../../../features/table/BasicTable'

const DocumentCdl = () => {
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

export default DocumentCdl
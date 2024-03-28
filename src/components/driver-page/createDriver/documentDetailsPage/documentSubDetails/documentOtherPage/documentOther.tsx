import React from 'react'
import { BasicTable } from '../../../../../../features/table/BasicTable'
import { tableHeadCells } from './documentOther.constant'

const DocumentOther = () => {
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

export default DocumentOther
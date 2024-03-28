import React from 'react'
import { BasicTable } from '../../../features/table/BasicTable'
import { tableHeadCells } from './additionalPayee.constant'

const AdditionalPayee = () => {
  return (
    <div>
    <BasicTable 
    emptyState={false}
    tableData={[]}
    tableHeadCells={tableHeadCells}
    loading={false}
    tableCells={[]}
    />
</div>
  )
}

export default AdditionalPayee
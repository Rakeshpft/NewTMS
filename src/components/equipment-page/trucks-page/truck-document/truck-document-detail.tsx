import React from 'react'
import { TabPane } from 'reactstrap';
import { TabPage } from '../../../driver-page';
import AnnualInspection from './truck-document-tab/truck-annual-inspection';
import Registration from './truck-document-tab/truck-registration';
import RepairAndMaintance from './truck-document-tab/truck-repair-maintenance';
import Other from './truck-document-tab/truck-other-documents';

export type ITruckProps = {
    truck_id?: number,
    handleSubmit?: (obj: any) => void,
   
}

const TruckDocumentForm = (prop: ITruckProps) => {
    const{
       truck_id 
    } = prop;

  return (
    <div className="mt-4">
    <TabPage
      tabTitles={[
        "Annual Inspection",
        "Registration", 
        "Repair & Maintance",
        "Other"
      ]}
    >
      <TabPane tabId={1} className="">
        {
        <AnnualInspection truck_id = {truck_id} />
        }
      </TabPane>
      <TabPane tabId={2} className="">
        {
            <Registration truck_id = {truck_id} />
        }
      </TabPane> 
      <TabPane tabId={3} className="">
     {
        <RepairAndMaintance truck_id = {truck_id} />
     }
      </TabPane>
      <TabPane tabId={4} className="">
       <Other truck_id = {truck_id} />
      </TabPane>
      
    </TabPage>
  </div>
  )
}

export default TruckDocumentForm
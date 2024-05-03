import React, {useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { Dictionary, Convert } from "../../features/shared/helper";
import { useListContext } from "../../services/reducer/list.reducer";
import {  LoadStopObject } from "../../services/tms-objects/load.type";

interface IPickupDeliveryStop {
  stopList: LoadStopObject[];
  setStopList: React.Dispatch<React.SetStateAction<any[]>>;
}

const AddPickupDeliveryStop = ({ stopList, setStopList }: IPickupDeliveryStop) => {
  const { getStateList , stateList } = useListContext();


  useEffect(() => {
    
    getStateList();
  }, []);

  const  handleLoadStopInputChange   = (props : keyof LoadStopObject,index : number) => (event: React.ChangeEvent<HTMLInputElement>) => {
   
   setStopList((stopList) => stopList.map((item, i) =>   i === index ? { ...item, [props]: event.target.value } : item ) );
  
       
    }
  

  return <>{
    stopList && stopList.length > 0 && stopList.map((stop,index) => (     
        <Row>
            <Col lg={3} md={6} sm={12}>
              <FormGroup>
                <Label for="pickupDate">Date</Label>                
                <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event) => { event.preventDefault(); }}  dateFormat={Dictionary.UserDateFormat} name="purchase_date" className="form-control form-control-sm"  onChange={(date) => { ({ ...stop, date: Convert.ToISODate(date) });   }} selected={Convert.ToDate(stop.date)} required autoComplete="off" />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12}>
              <FormGroup>
                <Label for="pickupCity">Location</Label>
                <Input id="pickupCity" name="pickupCity" type="text" className="form-control form-control-sm"  value ={ stop.city} onChange={handleLoadStopInputChange('city',index)} />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12}>
              <FormGroup>
                <Label for="pickupState">State</Label>
                <Input id="pickupState" bsSize="sm" name="pickupState" type="select" className="form-control form-control-sm" value={stop.state_id} onChange={handleLoadStopInputChange('state_id',index)} >
                  <option value="">Select State</option>
                  {stateList?.map((item) => {
                    return (
                      <option key={item.state_id} value={item.state_id}>{item.state_name}</option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12}>
              <FormGroup>
                <Label for="pickupZip">ZIP</Label>
                <Input id="pickupZip" name="pickupZip" type="text" className="form-control form-control-sm" value={stop.zipcode}  onChange={handleLoadStopInputChange('zipcode',index)}   />
              </FormGroup>
            </Col>
          </Row>
    ))
  }</>;
};

export default AddPickupDeliveryStop;

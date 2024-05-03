
import React, { useState, useEffect, useContext } from "react";
import ReactDatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { toastify } from "../../../features/notification/toastify";
import CommonLayOut from "../../../layout";
import { IFuelTransactionObject, fuelTransactionInitialState } from "../../../services/tms-objects/fuel-transaction.types";
import { routes } from "../../routes/routes";
import { useFuelTransactionContext } from "../../../services/reducer/fuel-transaction.reducer";
import { LoadingContext } from "../../../services/context/loading.context";
import { Button, Col, FormGroup, Input, Label, Row, Form } from "reactstrap";
import { useListContext } from "../../../services/reducer/list.reducer";
import { Convert, Dictionary } from "../../../features/shared/helper";

export type IFuelTransactionProp = {
  fuel_transaction_id?: number;
  handleSubmit?: (obj: any) => void;
}

const CreateFuelTransactionPage = (prop: IFuelTransactionProp) => {
  const {
    fuel_transaction_id = 0,
    handleSubmit = undefined
  } = prop;

  const { getDriverList, driverList, getTruckList, truckList, getStateList, stateList, getFuelCardList, fuelCardList, getProductCodeList, productCodeList } = useListContext();
  const { setLoader } = useContext(LoadingContext);
  const { getFuelTransactionDetail, fuelTransactionDetail, saveFuelTransaction } = useFuelTransactionContext();
  const [stateFuelTransactionDetail, setStateFuelTransactionDetail] = useState<IFuelTransactionObject>(fuelTransactionInitialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (fuel_transaction_id > 0) {
      getFuelTransactionDetail(fuel_transaction_id);
    }
    else {
      setStateFuelTransactionDetail(fuelTransactionInitialState);
    }
    getDriverList();
    getStateList();
    getProductCodeList();
    getTruckList({ unassigned: false, driver_id:0 });
  }, [fuel_transaction_id]);

  useEffect(() => {
    if (fuelTransactionDetail && fuel_transaction_id > 0) {
      setStateFuelTransactionDetail(fuelTransactionDetail);
      getFuelCardList(fuelTransactionDetail.driver_id);
    }
  }, [fuelTransactionDetail]);

  useEffect(()=>{
    if(fuelCardList && fuelCardList.length>0 && !fuelCardList.map((item)=>item.fuel_card_id).includes(stateFuelTransactionDetail.fuel_card_id)){
      setStateFuelTransactionDetail({...stateFuelTransactionDetail, fuel_card_id: fuelCardList[0].fuel_card_id});
    }
  },[fuelCardList]);

  const handleFuelTransactionInputChange = (prop: keyof IFuelTransactionObject) => (event: React.ChangeEvent<HTMLInputElement>) => {    
    if (prop === "driver_id") {
      let truck_id = stateFuelTransactionDetail.truck_id;
      if(stateFuelTransactionDetail.truck_id==0){
        let truck = driverList?.filter(item=>item.driver_id==parseInt(event.target.value))[0];
        truck_id = truck ? truck.truck_id: 0;
      }
      setStateFuelTransactionDetail({...stateFuelTransactionDetail, truck_id: truck_id, driver_id : parseInt(event.target.value) });      
      getFuelCardList(parseInt(event.target.value));
    }
    else{
      setStateFuelTransactionDetail({ ...stateFuelTransactionDetail, [prop]: event.target.type == "checkbox" ? event.target.checked : event.target.value });
    }
  };

  const handleSaveFuelCard = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (stateFuelTransactionDetail.payment_status > 0) {
      toastify({ message: "Payment has been settled for this transaction. You are not able to modify this transaction.", type: "error" });
      return; 
    }    
    setLoader(true);
    await saveFuelTransaction(stateFuelTransactionDetail).then((response)=>{
      if (response) {
        toastify({ message: response.message, type: (response.success ? "success" : "error") });
        if (response.success) {
          if (handleSubmit) {
            setTimeout(() => {
              setLoader(false);
              handleSubmit(response.value);
            }, 2000);
          } else {
            setStateFuelTransactionDetail({ ...stateFuelTransactionDetail, fuel_transaction_id: response.value });
            getFuelTransactionDetail(response.value);
            setTimeout(() => {
              setLoader(false);
              navigate(`${routes.createNewFuelTransaction}/${response.value}`)
            }, 2000);
          }
        } else {
          setLoader(false);
        }
      } else {
        setLoader(false);
      }  
    });    
  };

  const handleClose = () => {
    setStateFuelTransactionDetail(fuelTransactionInitialState);
    navigate(routes.fuelTransactionPage);
  }

  return (
    <CommonLayOut>
      <div className="page-title">{stateFuelTransactionDetail.fuel_transaction_id === 0 ? "Create" : "Edit"} Fuel Transaction</div>
      <div className="page-content">
        <Form onSubmit={handleSaveFuelCard}>
          <Row>
            <Col lg={3} md={6} sm={12}>
              <FormGroup>
                <Label for="purchase_date"> Date</Label>
                {/* <ReactDatePicker showYearDropdown showMonthDropdown placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="purchase_date" className="form-control form-control-sm" onChange={(date) => { setStateFuelTransactionDetail({ ...stateFuelTransactionDetail, fuel_transaction_date: Convert.ToISODate(date) }) }} selected={Convert.ToDate(stateFuelTransactionDetail.fuel_transaction_date)} ></ReactDatePicker> */}
                <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="fuel_transaction_date" className="form-control form-control-sm" onChange={(date) => { setStateFuelTransactionDetail({ ...stateFuelTransactionDetail, fuel_transaction_date: Convert.ToISODate(date) }) }} selected={Convert.ToDate(stateFuelTransactionDetail.fuel_transaction_date)} required  readOnly={stateFuelTransactionDetail.payment_status > 0}></ReactDatePicker>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="driver_id">Driver</Label>
                <Input bsSize="sm" className="form-control" type="select" id="driver_id" name="driver_id"
                  value={stateFuelTransactionDetail.driver_id} onChange={handleFuelTransactionInputChange("driver_id")}  readOnly={stateFuelTransactionDetail.payment_status > 0 } required>
                  <option key={0} value="">Please Select</option>
                  {driverList && driverList.map((item) => (
                    <option key={item.driver_id} value={item.driver_id}>{item.driver_name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="truck_id">Truck</Label>
                <Input bsSize="sm" className="form-control" type="select" id="truck_id" name="truck_id"
                  value={stateFuelTransactionDetail.truck_id} onChange={handleFuelTransactionInputChange("truck_id")}  readOnly={stateFuelTransactionDetail.payment_status > 0} required>
                   <option key={0} value="">Please Select</option>
                  {truckList && truckList.map((item) => (
                    <option key={item.truck_id} value={item.truck_id}>{item.truck_name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="fuel_card_id">Fuel Card</Label>
                <Input bsSize="sm" className="form-control" type="select" id="fuel_card_id" name="fuel_card_id"
                  value={stateFuelTransactionDetail.fuel_card_id} onChange={handleFuelTransactionInputChange("fuel_card_id")}  readOnly={stateFuelTransactionDetail.payment_status > 0} required>
                   <option key={0} value="">Please Select</option>
                  {fuelCardList && fuelCardList.map((item) => (
                    <option key={item.fuel_card_id} value={item.fuel_card_id}>{item.card_number}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="product_code_id">Product Code</Label>
                <Input bsSize="sm" className="form-control" type="select" id="product_code_id" name="product_code_id"
                  value={stateFuelTransactionDetail.product_code_id} onChange={handleFuelTransactionInputChange("product_code_id")}  readOnly={stateFuelTransactionDetail.payment_status > 0}>
                   <option key={0} value={0}>Please Select</option>
                  {productCodeList && productCodeList.map((item) => (
                    <option key={item.product_code_id} value={item.product_code_id}>{item.product_code}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="unit">Unit, Gallons</Label>
                <Input bsSize="sm" className="form-control" type="text" id="unit" name="unit"
                  value={stateFuelTransactionDetail.unit} onChange={handleFuelTransactionInputChange("unit")}
                    readOnly={stateFuelTransactionDetail.payment_status > 0} required/>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="amount">Amount</Label>
                <Input bsSize="sm" className="form-control" type="text" id="amount" name="amount"
                  value={stateFuelTransactionDetail.amount} onChange={handleFuelTransactionInputChange("amount")}
                   readOnly={stateFuelTransactionDetail.payment_status > 0} required/>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="notes">Notes</Label>
                <Input bsSize="sm" className="form-control" type="text" id="notes" name="notes"
                  value={stateFuelTransactionDetail.notes} onChange={handleFuelTransactionInputChange("notes")}
                   readOnly={stateFuelTransactionDetail.payment_status > 0}/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="city">City</Label>
                <Input bsSize="sm" className="form-control" type="text" id="city" name="city"
                  value={stateFuelTransactionDetail.city} onChange={handleFuelTransactionInputChange("city")}
                   readOnly={stateFuelTransactionDetail.payment_status > 0} required/>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="state_id">State</Label>
                <Input bsSize="sm" className="form-control" type="select" id="state_id" name="state_id"
                  value={stateFuelTransactionDetail.state_id} onChange={handleFuelTransactionInputChange("state_id")}  readOnly={stateFuelTransactionDetail.payment_status > 0} required>
                   <option key={0} value="">Please Select</option>
                  {stateList && stateList.map((item) => (
                    <option key={item.state_id} value={item.state_id}>{item.state_name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="zipcode">Zip</Label>
                <Input bsSize="sm" className="form-control" type="text" id="zipcode" name="zipcode"
                  value={stateFuelTransactionDetail.zipcode} onChange={handleFuelTransactionInputChange("zipcode")}
                   readOnly={stateFuelTransactionDetail.payment_status > 0} required/>
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col md={3} className="d-flex align-items-center">
              <FormGroup >

                <div className="d-flex justify-content-between">
                  <FormGroup check className="checkbox-inline me-3">
                    <Input type="checkbox" id="is_broker"
                      checked={stateFuelTransactionDetail.included_in_ifta}
                      onChange={handleFuelTransactionInputChange("included_in_ifta")} readOnly={stateFuelTransactionDetail.payment_status > 0} />
                    <Label for="brokerCheckbox" check className="checkbox-label">
                      Included in IFTA Calculation
                    </Label>
                  </FormGroup>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row className="d-flex justify-content-end">
            <Col md={3} className=" d-flex justify-content-end align-items-end pb-3" >
              <Button color="primary" size="sm" className="me-3" type="submit">Save</Button>
              <Button size="sm" color="danger" outline={true} onClick={handleClose}>Close</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </CommonLayOut>
  );
};

export default CreateFuelTransactionPage;
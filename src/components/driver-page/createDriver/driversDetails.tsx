import React, { useContext, useEffect, useState } from "react";
import { Row, Col, FormGroup, Label, Input, Button, Form, } from "reactstrap";
import { IDriverObject, IDriverPayRatesOject, TDriverProps, initialStateDriver, initialStatedriver_pay_rates } from "../../../services/tms-objects/driver.types";
import { useDriverContext } from "../../../services/reducer/driver.reducer";
import { toastify } from "../../../features/notification/toastify";
import { useListContext } from "../../../services/reducer/list.reducer";
import { useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import { Convert, Dictionary, Helper } from "../../../features/shared/helper";
import { routes } from "../../routes/routes";
import { LoadingContext } from "../../../services/context/loading.context";
import { IMaskInput } from "react-imask";
import { mask } from "../../../features/shared/validate";

const DriversDetails = (props: TDriverProps) => {
  const {
    handleSubmit = undefined,
    driver_id = 0
  } = props;

  const navigate = useNavigate();
  const { getIdividualDriver, selectedDriver, postSaveDriverData, getDriverPayRateList, postPayRates, postDriverImage, selectedPayRates } = useDriverContext();
  const { getDriverTypeList, driverTypeList, getDriverStatusList, driverStatusList, getStateList, stateList, getPayRateTypeList, payRateTypeList, getTrailerList, 
    trailerList, getTruckList, truckList, getVendorList, vendorList } = useListContext();
  const { setLoader } = useContext(LoadingContext);
  const [newDriver, setNewDriver] = useState<IDriverObject>(initialStateDriver);
  const [driverPayRates, setDriverPayrates] = useState<IDriverPayRatesOject>(initialStatedriver_pay_rates);
    
  useEffect(() => {
    if (driver_id > 0) {
      getIdividualDriver(driver_id);
      getDriverPayRateList(driver_id);
    }
    else {
      setNewDriver(initialStateDriver);
      setDriverPayrates(initialStatedriver_pay_rates);
    }
      getDriverTypeList();
      getVendorList();
      getDriverStatusList();
      getTrailerList({unassigned:true, driver_id:driver_id});
      getTruckList({unassigned:true, driver_id:driver_id});
      getStateList();
      getPayRateTypeList();
  }, [driver_id]);

  useEffect(() => {
    if (selectedDriver && driver_id > 0) {
      setNewDriver(selectedDriver);
    }
  }, [selectedDriver]);
  
  useEffect(() => {
    if (selectedPayRates && driver_id > 0) {
      setDriverPayrates(selectedPayRates);          
    }
  }, [selectedPayRates]);

  useEffect(() => {
    if (payRateTypeList && payRateTypeList.length>0 && driverPayRates.pay_rate_type_id == 0) {
      setDriverPayrates({...driverPayRates, pay_rate_type_id : payRateTypeList[0].pay_rate_type_id});
    }
  }, [payRateTypeList]);

  const handleInputChange =
    (prop: keyof IDriverObject) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewDriver({ ...newDriver, [prop]: event.target.value });
      };

  const handleInputDriverPayRates =
    (prop: keyof IDriverPayRatesOject) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setDriverPayrates({ ...driverPayRates, [prop]: event.target.value });
      };

  const handlePayRateType=(typeId:number)=>{
    setDriverPayrates({...driverPayRates, pay_rate_type_id : typeId });
  }
  const handleCheckboxChange = () => {
    setNewDriver({
      ...newDriver,
      is_IFTA_handled_by_company: !newDriver.is_IFTA_handled_by_company,
    });
  };

  
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      if (newDriver.driver_id > 0) {
        
        await postDriverImage(event.target.files[0], newDriver.driver_id).then(
          (response ) => {
            response?.value &&
              setNewDriver({ ...newDriver, driver_images: response.value });
          }
        );
      } else  {
              
        let url = URL.createObjectURL(event.target.files[0]);
        setNewDriver({
          ...newDriver,
          driver_images : url,
          file : event.target.files[0]
        });
      }
    }
  };

  const SaveDriverIndividual = async ( event : { preventDefault: () => void } ) => {
    event.preventDefault();     
    setLoader(true);
    await postSaveDriverData(newDriver).then((response) => {
      if (response) {
        toastify({ message: response.message, type: (response.success ? "success" : "error") });
        if (response.success) {
          if (handleSubmit) {
            setTimeout(function () {
              setLoader(false);
              handleSubmit(response.value);
            }, 2000);
          }
          else {
            if (newDriver.driver_id == 0 && newDriver.file != null) {
              if (response.value > 0 ) {
                 postDriverImage(newDriver.file, response.value).then(
                  (response2 ) => {
                    response2?.value &&
                      setNewDriver({ ...newDriver, driver_images: response2.value });
                  }
                );
              }
          }
            setNewDriver({ ...newDriver, driver_id: response.value });
            getIdividualDriver(response?.value);
            postPayRates(driverPayRates, response.value).then((response1) => {
              if (response1?.success) {
                getDriverPayRateList(response.value);
              }
            })
            setTimeout(function () {
              setLoader(false);
              navigate(`${routes.createNewDriver}/${response.value}`)
            }, 2000);
          }
        }
        else { setLoader(false); }
      }
      else { setLoader(false); }
    })
  }

  const handleInputMaskChange =
        (prop: keyof IDriverObject,unMasked:string) => {
                setNewDriver({ ...newDriver, [prop]: unMasked });
            };

  const handleCloseForm = () => { navigate(-1) };

  return (
    <Form onSubmit={SaveDriverIndividual} encType="multipart/form-data">
      <Row className="page-content">
        <Row className="page-subtitle">
          <Col>Basic Details</Col>
        </Row>
        <Row>
          <Col md={9}>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="first_name">First Name</Label>
                  <Input bsSize="sm" className="form-control" type="text" id="first_name" value={newDriver.first_name} onChange={handleInputChange("first_name")} required autoComplete="off" />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="last_name">Last Name</Label>
                  <Input bsSize="sm" className="form-control" type="text" id="last_name" value={newDriver.last_name} onChange={handleInputChange("last_name")} required autoComplete="off" />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for=" birth">D.O.B</Label>
                  <ReactDatePicker required  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="dob" className="form-control form-control-sm" onChange={(date) => { setNewDriver({ ...newDriver, dob: Convert.ToISODate(date) }) }} selected={Convert.ToDate(newDriver.dob)} autoComplete="off" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="email">E-mail</Label>
                  <Input bsSize="sm" className="form-control" type="text" id="email" value={newDriver.email} onChange={handleInputChange("email")} required autoComplete="off" />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="phone">Phone</Label>
                  <IMaskInput mask={mask.phone} placeholder='___ ___-__-__' id="phone" name="phone" className="form-control form-control-sm" value={newDriver.contact_number} unmask={true} onAccept={(unmasked)=>{handleInputMaskChange('contact_number',unmasked)}} required autoComplete="off" ></IMaskInput>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="address">Address</Label>
                  <Input bsSize="sm" className="form-control" type="text" id="address" value={newDriver.street_number} onChange={handleInputChange("street_number")} autoComplete="off" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="location">Location</Label>
                  <Input bsSize="sm" className="form-control" type="text" id="location" value={newDriver.suite_number} onChange={handleInputChange("suite_number")} autoComplete="off" />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="state">State</Label>
                  <Input bsSize="sm" className="form-control" type="select" id="state" value={newDriver.state_id} onChange={handleInputChange("state_id")} >
                    <option key={0} value={0}>Please Select</option>
                    {
                      stateList && stateList.map((state) => {
                        return <option key={state.state_id} value={state.state_id}>{state.state_name}</option>
                      })
                    }
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="zipcode">ZIP</Label>
                  <Input bsSize="sm" className="form-control" type="text" id="zipcode" value={newDriver.zipcode} onChange={handleInputChange("zipcode")} autoComplete="off" />
                </FormGroup>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="mt-4">
            <div className="align-items-center text-center">
              <label htmlFor="fileupload"  role="button">
                <div className="user-avatar me-2">
                  {/* <img width="120" height="120" className="rounded-circle" src={newDriver.driver_images || require("../../../../public/images/user-avatar.png")}    /> */}
                  <img width="120" height="120" className="rounded-circle" src={Helper.ImageUrl(newDriver.driver_images || require("../../../../public/images/user-avatar.png"))}    /> 
                </div>
                <Input type="file" name="file" id="file" accept="image/*" itemID="forupload" onChange={handleImageChange}/>

              </label>

              <Label className="page-subtitle">Upload Photo</Label>
            </div>
          </Col>
        </Row>
        <Row className="page-subtitle">
          <Col>Employment  Details</Col>
        </Row>
        <Row>
          <Col md={9}>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="DriverType">Driver Type</Label>
                  <Input bsSize="sm" className="form-control" type="select" value={newDriver.driver_type_id} onChange={handleInputChange("driver_type_id")} required>
                  <option key={0} value="">Please Select</option>
                    {
                      driverTypeList && driverTypeList.map((driver) => (
                        <option key={driver.driver_type_id} value={driver.driver_type_id}>
                          {driver.driver_type_name}
                        </option>
                      ))
                    }
                  </Input>
                </FormGroup>
              </Col>
              {newDriver.driver_type_id == 3 &&
                <Col md={4}>
                  <FormGroup>
                    <Label for="vendor">Vendor</Label>
                    <Input bsSize="sm" className="form-control" type="select" id="vendor" value={newDriver.vendor_id} onChange={handleInputChange("vendor_id")} required >
                    <option key={0} value="">Please Select</option>
                      {
                        vendorList && vendorList.map((vendor) => (
                          <option key={vendor.vendor_id} value={vendor.vendor_id}>
                            {vendor.vendor_name}
                          </option>
                        ))
                      }
                    </Input>
                  </FormGroup>
                </Col>
              }
              <Col md={4}>
                <Label for="ifta">IFTA Handled by Company </Label>
                <FormGroup switch>
                  <Input type="switch"
                    checked={newDriver.is_IFTA_handled_by_company}
                    onChange={handleCheckboxChange}
                  />
                </FormGroup>

              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="status">Status</Label>
                  <Input bsSize="sm" className="form-control" type="select" id="status" value={newDriver.driver_status_id} onChange={handleInputChange("driver_status_id")} required >
                    <option key={0} value="">Please Select</option>
                    {
                      driverStatusList && driverStatusList.map((status) => (
                        <option key={status.driver_status_id} value={status.driver_status_id}>
                          {status.driver_status_name}
                        </option>
                      ))
                    }
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="application">Application Date</Label>
                  <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="application_date" className="form-control form-control-sm" onChange={(date) => { setNewDriver({ ...newDriver, application_date: Convert.ToISODate(date) }) }} selected={Convert.ToDate(newDriver.application_date)} required autoComplete="off" />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="date">Hire Date</Label>
                  <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="hire_date" className="form-control form-control-sm" onChange={(date) => { setNewDriver({ ...newDriver, hire_date: Convert.ToISODate(date) }) }} selected={Convert.ToDate(newDriver.hire_date)} required autoComplete="off" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="truck">Truck</Label>
                  <Input bsSize="sm" className="form-control" type="select" id="truck" value={newDriver.truck_id} onChange={handleInputChange("truck_id")} >
                  <option key={0} value={0}>Please Select</option>
                    {
                         truckList && truckList.map((truck) => (
                           <option key={truck.truck_id} value={truck.truck_id}>
                             { truck.truck_name }
                           </option>
                         ))
                       } 
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="trailer">Trailer</Label>
                  <Input bsSize="sm" className="form-control" type="select" id="trailer" value={newDriver.trailer_id} onChange={handleInputChange("trailer_id")} >
                  <option key={0} value={0}>Please Select</option>                   
                    {
                      trailerList && trailerList.map((trailer) => (
                        <option key={trailer.trailer_id} value={trailer.trailer_id}>
                          {trailer.trailer_name}
                        </option>
                      ))
                    }
                  </Input>
                </FormGroup>
              </Col>
              {/* <Col md={4}>
                    <FormGroup>
                      <Label for="fuelcard">Fuel Card #</Label>
                      <Input bsSize="sm" className="form-control form-control-sm" type="select"  id="fuelcard"  >  
                      </Input>
                    </FormGroup>
                  </Col> */}
            </Row>
          </Col>

          <Col md={3}></Col>
        </Row>
        <Row className="page-subtitle">
          <Col>Pay Rates</Col>
        </Row>
        <Row>
          <Col md={9}>
            <Row className="driver-basic-details">
              <Col className="d-flex gap-4 my-2">
                {payRateTypeList?.map((payRate)=>(
                  <FormGroup check>                  
                    <Input name="radio2" type="radio" checked={payRate.pay_rate_type_id==driverPayRates.pay_rate_type_id} onChange={() => handlePayRateType(payRate.pay_rate_type_id)} />
                    <Label check>{payRate.pay_rate_type_name}</Label>
                  </FormGroup>
                  ))
                }
              </Col>
            </Row>
            {driverPayRates.pay_rate_type_id == 1 && (
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label for="unit">Per Mile </Label>
                    <Input bsSize="sm" className="form-control" type="text" value={driverPayRates.per_mile} onChange={handleInputDriverPayRates("per_mile")} required autoComplete="off" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="extrastop">Per Extra Stop</Label>
                    <Input bsSize="sm" className="form-control" type="text" id="extrastop" value={driverPayRates.per_extra_stop} onChange={handleInputDriverPayRates("per_extra_stop")} autoComplete="off" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="emptymile">Per Empty Mile </Label>
                    <Input bsSize="sm" className="form-control" type="text" id="emptymile" value={driverPayRates.per_empty_mile} onChange={handleInputDriverPayRates("per_empty_mile")} autoComplete="off" />
                  </FormGroup>
                </Col>
              </Row>
            )}
            {driverPayRates.pay_rate_type_id == 2 &&
              (<Row>
                <Col md={4}>
                  <FormGroup>
                    <Label for="percentage">Percentage (e.g.80%) </Label>
                    <Input bsSize="sm" className="form-control" type="text" id="percentage" value={driverPayRates.freight_percentage} onChange={handleInputDriverPayRates("freight_percentage")} required autoComplete="off" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="unit">Per Extra Stop</Label>
                    <Input bsSize="sm" className="form-control" type="text" id="unit" value={driverPayRates.per_extra_stop} onChange={handleInputDriverPayRates("per_extra_stop")} autoComplete="off" />
                  </FormGroup>
                </Col>

              </Row>
              )}
            {driverPayRates.pay_rate_type_id === 3 && (
              <Row>
                <Col>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="period">Period </Label>
                        <Input bsSize="sm" className="form-control" type="text" id="period" value={driverPayRates.period} onChange={handleInputDriverPayRates("period")} required autoComplete="off" />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="amount">Amount</Label>
                        <Input bsSize="sm" className="form-control" type="text" id="amount" value={driverPayRates.amount} onChange={handleInputDriverPayRates("amount")} required autoComplete="off" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="startingon"> Starting On </Label>
                        <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="starting_on" className="form-control form-control-sm" onChange={(date) => { setDriverPayrates({ ...driverPayRates, starting_on: Convert.ToISODate(date) }) }} selected={Convert.ToDate(driverPayRates.starting_on)} required autoComplete="off" />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="extrastop">Per Extra Stop</Label>
                        <Input bsSize="sm" className="form-control" type="text" id="extrastop" value={driverPayRates.per_extra_stop} onChange={handleInputDriverPayRates("per_extra_stop")} />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}

            {driverPayRates.pay_rate_type_id === 4 &&
              (<Row>
                <Col md={4}>
                  <FormGroup>
                    <Label for="perhour">Per Hour</Label>
                    <Input
                      bsSize="sm" className="form-control" type="text" id="perhour" value={driverPayRates.per_hour} onChange={handleInputDriverPayRates("per_hour")} required  autoComplete="off" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="extrastop">Per Extra Stop</Label>
                    <Input bsSize="sm" className="form-control" type="text" id="extrastop" value={driverPayRates.per_extra_stop} onChange={handleInputDriverPayRates("per_extra_stop")}  autoComplete="off" />
                  </FormGroup>
                </Col>

              </Row>
              )}
          </Col>
          <Col
            md={3}
            className=" d-flex justify-content-end align-items-end pb-3"
          >
            <Button
              color="primary" size="sm" className="me-3 save-button" type="submit"
            >
              Save
            </Button>

            <Button className="cancel-button" size="sm" color="danger" outline={true} onClick={handleCloseForm} >
              Close
            </Button>
          </Col>
        </Row>
      </Row>
    </Form>
  )
};

export default DriversDetails
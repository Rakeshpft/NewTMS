import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, InputGroup, Label, Row } from "reactstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { BrokerModalPage, DriverModalPage, TrailerModalPage, TruckModalPage } from "./modal";
import MapPage from "./map-page/mapPage";
import { useListContext } from "../../services/reducer/list.reducer";
import ReactDatePicker from "react-datepicker";
import { Dictionary, Convert } from "../../features/shared/helper";
import { ILoadObject, ILoadProps, LoadStopObject, initialLoad, initialLoadStop } from "../../services/tms-objects/load.type";
import { ITrailerFilter, ITruckFilter } from "../../services/tms-objects/list.types";
import { MdOutlineNoteAdd } from "react-icons/md";
import AddPickupDeliveryStop from "./add-pickup-delivery-stop";
import { TrailersPage } from "../equipment-page";
import DriversDetails from "../driver-page/createDriver/driversDetails";
import TruckDetails from "../equipment-page/trucks-page/truck-detail/truck-detail";
import CustomerDetails from "../partenrs/customer/customer_detail/customerDetails";
import { useLoadContext } from "../../services/reducer/load.reducer";
import { toastify } from "../../features/notification/toastify";

const LoadDetail = (props: ILoadProps) => {
  const { load_id = 0 } = props;

  console.log(" load_id ", load_id);

  const {
    getLoadStatusList,
    loadStatusList,
    getBillingStatusList,
    billingStatusList,
    getStateList,
    stateList,
    getDispatcherList,
    dispatcherList,
    getTrailerList,
    trailerList,
    getTruckList,
    truckList,
    getDriverList,
    driverList,
  } = useListContext();

  const { getIndividualLoad  , selectedLoad  , postLoad} = useLoadContext();

  const [customerModal, setCustomerModal] = useState(false);
  const [driverModal, setDriverModal] = useState(false);
  const [trailerModal, setTrailerModal] = useState(false);
  const [truckModal, setTruckModal] = useState(false);

  const [newLoad, setNewload] = useState<ILoadObject>(initialLoad);
  const [pickupStopList, setPickupStopList] = useState<LoadStopObject[]>([]);
  const [deliveryStopList, setDeliveryStopList] = useState<LoadStopObject[]>([]);
  const [showCurrentComponent, setShowCurrentComponent] = useState(1);

  const toggleCustomer = () => {
    setShowCurrentComponent(2);
  };
  const toggleDriver = () => {
    setShowCurrentComponent(3);
  };
  const toggleTrailer = () => {
    setShowCurrentComponent(5);
  };
  const toggleTruck = () => {
    setShowCurrentComponent(4);
  };


  useEffect(() => {
    let trailerFilter: ITrailerFilter = { unassigned: true, driver_id:0 };
    let truckFilter: ITruckFilter = { unassigned: true, driver_id:0 };

    getBillingStatusList();
    getLoadStatusList();
    getStateList();
    getDispatcherList();
    getTrailerList(trailerFilter);
    getTruckList(truckFilter);
    getDriverList();
  }, []);

 useEffect( () => {
if(load_id > 0){
  getIndividualLoad(load_id);

}
 } , [load_id])

useEffect(() => {
  if(selectedLoad && load_id > 0){
    setNewload(selectedLoad);
    setPickupStopList(selectedLoad.pickupStopList);
    setDeliveryStopList(selectedLoad.deliveryStopList);
  }
} , [selectedLoad])

  const handleLoadInput = (prop: keyof ILoadObject) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewload({ ...newLoad, [prop]: event.target.value });
  };

  const handleAddPickup = () => {
    setPickupStopList([...pickupStopList, initialLoadStop]);
  };

  const handleAddDelivery = () => {
    setDeliveryStopList([...deliveryStopList, initialLoadStop]);
  };


const saveIndividualLoad = (event : React.FormEvent<HTMLFormElement>) => {

   event.preventDefault();
   postLoad( newLoad ).then((response) => {
     response && toastify({ message: response.message, type: (response.success ? "success" : "error") });
   })

}

  switch (showCurrentComponent) {
    case 1:
      return (
        <>
          <Form onSubmit={saveIndividualLoad}>
            <Row className="page-content">

            <Row className="page-subtitle">
            <Col lg={12}>Load</Col>
          </Row>
          
      <Row>
          <Col lg={3} md={6} sm={12}>
              <FormGroup>
                <Label for="loadNumber">Load Number</Label>
                <Input id="loadNumber" name="loadNumber" type="text" className="form-control form-control-sm" value={newLoad.load_number} onChange={handleLoadInput("load_number")} />
              </FormGroup>
            </Col>

            <Col lg={3} md={6} sm={12}>
              <FormGroup>
                <Label for="loadSelect">Status</Label>
                <Input id="loadSelect" name="status" type="select" bsSize="sm"  value={newLoad.load_status_id} onChange={handleLoadInput("load_status_id")}   >
                  <option value="">Select Status</option>
                  {loadStatusList?.map((item) => {
                    return (
                      <option key={item.load_status_id} value={item.load_status_id}>
                        {item.load_status_name}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} >
              <FormGroup>
                <Label for="BillingSelect">Billing Status</Label>
                <Input id="BillingSelect" name="billingStatus" type="select" bsSize="sm" value={newLoad.billing_status_id} onChange={handleLoadInput("billing_status_id")} >
                  <option value="">Select Billing Status</option>
                  {billingStatusList?.map((item) => {
                    return (
                      <option key={item.billing_status_id} value={item.billing_status_id}>
                        {item.billing_status_name}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12}>
              <FormGroup>
                <Label for="dispatcherSelect">Dispatcher</Label>
                <Input id="dispatcherSelect" name="dispatcher" type="select" bsSize="sm" value={newLoad.dispatcher_id} onChange={handleLoadInput("dispatcher_id")}>
                  {
                    dispatcherList && dispatcherList.map((dispatcherItem) => {
                     return (
                      <option key={dispatcherItem.dispatcher_id} value={dispatcherItem.dispatcher_id} >{dispatcherItem.dispatcher_name}</option>
                     )
                    })
                  }
                </Input>
              </FormGroup>
            </Col>
          </Row>

              <Row className="page-subtitle">
                <Col lg={12}>Pickup</Col>
              </Row>
              <Row>
                <Col lg={3} md={6} sm={12}>
                  <FormGroup>
                    <Label for="pickupDate">Date</Label>
                    <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event) => { event.preventDefault(); }}  dateFormat={Dictionary.UserDateFormat} name="purchase_date" className="form-control form-control-sm"  onChange={(date) => { ({ ...newLoad, pickup_date: Convert.ToISODate(date) });   }} selected={Convert.ToDate(newLoad.pickup_date)} required autoComplete="off" />
                   
                  </FormGroup>
                </Col>
                <Col lg={3} md={6} sm={12}>
                  <FormGroup>
                    <Label for="pickupCity">Location</Label>
                    <Input id="pickupCity" name="pickupCity" type="text" className="form-control form-control-sm" value={newLoad.pickup_city} onChange={handleLoadInput("pickup_city")}  required autoComplete="off"/>
                  </FormGroup>
                </Col>
                <Col lg={3} md={6} sm={12}>
                  <FormGroup>
                    <Label for="pickupState">State</Label>
                    <Input id="pickupState" bsSize="sm" name="pickupState" type="select" className="form-control form-control-sm" value={newLoad.pickup_state_id} onChange={handleLoadInput("pickup_state_id")} required autoComplete= "off">
                      <option value="">Select State</option>
                      {stateList?.map((item) => {
                        return (
                          <option key={item.state_id} value={item.state_id}>
                            {item.state_name}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col lg={3} md={6} sm={12}>
                  <FormGroup>
                    <Label for="pickupZip">ZIP</Label>
                    <Input id="pickupZip" name="pickupZip" type="text" className="form-control form-control-sm" value={newLoad.pickup_zipcode} onChange={handleLoadInput("pickup_zipcode")} requird autoComplete="off" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={12} className="d-flex justify-content-end">
                  <Button onClick={handleAddPickup}>
                    <MdOutlineNoteAdd fontSize={"16px"} /> Add Pickup Stop
                  </Button>
                </Col>
              </Row>

              <AddPickupDeliveryStop stopList={pickupStopList} setStopList={setPickupStopList} />

              <Row className="page-subtitle">
                <Col lg={12}>Delivery</Col>
              </Row>
              <Row>
                <Col lg={3} md={6} sm={12}>
                  <FormGroup>
                    <Label for="deliveryDate">Date</Label>
                    <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event) => { event.preventDefault(); }}  dateFormat={Dictionary.UserDateFormat} name="purchase_date" className="form-control form-control-sm"  onChange={(date) => { ({ ...newLoad, delivery_date: Convert.ToISODate(date) });   }} selected={Convert.ToDate(newLoad.delivery_date)} required autoComplete="off" />

                  </FormGroup>
                </Col>
                <Col lg={3} md={6} sm={12}>
                  <FormGroup>
                    <Label for="city">Location</Label>
                    <Input id="city" name="city" type="text" className="form-control form-control-sm" value={newLoad.delivery_city} onChange={handleLoadInput("delivery_city")}  requierd autoComplete="off"/>
                  </FormGroup>
                </Col>
                <Col lg={3} md={6} sm={12}>
                  <FormGroup>
                    <Label for="state">State</Label>
                    <Input id="state" name="state" type="select" bsSize="sm" className="form-control form-control-sm" value={newLoad.delivery_state_id} onChange={handleLoadInput("delivery_state_id")} required autoComplete="off">
                      <option value="">Select State</option>
                      {stateList?.map((item) => {
                        return (
                          <option key={item.state_id} value={item.state_id}>
                            {item.state_name}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col lg={3} md={6} sm={12}>
                  <FormGroup>
                    <Label for="deliveryZip">ZIP</Label>
                    <Input id="deliveryZip" name="deliveryZip" bsSize="sm" type="text" className="form-control form-control-sm" value={newLoad.delivery_zipcode} onChange={handleLoadInput("delivery_zipcode")}  required autoComplete="off"/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={12} className="d-flex justify-content-end">
                  <Button onClick={handleAddDelivery}>
                    <MdOutlineNoteAdd fontSize={"16px"} /> Add Delivery Stop
                  </Button>
                </Col>
              </Row>

              <AddPickupDeliveryStop stopList={deliveryStopList} setStopList={setDeliveryStopList} />

              <Row>
                <Col lg={12}>
                  <FormGroup>
                    <MapPage />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="page-subtitle">
                <Col lg={12}>Broker</Col>
              </Row>
              <Row>
                <Col lg={3} md={6} sm={12}>
                  <FormGroup>
                    <Label for="loadSelect">Broker</Label>
                    <InputGroup>
                      <Input id="loadSelect" name="broker" type="select" bsSize="sm" className="form-control form-control-sm" value={newLoad.broker_id} onChange={handleLoadInput("broker_id")} required autoComplete="off">
                        <option value="0">Select Broker</option>
                      </Input>
                      <Button size="sm" style={{ backgroundColor: "#D5554D" }} onClick={toggleCustomer}>
                        <AiOutlinePlus />
                      </Button>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col lg={3} md={6} sm={12}>
                  <FormGroup>
                    <Label for="po">PO #</Label>
                    <Input id="po" name="po" type="text" className="form-control form-control-sm" value={newLoad.po_number} onChange={handleLoadInput("po_number")} required autoComplete="off" />
                  </FormGroup>
                </Col>
                <Col lg={3} md={6} sm={12}>
                  <FormGroup>
                    <Label for="rate">Rate</Label>
                    <Input id="rate" name="rate" type="text" className="form-control form-control-sm" value={newLoad.rate} onChange={handleLoadInput("rate")} />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="page-subtitle">
                <Col lg={12}>Driver</Col>
              </Row>
              <Row>
                <Col lg={3} md={6} sm={12}>
                  <FormGroup>
                    <Label for="driver">Driver</Label>
                    <InputGroup>
                      <Input id="driver" name="driver" type="select" bsSize="sm" className="form-control form-control-sm" value={newLoad.driver_id} onChange={handleLoadInput("driver_id")}>
                        <option value="0">Select Driver</option>
                        {driverList &&
                          driverList.map((drivers) => {
                            return (
                              <option key={drivers.driver_id} value={drivers.driver_id}>
                                {" "}
                                {drivers.driver_name}
                              </option>
                            );
                          })}
                      </Input>
                      <Button size="sm" style={{ backgroundColor: "#D5554D" }} onClick={toggleDriver}>
                        <AiOutlinePlus />
                        <DriverModalPage
                          isDriverOpen={driverModal}
                          toggle={() => {
                            setDriverModal(false);
                          }}
                        />
                      </Button>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col lg={3} md={6} sm={12}>
                  <FormGroup>
                    <Label for="truck">Truck</Label>
                    <InputGroup>
                      <Input id="truck" name="truck" type="select" bsSize="sm" className="form-control form-control-sm" value={newLoad.truck_id} onChange={handleLoadInput("truck_id")}>
                        <option value="0">Select Truck</option>
                        {truckList &&
                          truckList.map((trucks) => {
                            return (
                              <option key={trucks.truck_id} value={trucks.truck_id}>
                                {" "}
                                {trucks.truck_name}
                              </option>
                            );
                          })}
                      </Input>
                      <Button size="sm" style={{ backgroundColor: "#D5554D" }} onClick={toggleTruck}>
                        <AiOutlinePlus />
                        <TruckModalPage
                          isTruckOpen={truckModal}
                          toggle={() => {
                            setTruckModal(false);
                          }}
                        />
                      </Button>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col lg={3} md={6} sm={12}>
                  <FormGroup>
                    <Label for="trailer">Trailer</Label>
                    <InputGroup>
                      <Input id="trailer" name="select" type="select" bsSize="sm" className="form-control form-control-sm" value={newLoad.trailer_id} onChange={handleLoadInput("trailer_id")}>
                        <option value="0">Select Trailer</option>
                        {trailerList &&
                          trailerList.map((trailers) => {
                            return (
                              <option key={trailers.trailer_id} value={trailers.trailer_id}>
                                {" "}
                                {trailers.trailer_name}
                              </option>
                            );
                          })}
                      </Input>
                      <Button size="sm" style={{ backgroundColor: "#D5554D" }} onClick={toggleTrailer}>
                        <AiOutlinePlus />
                        <TrailerModalPage
                          isTrailerOpen={trailerModal}
                          toggle={() => {
                            setTrailerModal(false);
                          }}
                        />
                      </Button>
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={3} md={6} sm={12}>
                  <FormGroup>
                    <Label for="co-driver">Co-Driver</Label>
                    <Input id="co-driver" name="co-driver" type="select" bsSize="sm" className="form-control form-control-sm" value={newLoad.co_driver_id} onChange={handleLoadInput("co_driver_id")} >
                    <option value="0">Select Co-Driver</option>
                        {driverList &&
                          driverList.filter((l=>l.driver_id != newLoad.driver_id )).map((drivers) => {
                            return (
                              <option key={drivers.driver_id} value={drivers.driver_id}>
                                {drivers.driver_name}
                              </option>
                            );
                          })}
                  </Input>
                  </FormGroup>
                </Col>
              </Row>
              

              <Row className="mt-4 justify-content-end">
                <Col lg={3} md={6} sm={12} className="align-self-end">
                  <FormGroup className="d-flex justify-content-end mb-1" style={{ bottom: "0", right: "0" }}>
                    <Button className="me-3 save-button" size="sm" type="submit">
                     
                  Save
                    </Button>
                    {/* <Button className="cancel-button" size="sm" onClick={handleCancleButton} > <RxCross2 fontSize={"13px"} color="red" /> Cancel</Button> */}
                  </FormGroup>
                </Col>
              </Row>
            </Row>
          </Form>
          <BrokerModalPage
            isCustomerOpen={customerModal}
            toggle={() => {
              setCustomerModal(false);
            }}
          />
        </>
      );
    case 2:
      return <CustomerDetails />;
    case 3:
      return <DriversDetails />;
    case 4:
      return <TruckDetails />;
    case 5:
      return <TrailersPage />;
  }
};

export default LoadDetail;

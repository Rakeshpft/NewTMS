import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, InputGroup, Label, Row, TabPane } from "reactstrap";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
//  import { LoadPage, initialLoadState } from "../tms-object/loadpage";
import { AiOutlinePlus } from "react-icons/ai";
import { BrokerModalPage, DriverModalPage, TrailerModalPage, TruckModalPage } from "./modal";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import { useLoadContext } from "../context/Load/load.reducer";
import MapPage from "./map-page/mapPage";
import { BasicTable } from "../../features/table/BasicTable";
import { tableHeadCells } from "./load.constant";
import { TabPage } from "../driver-page";

const CreateNewLaodForm = () => {
  const {
    getStatusList,
    loadStatus,
    getBillingStatusList,
    loadBillingStatus,
    getDispatcherStatusList,
    loadDispatcherStatus,
    getStateStatusList,
    loadStateStatus,
  } = useLoadContext();

  const navigate = useNavigate();
  // const [formState, dispatch] = useReducer(formReducer, initialLoadState);
  const [customerModal, setCustomerModal] = useState(false);
  const [driverModal, setDriverModal] = useState(false);
  const [trailerModal, setTrailerModal] = useState(false);
  const [truckModal, setTruckModal] = useState(false);
  // const [statusData , setStatusData] = useState<LoadPage>( initialLoadState);

  const toggleCustomer = () => setCustomerModal(!customerModal);
  const toggleDriver = () => setDriverModal(true);
  const toggleTrailer = () => setTrailerModal(!trailerModal);
  const toggleTruck = () => setTruckModal(!truckModal);

  // const handleInput =
  //   (type: FormAction["type"]) =>
  //   (
  //     event: React.ChangeEvent<
  //       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  //     >
  //   ) => {
  //     dispatch({ type, payload: event.target.value });
  //   };

  // const handleLoadInput = (prop: keyof LoadPage) => (event: React.ChangeEvent<HTMLInputElement>) => (
  //   setStatusData({ ...statusData, [prop]: event.target.value })
  // )
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // getStatusList();
    // console.log(formState);
  };

  const handleCancleButton = () => {
    // {
    //   history.location.pathname === routes.dashboard
    //     ? history.push(routes.loadpageAll)
    //     : history.goBack();
    // }
    {
      navigate(routes.loadpageAll);
    }
  };
  useEffect(() => {
    getStatusList();
    getBillingStatusList();
    getDispatcherStatusList();
    getStateStatusList();
  }, []);

  return (
    <main>
      <Form className="p-4" onSubmit={handleSubmit}>
        <Row className="page-title">
          <h5>Create New Load</h5>
        </Row>
        <Row className="page-content">
          <Row className="page-subtitle">
            <h6>Pickup</h6>
          </Row>
          <Row>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="pickupDate">Date</Label>
                <Input id="pickupDate" name="pickupDate" type="date" className="form-control form-control-sm" /*value={formState.pickupDate} onChange={handleInput("SET_pickupDate")}*/ />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="pickupCity">City</Label>
                <Input id="pickupCity" name="pickupCity" type="text" className="form-control form-control-sm" /*value={formState.pickupCity} onChange={handleInput("SET_pickupCity")}*/ />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="pickupState">State</Label>
                <Input id="pickupState" bsSize="sm" name="pickupState" type="select" className="form-control form-control-sm" /*value={formState.pickupState} onChange={handleInput("SET_pickupState")}*/ >
                  <option value="">Select State</option>
                  {loadStateStatus?.map((item) => {
                    return (
                      <option key={item.state_id} value={item.state_id}>{item.state_name}</option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="pickupZip">ZIP</Label>
                <Input id="pickupZip" name="pickupZip" type="text" className="form-control form-control-sm" /*value={formState.pickupZip} onChange={handleInput("SET_pickupZip")}*/ />
              </FormGroup>
            </Col>
          </Row>
          <Row className="page-subtitle">
            <h6>Delivery</h6>
          </Row>
          <Row>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="deliveryDate">Date</Label>
                <Input id="deliveryDate" name="deliveryDate" type="date" className="form-control form-control-sm"  /*value={formState.deliveryDate} onChange={handleInput("SET_deliveryDate")}*/ />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="deliveryCity">City</Label>
                <Input id="deliveryCity" name="deliveryCity" type="text" className="form-control form-control-sm" /*value={formState.deliveryCity} onChange={handleInput("SET_deliveryCity")}*/ />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="deliveryState">State</Label>
                <Input id="deliveryState" name="deliveryState" type="select" bsSize="sm" className="form-control form-control-sm" /*value={formState.deliveryState} onChange={handleInput("SET_deliveryState")}*/>
                  <option value="">Select State</option>
                  {loadStateStatus?.map((item) => {
                    return (
                      <option key={item.state_id} value={item.state_id}>{item.state_name}</option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="deliveryZip">ZIP</Label>
                <Input id="deliveryZip" name="deliveryZip" bsSize="sm" type="text" className="form-control form-control-sm" /*value={formState.deliveryZip} onChange={handleInput("SET_deliveryZip")}*/ />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={12} className="px-3" >
              <FormGroup>
              <MapPage />
              </FormGroup>
            </Col>
          </Row>
          <Row className="page-subtitle">
            <h6>Broker</h6>
          </Row>
          <Row>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="loadSelect">Broker</Label>
                <InputGroup>
                  <Input id="loadSelect" name="broker" type="select" bsSize="sm" className="form-control form-control-sm" /*value={formState.broker} onChange={handleInput("SET_broker")}*/ >
                    <option value="0">Select Broker</option>
                  </Input>
                  <Button size="sm" style={{ backgroundColor: "#D5554D" }} onClick={toggleCustomer}>
                    <AiOutlinePlus />
                  </Button>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="po">PO #</Label>
                <Input id="po" name="po" type="text" className="form-control form-control-sm" /*value={formState.po} onChange={handleInput("SET_po")}*/ />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="rate">Rate</Label>
                <Input id="rate" name="rate" type="text" className="form-control form-control-sm" /*value={formState.rate} onChange={handleInput("SET_rate")}*/ />
              </FormGroup>
            </Col>
          </Row>
          <Row className="page-subtitle">
            <h6>Driver</h6>
          </Row>
          <Row>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="driver">Driver</Label>
                <InputGroup>
                  <Input id="driver" name="driver" type="select" bsSize="sm" className="form-control form-control-sm" /*value={formState.driver} onChange={handleInput("SET_driver")}*/ >
                    <option value="0">Select Driver</option>
                  </Input>
                  <Button size="sm" style={{ backgroundColor: "#D5554D" }} onClick={toggleDriver}>
                    <AiOutlinePlus />
                    <DriverModalPage isDriverOpen={driverModal} toggle={() => { setDriverModal(false); }} />
                  </Button>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="truck">Truck</Label>
                <InputGroup>
                  <Input id="truck" name="truck" type="select" bsSize="sm" className="form-control form-control-sm" /*value={formState.truck} onChange={handleInput("SET_truck")}*/ >
                    <option value="0">Select Truck</option>
                  </Input>
                  <Button size="sm" style={{ backgroundColor: "#D5554D" }} onClick={toggleTruck} >
                    <AiOutlinePlus />
                    <TruckModalPage isTruckOpen={truckModal} toggle={() => { setTruckModal(false); }} />
                  </Button>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="trailer">Trailer</Label>
                <InputGroup>
                  <Input id="trailer" name="select" type="select" bsSize="sm" className="form-control form-control-sm" /*value={formState.trailer} onChange={handleInput("SET_trailer")}*/>
                    <option value="0">Select Trailer</option>
                  </Input>
                  <Button size="sm" style={{ backgroundColor: "#D5554D" }} onClick={toggleTrailer} >
                    <AiOutlinePlus />
                    <TrailerModalPage isTrailerOpen={trailerModal} toggle={() => { setTrailerModal(false); }} />
                  </Button>
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row className="page-subtitle">
            <h6>Load</h6>
          </Row>
          <Row>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="loadSelect">Status</Label>
                <Input id="loadSelect" name="status" type="select" bsSize="sm" /*value={statusData.status} onChange={handleLoadInput("status")}*/ >
                  <option value="">Select Status</option>
                  {loadStatus?.map((item) => {
                    return (
                      <option key={item.load_status_id} value={item.load_status_id}>
                        {item.load_status_name}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="BillingSelect">Billing Status</Label>
                <Input id="BillingSelect" name="billingStatus" type="select" bsSize="sm" /*value={formState.billingStatus} onChange={handleInput("SET_billingStatus")}*/ >
                  <option value="">Select Billing Status</option>
                  {loadBillingStatus?.map((item) => {
                    return (
                      <option key={item.load_billing_status_id} value={item.load_billing_status_id}>
                        {item.load_billing_status_name}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="dispatcherSelect">Dispatcher</Label>
                <Input id="dispatcherSelect" name="dispatcher" type="select" bsSize="sm" /*value={formState.dispatcher} onChange={handleInput("SET_dispatcher")}*/>
                  <option value="">Select Dispatcher</option>
                  {loadDispatcherStatus?.map((item) => {
                    return (
                      <option
                        key={item.load_dispatcher_id}
                      // value={item.load_dispatcher_id}
                      >
                        {item.load_dispatcher_name}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row className="page-subtitle mb-2">
            <Col lg={9} md={12}><h6 style={{ display: 'inline-block' }}>Notes</h6>
              <Button size="sm" className="edit-button" style={{ float: 'right' }} /*onClick={handleEditLoad}*/ >Add Note</Button></Col>
          </Row>
          <Row>
            <Col lg={9} md={12} sm={12} className="px-3">
              <FormGroup>
                <BasicTable
                  emptyState={false}
                  tableData={[]}
                  tableHeadCells={tableHeadCells}
                  loading={false}
                  tableCells={[]}
                  noPagination={true}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={9} md={12} sm={12}>
            <FormGroup>
                <TabPage
                  tabTitles={["Services", "Documents", "Billing", "History"]}
                >
                  <TabPane tabId={1}>
                    <Row className="mt-3">
                      <div className="d-flex justify-content-end">
                        <Button size="sm" className="edit-button " /*onClick={handleEditLumper}*/>New Lumper</Button>
                        <Button
                          size="sm"
                          className="edit-button px-1 mx-1"
                          // onClick={handleEditDetention}
                        >
                          New Detention
                        </Button>
                        <Button
                          size="sm"
                          className="edit-button"
                          // onClick={handleEditAddDeduct}
                        >
                          Other Additions/ Deductions
                        </Button>
                      </div>
                    </Row>
                  </TabPane>
                  <TabPane tabId={2}>

                    <Row className="mt-3 px-4">
                      <div className="d-flex justify-content-between ">
                        <div>
                        <Button
                          size="sm"
                          className="edit-button "
                          // onClick={handleUploadConfirmation}
                        >
                         Merge Documents
                        </Button>
                        </div>
                        <div>
                        <Button
                          size="sm"
                          className="edit-button "
                          // onClick={handleUploadConfirmation}
                        >
                         UpLoad Confirmation
                        </Button>
                        <Button
                          size="sm"
                          className="edit-button px-1 mx-1"
                          // onClick={handleEditDetention}
                        >
                          UpLoad BOL
                        </Button>
                        <Button
                          size="sm"
                          className="edit-button"
                          // onClick={handleEditAddDeduct}
                        >
                          Other
                        </Button>
                        </div>
                       
                      </div>
                    </Row>
                  </TabPane>
                  <TabPane tabId={3}>
                    <Row className="mt-3 px-4">
                      </Row>
                  </TabPane>
                  <TabPane tabId={4}>
                    <Row className="mt-3 px-4">
                    {/* <GenericTable
                  tableData={data}
                  tableHeaders={column}
                  defaultSortColumn="Load"
                  canEditRow={false}
                  editRow={handleEditLoad}
                /> */}
                      </Row>
                  </TabPane>
                </TabPage>
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-4 justify-content-end">
            <Col lg={3} md={6} sm={12} className="px-3 align-self-end">
              <FormGroup className="d-flex justify-content-end mb-1" style={{ bottom: "0", right: "0" }} >
                <Button className="me-3 save-button" size="sm" type="submit"><BiCheck fontSize={"16px"} />Save</Button>
                <Button className="cancel-button" size="sm" onClick={handleCancleButton} > <RxCross2 fontSize={"13px"} color="red" /> Cancel</Button>
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
    </main>
  );
};

export default CreateNewLaodForm;

import React, {  useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
  Table,
} from "reactstrap";
import { BiCheck } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
// import { PiGearDuotone } from "react-icons/pi";
import { routes } from "../routes/routes";
import EditLoadModal from "./editLoadModal";
import CommonLayOut from "../../layout";
import { Link, useNavigate } from "react-router-dom";
import { CustomTable } from "../../features/data-table/CustomTable";
import { ILoadObject } from "../../services/tms-objects/load.type";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { debounce, includes } from "lodash";
import { useLoadContext } from "../../services/reducer/load.reducer";
import { Convert } from "../../features/shared/helper";
//import { CustomDataTable } from "../../features/data-table/dataTable";

const rate = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 3,
});





const LoadPage = ( ) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);



  const navigate = useNavigate()
  const { getLaodList , loadList , statusLoading }= useLoadContext();

  console.log(" load list", loadList)

  const [dropdownOpen] = useState(false);
  const [isOpen] = useState(false);
  const [editLoadModal, setEditLoadModal] = useState(false);
  
  const [fileteredData, setFilteredData] = useState<ILoadObject[]>([]);
  
  const handleLoadSearch = debounce((searchValue: string) => {

    const searchResults =
    loadList &&
    loadList.filter(( load ) => {
        if (includes(load.driver_name.toLowerCase(), searchValue.toLowerCase())) {
          return load;
        }
      });
    searchResults && setFilteredData(searchResults);
    
  }, 500);

  console.log(" filtered data", fileteredData)

  useEffect(() => {
    if (!statusLoading && loadList) 
      setFilteredData(loadList);
    
  }, [loadList]);

  useEffect(() => {
    getLaodList();
  }, []);
 
  const columns = [
    {		
      id:'load_number',
      name: 'LOAD',
      selector: (row : ILoadObject) => row.load_number,
      sortable:true
    },
    {	
      id:'pickup_date',
      name: 'DATE',
      sortable:true,
      selector: (row: ILoadObject) => row.pickup_date,
      format: (row: ILoadObject) =>  Convert.ToUserDate(row.pickup_date),
    },
    {		
      id:'driver_name',
      name: 'Driver',
      selector: (row : ILoadObject) => row.driver_name,
      sortable:true
    },
    {		
      id:'broker_name',
      name: 'BROKER',
      selector: (row: ILoadObject) => row.broker_name,
      sortable:true
    },
    {		
      id:'po_number',
      name: 'PO#',
      selector: (row: ILoadObject) => row.po_number,
      sortable:true
    },
    {		
      id:'pickup_state_id',
      name: 'PICKUP',
      selector: (row: ILoadObject) => row.pickup_state_name,
      sortable:true
    },
    {		
      id:'delivery_state_id',
      name: 'DELIVERY',
      selector: (row: ILoadObject) => row.delivery_state_name,
      sortable:true
    },
  
    {		
      id:'rate',
      name: 'RATE',
      selector: (row: ILoadObject) => row.rate,
      format:(row:{rate:number})=> rate.format(row.rate) ,
      sortable:true
    },
    {		
      id:'delivery_date',
      name: 'COMPLETED',
      sortable:true,
      selector: (row: ILoadObject) => row.delivery_date,
      format: (row: ILoadObject) =>  Convert.ToUserDate(row.delivery_date)
    },
    {		
      id:'billing_status_id',
      name: 'BILLING',
      selector: (row: ILoadObject) => row.billing_status_name,
      sortable:true
    },
    {		
      id:'load_status_id',
      name: 'STATUS',
      selector: (row: ILoadObject) => row.load_status_name,
      sortable:true
    },
    
    {		
      id:'co_driver_name',
      name: 'NOTES',
      selector: (row: ILoadObject) => row.co_driver_name,
      sortable:true
    },
    {		
      id:'co_driver_name',
      name: 'ATTACHMENTS',
      selector: (row: ILoadObject) => row.co_driver_name,
      cell: (row: ILoadObject) => <a href='http://www.google.com' target="_blank">{row.co_driver_name}</a>,
      
      sortable:true
    },
  
    {
      id: "action",
      name: "ACTIONS",
      style: { width: "5%" },
      selector: (row: ILoadObject) => row.load_id,
      cell: (row: ILoadObject) => ( <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={() => { navigate(`${routes.createNewLoad}/${row.load_id}`); }} />
      ),
      sortable: false,
    },
  ];
  
 

  return (
    <CommonLayOut>
      <div className="d-flex justify-content-between">
        <div className="page-title">
          View Loads
        </div>
        <div>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex justify-content-end ms-auto align-items-center column-gap-2">
              <div className="mt-2 fw-bold">
                <Label for="Period">Period:</Label>
              </div>
              <div>                
                <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
                  <DropdownToggle variant="secondary" className="bg-white" style={{border:'none', color:'#000', width:'125px'}} >
                    This Year ▼
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>This Year</DropdownItem>
                    <DropdownItem>This Month</DropdownItem>
                    <DropdownItem>This Week</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              {/* <InputGroup className="shadow-sm border-secondary">
                <InputGroupText className="bg-white">
                  <BsSearch size={16} />
                </InputGroupText>
                <Input
                  placeholder="Search"
                  className="border-start-0 border-end-0 search"
                  value={filter}
                  onChange={handleSearchFilterChange}
                />
                <InputGroupText className="bg-white">
                  <Button
                    color="link"
                    size="sm"
                    className="p-0"
                    onClick={() => searchToggle()}
                  >
                    <BsSliders2 size={16} />
                  </Button>
                </InputGroupText>
              </InputGroup> */}
            </div>
            {/* <Button color="primary" onClick={navigateToCreateLoad}>
              <AiOutlinePlus />
              New Load
            </Button> */}
             <Link to={routes.createNewLoad}>
                  <Button color="primary" >
                    <AiOutlinePlus />
                    New Load
                  </Button>
                </Link>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <div className="aria-content">
          {isOpen && (
            <Collapse isOpen={isOpen}>
              <Card className="card-search mb-3">
                <CardBody>
                  <Form
                    onSubmit={() => console.log("search")}
                    className="loadsSearchForm"
                  >
                    <Row className="mb-2">
                      <Col>
                        <h5 className="text-info mt-2 fw-bold">
                          Search Filter
                        </h5>
                      </Col>
                    </Row>
                    <div className="ps-lg-5">
                      <Row className="mb-2">
                        <Col lg={2} md={4} sm={12}>
                          <FormGroup>
                            <Label>Period</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="period"
                              type="select"
                              className="form-control form-control-sm"
                              // value={formState.period}
                              // onChange={handleFilterInputChange}
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                          <FormGroup>
                            <Label>Pickup Date</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              type="date"
                              className="form-control form-control-sm"
                              name="pickupDate"
                              // value={formState.pickupDate}
                              // onChange={handleFilterInputChange}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Delivery Date</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              type="date"
                              name="deliveryDate"
                              className="form-control form-control-sm"
                              // value={formState.deviveryDate}
                              // onChange={handleFilterInputChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={2} md={4} sm={12}>
                          <FormGroup>
                            <Label>Broker</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="broker"
                              type="select"
                              className="form-control form-control-sm"
                              // value={formState.broker}
                              // onChange={handleFilterInputChange}
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                          <FormGroup>
                            <Label>City</Label>
                            <Input
                              bsSize="sm"
                              id="exampleCity"
                              name="city"
                              type="text"
                              className="form-control form-control-sm"
                              // value={formState.city}
                              // onChange={handleFilterInputChange}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>City</Label>
                            <Input
                              bsSize="sm"
                              id="exampleCity"
                              name="city"
                              type="text"
                              className="form-control form-control-sm"
                              // value={formState.city}
                              // onChange={handleFilterInputChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={2} md={4} sm={12}>
                          <FormGroup>
                            <Label>Driver</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="driver"
                              type="select"
                              className="form-control form-control-sm"
                              // value={formState.driver}
                              // onChange={handleFilterInputChange}
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                          <FormGroup>
                            <Label>State</Label>
                            <Input
                              bsSize="sm"
                              id="exampleState"
                              name="state"
                              type="text"
                              className="form-control form-control-sm"
                              // value={formState.state}
                              // onChange={handleFilterInputChange}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>State</Label>
                            <Input
                              bsSize="sm"
                              id="exampleState"
                              name="state"
                              type="text"
                              className="form-control form-control-sm"
                              // value={formState.state}
                              // onChange={handleFilterInputChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={2} md={4} sm={12}>
                          <FormGroup>
                            <Label>Dispatcher</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="dispatcher"
                              type="select"
                              className="form-control form-control-sm"
                              // value={formState.dispatcher}
                              // onChange={handleFilterInputChange}
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                          <FormGroup>
                            <Label>Truck</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="truck"
                              type="select"
                              className="form-control form-control-sm"
                              // value={formState.truck}
                              // onChange={handleFilterInputChange}
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                          <FormGroup>
                            <Label>Trailer</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="trailer"
                              type="select"
                              className="form-control form-control-sm"
                              // value={formState.trailer}
                              // onChange={handleFilterInputChange}
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg={2} md={4} sm={12}>
                          <FormGroup>
                            <Label>Direct Billing/Factoring</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="directBilling"
                              type="select"
                              className="form-control form-control-sm"
                              // value={formState.directBilling}
                              // onChange={handleFilterInputChange}
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="small">
                        <Col md="8">
                          <Table
                            borderless
                            responsive
                            size="sm"
                            className="checkboxTable"
                          >
                            <tbody>
                              <tr>
                                <th>
                                  <Label className="fw-bold me-3 _fixWidth">
                                    Status
                                  </Label>
                                </th>
                                <td>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>New</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Dispatched</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>TOUN</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>cancel-buttonled</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>En-Route</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Picked-up</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Delivered</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Close</Label>
                                  </FormGroup>
                                </td>
                              </tr>
                              <tr>
                                <th>
                                  <Label className="fw-bold me-3 _fixWidth">
                                    Billing Status
                                  </Label>
                                </th>
                                <td>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Pending</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>cancel-buttonled</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>BOL Received</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Invoiced</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Sent to Factoring</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Funded</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Paid</Label>
                                  </FormGroup>
                                </td>
                              </tr>
                              <tr>
                                <th>
                                  <Label className="fw-bold me-3 _fixWidth">
                                    Location Status
                                  </Label>
                                </th>
                                <td>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>No</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Yes</Label>
                                  </FormGroup>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                        <Col md="4">
                          <Row className="align-items-center d-flex h-100">
                            <Col
                              md="6"
                              className="d-flex justify-content-end align-items-end"
                            >
                              <Button size="sm" className="me-3 save-button">
                                <BiCheck fontSize={"16px"} />
                                Apply
                              </Button>
                              <Button className="cancel-button" size="sm">
                                <RxCross2 fontSize={"16px"} color="red" /> Clear
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Collapse>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-end ms-auto align-items-center column-gap-2">
                  <InputGroup className="shadow-sm border-secondary">
                    <InputGroupText className="bg-white">
                      <BsSearch size={16} />
                    </InputGroupText>
                    <Input
                      placeholder="Search"
                      className="border-start-0 search"
                      inputRef={inputRef}
                      onChange={(e: any) => handleLoadSearch(e.target.value)}
                    />
                  </InputGroup>
                </div>
      <EditLoadModal isOpen={editLoadModal} toggle={() => setEditLoadModal(false)} />
      {/* <CustomDataTable columns={columns} data ={data} pagination={true} /> */}
      <CustomTable columns={columns} data={fileteredData} noRecordMessage="No load found."  />
    </CommonLayOut>
  );
};

export default LoadPage;


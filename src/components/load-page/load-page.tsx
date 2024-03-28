import React, { useReducer, useState } from "react";
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
import { BsSearch, BsSliders2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
// import { PiGearDuotone } from "react-icons/pi";
import { SearchLoadPage, initialSearchState } from "../tms-object/loadpage";
import { routes } from "../routes/routes";
import EditLoadModal from "./editLoadModal";
import CommonLayOut from "../../layout";
import { BasicTable } from "../../features/table/BasicTable";
import { useNavigate } from "react-router-dom";

const columns = [
  "Load",
  "Date",
  "Driver",
  "Broker",
  "PO#",
  "Pickup",
  "Delivery",
  "Rate",
  "Completed",
  "Status",
  "Billing",
  "Notes",
  "Attachments",
  // "Actions",
  // <PiGearDuotone />,
];

const Tabledata = [
  {
    Load: 1001,
    Date: "07/14/23",
    Driver: "Shyam payne [drv]",
    Broker: "002063564 ONTARIO",
    "PO#": "-",
    Pickup: "Joliet, ILL",
    Delivery: "Cameron, ILT",
    Rate: "$500.00",
    Completed: "23/06/2023",
    Status: "Delivered - badge",
    Billing: "Invoiced",
    Notes: "Lumper: $50.00 :: Detention: $50.00",
    Attachments: "[file-icon]",

  },
  {
    Load: 1002,
    Date: "08/12/23",
    Driver: "Sita payne [drv]",
    Broker: "002063563 ONTARIO",
    "PO#": "-",
    Pickup: "Joliet",
    Delivery: "Cameron",
    Rate: "$500.00",
    Completed: "24/06/2023",
    Status: "Delivered - badge",
    Billing: "Invoiced",
    Notes: "Lumper: $50.00 :: Detention: $50.00",
    Attachments: "[file-icon]",

  },
  {
    Load: 1003,
    Date: "08/12/23",
    Driver: "Ram payne [drv]",
    Broker: "002063563 ONTARIO",
    "PO#": "-",
    Pickup: "Joliet-T",
    Delivery: "Cameron",
    Rate: "$500.00",
    Completed: "25/06/2023",
    Status: "Delivered - badge",
    Billing: "Invoiced",
    Notes: "Lumper: $50.00 :: Detention: $50.00",
    Attachments: "[file-icon]",

  },
];

type ActionTypes =
  | { type: "SET_PERIOD"; payload: string }
  | { type: "SET_PICKUPDATE"; payload: string }
  | { type: "SET_DEVIVERYDATE"; payload: string }
  | { type: "SET_BROKER"; payload: string }
  | { type: "SET_CITY"; payload: string }
  | { type: "SET_STATE"; payload: string }
  | { type: "SET_DRIVER"; payload: string }
  | { type: "SET_DISPATCHER"; payload: string }
  | { type: "SET_TRUCK"; payload: string }
  | { type: "SET_TRAILER"; payload: string }
  | { type: "SET_DIRECTBILLING"; payload: string };

const filterformReducer = (
  state: SearchLoadPage,
  action: ActionTypes
): SearchLoadPage => {
  switch (action.type) {
    case "SET_PERIOD":
      return { ...state, period: action.payload };
    case "SET_PICKUPDATE":
      return { ...state, pickupDate: action.payload };
    case "SET_DEVIVERYDATE":
      return { ...state, deviveryDate: action.payload };
    case "SET_BROKER":
      return { ...state, broker: action.payload };
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "SET_STATE":
      return { ...state, state: action.payload };
    case "SET_DRIVER":
      return { ...state, driver: action.payload };
    case "SET_DISPATCHER":
      return { ...state, dispatcher: action.payload };
    case "SET_TRUCK":
      return { ...state, truck: action.payload };
    case "SET_TRAILER":
      return { ...state, trailer: action.payload };
    case "SET_DIRECTBILLING":
      return { ...state, directBilling: action.payload };
    default:
      return state;
  }
};

const LoadPage = () => {
  //const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(Tabledata);
  const [editLoadModal, setEditLoadModal] = useState(false)
  const [filter, setFilter] = useState("");
  const [formState, dispatch] = useReducer(
    filterformReducer,
    initialSearchState
  );

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const navigateToCreateLoad = () => {
    navigate(routes.createNewLoad);
  };
  const handleSearchFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filteredData = Tabledata.filter((item) => {
      return columns.some((column) =>
        String(item[column as keyof object])
          .toLowerCase()
          .includes(value)
      );
    });
    setFilter(value);
    setFilteredData(filteredData);
  };

  // const handleEditLoad = () => {
  //   setEditLoadModal(true)
  // }

  const searchToggle = (): void => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleFilterInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    dispatch({
      type: `SET_${name.toUpperCase()}` as ActionTypes["type"],
      payload: value,
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);
  };

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
              <InputGroup className="shadow-sm border-secondary">
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
              </InputGroup>
            </div>
            <Button color="primary" onClick={navigateToCreateLoad}>
              <AiOutlinePlus />
              New Load
            </Button>
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
                    onSubmit={handleSearchSubmit}
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
                              value={formState.period}
                              onChange={handleFilterInputChange}
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
                              value={formState.pickupDate}
                              onChange={handleFilterInputChange}
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
                              value={formState.deviveryDate}
                              onChange={handleFilterInputChange}
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
                              value={formState.broker}
                              onChange={handleFilterInputChange}
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
                              value={formState.city}
                              onChange={handleFilterInputChange}
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
                              value={formState.city}
                              onChange={handleFilterInputChange}
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
                              value={formState.driver}
                              onChange={handleFilterInputChange}
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
                              value={formState.state}
                              onChange={handleFilterInputChange}
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
                              value={formState.state}
                              onChange={handleFilterInputChange}
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
                              value={formState.dispatcher}
                              onChange={handleFilterInputChange}
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
                              value={formState.truck}
                              onChange={handleFilterInputChange}
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
                              value={formState.trailer}
                              onChange={handleFilterInputChange}
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
                              value={formState.directBilling}
                              onChange={handleFilterInputChange}
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

      <EditLoadModal isOpen={editLoadModal} toggle={() => setEditLoadModal(false)} />
      <BasicTable
        emptyState={false}
        tableData={Tabledata}
        tableHeadCells={columns}
        loading={false}
        tableCells={filteredData}
      />
    </CommonLayOut>
  );
};

export default LoadPage;

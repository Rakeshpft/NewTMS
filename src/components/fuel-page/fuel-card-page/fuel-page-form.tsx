import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Col,
  Row,
  FormGroup,
  Label,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import CommonLayOut from "../../../layout";
import { IAssignFuelCardObject, ICancelFuelCardObject, IFuelCardAssigneeObject, IFuelCardObject, IReturnFuelCardObject, fuelCardAssigneeInitialState, fuelCardInitialState } from "../../../services/tms-objects/fuel-card.types";
import { useFuelCardContext } from "../../../services/reducer/fuel-card.reducer";
import { Convert, Dictionary } from "../../../features/shared/helper";
import ReactDatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../../services/context/loading.context";
import { toastify } from "../../../features/notification/toastify";
import { routes } from "../../routes/routes";
import { useListContext } from "../../../services/reducer/list.reducer";
import { CustomTable } from "../../../features/data-table/CustomTable";

export type IFuelCardProp = {
  fuel_card_id?: number;
  handleSubmit?: (obj: any) => void;
}

const CreateFuelCardPage = (prop: IFuelCardProp) => {
  const {
    fuel_card_id = 0,
    handleSubmit = undefined
  } = prop;

  const { setLoader } = useContext(LoadingContext);
  const { getDriverList, driverList } = useListContext();
  const { getFuelCardDetail, fuelCardDetail, getFuelCardCurrentAssigneeDetail, fuelCardCurrentAssigneeDetail, getFuelCardAssigneeList, fuelCardAssigneeList, saveFuelCard, assignFuelCard, returnAssignedFuelCard, cancelAssignedFuelCard } = useFuelCardContext();
  const [stateFuelCardDetail, setStateFuelCardDetail] = useState<IFuelCardObject>(fuelCardInitialState);
  const [ stateFuelCardAssigneeDetail, setStateFuelCardAssigneeDetail] = useState<IFuelCardAssigneeObject>(fuelCardAssigneeInitialState);
  const [stateFuelCardList, setStateFuelCardList] = useState<IFuelCardAssigneeObject[] | []>([]);
  const [AssignModalOpen, setAssignModalOpen] = useState(false);
  const [CancelModalOpen, setCancelModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (fuel_card_id > 0) {
      getFuelCardDetail(fuel_card_id);
      getFuelCardAssigneeList(fuel_card_id)
    }
    else {
      fuelCardInitialState.is_active = true;
      setStateFuelCardDetail(fuelCardInitialState);
      setStateFuelCardList([]);
    }
    getDriverList();
  }, [fuel_card_id]);

  useEffect(() => {
    if (fuelCardDetail && fuel_card_id > 0) {
      setStateFuelCardDetail(fuelCardDetail);
    }
  }, [fuelCardDetail]);

  useEffect(() => {
    if (fuelCardCurrentAssigneeDetail && fuel_card_id > 0) {
      setStateFuelCardAssigneeDetail(fuelCardCurrentAssigneeDetail);
    }
  }, [fuelCardCurrentAssigneeDetail]);

  useEffect(() => {
    if (fuelCardAssigneeList && fuel_card_id > 0) {
      setStateFuelCardList(fuelCardAssigneeList)
    }
  }, [fuelCardAssigneeList]);

  const handleFuelCardInputChange = (prop: keyof IFuelCardObject) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateFuelCardDetail({ ...stateFuelCardDetail, [prop]: event.target.type == "checkbox" ? event.target.checked : event.target.value });    
  };

  const handleSaveFuelCard = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true);
    const response = await saveFuelCard(stateFuelCardDetail);
    if (response) {
      toastify({ message: response.message, type: (response.success ? "success" : "error") });
      if (response.success) {
        if (handleSubmit) {
          setTimeout(() => {
            setLoader(false);
            handleSubmit(response.value);
          }, 2000);
        } else {
          setStateFuelCardDetail({ ...stateFuelCardDetail, fuel_card_id: response.value });
          getFuelCardDetail(response.value);
          getFuelCardCurrentAssigneeDetail(response.value);
          setTimeout(() => {
            setLoader(false);
            navigate(`${routes.createNewFuelPage}/${response.value}`)
          }, 2000);
        }
      } else {
        setLoader(false);
      }
    } else {
      setLoader(false);
    }
  };

  const getAssignCardDetails = () => {
    setAssignModalOpen(true);
    getFuelCardCurrentAssigneeDetail(fuel_card_id);
  }

  const setCancelAssignCardDetails = () => {
    setCancelModalOpen(true);
    getFuelCardCurrentAssigneeDetail(fuel_card_id);
  }

  const handleAssignInputChange = (prop: keyof IFuelCardAssigneeObject) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateFuelCardAssigneeDetail({ ...stateFuelCardAssigneeDetail, [prop]: event.target.value });
  };

  const handleClose = () => {
    setStateFuelCardDetail(fuelCardInitialState);
    navigate(routes.fuelPage);
  }

  const AssignModalClose = () => {
    setAssignModalOpen(false);
  }

  const CancelModalClose = () => {
    setCancelModalOpen(false);
  }

  const handleAssignCard = async (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault();
    let assignCardData: IAssignFuelCardObject = {
      driver_id: stateFuelCardAssigneeDetail.driver_id,
      assigned_date: stateFuelCardAssigneeDetail.assigned_date,
      returned_date: stateFuelCardAssigneeDetail.returned_date
    }
    if(assignCardData.returned_date != ""){
      if(new Date(assignCardData.assigned_date)> new Date(assignCardData.returned_date)){
        toastify({ message: "Returned On must be after the Assigned On.", type: "error" });
        return;
      }
    }
    setLoader(true);
    await assignFuelCard(fuel_card_id, assignCardData).then((response) => {
      if (response) {
        toastify({ message: response.message, type: response.success ? "success" : "error" });
        if (response.success) {
          if (handleSubmit) {
            setLoader(false);
            handleSubmit(response.value);
          } else {
            getFuelCardDetail(fuel_card_id);
            getFuelCardAssigneeList(fuel_card_id);
            setAssignModalOpen(false);
            setLoader(false);
          }
        } else {
          setLoader(false);
        }
      } else {
        setLoader(false);
      }
    });
  };

  const handleReturnCard = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let returnCardData: IReturnFuelCardObject = {
      assignee_id: stateFuelCardAssigneeDetail.assignee_id,
      returned_date: stateFuelCardAssigneeDetail.returned_date
    }
    if(new Date(stateFuelCardAssigneeDetail.assigned_date)> new Date(stateFuelCardAssigneeDetail.returned_date)){
        toastify({ message: "Returned On must be after the Assigned On.", type: "error" });
        return;
    }
    setLoader(true);
    await returnAssignedFuelCard(fuel_card_id, returnCardData).then((response) => {
      if (response) {
        toastify({ message: response.message, type: response.success ? "success" : "error" });
        if (response.success) {
          if (handleSubmit) {
            setLoader(false);
            handleSubmit(response.value);
          } else {
            getFuelCardDetail(fuel_card_id);
            getFuelCardAssigneeList(fuel_card_id);
            setAssignModalOpen(false);
            setLoader(false);
          }
        } else {
          setLoader(false);
        }
      } else {
        setLoader(false);
      }
    });
  };  

  const handleCancelCard = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true);
    let cancelCardData: ICancelFuelCardObject = {
      assignee_id: stateFuelCardAssigneeDetail.assignee_id,
      cancel_reason: stateFuelCardAssigneeDetail.cancel_reason
    }
    await cancelAssignedFuelCard(fuel_card_id, cancelCardData).then((response) => {
      if (response) {
        toastify({ message: response.message, type: response.success ? "success" : "error" });
        if (response.success) {
          getFuelCardDetail(fuel_card_id);
          getFuelCardAssigneeList(fuel_card_id);
          setCancelModalOpen(false);
          setLoader(false);
        } else {
          setLoader(false);
        }
      } else {
        setLoader(false);
      }
    });
  };

  const columns: CustomTableColumn[] = [
    {
      id: "driver_name",
      name: "DRIVER",
      style: { width: "10%" },
      sortable: true,
      selector: (row: IFuelCardAssigneeObject) => row.driver_name,
    },
    {
      id: "assigned_date",
      name: "ASSIGNED ON",
      style: { width: "10%" },
      sortable: true,
      selector: (row: IFuelCardAssigneeObject) => row.assigned_date,
      format: (row: IFuelCardAssigneeObject) => Convert.ToUserDate(row.assigned_date)
    },
    {
      id: "returned_date",
      name: "RETURNED ON",
      style: { width: "10%" },
      sortable: true,
      selector: (row: IFuelCardAssigneeObject) => row.returned_date,
      format: (row: IFuelCardAssigneeObject) => Convert.ToUserDate(row.returned_date)
    },
    {
      id: "cancelled_date",
      name: "CANCELLED ON",
      style: { width: "10%" },
      sortable: true,
      selector: (row: IFuelCardAssigneeObject) => row.cancelled_date,
      format: (row: IFuelCardAssigneeObject) => Convert.ToUserDate(row.cancelled_date)
    },
    {
      id: "cancel_reason",
      name: "CANCEL REASON",
      style: { width: "10%" },
      sortable: true,
      selector: (row: IFuelCardAssigneeObject) => row.cancel_reason,
    },
  ]

  return (
    <CommonLayOut>
      <div className="page-title">{stateFuelCardDetail.fuel_card_id === 0 ? "Create" : "Edit"} Fuel Card</div>
      <div className="page-content">
        <Form onSubmit={handleSaveFuelCard}>
          <Row>
            <Col lg={3} md={6} sm={12}>
              <FormGroup>
                <Label for="cardNumber">Card Number</Label>
                <Input bsSize="sm" className="form-control" type="text" name="card_number" value={stateFuelCardDetail.card_number} onChange={handleFuelCardInputChange("card_number")} autoComplete="off" required />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="expirationDate">Card Expiry</Label>
                <ReactDatePicker showYearDropdown showMonthYearPicker showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}}  placeholderText="MM-YYYY" dateFormat="MM-yyyy" name="expiration_date" className="form-control form-control-sm" onChange={(date) => { setStateFuelCardDetail({ ...stateFuelCardDetail, expiration_date: Convert.ToMonthYear(date) }) }} selected={Convert.MonthYearToDate(stateFuelCardDetail.expiration_date)} value={stateFuelCardDetail.expiration_date} minDate={new Date()} autoComplete="off" required={true} />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12}>
              <Label for="Active">Active</Label>
              <FormGroup switch>
                <Input type="switch" checked={stateFuelCardDetail.is_active} onChange={handleFuelCardInputChange("is_active")} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="notes">Notes</Label>
                <Input bsSize="sm" className="form-control" type="textarea" rows="3" name="notes" value={stateFuelCardDetail.notes} onChange={handleFuelCardInputChange("notes")} autoComplete="off" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="d-flex justify-content-start">
            <Col md={3} className=" d-flex justify-content-start align-items-start" >
              <Button color="primary" size="sm" className="me-3" type="submit">Save</Button>
              <Button size="sm" color="danger" outline={true} onClick={handleClose}>Close</Button>
            </Col>
          </Row>          
        </Form>
      </div>
      <Row className="d-flex justify-content-end">
            <Col md={3} className=" d-flex justify-content-end align-items-end" >
              {stateFuelCardDetail.fuel_card_id > 0 && stateFuelCardDetail.driver_id == 0 && (
                <Button color="primary" size="sm" className="me-3" onClick={getAssignCardDetails} >Assign Card</Button>
              )}
              {stateFuelCardDetail.fuel_card_id > 0 && stateFuelCardDetail.driver_id > 0 && (
                <>
                  <Button color="primary" size="sm" className="me-3" onClick={getAssignCardDetails} >Return Card</Button>
                  <Button  color="primary" size="sm" onClick={setCancelAssignCardDetails}>Cancel Assignment</Button>
                </>
              )}
            </Col>
          </Row>
      <CustomTable columns={columns} data={stateFuelCardList} noRecordMessage="No assignee detail found." />
      {stateFuelCardAssigneeDetail &&
        <Modal isOpen={AssignModalOpen} toggle={AssignModalClose}>
          <ModalHeader>
            <h6 className="mb-0 fw-bold">{stateFuelCardAssigneeDetail.assignee_id==0?"Assign Card":"Return Card"}</h6>
          </ModalHeader>
          <ModalBody className="square border border-info-rounded">
            <Form onSubmit={stateFuelCardAssigneeDetail.assignee_id==0?handleAssignCard:handleReturnCard}>
              <Row>
                <FormGroup>
                  <Label for="driver_id">Driver</Label>
                  {stateFuelCardAssigneeDetail.assignee_id == 0 && (
                    <Input bsSize="sm" className="form-control" type="select" id="driver_id" name="driver_id" value={stateFuelCardAssigneeDetail.driver_id} onChange={handleAssignInputChange("driver_id")} required={true}>
                      <option key={0} value="">Select Driver</option>
                      {driverList && driverList.length > 0 && driverList.map((item) => (
                        <option key={item.driver_id} value={item.driver_id}>{item.driver_name}</option>
                      ))}
                    </Input>
                  )}
                  {stateFuelCardAssigneeDetail.assignee_id > 0 && (
                    <Input bsSize="sm" className="form-control" type="text" id="driver_id" name="driver_id" value={stateFuelCardAssigneeDetail.driver_name} disabled />
                  )}
                </FormGroup>
              </Row>
              <Row className="page-content align-items-center">
                <Col md={6}>
                  <FormGroup>
                    <Label for="assigned_date">Assigned On</Label>
                    {stateFuelCardAssigneeDetail.assignee_id == 0 && (
                      <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="assigned_date" className="form-control form-control-sm" onChange={(date) => { setStateFuelCardAssigneeDetail({ ...stateFuelCardAssigneeDetail, assigned_date: Convert.ToISODate(date) }) }} selected={Convert.ToDate(stateFuelCardAssigneeDetail.assigned_date)} 
                      required={true} autoComplete="off" />
                    )}
                    {stateFuelCardAssigneeDetail.assignee_id > 0 && (
                      <ReactDatePicker showYearDropdown showMonthDropdown showIcon fixedHeight onKeyDown={(event)=>{event.preventDefault()}}  placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="assigned_date" className="form-control form-control-sm" onChange={() => { }} selected={Convert.ToDate(stateFuelCardAssigneeDetail.assigned_date)} readOnly disabled />
                    )}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="returned_date">Returned On</Label>
                    {stateFuelCardAssigneeDetail.assignee_id == 0 &&
                      <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}}  placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="returned_date" className="form-control form-control-sm" onChange={(date) => { setStateFuelCardAssigneeDetail({ ...stateFuelCardAssigneeDetail, returned_date: Convert.ToISODate(date) }) }} selected={Convert.ToDate(stateFuelCardAssigneeDetail.returned_date)} 
                       autoComplete="off" />
                    }
                    {stateFuelCardAssigneeDetail.assignee_id > 0 &&
                      <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}}  placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="returned_date" className="form-control form-control-sm" onChange={(date) => { setStateFuelCardAssigneeDetail({ ...stateFuelCardAssigneeDetail, returned_date: Convert.ToISODate(date) }) }} selected={Convert.ToDate(stateFuelCardAssigneeDetail.returned_date)} required={true} />
                    }
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup className="d-flex justify-content-end mt-3">
                {stateFuelCardAssigneeDetail.assignee_id == 0 && (
                  <Button color="primary" size="sm" className="me-3" type="submit">Save</Button>
                )}
                {stateFuelCardAssigneeDetail.assignee_id > 0 && (
                  <Button color="primary" size="sm" className="me-3" type="submit">Save</Button>
                )}
                <Button size="sm" color="danger" outline={true} onClick={AssignModalClose}>Cancel</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      }

      {stateFuelCardAssigneeDetail &&
        <Modal isOpen={CancelModalOpen} toggle={CancelModalClose}>
          <ModalHeader>
            <h6 className="mb-0 fw-bold">Cancel Assignment</h6>
          </ModalHeader>
          <ModalBody className="square border border-info-rounded">
            <Form  onSubmit={handleCancelCard}>
              <Row>
                <Col lg={12} md={6} sm={12}>
                  <FormGroup>
                    <Label for="cardNumber">Cancel Reason</Label>
                    <Input bsSize="sm" className="form-control" type="textarea" name="cancel_reason" id="cancel_reason" value={stateFuelCardAssigneeDetail.cancel_reason} onChange={handleAssignInputChange("cancel_reason")} 
                    required={true} autoComplete="off" />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup className="d-flex justify-content-end mt-3">
                <Button color="primary" size="sm" className="me-3" type="submit">Save</Button>
                <Button size="sm" color="danger" outline={true} onClick={CancelModalClose}>Cancel</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      }
    </CommonLayOut>
  );
};

export default CreateFuelCardPage;
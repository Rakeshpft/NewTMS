import React, { useEffect, useState } from "react";
import {
  IDriverSchedulePayee,
  TDriverProps,
  initialDriverSchedule,
} from "../../../services/tms-objects/driver.types";
import { HiOutlinePencilAlt } from "react-icons/hi";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { CustomTable } from "../../../features/data-table/CustomTable";
import { AiOutlinePlus } from "react-icons/ai";
import { useDriverContext } from "../../../services/reducer/driver.reducer";
import { RxCross2 } from "react-icons/rx";
import { useListContext } from "../../../services/reducer/list.reducer";
import { toastify } from "../../../features/notification/toastify";
import { isEmpty } from "lodash";
import ReactDatePicker from "react-datepicker";
import { Dictionary, Convert } from "../../../features/shared/helper";
// import SchedulePayemntModal from './schedulePayemntModal'

const SchedulePayment = (props: TDriverProps) => {
  const { driver_id = 0 } = props;

  const {
    getDriverSchedule,
    driverScheduleLists,
    getIndividualSchedulePayee,
    postDriverSchedulePayee,
    deleteDriverSchedule,
  } = useDriverContext();
  
  const {
    getPaymentCategoryList,
    paymentCategoryList,
    getScheduleFrequencyList,
    scheduleFrequencyList,
    getScheduleTypeList,
    scheduleTypeList,
    getScheduleRepeatList,
    scheduleRepeatList,
  } = useListContext();

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [driverSchedulePayee, setDriverSchedulePayee] = useState<IDriverSchedulePayee>(initialDriverSchedule);
  const [driverSchedulePayeeList, setDriverSchedulePayeeList] = useState<IDriverSchedulePayee[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<IDriverSchedulePayee[] | []>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleCheckBox = () => {
    setDriverSchedulePayee({
      ...driverSchedulePayee,
      is_active: !driverSchedulePayee.is_active,
    });
  };

  const UploadModalClose = () => {
    setUploadModalOpen(false);
    setDriverSchedulePayee(initialDriverSchedule);
  };

  useEffect(() => {
    if (  driverScheduleLists) {
      setDriverSchedulePayeeList(driverScheduleLists);
    }
  }, [driverScheduleLists]);


  useEffect( () => {
    if( scheduleTypeList && scheduleTypeList.length>0 && driverSchedulePayee.schedule_type_id == 0) {
      setDriverSchedulePayee({...driverSchedulePayee, schedule_type_id:scheduleTypeList[0].schedule_type_id})
    }
  } , [scheduleTypeList])

  const handleInputSchedulePayeeChange =
    (prop: keyof IDriverSchedulePayee) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDriverSchedulePayee({
        ...driverSchedulePayee,
        [prop]: event.target.value,
      });
    };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedDriver([]);
  };
  

  const handleEditSchedulePayee = (schedule_id: number) => {
    const filteredData = driverScheduleLists?.filter(
      (l) => l.schedule_id == schedule_id
    );
    if (filteredData && filteredData.length > 0) {
      setDriverSchedulePayee(filteredData[0]);
    }
    getIndividualSchedulePayee(driver_id, schedule_id);
    setUploadModalOpen(true);
  };
  const closeBtn = (
    <button
      className="border-0 bg-transparent text-white"
      type="button"
      onClick={() => UploadModalClose()}
    >
      <RxCross2 />
    </button>
  );

  const handleDeleteDriver = async () => {
    const deleteDriverScheduleId = selectedDriver.map(
      (driverId) => driverId.schedule_id
    );

    await deleteDriverSchedule(driver_id, deleteDriverScheduleId).then(
      (response) => {
        response &&
          response.message &&
          toastify({
            message: response.message,
            type: response.success ? "success" : "error",
          });
      }
    );
    closeDeleteModal();
    getDriverSchedule(driver_id);
    setSelectedDriver([]);
  };

  const handleSchedulePayeeSave = async (
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    
    let scheduleDetails :IDriverSchedulePayee  =  driverSchedulePayee ;


   
    
    await postDriverSchedulePayee(driver_id, scheduleDetails).then(
      (response) => {
        response &&
          response.message &&
          toastify({
            message: response.message,
            type: response.success ? "success" : "error",
          });
      }
    );
 
    getDriverSchedule(driver_id);
    setUploadModalOpen(false);
  };

  useEffect(() => {
    if (driver_id > 0) {
      getDriverSchedule(driver_id);
    }

    getPaymentCategoryList();
    getScheduleFrequencyList();
    getScheduleTypeList();
    getScheduleRepeatList();
  }, []);

  const columns: CustomTableColumn[] = [
    {
      id: "payment_category_name",
      name: "CATEGORY",
      style: { width: "10%" },
      sortable: true,
      selector: (row: IDriverSchedulePayee) => row.payment_category_name,
    },
    {
      id: "amount",
      name: "AMOUNT",
      style: { width: "10%" },
      sortable: true,
      selector: (row: IDriverSchedulePayee) => row.amount,
    },
    {
      id: "schedule_frequency_id",
      name: "SCHEDULE",
      style: { width: "10%" },
      sortable: true,
      selector: (row: IDriverSchedulePayee) => row.schedule_frequency_name,
         
    },
    {
      id: "last_date_of_trans",
      name: "LAST",
      style: { width: "10%" },
      sortable: true,
      selector: (row: IDriverSchedulePayee) => row.last_date_of_trans,
      format: (row: IDriverSchedulePayee) =>  Convert.ToUserDate(row.last_date_of_trans)
    },
    {
      id: "last",
      name: "NEXT",
      style: { width: "10%" },
      sortable: true,
      selector: (row: IDriverSchedulePayee) => row.next_date_of_trans,
      
      format: (row: IDriverSchedulePayee) =>  Convert.ToUserDate(row.next_date_of_trans )
    },

    {
      id: "is_active",
      name: "ACTIVE",
      style: { width: "10%" },
      sortable: true,
      selector: (row: IDriverSchedulePayee) => row.is_active,
      format: (row: IDriverSchedulePayee) => (row.is_active ? "YES" : "NO"),
    },
    {
      id: "notes",
      name: "NOTES",
      style: { width: "10%" },
      sortable: true,
      selector: (row: IDriverSchedulePayee) => row.notes,
    },

    {
      id: "action",
      name: "",
      style: { width: "10%" },
      sortable: true,
      selector: (row: IDriverSchedulePayee) => row.driver_id,
      cell: (row: IDriverSchedulePayee) => (
        <HiOutlinePencilAlt
          size={20}
          style={{ cursor: "pointer" }}
          onClick={() => handleEditSchedulePayee(row.schedule_id)}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-end m-3">
        <Col className=" d-flex justify-content-end align-items-end pb-3 column-gap-3">
          {!isEmpty(selectedDriver) && (
            <div className="user-info-btn">
              <Button color="primary" onClick={() => setDeleteModalOpen(true)}>
                Delete
              </Button>
            </div>
          )}
          <label className="page-subtitle mb-0">
            <Button
              color="success"
              outline={true}
              onClick={() => setUploadModalOpen(true)}
            >
              <AiOutlinePlus />
              Add
            </Button>
          </label>
        </Col>
      </div>

      <CustomTable
        columns={columns}
        data={driverSchedulePayeeList}
        noRecordMessage="No Document found."
        canSelectRows={true}
        selectedTableRows={selectedDriver}
        setSelectionTableRows={setSelectedDriver}
      />
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose} size="lg">
        <ModalHeader close={closeBtn} onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">{ driverSchedulePayee.schedule_id > 0 ? "Edit schedule payment/deduction" : "Add schedule payment/deduction"}</h6>
        </ModalHeader>
        <ModalBody className="square border border-info-rounded">
          <Form onSubmit={handleSchedulePayeeSave}>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="name">Schedule Type </Label>
                  <Input bsSize="sm" required  className="form-control form-control-sm" type="select" id="user" name="user" value={driverSchedulePayee.schedule_type_id} onChange={handleInputSchedulePayeeChange( "schedule_type_id" )} >
                   <option value={0}> Select Schedule Type</option> 
                    {scheduleTypeList && scheduleTypeList.map((item) => (
                       <option  key={item.schedule_type_id}  value={item.schedule_type_id} >{item.schedule_type_name} </option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="name">Category</Label>
                  <Input bsSize="sm" required className="form-control form-control-sm" type="select" id="user" name="user"  value={driverSchedulePayee.payment_category_id} onChange={handleInputSchedulePayeeChange("payment_category_id")} >
                   <option value={0}> Select Category </option>
                    {paymentCategoryList && paymentCategoryList.length > 0 && paymentCategoryList.map((item ) => ( 
                    <option key={item.payment_category_id}   value={item.payment_category_id}> {item.payment_category_name} </option> ))}   
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="amount">Amount</Label>
                  <Input bsSize="sm" required className="form-control form-control-sm" type="text" id="amount" name="amount" value={driverSchedulePayee.amount}  onChange={handleInputSchedulePayeeChange("amount")} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="name">Schedule</Label>
                  <Input bsSize="sm" required  className="form-control form-control-sm" type="select" id="user"  name="user"    value={driverSchedulePayee.schedule_frequency_id} onChange={handleInputSchedulePayeeChange( "schedule_frequency_id" )} >
                    <option value={0}> Select Schedule </option>
                    {scheduleFrequencyList && scheduleFrequencyList.length > 0 &&  scheduleFrequencyList.map((item) => (  
                    <option key={item.schedule_frequency_id} value={item.schedule_frequency_id} >{item.schedule_frequency_name} </option>  ))}  
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="schedule">Schedule Date </Label>
                  <ReactDatePicker required showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="purchase_date" className="form-control form-control-sm" onChange={(date)=>{setDriverSchedulePayee({...driverSchedulePayee, start_date: Convert.ToISODate(date) })}} selected={Convert.ToDate(driverSchedulePayee.start_date)} ></ReactDatePicker>
                </FormGroup>
              </Col>
              <Col md={4}>
                <Label for="Active">Active</Label>
                <FormGroup switch>
                     <Input type="switch" checked={driverSchedulePayee.is_active} onChange={handleCheckBox} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="name">Repeat</Label>
                  <Input bsSize="sm" required  className="form-control form-control-sm"  type="select"  id="user"  name="user" value={driverSchedulePayee.schedule_repeat_id} onChange={handleInputSchedulePayeeChange("schedule_repeat_id")} >
                    <option value={0}> Select Repeat</option>
                    {scheduleRepeatList &&  scheduleRepeatList.length > 0 &&  scheduleRepeatList.map((item) => (
                         <option key={item.schedule_repeat_id} value={item.schedule_repeat_id} > {item.schedule_repeat_name} </option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
              {driverSchedulePayee.schedule_repeat_id == 2 && (
                <Col md={4}>
                  <FormGroup>
                    <Label for="amount">No of Times</Label>
                    <Input bsSize="sm" className="form-control form-control-sm" type="text" id="amount" name="amount" value={driverSchedulePayee.number_of_times} onChange={handleInputSchedulePayeeChange("number_of_times")}/>
                  </FormGroup>
                </Col>
              )}
              {driverSchedulePayee.schedule_repeat_id == 3 && (
                <Col md={4}>
                <FormGroup>
                  <Label for="schedule">Schedule Date </Label>
                  <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="purchase_date" className="form-control form-control-sm" onChange={(date)=>{setDriverSchedulePayee({...driverSchedulePayee, end_date: Convert.ToISODate(date) })}} selected={Convert.ToDate(driverSchedulePayee.end_date)} />
                </FormGroup>
              </Col>
              )}
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="notes">Notes</Label>
                  <Input bsSize="sm" className="form-control form-control-sm" type="textarea" id="notes" name="notes"  value={driverSchedulePayee.notes} onChange={handleInputSchedulePayeeChange("notes")}/>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
              <Button
                color="primary"
                className="px-4 mr-3 shadow save-button"
                type="submit"
              >
                Save
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader>
          <h6 className="mb-0 fw-bold">Delete </h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            {!isEmpty(selectedDriver) && (
               <div className=" dle my-3 ">                      
              {selectedDriver.length > 1?(<div>You have selected {selectedDriver.length} schedules.<br /></div>):null}
                 Are you sure you want to delete?
             </div>
            )}
            <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
              <Button
                color="primary"
                className="px-4 mr-3 shadow save-button  "
                onClick={() => closeDeleteModal()}
              >
                Cancel
              </Button>

              <Button
                color="primary"
                className="px-4  shadow save-button "
                onClick={() => handleDeleteDriver()}
              >
                Delete
              </Button>
            </FormGroup>
          </Container>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SchedulePayment;

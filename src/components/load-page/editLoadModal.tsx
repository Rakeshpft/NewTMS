import React, { useState } from "react";
// import { BiCheck } from "react-icons/bi";
// import { RxCross2 } from "react-icons/rx";
// import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  TabPane,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import { GenericTable } from "../table";
import TabPage from "../driver-page/tab-page";
import EditLumperModal from "./editLoadModal/editLumperModal";
import EditNewDetentionModal from "./editLoadModal/editNewDetentionModal";
import EditAddDeductModal from "./editLoadModal/editAddDeductModal";
import MapPage from "./map-page/mapPage";
import AddStopModal from "./editLoadModal/addNewStop";
import AddEditEmail from "./editLoadModal/addEmail";
import UpLoadConfirmation from "./editLoadModal/upLoadConfirmation";
//  import EditLumperModal from "./editLoadModal/editLumperModal";

const columns = ["#", "CREATED ON", "CREATED BY", "NOTES"];
const column = ["#", "Date", "Description", "AUTHOR"];
const data = [{
  "#" : 1,
  'Date': "07/14/23",
  'Description': "Lumper: $50.00 ",
  'AUTHOR': " "
}
]
const Tabledata = [
  {
    "#": 1,
    "CREATED ON": "07/14/23",
    "CREATED BY": "Shyam payne ",
    NOTES: "Lumper: $50.00 ",
  },
];

interface EditLoadModalProps {
  isOpen: boolean;
  toggle: () => void;
}
const EditLoadModal = ({ isOpen, toggle }: EditLoadModalProps) => {
  const [editLoad, setEditLoad] = useState(false);

  const [editLumper, setEditLumper] = useState(false);
  const [editDetention, setEditDetention] = useState(false);
  const [editAddDeductModal, setEditAddDeductModal] = useState(false);
  const [newStop, setNewStop] = useState(false);
  const [addEmail, setAddEmail] = useState(false);
  const [uploadConfirmation , setUploadConfirmation] = useState(false);

  const handleEditLoad = () => {
    setEditLoad(true);
  };
  const handleNewStop = () => {
    setNewStop(true);
  };
  const handleCancelEditLoad = () => {
    setEditLoad(false);
  };

  const handleEditLumper = () => {
    setEditLumper(true);
  };
  const handleUploadConfirmation = () => {
    setUploadConfirmation(true);
  }
  const handleEditDetention = () => {
    setEditDetention(true);
  };
  const handleEditAddDeduct = () => {
    setEditAddDeductModal(true);
  };
  const handleEditAddEmail = () => {
    setAddEmail(true);
  };

  return (
    <Modal isOpen={isOpen} toggle={() => toggle()} className="py-2" size="xl">
      <ModalHeader className="py-2" toggle={() => toggle()}>
        <h6 className="mb-0 fw-bold"> Edit Load </h6>
      </ModalHeader>
      <ModalBody>
        <Container>
          <Row>
            <Col md={9}>
              <div>
                <div className="d-flex flex-direction-row ">
                  <div>
                    <Button
                      color="success"
                      outline
                      size="sm"
                      className=" mx-1  "
                      onClick={handleNewStop}
                    >
                      View Map On Google
                    </Button>
                  </div>

                  <div>
                    <Button
                      size="sm"
                      className="cancel-button mx-1 "
                      onClick={handleNewStop}
                    >
                      Add Stop
                    </Button>
                  </div>
                  <div>
                    <Button
                      size="sm"
                      className="edit-button mx-1 "
                      onClick={handleEditAddEmail}
                    >
                      Email Delivery Stats
                    </Button>
                  </div>
                </div>
                <div className="my-2">
                  <MapPage />
                </div>
              </div>

              {/* <hr />   Horizontal line */}
              <div>
                <div className="d-flex justify-content-between">
                  <h6 className="fw-bold">Notes</h6>
                  <Button
                    size="sm"
                    className="edit-button"
                    //   onClick={handleEditLoad}
                  >
                    Add Note
                  </Button>
                </div>
                <GenericTable
                  tableData={Tabledata}
                  tableHeaders={columns}
                  defaultSortColumn="Load"
                  canEditRow={false}
                  editRow={handleEditLoad}
                />
              </div>

              <div>
                <TabPage
                  tabTitles={["Services", "Documents", "Billing", "History"]}
                >
                  <TabPane tabId={1}>
                    <Row className="mt-3 px-4">
                      <div className="d-flex justify-content-end">
                        <Button
                          size="sm"
                          className="edit-button "
                          onClick={handleEditLumper}
                        >
                          New Lumper
                        </Button>
                        <Button
                          size="sm"
                          className="edit-button px-1 mx-1"
                          onClick={handleEditDetention}
                        >
                          New Detention
                        </Button>
                        <Button
                          size="sm"
                          className="edit-button"
                          onClick={handleEditAddDeduct}
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
                          onClick={handleUploadConfirmation}
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
                    <GenericTable
                  tableData={data}
                  tableHeaders={column}
                  defaultSortColumn="Load"
                  canEditRow={false}
                  editRow={handleEditLoad}
                />
                      </Row>
                  </TabPane>
                </TabPage>
              </div>
            </Col>

            <Col md={3}>
              <div>
                <div className="d-flex justify-content-end">
                  {editLoad && (
                    <>
                      <div>
                        <Button
                          size="sm"
                          className="edit-button mx-3 "
                          onClick={handleCancelEditLoad}
                        >
                          Cancel
                        </Button>
                      </div>
                      <div>
                        <Button
                          size="sm"
                          className="edit-button"
                          //    onClick={""}
                        >
                          Update
                        </Button>
                      </div>
                    </>
                  )}
                  {!editLoad && (
                    <Button
                      size="sm"
                      className="edit-button"
                      onClick={handleEditLoad}
                    >
                      Edit Details
                    </Button>
                  )}
                </div>
                <div>
                  <Form>
                    <div>
                      <h6 className="fw-bold"> Load </h6>
                      <hr className="mt-0 mb-2" />

                      {!editLoad ? (
                        <>
                          <div className="d-flex flex-direction-row justify-content-between my-1 editText">
                            <span className="edit-load-color"> Status </span>
                            <div> Delivered</div>
                          </div>
                          <div className="d-flex flex-direction-row justify-content-between mb-2 editText">
                            <span className="edit-load-color">
                              Billing Status
                            </span>
                            <div> Paid </div>
                          </div>
                          <div className="d-flex flex-direction-row justify-content-between mb-2 editText">
                            <span className="edit-load-color">
                              Actual Delivery Date
                            </span>
                            <div> 01/01/14</div>
                          </div>
                          <div className="d-flex flex-direction-row justify-content-between mb-2 editText">
                            <span className="edit-load-color mb-3">
                              Dispatcher
                            </span>
                            <div> Jhon Smith </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <InputGroup className="mb-1 update-text " size="sm">
                            <InputGroupText>Status</InputGroupText>
                            <Input
                              type="select"
                              name="status"
                              value={status}
                              onChange={(e) => e.target.value}
                            >
                              <option value="">Select Status</option>
                            </Input>
                          </InputGroup>
                          <InputGroup className="mb-1 update-text" size="sm">
                            <InputGroupText>Billing Status</InputGroupText>
                            <Input
                              type="select"
                              name="status"
                              value={status}
                              onChange={(e) => e.target.value}
                            >
                              <option value="">Select Billing Status</option>
                            </Input>
                          </InputGroup>
                          <InputGroup className="my-3 update-text" size="sm">
                            <InputGroupText>
                              Actual Delivery Date
                            </InputGroupText>
                            <Input
                              type="select"
                              name="status"
                              value={status}
                              onChange={(e) => e.target.value}
                            >
                              <option value="">Select Date</option>
                            </Input>
                          </InputGroup>
                          <InputGroup className="my-3 update-text" size="sm">
                            <InputGroupText> Dispatcher</InputGroupText>
                            <Input
                              type="select"
                              name="status"
                              value={status}
                              onChange={(e) => e.target.value}
                            >
                              <option value="">Select Dispatcher</option>
                            </Input>
                          </InputGroup>
                        </>
                      )}
                    </div>
                    <div>
                      <h6 className="fw-bold"> Trip Info </h6>
                      <hr className="mt-0 mb-0" />

                      <>
                        <div className="d-flex flex-direction-row justify-content-between my-1 editText">
                          <span className="edit-load-color"> Total Trip </span>
                          <div className="edit-load-color"> 290mi</div>
                        </div>
                        <div className="d-flex flex-direction-row justify-content-between mb-1 editText">
                          <span className="edit-load-color"> Loaded </span>
                          <div> 290mi</div>
                        </div>
                        <div className="d-flex flex-direction-row justify-content-between mb-1 editText">
                          <span className="edit-load-color"> Empty </span>
                          <div> 0mi </div>
                        </div>
                        <div className="d-flex flex-direction-row justify-content-between mb-1 editText">
                          <span className="edit-load-color mb-3">
                            Rate Per mile
                          </span>
                          <div> 3.45</div>
                        </div>
                      </>
                    </div>
                    <div>
                      <h6 className="fw-bold"> Broker </h6>
                      <hr className="mt-0 mb-0" />
                      {!editLoad ? (
                        <>
                          <div className="d-flex flex-direction-row justify-content-between my-1 editText">
                            <span className="edit-load-color">Name </span>
                            <div className="edit-load-color">
                              SELECT WAY INC
                            </div>
                          </div>
                          <div className="d-flex flex-direction-row justify-content-between mb-1 editText">
                            <span className="edit-load-color"> PO </span>
                            <div> 676487 </div>
                          </div>

                          <div className="d-flex flex-direction-row justify-content-between mb-1 editText">
                            <span className="edit-load-color mb-3"> Rate </span>
                            <div> $ 1000.o </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <InputGroup className="my-3 update-text" size="sm">
                            <InputGroupText>Name</InputGroupText>
                            <Input
                              type="select"
                              name="name"
                              value={status}
                              onChange={(e) => e.target.value}
                            >
                              <option value="">Select Name</option>
                            </Input>
                          </InputGroup>
                          <InputGroup className="my-3 update-text" size="sm">
                            <InputGroupText>PO</InputGroupText>
                            <Input
                              type="select"
                              name="po"
                              value={status}
                              onChange={(e) => e.target.value}
                            >
                              <option value="">Select PO</option>
                            </Input>
                          </InputGroup>
                          <InputGroup className="my-3 update-text" size="sm">
                            <InputGroupText>Rate</InputGroupText>
                            <Input
                              type="select"
                              name="rate"
                              value={status}
                              onChange={(e) => e.target.value}
                            >
                              <option value="">Select Status</option>
                            </Input>
                          </InputGroup>
                        </>
                      )}
                    </div>
                    <div>
                      <h6 className="fw-bold"> Driver </h6>
                      <hr className="mt-0 mb-0 " />
                      {!editLoad ? (
                        <>
                          <div className="d-flex flex-direction-row justify-content-between my-1 editText">
                            <span className="edit-load-color">Driver </span>
                            <div className="edit-load-color"> Jack Dorsey </div>
                          </div>
                          <div className="d-flex flex-direction-row justify-content-between my-1 editText">
                            <span className="edit-load-color">Co-Driver </span>
                            <div className="edit-load-color">Jack Sparrow</div>
                          </div>
                          <div className="d-flex flex-direction-row justify-content-between mb-1 editText">
                            <span className="edit-load-color">Truck</span>
                            <div> Auto Carrier </div>
                          </div>
                          <div className="d-flex flex-direction-row justify-content-between mb-1 editText">
                            <span className="edit-load-color">Truck</span>
                            <div> Auto Carrier </div>
                          </div>

                          <div className="d-flex flex-direction-row justify-content-between mb-1 editText">
                            <span className="edit-load-color mb-3">
                              Equiment Owner
                            </span>
                            <div> Jack Reacher </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <InputGroup className="my-3 update-text" size="sm">
                            <InputGroupText>Driver</InputGroupText>
                            <Input
                              type="select"
                              name="driver"
                              value={status}
                              onChange={(e) => e.target.value}
                            >
                              <option value="">Select Name</option>
                            </Input>
                          </InputGroup>
                          <InputGroup className="my-3 update-text" size="sm">
                            <InputGroupText>Co-Driver</InputGroupText>
                            <Input
                              type="select"
                              name="name"
                              value={status}
                              onChange={(e) => e.target.value}
                            >
                              <option value="">Select Name</option>
                            </Input>
                          </InputGroup>
                          <InputGroup className="my-3 update-text" size="sm">
                            <InputGroupText>Truck</InputGroupText>
                            <Input
                              type="select"
                              name="name"
                              value={status}
                              onChange={(e) => e.target.value}
                            >
                              <option value="">Select Name</option>
                            </Input>
                          </InputGroup>
                          <InputGroup className="my-3 update-text" size="sm">
                            <InputGroupText>Trailer</InputGroupText>
                            <Input
                              type="select"
                              name="name"
                              value={status}
                              onChange={(e) => e.target.value}
                            >
                              <option value="">Select Name</option>
                            </Input>
                          </InputGroup>
                          <InputGroup className="my-3 update-text" size="sm">
                            <InputGroupText>Equipment Owner</InputGroupText>
                            <Input
                              type="select"
                              name="name"
                              value={status}
                              onChange={(e) => e.target.value}
                            >
                              <option value="">Select Name</option>
                            </Input>
                          </InputGroup>
                        </>
                      )}
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
            <EditLumperModal
              isOpen={editLumper}
              toggle={() => setEditLumper(false)}
            />
            <EditNewDetentionModal
              isOpen={editDetention}
              toggle={() => setEditDetention(false)}
            />
            <EditAddDeductModal
              isOpen={editAddDeductModal}
              toggle={() => setEditAddDeductModal(false)}
            />
            <AddStopModal isOpen={newStop} toggle={() => setNewStop(false)} />
            <AddEditEmail isOpen={addEmail} toggle={() => setAddEmail(false)} />
            <UpLoadConfirmation isOpen={uploadConfirmation} toggle={() => setUploadConfirmation(false)} />
          </Row>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default EditLoadModal;

import React, { useEffect, useState } from "react";
import {
  ILoadNotesObject,
  ILoadProps,
  loadNotesInitialState,
} from "../../services/tms-objects/load.type";
import { useLoadContext } from "../../services/reducer/load.reducer";
import { CustomTable } from "../../features/data-table/CustomTable";
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { toastify } from "../../features/notification/toastify";
import { Convert } from "../../features/shared/helper";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { isEmpty } from "lodash";

const Notes = (props: ILoadProps) => {

  const { load_id = 0 } = props;

  const { getLoadNotes, loadNotesList ,postNotesData , deleteLoadNotes  } = useLoadContext();

  const [notes , setNotes] = useState<ILoadNotesObject>(loadNotesInitialState)
  const [notesList, setNotesList] = useState<ILoadNotesObject[]>([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<ILoadNotesObject[] | []>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  



  useEffect(() => {
    if (loadNotesList) {
      setNotesList(loadNotesList);
    }
  }, [loadNotesList]);

  useEffect(() => {
    if (load_id > 0) {
      getLoadNotes(load_id);
    }
  } , []);

  
 
  const handleEditLoadNotes = ( id: number) => {
    if(id > 0){
      const filteredData =  notesList?.filter(l=>l.note_id == id)
      if (filteredData && filteredData.length>0) {      
        setNotes(filteredData[0])
      }
    }
    else{
      setNotes(loadNotesInitialState);
    }
    setUploadModalOpen(true);

  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedNotes([]);
  };

  const UploadModalClose = () => {
    setUploadModalOpen(false);
  }

  const closeBtn = (
    <button className="border-0 bg-transparent text-white" type="button" onClick={() => UploadModalClose()}>
      <RxCross2 />
    </button>
  );

  const handleNotesInput = ( props : keyof ILoadNotesObject) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotes({...notes , [props] : event.target.value})
  }

  const handleNotesSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    await postNotesData(load_id , notes)?.then((res) => {
      res && toastify({ message: res.message,  type: (res.success ? "success" : "error") });    
    });

    getLoadNotes(load_id);
    UploadModalClose();
    
  }

  const handleNotesCheckBox = () => {
    setNotes({ ...notes, is_important: !notes.is_important });
  };

  const handleDeleteNotes = async () => {    
    const  deleteNotesId  = selectedNotes.map(notesId => notesId.note_id)
   await  deleteLoadNotes( load_id , deleteNotesId).then((response) => {
    response &&  response.message && toastify({ message: response.message, type: (response.success ? "success" : "error") })
   })

    closeDeleteModal();
    getLoadNotes(load_id);
    setSelectedNotes([]);
  }



  const columns: CustomTableColumn[] = [

    {
      id: "created_date",
      name: "CREATED ON",
      style: { width: "20%" },
      sortable:true,
      selector: (row:ILoadNotesObject ) => row.created_date,
      format: (row: ILoadNotesObject) =>  Convert.ToUserDate(row.created_date),
    },
    {
      id: "created_by_name",
      name: "CREATED BY",
      style: { width: "20%" },
      sortable: true,
      selector: (row: ILoadNotesObject) => row.created_by_name,
    },
    {
      id: "note",
      name: "NOTES",
      style: { width: "20%" },
      sortable: true,
      selector: (row: ILoadNotesObject) => row.note,
    },
    {
      id: "action",
      name: "",
      style: { width: "5%" },
      selector: (row: ILoadNotesObject) => row.note_id,
      cell: (row: ILoadNotesObject ) => 
        <>
        <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditLoadNotes(row.note_id) }} />
      </>
    },

  ];

  return (
    <>
    
    <div className="d-flex justify-content-end m-3">
        <Col md={3} className=" d-flex justify-content-end align-items-end pb-3 column-gap-3" >
        {!isEmpty(selectedNotes) && (
                  <div className="user-info-btn">
                    <Button color="primary" onClick={() => setDeleteModalOpen(true)}>Delete</Button>
                  </div>
                )}
          <label className="page-subtitle mb-0" >
            <Button color="success"  outline={true}  onClick={() => setUploadModalOpen(true)}><AiOutlinePlus />Add</Button>
          </label>
        </Col>
      </div>
   
      <CustomTable columns={columns} data={notesList} noRecordMessage="No Notes Added." canSelectRows={true} setSelectionTableRows={setSelectedNotes} selectedTableRows={selectedNotes} />
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
         
      <ModalHeader close={closeBtn}
                 onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">{ notes.note_id > 0 ? "Edit Notes" : "Add Notes"} </h6>
        </ModalHeader>
        <ModalBody className="square border border-info-rounded">
       
       <Form onSubmit={handleNotesSubmit}>
     
       <Row>
        <Col md={12}>
          <FormGroup>
          <Label for="notes">Notes</Label>
          <Input bsSize="sm" className="form-control form-control-sm"  type="textarea" id="notes" name="notes"  value={notes.note} onChange={handleNotesInput('note')} required />
          </FormGroup>
        </Col>
        
       </Row>

       <Row>
        <Col md={6}>
        <Label for="Active">Important</Label>
                  <FormGroup switch>
                    <Input type="switch" checked={ notes.is_important} onChange= {handleNotesCheckBox}  />
                  </FormGroup>
        </Col>
       </Row>
       
       <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
              <Button color="primary" className="px-4 mr-3 shadow save-button" type="submit">Save</Button>
            </FormGroup>
       </Form>

        </ModalBody>
      </Modal>

      <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
              <ModalHeader>
                <h6 className="mb-0 fw-bold"> Delete </h6>
              </ModalHeader>
              <ModalBody>
                <Container>
                  {!isEmpty(selectedNotes) && (
                    <div className=" dle my-3 ">                      
                      {selectedNotes.length > 1?(<div>You have selected {selectedNotes.length} notes.<br /></div>):null}
                        Are you sure you want to delete?
                    </div>
                  )}
                  <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
                    <Button
                      color="primary"
                      className="px-4 mr-3 shadow save-button "
                      onClick={() => closeDeleteModal()}
                    >
                      Cancel
                    </Button>

                    <Button
                      color="primary"
                      className="px-4  shadow save-button "
                      onClick={() => handleDeleteNotes()}
                    >
                      Delete
                    </Button>
                  </FormGroup>
                </Container>
              </ModalBody>
            </Modal>

    </>
  );
};

export default Notes;

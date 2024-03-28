import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import {Button, Col, Container, FormGroup, Modal, ModalBody, ModalHeader } from 'reactstrap'

const CustomerDocuments = () => {

    const [uploadModalOpen, setUploadModalOpen] = useState(false)

    const UploadModalClose = () => {
        setUploadModalOpen(false);
      }

    const handleFileUpload = ()=>{}
    
  return (
    <>
    <div className="d-flex justify-content-end m-3">
          <Col
            md={3}
            className=" d-flex justify-content-end align-items-end pb-3"
          >
           
      <label className="page-subtitle">
      <Button color="success" onClick={() => setUploadModalOpen(true)}><AiOutlinePlus />Upload</Button>
      </label>
            
          </Col>
          </div>
          <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
              <ModalHeader>
                <h6 className="mb-0 fw-bold"> Delete </h6>
              </ModalHeader>
              <ModalBody>
                <Container>
                  <input type="file" />
                  <button type="submit"
                  onClick={handleFileUpload}
                  >Upload</button>
                  
                  <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
                    
                  </FormGroup>
                </Container>
              </ModalBody>
            </Modal>
          </>
  )
}

export default CustomerDocuments
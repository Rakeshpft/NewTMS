import React, { useEffect } from 'react'

import { Modal, ModalHeader, ModalBody, Row, Col, FormGroup, Input, Label, Button , Form } from 'reactstrap'
import { ILoadServices } from '../../services/tms-objects/load.type'
import { useListContext } from '../../services/reducer/list.reducer'

interface INewChargeProps {
    modalOpen: boolean
    modalClose: () => void
    closeBtn: JSX.Element
    serviceData : ILoadServices
    handleSaveNewCharge : (event: React.FormEvent<HTMLFormElement>) => void
    handleInputChange : (prop : keyof ILoadServices) => (event: React.ChangeEvent<HTMLInputElement>) => void
    handleNewChargeFileChange : (event: React.ChangeEvent<HTMLInputElement>) => void
}
const LoadServicesNewCharge = ( {   modalOpen, modalClose, closeBtn , handleSaveNewCharge , serviceData, handleInputChange ,handleNewChargeFileChange }: INewChargeProps) => {

  const { getPaymentCategoryList, paymentCategoryList } = useListContext(); 

  useEffect(() => {
    getPaymentCategoryList()
  } ,[])

 

  return (
    <div>
      <Modal isOpen={modalOpen} onClose={modalClose}>
        <ModalHeader close={closeBtn} onClose={() => modalClose()}>
          <h6 className="mb-0 fw-bold"> New Charge </h6>
        </ModalHeader>
        <ModalBody className="square border border-info-rounded">
          <Form onSubmit={handleSaveNewCharge}>
            <Row>
              <Row>
                <Col lg={12}>Type</Col>
              </Row>
              <Row>
                <Col md={3}>
                  <Input name="radio2" type="radio" checked={serviceData.service_type_id == 1} value={1} onChange={handleInputChange("service_type_id")}/>
                  <Label for="notes">Addition</Label>
                </Col>
                <Col md={4}>
                  <Input name="radio2" type="radio" checked={serviceData.service_type_id == 2} value={2} onChange={handleInputChange("service_type_id")} />
                  <Label for="notes">Deduction</Label>
                </Col>
              </Row>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="deliveryZip">Category </Label>
                  <Input id="deliveryZip" name="deliveryZip" bsSize="sm" type="select" className="form-control form-control-sm" value={serviceData.payment_category_id} onChange={handleInputChange("payment_category_id")}>
                    {paymentCategoryList &&
                      paymentCategoryList.length > 0 &&
                      paymentCategoryList.map((item) => (
                        <option key={item.payment_category_id} value={item.payment_category_id}>
                          {item.payment_category_name}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="deliveryZip">Amount</Label>
                  <Input id="deliveryZip" name="deliveryZip" bsSize="sm" type="text" className="form-control form-control-sm" value={serviceData.amount} onChange={handleInputChange("amount")} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="deliveryZip">Stop </Label>
                  <Input id="deliveryZip" name="deliveryZip" bsSize="sm" type="select" className="form-control form-control-sm" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Upload Charge Document </Label>
                  <Input id="file" name="file" bsSize="sm" type="file" className="form-control form-control-sm" onChange={handleNewChargeFileChange} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="deliveryZip">Notes</Label>
                  <Input id="deliveryZip" name="deliveryZip" bsSize="sm" type="textarea" className="form-control form-control-sm" value={serviceData.notes} onChange={handleInputChange("notes")} />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
              <Button color="primary" className="px-4 mr-3 shadow save-button" type='submit'>
                Save
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default LoadServicesNewCharge
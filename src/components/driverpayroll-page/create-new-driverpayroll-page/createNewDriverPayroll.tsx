import React, { useContext, useEffect, useState } from 'react'
import CommonLayOut from '../../../layout'
import { Button, Col, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import { ISettlementObject, ISettlementPayment, ISettlementTransaction, initialSettlementObject, initialSettlementPayment, initialSettlementTransaction } from '../../../services/tms-objects/driverPayroll.types'
import { CustomTable } from '../../../features/data-table/CustomTable'
import { useListContext } from '../../../services/reducer/list.reducer'
import { useDriverPayrollContext } from '../../../services/reducer/driverPayroll.reducer'
import ReactDatePicker from 'react-datepicker'
import { Dictionary, Convert } from '../../../features/shared/helper'
import { toastify } from '../../../features/notification/toastify'
import { LoadingContext } from '../../../services/context/loading.context'
//import { FaTrash } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../routes/routes'
import { Validate } from '../../../features/shared/validate'


export type IDriverPayrollProps = {
  settlement_id?: number,
  handleSubmit?: (obj: any) => void
}

const CreateNewDriverPayroll = (prop: IDriverPayrollProps) => {
  const {
    settlement_id = 0
  } = prop;

  const { getDriverList, driverList, getPaymentMethodList, paymentMethodList, } = useListContext();
  const { saveSettlement, savePayment, getSettlementDetail, settlementDetail } = useDriverPayrollContext();
  const { setLoader } = useContext(LoadingContext);
  const [stateSettlementDetail, setStateSettlementDetail] = useState<ISettlementObject>(initialSettlementObject);
  const [screen, setscreen] = useState(1);
  const [footerData, setFooterData] = useState<ISettlementTransaction[] | []>([]);
  const [selectedTransactions, setSelectedTransactions] = useState<ISettlementTransaction[]>([]);
  const [stateSettlementPaymentDetail, setStateSettlementPaymentDetail] = useState<ISettlementPayment>(initialSettlementPayment);
  const navigate = useNavigate();

  useEffect(() => {
    getDriverList();
    getPaymentMethodList();
  }, []);

  useEffect(() => {
    if (settlement_id > 0) {
      getSettlementDetail(stateSettlementDetail.driver_id, settlement_id);
    }
    else {
      setStateSettlementDetail(initialSettlementObject);
    }
    setSelectedTransactions([]);
  }, [settlement_id]);

  useEffect(() => {
    if (settlementDetail && (settlement_id>0 || stateSettlementDetail.driver_id>0)) {
      const newSettlementDetail = { ...settlementDetail }
      const selectedDriver = driverList?.find((driver) => driver.driver_id == settlementDetail.driver_id);
      let vendor_id = 0, vendor_name = "";
      if (selectedDriver) { vendor_id = selectedDriver.vendor_id; vendor_name = selectedDriver.vendor_name; }
      newSettlementDetail.vendor_id = vendor_id;
      newSettlementDetail.vendor_name = vendor_name;
      setStateSettlementDetail(newSettlementDetail);
      setSelectedTransactions(newSettlementDetail.settled_transactions);
    }
  }, [settlementDetail])

  const handleNextPage = () => {
    if (screen === 1) {
      if (selectedTransactions.length == 0) {
        toastify({ message: "No transaction selected for settlement.", type: "error" });
      }
      else if (selectedTransactions.map(l => l.amount).reduce((sum, amount) => sum + amount, 0) <= 0) {
        toastify({ message: "Settlement amount must be greater than 0.", type: "error" });
      }
      else if (stateSettlementDetail.payment_status_id > 0) {
        setscreen(2);
      }
      else {
        const payload = { driver_id: stateSettlementDetail.driver_id, transaction_ids: selectedTransactions.map((item) => item.transaction_id) };
        setLoader(true);
        saveSettlement(settlement_id, payload).then((response) => {
          if (response) {
            toastify({ message: response.message, type: (response.success ? "success" : "error") });
            if (response.success) {
              setscreen(2);
              setStateSettlementDetail({ ...stateSettlementDetail, settlement_id: response.value });
              getSettlementDetail(stateSettlementDetail.driver_id, response.value);
              navigate(`${routes.createNewDriverPayRoll}/${response.value}`);
              setLoader(false);
            }
            else { setLoader(false); }
          }
          else { setLoader(false); }
        });
      }
    }
    else {
      setStateSettlementPaymentDetail({ ...stateSettlementPaymentDetail, amount: (stateSettlementDetail.total_amount - stateSettlementDetail.paid_amount) })
      setscreen(3);
    }
  };

  const handleBackPage = () => {
    setscreen((prevScreen) => (prevScreen === 3 ? 2 : 1));
  };

  const handleInputChange = (prop: keyof ISettlementPayment) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateSettlementPaymentDetail(({ ...stateSettlementPaymentDetail, [prop]: event.target.value }));
  };

  const handleDriverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const selectedDriverId = parseInt(event.target.value);
    if (settlement_id == 0) {
      setStateSettlementDetail({...stateSettlementDetail, driver_id:selectedDriverId});
      if(selectedDriverId>0){
        getSettlementDetail(selectedDriverId, settlement_id);
      }
      else{
        setStateSettlementDetail(initialSettlementObject);
      }
      setSelectedTransactions([]);
    }
  };

  useEffect(() => {
    const footerObject: ISettlementTransaction = initialSettlementTransaction;
    footerObject.transaction_type_name = "Settlement Amount";
    footerObject.amount = selectedTransactions.length > 0 ? selectedTransactions.map(l => l.amount).reduce((sum, amount) => sum + amount, 0) : 0;
    setFooterData([footerObject]);
  }, [selectedTransactions]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, item: ISettlementTransaction) => {
    if (stateSettlementDetail.payment_status_id > 0) {
      toastify({ message: "Payment has been done for this settlement. You can not modify this settlement.", type: "error" });
      event.preventDefault();
    }
    else {
      setSelectedTransactions(prevSelectedTransactions =>
        event.target.checked
          ? [...prevSelectedTransactions, item]
          : prevSelectedTransactions.filter(selectedItem => selectedItem !== item)
      );
    }
  };
  // const handleDeleteTransaction = (item: ISettlementTransaction) => {
  //   console.log(item.transaction_id);
  // };
  const handleSubmitDriverPayroll = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(JSON.stringify(stateSettlementPaymentDetail));
    if (stateSettlementPaymentDetail.amount > (stateSettlementDetail.total_amount - stateSettlementDetail.paid_amount)) {
      toastify({ message: "Payment amount can not be more than balance amount.", type: "error" });
    }
    else {
      setLoader(true);
      await savePayment(stateSettlementDetail.settlement_id, stateSettlementPaymentDetail).then((response) => {
        if (response) {
          toastify({ message: response.message, type: (response.success ? "success" : "error") });
          if (response.success) {
            setLoader(false);
            getSettlementDetail(stateSettlementDetail.driver_id, stateSettlementDetail.settlement_id);
          }
          else { setLoader(false); }
        }
        else { setLoader(false); }
      });
    }
  };

  const paymentTableColumns: CustomTableColumn[] = [
    {
      id: 'payment_date',
      name: 'PAYMENT DATE',
      style: { width: '20%' },
      sortable: true,
      selector: (row: ISettlementPayment) => row.payment_date,
      format:(row:ISettlementPayment) => Convert.ToUserDate(row.payment_date)
    },
    {
      id: 'payment_amount',
      name: 'PAYMENT AMOUNT',
      style: { width: '15%' },
      sortable: true,
      selector: (row: ISettlementPayment) => row.amount,
      format:(row:ISettlementPayment)=> Convert.ToUserAmount(row.amount)
    },

    {
      id: "payment_method",
      name: "PAYMENT METHOD",
      style: { width: "15%" },
      sortable: true,
      selector: (row: ISettlementPayment) => row.payment_method_name,
    },
    {
      id: "transaction_number",
      name: "TXN/CHQ NO.",
      style: { width: "20%" },
      sortable: true,
      selector: (row: ISettlementPayment) => row.transaction_number,
    },
    {
      id: "notes",
      name: "NOTES",
      style: { width: "30%" },
      sortable: true,
      selector: (row: ISettlementPayment) => row.notes,
    },
  ]

  const pendingTableColumns: CustomTableColumn[] = [
    {
      id: 'description',
      name: 'DESCRIPTION / NOTES',
      style: { width: '45%' },
      sortable: true,
      selector: (row: ISettlementTransaction) => row.description,
      footCell: () => { }
    },
    {
      id: 'transaction_type_name',
      name: 'CATEGORY',
      style: { width: '25%' },
      sortable: true,
      selector: (row: ISettlementTransaction) => row.transaction_type_name,
      footCell: (row: ISettlementTransaction) => row.transaction_type_name,
    },

    {
      id: "amount",
      name: "AMOUNT",
      style: { width: "20%" },
      sortable: true,
      align: 'right',
      selector: (row: ISettlementTransaction) => row.amount,
      format:(row:ISettlementTransaction)=> Convert.ToUserAmount(row.amount),
      footCell: (row: ISettlementTransaction) => Convert.ToUserAmount(row.amount),
    },
    {
      id: "Action",
      name: "",
      style: { width: "10%" },
      sortable: false,
      align: 'center',
      selector: () => { },
      cell: (row: ISettlementTransaction) => <Input type="checkbox" checked={selectedTransactions.map(l => l.transaction_id).includes(row.transaction_id)} onChange={(event) => handleCheckboxChange(event, row)} />,
      footCell: () => { }
    },
  ]

  const settledTableColumns: CustomTableColumn[] = [
    {
      id: 'description',
      name: 'DESCRIPTION / NOTES',
      style: { width: '45%' },
      sortable: true,
      selector: (row: ISettlementTransaction) => row.description,
      footCell: () => { }
    },
    {
      id: 'transaction_type_name',
      name: 'CATEGORY',
      style: { width: '25%' },
      sortable: true,
      selector: (row: ISettlementTransaction) => row.transaction_type_name,
      footCell: (row: ISettlementTransaction) => row.transaction_type_name,
    },
    {
      id: "amount",
      name: "AMOUNT",
      style: { width: "20%" },
      sortable: true,
      align: 'right',
      selector: (row: ISettlementTransaction) => row.amount,
      format: (row: ISettlementTransaction) => Convert.ToUserAmount(row.amount),
      footCell: (row: ISettlementTransaction) => Convert.ToUserAmount(row.amount),
    },

    // {
    //   id: "Action",
    //   name: "",
    //   style: { width: "10%" },
    //   sortable: false,
    //   align:'center',
    //   selector: () => { },
    //   cell: (row: ISettlementTransaction) => <FaTrash size={20} style={{cursor:"pointer"}} onClick={()=>handleDeleteTransaction(row)} ></FaTrash>,
    //   footCell: () => { }
    // },
  ]


  return (
    <>
      <CommonLayOut>
        {screen === 1 && (
          <div>
            <Row>
              <div className="page-title">New Driver Settlement</div>
            </Row>
            <Row className="page-content align-items-center">
              <Col md={3}>
                <FormGroup>
                  <Label for="driver">Driver</Label>
                  {stateSettlementDetail.settlement_id == 0 ? (
                    <Input bsSize="sm" className="form-control" type="select" id="driver" name="driver" value={stateSettlementDetail.driver_id} onChange={handleDriverChange} >
                      <option key={0} value={0}>Select Driver</option>
                      {driverList && driverList.map((item) => (
                        <option key={item.driver_id} value={item.driver_id}>{item.driver_name}</option>
                      ))}
                    </Input>
                  ) : (
                    <Input bsSize="sm" className="form-control" type="text" id="driver" name="driver" value={stateSettlementDetail.driver_name} readOnly disabled />
                  )}
                </FormGroup>
              </Col>
              {stateSettlementDetail.vendor_id > 0 ? (
                <Col md={3}>
                  <FormGroup>
                    <Label for="vendor_id">Vendor</Label>
                    <Input bsSize="sm" className="form-control" type="text" id="vendor_id" name="vendor_id"
                      value={stateSettlementDetail.vendor_name} readOnly >
                    </Input>
                  </FormGroup>
                </Col>
              ) : null}
            </Row>
            <Row>
              <div className="page-subtitle mt-3">Transaction Summary</div>
            </Row>
            <Row className="page-content align-items-center">
              <Col md={12}>
                <Table>
                  <thead>
                    <tr>
                      <th>Transactions</th>
                      <th style={{textAlign:"right"}}>No. of Transactions</th>
                      <th style={{textAlign:"right"}}>Total Payable</th>
                      <th style={{textAlign:"right"}}>Paid</th>
                      <th style={{textAlign:"right"}}>Net Payable</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Pending</th>
                      <td style={{textAlign:"right"}}>{stateSettlementDetail.all_transactions && stateSettlementDetail.all_transactions.length}</td>
                      <td style={{textAlign:"right"}}>{stateSettlementDetail.all_transactions && Convert.ToUserAmount(stateSettlementDetail.all_transactions.filter(l => l.amount > 0).map(l => l.amount).reduce((sum, amount) => sum + amount, 0))}</td>
                      <td style={{textAlign:"right"}}>{stateSettlementDetail.all_transactions && Convert.ToUserAmount(stateSettlementDetail.all_transactions.filter(l => l.amount < 0).map(l => l.amount).reduce((sum, amount) => sum + amount, 0))}</td>
                      <td style={{textAlign:"right"}}>{stateSettlementDetail.all_transactions && Convert.ToUserAmount(stateSettlementDetail.all_transactions.map(l => l.amount).reduce((sum, amount) => sum + amount, 0))}</td>
                    </tr>
                    <tr>
                      <th scope="row">Selected</th>
                      <td style={{textAlign:"right"}}>{selectedTransactions && selectedTransactions.length}</td>
                      <td style={{textAlign:"right"}}>{selectedTransactions && Convert.ToUserAmount(selectedTransactions.filter(l => l.amount > 0).map(l => l.amount).reduce((sum, amount) => sum + amount, 0))}</td>
                      <td style={{textAlign:"right"}}>{selectedTransactions && Convert.ToUserAmount(selectedTransactions.filter(l => l.amount < 0).map(l => l.amount).reduce((sum, amount) => sum + amount, 0))}</td>
                      <td style={{textAlign:"right"}}>{selectedTransactions && Convert.ToUserAmount(selectedTransactions.map(l => l.amount).reduce((sum, amount) => sum + amount, 0))}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <div className="page-subtitle mt-3">Transactions</div>
            </Row>
            <Row className="page-content align-items-center">
              <CustomTable columns={pendingTableColumns} data={stateSettlementDetail.all_transactions} noRecordMessage="No Document found." canSelectRows={true} footerData={footerData} />
            </Row>
            <Row className="d-flex justify-content-end mt-3">
              <Col md={3} className="d-flex justify-content-end align-items-end pb-3">
                <Button color="primary" size="sm" onClick={handleNextPage}>Next</Button>
              </Col>
            </Row>
          </div>
        )}

        {screen === 2 && (
          <div>
            <Row>
              <div className="page-title">New Driver Settlement</div>
            </Row>
            <Row>
              <div className="page-subtitle mt-3">Transaction Summary</div>
            </Row>
            <Row className="page-content align-items-center">
              <Col md={12}>
                <Table>
                  <thead>
                    <tr>
                      <th>Transactions</th>
                      <th style={{textAlign:"right"}}>No. of Transactions</th>
                      <th style={{textAlign:"right"}}>Total Payable</th>
                      <th style={{textAlign:"right"}}>Paid</th>
                      <th style={{textAlign:"right"}}>Net Payable</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Settled</th>
                      <td style={{textAlign:"right"}}>{stateSettlementDetail.settled_transactions && stateSettlementDetail.settled_transactions.length}</td>
                      <td style={{textAlign:"right"}}>{stateSettlementDetail.settled_transactions && Convert.ToUserAmount(stateSettlementDetail.settled_transactions.filter(l => l.amount > 0).map(l => l.amount).reduce((sum, amount) => sum + amount, 0))}</td>
                      <td style={{textAlign:"right"}}>{stateSettlementDetail.settled_transactions && Convert.ToUserAmount(stateSettlementDetail.settled_transactions.filter(l => l.amount < 0).map(l => l.amount).reduce((sum, amount) => sum + amount, 0))}</td>
                      <td style={{textAlign:"right"}}>{stateSettlementDetail.settled_transactions && Convert.ToUserAmount(stateSettlementDetail.settled_transactions.map(l => l.amount).reduce((sum, amount) => sum + amount, 0))}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <div className="page-subtitle mt-3">Transactions</div>
            </Row>
            <Row className="page-content align-items-center">
              <CustomTable columns={settledTableColumns} data={stateSettlementDetail.settled_transactions} noRecordMessage="No Document found." canSelectRows={true} footerData={footerData} />
            </Row>
            <Row className="d-flex justify-content-end mt-3">
              <Col md={3} className="d-flex justify-content-end align-items-end pb-3">
                <Button color="primary" size="sm" className="me-3" onClick={handleBackPage}>Back</Button>
                <Button color="primary" size="sm" onClick={handleNextPage}>Next</Button>
              </Col>
            </Row>
          </div>
        )}
        {screen === 3 && (
          <div>
            <div className="d-flex justify-content-between  w-100 ">
              <Row className="w-50 ">
                <div className="page-title">New Driver Settlement</div>
              </Row>
              <div className='d-flex justify-content-end w-50'>
                <Row className="page-content align-items-center w-50 p-2">
                  <Col md={12}>
                    <Table borderless>
                      <tbody>
                        <tr>
                          <th scope="row" colSpan={2} className='p-1'><div className='page-subtitle'>Summary</div></th>
                        </tr>
                        <tr>
                          <th scope="row" className={"w-75 p-1"}>Total Amount</th>
                          <td className={"w-75 p-1"}>{Convert.ToUserAmount(stateSettlementDetail.total_amount)}</td>
                        </tr>
                        <tr>
                          <th scope="row" className={"w-75 p-1"}>Paid Amount</th>
                          <td className={"w-75 p-1"}>{Convert.ToUserAmount(stateSettlementDetail.paid_amount)}</td>
                        </tr>
                        <tr>
                          <th scope="row" className={"w-75 p-1"}>Balance Amount</th>
                          <td className={"w-75 p-1"}>{Convert.ToUserAmount(stateSettlementDetail.total_amount - stateSettlementDetail.paid_amount)}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </div>
            </div>
            <div>
              <Form onSubmit={handleSubmitDriverPayroll}>
                <Row className="page-content align-items-center">
                  <Col md={3}>
                    <FormGroup>
                      <Label for="payment_date">Payment Date</Label>
                      <ReactDatePicker showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event) => { event.preventDefault() }} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="purchase_date" className="form-control form-control-sm" onChange={(date) => { setStateSettlementPaymentDetail({ ...stateSettlementPaymentDetail, payment_date: Convert.ToISODate(date) }) }} selected={Convert.ToDate(stateSettlementPaymentDetail.payment_date)} required autoComplete='off' />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="payment_amount">Payment Amount</Label>
                      <Input bsSize="sm" className="form-control" type="text" name="amount" value={stateSettlementPaymentDetail.amount} onChange={handleInputChange('amount')}
                        required autoComplete='off' onKeyDownCapture={Validate} validation="decimal" length="5" />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="payment_method_id">Payment Method</Label>
                      <Input bsSize="sm" className="form-control" type="select" id="payment_method_id" name="payment_method_id"
                        value={stateSettlementPaymentDetail.payment_method_id} onChange={handleInputChange('payment_method_id')}
                        required
                      >
                        <option key={0} value="">Select Payment</option>
                        {paymentMethodList && paymentMethodList.map((item) => (
                          <option key={item.payment_method_id} value={item.payment_method_id}>{item.payment_method_name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="transaction_number">{stateSettlementPaymentDetail.payment_method_id == 3 ? "CHQ No." : "TXN No."}</Label>
                      <Input bsSize="sm" className="form-control" type="text" id="transaction_number" name="transaction_number"
                        value={stateSettlementPaymentDetail.transaction_number} onChange={handleInputChange('transaction_number')}
                        required={stateSettlementPaymentDetail.payment_method_id != 2} autoComplete='off'
                        onKeyDownCapture={Validate} validation="alphanumeric" length="25"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="notes">Notes</Label>
                      <Input bsSize="sm" className="form-control" type="text" id="notes" name="notes"
                        value={stateSettlementPaymentDetail.notes} onChange={handleInputChange('notes')}
                        autoComplete='off'
                      />
                    </FormGroup>
                  </Col>
                  <Col className="d-flex justify-content-end align-items-end pb-3">
                    <Button color="primary" size="sm" className="me-3" onClick={handleBackPage}>Back</Button>
                    <Button color="primary" size="sm" type="submit">Proceed</Button>
                  </Col>
                </Row>
              </Form>
            </div>
            <Row>
              <div className="page-subtitle mt-3">Past Payments</div>
            </Row>
            <Row className="page-content align-items-center">
              <CustomTable columns={paymentTableColumns} data={stateSettlementDetail.settled_payments} noRecordMessage="No Document found." />
            </Row>
          </div>
        )}
      </CommonLayOut>
    </>
  )
}

export default CreateNewDriverPayroll
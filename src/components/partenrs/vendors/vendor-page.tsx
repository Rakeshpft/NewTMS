import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import { BsSearch } from "react-icons/bs";
import CommonLayOut from "../../../layout";
import { AiOutlinePlus } from "react-icons/ai";
import { useVendorContext } from "../../../services/reducer/vendor.reducer";
import { IVendorDetails } from "../../../services/tms-objects/vendor.types";
import { routes } from "../../routes/routes";
import { Link, useNavigate } from "react-router-dom";
import { CustomTable } from "../../../features/data-table/CustomTable";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { toastify } from "../../../features/notification/toastify";
import { isEmpty } from "lodash";
import { LoadingContext } from "../../../services/context/loading.context";

const VendorPage = () => {
  const { getVendorDetails, VendorDetails, deleteVendor, VendorLoading } = useVendorContext();
  const { setLoader } = useContext(LoadingContext);
  const [filteredData, setFilteredData] = useState<IVendorDetails[] | []>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedVendors, setSelectedVendors] = useState<IVendorDetails[] | []>([]);
  const navigate = useNavigate();


const handleSearchFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  VendorDetails
    const value = e.target.value.toLowerCase();
    const filteredData = VendorDetails && VendorDetails.filter((item) => {
      return columns.some((column) =>
        String(item[column.id as keyof object])
          .toLowerCase()
          .includes(value)
      );
    });
    setFilter(value);
    filteredData && setFilteredData(filteredData);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedVendors([]);
  };


  const handleDeleteVendor =
    async () => {
      setLoader(true)
      const deletedVendorIds = selectedVendors.map(doc => doc.vendor_id);
      await deleteVendor(deletedVendorIds)
        .then(response => {
          debugger;
          response &&
            toastify({
              message: response.message,
              type: response.success ? "success" : "error",
            })
            setLoader(false)
        })

      setDeleteModalOpen(false)
      console.log("clicked")
      setSelectedVendors([]);
      getVendorDetails();
    }

    
  useEffect(() => {
    if (!VendorLoading && VendorDetails) {
      setFilteredData(VendorDetails);
    }
  }, [VendorLoading, VendorDetails]);

  useEffect(() => {
    getVendorDetails();
  }, []);

  const columns: CustomTableColumn[] = [
    {
      id: "full_name",
      name: "NAME",
      style: { width: "25%" },
      sortable: true,
      selector: (row: IVendorDetails) => row.full_name,
      format: (row: IVendorDetails) => (`${row.first_name} ${"  "} ${row.last_name} `)
    },
    {
      id: "address",
      name: "ADDRESS",
      style: { width: "35%" },
      sortable: true,
      selector: (row: IVendorDetails) => row.address,
      format: (row: IVendorDetails) => (`${row.suite_number} ${row.street} ${row.city} ${row.state_name} ${row.zipcode}`)
    },
    {
      id: "phone",
      name: "PHONE",
      style: { width: "15%" },
      sortable: true,
      selector: (row: IVendorDetails) => row.phone
    },
    {
      id: "mc_number",
      name: "MC",
      style: { width: "15%" },
      sortable: true,
      selector: (row: IVendorDetails) => row.mc_number
    },
    {
      id: "action",
      name: "ACTION",
      style: { width: "5%" },
      sortable: false,
      selector: (row: IVendorDetails) => row.vendor_id,
      cell: (row: IVendorDetails) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={() => { navigate(`${routes.createNewVendor}/${row.vendor_id}`) }} />
    }
  ]

  return (
    <>
      <CommonLayOut>
        <div className=" d-flex justify-content-between">
          <div className="page-title">Vendors</div>
          <div>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex justify-content-end ms-auto align-items-center column-gap-2">
              <InputGroup className="shadow-sm border-secondary">
                  <InputGroupText className="bg-white">
                    <BsSearch size={16} />
                  </InputGroupText>
                  <Input placeholder="Search" className="border-start-0 search" value={filter} onChange={handleSearchFilterChange} />
                </InputGroup>
              </div>
              <div className="user-info-btn-wrapper">
                {!isEmpty(selectedVendors) && (
                  <div className="user-info-btn">
                    <Button color="primary" onClick={() => setDeleteModalOpen(true)}>Delete</Button>
                  </div>
                )}
              </div>
              <Link to={routes.createNewVendor}>
                <Button color="primary">
                  <AiOutlinePlus /> New Vendor
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <CustomTable columns={columns} data={filteredData} noRecordMessage="No vendor found." canSelectRows={true} selectedTableRows={selectedVendors} setSelectionTableRows={setSelectedVendors} />
      </CommonLayOut>

      <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader>
          <h6 className="mb-0 fw-bold">Delete Vendor</h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            {!isEmpty(selectedVendors) && (
              <div className=" my-3 ">
                 {selectedVendors.length > 1?(<div>You have selected {selectedVendors.length} vendors.<br /></div>):null}
                Are you sure you want to delete?
              </div>
            )}
            <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
              <Button color="danger" outline={true} className="px-4 mr-3" onClick={() => closeDeleteModal()}>Cancel</Button>
              <Button color="primary" className="px-4" onClick={() => handleDeleteVendor()}>Delete</Button>
            </FormGroup>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default VendorPage;

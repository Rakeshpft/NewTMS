import React, { useEffect, useRef, useState } from "react";
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
import { debounce, includes, isEmpty } from "lodash";
import { useVendorContext } from "../../../services/reducer/vendor.reducer";
import { IVendorDetails } from "../../../services/tms-objects/vendor.types";
import { routes } from "../../routes/routes";
import { Link, useNavigate } from "react-router-dom";
import { CustomTable } from "../../../features/data-table/CustomTable";
import { HiOutlinePencilAlt } from "react-icons/hi";

const VendorPage = () => {
  const { getVendorDetails, VendorDetails, deleteVendor, VendorLoading } = useVendorContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [filteredData, setFilteredData] = useState<IVendorDetails[] | []>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedVendors, setSelectedVendors] = useState<IVendorDetails[] | []>([]);
  const navigate = useNavigate();

  const handleSearch = debounce((searchValue: string) => {
    const searchResults =
      VendorDetails && VendorDetails.filter((vendor) => {
        if (includes(vendor.full_name.toLowerCase(), searchValue.toLowerCase())) {
          return vendor;
        }
      });
    searchResults && setFilteredData(searchResults);
  }, 500);

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedVendors([]);
  };

  const handleDeleteVendor = () => {
    selectedVendors && deleteVendor(selectedVendors);
    setDeleteModalOpen(false)
  };

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
      name: "Name",
      style: { width: "25%" },
      sortable: true,
      selector: (row: IVendorDetails) => row.full_name
    },
    {
      id: "address",
      name: "Address",
      style: { width: "35%" },
      sortable: true,
      selector: (row: IVendorDetails) => row.address,
      format: (row: IVendorDetails) => (`${row.suite_number} ${row.street} ${row.city} ${row.state_name} ${row.zipcode}`)
    },
    {
      id: "phone",
      name: "Phone",
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
      name: "Action",
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
                  <Input placeholder="Search"
                    className="border-start-0 search"
                    inputRef={inputRef} onChange={(e: any) => handleSearch(e.target.value)} />
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
          <h6 className="mb-0 fw-bold">Delete</h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            {!isEmpty(selectedVendors) && (
              <div className=" my-3 ">
                {selectedVendors.length > 1
                  ? `Are you sure you want to delete selected ${selectedVendors.length} vendor?`
                  : `Are you sure you want to delete vendor`}
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

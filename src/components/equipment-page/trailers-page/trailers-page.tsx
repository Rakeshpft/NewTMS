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
import { routes } from "../../routes/routes";
import { Link, useNavigate } from "react-router-dom";
import { CustomTable } from "../../../features/data-table/CustomTable";
import { HiCheckCircle, HiOutlinePencilAlt } from "react-icons/hi";
import { useTrailerContext } from "../../../services/reducer/trailer.reducer";
import { ITrailerObject } from "../../../services/tms-objects/trailer.types";
import { MdCancel } from "react-icons/md";
import { toastify } from "../../../features/notification/toastify";

const TrailerPage = () => {
  const { getTrailerList, trailerList, deleteTrailer, isLoading } = useTrailerContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [filteredData, setFilteredData] = useState<ITrailerObject[] | []>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState<ITrailerObject[] | []>([]);
  const navigate = useNavigate();

  const handleSearch = debounce((searchValue: string) => {
    const searchResults =
      trailerList &&
      trailerList.filter((trailer) => {
        if (includes(trailer.unit.toLowerCase(), searchValue.toLowerCase())
          || includes(trailer.make.toLowerCase(), searchValue.toLowerCase())
          || includes(trailer.model.toLowerCase(), searchValue.toLowerCase())
          || includes(trailer.vin_number.toLowerCase(), searchValue.toLowerCase())
          || includes(trailer.ownership_type_name.toLowerCase(), searchValue.toLowerCase())
          || includes(trailer.driver_name.toLowerCase(), searchValue.toLowerCase())
          || includes(trailer.plate_number.toString(), searchValue.toLowerCase())
          || includes(trailer.purchase_date.toString(), searchValue.toLowerCase())

        ) {
          return trailer;
        }
      });
    searchResults && setFilteredData(searchResults);
  }, 500);

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedTrailer([]);
  };

  const handleDeleteTrailer =async () => {
    
    const deletedTruckIds = selectedTrailer.map(doc => doc.trailer_id);
  
   await deleteTrailer(deletedTruckIds)
      .then(response => {
        console.log(response);
       response &&
        toastify({
        message: response.message,
        type: response.success ? "success" : "error",
    })
  })
      setDeleteModalOpen(false);
      setSelectedTrailer([]);
  };

  useEffect(() => {
    if (!isLoading && trailerList) {
      setFilteredData(trailerList);
    }
  }, [isLoading, trailerList]);

  useEffect(() => {
    getTrailerList();
  }, []);

  const columns: CustomTableColumn[] = [
    {
      id: "unit",
      name: "Unit",
      style: { width: "25%" },
      sortable: true,
      selector: (row: ITrailerObject) => row.unit,
    },
    {
      id: "make",
      name: "MAKE",
      style: { width: "35%" },
      sortable: true,
      selector: (row: ITrailerObject) => row.make,
    },
    {
      id: "model",
      name: "MODEL",
      style: { width: "15%" },
      sortable: true,
      selector: (row: ITrailerObject) => row.model
    },
    {
      id: "vin_number",
      name: "VIN",
      style: { width: "15%" },
      sortable: true,
      selector: (row: ITrailerObject) => row.vin_number
    },
    {
      id: "plate_number",
      name: "PLATE",
      style: { width: "15%" },
      sortable: true,
      selector: (row: ITrailerObject) => row.plate_number
    },
    {
      id: "plate_state_name",
      name: "STATE",
      style: { width: "15%" },
      sortable: true,
      selector: (row: ITrailerObject) => row.plate_state_name
    },
    {
      id: "ownership_type_name",
      name: "OWNERSHIP",
      style: { width: "15%" },
      sortable: true,
      selector: (row: ITrailerObject) => row.ownership_type_name

    },
    {
      id: "driver_name",
      name: "DRIVER",
      style: { width: "15%" },
      sortable: true,
      selector: (row: ITrailerObject) => row.driver_name
    },
    {
      id: "address",
      name: "LOCATION",
      style: { width: "15%" },
      sortable: true,
      selector: (row: ITrailerObject) => row.address,
      format: (row: ITrailerObject) => (`${row.lease_suite_number} ${row.lease_street} ${row.lease_city} ${row.plate_state_name} ${row.lease_zipcode}`)
    },
    {
      id: "is_active",
      name: "STATUS",
      style: { width: "15%" },
      sortable: true,
      selector: (row: ITrailerObject) => row.is_active,
      cell:(row:ITrailerObject)=>(row.is_active ? <HiCheckCircle size={20} className="text-success" /> : <MdCancel size={20} className="text-danger" />)
    },
    {
      id: "action",
      name: "Action",
      style: { width: "5%" },
      sortable: false,
      selector: (row: ITrailerObject) => row.trailer_id,
      cell: (row: ITrailerObject) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={() => { navigate(`${routes.createNewTailers}/${row.trailer_id}`) }} />
    }
  ]

  return (
    <>
      <CommonLayOut>
        <div className=" d-flex justify-content-between">
          <div className="page-title">Trailers</div>
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
                {!isEmpty(selectedTrailer) && (
                  <div className="user-info-btn">
                    <Button color="primary" onClick={() => setDeleteModalOpen(true)}>Delete</Button>
                  </div>
                )}
              </div>
              <Link to={routes.createNewTailers}>
                <Button color="primary">
                  <AiOutlinePlus /> New Trailer
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <CustomTable columns={columns} data={filteredData} noRecordMessage="No vendor found." canSelectRows={true} selectedTableRows={selectedTrailer} setSelectionTableRows={setSelectedTrailer} />
      </CommonLayOut>

      <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader>
          <h6 className="mb-0 fw-bold">Delete</h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            {!isEmpty(selectedTrailer) && (
              <div className=" my-3 ">
                {selectedTrailer.length > 1
                  ? `Are you sure you want to delete selected ${selectedTrailer.length} trailer?`
                  : `Are you sure you want to delete trailer`}
              </div>
            )}
            <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
              <Button color="danger" outline={true} className="px-4 mr-3" onClick={() => closeDeleteModal()}>Cancel</Button>
              <Button color="primary" className="px-4" onClick={() => handleDeleteTrailer()}>Delete</Button>
            </FormGroup>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TrailerPage;

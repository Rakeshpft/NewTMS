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

  //TabPane,
} from "reactstrap";

//import { TabPage } from "../../driver-page";

import { BsSearch } from "react-icons/bs";
import { useTrailerContext } from "../../../services/reducer/trailer.reducer";
import { debounce, includes, isEmpty } from "lodash";
import CommonLayOut from "../../../layout";
import { AiOutlinePlus } from "react-icons/ai";
import { BasicTable } from "../../../features/table/BasicTable";
import { tableCells, tableHeadCells } from "../../driver-page/deiver.constants";
//import CreateNewTrailerForm from "./createNewTrailersForm";
import { ITrailerObject } from "../../../services/tms-objects/trailer.types";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";

const TrailerPage = () => {

  const {
    getTrailerList,
    //getTrailerDetail,
    deleteTrailer,
    //saveTrailer,
    trailerList,
    selectedTrailer,
    isLoading,

  } = useTrailerContext();



  const inputRef = useRef<HTMLInputElement>(null);
  const [filteredData, setFilteredData] = useState<ITrailerObject[] | []>([]);
  const [noTrailer, setnoTrailer] = useState(false);
  //const [Trailer, setTrailer] = useState(false)
  //const [TrailerNewDetails, setTrailerNewDetails] = useState<ITrailerObject>(trailerInitialState);
  //const [title, setTitle] = useState<boolean>(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedVendors, setSelectedTrailer] = useState<ITrailerObject[] | []>([]);


  const handleSearch = debounce((searchValue: string) => {
    const searchResults =
    trailerList &&
    trailerList.filter((trailer) => {
        if (includes(trailer.lease_suite_number.toLowerCase(), searchValue.toLowerCase())) {
          return trailer;
        }
      });
    searchResults && setFilteredData(searchResults);
  }, 500);

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedTrailer([]);
  };


  const handleDeleteTrailer = () => {
    selectedTrailer && deleteTrailer(selectedVendors);
    
    // getTrailerDetails().then((data) =>{
    //   data && setFilteredData(data);
    // });
    setDeleteModalOpen(true)
    console.log("clicked")
  };

  // const handleFileUpload = () => {
  //   setUploadModalOpen(true)
  //   console.log("pushed")
  // }

  useEffect(() => {
    if (!isLoading && trailerList) {
      setFilteredData(trailerList);
      setnoTrailer(isEmpty(trailerList));
    }
  }, [isLoading, trailerList]);



  useEffect(() => {
    if (isEmpty(filteredData)) {
      setnoTrailer(true);
    } else {
      setnoTrailer(false);
    }
  }, [filteredData]);


  useEffect(() => {
    getTrailerList();
  }, []);
   


  return (
    <>
            <CommonLayOut>
              <div className=" d-flex p-3">
                <div className=" content w-100">
                  <div className=" content-header d-flex justify-content-between">
                    <div className="page-title">
                      <h5> Trailers </h5>
                    </div>
                    <div>
                      <div className=" page-subtitle d-flex align-items-center gap-3">
                        <div className="d-flex justify-content-end ms-auto align-items-center column-gap-2">
                          <InputGroup className="shadow-sm border-secondary">
                            <InputGroupText className="bg-white">
                              <BsSearch size={16} />
                            </InputGroupText>
                            <Input
                              placeholder="Search"
                              className="border-start-0 border-end-0 search"
                              inputRef={inputRef} onChange={(e: any) =>
                                handleSearch(e.target.value)}
                            />
                          </InputGroup>
                        </div>

                        <div className="user-info-btn-wrapper">
                          {!isEmpty(selectedVendors) && (
                            <div className="user-info-btn">

                              <Button color="primary" onClick={() => setDeleteModalOpen(true)}>Delete</Button>
                            </div>
                          )}
                        </div>
                        <Link to={routes.createNewTailers}>
                        <Button color="primary">
                          <AiOutlinePlus />
                          New Trailer
                        </Button>
                        </Link>                        

                      </div>
                    </div>
                  </div>
                  
                      <BasicTable
                         emptyState={noTrailer}
                         canSelectRows={true}
                         selectedTableRows={selectedVendors}
                         setSelectionTableRows={setSelectedTrailer}
                         tableData={filteredData}
                         tableHeadCells={tableHeadCells}
                         loading={isLoading}
                         tableCells={tableCells}
                         //canEditRow={true}
                         //editRow={handleEditTrailer}
                      />
                    
                </div>


              </div>

            </CommonLayOut>
            <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
              <ModalHeader>
                <h6 className="mb-0 fw-bold"> Delete </h6>
              </ModalHeader>
              <ModalBody>
                <Container>
                  {!isEmpty(selectedVendors) && (
                    <div className=" my-3 ">
                      {selectedVendors.length > 1
                        ? `Are you sure you want to delete ${selectedVendors.length} contacts?`
                        : `Are you sure you want to delete customer "${selectedVendors[0].vin_number} ${selectedVendors[0].vin_number}"?`}
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
                      onClick={() => handleDeleteTrailer()}
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

export default TrailerPage;

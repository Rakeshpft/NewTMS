import React from "react";
import { BsSearch } from "react-icons/bs";
import { Input, InputGroup, InputGroupText } from "reactstrap";

const SearchPage = () => {
  console.log("search");

  return (
    <>
      <div className="d-flex justify-content-end ms-auto align-items-center column-gap-2">
        <InputGroup className="shadow-sm border-secondary">
          <InputGroupText className="bg-white">
            <BsSearch size={16} />
          </InputGroupText>
          <Input placeholder="Search" className="border-start-0 border-end-0" />
        </InputGroup>
      </div>
    </>
  );
};

export default SearchPage;

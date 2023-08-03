import React from "react";
import { BsSearch, BsSliders2 } from "react-icons/bs";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";

const SearchPage = () => {
  function searchToggle(): void {
    console.log("search");
  }

  return (
    <>
      <div className="d-flex justify-content-end ms-auto align-items-center column-gap-2">
        <InputGroup className="shadow-sm border-secondary">
          <InputGroupText className="bg-white">
            <BsSearch size={16} />
          </InputGroupText>
          <Input placeholder="Search" className="border-start-0 border-end-0" />
          <InputGroupText className="bg-white">
            <Button
              color="link"
              size="sm"
              className="p-0"
              onClick={() => searchToggle()}
            >
              <BsSliders2 size={16} />
            </Button>
          </InputGroupText>
        </InputGroup>
      </div>
    </>
  );
};

export default SearchPage;

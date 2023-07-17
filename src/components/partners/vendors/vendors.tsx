import React from "react";
import { MdOutgoingMail } from "react-icons/md";
import { Link } from "react-router-dom";
import { Form, Input, Button, Table } from "reactstrap";
import { AiOutlineFileExcel } from "react-icons/ai";
import { PiFilePdfDuotone } from "react-icons/pi";
import SideBar from "../../header/sidebar";
import { Header } from "../../header";

const Vendors = () => {
  return (
    <>
      <Header title="Vendors" name="export" stitle="New Driver" />
      <div className="d-flex">
        <SideBar isOpen={true} />
        {/* <Form>
        <div className="d-flex justify-content-between ">
          <div
            className="d-flex  align-items-center gap-2 "
            style={{ width: "250px" }}
          >
            <h3> Vendors</h3>
            <h5 className="mb-1 ms-5"> Export </h5>
            <Link to={"#!"}>
              <PiFilePdfDuotone className="me-2 text-danger fs-4" />
            </Link>
            <Link to={"#"}>
              <AiOutlineFileExcel className="text-success fs-4" />
            </Link>
            <Link to={"#!"}>
              <MdOutgoingMail className="fs-4" />
            </Link>
          </div>
          <div className="d-flex gap-2">
            <Input name="search" type="text" placeholder="Search">
            </Input>
            <Button> New Vendor </Button>
          </div>
        </div>
      </Form> */}
        <hr></hr>
        <Table>
          <thead>
            <tr>
              <th> # </th>
              <th> Name </th>
              <th> Address </th>
              <th> MC </th>
              <th> Phone </th>
              <th> Email </th>
              <th>type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Otto</td>
              <td> XYZABC</td>
              <td>Dont Know </td>
              <td>987654321</td>
              <td>Otto@mdo</td>
              <td>Animal</td>
              <td>Very Good</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Vendors;

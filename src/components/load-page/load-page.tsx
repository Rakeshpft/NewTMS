import React from "react";
import { Button, Form, Input, Table } from "reactstrap";
import { CiSearch } from "react-icons/ci";
import { MdOutlineAdd } from "react-icons/md";
import NewLoadPage from "./new-load-page";
import SideBar from "../header/sidebar";
import { Header } from "../header";

const LoadPage = () => {
  return (
    <>
      <Header title="Laods" name="export" stitle="New Load" />
      <div className="d-flex">
        <SideBar isOpen={true} />
        {/* <Form>
        <div className="parent d-flex justify-content-between">
          <div className="child d-flex gap-2 ">
            <h3>Loads </h3>
            <h3> All </h3>
          </div>

          <div className="child d-flex gap-2">
            <Input
              name="search"
              type="text"
              placeholder="Search "
              style={{ color: "black", border: "2px solid #B7D1E6" }}
            >
              <CiSearch style={{ color: "green " }} />
            </Input>
            <Button
            
              style={{
                color: "black",
                border: "2px solid #1E5367",
                backgroundColor: "#B7D1E6",
              }}
            >
              New Load
             
              <MdOutlineAdd />
            </Button>
             
          </div>
          
        </div>
       
      </Form> */}
        <NewLoadPage />
        <hr></hr>

        <Table borderless hover>
          <thead>
            <tr>
              <th>Load</th>
              <th>Date</th>
              <th>Driver</th>
              <th>Broker</th>
              <th>PO</th>
              <th>Pickup</th>
              <th>Delivery</th>
              <th>Rate</th>
              <th>Completed</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>12/07/23</td>
              <td>Otto</td>
              <td>@abc</td>
              <td>@jhon</td>
              <td>@kat</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default LoadPage;

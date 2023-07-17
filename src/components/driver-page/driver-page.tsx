import React from "react";
import { Table } from "reactstrap";
import { Header } from "../header";
import SideBar from "../header/sidebar";
import NewDriverPage from "./new-driver-page";

const DriverPage = () => {
  return (
    <>
      <Header title="Drivers" name="export" stitle="New Driver" />
      <div className="d-flex">
        <SideBar isOpen={true} />
        <div className="w-100">
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Hire Date</th>
                <th>Term Date</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Truck</th>
                <th>Trailer</th>
                <th>Payable To</th>
                <th>Warnings</th>
                <th>Driver App</th>
                <th>Actions</th>
                <th>*</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <NewDriverPage />
    </>
  );
};

export default DriverPage;

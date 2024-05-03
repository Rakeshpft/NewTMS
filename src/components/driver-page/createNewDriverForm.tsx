// import { Form, useNavigate } from "react-router-dom";
// import { routes } from "../routes/routes";
import React, { useState } from "react";
import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";
// import TabPage from "./tab-page";
import DriversDetails from "./createDriver/driversDetails";
import DocumentsDetails from "./createDriver/document-details-tab/documents-details";
// import SchedulePayment from "./createDriver/schedulePayment";
// import AdditionalPayee from "./createDriver/additionalPayee";
import CommonLayOut from "../../layout";
import { TDriverProps } from "../../services/tms-objects/driver.types";
import SchedulePayment from "./createDriver/schedulePayment";
import { toastify } from "../../features/notification/toastify";

const CreateNewDriverForm2 = (prop: TDriverProps) => {
  const { handleSubmit = undefined, driver_id = 0 } = prop;

  const [driverActive, setDriverActive] = useState(1);

  const handleClick = (tabId: number) => {
    if (driver_id > 0) {
      setDriverActive(tabId);
    } else {
      toastify({
        message: "Please save the driver details first.",
        type: "error",
      });
    }
  };
  return (
    <>
      <Row className="page-title">
        <Col>{driver_id > 0 ? "Edit Driver" : "Create New Driver"}</Col>
      </Row>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={driverActive == 1 ? "active" : ""}
            onClick={() => handleClick(1)}
          >
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={driverActive == 2 ? "active" : ""}
            onClick={() => handleClick(2)}
          >
            Documents
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={driverActive == 3 ? "active" : ""}
            onClick={() => handleClick(3)}
          >
            Scheduled Payments/Deductions
          </NavLink>
        </NavItem>
      </Nav>

      <>
        {
          {
            1: (
              <DriversDetails
                driver_id={driver_id}
                handleSubmit={handleSubmit}
              />
            ),
            2: <DocumentsDetails driver_id={driver_id} />,
            3: <SchedulePayment driver_id={driver_id} />,
          }[driverActive]
        }
      </>
    </>
  );
};

export { CreateNewDriverForm2 };

const CreateNewDriverForm = ( prop: TDriverProps) => {

  return (
    <CommonLayOut>
      <CreateNewDriverForm2 {...prop}/>
    </CommonLayOut>
  );
};

export default CreateNewDriverForm;

import React, { useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import DocumentApplication from "./document-application";
import DocumentCdl from "./document-cdl";
import DocumentMedical from "./document-medical";
import DocumentDrugTest from "./document-drugtest";
import DocumentSsn from "./document-ssn";
import DocumentMvr from "./document-mvr";
import DocumentEmpVerify from "./document-empverify";
import DocumentOther from "./document-other";
import { TDriverProps } from "../../../../services/tms-objects/driver.types";

const DocumentsDetails = (prop: TDriverProps) => {
  const { driver_id } = prop;

  const [driverDocActive, setDriverDocActive] = useState(1);
  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink className={driverDocActive == 1 ? "active" : ""} onClick={() => setDriverDocActive(1)}>
            Application
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={driverDocActive == 2 ? "active" : ""} onClick={() => setDriverDocActive(2)}>
            CDL
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={driverDocActive == 3 ? "active" : ""} onClick={() => setDriverDocActive(3)}>
            Medical Card
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={driverDocActive == 4 ? "active" : ""} onClick={() => setDriverDocActive(4)}>
            Drug Test
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={driverDocActive == 5 ? "active" : ""} onClick={() => setDriverDocActive(5)}>
            MVR
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={driverDocActive == 6 ? "active" : ""} onClick={() => setDriverDocActive(6)}>
            SSN Card
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={driverDocActive == 7 ? "active" : ""} onClick={() => setDriverDocActive(7)}>
            Employee Verification
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={driverDocActive == 8 ? "active" : ""} onClick={() => setDriverDocActive(8)}>
            Other
          </NavLink>
        </NavItem>
      </Nav>

      {
        {
          1: <DocumentApplication driver_id={driver_id} />,
          2: <DocumentCdl driver_id={driver_id} />,
          3: <DocumentMedical driver_id={driver_id} />,
          4: <DocumentDrugTest driver_id={driver_id} />,
          5: <DocumentMvr driver_id={driver_id} />,
          6: <DocumentSsn driver_id={driver_id} />,
          7: <DocumentEmpVerify driver_id={driver_id} />,
          8: <DocumentOther driver_id={driver_id} />,
        }[driverDocActive]
      }
    </>
  );
};

export default DocumentsDetails;

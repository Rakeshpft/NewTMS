import React, { useState } from "react";
import { ILoadProps } from "../../services/tms-objects/load.type";
import CommonLayOut from "../../layout";
import { Col, Nav, NavItem, NavLink, Row } from "reactstrap";
import { toastify } from "../../features/notification/toastify";
import LoadDetail from "./load-detail";
import Notes from "./notes";
import LoadServices from "./load-services";
import LoadDocuments from "./load-documents";

const CreateNewLoadTab = (props: ILoadProps) => {
  const { handleSubmit = undefined, load_id = 0 } = props;

  const [loadActive, setLoadActive] = useState(1);

  const handleLoadClick = (tabId: number) => {

    if (load_id > 0) {
      setLoadActive(tabId);
    } else {
      toastify({
        message: "Please save the load details first.",
        type: "error",
      });
    }
  };
  
  return (
    <CommonLayOut>
      <Row className="page-title">
        <Col>Create New Load</Col>
      </Row>
      <Nav tabs>
        <NavItem>
          <NavLink onClick={() => handleLoadClick(1)}> Details </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => handleLoadClick(2)}> Services </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => handleLoadClick(3)}>Documents </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => handleLoadClick(4)}>Billing</NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => handleLoadClick(5)}>Notes</NavLink>
        </NavItem>
      </Nav>
      <>
        {
          {
            1: <LoadDetail load_id={load_id} handleSubmit={handleSubmit} />,
            2: <LoadServices load_id={load_id}  />,
            3: <LoadDocuments load_id={load_id}  />,
            4: <LoadDetail load_id={load_id}  />,
            5: <Notes load_id={load_id} />,
          }[loadActive]
        }
      </>
    </CommonLayOut>
  );
};

export default CreateNewLoadTab;

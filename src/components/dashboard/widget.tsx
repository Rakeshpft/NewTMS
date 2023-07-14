import React from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, Col, Row } from "reactstrap";

interface WidgetProps {
  name?: string;
  image?: string;
  variant: "small" | "large" | "normal" | "wide";
  counter?: number;
  options?: string[];
  icon?: string;
  link?: string;
}
const Widget = ({
  name,
  image,
  variant,
  counter,
  options,
  icon,
  link
}: WidgetProps) => {
  const [modal, setModal] = React.useState(false);

  const toggle = () => setModal(!modal);
  return (
    <>
      <div
        className={`widget ${variant}`}
        onClick={toggle}
        data-bs-toggle="modal"
        data-bs-target={`#modal_${name}`}
      >
        <div className="left">
          <img src={`./icons/${image}.svg`} alt="icon" height={45} />
          <span className="title">{name || "Default Name"}</span>
        </div>
        <div className="bottom">
          <div className="counter">{counter}</div>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle} centered id={`modal_${name}`}>
        <ModalHeader toggle={toggle}>{name}</ModalHeader>
        <ModalBody>
          <Row>
            {options?.map((option) => (
              <Col md="6">
                <Link
                  to={`${link}`}
                  className={`widget ${variant}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="left">
                    <img src={`./icons/${icon}.svg`} alt="icon" height={45} />
                    <div className="title">{option || "Default Name"}</div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Widget;

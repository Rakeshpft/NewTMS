import React from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, Col, Row } from "reactstrap";

interface WidgetProps {
  name?: string;
  image?: string;
  variant: "small" | "large" | "normal" | "wide";
  counter?: number;
  options?: string[];
  icon?: string[];
  link?: string;
  cardName?: string[];
  cardCounter?: number[];
}
const Widget = ({
  name,
  image,
  variant,
  counter,
  options,
  icon,
  link,
  cardName,
  cardCounter,
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
        <div className="d-flex gap-2 justify-content-between">
          <div className="left">
            <img src={`./icons/${image}.svg`} alt="icon" height={45} />
            <span className="title">{name || "Default Name"}</span>
          </div>
          <div className="bottom">
            <div className="counter">{counter}</div>
          </div>
        </div>
        <div className="tile-body pt-4">
          <span className="tile-count d-flex ">
            <div className="tile-count-item gap-5">
              <p className="mb-0 count">{cardCounter?.map((item) => item)}</p>
              <p className="mb-0 name">{cardName?.map((item) => item)}</p>
            </div>
          </span>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle} centered id={`modal_${name}`}>
        <ModalHeader toggle={toggle}>{name}</ModalHeader>
        <ModalBody>
          <Row>
            {options?.map((option, index) => (
              <Col md="6" key={index}>
                <Link
                  to={`${link}`}
                  className="d-flex gap-2 justify-content-between"
                  style={{
                    textDecoration: "none",
                    border: "1px solid #418ecb",
                    borderRadius: "8px",
                    padding: "20px",
                  }}
                >
                  <div className="left">
                    {icon?.map((item, index) => (
                      <img
                        src={`./icons/${item}.svg`}
                        alt="icon"
                        height={30}
                        key={index}
                      />
                    ))}
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

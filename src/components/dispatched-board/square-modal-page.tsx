import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from "reactstrap";
import { TabPage } from "../driver-page";

interface SquareModalPageProps {
  id: number;
  color: string;
}

const Squareboxes: SquareModalPageProps[] = [
  { id: 1, color: "#FF8761" },
  { id: 2, color: "#B7D1E6" },
  { id: 3, color: "#B7D1E6" },
  { id: 4, color: "#B7D1E6" },
  { id: 5, color: "#B7D1E6" },
  { id: 6, color: "#0B8E00" },
];

const SquareModalPage = () => {
  const [modal, setModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const toggle = (color: string) => {
    setModal(!modal);
    setSelectedColor(color);
  };

  return (
    <>
      <div className="box-container">
        {Squareboxes.map((box) => (
          <div
            key={box.id}
            className="color-box"
            style={{ backgroundColor: box.color }}
            onClick={() => toggle(box.color)}
          ></div>
        ))}
      </div>
      <Modal
        isOpen={modal}
        toggle={() => toggle("")}
        size="lg"
        backdrop="static"
      >
        <TabPage tabTitles={["New Load", "New Note"]}></TabPage>
        <ModalHeader>{selectedColor}</ModalHeader>
        <ModalBody>
          You selected the color:{" "}
          <span style={{ color: selectedColor }}>{selectedColor}</span>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => toggle("")}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default SquareModalPage;

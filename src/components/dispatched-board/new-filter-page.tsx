import React, { useReducer, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Form,
  Input,
  Label,
} from "reactstrap";
import {
  initialNewFilterPageState,
  newFilterPage,
} from "../tms-object/dispatchedpage";

interface NewFilterPageProps {
  modal: boolean;
  toggle: () => void;
  filteredData: any[];
}

type FormAction =
  | { type: "SET_Name"; payload: string }
  | { type: "SET_Driver"; payload: string };

const formReducer = (
  state: newFilterPage,
  action: FormAction
): newFilterPage => {
  switch (action.type) {
    case "SET_Name":
      return { ...state, name: action.payload };
    case "SET_Driver":
      return { ...state, driver: action.payload as unknown as [] };
    default:
      return state;
  }
};

const NewFilterPage = ({ modal, toggle, filteredData }: NewFilterPageProps) => {
  const [state, dispatch] = useReducer(formReducer, initialNewFilterPageState);
  const [filterValue, setFilterValue] = useState<any[]>([]);
  const [checkedCount, setCheckedCount] = useState(0);

  const handleCheckedBoxCounter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedCount(checkedCount + 1);
    } else {
      setCheckedCount(checkedCount - 1);
    }
  };

  const handleFilterData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (value.length > 2) {
      const filterText = filteredData.filter((item) => {
        return item.driverName.toLowerCase().includes(value);
      });
      setFilterValue(filterText);
    } else {
      return;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle} size="lg" backdrop="static">
        <ModalHeader toggle={toggle}>Edit Dispatched Board Filter</ModalHeader>
        <ModalBody>
          <Form className="load-item container p-4">
            Dispatcher: <span className="fw-bold">{"Ram kumar"}</span>
            <FormGroup>
              <Label for="exampleName">Name:</Label>
              <Input
                type="text"
                id="exampleName"
                name="name"
                bsSize="sm"
                className="form-control form-control-sm"
                value={state.name}
                onChange={(e) =>
                  dispatch({ type: "SET_Name", payload: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleDriver">Drivers:</Label>
              <Input
                id="exampleDriver"
                name="driver"
                type="text"
                bsSize="sm"
                className="form-control form-control-sm"
                placeholder="Search..."
                onChange={handleFilterData}
              />
            </FormGroup>
            {filterValue.map((item, index) => (
              <div key={index}>
                <Input type="checkbox" onChange={handleCheckedBoxCounter} />
                {item.driverName}
              </div>
            ))}
            <div>Selected {checkedCount}</div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button color="secondary" onClick={toggle}>
            Remove
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default NewFilterPage;

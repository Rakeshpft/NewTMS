import React from "react";
import { Col, Container, Row } from "reactstrap";
import Widget from "./widget";
import NavigationBar from "../navigation-bar";
import SalesOverview from "./sales-overview";

const DashboardPage = () => {
  return (
    <>
      <NavigationBar />
      <div className="dashboard-background">
        <Container>
          <Row>
            <h4 style={{ color: "#418ecb" }} className="pb-3">
              Dashboard
            </h4>
            <Col>
              <Widget
                variant="large"
                name="Loads"
                image="material-symbols_conveyor-belt"
                counter={70}
                icon="create-a-load"
                options={["Load 1", "Load 2"]}
              />
            </Col>
            <Col>
              <Widget
                variant="large"
                name="Drivers"
                image="healthicons_truck-driver"
                counter={23}
                icon="create-a-load"
                link="/driverpage"
                options={["Driver Page", "Driver 2"]}
              />
            </Col>
            <Col>
              <Widget
                variant="large"
                name="Partners"
                image="material-symbols_partner-exchange-rounded"
                counter={3}
                icon="create-a-load"
                options={["Partner 1", "Partner 2"]}
              />
            </Col>
            <Col>
              <Widget
                variant="large"
                name="Equipment"
                image="mdi_tools"
                counter={50}
                icon="create-a-load"
                options={["Equipment 1", "Equipment 2"]}
              />
            </Col>
          </Row>
          <Row className="mt-3 mb-4">
            <Col>
              <h4 style={{ color: "#418ecb" }} className="pb-3">
                Analytics
              </h4>
              <SalesOverview
                variant="wide"
                name="Sales Overview"
                image="Ic-Overview"
              />
            </Col>
            <Col>
              <h4 style={{ color: "#418ecb" }} className="pb-3">
                Manage
              </h4>
              <Row className="mb-3">
                <Col>
                  <SalesOverview
                    variant="normal"
                    name="Fuel"
                    image="maki_fuel"
                  />
                </Col>
                <Col>
                  <SalesOverview
                    variant="normal"
                    name="Driver Payroll"
                    image="solar_hand-money-linear"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <SalesOverview
                    variant="normal"
                    name="Accounts"
                    image="material-symbols_account-box"
                  />
                </Col>
                <Col>
                  <SalesOverview
                    variant="normal"
                    name="Reports"
                    image="carbon_report"
                  />
                </Col>
              </Row>
              <Row className="mt-5">
                <h4 style={{ color: "#418ecb" }} className="pb-2">
                  More
                </h4>
                <Col sm="3">
                  <SalesOverview
                    variant="small"
                    name="Users"
                    image="carbon_report"
                  />
                </Col>
                <Col sm="3">
                  <SalesOverview
                    variant="small"
                    name="Data Library"
                    image="solar_hand-money-linear"
                  />
                </Col>
                <Col sm="3">
                  <SalesOverview
                    variant="small"
                    name="Docs Exchange "
                    image="carbon_report"
                  />
                </Col>
                <Col sm="3">
                  <SalesOverview
                    variant="small"
                    name="IFTA"
                    image="solar_hand-money-linear"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default DashboardPage;

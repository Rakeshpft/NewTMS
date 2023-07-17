import React from "react";
import { Col, Container, Row } from "reactstrap";
import Widget from "./widget";
import NavigationBar from "../navigation-bar";
import SalesOverview from "./sales-overview";
import MoreWidget from "./more-widget";

const DashboardPage = () => {
  return (
    <>
      <NavigationBar />
      <div className="dashboard-background pb-1">
        <Container>
          <Row>
            <Row>
              <h4 style={{ color: "#418ecb" }} className="pb-3 mt-2">
                Dashboard
              </h4>
            </Row>
            <Col>
              <Widget
                variant="large"
                name="Loads"
                image="material-symbols_conveyor-belt"
                counter={70}
                icon={["create-a-load"]}
                options={["Create a Load", "View Existing Loads"]}
                cardCounter={[5, 12, 13]}
                cardName={["New", "En-Route", "Dilivered"]}
              />
            </Col>
            <Col>
              <Widget
                variant="large"
                name="Drivers"
                image="healthicons_truck-driver"
                counter={23}
                icon={["view-existing-loads"]}
                link="/driverpage"
                options={["Create a Profile", "View Driver"]}
                cardName={["New", "En-Route", "Dilivered"]}
              />
            </Col>
            <Col>
              <Widget
                variant="large"
                name="Partners"
                image="material-symbols_partner-exchange-rounded"
                counter={3}
                icon={["view-existing-loads"]}
                options={["Customer", "Vendors"]}
              />
            </Col>
            <Col>
              <Widget
                variant="large"
                name="Equipment"
                image="mdi_tools"
                counter={50}
                icon={["view-existing-loads"]}
                options={["Add Equipment", "View All Equipment"]}
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
                  <MoreWidget variant="small" name="Users" image="users" />
                </Col>
                <Col sm="3">
                  <MoreWidget
                    variant="small"
                    name="Data Library"
                    image="data-library"
                  />
                </Col>
                <Col sm="3">
                  <MoreWidget
                    variant="small"
                    name="Docs Exchange "
                    image="docs-exchange"
                  />
                </Col>
                <Col sm="3">
                  <MoreWidget variant="small" name="IFTA" image="agreement" />
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

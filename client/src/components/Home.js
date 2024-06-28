import React, { useState, useEffect } from "react";
import axios from 'axios';
import AssignmentList from './AssignmentList';

import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import Assigmentcreate from "./Assigmentcreate";

export default function App() {

  const [verticalActive, setVerticalActive] = useState("tab1");

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };

  return (
    <>
      <MDBRow>
        <MDBCol size="3">
          <MDBTabs className="flex-column text-center">
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab1")}
                active={verticalActive === "tab1"}
              >
                Admin Dashboard
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab2")}
                active={verticalActive === "tab2"}
              >
                Student
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab3")}
                active={verticalActive === "tab3"}
              >
                Projects view
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab4")}
                active={verticalActive === "tab4"}
              >
                Projects add
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>
        <MDBCol size="9">
          <MDBTabsContent>
            {/* <MDBTabsPane open={verticalActive === "tab1"}>
              Home content
            </MDBTabsPane> */}
            {/* <MDBTabsPane open={verticalActive === "tab2"}>
              Students
            </MDBTabsPane> */}
            <MDBTabsPane open={verticalActive === "tab3"}>
              <AssignmentList />
            </MDBTabsPane>
            <MDBTabsPane open={verticalActive === "tab4"}>
              <Assigmentcreate />
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
    </>
  );
}

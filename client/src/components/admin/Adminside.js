import React, { useState, useEffect } from "react";
import axios from 'axios';
import Home from "../../components/main/Home";
import Allstudents from './student/Allstudents';
import Allstaff from './staff/StaffAll';
import Addstaff from './staff/StaffAdd';
import CreateAssigment from './assigment/Createassigmnt';
import ViewAssigment from './assigment/ViewAssigment';
import AddMarksheet from './marksheet/Addmarks';
import ViewMarks from './marksheet/Marksheet';
import Createrubric from './markingrubric/Createmarkingrubric';
import Viewrubric from './markingrubric/Viewmarkingrubric';
import Studentdocnew from './exel/StudentReg';



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
                Students
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab3")}
                active={verticalActive === "tab3"}
              >
                Add Staff
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab4")}
                active={verticalActive === "tab4"}
              >
                Allocate Staff
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab5")}
                active={verticalActive === "tab5"}
              >
                Create Assigment
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab6")}
                active={verticalActive === "tab6"}
              >
                View Assigment
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab7")}
                active={verticalActive === "tab7"}
              >
                Add Marks
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab8")}
                active={verticalActive === "tab8"}
              >
                View Marks
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab9")}
                active={verticalActive === "tab9"}
              >
                Marking Rubrics
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab10")}
                active={verticalActive === "tab10"}
              >
                View Rubrics
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleVerticalClick("tab11")}
                active={verticalActive === "tab11"}
              >
                Student Management
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>
        <MDBCol size="9">
          <MDBTabsContent>
            <MDBTabsPane open={verticalActive === "tab1"}>
              <Home />
            </MDBTabsPane>
            <MDBTabsPane open={verticalActive === "tab2"}>
              <Allstudents />
            </MDBTabsPane>
            <MDBTabsPane open={verticalActive === "tab3"}>
              <Addstaff />
            </MDBTabsPane>
            <MDBTabsPane open={verticalActive === "tab4"}>
              <Allstaff />
            </MDBTabsPane>
            <MDBTabsPane open={verticalActive === "tab5"}>
              <CreateAssigment />
            </MDBTabsPane>
            <MDBTabsPane open={verticalActive === "tab6"}>
              <ViewAssigment />
            </MDBTabsPane>
            <MDBTabsPane open={verticalActive === "tab7"}>
              <AddMarksheet />
            </MDBTabsPane>
            <MDBTabsPane open={verticalActive === "tab8"}>
              <ViewMarks />
            </MDBTabsPane>
            <MDBTabsPane open={verticalActive === "tab9"}>
              <Createrubric />
            </MDBTabsPane>
            <MDBTabsPane open={verticalActive === "tab10"}>
              <Viewrubric />
            </MDBTabsPane>
            <MDBTabsPane open={verticalActive === "tab11"}>
              <Studentdocnew />
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
    </>
  );
}

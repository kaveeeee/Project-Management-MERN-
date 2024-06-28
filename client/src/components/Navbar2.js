import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse
} from 'mdb-react-ui-kit';

export default function App() {
  const [openNavExternal, setOpenNavExternal] = useState(false);

  return (
    <>
      <MDBCollapse open={openNavExternal}>
        <div className='bg-dark p-4'>
          <h5 className='text-white h4'>Welcome to Project Management Web</h5>
          <span className='text-muted'>Student can manage all  their projects here.</span>
        </div>
      </MDBCollapse>
      <MDBNavbar dark bgColor='dark'>
        <MDBContainer fluid>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarToggleExternalContent'
            aria-controls='navbarToggleExternalContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setOpenNavExternal(!openNavExternal)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
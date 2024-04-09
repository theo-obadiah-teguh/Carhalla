import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const handleClickLogin= () =>{
        navigate("/enterpassword")
    }
    const handleSignUp= () =>{
        navigate("/selectlot")
    }

    return (
        <nav class="navbar navbar-expand-md navbar-dark introNavbar">
          <div class="container-fluid">
              <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
              </div>

              <div class="mx-auto order-0 d-flex align-items-center">
                <h1 className="ms-0 hw text-white fw-bold my-4" style={{ whiteSpace: 'nowrap' }}>Carhalla Parking</h1>
              </div>
      
              <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <button className='btn btn-orange rounded-pill ms-auto px-5 mx-3 btn-primary' onClick={handleClickLogin}>For Supervisors</button>
                <button className='btn btn-orange rounded-pill px-5 mr-5 btn-primary' onClick={handleSignUp}>For Gate Staff</button>
              </div> 
          </div>
        </nav>
    );

}
 
export default Navbar;
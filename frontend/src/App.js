import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './LandingPage/LandingPage';
import "bootstrap/dist/css/bootstrap.min.css";
import EnterPassword from './Home/EnterPassword';
import SelectParkingLot from './Home/SelectParkingLot';
import Viewreservations from './LandingPage/ViewReservations';
import ManagementHome from './Manager/ManagementHome';
import ManageEmployees from './Manager/ManageEmployees';
import ManageBranches from './Manager/ManageBranches';
import CountByPlate from './Manager/CountByPlate';
import BusiestGate from './Manager/BusiestGate';
import MethodAmount from './Manager/MethodAmount';
import ClientSlots from './Manager/ClientSlotsTotal';
import GateAllPayments from './Manager/GateAllPayments';
import ProjectOnTable from './Manager/ProjectOnTable';
import ViewProjectedTable from './Manager/ViewProjectedTable';
import SelectOnStaff from './Manager/SelectOnStaff';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes> 

      <Routes>
        <Route path="/enterpassword" element={<EnterPassword />} />
      </Routes>  

      <Routes>
        <Route path="/selectlot" element={<SelectParkingLot />} />
      </Routes>

      <Routes>
        <Route path="/viewreservations" element={<Viewreservations />} />
      </Routes>

      <Routes>
        <Route path="/managementpanel" element={<ManagementHome />} />
      </Routes>

      <Routes>
        <Route path="/manageemployees" element={<ManageEmployees />} />
      </Routes>

      <Routes>
        <Route path="/methodamount" element={<MethodAmount />} />
      </Routes>

      <Routes>
        <Route path="/managebranches" element={<ManageBranches />} />
      </Routes>

      <Routes>
        <Route path="/countbyplate" element={<CountByPlate />} />
      </Routes>

      <Routes>
        <Route path="/busiestgate" element={<BusiestGate />} />
      </Routes>

      <Routes>
        <Route path="/branchslots" element={<ClientSlots />} />
      </Routes>

      <Routes>
        <Route path="/supportedgates" element={<GateAllPayments />} />
      </Routes>

      <Routes>
        <Route path="/projectontable" element={<ProjectOnTable />} />
      </Routes>

      <Routes>
        <Route path="/viewprojectedtable" element={<ViewProjectedTable />} />
      </Routes>

      <Routes>
        <Route path="/selectstaff" element={<SelectOnStaff />} />
      </Routes>

    </Router>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import AddSamples from "./pages/addSamples";
import SampleDetails from "./pages/SampleDetails";
import EditSample from "./pages/EditSample";
import UserDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/add-sample"
          element={<AddSamples />}
        />

        {/* User */}
        <Route
          path="/user"
          element={<UserDashboard />}
        />

        {/* Sample details */}
        <Route
          path="/samples/:id"
          element={<SampleDetails />}
        />

        {/* Edit sample */}
        <Route
          path="/samples/:id/edit"
          element={<EditSample />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
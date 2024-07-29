import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./Home";
import MyGigs from "./pages/MyGigs";
import AvailableGigs from "./pages/AvailableGigs";
import Earnings from "./pages/Earnings";
import Profile from "./pages/Profile";
import Preferences from "./pages/Preferences";
import KnowledgeBank from "./pages/KnowledgeBank";
import Support from "./pages/Support";
import Message from "./pages/Messages";
import PandaLogin from "./pages/PandaLogin";
import Sidebar from "./components/Sidebar";
import AddGig from "./pages/AddGig";
import AdminDashboard from "./pages/AdminDashboard.js"; // Import the AdminDashboard component
import "./App.css"; // Import the CSS for layout


function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="app">
      <Router>
        {isAuthenticated && <Sidebar />}
        <div className="content">
          <Routes>
            {/* Public Route */}
            {!isAuthenticated &&  <Route path="/" element={<PandaLogin />} /> }

            {/* Authenticated Routes */}
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/my-gigs" element={<MyGigs />} />
                <Route path="/available-gigs" element={<AvailableGigs />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/earnings" element={<Earnings />} />
                <Route path="/preferences" element={<AddGig />} />
                <Route path="/add-gig" element={<AddGig />} />
                {/* <Route path="/message" element={<Message />} /> */}
                <Route path="/knowledge-bank" element={<KnowledgeBank />} />
                <Route path="/support" element={<Support />} />
                <Route path="/message" element={<AdminDashboard />} />
              </>
            ) : (
              // Redirect to login page if not authenticated
              <Route path="*" element={<Navigate to="/" />} />
            )}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import "./App.css"; // Import the CSS for layout

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  console.log(isAuthenticated);
  return (
    <div className="app">
      <Router>
      {isAuthenticated && <Sidebar />}
        <div className="content">
          <Routes>
            <Route path="/my-gigs" element={<MyGigs />} />
            <Route path="/available-gigs" element={<AvailableGigs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/earnings" element={<Earnings />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/message" element={<Message />} />
            <Route path="/knowledge-bank" element={<KnowledgeBank />} />
            <Route path="/support" element={<Support />} />
            <Route path="/available-gigs" element={<AvailableGigs />} />
            {/* <Route path="/" element={<PandaLogin />} /> */}
            <Route path="/" element={isAuthenticated ? <Home /> : <PandaLogin />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";

import { GlobalCovidCases } from "./pages/GlobalCovidCases";
import { USCovidCases } from "./pages/USCovidCases";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/global-cases" element={<GlobalCovidCases />} />
          <Route exact path="/us-cases" element={<USCovidCases />} />
          <Route exact path="/" element={<Navigate to="/global-cases" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

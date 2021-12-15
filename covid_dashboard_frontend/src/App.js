import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";

import { GlobalCases } from "./pages/GlobalCases";
import { USCases } from "./pages/USCases";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/global-cases/*" element={<GlobalCases />}></Route>
          <Route exact path="/us-cases/" element={<USCases />} />
          <Route exact path="/" element={<Navigate to="global-cases" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

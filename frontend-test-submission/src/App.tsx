import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import Stats from "./components/Stats";
import RedirectPage from "./components/RedirectPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/:code" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}

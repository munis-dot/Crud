import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Manage from "./components/Manage";
import Delete from "./components/Delete";
import Read from "./components/Read";

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Manage />} />
          <Route path="/update" element={<Manage />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/read" element={<Read />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

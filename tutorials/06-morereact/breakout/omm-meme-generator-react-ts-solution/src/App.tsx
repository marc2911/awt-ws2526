import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import OmmMememuc from "./components/mememuc";
import Layout from "./pages/layout";
import { MemeHistory } from "./pages/memehistory";

const App: React.FC = () => {
  const [histories, setHistories] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<OmmMememuc />} />
          <Route
            path="histories"
            element={<MemeHistory histories={histories} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

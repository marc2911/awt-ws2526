import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import MyFirstPage from "./pages/MyFirstPage";
import MySecondPage from "./pages/MySecondPage";
import NoPage from "./pages/NoPage";
import SomeThirdPage from "./pages/SomeThirdPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MyFirstPage />} />
          <Route path="secondpage" element={<MySecondPage />} />
          <Route path="thirdpage" element={<SomeThirdPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import GlobalStyles from "./styles/GlobalStyles.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

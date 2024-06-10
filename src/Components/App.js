import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Weather from "./Weather";
import { useSelector } from "react-redux";

const App = () => {
  return(
    <div className={`app-section`}>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Weather />} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

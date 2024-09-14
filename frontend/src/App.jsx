import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Home from "./Pages/Home";
import Transfer from "./Pages/Transfer";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function App() {
  const [count, setCount] = useState(0);

  return (
    <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="transfer" element={<Transfer />} />
      </Routes>
    </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;

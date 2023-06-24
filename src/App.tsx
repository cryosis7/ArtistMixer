import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import SelectArtists from "./components/SelectArtists/SelectArtists";
import { NavigationBar, steps } from "./components/Navigation/NavigationBar";
import { DraftPlaylist } from "./components/RefinePlaylist/DraftPlaylist";
import { TempGeneratePlaylist } from "./components/GeneratePlaylist/TempGeneratePlaylist";

const App: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      setCode(code);
      console.log("Code: ", code);
    }
  }, []);

  const moveStep = (direction: "FORWARD" | "BACKWARD") => {
    if (activeStep < steps.length - 1 && direction === "FORWARD") {
      setActiveStep(activeStep + 1);
    } else if (activeStep > 0 && direction === "BACKWARD") {
      setActiveStep(activeStep - 1);
    }
  };

  const getContent = () => {
    if (steps[activeStep] === "SELECT ARTISTS") {
      return <SelectArtists moveStep={moveStep} />;
      // } else if (steps[activeStep] === 'REFINE PLAYLIST') {
      //   return <DraftPlaylist />
      // } else if (steps[activeStep] === 'GENERATE') {
      //   return <TempGeneratePlaylist />
    }
  };

  return (
    <BrowserRouter>
      <NavigationBar activeStep={activeStep} setActiveStep={setActiveStep} />

      <Routes>
        <Route path="/" element={getContent()} />
        <Route
          path="/login"
          element={<Login code={code} token={token} setToken={setToken} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

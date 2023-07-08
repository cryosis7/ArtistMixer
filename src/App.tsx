import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login";
import { NavigationBar, steps } from "./components/Navigation/NavigationBar";
import SelectArtists from "./components/SelectArtists/SelectArtists";
import {
  Playlist,
  PlaylistContract,
} from "./models/datacontracts/PlaylistContract";
import RefinePlaylist from "./components/RefinePlaylist/RefinePlaylist";

const App: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [playlist, setPlaylist] = useState<PlaylistContract>(new Playlist());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      setCode(code);
    }
  }, []);

  useEffect(() => {
    if (playlist.songs.length > 0) {
      setActiveStep(steps.indexOf("REFINE PLAYLIST"));
    } else {
      setActiveStep(steps.indexOf("SELECT ARTISTS"));
    }
  }, [playlist]);

  const moveStep = (direction: "FORWARD" | "BACKWARD") => {
    if (activeStep < steps.length - 1 && direction === "FORWARD") {
      setActiveStep(activeStep + 1);
    } else if (activeStep > 0 && direction === "BACKWARD") {
      setActiveStep(activeStep - 1);
    }
  };

  const getCurrentScreen = () => {
    if (steps[activeStep] === "SELECT ARTISTS") {
      return <SelectArtists moveStep={moveStep} setPlaylist={setPlaylist} />;
    } else if (steps[activeStep] === "REFINE PLAYLIST") {
      return (
        <RefinePlaylist
          playlist={playlist}
          setPlaylist={setPlaylist}
          setActiveStep={setActiveStep}
        />
      );
      // } else if (steps[activeStep] === 'GENERATE') {
      //   return <TempGeneratePlaylist />
    }
  };

  return (
    <BrowserRouter>
      <NavigationBar activeStep={activeStep} setActiveStep={setActiveStep} />

      <Routes>
        <Route path="/" element={getCurrentScreen()} />
        <Route
          path="/login"
          element={<Login code={code} token={token} setToken={setToken} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

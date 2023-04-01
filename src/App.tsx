import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { Login } from "./components/Login";
import { NavBar } from "./components/NavBar";
import { Search } from "./components/Search/Search";
import { RequireAuth } from "./components/RequireAuth";

const App: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      setCode(code);
      console.log("Code: ", code);
    }
  }, []);

  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage code={code} />} />
        <Route
          path="/login"
          element={<Login code={code} token={token} setToken={setToken} />}
        />
        <Route
          path="/search"
          element={
            <RequireAuth>
              <Search />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

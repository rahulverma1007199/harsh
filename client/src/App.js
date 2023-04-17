import React from "react";
import routes from "./routes/routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </StyledEngineProvider>
  );
};
export default App;

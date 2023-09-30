import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "./screens/Home";
import VCPage from "./screens/VC";
import Settings from "./screens/Settings";

// create browser router
const App = () => (
    <BrowserRouter basename="did-root-wallet">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vc" element={<VCPage />} />
            <Route path="/settings" element={<Settings />} />
        </Routes>
    </BrowserRouter>
);

// render app
ReactDOM.render(<App />, document.getElementById("root"));
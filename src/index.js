import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// screens
import Home from "./screens/Home";

// create browser router
const App = () => (
    <BrowserRouter basename="did-root-wallet">
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
);

// render app
ReactDOM.render(<App />, document.getElementById("root"));
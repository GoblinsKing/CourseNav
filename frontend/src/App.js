import "./App.css";
import React from "react";
import Login from "./pages/Login/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/home";
import Relationship_search from "./pages/Relationship_search/relationship_search";
import Relationship_display_dep from "./pages/Relationship_display/Relationship_display_dep";
import Relationship_display_pre from "./pages/Relationship_display/Relationship_display_pre";
import Advisor_search from "./pages/Advisor_search/advisor_search";
import Advisor_display from "./pages/Advisor_display/advisor_display";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => (
  <BrowserRouter key={"Browser Router"}>
    <Routes>
      <Route key={"Homepage"} path="/" element={<Home />} />
      <Route key={"LoginPage"} path="/login" element={<Login />} />
      <Route
        key={"Relationship search Page"}
        path="/couse_relationship_search"
        element={
          <PrivateRoute>
            <Relationship_search />
          </PrivateRoute>
        }
      />
      <Route
        key={"dispay for dependency"}
        path="/course_relationship_display_dep"
        element={<Relationship_display_dep />}
      />

      <Route
        key={"dispay for Prerequisite"}
        path="/course_relationship_display_pre"
        element={<Relationship_display_pre />}
      />
      <Route
        key={"advisor search"}
        path="/course_advisor_search"
        element={
          <PrivateRoute>
            <Advisor_search />
          </PrivateRoute>
        }
      />
      <Route
        key={"dispay for advisor"}
        path="/course_advisor_display"
        element={<Advisor_display />}
      />
    </Routes>
  </BrowserRouter>
);

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import PTODashboard from "../Dashboard/PTODashboard";
import BookingForm from "../BookingPage/BookingForm";
import LoginPage from "../Sign in/SignIn";

const Router: () => JSX.Element = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PTODashboard allowance={0} approved={0} awaitingApproval={0} />
          }
        />
        <Route path="/bookingForm" element={<BookingForm />} />
        <Route path="*" element={<div>404 Page Not Found!</div>} />
        <Route path="/signIn" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default Router;

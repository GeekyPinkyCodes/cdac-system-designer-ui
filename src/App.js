import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage";
import ForgetPasswordPage from "./Components/Login/ForgetPasswordPage";
import NewPasswordPage from "./Components/Login/NewPasswordPage";
import RegistrationPage from "./Components/Login/RegistrationPage";
import HomePage from "./Components/HomePage";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/forgot-password" element={<ForgetPasswordPage />} />
				<Route path="/new-password" element={<NewPasswordPage />} />
				<Route path="/register" element={<RegistrationPage />} />
			</Routes>
		</BrowserRouter>
	);
}

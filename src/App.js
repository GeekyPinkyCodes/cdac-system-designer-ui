import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import ForgetPasswordPage from "./Components/ForgetPasswordPage";
import NewPasswordPage from "./Components/NewPasswordPage";
import RegistrationPage from "./Components/RegistrationPage";
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

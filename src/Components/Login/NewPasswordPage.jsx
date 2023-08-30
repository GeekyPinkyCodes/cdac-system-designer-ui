import React, { useState } from "react";
import {
	TextField,
	Button,
	Container,
	Paper,
	Typography,
	CssBaseline,
	Avatar,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

const containerStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	minHeight: "100vh",
};

const paperStyle = {
	padding: "20px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	width: "100%",
	maxWidth: "400px",
};

const NewPasswordPage = () => {
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

	const handleSavePassword = async () => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (!user) {
			alert("User Not Found. Please login");
			navigate("/login");
		}

		if (newPassword === "" || confirmPassword === "") {
			alert("Password cannot be empty");
			return;
		}

		if (newPassword !== confirmPassword) {
			alert("New Password and Confirm Password Must Match.");
			return;
		}

		let result = await fetch("http://localhost:4000/users/" + user.id, {
			method: "PATCH",
			body: JSON.stringify({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				password: newPassword,
				phone: user.phone,
				country: user.country,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log(result);
		alert("Password Updated Successfully!");
		navigate("/login");
	};

	return (
		<Container component="main" maxWidth="xs" style={containerStyle}>
			<CssBaseline />
			<Paper elevation={3} style={paperStyle}>
				<Avatar style={{ backgroundColor: "#f50057" }}>
					<LockOpenOutlinedIcon />
				</Avatar>
				<Typography variant="h5" align="center">
					Set New Password
				</Typography>
				<form>
					<TextField
						label="New Password"
						variant="outlined"
						fullWidth
						margin="normal"
						type="password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
					<TextField
						label="Confirm Password"
						variant="outlined"
						fullWidth
						margin="normal"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<Button
						variant="contained"
						color="primary"
						fullWidth
						onClick={handleSavePassword}>
						Save Password
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default NewPasswordPage;

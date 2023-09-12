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
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const handleResetPassword = async () => {
		// Perform password reset logic here
		let response = await fetch(
			"http://localhost:4000/users/getByEmail/" + email
		);
		// You can perform actions like showing a success message or navigating to a different page
		if (response.status === 200) {
			const userData = await response.json();
			localStorage.setItem("user", JSON.stringify(userData));
			navigate("/new-password");
		} else {
			const errorData = await response.json();
			alert(errorData.error);
			console.error("Created New password error:", errorData.error);
		}
	};

	return (
		<Container component="main" maxWidth="xs" style={containerStyle}>
			<CssBaseline />
			<Paper elevation={3} style={paperStyle}>
				<Avatar style={{ backgroundColor: "#f50057" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5" align="center">
					Forgot Password
				</Typography>
				<Typography variant="body2" align="center">
					Enter your email to reset your password
				</Typography>
				<form>
					<TextField
						label="Email"
						variant="outlined"
						fullWidth
						margin="normal"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Button
						variant="contained"
						color="primary"
						fullWidth
						onClick={handleResetPassword}>
						Reset Password
					</Button>
					<Link to="/login" variant="body2" style={{ marginTop: "16px" }}>
						Back to Sign In
					</Link>
				</form>
			</Paper>
		</Container>
	);
};

export default ForgotPasswordPage;

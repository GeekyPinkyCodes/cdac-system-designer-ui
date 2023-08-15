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

	const handleSavePassword = () => {
		// Perform logic to save the new password here
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

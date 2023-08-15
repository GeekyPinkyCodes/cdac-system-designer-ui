import React, { useState } from "react";
import {
	TextField,
	Button,
	Container,
	Paper,
	Typography,
	CssBaseline,
	Avatar,
	Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

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
	maxWidth: "600px",
};

const iconStyle = {
	marginRight: "8px",
};

const RegistrationPage = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleRegister = () => {
		// Perform user registration logic here
	};

	return (
		<Container component="main" maxWidth="s" style={containerStyle}>
			<CssBaseline />
			<Paper elevation={3} style={paperStyle}>
				<Avatar style={{ backgroundColor: "#f50057" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5" align="center">
					Register
				</Typography>
				<form>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<TextField
								label="First Name"
								variant="outlined"
								fullWidth
								margin="normal"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								InputProps={{
									startAdornment: (
										<PersonOutlineOutlinedIcon style={iconStyle} />
									),
								}}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								label="Last Name"
								variant="outlined"
								fullWidth
								margin="normal"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								InputProps={{
									startAdornment: (
										<PersonOutlineOutlinedIcon style={iconStyle} />
									),
								}}
							/>
						</Grid>
					</Grid>
					<TextField
						label="Email"
						variant="outlined"
						fullWidth
						margin="normal"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						InputProps={{
							startAdornment: <EmailOutlinedIcon style={iconStyle} />,
						}}
					/>
					<TextField
						label="Phone Number"
						variant="outlined"
						fullWidth
						margin="normal"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						InputProps={{
							startAdornment: <PhoneOutlinedIcon style={iconStyle} />,
						}}
					/>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<TextField
								label="Password"
								variant="outlined"
								fullWidth
								margin="normal"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								InputProps={{
									startAdornment: <VpnKeyOutlinedIcon style={iconStyle} />,
								}}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								label="Confirm Password"
								variant="outlined"
								fullWidth
								margin="normal"
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								InputProps={{
									startAdornment: <VpnKeyOutlinedIcon style={iconStyle} />,
								}}
							/>
						</Grid>
					</Grid>
					<Button
						variant="contained"
						color="primary"
						fullWidth
						onClick={handleRegister}>
						Register
					</Button>
					<Typography align="center" style={{ marginTop: "16px" }}>
						Already registered?{" "}
						<Link to="/login" color="primary">
							<Button variant="contained" color="primary">
								Login
							</Button>
						</Link>
					</Typography>
				</form>
			</Paper>
		</Container>
	);
};

export default RegistrationPage;

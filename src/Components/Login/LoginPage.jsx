import React, { useState } from "react";
import {
	Container,
	Paper,
	Typography,
	TextField,
	Button,
	Grid,
	FormControl,
	InputAdornment,
	IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async () => {
		// Perform your login logic here
		let result = await fetch("http://localhost:4000/login", {
			method: "post",
			body: JSON.stringify({ email: username, password: password }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (result.status === 401) {
			alert("Invalid Email or Password!");
			return;
		}

		result = await result.json();
		localStorage.setItem("user", JSON.stringify(result));
		console.log(result);
		navigate("/");
	};

	const handlePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Container maxWidth="xs">
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				style={{ minHeight: "100vh" }}>
				<Paper elevation={3} style={{ padding: "20px", width: "100%" }}>
					<Typography variant="h5" align="center">
						Login
					</Typography>
					<form>
						<TextField
							label="Email"
							variant="outlined"
							fullWidth
							margin="normal"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Email />
									</InputAdornment>
								),
							}}
						/>
						<FormControl fullWidth variant="outlined" margin="normal">
							<TextField
								label="Password"
								variant="outlined"
								fullWidth
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Lock />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position="end">
											<IconButton onClick={handlePasswordVisibility} edge="end">
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</FormControl>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							onClick={handleLogin}>
							Login
						</Button>
						<Grid
							container
							justifyContent="space-between"
							style={{ marginTop: "16px" }}>
							<Grid item>
								<Link to="/forgot-password">Forgot Password?</Link>
							</Grid>
							<Grid item>
								<Link to="/register">
									<Button variant="contained" color="primary">
										Create Account
									</Button>
								</Link>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</Grid>
		</Container>
	);
};

export default LoginPage;

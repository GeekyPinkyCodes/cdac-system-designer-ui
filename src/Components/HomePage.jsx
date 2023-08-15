import React from "react";
import { Container, Paper, Typography, Button, Grid } from "@mui/material";

const HomePage = () => {
	return (
		<Container maxWidth="md">
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				style={{ minHeight: "100vh" }}>
				<Paper elevation={3} style={{ padding: "20px" }}>
					<Typography variant="h4" align="center" gutterBottom>
						Welcome to the System Designer App
					</Typography>
					<Typography variant="body1" paragraph>
						Design and create your systems with ease using our powerful System
						Designer App.
					</Typography>
					<Grid container spacing={2} justifyContent="center">
						<Grid item>
							<Button variant="contained" color="primary">
								Get Started
							</Button>
						</Grid>
						<Grid item>
							<Button variant="outlined" color="primary">
								Learn More
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Container>
	);
};

export default HomePage;

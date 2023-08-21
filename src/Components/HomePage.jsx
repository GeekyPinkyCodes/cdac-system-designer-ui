import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";
import ProjectWindow from "./ProjectWindow";

const HomePage = () => {
	const [userDetails, setUserDetails] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		// Fetch user details from localStorage using the 'user' key
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUserDetails(JSON.parse(storedUser));
		} else {
			navigate("/login");
		}
	}, []);

	return (
		<>
			<ResponsiveAppBar />
			<ProjectWindow />
		</>
	);
};

export default HomePage;

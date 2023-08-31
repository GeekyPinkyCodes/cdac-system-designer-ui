import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectAppBar from "./Project/ProjectAppBar";
import ProjectWindow from "./Project/ProjectWindow";
import { fetchProjectById, fetchUserById, saveProjectToDb } from "./utils";

const HomePage = () => {
	const [user, setUser] = useState(null);
	const [project, setProject] = useState(null);

	const navigate = useNavigate();

	const fetchAndLoadProject = async () => {
		const storedProject = localStorage.getItem("project");

		if (storedProject) {
			const parsedProject = JSON.parse(storedProject);
			const projectDetails = await fetchProjectById(parsedProject.id);
			localStorage.setItem("project", JSON.stringify(projectDetails));
			setProject(projectDetails);
		}
	};

	const fetchAndLoadUser = async () => {
		const storedUser = localStorage.getItem("user");
		console.log(storedUser);
		if (!storedUser) {
			navigate("/login");
			return;
		}
		const parsedUser = JSON.parse(storedUser);
		if (!parsedUser) {
			navigate("/login");
			return;
		}
		const userDetails = await fetchUserById(parsedUser.id);
		localStorage.setItem("user", JSON.stringify(userDetails));
		setUser(userDetails);
	};

	const handleOnUpdate = async (project) => {
		await saveProjectToDb(project);
		localStorage.setItem("project", JSON.stringify(project));
		setProject(project);
	};

	const handlerOnLoad = async (project) => {
		localStorage.setItem("project", JSON.stringify(project));
		setProject(project);
	};

	useEffect(() => {
		fetchAndLoadUser();
		fetchAndLoadProject();
	}, []);

	return (
		<>
			{user && (
				<ProjectAppBar user={user} project={project} onUpdate={handlerOnLoad} />
			)}
			{project != null && (
				<ProjectWindow project={project} onUpdate={handleOnUpdate} />
			)}
		</>
	);
};

export default HomePage;

import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import OpenProjectModal from "./OpenProjectModal";
import CreateProjectModal from "./CreateProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";

const settings = ["Profile", "Logout"];
const projectOptions = ["Create New", "Open", "Delete"];

function ResponsiveAppBar() {
	const [rerender, setRerender] = useState(false);
	const [currentProject, setCurrentProject] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [anchorProjectOptions, setAnchorProjectOptions] = useState(null);
	const [isOpenProjectModalOpen, setIsOpenProjectModalOpen] = useState(false);
	const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
		useState(false);
	const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] =
		useState(false);

	useEffect(() => {
		var currentProjectString = localStorage.getItem("CurrentProject");
		if (currentProjectString !== null && currentProjectString !== "") {
			setCurrentProject(JSON.parse(currentProjectString));
		}
	}, []);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleOpenProjectMenu = (event) => {
		setAnchorProjectOptions(event.currentTarget);
	};

	const handleCloseProjectMenu = (projectOption) => {
		if (projectOption === "Open") {
			console.log("Open Ho gya");
			handleOpenOpenProjectModal();
		} else if (projectOption === "Create New") {
			console.log("Create Ho gya");
			handleOpenCreateProjectModal();
		} else if (projectOption === "Delete") {
			console.log("Delete Ho gya");
			handleOpenDeleteProjectModal();
		}
		setAnchorProjectOptions(null);
	};

	const handleOpenOpenProjectModal = () => {
		setIsOpenProjectModalOpen(true);
		setRerender(!rerender);
	};

	const handleCloseOpenProjectModal = () => {
		setIsOpenProjectModalOpen(false);
		setRerender(!rerender);
	};

	const handleOpenCreateProjectModal = () => {
		setIsCreateProjectModalOpen(true);
	};

	const handleCloseCreateProjectModal = () => {
		setIsCreateProjectModalOpen(false);
	};

	const handleOpenDeleteProjectModal = () => {
		setIsDeleteProjectModalOpen(true);
	};

	const handleCloseDeleteProjectModal = () => {
		setIsDeleteProjectModalOpen(false);
	};

	return (
		<>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Project Options">
								<IconButton
									onClick={handleOpenProjectMenu}
									size="large"
									edge="start"
									color="inherit"
									aria-label="menu"
									sx={{ mr: 2 }}>
									<MenuIcon />
								</IconButton>

								<Menu
									sx={{ mt: "45px" }}
									id="menu-projectOptions"
									anchorEl={anchorProjectOptions}
									anchorOrigin={{
										vertical: "top",
										horizontal: "left",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "left",
									}}
									open={Boolean(anchorProjectOptions)}
									onClose={handleCloseProjectMenu}>
									{projectOptions.map((projectOption) => (
										<MenuItem
											key={projectOption}
											onClick={(event) => {
												handleCloseProjectMenu(projectOption);
											}}>
											<Typography textAlign="center">
												{projectOption}
											</Typography>
										</MenuItem>
									))}
								</Menu>
							</Tooltip>
						</Box>
						<Typography
							variant="h6"
							noWrap
							component="a"
							sx={{
								flexGrow: 1,
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "Calibri",
								fontWeight: 700,
								color: "inherit",
								textDecoration: "none",
							}}>
							Project : {currentProject && currentProject.name}
						</Typography>

						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							<Typography
								variant="h6"
								noWrap
								component="a"
								href="/"
								anchorOrigin={{
									vertical: "top",
									horizontal: "center",
								}}
								sx={{
									mr: 2,
									display: { xs: "none", md: "flex" },
									fontFamily: "Calibri",
									fontWeight: 700,
									color: "inherit",
									textDecoration: "none",
								}}>
								System Designer
							</Typography>
						</Box>

						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}>
								{settings.map((setting) => (
									<MenuItem key={setting} onClick={handleCloseUserMenu}>
										<Typography textAlign="center">{setting}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<OpenProjectModal
				isOpen={isOpenProjectModalOpen}
				onClose={handleCloseOpenProjectModal}
			/>
			<CreateProjectModal
				isOpen={isCreateProjectModalOpen}
				onClose={handleCloseCreateProjectModal}
			/>
			<DeleteProjectModal
				isOpen={isDeleteProjectModalOpen}
				onCancel={handleCloseDeleteProjectModal}
				project={currentProject}
			/>
		</>
	);
}
export default ResponsiveAppBar;

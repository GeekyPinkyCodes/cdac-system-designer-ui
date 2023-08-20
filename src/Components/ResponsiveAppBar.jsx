import * as React from "react";
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
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import SelectOrCreateProject from "./SelectOrCreateProject";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleCreateProject = (newProjectName) => {
		console.log("New project created:", newProjectName);
		// You can add your logic to update the project list or state here
	};

	return (
		<>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<FormatAlignJustifyIcon
							onClick={handleOpenModal}
							sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
						/>
						<Typography
							onClick={handleOpenModal}
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
							Projects
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
			<SelectOrCreateProject
				onCreate={handleCreateProject}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			/>
		</>
	);
}
export default ResponsiveAppBar;

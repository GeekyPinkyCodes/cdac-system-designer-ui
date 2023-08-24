import React, { useState } from "react";
import { Modal, TextField, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	modalContent: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		borderRadius: "8px",
	},
	textField: {
		marginBottom: theme.spacing(2),
	},
	button: {
		marginRight: theme.spacing(2),
	},
}));

const AddUnionModal = ({ open, onClose, onAdd }) => {
	const classes = useStyles();
	const [name, setName] = useState("");
	const [discriminator, setDiscriminator] = useState("");

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleDiscriminatorChange = (event) => {
		setDiscriminator(event.target.value);
	};

	const handleAddClick = () => {
		const newUnion = {
			name: name,
			discriminator: discriminator,
		};
		onAdd(newUnion);
		setName("");
		setDiscriminator("");
		onClose();
	};

	return (
		<Modal open={open} onClose={onClose} className={classes.modal}>
			<div className={classes.modalContent}>
				<TextField
					label="Name"
					variant="outlined"
					fullWidth
					className={classes.textField}
					value={name}
					onChange={handleNameChange}
				/>
				<TextField
					label="Discriminator"
					variant="outlined"
					fullWidth
					className={classes.textField}
					value={discriminator}
					onChange={handleDiscriminatorChange}
				/>
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={handleAddClick}>
					Add
				</Button>
				<Button variant="outlined" color="primary" onClick={onClose}>
					Cancel
				</Button>
			</div>
		</Modal>
	);
};

export default AddUnionModal;

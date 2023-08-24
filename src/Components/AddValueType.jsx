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

const AddValueTypeModal = ({ open, onClose, onAdd }) => {
	const classes = useStyles();
	const [name, setName] = useState("");
	const [baseType, setBaseType] = useState("");

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleBaseTypeChange = (event) => {
		setBaseType(event.target.value);
	};

	const handleAddClick = () => {
		const newValueType = {
			name: name,
			baseType: baseType,
		};
		onAdd(newValueType);
		setName("");
		setBaseType("");
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
					label="Base Type"
					variant="outlined"
					fullWidth
					className={classes.textField}
					value={baseType}
					onChange={handleBaseTypeChange}
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

export default AddValueTypeModal;

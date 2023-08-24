import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

const AddEnumerationModal = ({ open, onClose, onAdd }) => {
	const [name, setName] = useState("");
	const [isFinal, setIsFinal] = useState(false);
	const [isMutable, setIsMutable] = useState(false);
	const [isAppendArLf, setIsAppendArLf] = useState(false);
	const [isXCDRIXCDR2, setIsXCDRIXCDR2] = useState(false);
	const [isXCDR, setIsXCDR] = useState(false);
	const [isXCDR2, setIsXCDR2] = useState(false);

	const handleClose = () => {
		setName("");
		setIsFinal(false);
		setIsMutable(false);
		setIsAppendArLf(false);
		setIsXCDRIXCDR2(false);
		setIsXCDR(false);
		setIsXCDR2(false);
		onClose();
	};

	const handleAdd = () => {
		// Perform any validation here if needed

		// Prepare the selected data representations
		const selectedDataRepresentations = [];
		if (isXCDRIXCDR2) selectedDataRepresentations.push("XCDRIXCDR2");
		if (isXCDR) selectedDataRepresentations.push("XCDR");
		if (isXCDR2) selectedDataRepresentations.push("XCDR2");

		// Prepare other selected options
		const selectedOptions = {
			isFinal,
			isMutable,
			isAppendArLf,
			selectedDataRepresentations,
		};

		// Call the callback function to add the enumeration with selected options
		onAdd(name, selectedOptions);

		// Close the modal
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Add Enumeration</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Name"
					type="text"
					fullWidth
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<FormControlLabel
					control={
						<Checkbox checked={isFinal} onChange={() => setIsFinal(!isFinal)} />
					}
					label="@extensibility FINAL"
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={isMutable}
							onChange={() => setIsMutable(!isMutable)}
						/>
					}
					label="@extensibility MUTABLE"
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={isAppendArLf}
							onChange={() => setIsAppendArLf(!isAppendArLf)}
						/>
					}
					label="@extensibility APPENDARLF"
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={isXCDRIXCDR2}
							onChange={() => setIsXCDRIXCDR2(!isXCDRIXCDR2)}
						/>
					}
					label="@allowed-data-representation XCDRIXCDR2"
				/>
				<FormControlLabel
					control={
						<Checkbox checked={isXCDR} onChange={() => setIsXCDR(!isXCDR)} />
					}
					label="@allowed-data-representation XCDR"
				/>
				<FormControlLabel
					control={
						<Checkbox checked={isXCDR2} onChange={() => setIsXCDR2(!isXCDR2)} />
					}
					label="@allowed-data-representation XCDR2"
				/>
			</DialogContent>
			<div style={{ padding: "16px" }}>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleAdd} color="primary">
					Add
				</Button>
			</div>
		</Dialog>
	);
};

export default AddEnumerationModal;

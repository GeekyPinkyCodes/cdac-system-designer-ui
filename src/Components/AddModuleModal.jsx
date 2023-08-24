import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

const AddModuleModal = ({ open, onClose, onAdd }) => {
	const [moduleName, setModuleName] = useState("");
	const [autoId, setAutoId] = useState(false);
	const [transferModes, setTransferModes] = useState([]);
	const [languageBindings, setLanguageBindings] = useState([]);
	const [allowedDataRepresentations, setAllowedDataRepresentations] = useState(
		[]
	);

	const handleClose = () => {
		setModuleName("");
		setAutoId(false);
		setTransferModes([]);
		setLanguageBindings([]);
		setAllowedDataRepresentations([]);
		onClose();
	};

	const handleAdd = () => {
		// Perform any validation here if needed

		// Prepare the selected options
		const selectedOptions = {
			autoId,
			transferModes,
			languageBindings,
			allowedDataRepresentations,
		};

		// Call the callback function to add the module with selected options
		onAdd(moduleName, selectedOptions);

		// Close the modal
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Add Module</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="moduleName"
					label="Module Name"
					type="text"
					fullWidth
					value={moduleName}
					onChange={(e) => setModuleName(e.target.value)}
				/>
				<FormControlLabel
					control={
						<Checkbox checked={autoId} onChange={() => setAutoId(!autoId)} />
					}
					label="@autoid"
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={transferModes.includes("INBAND")}
							onChange={() =>
								setTransferModes(
									transferModes.includes("INBAND")
										? transferModes.filter((mode) => mode !== "INBAND")
										: [...transferModes, "INBAND"]
								)
							}
						/>
					}
					label="@transfer_mode INBAND"
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={transferModes.includes("SHMEM_REF")}
							onChange={() =>
								setTransferModes(
									transferModes.includes("SHMEM_REF")
										? transferModes.filter((mode) => mode !== "SHMEM_REF")
										: [...transferModes, "SHMEM_REF"]
								)
							}
						/>
					}
					label="@transfer_mode SHMEM_REF"
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={languageBindings.includes("PLAIN")}
							onChange={() =>
								setLanguageBindings(
									languageBindings.includes("PLAIN")
										? languageBindings.filter((binding) => binding !== "PLAIN")
										: [...languageBindings, "PLAIN"]
								)
							}
						/>
					}
					label="@language_binding PLAIN"
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={languageBindings.includes("FLAT_DATA")}
							onChange={() =>
								setLanguageBindings(
									languageBindings.includes("FLAT_DATA")
										? languageBindings.filter(
												(binding) => binding !== "FLAT_DATA"
										  )
										: [...languageBindings, "FLAT_DATA"]
								)
							}
						/>
					}
					label="@language_binding FLAT_DATA"
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={allowedDataRepresentations.includes("XCDRIXCDR2")}
							onChange={() =>
								setAllowedDataRepresentations(
									allowedDataRepresentations.includes("XCDRIXCDR2")
										? allowedDataRepresentations.filter(
												(rep) => rep !== "XCDRIXCDR2"
										  )
										: [...allowedDataRepresentations, "XCDRIXCDR2"]
								)
							}
						/>
					}
					label="@allowed-data-representation XCDRIXCDR2"
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={allowedDataRepresentations.includes("XCDR")}
							onChange={() =>
								setAllowedDataRepresentations(
									allowedDataRepresentations.includes("XCDR")
										? allowedDataRepresentations.filter((rep) => rep !== "XCDR")
										: [...allowedDataRepresentations, "XCDR"]
								)
							}
						/>
					}
					label="@allowed-data-representation XCDR"
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={allowedDataRepresentations.includes("XCDR2")}
							onChange={() =>
								setAllowedDataRepresentations(
									allowedDataRepresentations.includes("XCDR2")
										? allowedDataRepresentations.filter(
												(rep) => rep !== "XCDR2"
										  )
										: [...allowedDataRepresentations, "XCDR2"]
								)
							}
						/>
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

export default AddModuleModal;

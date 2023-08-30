import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { addChildNode } from "../../utils";

const AddTypedefModal = ({ xmlDoc, selectedNode, open, onClose, onAdd }) => {
	const [typedefName, setTypedefName] = useState("");
	const [type, setType] = useState("");

	const handleClose = () => {
		setTypedefName("");
		setType("");
		onClose();
	};

	const addTypedef = async (name, value) => {
		console.log(name, value);

		// Modify xmlDoc and build the new XML content
		const newNode = xmlDoc.createElement("typedef");
		newNode.setAttribute("name", name);
		newNode.setAttribute("value", value);

		var xmlString = addChildNode(xmlDoc, selectedNode, newNode);
		onAdd(xmlString);
	};

	const handleAdd = () => {
		// Perform any validation here if needed

		// Call the callback function to add the typedef
		addTypedef(typedefName, type);

		// Close the modal
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Add Typedef</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="typedefName"
					label="Typedef Name"
					type="text"
					fullWidth
					value={typedefName}
					onChange={(e) => setTypedefName(e.target.value)}
				/>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth margin="normal">
						<InputLabel>Type</InputLabel>
						<Select value={type} onChange={(e) => setType(e.target.value)}>
							<MenuItem value="string">String</MenuItem>
							<MenuItem value="NewEnum1">NewEnum1</MenuItem>
							<MenuItem value="NewEnum2">NewEnum2</MenuItem>
							<MenuItem value="NewStruct1">NewStruct1</MenuItem>
							<MenuItem value="boolean">Boolean</MenuItem>
							<MenuItem value="byte">Byte</MenuItem>
							<MenuItem value="int8">Int8</MenuItem>
							<MenuItem value="uint8">Uint8</MenuItem>
							<MenuItem value="char8">Char8</MenuItem>
							<MenuItem value="char16">Char16</MenuItem>
							<MenuItem value="int16">Int16</MenuItem>
							<MenuItem value="uint16">Uint16</MenuItem>
							<MenuItem value="int32">Int32</MenuItem>
							<MenuItem value="uint32">Uint32</MenuItem>
							<MenuItem value="int64">Int64</MenuItem>
							<MenuItem value="uint64">Uint64</MenuItem>
							<MenuItem value="float32">Float32</MenuItem>
							<MenuItem value="float64">Float64</MenuItem>
							<MenuItem value="float128">Float128</MenuItem>
							<MenuItem value="wstring">Wstring</MenuItem>
							<MenuItem value="HostType">HostType</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<TextField
					margin="dense"
					id="type"
					label="Type"
					type="text"
					fullWidth
					value={type}
					onChange={(e) => setType(e.target.value)}
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

export default AddTypedefModal;

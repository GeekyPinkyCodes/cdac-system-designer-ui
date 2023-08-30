import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Grid } from "@mui/material";
import {
	addChildNode,
	findNodeByAttribute,
	findNodeByAttributeAndAddChild,
	findNodeByNodeNameAndAddChild,
} from "../../utils";

const modalPaperStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600, // Adjusted width
	maxHeight: "80vh", // Adjusted height to 80% of the viewport height
	padding: 20,
	backgroundColor: "white",
	outline: "none",
	overflowY: "auto", // Scrollable content
};

const AddConstantModal = ({ xmlDoc, selectedNode, isOpen, onClose, onAdd }) => {
	const [constantName, setConstantName] = useState("");
	const [constantType, setConstantType] = useState("");
	const [constantValue, setConstantValue] = useState("");
	const [error, setError] = useState(null);

	const handleAdd = () => {
		// Validate data if needed
		var existingNode = findNodeByAttribute(selectedNode, "name", constantName);

		if (existingNode) {
			setError("Const with same name already exists");
			return;
		}

		// Call the onAdd callback with the new constant data
		addConstant(constantName, constantType, constantValue);
		// Reset fields and close the modal
		setConstantName("");
		setConstantType("");
		setConstantValue("");
		setError(null);
		onClose();
	};

	const handleCancel = () => {
		setConstantName("");
		setConstantType("");
		setConstantValue("");
		setError(null);
		onClose();
	};

	const addConstant = async (name, type, value) => {
		console.log(name, type, value);
		// Modify xmlDoc and build the new XML content
		const newNode = xmlDoc.createElement("const");
		newNode.setAttribute("name", name);
		newNode.setAttribute("type", type);
		newNode.setAttribute("value", value);

		// Find the <types> element and append the new const node
		var xmlString = addChildNode(xmlDoc, selectedNode, newNode);
		onAdd(xmlString);
	};

	return (
		<Modal open={isOpen} onClose={handleCancel}>
			<div style={modalPaperStyle}>
				<div className="modal">
					<h2>Add Constant</h2>
					<p style={{ color: "red" }}>{error}</p>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								label="Name"
								value={constantName}
								onChange={(e) => setConstantName(e.target.value)}
								fullWidth
								margin="normal"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth margin="normal">
								<InputLabel>Type</InputLabel>
								<Select
									value={constantType}
									onChange={(e) => setConstantType(e.target.value)}>
									<MenuItem value="string">String</MenuItem>
									<MenuItem value="number">Number</MenuItem>
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
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								label="Value"
								value={constantValue}
								onChange={(e) => setConstantValue(e.target.value)}
								fullWidth
								margin="normal"
							/>
						</Grid>
						<Grid item xs={8} flexGrow>
							<div
								style={{
									display: "flex",
									justifyContent: "flex-end",
									marginTop: 20,
								}}>
								<Button variant="contained" onClick={handleAdd}>
									Add
								</Button>
								<Button
									variant="outlined"
									onClick={handleCancel}
									style={{ marginLeft: 20 }}>
									Cancel
								</Button>
							</div>
						</Grid>
					</Grid>
				</div>
			</div>
		</Modal>
	);
};

export default AddConstantModal;

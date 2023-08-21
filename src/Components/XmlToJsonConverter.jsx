import React, { useEffect, useState } from "react";
import { Button, Paper, Typography, TextField } from "@mui/material";
import { parseString } from "xml2js";

const XmlToJsonConverter = ({ xmlContent }) => {
	const [jsonContent, setJsonContent] = useState("");

	useEffect(() => {
		convertXmlToJson();
	}, []);

	const convertXmlToJson = () => {
		parseString(xmlContent, { explicitArray: false }, (err, result) => {
			if (err) {
				console.error("Error parsing XML:", err);
				return;
			}

			setJsonContent(JSON.stringify(result, null, 2));
		});
	};

	return (
		<div>
			{jsonContent && (
				<Paper elevation={3} style={{ padding: "16px", marginTop: "16px" }}>
					<pre>{jsonContent}</pre>
				</Paper>
			)}
		</div>
	);
};

export default XmlToJsonConverter;

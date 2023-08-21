import React, { useEffect, useState } from "react";
import { parseString } from "xml2js";

const XmlToJsonConverter = ({ xmlContent }) => {
	const [jsonContent, setJsonContent] = useState("");

	useEffect(() => {
		const convertXmlToJson = () => {
			parseString(xmlContent, { explicitArray: false }, (err, result) => {
				if (err) {
					console.error("Error parsing XML:", err);
					return;
				}

				setJsonContent(JSON.stringify(result, null, 2));
			});
		};
		convertXmlToJson();
	}, []);

	return <div>{jsonContent && <pre>{jsonContent}</pre>}</div>;
};

export default XmlToJsonConverter;

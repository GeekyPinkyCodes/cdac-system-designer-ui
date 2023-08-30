import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
	}, [xmlContent]);

	return (
		<div>
			{jsonContent && (
				<SyntaxHighlighter language="js" style={materialDark}>
					{jsonContent}
				</SyntaxHighlighter>
			)}
		</div>
	);
};

export default XmlToJsonConverter;

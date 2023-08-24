import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import xmlFormatter from "xml-formatter";

const XmlView = ({ language, code }) => {
	const formattedXml = xmlFormatter(code, {
		indentation: "  ", // Set the desired indentation (e.g., two spaces)
		collapseContent: true, // Collapse empty elements
	});
	return (
		<SyntaxHighlighter language={language} style={materialDark}>
			{formattedXml}
		</SyntaxHighlighter>
	);
};

export default XmlView;

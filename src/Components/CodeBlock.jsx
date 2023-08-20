import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ language, code }) => {
	return (
		<SyntaxHighlighter language={language} style={xonokai}>
			{code}
		</SyntaxHighlighter>
	);
};

export default CodeBlock;

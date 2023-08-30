import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { parseString } from "xml2js";

const XmlToIdlConverter = ({ xmlContent }) => {
	const [idlCode, setIdlCode] = useState("");

	useEffect(() => {
		convertXmlToIdl(xmlContent);
	}, []);

	const convertXmlToIdl = (xmlData) => {
		parseString(xmlData, { explicitArray: false }, (err, result) => {
			if (err) {
				console.error("Error parsing XML:", err);
				return;
			}

			let generatedIdlCode = "";

			if (result.types) {
				if (result.types.const) {
					if (Array.isArray(result.types.const)) {
						result.types.const.forEach((constElement) => {
							generatedIdlCode += `const ${constElement.$.name}: ${constElement.$.type} = ${constElement.$.value};\n`;
						});
					} else {
						generatedIdlCode += `const ${result.types.const.$.name}: ${result.types.const.$.type} = ${result.types.const.$.value};\n`;
					}
				}

				if (result.types.enum) {
					if (Array.isArray(result.types.enum)) {
						result.types.enum.forEach((enumElement) => {
							if (enumElement.$.extensibility) {
								generatedIdlCode += `@extensibility(${enumElement.$.extensibility})\n`;
							}

							if (enumElement.$.allowed_data_representation)
								generatedIdlCode += `@allowed_data_representation(${enumElement.$.allowed_data_representation})\n`;

							generatedIdlCode += `enum ${enumElement.$.name}{\n};\n`;
						});
					} else {
						if (result.types.enum.$.extensibility) {
							generatedIdlCode += `@extensibility(${result.types.enum.$.extensibility})\n`;
						}

						if (result.types.enum.$.allowed_data_representation)
							generatedIdlCode += `@allowed_data_representation(${result.types.enum.$.allowed_data_representation})\n`;

						generatedIdlCode += `enum ${result.types.enum.$.name}{\n};\n`;
					}
				}

				if (result.types.module) {
					if (Array.isArray(result.types.module)) {
						result.types.module.forEach((moduleElement) => {
							generatedIdlCode += `module ${moduleElement.$.name} {\n`;

							if (moduleElement.element) {
								if (Array.isArray(moduleElement.element)) {
									moduleElement.element.forEach((nestedElement) => {
										generatedIdlCode +=
											convertNestedElementToIdl(nestedElement);
									});
								} else {
									generatedIdlCode += convertNestedElementToIdl(
										moduleElement.element
									);
								}
							}

							generatedIdlCode += `};\n`;
						});
					} else {
						generatedIdlCode += `module ${result.types.module.$.name} {\n`;
						if (result.types.module.element) {
							generatedIdlCode += convertNestedElementToIdl(
								result.types.module.element
							);
						}
						generatedIdlCode += `};\n`;
					}
				}
			}

			setIdlCode(generatedIdlCode);
		});
	};

	const convertNestedElementToIdl = (element) => {
		let idlCode = "";

		switch (element.$.type) {
			case "enum":
				idlCode += `  enum ${element.$.name} {\n`;
				if (element.value) {
					element.value.forEach((enumValue) => {
						idlCode += `    ${enumValue.$.name},\n`;
					});
				}
				idlCode += `  };\n`;
				break;
			case "struct":
				idlCode += `  struct ${element.$.name} {\n`;
				if (element.field) {
					element.field.forEach((field) => {
						idlCode += `    ${field.$.type} ${field.$.name};\n`;
					});
				}
				idlCode += `  };\n`;
				break;
			// Handle other element types as needed
			default:
				// Handle unsupported element types or add custom logic
				break;
		}

		return idlCode;
	};

	return (
		<div>
			{idlCode && (
				<SyntaxHighlighter language="js" style={materialDark}>
					{idlCode}
				</SyntaxHighlighter>
			)}
		</div>
	);
};

export default XmlToIdlConverter;

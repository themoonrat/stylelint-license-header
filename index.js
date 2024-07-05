const stylelint = require("stylelint");

const ruleName = "license-header/license-header";
const messages = stylelint.utils.ruleMessages(ruleName, {
	missing: "Missing license header",
	incorrect: "Incorrect license header",
});

module.exports = stylelint.createPlugin(ruleName, (actual, options = {}, context) => {
	return (root, result) => {
		const validOptions = stylelint.utils.validateOptions(
			result,
			ruleName,
			{ actual },
			{
				actual: options,
				possible: {
					license: (v) => typeof v === "string",
				},
				optional: false,
			},
		);

		if (!validOptions) {
			return;
		}

		const disableFix = options.disableFix || false;
		const isFixEnabled = context.fix && !disableFix;

		const firstNode = root.first;

		if (firstNode && firstNode.type === "comment") {
			const commentText = firstNode.text.trim();
			const licenseText = options.license.trim();

			if (commentText === licenseText) {
				// License header is correct
				return;
			} else {
				if (isFixEnabled) {
					// Don't report, fix will be applied
					firstNode.remove();
				} else {
					stylelint.utils.report({
						message: messages.incorrect,
						node: firstNode,
						result,
						ruleName,
					});
				}
			}
		} else {
			// No comment found at the top
			if (!isFixEnabled) {
				stylelint.utils.report({
					message: messages.missing,
					node: root,
					result,
					ruleName,
				});
			}
		}

		if (!isFixEnabled) {
			return;
		}

		// Add license header comment
		const licenseComment = `/*${options.license}*/`;
		root.prepend(licenseComment);

		// Add space before next block
		const nextChild = root.nodes[1];
		if (nextChild) {
			const newline = context.newline;

			existingBefore = nextChild.raws.before || "";
			nextChild.raws.before = newline + newline + existingBefore;
		}
	};
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;

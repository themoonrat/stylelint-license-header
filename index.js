const stylelint = require('stylelint')

const ruleName = 'kuali/license-header'
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: 'Missing or incorrect license header',
})

module.exports = stylelint.createPlugin(ruleName, (actual, options = {}, context) => {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(
      result,
      ruleName,
      { actual },
      {
				actual: options,
				possible: {
					license: v => typeof v === 'string'
				},
				optional: false
			}
		)

		if (!validOptions) {
			return
		}

    const disableFix = options.disableFix || false
    const isFixEnabled = context.fix && !disableFix
    let isLicenseHeaderPresent = false

    root.walkComments(comment => {
      commentIsFirst = comment === comment.parent.first

      if (commentIsFirst) {
        const commentText = comment.text.trim()
        const licenseText = options.license.trim()
        if (commentText === licenseText) {
          isLicenseHeaderPresent = true
          return
        } else {
          if (isFixEnabled) {
            // Don't report, fix will be applied
            comment.remove()
          } else {
            stylelint.utils.report({
              message: messages.rejected,
              node: comment,
              result,
              ruleName,
            })
          }
        }
      }
    })

    if (!isLicenseHeaderPresent && isFixEnabled) {
      const newline = context.newline

      // Add license header comment
      const licenseComment = `/*${options.license}*/`
      root.prepend(licenseComment)

      // Add space before next block
      const nextChild = root.nodes[1]
      if (nextChild) {
        existingBefore = nextChild.raws.before || ''
        nextChild.raws.before = newline + newline + existingBefore 
      }
    }
  }
})

module.exports.ruleName = ruleName
module.exports.messages = messages

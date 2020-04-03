# stylelint-license-header

A [Stylelint](https://stylelint.io/) plugin to enforce (and fix/update) a required header comment for license/copyright information in CSS files.

## Install

Follow instructions for installation and setup of [Stylelint](https://stylelint.io/).

Then install this plugin with yarn or npm:

```
yarn add --dev stylelint-license-header
```

```
npm add --save-dev stylelint-license-header
```

## Setup

Set up in `.stylelintrc`:

```
{
  "plugins": [
    "stylelint-license-header"
	],
  "rules": {
    "kuali/license-header": [true, {
      "license": "Copyright 2016-2020 MyCompany Inc."
    }]
  }
}
```

Pass a *string* into the `license` option. This string will be placed into a comment (`/* yourStringHere */`) and compared against the first comment of each linted file.

This plugin supports autofixing. When you pass the `--fix` option to Stylelint, the given license header will be added at the top of any files that are missing it. If there is already a comment at the top of the file, the license header comment will replace it.

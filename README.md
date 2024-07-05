# stylelint-license-header

A [Stylelint](https://stylelint.io/) plugin to enforce (and fix/update) a required header comment for license/copyright information in CSS files.

## Install

Follow instructions for installation and setup of [Stylelint](https://stylelint.io/).

Then install this plugin with yarn or npm:

```
yarn add --dev @themoonrat/stylelint-license-header
```

```
npm add --save-dev @themoonrat/stylelint-license-header
```

## Setup

Set up in `.stylelintrc`:

```
{
  "plugins": [
    "@themoonrat/stylelint-license-header"
  ],
  "rules": {
    "license-header/license-header": [
	  true,
	  {
        "license": "Copyright 2020-2024 MyCompany Inc."
      }
    ]
  }
}
```

Pass a *string* into the `license` option. This string will be placed into a comment (`/* yourStringHere */`) and compared against the top of each linted file.

This plugin supports autofixing. When you pass the `--fix` option to Stylelint, the given license header will be added at the top of any files that are missing it.

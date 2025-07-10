/** @type {import('stylelint').Config} */
export default {
  extends: ['@gx-web/stylelint-config'],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: [/deep/, /global/, /export/] }
    ],
    'property-no-unknown': [true, { ignoreProperties: [/namespace/] }]
  }
}

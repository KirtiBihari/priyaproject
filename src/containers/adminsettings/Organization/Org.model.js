export const formFields = {
  ui_orgCode: {
    id: 'ui_orgCode',
    type: 'input',
    value: '',
    label: 'Organization ID',
    form: 'add',
    validation: {
      required: true,
      minLength: 5
    },
    valid: false,
    touched: false,
    validationMessage: ''
  },
  ui_orgName: {
    id: 'ui_orgName',
    type: 'input',
    value: '',
    label: 'Organization Name',
    form: 'add',
    validation: {
      required: true,
      minLength: 5
    },
    valid: false,
    touched: false,
    validationMessage: ''
  },
  ui_createdBy: {
    id: 'ui_createdBy',
    type: 'hidden',
    value: '',
    label: 'Created By',
    form: 'add',
    validation: {
      required: true
    },
    valid: false,
    touched: false,
    validationMessage: ''
  }
};
export const orgSettingsFields = {
  timezone: {
    id: 'timezone',
    type: 'autocomplete',
    value: '',
    color: 'primary',
    icon: 'clock-o',
    label: 'Time Zone',

    validation: {
      required: false
    },
    valid: false,
    touched: false,
    validationMessage: ''
  }
};

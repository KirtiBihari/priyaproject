export const formFields = {
  ui_unitCode: {
    id: 'ui_unitCode',
    type: 'input',
    value: '',
    label: 'Function ID',
    form: 'add',
    validation: {
      required: true,
      minLength: 5,
    },
    valid: false,
    touched: false,
    validationMessage: ''
  },
  ui_unitName: {
    id: 'ui_unitName',
    type: 'input',
    value: '',
    label: 'Function Name',
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
export const unitSettingsFields = {
  ui_org: {
    id: 'ui_org',
    type: 'select',
    value: '',
    label: 'Organization',
    form: 'add',
    color: 'primary',
    multiple: true,
    search: true,
    selected:'',
    validation: {
      required: true
    },
    valid: false,
    touched: false,
    validationMessage: '',
    options: []
  }
};

export const selectOptions = options => {
  return options.map(opt => {
    return {
      checked: false,
      disabled: false,
      value: opt.value,
      text: opt.text
    };
  });
};

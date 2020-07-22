export const formFields = {
  ui_entityCode: {
    id: 'ui_entityCode',
    type: 'input',
    value: '',
    label: 'Line Of Business ID',
    form: 'add',
    validation: {
      required: true,
      minLength: 5,
    },
    valid: false,
    touched: false,
    validationMessage: ''
  },
  ui_entityName: {
    id: 'ui_entityName',
    type: 'input',
    value: '',
    label: 'Line Of Business Name',
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
export const entitySettingsFields = {
  ui_unit: {
    id: 'ui_unit',
    type: 'select',
    value: '',
    label: 'Function',
    form: 'add',
    color: 'primary',
    selected:'',
    multiple: true,
    search: true,
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

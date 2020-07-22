export const formFields = {
  ui_processCode: {
    id: 'ui_processCode',
    type: 'input',
    value: '',
    label: 'App ID',
    form: 'add',
    validation: {
      required: true,
      minLength: 5,
    },
    valid: false,
    touched: false,
    validationMessage: '',
  },
  ui_processName: {
    id: 'ui_processName',
    type: 'input',
    value: '',
    label: 'App Name',
    form: 'add',
    validation: {
      required: true,
      minLength: 5,
    },
    valid: false,
    touched: false,
    validationMessage: '',
  },
};

export const entitySettingsFields = {
  ui_entity: {
    id: 'ui_entity',
    type: 'select',
    value: '',
    label: 'Line Of Business',
    form: 'entity',
    color: 'primary',
    multiple: true,
    search: true,
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
    validationMessage: '',
    options: [],
    selected: '',
  },
};

export const processSettingsFields = {
  sla: {
    id: 'sla',
    type: 'input',
    value: '',
    color: '',
    label: 'SLA',
    form: 'setting',
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
    validationMessage: '',
  },
  priority_sla: {
    id: 'priority_sla',
    type: 'input',
    value: '',
    color: '',
    label: 'Follow Up (Hours)',
    form: 'setting',
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
    validationMessage: '',
  },
  audit: {
    id: 'audit',
    type: 'input',
    value: '',
    color: '',
    label: 'Audit',
    form: 'setting',
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
    validationMessage: '',
  },
};

export const selectOptions = options => {
  return options.map (opt => {
    return {
      checked: false,
      disabled: false,
      value: opt.value,
      text: opt.text,
    };
  });
};

export const formFields = {
  ui_subProcessCode: {
    id: 'ui_subProcessCode',
    type: 'input',
    value: '',
    label: 'Sub-Process ID',
    form: 'add',
    validation: {
      required: true,
      minLength: 5
    },
    valid: false,
    touched: false,
    validationMessage: ''
  },
  ui_subProcessName: {
    id: 'ui_subProcessName',
    type: 'input',
    value: '',
    label: 'Sub-Process Name',
    form: 'add',
    validation: {
      required: true,
      minLength: 5
    },
    valid: false,
    touched: false,
    validationMessage: ''
  }
};

export const processSettingsFields = {
  ui_process : {
    id: 'ui_process',
    type: 'select',
    value: '',
    label: 'Process',
    form: 'process',
    color: 'primary',
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


export const subProcessSettingsFields = {
  sla: {
    id: 'sla',
    type: 'input',
    value: '',
    color: '',
    label: 'SLA',
    form: 'setting',
    validation: {
      required: true
    },
    valid: false,
    touched: false,
    validationMessage: ''
  },
  priority_sla: {
    id: 'priority_sla',
    type: 'input',
    value: '',
    color: '',
    label: 'Priority SLA',
    form: 'setting',
    validation: {
      required: true
    },
    valid: false,
    touched: false,
    validationMessage: ''
  },
  audit: {
    id: 'audit',
    type: 'input',
    value: '',
    color: '',
    label: 'Audit',
    form: 'setting',
    validation: {
      required: true
    },
    valid: false,
    touched: false,
    validationMessage: ''
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
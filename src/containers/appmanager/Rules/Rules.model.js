export const formFields = {
    ui_rulesCode: {
      id: 'ui_rulesCode',
      type: 'input',
      value: '',
      label: 'Rules ID',
      form: 'add',
      validation: {
        required: true,
        minLength: 5
      },
      valid: false,
      touched: false,
      validationMessage: ''
    },
    ui_rulesName: {
      id: 'ui_rulesName',
      type: 'input',
      value: '',
      label: 'Rules Name',
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
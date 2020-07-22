const doValidation = element => {
  let isValid = true;
  const rules = element.validation;
  const value = element.value;
  let error = [isValid, ''];
  if (!rules) {
    return true;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength;
    const message = `${
      !isValid ? element.label + ' should be atleast ' + element.validation.minLength + ' characters.': ''
    }`;
    error = !isValid ? [isValid, message] : error;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength;
    const message = `${
      !isValid ? 'Must be lesser than ' + element.validation.maxLength : ''
    }`;
    error = !isValid ? [isValid, message] : error;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value);
    const message = `${!isValid ? 'Enter a valid email id' : ''}`;
    error = !isValid ? [isValid, message] : error;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value);
    const message = `${!isValid ? element.label + 'should be a number ' : ''}`;
    error = !isValid ? [isValid, message] : error;
  }
  if (rules.required) {
    let message;
    switch (element.type) {
      case 'input':
        if (value.trim() === '') {
          isValid = false;
          message = `${!isValid ? element.label + ' is required ' : ''}`;
          error = !isValid ? [isValid, message] : error;
        }
        break;
      case 'time':
        if (value.trim() === '') {
          isValid = false;
          message = `${!isValid ? element.label + ' is required ' : ''}`;
          error = !isValid ? [isValid, message] : error;
        }
        break;
      case 'date':
        if (value === null) {
          isValid = false;
          message = `${!isValid ? element.label + ' is required ' : ''}`;
          error = !isValid ? [isValid, message] : error;
        }
        break;
      case 'autocomplete':
        if (value.trim() === '') {
          isValid = false;
          message = `${!isValid ? element.label + ' is required ' : ''}`;
          error = !isValid ? [isValid, message] : error;
        }
        break;
      case 'select':
        if (value.length === 0) {
          isValid = false;
          message = `${element.label +
            ' is required. Please Choose an Option '}`;
          error = !isValid ? [isValid, message] : error;
        }
        break;
      default:
        break;
    }
  }
  if (error) {
    element.valid = error[0];
    element.validationMessage = error[1];
  }
  return element;
};
export const checkValidity = elements => {
  //Validation Start Here
  for (let element in elements) {
    let item = doValidation(elements[element]);
    elements[element] = item;
  }
  return elements;
};

export default checkValidity;

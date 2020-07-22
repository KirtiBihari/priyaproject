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

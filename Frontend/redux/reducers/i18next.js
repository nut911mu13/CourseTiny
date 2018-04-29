const i18next = (state = {}, action) => {
  switch (action.type) {
    case 'aaa':
      return action.i18next;
    default:
      return state;
  }
}

export default i18next;

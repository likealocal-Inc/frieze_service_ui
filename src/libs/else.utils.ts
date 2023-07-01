export const ElseUtils = {
  isValidEmail: (email: string) => {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  },
  isAllUpperCase: (str: string) => {
    return str === str.toUpperCase();
  },
};

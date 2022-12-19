const emailRegEx = /^(([^<>()[\]\.,;:\s@\\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validateEmail = (value) => emailRegEx.test(value);

function validatePhone(phone) {
  if (phone === null) {
    return true;
  }
  return phone.length === 12 && Array.from(phone).filter((char) => !Number.isNaN(parseInt(char, 10))).length === 10;
}

module.exports = {
  validateEmail,
  validatePhone,
};

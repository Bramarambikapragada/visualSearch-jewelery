import validator from 'validator';

export const validateSignupData = (req) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

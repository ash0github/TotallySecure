// OWASP-style allow-list validation for API inputs.
// Ref (summarized): https://owasp.org/www-project-cheat-sheets/cheatsheets/Input_Validation_Cheat_Sheet.html

const { check, validationResult } = require('express-validator');

const re = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  saId: /^\d{13}$/,
  accountNumber: /^\d{9,12}$/,
  name: /^[A-Za-z\s'-]{2,50}$/,
  amount: /^(?:\d{1,10})(?:\.\d{1,2})?$/,
  swift: /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}(?:[A-Z0-9]{3})?$/,
  passwordStrong: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[ !@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]).{8,}$/,
};

const trimCollapse = (s) => String(s ?? '').trim().replace(/\s+/g, ' ');
const digitsOnly = (s) => String(s ?? '').replace(/\D/g, '');
const upperAz09 = (s) => String(s ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(400).json({ message: errors.array()[0].msg });
};

// /auth/register
const validateRegister = [
  check('email').customSanitizer(trimCollapse).matches(re.email).withMessage('Invalid email.'),
  check('username').customSanitizer(trimCollapse).isLength({ min: 2, max: 100 }).withMessage('Invalid username.'),
  check('firstName').customSanitizer(trimCollapse).matches(re.name).withMessage('Invalid first name.'),
  check('lastName').customSanitizer(trimCollapse).matches(re.name).withMessage('Invalid surname.'),
  check('idNumber').customSanitizer(digitsOnly).matches(re.saId).withMessage('ID must be 13 digits.'),
  check('accountNumber').customSanitizer(digitsOnly).matches(re.accountNumber).withMessage('Account must be 9-12 digits.'),
  check('password').matches(re.passwordStrong).withMessage('Weak password: 8+, upper, lower, digit, special.'),
  handleValidation,
];

// /auth/login
const validateLogin = [
  check('email').customSanitizer(trimCollapse).matches(re.email).withMessage('Invalid email.'),
  check('accountNumber').customSanitizer(digitsOnly).matches(re.accountNumber).withMessage('Account must be 9-12 digits.'),
  check('password').isString().withMessage('Password is required.'),
  handleValidation,
];

// /auth/verifyOTP
const validateVerifyOTP = [
  check('email').customSanitizer(trimCollapse).matches(re.email).withMessage('Invalid email.'),
  check('code').customSanitizer(digitsOnly).isLength({ min: 6, max: 6 }).withMessage('Code must be 6 digits.'),
  handleValidation,
];

// /transaction/transact
const validateTransaction = [
  check('currency').isString().isLength({ min: 3, max: 3 }).withMessage('Invalid currency code.'),
  check('beneficiary').customSanitizer(trimCollapse).matches(/^[A-Za-z\s'-]{2,100}$/).withMessage('Invalid beneficiary name.'),
  check('beneficiaryAccn').customSanitizer(digitsOnly).matches(re.accountNumber).withMessage('Beneficiary account must be 10 digits.'),
  check('amount').customSanitizer((v) => String(v ?? '')).matches(re.amount).withMessage('Amount must be positive, max 2 decimals.'),
  check('swiftCode').customSanitizer(upperAz09).matches(re.swift).withMessage('Invalid SWIFT (8 or 11 chars).'),
  handleValidation,
];

module.exports = {
  validateRegister,
  validateLogin,
  validateVerifyOTP,
  validateTransaction,
};

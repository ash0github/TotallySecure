// OWASP-style allow-list + sanitizers

export const re = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  saId: /^\d{13}$/,
  accountNumber: /^\d{9,12}$/,
  name: /^[A-Za-z\s'-]{2,50}$/,
  amount: /^(?:\d{1,10})(?:\.\d{1,2})?$/,
  // SWIFT/BIC: 8 or 11 total chars
  swift: /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}(?:[A-Z0-9]{3})?$/,
  // Put '-' at end of class; '.' doesn’t need escaping inside []
  passwordStrong:
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[ !@#$%^&*()_+=[\]{};:'",.<>/?\\|`~-]).{8,}$/,
};

export const sanitize = {
  text: (s) => {
    let v = String(s ?? "")
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[<>]/g, "");
    // eslint-disable-next-line no-control-regex
    v = v.replace(/[\x00-\x1F\x7F]/g, ""); // strip control chars (0x00–0x1F and DEL)
    return v;
  },
  digits: (s) => String(s ?? "").replace(/\D/g, ""),
  upperAz09: (s) => String(s ?? "").toUpperCase().replace(/[^A-Z0-9]/g, ""),
  money: (s) => {
    let v = String(s ?? "").replace(/[^0-9.]/g, "");
    const parts = v.split(".");
    if (parts.length > 2) v = parts[0] + "." + parts.slice(1).join("");
    if (v.includes(".")) {
      const [i, d] = v.split(".");
      v = i.replace(/^0+(?=\d)/, "") + "." + d.slice(0, 2);
    } else {
      v = v.replace(/^0+(?=\d)/, "");
    }
    return v;
  },
};

export function validateFields(fields) {
  if ("email" in fields && !re.email.test(fields.email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }
  if ("idNumber" in fields && !re.saId.test(fields.idNumber)) {
    return { ok: false, message: "ID Number must be exactly 13 digits." };
  }
  if ("accountNumber" in fields && !re.accountNumber.test(fields.accountNumber)) {
    return { ok: false, message: "Account Number must be 7-12 digits." };
  }
  if ("firstName" in fields && !re.name.test(fields.firstName)) {
    return { ok: false, message: "First name: letters/spaces/-/' only (2–50 chars)." };
  }
  if ("surname" in fields && !re.name.test(fields.surname)) {
    return { ok: false, message: "Surname: letters/spaces/-/' only (2–50 chars)." };
  }
  if ("amount" in fields && !re.amount.test(String(fields.amount))) {
    return { ok: false, message: "Amount must be a positive number with up to 2 decimals." };
  }
  if ("swiftCode" in fields && !re.swift.test(fields.swiftCode)) {
    return { ok: false, message: "SWIFT must be 8 or 11 chars (e.g., AAAABBCC or AAAABBCCDDD)." };
  }
  if ("password" in fields && !re.passwordStrong.test(fields.password)) {
    return {
      ok: false,
      message: "Password must be 8+ chars and include upper, lower, digit, and special character.",
    };
  }
  if ("confirmPassword" in fields && fields.password !== fields.confirmPassword) {
    return { ok: false, message: "Passwords do not match." };
  }
  return { ok: true };
}

export default function login_validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "請輸入電子信箱";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "請輸入有效的電子信箱";
  }

  // validation for password
  if (!values.password) {
    errors.password = "請輸入密碼";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "密碼必須大於8個字母或少於20個字母";
  } else if (values.password.includes(" ")) {
    errors.password = "請輸入有效的密碼";
  }

  return errors;
}

export function registerValidate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = "請輸入使用者名稱";
  } else if (values.username.includes(" ")) {
    errors.username = "請輸入有效的使用者名稱";
  }

  if (!values.email) {
    errors.email = "請輸入電子信箱";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "請輸入有效的電子信箱";
  }

  // validation for password
  if (!values.password) {
    errors.password = "請輸入密碼";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "密碼必須大於8個字母或少於20個字母";
  } else if (values.password.includes(" ")) {
    errors.password = "請輸入有效的密碼";
  }

  // validate confirm password
  if (!values.cpassword) {
    errors.cpassword = "請再次輸入密碼";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "請輸入與上方相同的密碼";
  } else if (values.cpassword.includes(" ")) {
    errors.cpassword = "請輸入有效的密碼";
  }

  return errors;
}

export function updateValidate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = "請輸入使用者名稱";
  } else if (values.username.includes(" ")) {
    errors.username = "請輸入有效的使用者名稱";
  }

  if (!values.email) {
    errors.email = "請輸入電子信箱";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "請輸入有效的電子信箱";
  }

  return errors;
}

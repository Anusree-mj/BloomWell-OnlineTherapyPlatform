export const validation = (
    name: string,
    email: string,
    phone: string,
    licenseNum: string,
    password: string,
    confrmPassword: string,
    setValidationFunctions: {
      setNameSpan: (color: string) => void,
      setNameTextSpan: (text: string) => void,
      setEmailSpan: (color: string) => void,
      setEmailTextSpan: (text: string) => void,
      setPhoneSpan: (color: string) => void,
      setPhoneTextSpan: (text: string) => void,
      setLicenseNumSpan: (color: string) => void,
      setLicenseNumTextSpan: (text: string) => void,
      setPasswordSpan: (color: string) => void,
      setPasswordTextSpan: (text: string) => void,
      setConfrmPasswordSpan: (color: string) => void,
      setConfrmPasswordTextSpan: (text: string) => void,
    }
  ) => {
    let isValid = true;
  
    const { setNameSpan, setNameTextSpan, setEmailSpan, setEmailTextSpan,
      setPhoneSpan, setPhoneTextSpan, setLicenseNumSpan, setLicenseNumTextSpan,
      setPasswordSpan, setPasswordTextSpan, setConfrmPasswordSpan, setConfrmPasswordTextSpan } = setValidationFunctions;
  
    const setValidation = (setSpan: (color: string) => void, setTextSpan: (text: string) => void, message: string) => {
      setSpan('red');
      setTextSpan(message);
      isValid = false;
    };
  
    if (!name || name.trim() === '') {
      setValidation(setNameSpan, setNameTextSpan, 'Please provide a valid name');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidation(setEmailSpan, setEmailTextSpan, 'Please provide a valid email.');
    }
    if (!phone || !/^\d{10}$/.test(phone)) {
      setValidation(setPhoneSpan, setPhoneTextSpan, 'Please provide a valid phone number')
    }
    if (!licenseNum || licenseNum.trim() === '' || !/^[A-Za-z]{3}\/\d+$/.test(licenseNum)) {
      let message = !licenseNum || licenseNum.trim() === ''
        ? 'Please provide a valid license number'
        : 'License number format is invalid. Format should be ABC/12345'
      setValidation(setLicenseNumSpan, setLicenseNumTextSpan, message)
    }
    if (!password || password.trim() === '' || password.length < 8) {
      let message = !password || password.trim() === ''
        ? 'Please provide a password of at least 8 characters'
        : 'Password must be at least 8 characters long';
      setValidation(setPasswordSpan, setPasswordTextSpan, message);
    }
    if (!confrmPassword || password !== confrmPassword) {
      let message = !confrmPassword
        ? 'Please confirm your password'
        : 'Password doesn\'t match';
      setValidation(setConfrmPasswordSpan, setConfrmPasswordTextSpan, message);
    }
    
    return isValid;
  };
  
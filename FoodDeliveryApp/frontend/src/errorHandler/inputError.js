export const validatePhoneNumber = (phone) => {
    // Remove non-numeric characters
    const cleanedPhone = phone.replace(/[^0-9]/g, "");
    
    // Return the cleaned phone and the error message if applicable
    if (cleanedPhone.length > 10) {
      return {
        value: cleanedPhone.slice(0, 10), // Trim to 10 digits
        error: "Phone number must be 10 digits.",
      };
    }
    
    return { value: cleanedPhone, error: "" };
  };
  
  export const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const error = emailPattern.test(email) ? "" : "Please enter a valid email address.";
    
    return { value: email, error };
  };

  export const validatePassword = (password) => {
    // Check if the password has at least 8 characters
    const error = password.length >= 8 ? "" : "Password must be at least 8 characters long.";
    
    return { value: password, error };
  };
  
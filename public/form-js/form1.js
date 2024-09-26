function setupFormValidation(
  formId,
  fullNameId,
  emailId,
  numberId,
  stateId,
  cityId,
  captchaId,
  termId,
  countrySelectId,
  refreshCaptchaBtnId,
  captchaContainerId,
  userInputId,
  fullNameErrorId,
  emailErrorId,
  numberErrorId,
  stateErrorId,
  cityErrorId,
  captchaErrorId,
  termErrorId
) {
  var form = document.getElementById(formId);
  var fullName = document.getElementById(fullNameId);
  var email = document.getElementById(emailId);
  var number = document.getElementById(numberId);
  var state = document.getElementById(stateId) || "Andaman and Nicobar";
  var city = document.getElementById(cityId) || "Hut Bay";
  var captcha = document.getElementById(captchaId);
  var term = document.getElementById(termId);
  var countrySelect = document.getElementById(countrySelectId);
  var url = getUrl();
  var refreshCaptchaBtn = document.getElementById(refreshCaptchaBtnId);
  var captchaContainer = document.getElementById(captchaContainerId);
  var userInput = document.getElementById(userInputId); // Added "Id" suffix

  // error id's
  var fullNameError = document.getElementById(fullNameErrorId);
  var emailError = document.getElementById(emailErrorId);
  var numberError = document.getElementById(numberErrorId);
  var stateError = document.getElementById(stateErrorId);
  var cityError = document.getElementById(cityErrorId);
  var captchaError = document.getElementById(captchaErrorId);
  var termError = document.getElementById(termErrorId);

  // form modal
  const formModal = document.getElementById("formModal");
  const formMessageCard = document.getElementById("formMessageCard");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    fullNameError.textContent = "";
    emailError.textContent = "";
    numberError.textContent = "";
    stateError.textContent = "";
    cityError.textContent = "";

    const isFormValid = checkFormInputFields();

    if (isFormValid) {
      var formData = new FormData();
      formData.append("name", fullName.value.trim());
      formData.append("email", email.value.trim());
      formData.append("number", number.value);
      formData.append("countryCode", countrySelect.value);

      // Check if the country code is +91
      if (countrySelect.value == "+91") {
        formData.append("state", state.value || "Andaman and Nicobar");
        formData.append("city", city.value || "Hut Bay");
      } else {
        // For other country codes, set state and city as null
        formData.append("state", "Andaman and Nicobar");
        formData.append("city", "Hut Bay");
      }

      formData.append("url", url);

      const formDataJsonString = JSON.stringify(
        Object.fromEntries(formData.entries())
      );

      localStorage.setItem("formData", formDataJsonString);

      var apiUrl = "https://service.letsupgrade.in/v2/itm/isu/leads/mba";
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: formDataJsonString,
      })
        .then(async (res) => {
          if (!res.ok) {
            let errorData = await res.json();
            console.log(errorData);

            throw new Error(errorData);
          }
          return res.json();
        })
        .then(function (response) {
          // console.log(response);
          window.dataLayer.push({
            event: "customConversionMBA",
            enhanced_conversion_data: {
              email: email.value.trim().toLowerCase(),
              phone_number: countrySelect.value + number.value,
            },
          });
          form.reset();
          window.location.href = "https://www.itm.edu/lp/mba/thank-you/";
        })
        .catch((error) => {
          console.log(error);
          formPopup();
        });
    }
  });

  function formPopup() {
    formModal.style.display = "flex";

    setTimeout(() => {
      formModal.style.display = "none";
    }, 3000);
  }

  function checkFormInputFields() {
    // Function to check if a field is empty
    const checkEmptyField = (value, errorElement, errorMessage) => {
      if (value.trim() === "") {
        errorElement.textContent = errorMessage;
        return false;
      } else {
        errorElement.textContent = "";
        return true;
      }
    };

    const checkFullNameValidity = (
      fullnameValue,
      errorElement,
      errorMessage
    ) => {
      if (!isValidFullName(fullnameValue.trim())) {
        errorElement.textContent = errorMessage;
        return false;
      } else {
        errorElement.textContent = "";
        return true;
      }
    };

    // Function to check email validity
    const checkEmailValidity = (emailValue, errorElement, errorMessage) => {
      if (!isValidEmail(emailValue.trim())) {
        errorElement.textContent = errorMessage;
        return false;
      } else {
        errorElement.textContent = "";
        return true;
      }
    };

    // Function to check phone number validity
    const checkPhoneNumberValidity = (
      numberValue,
      errorElement,
      errorMessage
    ) => {
      if (!isValidPhoneNumber(numberValue.trim())) {
        errorElement.textContent = errorMessage;
        return false;
      } else {
        errorElement.textContent = "";
        return true;
      }
    };

    // Function to check captcha validity
    function validateCaptcha(
      userInputValue,
      captchaValue,
      errorElement,
      errorMessage
    ) {
      if (userInputValue !== captchaValue) {
        errorElement.textContent = errorMessage;
        return false;
      } else {
        errorElement.textContent = "";
        return true;
      }
    }

    // Function to check term validity
    const checkTermValidity = (termValue, errorElement, errorMessage) => {
      if (!term.checked) {
        errorElement.textContent = errorMessage;
        return false; // Exit the function
      } else {
        errorElement.textContent = "";
        return true;
      }
    };

    // Check each form field
    const isFullNameValid =
      checkEmptyField(fullName.value, fullNameError, "Full Name is Required") &&
      checkFullNameValidity(
        fullName.value,
        fullNameError,
        "Name Cannot be number, Enter a Valid Name"
      );
    const isEmailValid =
      checkEmptyField(email.value, emailError, "Email is Required") &&
      checkEmailValidity(
        email.value,
        emailError,
        "Invalid! Enter a proper email id"
      );
    const isNumberValid =
      countrySelect.value === "+91"
        ? checkEmptyField(number.value, numberError, "Number is Required") &&
        checkPhoneNumberValidity(
          number.value,
          numberError,
          "Invalid! Enter a 10-digit Mobile Number"
        )
        : true;
    const isStateValid = checkEmptyField(
      state.value,
      stateError,
      "State is Required"
    );
    const isCityValid = checkEmptyField(
      city.value,
      cityError,
      "City is Required"
    );
    const isCaptchaValid =
      checkEmptyField(captcha.value, captchaError, "Captcha is Required") &&
      validateCaptcha(
        captcha.value,
        captchaContainer.dataset.captcha,
        captchaError,
        "Invalid! Captcha"
      );
    const isTermValid = checkTermValidity(
      term.value,
      termError,
      "Please Check the Agreement Checkbox to proceed further!"
    );

    // Return true if all fields are valid, otherwise false
    if (countrySelect.value === "+91") {
      // No need to redefine isStateValid and isCityValid here
      return (
        isFullNameValid &&
        isEmailValid &&
        isNumberValid &&
        isStateValid &&
        isCityValid &&
        isCaptchaValid &&
        isTermValid
      );
    } else {
      // For other countries, no validation is required for state and city
      return (
        isFullNameValid &&
        isEmailValid &&
        isNumberValid &&
        isCaptchaValid &&
        isTermValid
      );
    }
  }

  function isValidFullName(name) {
    const digitRegex = /\d/;

    if (digitRegex.test(name)) {
      return false;
    }
    return true;
  }

  function isValidEmail(email) {
    // Basic email validation using regular expression
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function isValidPhoneNumber(phone) {
    // Phone number validation using regular expression
    var phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
  }

  refreshCaptchaBtn.addEventListener("click", () => {
    generateCaptcha(captchaContainer);
  });

  generateCaptcha(captchaContainer);

  function generateCaptcha(captchaInput) {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const captchaLength = 6;
    let captcha = "";
    for (let i = 0; i < captchaLength; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    captchaInput.innerHTML = captcha;
    captchaInput.dataset.captcha = captcha;
  }

  function getUrl() {
    let url = window.location.href;
    let urlParams = window.location.search;
    return url + urlParams;
  }
}

// Call the function with the appropriate IDs
setupFormValidation(
  "form",
  "fullname",
  "email",
  "number",
  "state",
  "city",
  "captcha",
  "term",
  "countrySelect",
  "refreshCaptchaBtn",
  "genratedCaptcha",
  "captcha",
  "fullnameError",
  "emailError",
  "numberError",
  "stateError",
  "cityError",
  "captchaError",
  "termError"
);
setupFormValidation(
  "form1",
  "fullname1",
  "email1",
  "number1",
  "state1",
  "city1",
  "captcha1",
  "term1",
  "countrySelect1",
  "refreshCaptchaBtn1",
  "genratedCaptcha1",
  "captcha1",
  "fullnameError1",
  "emailError1",
  "numberError1",
  "stateError1",
  "cityError1",
  "captchaError1",
  "termError1"
);

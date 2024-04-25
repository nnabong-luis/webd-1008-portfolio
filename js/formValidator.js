/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
  // Hides all error elements on the page
  hideErrors();

  // Determine if the form has errors

  if (formHasErrors()) {
    // Prevents the form from submitting
    e.preventDefault();

    // When using onSubmit="validate()" in markup, returning false would prevent
    // the form from submitting
    return false;
  }

  // When using onSubmit="validate()" in markup, returning true would allow
  // the form to submit
  return true;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {
  //	Complete the validations below

  // Shipping Information Validation : Required Fields
  let errorFlag = false;
  let regexPattern;

  if (!formFieldHasInput(document.getElementById("fullName"))) {
    document.getElementById("fullNameError").style.display = "block";

    // Determine if first error to set focus
    errorFlag = isFirstError("fullName", errorFlag);
  }

  regexPattern = /\d{10}/;
  const phoneRegex = new RegExp(regexPattern);
	const phoneNumberElm = document.getElementById("phoneNumber");

	if (!formFieldHasInput(phoneNumberElm)) {
    document.getElementById("phoneNumberError").style.display = "block";

    errorFlag = isFirstError("phoneNumber", errorFlag);
		
	} else if (!phoneRegex.test(phoneNumberElm.value)) {
    document.getElementById("phoneNumberFormatError").style.display = "block";

    // Determine if first error to set focus
    errorFlag = isFirstError("phoneNumber", errorFlag);
  }

  // Shipping Information Validation : Email Format
  regexPattern = /^[a-zA-Z0-9._%+-]{3,}@[a-z0-9]{3,}\.[a-z]{2,}/;
  const emailRegex = new RegExp(regexPattern);
	const emailElm = document.getElementById("email");

  if (!formFieldHasInput(emailElm)) {
    document.getElementById("emailError").style.display = "block";

    errorFlag = isFirstError("phoneNumber", errorFlag);
		
	} else if (!emailRegex.test(emailElm.value)) {
    document.getElementById("emailFormatError").style.display = "block";

    // Determine if first error to set focus
    errorFlag = isFirstError("email", errorFlag);
  }

	if (!formFieldHasInput(document.getElementById("comments"))) {
    document.getElementById("commentsError").style.display = "block";

    // Determine if first error to set focus
    errorFlag = isFirstError("comments", errorFlag);
  }

  // 	Complete the validations above
  return errorFlag;
}

//	Determine if this is the first error
function isFirstError(textField, errorFlag) {
  // Set the focus
  if (!errorFlag) {
    document.getElementById(textField).focus();
    document.getElementById(textField).select();
  }

  //	Set the error flag
  return true;
}

/*
 * Hides all of the error elements.
 */
function hideErrors() {
  // Get an array of error elements
  let error = document.getElementsByClassName("error_message");

  // Loop through each element in the error array
  for (let i = 0; i < error.length; i++) {
    // Hide the error element by setting it's display style to "none"
    error[i].style.display = "none";
  }
}

/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement) {
  // Check if the text field has a value
  if (fieldElement.value == null || fieldElement.value.trim() == "") {
    // Invalid entry
    return false;
  }

  // Valid entry
  return true;
}

/*
 * Handles the load event of the document.
 */
function load() {
  // Hide all the error messages
  hideErrors();

  // Add event listener for the form submit
  document.getElementById("contactForm").addEventListener("submit", validate);
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);

var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("SiteURL");
var tableBody = document.getElementById("tableBody");
var siteNameValue, siteURLValue;
var sit;
var sitsContainer = [];
var siteNameRegex = /^[a-zA-Z0-9\s\-_]{3,50}$/;
var siteURLRegex =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:[0-9]{1,5})?(\/[^\s]*)?$/;
Retrieve();
/**
 * Fetches values from input fields and assigns them to variables.
 */
function fetchValuesFromInput() {
  // Get the value from the site name input field
  siteNameValue = siteName.value;
  // Get the value from the site URL input field
  siteURLValue = siteURL.value;
}
/**
 * Clears the values from the input fields
 */
function clearInput() {
  // Clear the value in the site name input field
  siteName.value = "";
  // Clear the value in the site URL input field
  siteURL.value = "";
}
/**
 * Adds a new site to the sites container.
 * @function addNewSite
 * @description Retrieves the values from the input fields, creates a new site object with the values, adds the site to the sites container, displays the sites container, and then clears the input fields.
 * @param {string} siteNameValue - The value of the site name input field.
 * @param {string} siteURLValue - The value of the site URL input field.
 * @returns {void} - Does not return a value.
 */
function addNewSite() {
  // Retrieve the values from the input fields
  fetchValuesFromInput();

  // Validate inputs
  var isSiteNameValid = siteNameRegex.test(siteNameValue);
  var isSiteURLValid = siteURLRegex.test(siteURLValue);

  if (!isSiteNameValid && !isSiteURLValid) {
    // Display an error message if both the site name and URL are invalid
    Swal.fire({
      icon: "error",
      title: "Invalid Inputs",
      text: "Both the site name and URL are invalid. Please correct them before submitting.",
    });
  } else if (!isSiteNameValid) {
    // Display an error message if the site name is invalid
    Swal.fire({
      icon: "error",
      title: "Invalid Site Name",
      text: "Please enter a valid site name! It should be at least 3 characters long and can include letters, numbers, spaces, dashes (-), and underscores (_).",
    });
  } else if (!isSiteURLValid) {
    // Display an error message if the URL is invalid
    Swal.fire({
      icon: "error",
      title: "Invalid URL",
      text: "Please enter a valid URL! Ensure it starts with 'http://' or 'https://' and follows the correct URL format.",
    });
  }

  // Stop execution if inputs are invalid
  if (!isSiteNameValid || !isSiteURLValid) {
    // Validate the site name and URL using the functions below
    validateSiteName(siteNameValue);
    validateSiteURL(siteURLValue);
    return;
  }

  // Create a new site object with the values
  sit = { name: siteNameValue, URL: siteURLValue };
  // Add the site to the sites container
  sitsContainer.push(sit);
  store(sitsContainer);

  // Display the sites container
  display();
  // Clear the input fields
  clearInput();
  // Display a success message
  Swal.fire({
    icon: "success",
    title: "Success!",
    text: "Your site has been successfully added.",
  });
}
/**
 * Updates the table display to show all sites in the sites container.
 * Clears the existing table content and populates it with current site data.
 */
function display() {
  // Clear the current content of the table body
  tableBody.innerHTML = "";

  // Iterate over each site in the sitsContainer array
  for (var i = 0; i < sitsContainer.length; i++) {
    // Append a new row to the table body for each site
    tableBody.innerHTML += `
    <tr>
      <!-- Display the index of the site -->
      <td>${i + 1}</td>
      <!-- Display the name of the site -->
      <td>${sitsContainer[i].name}</td>
    <td>
    <!-- Button to visit the site's URL in a new tab -->
    <a 
        class="btn btn-warning" 
        target="_blank"
        rel="noopener noreferrer" 
        href="${
          sitsContainer[i].URL.startsWith("http://") ||
          sitsContainer[i].URL.startsWith("https://")
            ? sitsContainer[i].URL
            : `https://${sitsContainer[i].URL}`
        }">
        Visit
    </a>
    </td>
      <td>
        <!-- Provide a button to delete the site, passing the index to the deleteSite function -->
        <button onclick="deleteSite(${i})" class="btn btn-danger">Delete</button>
      </td>
    </tr>`;
  }
}
/**
 * Deletes the site at the specified index from the sites container.
 * Updates the display after deletion.
 * @param {number} index - The index of the site to be deleted.
 */
function deleteSite(index) {
  // Remove the site at the given index from the sitsContainer array
  sitsContainer.splice(index, 1);
  store(sitsContainer);
  // Re-render the table to reflect the deletion
  display();
}
/**
 * Stores the sites container array in local storage.
 * Converts the array to a JSON string before storing.
 * @param {Array} sitsContainer - The array of site objects to store.
 */
function store(sitsContainer) {
  // Convert the sitsContainer array to a JSON string and store it in localStorage
  localStorage.setItem("sitsContainer", JSON.stringify(sitsContainer));
}
/**
 * Retrieves the sitsContainer array from localStorage and updates the display.
 */
function Retrieve() {
  // Check if the sitsContainer array is stored in localStorage
  if (localStorage.getItem("sitsContainer") != null) {
    // Retrieve the sitsContainer array from localStorage
    sitsContainer = JSON.parse(localStorage.getItem("sitsContainer"));
    // Update the display using the retrieved sitsContainer array
    display();
  }
}

/**
 * Validate the site name input field.
 * If the input is invalid, add the "is-invalid" class to the element.
 * If the input is valid, remove the "is-invalid" class from the element.
 * @param {string} siteNameValue - The value of the site name input field.
 */
function validateSiteName(siteNameValue) {
  // Check if the input value matches the regex
  if (!siteNameRegex.test(siteNameValue)) {
    // Add the is-invalid class if the input is invalid
    siteName.classList.add("is-invalid");
  } else {
    // Remove the is-invalid class if the input is valid
    siteName.classList.remove("is-invalid");
  }
}

/**
 * Validate the site URL input field.
 * If the input is invalid, add the "is-invalid" class to the element.
 * If the input is valid, remove the "is-invalid" class from the element.
 * @param {string} siteURLValue - The value of the site URL input field.
 */
function validateSiteURL(siteURLValue) {
  // Check if the URL is valid
  if (!siteURLRegex.test(siteURLValue)) {
    // Add the is-invalid class if the URL is invalid
    siteURL.classList.add("is-invalid");
  } else {
    // Remove the is-invalid class if the URL is valid
    siteURL.classList.remove("is-invalid");
  }
}
/**
 * Add event listeners to the input fields to validate the input data.
 * When the input value changes, fetch the values, validate the input and
 * update the UI accordingly.
 */
siteName.addEventListener("input", () => {
  // Fetch the values from the input fields
  fetchValuesFromInput();
  // Validate the site name
  validateSiteName(siteNameValue);
});

siteURL.addEventListener("input", () => {
  // Fetch the values from the input fields
  fetchValuesFromInput();
  // Validate the site URL
  validateSiteURL(siteURLValue);
});

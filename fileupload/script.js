// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAiGwtsRvFDmmFfUVhOm9GPJMXL07BOm04",
  authDomain: "fir-frontend-c00f3.firebaseapp.com",
  projectId: "fir-frontend-c00f3",
  storageBucket: "fir-frontend-c00f3.appspot.com",
  messagingSenderId: "710045077420",
  appId: "1:710045077420:web:c3cde35c95a2de19c23409",
  measurementId: "",
};

firebase.initializeApp(firebaseConfig);

// Function to initialize the page
function initializePage() {
  // Hide loading overlay by default
  hideLoading();

  // Hide pop-up by default
  hidePopup();
}

function showLoading() {
  document.getElementById("loading-overlay").style.display = "flex";
}

// Function to hide loading UI
function hideLoading() {
  document.getElementById("loading-overlay").style.display = "none";
}
// Function to upload files to Firebase Storage
function uploadFiles(files) {
  const storageRef = firebase.storage().ref();

  // Show loading UI
  showLoading();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileRef = storageRef.child(file.name);

    fileRef
      .put(file)
      .then((snapshot) => {
        console.log("File uploaded successfully:", snapshot.metadata.name);
        // Hide loading UI
        hideLoading();
        // Show success pop-up
        showPopup("Success", "Upload successful.", "success");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        // Hide loading UI
        hideLoading();
        // Show error pop-up
        showPopup("Error", "Upload failed.", "error");
      });
  }
}
function showPopup(title, message, type) {
  const popup = document.getElementById("popup");
  const popupTitle = document.getElementById("popup-title");
  const popupMessage = document.getElementById("popup-message");

  popupTitle.textContent = title;
  popupMessage.textContent = message;
  popup.classList.add(type);

  popup.style.display = "block";
}

// Function to close pop-up
function closePopup() {
  // Hide pop-up
  hidePopup();
}

function hidePopup() {
  const popup = document.getElementById("popup");
  const closeButton = document.getElementById("close-button");

  // Hide pop-up
  popup.style.display = "none";

  // Hide close button
  closeButton.style.display = "none";
}

// Function to retrieve files from Firebase Storage
function retrieveFiles() {
  const storageRef = firebase.storage().ref();

  storageRef
    .listAll()
    .then((res) => {
      res.items.forEach((itemRef) => {
        itemRef
          .getDownloadURL()
          .then((url) => {
            const fileCard = document.createElement("div");
            fileCard.classList.add("file-card"); // Apply the file card styling

            // Create an element for the file name
            const fileName = document.createElement("p");
            fileName.classList.add("file-name");
            fileName.textContent = itemRef.name;

            // Create a download button
            const downloadButton = document.createElement("button");
            downloadButton.textContent = "View File";
            downloadButton.onclick = function () {
              window.open(url); // Open the file in a new tab when clicked
            };

            // Append the file name and download button to the file card
            fileCard.appendChild(fileName);
            fileCard.appendChild(downloadButton);

            // Append the file card to the file list container
            document.getElementById("file-list").appendChild(fileCard);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      });
    })
    .catch((error) => {
      console.error("Error listing files:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  initializePage();
  const fileInput = document.getElementById("file-input");
  const uploadButton = document.getElementById("upload-button");

  uploadButton.addEventListener("click", function () {
    const files = fileInput.files;
    if (files.length === 0) {
      alert("Please select a file.");
      return;
    }

    uploadFiles(files);
  });

  // Retrieve files when the page loads
  retrieveFiles();

  document.getElementById("close-button").addEventListener("click", closePopup);
});

document.addEventListener("DOMContentLoaded", function() {
    const progressCircle = document.getElementById("progressCircle");
    const progressText = progressCircle.querySelector(".progress-text");
  
    // Set the progress percentage (between 0 and 100)
    const progress = 75; // Change this value to reflect the actual progress
  
    // Set the width of the progress bar
    progressCircle.style.clip = `rect(0, 100px, 100px, ${progress < 50 ? '0' : '50px'})`;
  
    // Update the progress text
    progressText.textContent = `${progress}%`;
  });
  
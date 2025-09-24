// Provided constants
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Grab modal and message span
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");

// Add event listener once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const hearts = document.querySelectorAll(".like-glyph");

  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      mimicServerCall()
        .then(() => {
          // Success → toggle heart
          if (heart.innerText === EMPTY_HEART) {
            heart.innerText = FULL_HEART;
            heart.classList.add("activated-heart");
          } else {
            heart.innerText = EMPTY_HEART;
            heart.classList.remove("activated-heart");
          }
        })
        .catch((error) => {
          // Failure → show modal with error
          modal.classList.remove("hidden");
          modalMessage.innerText = error;

          // Hide again after 3 seconds
          setTimeout(() => {
            modal.classList.add("hidden");
          }, 3000);
        });
    });
  });
});

// Mock server call (provided in lab instructions)
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

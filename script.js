// JavaScript for smooth scrolling effect
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    // Get the target section id from the link's href attribute
    const targetId = link.getAttribute('href').substring(1);
    // Find the target section element based on its id
    const targetSection = document.getElementById(targetId);
    // Scroll smoothly to the target section
    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: 'smooth'
    });
  });
});

function toggleResume() {
var resumeEmbed = document.getElementById("resume-embed");
var toggleButton = document.getElementById("toggle-button");

if (resumeEmbed.style.display === "none") {
resumeEmbed.style.display = "block";
toggleButton.textContent = "Hide Resume";
} else {
resumeEmbed.style.display = "none";
toggleButton.textContent = "Show Resume";
}
}
document.getElementById("email").addEventListener("click", function() {
var emailText = this.innerText;
navigator.clipboard.writeText(emailText).then(function() {
alert("Email address copied to clipboard!");
});
});

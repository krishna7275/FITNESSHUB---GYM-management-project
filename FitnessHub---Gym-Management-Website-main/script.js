document.getElementById("goHomeBtn").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "index.html"; // Redirects to home page
});

setTimeout(function() {
    window.location.href = "index.html"; // Auto-redirect after 5 seconds
}, 5000); // 5000ms = 5 seconds


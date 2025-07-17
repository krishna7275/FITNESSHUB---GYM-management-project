document.addEventListener('DOMContentLoaded', function() {
    // Admin credentials (should be stored securely in a real application)
    // In a production environment, this validation should happen on the server side
    const adminUser = {
        username: 'aman',
        password: '12345'
    };

    // Get form element
    const loginForm = document.getElementById('adminLoginForm');
    const errorMessage = document.getElementById('error-message');

    // Add event listener for form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get input values
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Check if credentials match
        if (username === adminUser.username && password === adminUser.password) {
            // Save login state in localStorage (in a real app, use more secure methods like sessions)
            localStorage.setItem('adminLoggedIn', 'true');
            
            // Redirect to admin dashboard
            window.location.href = 'admin-dashboard.html';
        } else {
            // Show error message
            errorMessage.textContent = 'Invalid username or password';
            
            // Clear form
            document.getElementById('password').value = '';
        }
    });
});
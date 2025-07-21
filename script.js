// Get references to the form and message div
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Add an event listener for form submission
contactForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission (page reload)

    // Show a loading message or disable the button
    formMessage.textContent = 'Submitting...';
    formMessage.className = 'form-message'; // Clear previous classes
    formMessage.style.display = 'block';

    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Get form data
    const userName = document.getElementById('name').value;
    const userContact = document.getElementById('contact').value;

    // Define your backend API endpoint URL
    // IMPORTANT: Replace 'http://localhost:3000' with your deployed backend URL
    // once you host it (e.g., 'https://your-backend-app.render.com/submit-form')
    const backendUrl = 'https://my-web-backend-app-8701ad26c7c7.herokuapp.com/submit-form'; // For local testing

    try {
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, userContact }) // Send data as JSON
        });

        const data = await response.json(); // Parse the JSON response from the backend

        if (response.ok) { // Check if the response status is 200-299
            formMessage.textContent = data.message;
            formMessage.className = 'form-message success';
            contactForm.reset(); // Clear the form fields
        } else {
            formMessage.textContent = data.message || 'An unexpected error occurred.';
            formMessage.className = 'form-message error';
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        formMessage.textContent = 'Network error or server unavailable. Please try again.';
        formMessage.className = 'form-message error';
    } finally {
        // Re-enable the button and reset its text
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Information';
    }
});
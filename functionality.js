// This script listens for user input on the password field and evaluates
// the password against several criteria. It updates the UI to show which
// criteria are met and displays a strength bar and label.
document.addEventListener('DOMContentLoaded', function() {
    // Elements we use (cache DOM nodes for better performance)
    const password = document.getElementById('password');
    const fill = document.getElementById('strength-fill');
    const text = document.getElementById('strength-text');

    const lengthItem = document.getElementById('length');
    const upperItem = document.getElementById('uppercase');
    const lowerItem = document.getElementById('lowercase');
    const numberItem = document.getElementById('number');
    const specialItem = document.getElementById('special');

    // Run the password check every time the user types in the field
    password.addEventListener('input', function() {
        // Get the current value from the input
        const p = password.value;
        // 'score' counts how many of the rules have been satisfied
        let score = 0;

        // 1) Length rule - password should be at least 8 characters
        if (p.length >= 8) {
            lengthItem.className = 'valid';
            score = score + 1;
        } else {
            lengthItem.className = 'invalid';
        }

        // 2) Uppercase - check for at least one uppercase English letter
        //  .test(p) method returns true when at least one match is found of regex
        if (/[A-Z]/.test(p)) {
            upperItem.className = 'valid';
            score = score + 1;
        } else {
            upperItem.className = 'invalid';
        }

        // 3) Lowercase - check for at least one lowercase English letter.
        if (/[a-z]/.test(p)) {
            lowerItem.className = 'valid';
            score = score + 1;
        } else {
            lowerItem.className = 'invalid';
        }

        // 4) Number - \d is a shorthand character class for digits
        if (/\d/.test(p)) {
            numberItem.className = 'valid';
            score = score + 1;
        } else {
            numberItem.className = 'invalid';
        }

        // 5) Special character - presence of one or more symbols
        // The regex below contains a list of allowed 'special' characters.
        if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]/.test(p)) {
            specialItem.className = 'valid';
            score = score + 1;
        } else {
            specialItem.className = 'invalid';
        }

        // Map the score to a readable strength level, a percentage for the UI,
        // and a CSS class to style the strength bar accordingly.
        let levelText = 'Very Weak';
        let percent = 0;
        let colorClass = 'weak';

        // Configure the text and color class based on how many rules were met
        if (score === 0) {
            levelText = 'Very Weak'; percent = 0; colorClass = 'weak';
        } else if (score <= 2) {
            levelText = 'Weak'; percent = 25; colorClass = 'weak';
        } else if (score === 3) {
            levelText = 'Medium'; percent = 50; colorClass = 'medium';
        } else if (score === 4) {
            levelText = 'Strong'; percent = 75; colorClass = 'strong';
        } else if (score === 5) {
            levelText = 'Very Strong'; percent = 100; colorClass = 'strong';
        }

        // Update the UI: width of bar, color class, and label text
        fill.style.width = percent + '%';
        fill.className = 'strength-fill ' + colorClass;
        text.textContent = 'Password Strength: ' + levelText;
    });
});

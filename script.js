const displayError = document.getElementById("errorBox");

function showErrorMessage(message) {
    displayError.textContent = message;
    displayError.style.opacity = 1;
}

async function getProfile(profileName) {
    try {
        // Check if user input empty or not
        if (!profileName) {
            throw new Error("Empty profile name!");
        }

        // Fetch data from GitHub API
        const response = await fetch(
            `https://api.github.com/users/${profileName}`,
        );

        // Check API response and status
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("User not found!");
            }
            throw new Error("Something went wrong");
        }

        // Response converted to JSON
        const data = await response.json();
        console.log(data);

        const { avatar_url, name, bio, login } = data;
        console.log(avatar_url, name, bio, login);
    } catch (error) {
        showErrorMessage(error.message);
        console.error(error);
    }
}

const form = document.getElementById("searchInput");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const allFields = Object.fromEntries(new FormData(form));
    const { userInput } = allFields;

    // Hide the Error Box
    displayError.style.opacity = 0;

    getProfile(userInput);
});

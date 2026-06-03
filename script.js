const displayError = document.getElementById("errorBox");
const profileCard = document.getElementById("profileCard");

function showErrorMessage(message) {
    displayError.textContent = message;
    displayError.style.opacity = 1;
}

// Get all elements
const profileImg = document.getElementById("profileImg");
const profileName = document.getElementById("actualName");
const userName = document.getElementById("userName");
const profileFollowers = document.getElementById("profileFollower");
const profileFollowing = document.getElementById("profileFollowing");
const profileBio = document.getElementById("profileBio");
const gitHubLink = document.getElementById("gitHubLink");

function updateHTML(data, username) {
    let { avatar_url, name, bio, login, followers, following } = data;

    profileLink = `https://github.com/${username}`;

    if (bio === null) {
        bio = "";
    }
    // Update elemnts
    profileImg.src = avatar_url;
    profileName.textContent = `Name: ${name}`;
    userName.textContent = `Username: ${login}`;
    profileFollowers.textContent = `Followers: ${followers}`;
    profileFollowing.textContent = `Following: ${following}`;
    profileBio.textContent = `Bio: ${bio}`;
    gitHubLink.href = profileLink;
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
        updateHTML(data, profileName);
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
    profileCard.style.visibility = "visible";
});

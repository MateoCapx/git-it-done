//using the Fetch API to make an HTTP request 
//formatting the response to JSON

let getUserRepos = function (user) {
    // format the github api url
    let apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function (response) {
        // Test to se if the user input is a valid Github page
        // if GitHub page doesn't exsit let user know user not found
        // 200 Status Code  = ok
        // 404 Status Code = issue
        if (response.ok) {
        response.json().then(function (data) {
            displayRepos(data, user);
        });

    } else{
        alert("Error: GitHub User Not Found");
    }
    })
        // If connectivity issues arise. if the request fails, that error will be sent to the .catch() method
    .catch(function(error) {
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to GitHub");
      });
    
};

getUserRepos()


// Function to handle form input validation, linking to API, 
let userFormEl = document.querySelector("#user-form");
let nameInputEl = document.querySelector("#username");

let formSubmitHandler = function (event) {
    event.preventDefault();

    let username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";  // Checking to make sure there is actually a value in the input field 
    } else {
        alert("Please enter a GitHub username");
    }
    console.log(event);
};

userFormEl.addEventListener("submit", formSubmitHandler);


// Function to Display Repo , User name that we just enter in the seach input form
let displayRepos = function (repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);

    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    var repoContainerEl = document.querySelector("#repos-container");
    var repoSearchTerm = document.querySelector("#repo-search-term");

    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);


        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        //We use an if statement to check how many issues the repository has. 
        //If the number is greater than zero, then we'll display the number of issues and add a red X icon next to it.
        // If there are no issues, we'll display a blue check mark instead.

        if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>"; // IS an icon from a website called "Font Awesome"
        }

        // append to container
        repoEl.appendChild(statusEl);
        // append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
};
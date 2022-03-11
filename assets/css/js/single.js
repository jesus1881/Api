var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name")
// Spliiting repo name from string
var getRepoName = function () {
    //grab repo name on the page
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];
    getRepoIssues(repoName);
    repoNameEl.textContent = repoName;
    if (repoName) {
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);
    } else {
        document.location.replace("./index.html");
    }

};

// Get Repo Issues API
var getRepoIssues = function (repo) {

    // api for issues 
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    // request url
    fetch(apiUrl).then(function (response) {
        //request was succesful
        if (response.ok) {
            response.json().then(function (data) {
                // pass response fata to DOM function
                displayIssues(data);
            });
        } else {
            // if not succesful
            document.location.replace("./index.html");
        }
    })
};

// Display Issues
var displayIssues = function (issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    };
    for (var i = 0; i < issues.length; i++) {
        // create link to element to take use to github issue
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
        // create span to issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title

        // apend to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issues is an actual issue or pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        //append to container
        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);
    };
}

// Limit Warning
var displayWarning = function (repo) {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    // create link
    var linkEl = document.createElement("a");
    linkEl.textContent = "See more issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    // apend warning container
    limitWarningEl.appendChild(linkEl);
};



getRepoName();
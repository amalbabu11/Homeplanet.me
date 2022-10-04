var version = "v4"
var id = "39622546"

async function getCommits() {
    // Load commits data from the GitLab api.
    return await fetch(`https://gitlab.com/api/${version}/projects/${id}/repository/commits`,
        {
            "method": "get",
        }
    ).then((response) => {
        return response.json();
    }).then((json) => {
        return json;
    });
}

async function getIssues() {
    // Load issues data from the GitLab api.
    return await fetch(`https://gitlab.com/api/${version}/projects/${id}/issues`,
        {
            "method": "get",
        }
    ).then((response) => {
        return response.json();
    }).then((json) => {
        return json;
    });
}

/**
 * The function is used to get data from the GitLab api. It's a asynchronous function so remember to add `asyn` in the html sript item.
 * Invoke example:
 * <head>
 * <meta charset="utf-8">
 * <script type="text/javascript" src="query.js"></script>
 * <script>
 *    window.onload = () => {
 *        parseInfo().then((statistics) => {
 *            document.getElementById("my_text").innerHTML = `commits total numer: ${statistics.commits_num}, issues total number: ${statistics.issues_num}`;
 *        })
 *    }
 * </script>
 * </head>
 * <body>
 * <p id="my_text">Loading...</p>
 * </body>
 * The return result json form is as follows:
 * {
 *  commits_num: int, the number of all commits
 *  issues_num: int, the number of all issues
 *  commits: [] map, the keys are username, and the values are the commits number of every developer
 *  issues: [] map, the keys are username, and the values are the issues number of every developer
 * }
 */
async function parseInfo() {
    var commits = await getCommits();
    var commits_map = new Map();
    for (var i in commits) {
        var commit = commits[i];
        var counter = commits_map.get(commit.author_name);
        if (counter) {
            commits_map.set(commit.author_name, counter + 1)
        } else {
            commits_map.set(commit.author_name, 1)
        }
    }
    var issues = await getIssues();
    var issues_map = new Map();
    for (var i in issues) {
        var issue = issues[i];
        var counter = issues_map.get(issue.author.name);
        if (counter) {
            issues_map.set(issue.author.name, counter + 1)
        } else {
            issues_map.set(issue.author.name, 1)
        }
    }
    var statistic = {
        commits_num: commits.length,
        issues_num: issues.length,
        commits: commits_map,
        issues: issues_map,
    };
    return statistic;
}

export default parseInfo;
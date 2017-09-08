const baseUrl = "https://api.github.com"
var createGist = function(file_name, content, description, token, callback = console.log){
  const githubUsername = $("#github-username").val();
  const postData = {
    "description": description,
    "public": true,
    "files": {
      [file_name]: {
        "content": content
      }
    }
  };

  $.ajax({
    type: "POST",
    url: baseUrl + "/gists",
    dataType: "JSON",
    headers: {
      "Authorization": "token " + token
    },
    data: JSON.stringify(postData),
    success: function (data) {
      callback(githubUsername, token);
    },
    error: function (error) {
      console.error(error);
    }
  });
};

function myGists (username, token) {
  $.get(baseUrl + "/users/" + username + "/gists", {access_token: token}, function (data) {
    data.forEach(function (gist) {
      const fileName = Object.keys(gist.files)[0];
      const a = $("<a>", {
        text: gist.files[fileName].filename,
        href: gist.html_url
      });

      const li = $("<li>");
      a.appendTo(li);
      li.appendTo("#gist-display ul");
      $("#gist-display h1").text("Gists of " + username);
    });
  });
};

var bindCreateButton = function () {
  $("#gist-create").on("click", function (event) {
    const githubToken = $("#github-token").val();
    const fileName = $("#gist-name").val();
    const fileDescription = $("#gist-description").val();
    const fileContent = $("#gist-content").val();
    createGist(fileName, fileContent, fileDescription, githubToken, myGists);
  });
};

$(document).ready(function () {
  bindCreateButton();
});

Setup Instructions:

1. Create a new access token on Asana and set it on the accessToken env variable [1]

2. Set your user id: writing "asana" and click on "My ID", then press enter to copy the gid and paste it in the "me" env variable

3. Set the workspace: write "asana" and click on "Workspaces", select the workspace you want and paste the gid in the "workspace" env variable

4. Sync users list: write "asana" and clikc on "Sync users list", this step will sync all users on the chosen workspace so you will be able to use the "assign user to task" feature

How to use:
In order to create a task use the "task" keywork.
The format of the input should be this: title;description
for e.g. "create a website;check the email from John and create the website according to his instructions"

In order to open the new created task add ":" at the end of you input, for e.g. "create a website:" or "create website;setup wordpress:"

In order to assign a user to a task you can use the "-a" flag at the end of your input, for e.g. "create a website -a"

You can also use here the open url feature by simply add the ":" character at the end, for e.g. "create a website -a:" or "create logo;use blue and grey colors -a:"


References:
[1] https://asana.com/guide/help/api/api
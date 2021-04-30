# Solution overview

Submit an idea app will enable users to submit and share ideas and insights, with voting. An app using which employees can submit an innovative idea in a selected category to be visible to all colleagues and leadership, ideas can be voted upon and a leader board of best idea contributors can be shared. This app can also be a route to file patent ideas by anyone in an organization.

![Solution Overview](/wiki/images/ArchitectureDiagram.png)

**Submit an idea Bot:**
- This is a web application built using the [Bot Framework SDK v4 for .NET](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0) and [ASP.NET Core 2.1](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-2.1). Submit an idea is a BOT that lets encourage and introduce your co-workers to a widespread knowledge-based sharing of ideas with a bite-sized information on how it influenced them and grow together in Teams.

**Azure solution:**
- The app service implements the bot and messaging extension experience by providing end points for user communication. The app service hosts the react app in order to display ideas shared by users through tab. User can add/update and delete ideas, upvote the idea and add ideas to all ideas for quick accessibility.
- App endpoint is registered as messaging end point in bot registration portal and provides an endpoint /api/messages to process bot and messaging extension requests/response.
- App service hosts React application for tabs and provides custom APIs in back end for fetching and storing data securely.
- Single Sign On experience is implemented in React application for seamless user authentication.

**Azure bot service:**
- Azure bot service is developed using BOT SDK v4. Share Now web app endpoint is registered as messaging end point in bot registration portal.

**Azure table storage:**
- Azure table storage is used to store post details and user configuration values. Details are provided in section  [Data stores](https://msteams-captain.visualstudio.com/xGrowth%20App%20Templates/_git/msteams-app-submitanidea?path=%2FWiki%2FData-store.md&version=GBv-sals%2FDocumentation&_a=preview).

**Azure search service:**
- Leveraging querying and indexing capabilities of Azure search service for faster retrieval of ideas as per user demand. It provides robust queries over indexed data which overcomes query limitation of table storage.

**IHostService:**
- Recurrence triggered IHostService to hit Table Storage for performing data sync operations on every 12 hours and send digest notification on Weekly/Monthly via running it everyday.

**Application Insights:**
- Application insights is used for tracking and logging. Details are provided in section [Telemetry](/wiki/Telemetry.md).

**Data stores:**
- The web app is using Azure table storage for data storage due to its cost-effective pricing model and providing support for No-SQL data models.
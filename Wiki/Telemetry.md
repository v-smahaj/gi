# Telemetry

Submit an idea app logs telemetry to [Azure Application Insights](https://azure.microsoft.com/en-us/services/monitor/). You can go to the Application Insights blade of the Azure App Service to view basic telemetry about your services, such as requests, failures, and dependency errors, custom events, traces.

App integrates with Application Insights to gather bot activity analytics, as described [here](https://blog.botframework.com/2019/03/21/bot-analytics-behind-the-scenes/).

App logs a few kinds of events:

`Events` logs keeps the track of application events and also logs the user activities like:

- Click throughs on ideas created
- Average number of users creating ideas
- Number of ideas created per week/month
- Total and Unique Users per month
- Average Response Time

`Exceptions` logs keeps the records of exceptions tracked in the application.

*Application Insights queries:*
- This query gives total number of unique users of bot.
```
customEvents
| extend User = tostring(customDimensions.userId)
| summarize dcount(User)
```

- This query gives total number of clicks on created ideas.
```
customEvents
| project name, timestamp
| where name == "Save idea - HTTP Post call initiated"
| summarize count() by name
```

- This query gives number of users creating idea.
```
customEvents
| extend User = tostring(customDimensions.userId)
| project name, User
| where name == "Save idea - HTTP Post call succeeded"
| summarize count() by User
```

- This query gives number of ideas created per week/month.
```
customEvents
| project name, timestamp
| where name contains "Save idea - HTTP Post call succeeded" and (timestamp >= datetime('<<Start date time>>') and timestamp <= datetime('<<End date time>>'))
| summarize count() by name
```

- This query gives average response time of requests.
```
requests
| summarize avg(duration)
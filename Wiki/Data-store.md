# Data stores

The app uses the following data store:

All these resources are created in your Azure subscription. None are hosted directly by Microsoft.

- **Azure Storage Account**
    - [CategoryEntity] to store category created by authors.
    - [TeamCategoryEntity] to store team categories details.
    - [TeamEntity] to store team related data.
    - [TeamIdeaEntity] to store team idea details.
    - [TeamPreferenceEntity] to store preference details for different teams to send digest notification Monthly/Weekly.
    - [TeamTagEntity] to store tag details.
    - [UserVoteEntity] to store user like/vote details.

## Storage account tables

**1. CategoryEntity**
The table has following rows:

|Attribute|Comment |
|--|--|
|PartitionKey|A constant value "Category".|
|RowKey|Unique identifier(GUID) for each category [CategoryId].| 
|TimeStamp|Timestamp of actual record insertion (Done by Azure).|
|CategoryId|Unique identifier(GUID) for each category.|
|CategoryName|Name of the category [Max characters: 150].|
|CategoryDescription|Description of the category [Max characters: 300].|
|CreatedByUserId|User aad object id who created the category.|
|ModifiedByUserId|User aad object id who modified the category.|
|CreatedOn|UTC Date and time at which category is created.|

**2. TeamCategoryEntity**
The table has following rows:

|Attribute|Comment |
|--|--|
|PartitionKey|A constant value "TeamCategoryEntity".|
|RowKey|Unique value for each team where categories are configured [TeamId].| 
|TimeStamp|Timestamp of actual record insertion (Done by Azure).|
|TeamId|Unique value for each team where categories are configured.|
|Categories|Semicolon separated category ids selected by user.|
|CreatedDate|UTC Date and time at which team category is created.|
|CreatedByName|User name who configured categories in team.|
|UserAadId|User aad object id who created the team category.|

**3. TeamEntity**
The table has following rows:

|Attribute|Comment |
|--|--|
|PartitionKey|Team id where application is installed [TeamId].|
|RowKey|Team id where application is installed [TeamId].|
|TimeStamp|Timestamp of actual record insertion (Done by Azure).|
|BotInstalledOn|UTC date and time when the application is installed.|
|ServiceUrl|Service endpoint where operations concerning the referenced conversation.|

**4. TeamIdeaEntity**
The table has following rows:

|Attribute|Comment |
|--|--|
|PartitionKey|A constant value "TeamIdeaEntity".|
|RowKey|Unique identifier(GUID) for each created idea.|
|TimeStamp| Timestamp of actual record insertion (Done by Azure).|
|IdeaId|Unique identifier(GUID) for each created idea.|
|Title|Title of the idea [Max characters: 200]|
|Description|User entered post description value [Max characters: 500].| 
|Category|User selected idea category value.|
|CategoryId|User selected idea category id.|
|Tags|Semicolon separated tags entered by user.|
|CreatedDate|UTC date and time when the idea is submitted/created.|
|CreatedByName|Author name who created idea.|
|UpdatedDate|UTC date and time when the idea is updated.|
|CreatedByObjectId|User aad object id of the author who created the idea.|
|CreatedByUserPrincipleName|User principle name(email id) of author who created the idea.|
|TotalVotes|Total number of likes received for a idea from users.|
|DocumentLinks|Supporting document links for idea in json format.|
|ApproverOrRejecterUserId|User aad object id of user who has approved or rejected the idea.|
|Status|Status of idea. Integer value. 0 = Pending / 1 = Approved / 2 = Rejected.|
|Feedback|Feedback comment if admin has rejected idea request.|

**5. TeamPreferenceEntity**
The table has following rows:

|Attribute|Comment |
|--|--|
|PartitionKey|A constant value "TeamPreferenceEntity".|
|RowKey|Unique value for each team where preference has configured [TeamId].| 
|TimeStamp|Timestamp of actual record insertion (Done by Azure).|
|TeamId|Unique value for each team where preference has configured.|
|DigestFrequency|User selected value for digest frequency i.e. Monthly/Weekly.| 
|Tags|Semicolon separated tags selected by user.|
|Categories|Semicolon separated tags selected by user.|
|CreatedDate|UTC date and time when entry is created.|
|UpdatedDate|UTC date and time when entry is created.|
|PreferenceId|Unique identifier(GUID) for each Team preference.|
|UpdatedByName|User name who updated the configured preference.|
|UpdatedByObjectId|User aad object id of user who updated the configured preference.|

**6. TeamTagEntity**
The table has following rows:

|Attribute|Comment |
|--|--|
|PartitionKey|A constant value "TeamTagEntity".|
|RowKey|Unique value for each team where tags has configured [TeamId].| 
|TimeStamp|Timestamp of actual record insertion (Done by Azure).|
|TeamId|Unique value for each team where tags has configured.|
|Tags|Semicolon separated tags selected by user.|
|CreatedDate|UTC date and time when entry is created.|
|CreatedByName|User name who configured tags in team.|
|UserAadId|User aad object id of user who configured the tags in team.|

**7. UserVoteEntity**
The table has following rows:

|Attribute|Comment |
|--|--|
|PartitionKey|User aad object id of the user [UserId].|
|RowKey|Unique identifier(GUID) for each created post [PostId].| 
|TimeStamp|Timestamp of actual record insertion (Done by Azure).|
|UserId|User aad object id of the user.|
|PostId|Unique identifier(GUID) for each created post.|
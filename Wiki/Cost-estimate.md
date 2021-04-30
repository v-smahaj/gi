# Cost estimates

## Assumptions
The estimate below assumes:
- Tenant has 1 team containing 100 users.

## [](/wiki/Cost-estimate#estimated-load)Estimated load
**Data storage:** Up to 1 GB usage of azure table storage.

**Table data operations (monthly):**
- Storage is called to add new idea.
    - 1 team member adds 3 ideas per day = 90 ideas per month = 90 write calls to storage.
    - Total number of write calls for TeamIdeaEntity table = 100 users * 90 ideas = 9000 calls.
- Storage is called to update existing idea.
    - 1 team member updates 1 idea per day = 30 ideas per month = 30 write calls to storage.
    - Total number of write calls for TeamIdeaEntity table = 100 users * 30 ideas = 3000 calls.
- Storage is called to delete existing idea.
    - 1 team member deletes 10 ideas per month = 10 delete calls to storage.
    - Total number of delete calls for TeamIdeaEntity table = 100 users * 10 ideas = 1000 calls.
- Storage is called to update total votes count for idea.
    - 1 team member upvotes/downvotes 20 idea per day = 600 per month = 600 write calls to storage.
    - Total number of write calls for TeamIdeaEntity table = 100 users * 600 ideas = 60000 calls.
- Storage is called to set up team preferences.
    - 1 team updates preference settings 2 times a month = 2 per month = 2 write calls to storage.
    - Total number of write calls for TeamPreferenceEntity table = 1 team * 2 calls for update/insert = 2 calls.
- Storage is called to add idea to user's private list.
    - 1 team member adds 1 idea to private list per day = 30 ideas per month = 30 write calls to storage.
    - Total number of write calls for UserPrivatePostEntity table = 100 users * 30 ideas = 3000 calls.
- Storage is called to delete idea to user's private list.
    - 1 team member deletes 1 idea from private list per day = 30 ideas per month = 30 delete calls to storage.
    - Total number of delete calls for UserPrivatePostEntity table = 100 users * 30 ideas = 3000 calls.
- Storage is called to retrieve user's private list.
    - 1 team member views private list 10 times per day = 300 times per month = 300 read calls to storage.
    - Total number of read calls for UserPrivatePostEntity table = 100 users * 300 ideas = 30000 calls.
- Storage is called to fetch team preferences.
    - For updating preferences, existing record is fetched = 2 per month = 2 read calls to storage.
    - Total number of read calls for TeamPreferenceEntity table = 1 team * 2 calls = 2 calls.
- Azure Search service reads data for indexing.
    - For instantly reflecting data in Azure Search service, indexer is triggered manually whenever change happens to database
- Considering all write calls mentioned previously:
    - Total number of read calls for TeamIdeaEntity table = 73000 write calls = 73000 read calls.
    - Total estimated read calls: 103,002
    - Total estimated write calls: 79,002
    - Total storage calls: 182,004

## Estimated cost
**IMPORTANT:**
- This is only an estimate, based on the assumptions above. Your actual costs may vary.
- Prices were taken from the [Pricing](https://azure.microsoft.com/en-us/pricing/) on 09 June 2020, for the West US 2 region.
- Use the [Azure Pricing Calculator](https://azure.com/e/e8b40cb7e5a44d239e66461948daaf7e) to model different service tiers and usage patterns.

## SKU recommendations

The recommended SKU for a production environment is:

 - App Service: Standard (S1)
 - Azure Search: Basic (The Azure Search service cannot be upgraded once it is provisioned, so select a tier that will meet your anticipated needs).
## [](https://github.com/OfficeDev/microsoft-teams-TODO-app/wiki/Cost-estimate#estimated-cost)Estimated cost


|**Resource**|**Tier**|**Load**|**Monthly price**|
|--------------------------|-----------------|-------------------------|--------------------------------------
|Bot Channels Registration|F0|N/A|Free|
|App Service Plan|S1 |744 hours|$74.40|
| App Service (Messaging Extension)| -|  |(charged to App Service Plan)|
| Azure Search|B||$75.14|
|Application Insights (Bot)|||(free up to 5 GB)|
| Storage account (Table)| Standard_LRS|< 1GB data & 182,004 operations| $0.05 + $0.01 = $0.06 |
|Total|||**$149.6**|
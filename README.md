# Open Pension Tsofen

This the repository for the Open Pension backend for the Tsofen project. The address is 
https://open-pension-tsofen.herokuapp.com/. 

## Endpoints

### Homepage

The homepage will show you all the endpoints which are available to use. format is:

* `message` - A simple string
* `apis` - list of apis:
    * `/types` - All the entities for the given data type.
    * `/type/{id}` - a single entry of the given. The `ID` will the ID from the list of entities.
    
For example, `/dimProxies` will retrieve all the proxies. If you'll head to `dimProxy/1` you'll get the proxy with the 
ID 1. 

### Dim proxies

Accessing:
* `all`: `/api/dimProxies`
* `single`: `/api/dimProxy/{id}`

This endpoint will retrieve all the topics which the voting right owners can participate.

Description:
* `Proxy_Code` - An identifier for topic
* `Security_ID`: 520040700 - ??
* `Topic` - The topic of voting
* `Date` - The date of the vote
* `source` - The URL which the voting has been originated

### Proxies

Accessing:
* `all`: `/api/proxies`
* `single`: `/api/proxy/{id}`

The endpoint will retrieve all the participants for any vote.

Description:
* `Proxy_Code` - Reference to a Dim proxy with the same `Proxy_Code` value 
* `Officers_ID` - 64516271
* `Officers_Name` - The full name of the participant
* `Oficer_Birthday` - The birthday of the participant
* `Oficer_Personal_interest` - ??
* `Oficer_education` - The education of the participant
* `Oficer_VC` - The VC of the participant
* `Oficer_Other_jobs` - More position which the participant took over
* `Relative` - ??
* `Financial expert` - ??

Note: `Relative` and `Financial expert` will return `כן` or `לא` as a possible values


## Advanced queries

## Run and deployment

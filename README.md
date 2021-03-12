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
* `Security_ID` - Represents the stocks which relate to the current voting
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
* `Oficer_Personal_interest` - How does the candidate is relate to the company which the voting will impact
* `Oficer_education` - The education of the participant
* `Oficer_VC` - The VC of the participant
* `Oficer_Other_jobs` - More position which the participant took over
* `Relative` - Does the participant related to voting subject
* `Financial expert` - Does the participant is a financial expert

Note: `Relative` and `Financial expert` will return `כן` or `לא` as a possible values

### Interest

Accessing:
* `all`: `/api/interests`
* `single`: `/api/interest/{id}`

Description:
* `Security_ID` - A number which represent stocks. This will help you see which stocks correlate to which dim proxy. 
* `company_name` - The company name
* `Sector Nisha` - The sector niche which the company has activity at
* `fund_name` - The fund name.
* `Chanel` - The channel name.
* `A AVE Vote` - The holding which a company has in the stock

### Body channels

Accessing:
* `all`: `/api/bodyChannels`
* `single`: `/api/bodyChannel/{name}`


Aggregate all bodies and their channels. The key represent the name of the body, and the value is a list with the 
channels:

```json
{
  "data": {
    "מור": [
      "גמל/פנסיה"
    ],
    "פסגות": [
      "גמל/פנסיה"
    ],
    "מגדל": [
      "ביטוח",
      "גמל/פנסיה"
    ]
  }
}
```

## Advanced queries

### Filtering
In addition to access an entity by a given ID you can filter items by using the query parameters. For example, I want to 
filter interests items by the Security ID. The address will look like `api/interests?filter[Security_ID]=1084698`. You 
can more filters: `api/interests?filter[Security_ID]=1084698&filter[Chanel]=גמל/פנסיה`

### Using the pager
By default, each endpoint returns a list of 25 items per page. Each endpoint has the `info` section which gives info
about paging:
* `current` - The page of pager
* `pages` - The total number of pages
* `next` - The address for the next page; Optional, will not appear in the **last** page
* `previous` - The address for the previous one; Optional, will not appear in the **first** page

## Run and deployment

### Installing
Like any node based project:
```bash
npm i
```

After that you can run:
```bash
npm start
```

The server will be available in `http://localhost:3000`

### Converting an excel file to JSON
For now, we are using an excel file as the "DB". The name of the file need to be `source.xlsx` in order for the 
procedure to succeed. Once the file need to be located **in the root folder of the project** you'll need to run:
```bash
npm run excel-to-json
```

### Deployment
No need to hustle here. The project connected to heroku auto deployment pipeline which means that any merge will be 
available after a couple of minutes.

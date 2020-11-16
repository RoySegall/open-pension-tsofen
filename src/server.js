const express = require('express');
const path = require('path');
const fs = require('fs')
const app = express();

const port = process.env.PORT || 3000;

const apis = {
  dimCompanies: {
    plural: 'dimCompanies',
    single: 'dimCompany',
  },
  dimManagers: {
    plural: 'dimManagers',
    single: 'dimManager',
  },
  dimProxies: {
    plural: 'dimProxies',
    single: 'dimProxy',
  },
  InterestParties: {
    plural: 'InterestParties',
    single: 'InterestParty',
  },
  proxies: {
    plural: 'proxies',
    single: 'proxy',
  },
};

const perPage = 25;
const getCurrentAddress = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;

app.get('/', (req, res) => {
  const address = getCurrentAddress(req);

  res.send({
    message: "welcome! Have a look at the apis",
    apis: Object.entries(apis).map(api => {
      const [_, routes] = api;
      return [`${address}${routes.plural}`, `${address}${routes.single}/{id}`]
    })
  })
});

Object.entries(apis).map(api => {
  const [file, routes] = api;
  const getFilePath = () => path.join(process.cwd(), 'assets', `${file}.json`);

  app.get(`/${routes.plural}`, (req, res) => {
    try {
      // Read the file content and parse it.
      const fileContent = fs.readFileSync(getFilePath(), 'utf8');
      const objectsFromFiles = JSON.parse(fileContent);

      // Calculate the current page and the keys we need to display in the current page.
      const page = parseInt(req.query.page ? req.query.page : 0);
      const objectIdentifiers = Object.keys(objectsFromFiles);
      const slicedKeys = objectIdentifiers.slice(page * perPage, (page + 1) * perPage);

      // Building the current data for the page.
      const data = {};
      slicedKeys.map(key => data[key] = objectsFromFiles[key]);

      // Build the info section.
      let address = getCurrentAddress(req);
      address = address.split('?')[0];

      const info = {
        current: page,
        pages: Math.floor(objectIdentifiers.length / perPage),
      };

      if (info.pages !== 1) {

        if (info.pages > page) {
          info.next = `${address}?page=${page + 1}`;
        }

        if (page > 0) {
          info.previous = `${address}?page=${page - 1}`;
        }
      }

      res.send({data, info});
    } catch (e) {
      res.status(400).json({message: 'There was an error. Please try again later'});
      return console.log(e);
    }
  });

  app.get(`/${routes.single}/:id`, async (req, res) => {
    const id = req.params.id;
    const file = fs.readFileSync(getFilePath(), 'utf8');
    const parsedFile = JSON.parse(file);

    if (parsedFile[id] == null) {
      res
        .status(404)
        .json({error: 'The entity was not found. Please try again'});
    }

    res.json(parsedFile[id]);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

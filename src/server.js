const express = require('express');
const path = require('path');
const fs = require('fs')
const app = express();

const port = process.env.PORT || 3000;

const apis = {
  questions: {
    plural: 'questions',
    single: 'question',
  }
};

app.get('/', (req, res) => {
  const address = req.protocol + '://' + req.get('host') + req.originalUrl;

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
    fs.readFile(getFilePath(), 'utf8', function (err,data) {

      if (err) {
        res.status(400).json({message: 'There was an error. Please try again later'});
        return console.log(err);
      }

      res.send(JSON.parse(data));
    });
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

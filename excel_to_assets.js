const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');

const sheets = [
  {origin: 'Interest Parties', output: 'interest', shouldCreateBodyChanelOutput: true},
  {origin: 'Proxy', output: 'proxies', shouldCreateBodyChanelOutput: false},
  {origin: 'Dim Proxy', output: 'dimProxies', shouldCreateBodyChanelOutput: false},
];

const bodyNameField = 'שם גוף';

function writeJSONToFile({output, jsonFile}) {
  fs.writeFile(`./assets/${output}.json`, JSON.stringify(jsonFile), function (err) {

    if (err) {
      return console.log(err);
    }

    console.log(`The file ${output}.json was written OK! 🤠`);
  });
}

sheets.map(({origin, output, shouldCreateBodyChanelOutput}) => {
  const jsonFile = {};
  let first = true;
  let headers = [];

  readXlsxFile('./source.xlsx', {sheet: origin}).then((rows) => {
    const bodyChannelJson = {};

    rows.forEach((row, index) => {
      if (first) {
        headers = row;
        first = false;
        return;
      }

      console.info(`Handle line ${index} in file ${origin}`);

      const jsonRow = {};
      headers.forEach((key, i) => jsonRow[key] = row[i]);

      jsonFile[index] = jsonRow;

      if (shouldCreateBodyChanelOutput) {
        const {[bodyNameField]: bodyName, Chanel} = jsonRow;
        console.log(bodyName, Chanel);

        // Init the object.
        if (!Object.keys(bodyChannelJson).includes(bodyName)) {
          bodyChannelJson[bodyName] = [];
        }

        if (!bodyChannelJson[bodyName].includes(Chanel)) {
          bodyChannelJson[bodyName].push(Chanel)
        }
      }
    });

    // Writing the file which represent the sheet from the excel.
    writeJSONToFile({output, jsonFile});

    // Writing the file for the body-channel entry point.
    if (shouldCreateBodyChanelOutput) {
      writeJSONToFile({output: 'bodyChannels', jsonFile: bodyChannelJson});
    }

  }).catch((e) => {
    console.error(e);
  });

});

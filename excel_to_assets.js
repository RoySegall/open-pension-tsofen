const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');

const sheets = [
  {origin: 'Interest Parties', output: 'interest', primaryKey: null},
  {origin: 'Proxy', output: 'proxies', primaryKey: null},
  {origin: 'Dim Proxy', output: 'dimProxies', primaryKey: null},

];

sheets.map((sheet) => {
  const jsonFile = {};
  let first = true;
  let headers = [];

  readXlsxFile('./foo.xlsx', {sheet: sheet.origin}).then((rows) => {

    rows.map(async (row, index) => {
      if (first) {
        headers = row;
        first = false;
        return
      }

      console.info(`Handle line ${index} in file ${sheet.origin}`);

      const jsonRow = {};
      headers.forEach((key, i) => jsonRow[key] = row[i]);

      const key = sheet.primaryKey ? jsonRow[sheet.primaryKey] : index;
      jsonFile[key] = jsonRow;
    });

    fs.writeFile(`./assets/${sheet.output}.json`, JSON.stringify(jsonFile), function (err) {

      if (err) {
        return console.log(err);
      }

      console.log(`The file ${sheet.output}.json was written OK! 🤠`);
    });

  }).catch((e) => {
    console.error(e);
  });

});

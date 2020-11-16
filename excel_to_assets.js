const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');

const sheets = [
  {origin: 'Proxy', output: 'proxies',primaryKey: null},
  {origin: 'Interest Parties', output: 'interestParties', primaryKey: null},

  {origin: 'Dim Manager', output: 'dimManagers', primaryKey: 'Manager_ID'},
  {origin: 'Dim Compamy', output: 'dimCompanies', primaryKey: 'Compane_ID'},
  {origin: 'Dim Proxy', output: 'dimProxies', primaryKey: 'Proxy_Code'},
];

sheets.map((sheet) => {
  const jsonFile = {};
  let first = true;
  let headers = [];

  readXlsxFile('/Applications/MAMP/htdocs/open_pension_tsofen/excel.xlsx', {sheet: sheet.origin}).then((rows) => {

    rows.map((row, index) => {
      if (first) {
        headers = row;
        first = false;
        return
      }
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

  });

});

function doPost(e) {
  insert(JSON.parse(e.postData.contents));
  return ContentService
    .createTextOutput('{"message": "ok"}')
    .setMimeType(ContentService.MimeType.JSON);
}

function testInsert() {
  insert({
    name: 'test',
    subject: 'yo',
    device: 'aaa',
    version: '111',
    message: 'fodsa',
    email: 'a@ngs.io'
  });
}

function insert(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.subject,
    data.device,
    data.version,
    data.message
  ]);
}

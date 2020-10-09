const { writeFileSync } = require('fs')
const xlsx = require('./index.js')
const express = require('express')
const app = express()
const port = 7070

var columns = [
  { label: 'Email', value: 'email' },
  { label: 'Age', value: row => (row.age + ' years') },
  { label: 'Password', value: row => (row.hidden ? row.hidden.password : '') }
]

var content = [
  { email: 'Ana', age: 16, hidden: { password: '11111111' } },
  { email: 'Luis', age: 19, hidden: { password: '12345678' } }
]

var settings = {
  sheetName: 'First sheet',
  fileName: 'Users'
}

app.get('/', (req, res) => {
  var buffer = xlsx(columns, content, settings, false)
  res.writeHead(200, {
    'Content-Type': 'application/octet-stream',
    'Content-disposition': `attachment; filename=${settings.fileName}.xlsx`
  })
  res.end(buffer)
})

app.get('/local', (req, res) => {
  var buffer = xlsx(columns, content, settings, false)
  const homedir = require('os').homedir()
  writeFileSync(`${homedir}/Postman/mySheet.xlsx`, buffer)
  res.status(200).send('xd')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
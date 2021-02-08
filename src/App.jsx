import React, { useEffect, useState } from 'react'
import Papa from 'papaparse'
import Table from './table/Table'
import ErrorRequiredFields from './table/ErrorRequiredFields'
import ErrorType from './table/ErrorType'
import file from './data/lawyerList.csv'


const App = () => {

  const [rows, setRows] = useState([])
  const [type, setType] = useState(null)


  async function getType() {
    const response = await fetch(file)
    
    console.log(response)
    const type = response.url.split('.').pop()

    setType(type)
  }

  async function getRows() {
    
    const response = await fetch(file)
    const reader = response.body.getReader()
    const result = await reader.read() // raw array
    const decoder = new TextDecoder('utf-8')
    const csv = decoder.decode(result.value) // the csv text
    const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
    const rows_ = results.data // array of objects
    const rows = rows_.slice(0, -1)

    console.log(results)
    console.log(rows)

    setRows(rows)
  }

  useEffect(() => {
    
    getType()

  }, [])

  let emptyCell = []

  for (let row of rows) {
    if (row.FullName === '' | row.Phone === '' | row.Email === '') {
      emptyCell.push('')
    }
  }
  // recieve emails
  let emails = []
  for (let row of rows) {
    emails.push(row.Email.toLowerCase())
  }

  // recieve phones
  let phones = []
  for (let row of rows) {
    if (row.Phone.length === 10) {
      phones.push('+1' + row.Phone)
    } else if (row.Phone.length === 11) {
      phones.push('+' + row.Phone)
    } else {
      phones.push(row.Phone)
    }
  }

  // find duplicate phone
  let duplicatePhone = []

  for (let i = 0; i < phones.length; i++) {
    let a = []
    for (let j = 0; j < phones.length; j++) {
      if (phones[i].trim() === phones[j].trim() && i !== j) {
        a.push(j)
      }
    }
    if (a[0] === undefined) {
      duplicatePhone.push(null)
    } else {
      duplicatePhone.push(a[0])
      a.length = 0
    }
  }

  // find duplicate email
  let duplicateEmail = []

  for (let i = 0; i < emails.length; i++) {
    let a = []
    for (let j = 0; j < emails.length; j++) {
      if (emails[i].trim() === emails[j].trim() && i !== j) {
        a.push(j)
      }
    }
    if (a[0] === undefined) {
      duplicateEmail.push(null)
    } else {
      duplicateEmail.push(a[0])
      a.length = 0
    }
  }


  return (
    <div >

      {type !== 'csv' && type !== null
        ?
        <div>
          <button style={{ backgroundColor: 'lime', margin: '20px', padding: '15px' }} disabled>Import file</button>
          <ErrorType />
        </div>
        : emptyCell.length > 0
          ?
          <div>
            <button style={{ backgroundColor: 'lime', margin: '20px', padding: '15px' }} disabled>Import file</button>
            <ErrorRequiredFields />
          </div>
          :

          <div>
            <button style={{ backgroundColor: 'lime', margin: '20px', padding: '15px' }} onClick={getRows} >Import file</button>

            <Table duplicateEmail={duplicateEmail} duplicatePhone={duplicatePhone} rows={rows} />
          </div>

      }
    </div>
  )
}

export default App

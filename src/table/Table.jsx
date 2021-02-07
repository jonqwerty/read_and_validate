import React, { useState } from 'react'



const theadStyle = {
  border: '1px solid black',
  backgroundColor: 'aqua',
  padding: '5px'
}

const tbodyStyle = {
  border: '1px solid black',
}

const errorStyle = {
  border: '1px solid black',
  backgroundColor: 'pink',
}



const Table = (props) => {

  // get curent date in format yyyy-mm-dd
  let today = new Date()
  let dd = String(today.getDate()).padStart(2, '0')
  let mm = String(today.getMonth() + 1).padStart(2, '0')
  let yyyy = today.getFullYear()

  today = yyyy + '-' + mm + '-' + dd
  console.log(today)

  // get curent date in format mm/dd/yyyy
  let today2 = new Date()
  let dd2 = String(today2.getDate()).padStart(2, '0')
  let mm2 = String(today2.getMonth() + 1).padStart(2, '0')
  let yyyy2 = today2.getFullYear()

  today2 = mm2 + '/' + dd2 + '/' + yyyy2
  console.log(today2)



  return (
    <div>
      <table style={{ border: '1px solid black', borderCollapse: 'collapse', margin: 'auto', marginTop: '50px' }} >
        <thead>
          <tr >
            <th style={theadStyle}>ID</th>
            <th style={theadStyle}>Full Name</th>
            <th style={theadStyle}>Phone</th>
            <th style={theadStyle}>Email</th>
            <th style={theadStyle}>Age</th>
            <th style={theadStyle}> Experience</th>
            <th style={theadStyle}> Yearly Income</th>
            <th style={theadStyle}>Has children</th>
            <th style={theadStyle}>License state</th>
            <th style={theadStyle}>Expiration date</th>
            <th style={theadStyle}>License number</th>
            <th style={theadStyle}>Duplicate with</th>
          </tr>
        </thead>
        <tbody>

          {props.rows.map((item, index) => (
            <tr key={index}>
              <td style={tbodyStyle}>{index + 1}</td>
              <td style={tbodyStyle}>{item.FullName.trim()}</td>

              { item.Phone.length === 10
                ? <td style={tbodyStyle}>{'+1' + item.Phone.trim()}</td>
                : item.Phone.length === 11
                  ? <td style={tbodyStyle}>{'+' + item.Phone.trim()}</td>
                  : <td style={tbodyStyle}>{item.Phone.trim()}</td>}

              <td style={tbodyStyle}>{item.Email.trim()}</td>

              { Number.isInteger(+item.Age) && +item.Age > 0 && +item.Age >= 21
                ? <td style={tbodyStyle}>{item.Age.trim()}</td>
                : <td style={errorStyle}>{item.Age.trim()}</td>}

              {+item.Experience >= 0 && +item.Experience < +item.Age
                ? <td style={tbodyStyle}>{item.Experience.trim()}</td>
                : <td style={errorStyle}>{item.Experience.trim()}</td>}

              {+item.YearlyIncome < 1000000
                ? <td style={tbodyStyle}>{(+item.YearlyIncome.trim()).toFixed(2)}</td>
                : <td style={errorStyle}>{(+(item.YearlyIncome.trim())).toFixed(2)}</td>}

              {item.Haschildren.toLowerCase() === 'true' || item.Haschildren.toLowerCase() === 'false' || item.Haschildren.toLowerCase() === ''
                ? <td style={tbodyStyle}>{item.Haschildren.trim()}</td>
                : <td style={errorStyle}>{item.Haschildren.trim()}</td>}

              <td style={tbodyStyle}>{item.Licensestates.trim()}</td>

              {item.Expirationdate.match(/\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/) && new Date(item.Expirationdate) < new Date(today)
                ? <td style={tbodyStyle}>{item.Expirationdate.trim()}</td>
                : item.Expirationdate.match(/(0[1-9]|1[0-9]|2[0-9]|3[0,1])([/+-])(0[1-9]|1[0-2])([/+-])(19|20)[0-9]{2}/) && new Date(item.Expirationdate) < new Date(today2)
                  ? <td style={tbodyStyle}>{item.Expirationdate.trim()}</td>
                  : <td style={errorStyle}>{item.Expirationdate.trim()}</td>}

              {item.Licensenumber.length === 6 && item.Licensenumber.match("^[a-zA-Z0-9]+$")
                ? <td style={tbodyStyle}>{item.Licensenumber.trim()}</td>
                : <td style={errorStyle}>{item.Licensenumber.trim()}</td>}

              {props.duplicatePhone[index] === null && props.duplicateEmail[index] === null
                ? <td style={tbodyStyle}></td>
                : props.duplicatePhone[index] === null && props.duplicateEmail[index] !== null
                  ? <td style={tbodyStyle}>{props.duplicateEmail[index] + 1}</td>
                  : props.duplicatePhone[index] !== null && props.duplicateEmail[index] === null
                    ? <td style={tbodyStyle}>{props.duplicatePhone[index] + 1}</td>
                    : props.duplicatePhone[index] < props.duplicateEmail[index]
                      ? <td style={tbodyStyle}>{props.duplicatePhone[index] + 1}</td>
                      : <td style={tbodyStyle}>{props.duplicateEmail[index] + 1}</td>}


            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default Table
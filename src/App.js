import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import { CSVLink } from 'react-csv'
import { Button } from '@mui/material'

export default function App() {
  const uploadedDoc = useRef(null)
  const data = [
    {
      nim: 2020230044,
      name: 'Khoirul Mustaan',
      major: 'Teknologi Informasi',
      university: 'Universitas Darma Persada ',
    },
    {
      nim: 2020230018,
      name: 'Muhammad Respati Abimanyu Putro',
      major: 'Teknologi Informasi',
      university: 'Universitas Darma Persada ',
    },
    {
      nim: 2020230065,
      name: 'Muhammad Faiz',
      major: 'Teknologi Informasi',
      university: 'Universitas Darma Persada ',
    },
    {
      nim: 2020230100,
      name: 'Ahmad Hussein Al Fajri',
      major: 'Teknologi Informasi',
      university: 'Universitas Darma Persada ',
    },
    {
      nim: 2020230059,
      name: 'Muhammad Hatta Alfaritzy',
      major: 'Teknologi Informasi',
      university: 'Universitas Darma Persada ',
    },
    {
      nim: 2020230003,
      name: 'Dhafa Syarif C.K',
      major: 'Teknologi Informasi',
      university: 'Universitas Darma Persada ',
    },
    {
      nim: 2020230043,
      name: 'Aclis Setyo Prihananto',
      major: 'Teknologi Informasi',
      university: 'Universitas Darma Persada ',
    },
    {
      nim: 2020230074,
      name: 'Josi gunawan',
      major: 'Teknologi Informasi',
      university: 'Universitas Darma Persada ',
    },
    {
      nim: 2020230013,
      name: 'Maisyarah Salsabila',
      major: 'Teknologi Informasi',
      university: 'Universitas Darma Persada ',
    },
    {
      nim: 2020230016,
      name: 'Dinda Nurul',
      major: 'Teknologi Informasi',
      university: 'Universitas Darma Persada ',
    },
  ]

  const [rows, setRows] = useState([])

  let headers = [
    { label: 'Nama', key: 'name' },
    { label: 'Nim', key: 'nim' },
    { label: 'Jurusan', key: 'major' },
    { label: 'Universitas', key: 'university' },
  ]

  const handleImportCSV = (value) => {
    const reader = new FileReader()

    reader.onload = function (e) {
      const text = e.target.result
      processCSV(text)
    }

    reader.readAsText(value)
  }

  function renameObject(oldObj, newObj) {
    return oldObj.map((item, index) => {
      item = newObj[index]
      return item
    })
  }

  const processCSV = async (str, delim = ';') => {
    const headers = str.slice(0, str.indexOf('\n')).split(delim)
    const rows = str.slice(str.indexOf('\n') + 1).split('\n')
    const newHeaders = ['nim', 'name', 'major', 'university']
    const resultHeaders = await renameObject(headers, newHeaders)
    const newArray = rows.map((row) => {
      const values = row.split(delim)
      const eachObject = resultHeaders.reduce((obj, header, i) => {
        obj[header] = values[i].replace(/^"(.*)"$/, '$1')
        return obj
      }, {})
      return eachObject
    })
    setRows(newArray)
  }

  console.log('new rows', rows)

  useEffect(() => {
    setRows(data)
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: 10,
        alignItems: 'center',
      }}>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <CSVLink
          data={data}
          headers={headers}
          filename={`data-${moment().format('YYYYMMDDHHmmss')}.csv`}
          separator=';'>
          <Button variant='contained' color='secondary'>
            <Typography
              align='left'
              sx={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>
              Export To CSV
            </Typography>
          </Button>
        </CSVLink>
        <input
          type='file'
          ref={uploadedDoc}
          hidden
          onChange={(e) => handleImportCSV(e?.target?.files[0])}
        />
        <Button
          onClick={() => uploadedDoc.current.click()}
          variant='contained'
          color='info'
          sx={{ ml: 1 }}>
          <Typography
            align='left'
            sx={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>
            Import CSV To JSON
          </Typography>
        </Button>
        <Button
          onClick={() => setRows([])}
          variant='contained'
          color='info'
          sx={{ ml: 1 }}>
          <Typography
            align='left'
            sx={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>
            Clear Data
          </Typography>
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Nim</TableCell>
            <TableCell>Jurusan</TableCell>
            <TableCell>Universitas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item) => (
            <TableRow>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.nim}</TableCell>
              <TableCell>{item.major}</TableCell>
              <TableCell>{item.university}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

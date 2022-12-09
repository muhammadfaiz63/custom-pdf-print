import React, { forwardRef, useEffect, useRef, useState } from 'react'
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
import { Button, Card, Grid, TextField, Select, MenuItem } from '@mui/material'
import { Container, height } from '@mui/system'
import html2pdf from 'html2pdf.js'

export default function App() {
  const uploadedDoc = useRef(null)

  const [rows, setRows] = useState([])
  const [widthPaper, setWidthPaper] = useState(500)
  const [heightPaper, setHeightPaper] = useState(800)
  const [paddingPaper, setPaddingPaper] = useState(5)
  const [orientation, setOrientation] = useState('portrait')
  const [nameFile, setNameFile] = useState('')

  var element = useRef()

  var opt = {
    margin: paddingPaper,
    filename: nameFile ? nameFile + '.pdf' : 'Test.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation },
  }

  const handlePrint = async () => {
    html2pdf().from(element.current).set(opt).preview()
  }

  const Content = forwardRef((props, ref) => {
    return (
      <Card
        ref={ref}
        sx={{
          width:
            orientation === 'landscape'
              ? heightPaper
              : orientation === 'portrait'
              ? widthPaper
              : 500,
          height:
            orientation === 'landscape'
              ? widthPaper
              : orientation === 'portrait'
              ? heightPaper
              : 800,
          padding: paddingPaper ? paddingPaper : 5,
        }}>
        <div>header</div>
        <div>content</div>
      </Card>
    )
  })

  return (
    <div
      style={{
        backgroundColor: '#f0f0f0',
        flex: 1,
        display: 'flex',
        paddingBottom: 50,
      }}>
      <Container>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            py: 2,
            mt: 2,
          }}>
          <Grid container alignItems='center' justifyContent='flex-end'>
            <div style={{ marginLeft: 10 }}>
              <Typography>Nama File PDF</Typography>
              <TextField
                color='info'
                type='text'
                value={nameFile}
                placeholder='Nama File PDF'
                onChange={(e) => {
                  setNameFile(e.target.value)
                }}
              />
            </div>
            <div style={{ marginLeft: 10 }}>
              <Typography>Orientation</Typography>
              <Select
                color='info'
                onChange={(e) => {
                  setOrientation(e.target.value)
                }}
                value={orientation}>
                <MenuItem value={'landscape'}>Landscape</MenuItem>
                <MenuItem value={'portrait'}>Portrait</MenuItem>
              </Select>
            </div>
            <div style={{ marginLeft: 10 }}>
              <Typography>Jarak Konten</Typography>
              <TextField
                color='info'
                type='text'
                value={paddingPaper}
                placeholder='Jarak Content'
                onChange={(e) => {
                  setPaddingPaper(Number(e.target.value))
                }}
              />
            </div>
            <div style={{ marginLeft: 10 }}>
              <Typography>Lebar</Typography>
              <TextField
                color='info'
                type='text'
                value={widthPaper}
                placeholder='Lebar'
                onChange={(e) => {
                  setWidthPaper(Number(e.target.value))
                }}
              />
            </div>
            <div style={{ marginLeft: 10 }}>
              <Typography>Tinggi</Typography>
              <TextField
                color='info'
                type='text'
                value={heightPaper}
                placeholder='Lebar'
                onChange={(e) => {
                  setHeightPaper(Number(e.target.value))
                }}
              />
            </div>
            <Button
              variant='contained'
              color='info'
              sx={{ ml: 1, width: 100, height: 50, mt: 3 }}
              onClick={handlePrint}>
              <Typography
                align='left'
                sx={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>
                Download
              </Typography>
            </Button>
          </Grid>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Content ref={element} />
        </Box>
      </Container>
    </div>
  )
}

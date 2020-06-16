import React from 'react';
import { Page } from '../../widget/page';
import { useParams } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Check from '@material-ui/icons/Check';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { BackButton } from '../../widget/controls';
export default function () {
  const id = useParams().id || 0;
  return (
    <Page className="paper" src={'dosen/laporan/' + id}>
      {({ data }) => {
        const pertemuan = [];
        const mahasiswa = {};
        data.pertemuan.forEach((x, i) => {
          pertemuan.push(x.pertemuan_tanggal);
          x.absen.forEach(y => {
            if (!mahasiswa[y.nim]) {
              mahasiswa[y.nim] = {
                nim: y.nim,
                nama: y.nama,
                absen: []
              };
            }
            while (mahasiswa[y.nim].absen.length < i) {
              mahasiswa[y.nim].absen.push(0);
            }
            mahasiswa[y.nim].absen.push(1);
          });
        });
        const rows = Object.values(mahasiswa);
        rows.sort((a, b) => a.nim - b.nim);
        return <>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>NIM</TableCell>
                  <TableCell>Nama</TableCell>
                  {
                    pertemuan.map((x, i) => <TableCell key={i}>{new Date(x).toLocaleDateString("id-ID", {
                      day: '2-digit',
                      month: '2-digit',
                    })}</TableCell>)
                  }
                  <TableCell>Jumlah</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  rows.map(x => <TableRow key={x.nim}>
                    <TableCell>{x.nim}</TableCell>
                    <TableCell>{x.nama}</TableCell>
                    {
                      x.absen.map((y, i) => (
                        <TableCell key={i}>{y ? <Check /> : ''}</TableCell>
                      ))
                    }
                    <TableCell>{x.absen.reduce((a, b) => a + b, 0)}</TableCell>
                  </TableRow>)
                }
              </TableBody>
            </Table>
          </TableContainer>
          <Box displayPrint="none">

          <Button onClick={print} style={{width: '100%'}}>Cetak</Button>
          <BackButton />
          </Box>
        </>
      }}
    </Page>)
}

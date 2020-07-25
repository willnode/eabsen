import React from 'react';
import { Page } from '../../widget/page';
import { useParams } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Check from '@material-ui/icons/Check';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { BackButton } from '../../widget/controls';
import { Grid } from '@material-ui/core';
import { publicUrl } from '../../main/Config';

export default function () {
  const id = useParams().id || 0;
  return (
    <Page src={'dosen/laporan/' + id}>
      {({ data }) => {
        const pertemuan = [];
        const mahasiswa = {};
        data.pertemuan.forEach((x, i) => {
          pertemuan.push(x.pertemuan_tanggal);
          x.absen.forEach(y => {
            if (!mahasiswa[y.identity]) {
              mahasiswa[y.identity] = {
                identity: y.identity,
                nama: y.nama,
                absen: []
              };
            }
            while (mahasiswa[y.identity].absen.length < i) {
              mahasiswa[y.identity].absen.push(0);
            }
            mahasiswa[y.identity].absen.push(1);
          });
        });
        const rows = Object.values(mahasiswa);
        rows.sort((a, b) => a.identity - b.identity);
        return <>
          <Box displayPrint="none" margin="10px 0" padding="10px">
            <Button variant="contained" onClick={print} style={{ width: '100%' }}>Cetak</Button>
            <BackButton />
          </Box>
          <div style={{ padding: '10px' }}>
            <Grid container>
              <Grid item xs={2}>
                <img src={publicUrl+"/assets/AKSI.png"} alt="" width="90%" style={{ margin: 'auto', display: 'block' }} />
              </Grid>
              <Grid item xs={10} style={{ paddingLeft: '10px' }}>
                <h1>Laporan {data.kelas_matakuliah}</h1>
                <h3>AKADEMI KOMUNITAS SEMEN INDONESIA - GRESIK</h3>
                <p>Kompleks Pabrik PT. Semen Indonesia (Persero) Tbk. Jl. Veteran Gresik<br />
                Telp/Fax : 031-39988394 Email: aksi.semenindonesia@gmail.com</p>
              </Grid>
            </Grid>
          </div>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell className="black-cell" rowSpan="3">No</TableCell>
                <TableCell className="black-cell" rowSpan="3">NIM</TableCell>
                <TableCell className="black-cell" rowSpan="3">Nama</TableCell>
                <TableCell className="black-cell center" colSpan={pertemuan.length}>Pertemuan</TableCell>
                <TableCell className="black-cell" rowSpan="3">Jumlah</TableCell>
              </TableRow>
              <TableRow>
                {
                  pertemuan.map((x, i) => <TableCell className="black-cell" key={i}>{i + 1}</TableCell>)
                }
              </TableRow>
              <TableRow>
                {
                  pertemuan.map((x, i) => <TableCell className="black-cell" key={i}>{new Date(x).toLocaleDateString("id-ID", {
                    day: '2-digit',
                    month: '2-digit',
                  })}</TableCell>)
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                rows.map((x, i) => <TableRow key={x.identity}>
                  <TableCell className="black-cell">{i + 1}</TableCell>
                  <TableCell className="black-cell">{x.identity}</TableCell>
                  <TableCell className="black-cell">{x.nama}</TableCell>
                  {
                    x.absen.map((y, i) => (
                      <TableCell className="black-cell center" key={i}>{y ? <Check /> : ''}</TableCell>
                    ))
                  }
                  <TableCell className="black-cell center">{x.absen.reduce((a, b) => a + b, 0)}</TableCell>
                </TableRow>)
              }
              <TableRow>
                <TableCell colSpan="3" className="black-cell" style={{textAlign: 'right'}}>Jumlah Mahasiswa</TableCell>
                {
                  pertemuan.map((x, i) => <TableCell className="black-cell" key={i}>{
                    rows.reduce((a, b) => {
                      console.log(b);
                      return b.absen[i] + a}, 0)
                  }</TableCell>)
                }
                <TableCell className="black-cell"></TableCell>

              </TableRow>
            </TableBody>
          </Table>
        </>
      }}
    </Page>)
}

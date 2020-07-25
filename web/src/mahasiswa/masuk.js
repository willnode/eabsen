import React, { Component, createRef } from 'react';
import { Form, Input } from '../widget/controls';
import { history, getQueryParam } from '../main/Helper';
import { Page } from '../widget/page';


export default class Scanner extends Component {
	constructor() {
		super();
		this.Quagga = null;
		this.ref = createRef();
	}
	componentDidMount() {
		this.Quagga = window.Quagga
		this.Quagga.init({
			inputStream: {
				name: "Live",
				type: "LiveStream",
				target: this.ref.current
			},
			decoder: {
				readers: ["code_128_reader"]
			}
		}, (err) => {
			if (err) {
				console.log(err);
				return;
			}
			this.Quagga.onDetected( (result) => {
				this.Quagga.stop();
				var code = result.codeResult.code;
				document.getElementById('kode').value = code;
				document.getElementById('subb').click();
			});
			this.Quagga.start();
		});
	}
	submit(e) {
		alert(`Terimakasih. Anda sudah absen di kelas ${e.pertemuan.kelas_matakuliah} ke ${e.pertemuan.pertemuan_nth}`);
		history().push('/mahasiswa');
		window.Quagga.stop();
	}
	componentWillUnmount() {
		this.Quagga && this.Quagga.stop();
	}
	shouldComponentUpdate() {
		return false; // Handle by DOM
	}
	render() {
		if (getQueryParam('kode')) {
			window.setTimeout(function () {
				var code = getQueryParam('kode');
				document.getElementById('kode').value = code;
				document.getElementById('subb').click();
			}, 100)
		}
		return <Page className="paper">
			<div ref={this.ref} style={{
				width: '100%',
				height: '64vw',
				maxHeight: '470px'
			}}>
			</div>
			<Form id="kkkk" action="mahasiswa/masuk" redirect={this.submit}>
				<div style={{ display: 'none' }}>
					<Input inputProps={{ id: "kode", type: "hidden" }} name="kode" label="Kode" required />
					<Input inputProps={{ id: "subb", type: "submit" }} />
				</div>
			</Form>
		</Page >
	}
}
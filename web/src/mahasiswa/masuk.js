import React, { Component, createRef } from 'react';
import {  Form, Input, Submit } from '../widget/controls';
import { history, getQueryParam } from '../main/Helper';
import { Page } from '../widget/page';
import { useEffect } from 'react';


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
			this.Quagga.onDetected(function (result) {
				var code = result.codeResult.code;
				document.getElementById('kode').value = code;
				document.getElementById('kkkk').submit();
			});
			this.Quagga.start();
		});
	}
	submit(e) {
		alert(`Terimakasih. Anda sudah absen di kelas ${e.pertemuan.kelas_matakuliah} ke ${e.pertemuan.pertemuan_nth}`);
		window.Quagga.stop();
		history().push('/mahasiswa');
	}
	componentWillUnmount() {
		this.Quagga && this.Quagga.stop();
	}
	shouldComponentUpdate() {
		return false; // Handle by DOM
	}
	render() {
		useEffect(() => {
			if (getQueryParam('kode')) {
				var code = getQueryParam('kode');
				document.getElementById('kode').value = code;
				document.getElementById('kkkk').submit();
			}
		})
		return <Page className="paper">
			<div ref={this.ref} style={{
				width: '100%',
				height: '64vw',
				maxHeight: '470px'
			}}>
			</div>
			<Form id="kkkk" action="mahasiswa/masuk" redirect={this.submit}>
				<Input inputProps={{hidden: true}} name="kode" label="Kode" required/>
				<Submit style={{display: 'none'}}/>
			</Form>
		</Page >
	}
}
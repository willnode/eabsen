import React, { Component, createRef } from 'react';
import {  Form, Input, Submit } from '../widget/controls';
import { history } from '../main/Helper';
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
			this.Quagga.onDetected(function (result) {
				var code = result.codeResult.code;
				window.$('#kode').val(code);
				window.$('#kkkk')[0].submit();
			});
			this.Quagga.start();
		});
	}
	submit(e) {
		alert(e.message);
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
		return <Page className="paper">
			<div ref={this.ref} style={{
				width: '100%',
				height: '64vw',
				maxHeight: '470px'
			}}>
			</div>
			<Form id="kkkk" action="mahasiswa/masuk" redirect={this.submit}>
				<Input name="kode" label="Kode" />
				<Submit />
			</Form>
		</Page >
	}
}
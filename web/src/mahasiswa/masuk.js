import React, { Component, createRef } from 'react';
import { controlInput, controlSubmit } from '../widget/controls';
import { extractForm, serverPost, history, setError } from '../main/Helper';


export default class Scanner extends Component {
	constructor() {
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
		const data = extractForm(e);
		(serverPost('mahasiswa/masuk', data)
			.then((e) => {
				alert(e.message);
				window.Quagga.stop();
				history().push('/mahasiswa');
			})
			.catch((e) => setError(e))
		)
	}
	componentWillUnmount() {
		this.Quagga.stop();
	}
	shouldComponentUpdate() {
		return false; // Handle by DOM
	}
	render() {
		return <div className="d-flex flex-column justify-content-center">
			<div ref={this.ref} style={{
				width: '100%',
				height: '64vw',
				maxHeight: '470px' }}>
			</div>
			<form id="kkkk" onSubmit={this.submit}>
				{controlInput({ name: 'kode', label: 'Kode' })}
				{controlSubmit()}
			</form>
		</div >
	}
}
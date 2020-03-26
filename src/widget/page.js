import React from 'react';
import session from '../Session';
import { Component } from 'react';

const LoadingPage = () => (
	<div className="my-5 text-center">
		<div className="fa-3x">
			<i className="fas fa-sync fa-spin"></i>
		</div>
		<p className="mt-2">Loading...</p>
	</div>
);

const ErrorPage = () => (
	<>
		<div className="h2 my-5 text-center">Error :(</div>
		<p className="text-center">Mohon maaf mungkin anda sedang offline, periksa koneksi anda.</p>
	</>
)


class Page extends Component {
	constructor() {
		super()
		this.state = {
			status: 'loading'
		}
		this.mounted = false;
	}
	componentDidMount() {
		(this.props.notByRole ? session.get : session.getByRole)(this.props.src).then(data => {
			if (this.mounted) {
				this.props.dataCallback(data);
				this.setState({
					status: 'ok'
				});
			}
		}).catch(_ => this.setState({
			status: 'error'
		}));
		this.mounted = true;
	}
	componentWillUnmount() {
		this.mounted = false;
	}
	render() {
		switch (this.state.status) {
			case 'loading': return <LoadingPage />
			case 'ok': return <>{this.props.children}</>
			case 'error': default: return <ErrorPage />
		}
	}
}

export default Page;
export { LoadingPage, ErrorPage };
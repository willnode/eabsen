import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import session from '../Session';

class BootstrapTable extends Component {
	componentDidMount() {
		const table = window.$('<table></table>');
		window.$(ReactDOM.findDOMNode(this)).append(table);
		table.bootstrapTable(this.props)
		table.on('post-body.bs.table', function() {
			table.find('a').on('click', function(e) {
				e.preventDefault();
				session.history.push(window.$(this).attr("href").replace(new RegExp('^'+process.env.PUBLIC_URL), ''));
			})
			table.find('button').on('click', function(e) {
				e.preventDefault();
				if (window.$(this).data('onclick')) {
					window.callbacks[window.$(this).data('onclick')](e);
				}
			})
		})
	}
	componentDidUpdate(nextProps) {
		window.$(ReactDOM.findDOMNode(this).firstChild).bootstrapTable('refreshOptions', nextProps)
	}
	shouldComponentUpdate() {
		return false
	}
	componentWillUnmount() {
		window.$(ReactDOM.findDOMNode(this).firstChild).bootstrapTable('destroy')
	}
	render() {
		return (
			<div>
				{/* The <table/> here should be manipulated fully by JQuery */}
			</div>
		)
	}
}

// const BootstrapTableWithRowNumber = ({ columns, ...otherProps }) => {
//   const rowNumberField = {
//     field: '#',
//     title: '#',
//     formatter: (value, row, index) => index + 1,
//   }
//   return (
//     <BootstrapTable
//       columns={[rowNumberField, ...columns]}
//       {...otherProps}
//     />
//   )
// }

export default BootstrapTable
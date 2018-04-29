import React from 'react';
import { Table } from 'react-bootstrap';
import { UserContext } from './UserContext';
import './Conclusion.css';

const accountTypeMapper = ['Lite', 'Standard', 'Premium'];

class Card extends React.Component {
	render() {
		const { number, name, expiry, cvc } = this.props;

		return (
			<Table striped bordered condensed hover responsive>
			<tbody>
				<tr>
					<th scope="row" colSpan="2">Credit Card</th>
				</tr>
				<tr>
					<td colSpan="2">{
						''.concat(
							number.slice(0, 4), ' ',
							number.slice(4, 8), ' ',
							number.slice(8, 12), ' ',
							number.slice(12)
						)
					}</td>
				</tr>
				<tr>
					<td colSpan="2">{name}</td>
				</tr>
				<tr>
					<td>{''.concat(expiry.slice(0, 2),'/',expiry.slice(2))}</td>
					<td>{cvc}</td>
				</tr>
			</tbody>
			</Table>
		);
	}
}

const Conclusion = ({user}) => {
	const {
		username,
		first,
		last,
		email,
		accountType,
		dob,
		country,
		parentEmail,
		card
	} = user;

	return (
		<div>
			<Table striped bordered condensed hover responsive>
				<tbody>
					<tr>
						<th scope="row">Username</th>
						<td>{username}</td>
					</tr>
					<tr>
						<th scope="row">First Name</th>
						<td className="first-name">{first}</td>
					</tr>
					<tr>
						<th scope="row">Last Name</th>
						<td className="last-name">{last}</td>
					</tr>
					<tr>
						<th scope="row">Email Address</th>
						<td>{email}</td>
					</tr>
					<tr>
						<th scope="row">Account Type</th>
						<td>{accountTypeMapper[accountType]}</td>
					</tr>
					{ dob && (
						<tr>
							<th scope="row">Date of Birth</th>
							<td>{dob.format('L')}</td>
						</tr>
					)}
					{ country && (
						<tr>
							<th scope="row">Country</th>
							<td>{country}</td>
						</tr>
					)}
				</tbody>
			</Table>
			{ card && (<Card {...card}/>) }
			{ parentEmail && <span>An email has been sent to {parentEmail}</span> }
		</div>
	);
}
export default props => (
  <UserContext.Consumer>
  	{ ({user}) => <Conclusion {...props} user={user} /> }
  </UserContext.Consumer>
);
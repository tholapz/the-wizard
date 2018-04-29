import React from 'react';
import { Table } from 'react-bootstrap';
import { UserContext } from './UserContext';
import './Conclusion.css';

const accountTypeMapper = ['Lite', 'Standard', 'Premium'];

const Conclusion = ({user}) => {
	const { username, first, last, email, accountType, dob, country, parentEmail } = user;

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
			{ parentEmail && <span>An email has been sent to {parentEmail}</span> }
		</div>
	);
}
export default props => (
  <UserContext.Consumer>
  	{ ({user}) => <Conclusion {...props} user={user} /> }
  </UserContext.Consumer>
);
import React, { useState } from 'react';
import './CandidateForm.css';

const CandidateForm = () => {
	const [response, setResponse] = useState();
	const [email, setEmail] = useState('markus.hafellner@gmail.com');
	const [summary, setSummary] = useState();

	function sendCandidateForm() {
		/* Preparing the HTTP request */
		const backendUrl = `http://localhost:5000/candidates/${email}`;
		const init = {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				summary: summary,
			}),
		};
		/* Using fetch to make a request to the backend */
		fetch(backendUrl, init)
			.then(APIresponse => {
				return APIresponse.json();
			})
			.then(responseObj => {
				let status = responseObj.status;
				let candidate = responseObj.result.candidate;
				if (status === 'ok') {
					setResponse(
						`The summary was successfully added to candidate ${candidate.name} profile.`,
					);
				} else {
					setResponse('An error has occurred!');
				}
			});
	}

	/* Obs: Name and Search fields are just for show: the only information that is sent is email and summary */
	return (
		<div className="main-div">
			<h4> {response} </h4>
			<form
				onSubmit={e => {
					e.preventDefault();
					setResponse('loading');
					sendCandidateForm();
				}}
			>
				Name:<br></br>
				<input type="text" name="name" /> <br></br>
				Email: <br></br>
				<input
					type="email"
					name="email"
					required
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>{' '}
				<br></br>
				Search: <br></br>
				<input type="text" name="search" /> <br></br>
				Summary: <br></br>
				<textarea
					className="center"
					name="summary"
					placeholder="Write the review here"
					rows="15"
					cols="120"
					value={summary}
					onChange={e => setSummary(e.target.value)}
				></textarea>{' '}
				<br></br>
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
};

export default CandidateForm;

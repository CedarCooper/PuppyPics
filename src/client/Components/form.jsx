import { useEffect, useState } from "react";
export default function Form() {
	const [occupations, setOccupation] = useState([]);
	const [states, setState] = useState([]);
	const [] = useState("");
	const url = "https://frontend-take-home.fetchrewards.com/form";
	useEffect(() => {
		fetch(url)
			.then((data) => data.json())
			.then((data) => {
				setOccupation(data.occupations);
				setState(data.states);
			}, [])
			.catch((error) =>
				console.log("There was a problem in the fetch GET request", error)
			);
	});

	const occupationsList = [];
	for (let i = 0; i < occupations.length; i++) {
		occupationsList.push(
			<option
				value={occupations[i]}
				key={occupations[i]}
			>
				{occupations[i]}
			</option>
		);
	}
	const statesList = [];
	for (let i = 0; i < states.length; i++) {
		statesList.push(
			<option
				value={states[i].name}
				key={states[i].name}
			>
				{states[i].abbreviation}
			</option>
		);
	}

	async function submitForm() {
		// gather data from the DOM
		let name = document.getElementById("flname").value;
		let email = document.getElementById("email").value;
		let password = document.getElementById("password").value;
		let occupation = document.getElementById("occupation").value;
		let state = document.getElementById("state").value;
		const form = {
			name,
			email,
			password,
			occupation,
			state,
		};
		const formPosting = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form),
		});
		if (formPosting.status === 201 || 200) {
			window.location.href = "confirmed";
		} else {
			window.location.href = "uh-oh";
		}
		// if status is code 201 load the confirmation page
		// else load the rejection page
	}

	return (
		<div className="Form">
			<form>
				<label for="flname">Full Name:</label>
				<input
					type="text"
					id="flname"
					name="flname"
					placeholder="Type here..."
					required
				/>
				<label for="email">E-mail:</label>
				<input
					type="text"
					id="email"
					name="email"
					required
				/>
				<label for="password">Password:</label>
				<input
					type="password"
					id="password"
					name="password"
					required
				/>
				<label for="occupation">Occupation:</label>
				<select
					id="occupation"
					name="occupation"
					required
				>
					<option
						label="Select an option..."
						hidden
					></option>
					{occupationsList}
				</select>
				<label for="state">State:</label>
				<select
					id="state"
					name="state"
					required
				>
					<option
						label="Select an option..."
						hidden
					></option>
					<option
						label="United States"
						disabled
					></option>
					{statesList}
				</select>
				<input
					value="Submit"
					type="button"
					id="submit"
					onClick={() => submitForm()}
				/>
			</form>
		</div>
	);
}

// App acts as our home page
import Form from "./client/Components/form";
import styles from "./client/styles/styles.css";
export default function App() {
	// react router for home, confirmation, rejected
	return (
		<div className="Home">
			<h1>Subscribe to Our Newsletter!</h1>
			<p>Get puppy pics everyday in your mailbox!</p>
			<Form />
		</div>
	);
}

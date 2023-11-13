import { useEffect, useState, useRef } from "react";
import LoadingSpinner from "../Loader/LoadinSpinner";

const Todo = () => {
	const [value, setValue] = useState([]);
	const isDataFetched = useRef(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const apiFun = async () => {
		let responseData = await fetch(
			"https://jsonplaceholder.typicode.com/todos/"
		)
			.then((res) => res.json())
			.catch((err) => {
				setErrorMessage("Unable to fetch user list");
			});
		return responseData;
	};

	useEffect(() => {
		setIsLoading(true);
		if (isDataFetched.current) return;
		apiFun().then((res) => {
			setValue(res);
			setIsLoading(false);
		});
		isDataFetched.current = true;
	}, []);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (errorMessage) {
		return <div>{errorMessage}</div>;
	}

	return (
		<div>
			<ul>
				{value.map((val) => {
					return <li key={val.id}>{val.title}</li>;
				})}
			</ul>
		</div>
	);
};
export default Todo;

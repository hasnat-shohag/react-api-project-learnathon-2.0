import { useEffect, useState, useRef } from "react";
import LoadingSpinner from "../Loader/LoadinSpinner";

const Todo = () => {
	const [value, setValue] = useState([]);
	const isDataFetched = useRef(false);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [filter, setFilter] = useState("");

	const apiFun = async () => {
		let responseData = await fetch(
			"https://jsonplaceholder.typicode.com/todos/"
		)
			.then((res) => res.json())
			.catch(() => {
				setIsLoading(false);
				setErrorMessage("Unable to fetch user list");
			});
		return responseData;
	};

	useEffect(() => {
		if (isDataFetched.current) return;
		apiFun().then((res) => {
			setValue(res);
			setIsLoading(false);
		});
		isDataFetched.current = true;
	}, []);

	const handleChangeFilter = (event) => {
		setFilter(event.target.value);
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (errorMessage) {
		return <div>{errorMessage}</div>;
	}

	let todoList = value;

	if (filter === "Completed") {
		todoList = value.filter((todo) => todo.completed);
	} else if (filter === "Incompleted") {
		todoList = value.filter((todo) => !todo.completed);
	}

	return (
		<div>
			<div className="main-content">
				<div className="todo-list-content">
					<ul>
						{todoList.map((val) => {
							return <li key={val.id}>{val.title}</li>;
						})}
					</ul>
				</div>
				<div className="short-content">
					<label>Filter: </label>
					<select
						name="filter"
						value={filter}
						onChange={handleChangeFilter}
					>
						<option value="">-- Please Select --</option>
						<option value="Completed">Completed</option>
						<option value="Incompleted">Incompleted</option>
						<option value="Both">Both</option>
					</select>
				</div>
			</div>
		</div>
	);
};
export default Todo;

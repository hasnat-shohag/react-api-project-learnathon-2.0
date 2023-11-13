import { useEffect, useState, useRef } from "react";

const Todo = () => {
	const [value, setValue] = useState([]);
	const isDataFetched = useRef(false);

	const apiFun = async () => {
		let responseData = await fetch(
			"https://jsonplaceholder.typicode.com/todos/"
		)
			.then((res) => res.json())
			.catch((err) => console.log("Errors:::: ", err));
		return responseData;
	};

	useEffect(() => {
		if (isDataFetched.current) return;
		apiFun().then((res) => {
			setValue(res);
		});
		isDataFetched.current = true;
	}, []);
	const todoList = value;
	return (
		<div>
			<ul>
				{console.log(typeof todoList)}
				{todoList.length > 0 &&
					todoList.map((val) => {
						return <li key={val.id}>{val.title}</li>;
					})}
			</ul>
		</div>
	);
};
export default Todo;

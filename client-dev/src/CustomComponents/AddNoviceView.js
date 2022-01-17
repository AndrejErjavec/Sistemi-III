import React, { Component } from "react";
import axios from "axios";

export default class AddNoviceView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			novica: {},
		};
	}

	QSetInformtion = (e) => {
		this.setState((prevState) => ({
			novica: { ...prevState.novica, [e.target.name]: e.target.value },
		}));
	};

	QPostNovica = () => {
		axios
			.post("http://88.200.63.148:5056/novice", {
				title: this.state.novica.title,
				slug: this.state.novica.slug,
				text: this.state.novica.text,
			})
			.then((response) => {
				console.log("Sent to server");
			})
			.catch((err) => {
				console.log("error");
			});
	};

	render() {
		return (
			<div className="card" style={{ margin: "10px" }}>
				<h3 style={{ margin: "10px" }}>Welcome {this.props.QUsername}</h3>
				<div className="mb-3" style={{ margin: "10px" }}>
					<label className="form-label">Title</label>
					<input
						onChange={(e) => this.QSetInformtion(e)}
						name="title"
						type="text"
						class="form-control"
						placeholder="Title..."
					/>
				</div>
				<div className="mb-3" style={{ margin: "10px" }}>
					<label className="form-label">Slug</label>
					<input
						onChange={(e) => this.QSetInformtion(e)}
						name="slug"
						type="text"
						class="form-control"
						placeholder="Slug..."
					/>
				</div>
				<div class="mb-3" style={{ margin: "10px" }}>
					<label class="form-label">Text</label>
					<textarea onChange={(e) => this.QSetInformtion(e)} name="text" class="form-control" rows="3"></textarea>
				</div>
				<button onClick={() => this.QPostNovica()} className="btn btn-primary bt" style={{ margin: "10px" }}>
					Send
				</button>
			</div>
		);
	}
}

import React, { Component } from "react";
import axios from "axios";

export default class NoviceView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Novice: [],
		};
	}

	QSetViewInParent = (obj) => {
		this.props.QIDFromChild(obj);
	};

	componentDidMount() {
		axios.get("http://88.200.63.148:5056/novice").then((response) => {
			console.log(response);
			this.setState({ Novice: response.data });
		});
	}

	render() {
		let data = this.state.Novice;
		console.log(data);
		return (
			<div className="row row-cols-1 row-cols-md-3 g-4" style={{ margin: "10px" }}>
				{data.length > 0
					? data.forEach((d) => {
							return (
								<div className="col">
									<div className="card">
										<div className="card-body">
											<h5 className="card-title">{d.title}</h5>
											<p className="card-text">{d.slug}</p>
										</div>
										<button
											onClick={() => this.QSetViewInParent({ page: "novica", id: d.id })}
											style={{ margin: "10px" }}
											className="btn btn-primary bt">
											Read more
										</button>
									</div>
								</div>
							);
					  })
					: "Loading..."}
			</div>
		);
	}
}

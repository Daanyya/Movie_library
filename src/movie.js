export default class Movie {

	comments = new Array();

	constructor(options) {
		this.poster = options.poster;
		this.name = options.name;
		this.date = options.date;
		this.country = options.country;
		this.genre = options.genre;
		this.director = options.director;
		this.scenario = options.scenario;
		this.producer = options.producer;
		this.operator = options.operator;
		this.composer = options.composer;
		this.budget = options.budget;
		this.fees = options.fees;
		this.rating = options.rating;
		this.time = options.time;
	}

	addComment(comment) {
		this.comments.push(comment);
	}
}
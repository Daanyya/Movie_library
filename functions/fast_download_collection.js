import fast_add_movie from "./fast_add_movie.js";

export default function fast_download_collection() {
	fast_add_movie({
		name: 'Мир Юрского периода 1',
		date: new Date('2015-06-11').toISOString().split('T')[0],
		country: 'США',
		genre: 'фантастика, приключения, боевик',
		director: 'Колин Треворроу',
		scenario: 'В тематическом парке, посвященном динозаврам, вывели новый вид. Слишком умный и хищный, чтобы сидеть в клетке',
		producer: 'Патрик Краули, Фрэнк Маршалл, Кристофер Раймо',
		operator: 'Джон Шварцман',
		composer: 'Майкл Джаккино',
		budget: '$150 000 000',
		fees: '$1 670 400 637',
		rating: '16',
		time: '02:05',
		poster: './img/movie_posters/Мир Юрского Периода 1.png'
	});
}
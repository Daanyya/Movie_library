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
	fast_add_movie({
		name: 'Мир Юрского периода 2',
		date: new Date('2018-06-7').toISOString().split('T')[0],
		country: 'США',
		genre: 'фантастика, приключения, боевик',
		director: 'Антонио Байона',
		scenario: 'Ученые спасают динозавров от вымирания.',
		producer: 'Белен Атьенса, Патрик Краули, Томас Хэйслип',
		operator: 'Оскар Фаура',
		composer: 'Майкл Джаккино',
		budget: '$170 000 000',
		fees: '$1 308 467 944',
		rating: '12',
		time: '02:08',
		poster: './img/movie_posters/Мир Юрского Периода 2.png'
	});
	fast_add_movie({
		name: 'Парк Юрского Периода 1',
		date: new Date('1993-10-20').toISOString().split('T')[0],
		country: 'США',
		genre: 'фантастика, приключения, семейный',
		director: 'Стивен Спилберг',
		scenario: 'Из-за аварии в реликтовом парке динозавры оказываются на воле.',
		producer: 'Кэтлин Кеннеди, Джералд Молен, Лата Райан',
		operator: 'Дин Канди',
		composer: 'Джон Уильямс',
		budget: '$63 000 000',
		fees: '$912 667 947',
		rating: '16',
		time: '02:07',
		poster: './img/movie_posters/Парк Юрского Периода 1.png'
	});
	fast_add_movie({
		name: 'Парк Юрского Периода 2',
		date: new Date('1997-05-19').toISOString().split('T')[0],
		country: 'США',
		genre: 'фантастика, приключения, боевик',
		director: 'Стивен Спилберг',
		scenario: 'Экспедиция отправляется на остров, где обитают клонированные динозавры.',
		producer: 'Бонни Кертис, Кэтлин Кеннеди, Джералд Молен',
		operator: 'Януш Камински',
		composer: 'Джон Уильямс',
		budget: '$73 000 000',
		fees: '$618 638 999',
		rating: '12',
		time: '02:03',
		poster: './img/movie_posters/Парк Юрского Периода 2.png'
	});
	fast_add_movie({
		name: 'Парк Юрского Периода 3',
		date: new Date('2001-08-24').toISOString().split('T')[0],
		country: 'США',
		genre: 'фантастика, приключения, боевик, триллер',
		director: 'Джо Джонстон',
		scenario: 'Палеонтолог и компания отбиваются от динозавров на острове.',
		producer: 'Кэтлин Кеннеди, Ларри Франко, Стивен Спилберг',
		operator: 'Шелли Джонсон',
		composer: 'Дон Дэвис',
		budget: '$93 000 000',
		fees: '$368 780 809',
		rating: '12',
		time: '01:32',
		poster: './img/movie_posters/Парк Юрского Периода 3.png'
	});
}
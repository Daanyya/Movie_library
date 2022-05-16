import Movie from "./src/movie.js";
import Comment from "./src/comment.js";
import toBase64 from "./functions/toBase64.js";
import sleep from "./functions/sleep.js";
import fast_download_collection from "./functions/fast_download_collection.js";

var main_collection;

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('date_input').max = get_today_date();
    document.getElementById('filter_date_input_1').max = get_today_date();
    document.getElementById('filter_date_input_2').max = get_today_date();
    if (localStorage.length == 0) {
        fast_download_collection();
    }
    download_collection();
    show_collection();
});

document.getElementById('filter_date_input_1').onchange = function(e) {
    document.getElementById('filter_date_input_2').min = e.target.value;
};

document.getElementById('add').onclick = function() {
    hide_collection();
    show_form();
};

document.getElementById('home').onclick = function() {
    hide_form();
    download_collection();
    show_collection();
    filter_reset();
    hide_movie_view();
};

document.getElementById('filter').onclick = function() {
    hide_collection();
    show_filter();
    hide_filter_el();
    hide_add_el();
    refresh_option();
};

document.getElementById('return_home').onclick = function() {
    hide_filter();
    show_filter_el();
    show_add_el();
    show_collection();
};

document.getElementById('clear_filter').onclick = function() {
    filter_reset();
    download_collection();
};

document.getElementById('go_filter').onclick = function() {
    filter_collection();
    refresh_option();
};

function show_form() {
    var form_conteiner = document.getElementById('show_add_form');

    hide_add_el();
    show_home_el();
    hide_filter_el();

    form_conteiner.style.display = 'block';
}

function hide_form() {
    var form_conteiner = document.getElementById('show_add_form');

    show_add_el();
    hide_home_el();
    show_filter_el();
    form_reset();

    form_conteiner.style.display = 'none';
}

function show_add_el() {
    var add_el = document.getElementById('add_el');
    add_el.style.display = 'flex';
}

function hide_add_el() {
    var add_el = document.getElementById('add_el');
    add_el.style.display = 'none';
}

function show_home_el() {
    var home_el = document.getElementById('home_el');
    home_el.style.display = 'flex';
}

function hide_home_el() {
    var home_el = document.getElementById('home_el');
    home_el.style.display = 'none';
}

function show_filter_el() {
    var filter_el = document.getElementById('filter_el');
    filter_el.style.display = 'flex';
}

function hide_filter_el() {
    var filter_el = document.getElementById('filter_el');
    filter_el.style.display = 'none';
}

function show_correct() {
    var correct = document.getElementById('show_correct');

    if (correct.style.display == 'flex') {
        correct.style.display = 'none';
   } else {
        correct.style.display = 'flex';
   }
}

function show_filter() {
    var container = document.getElementById('filter_container');
    container.style.display = 'block';
}

function hide_filter() {
    var container = document.getElementById('filter_container');
    container.style.display = 'none';
}

function filter_reset() {
    document.getElementById('filter_date_input_1').value = '';
    document.getElementById('filter_date_input_2').value = '';
    document.getElementById('filter_genre_input').value = 0;
    document.getElementById('filter_country_input').value = 0;
}

function filter_collection() {
    var
        min_date = document.getElementById('filter_date_input_1').value,
        max_date = document.getElementById('filter_date_input_2').value,
        genre_filter = document.getElementById('filter_genre_input').value,
        country_filter = document.getElementById('filter_country_input').value;

    main_collection.forEach((value, key) => {
        var 
            date = value[1].date,
            genre = value[1].genre,
            country = value[1].country;

        if (min_date != '' && max_date != '') {
            if (new Date(max_date) <= new Date(date) 
                && new Date(min_date) >= new Date(date)) {
                main_collection.delete(key);
                return;
            } else {console.log('date ok');}
        }

        if (genre_filter != '0') {
            if (genre_filter.toLowerCase() != genre.toLowerCase()) {
                main_collection.delete(key);
                return;
            } else {console.log('genre ok');}
        }

        if (country_filter != '0') {
            if (country_filter.toLowerCase() != country.toLowerCase()) {
                main_collection.delete(key);
                return;
            } else {console.log('country ok');}
        }
    });
}

document.getElementById('ok').onclick = function() {
    show_correct();
    download_collection();
    show_collection();
};

function get_today_date() {
    var date = new Date();
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var year = date.getFullYear();
    return year + "-" + month + "-" + day;
}

document.getElementById('poster_input').onchange = function(e) {
    var target = e.target;

    if (!target.files.length) {
        return;
    }

    var FR = new FileReader();
    FR.onload = function() {
        document.getElementById('poster_preview').src = FR.result;
    }

    FR.readAsDataURL(target.files[0]);
}

document.getElementById('save_button').onclick = function() {
    var
        poster_input = document.getElementById('poster_input'),
        poster,
        name = document.getElementById('name_input').value,
        date = document.getElementById('date_input').value,
        country = document.getElementById('country_input').value,
        genre = document.getElementById('genre_input').value,
        director = document.getElementById('director_input').value,
        scenario = document.getElementById('scenario_input').value,
        producer = document.getElementById('producer_input').value,
        operator = document.getElementById('operator_input').value,
        composer = document.getElementById('composer_input').value,
        budget = document.getElementById('budget_input').value,
        fees = document.getElementById('fees_input').value,
        rating = document.getElementById('rating_input').value,
        time = document.getElementById('time_input').value,
        movie,
        form = document.getElementById('form'),
        preview = document.getElementById('poster_preview');

    poster = name.toLowerCase() + '_poster';

    movie = new Movie({
        poster: poster,
        name: name,
        date: date,
        country: country,
        genre: genre,
        director: director,
        scenario: scenario,
        producer: producer,
        operator: operator,
        composer: composer,
        budget: budget,
        fees: fees,
        rating: rating,
        time: time
    });

    if (localStorage.getItem(name.toLowerCase()) != null) {
        document.getElementById('error').innerText = "Такой фильм уже существует!";
        return;
    } else if (poster_input.files.length == 0) {
        document.getElementById('error').innerText = "Пожайлуйста, добавьте обложку фильма!";
        return;
    } else if (poster_input.files[0].size > 200000) {
        document.getElementById('error').innerText = "Размер обложки должен быть 200 х 200 пикселей!";
        return;
    } else if (name == '') {
        document.getElementById('error').innerText = "Пожайлуйста, укажите имя фильма!";
        return;
    } else {
        document.getElementById('error').innerText = "";
    }

    toBase64(poster_input.files[0], name.toLowerCase() + '_poster');

    localStorage.setItem(name.toLowerCase() + '_movie', JSON.stringify(movie));

    hide_form();
    show_correct();
}

document.addEventListener("click", e => {
    var 
        id = e.target.id,
        name = e.target.name;

    if (id == 'remove_item') {
        document.querySelectorAll("div[name='" + name + "']")[0].remove();
        delete_movie(name.toLowerCase());
    }
});

function delete_movie(name) {
    localStorage.removeItem(name + '_movie');
    localStorage.removeItem(name + '_poster');
}

function form_reset() {
    var preview = document.getElementById('poster_preview');
    form.reset();
    preview.src = 'img/No_film.png';
}

function download_collection() {
    var movie_collection_intro = new Map();

    Object.keys(localStorage).forEach(function(key){
        var 
            name,
            value,
            comments,
            poster_src;

        if (key.split('_')[1] == 'movie') {
            
            name = key.split('_')[0];

            poster_src = localStorage.getItem(name + '_poster');

            movie_collection_intro.set(name, new Array());

            value = JSON.parse(localStorage.getItem(key));

            comments = JSON.parse(localStorage.getItem(name + '_comment'));

            movie_collection_intro.get(name).push(poster_src, value, comments);
        }
    });

    main_collection = movie_collection_intro;
}

function show_collection() {
    
    main_collection.forEach((value, key) => {
        create_item(value, 'main_container');
    });
}

function hide_collection() {
    var movies = document.querySelectorAll("div[class='Item']");
    movies.forEach(e => e.remove());
}

function refresh_option() {
    document.querySelectorAll('option').forEach(e => {
        if (e.value != '0') {
            e.remove();
        }
    });
    download_option();
}

function download_option() {
    main_collection.forEach((value, key) => {
        var 
            genre_collection = new Map(),
            country_collection = new Map();

        if (!genre_collection.has(value[1].genre)
            && value[1].genre != '') {
            genre_collection.set(key, value[1].genre);
            create_option("filter_genre_input", value[1].genre);
        }
        if (!country_collection.has(value[1].country)
            && value[1].country != '') {
            country_collection.set(key, value[1].country);
            create_option("filter_country_input", value[1].country);
        }
    });
}

function create_option(id, value) {
    var
        select = document.getElementById(id),
        inserted_value = value.toLowerCase(),
        option = document.createElement("option");

    option.setAttribute("value", inserted_value);
    option.innerText = value;
    select.appendChild(option);
}

function create_item(item, id) {
    var 
        div_item = document.createElement("div"),
        div_inner = document.createElement("div"),
        img_poster = document.createElement("img"),
        img_remove_item = document.createElement("img"),
        p_movie_name = document.createElement("p"),
        conteiner = document.getElementById(id);

    div_item.setAttribute("class", 'Item');
    img_poster.setAttribute("id", 'poster');
    img_poster.setAttribute("src", item[0]);
    img_poster.setAttribute("name", item[1].name.toLowerCase());
    img_poster.setAttribute("alt", 'item');
    img_remove_item.setAttribute("id", 'remove_item');
    img_remove_item.setAttribute("alt", 'Удалить');
    img_remove_item.setAttribute("name", item[1].name);
    img_remove_item.setAttribute("src", 'img/No_added.png');
    p_movie_name.innerText = item[1].name;

    div_inner.appendChild(img_poster);
    div_inner.appendChild(img_remove_item);

    div_item.appendChild(div_inner);
    div_item.appendChild(p_movie_name);

    conteiner.appendChild(div_item);
}

document.addEventListener('click', function(e) {
    download_movie_view(e);
});

function download_movie_view(e) {
    if (e.target.alt == 'item') {

        var 
            item = main_collection.get(e.target.name);

        reset_movie_view();
        create_item(item, 'intro_container');
        download_movie_view_info(item);
        download_comments(item);
        show_movie_view();
    }
}

function download_movie_view_info(item) {
    var 
        date_view = document.getElementById('date_view'),
        country_view = document.getElementById('country_view'),
        genre_view = document.getElementById('genre_view'),
        director_view = document.getElementById('director_view'),
        scenario_view = document.getElementById('scenario_view'),
        producer_view = document.getElementById('producer_view'),
        operator_view = document.getElementById('operator_view'),
        composer_view = document.getElementById('composer_view'),
        budget_view = document.getElementById('budget_view'),
        fees_view = document.getElementById('fees_view'),
        rating_view = document.getElementById('rating_view'),
        time_preview = document.getElementById('time_preview');

    date_view.innerText += ': ' + item[1].date;
    country_view.innerText += ': ' + item[1].country;
    genre_view.innerText += ': ' + item[1].genre;
    director_view.innerText += ': ' + item[1].director;
    scenario_view.innerText += ': ' + item[1].scenario;
    producer_view.innerText += ': ' + item[1].producer;
    operator_view.innerText += ': ' + item[1].operator;
    composer_view.innerText += ': ' + item[1].composer;
    budget_view.innerText += ': ' + item[1].budget;
    fees_view.innerText += ': ' + item[1].fees;
    rating_view.innerText += ': ' + item[1].rating;
    time_preview.innerText += ': ' + item[1].time;
}

function reset_movie_view() {
    var 
        date_view = document.getElementById('date_view'),
        country_view = document.getElementById('country_view'),
        genre_view = document.getElementById('genre_view'),
        director_view = document.getElementById('director_view'),
        scenario_view = document.getElementById('scenario_view'),
        producer_view = document.getElementById('producer_view'),
        operator_view = document.getElementById('operator_view'),
        composer_view = document.getElementById('composer_view'),
        budget_view = document.getElementById('budget_view'),
        fees_view = document.getElementById('fees_view'),
        rating_view = document.getElementById('rating_view'),
        time_preview = document.getElementById('time_preview');

    hide_collection();

    date_view.innerText = date_view.innerText.split(':')[0];
    country_view.innerText = country_view.innerText.split(':')[0];
    genre_view.innerText = genre_view.innerText.split(':')[0];
    director_view.innerText = director_view.innerText.split(':')[0];
    scenario_view.innerText = scenario_view.innerText.split(':')[0];
    producer_view.innerText = producer_view.innerText.split(':')[0];
    operator_view.innerText = operator_view.innerText.split(':')[0];
    composer_view.innerText = composer_view.innerText.split(':')[0];
    budget_view.innerText = budget_view.innerText.split(':')[0];
    fees_view.innerText = fees_view.innerText.split(':')[0];
    rating_view.innerText = rating_view.innerText.split(':')[0];
    time_preview.innerText = time_preview.innerText.split(':')[0];
}

function show_movie_view() {
    hide_filter_el();
    hide_add_el();
    show_home_el();

    var movie_view = document.getElementById('show_movie_view');
    movie_view.style.display = 'block';
}

function hide_movie_view() {
    var movie_view = document.getElementById('show_movie_view');
    movie_view.style.display = 'none';
}

document.getElementById('send_comment').onclick = function() {
    var
        save_name = document.querySelectorAll("div[class='Item'] > p")[0].innerText.toLowerCase(),
        autor = document.getElementById('comment_input_name').value,
        comment = document.getElementById('comment_input_text').value,
        rating = document.getElementById('comment_input_rating').value,
        comment;

    save_name = save_name + '_comment';

    comment = new Comment({
        autor: autor,
        text: comment,
        rating: rating
    });

    localStorage.setItem(save_name, JSON.stringify(comment));
    reset_my_comment();
    hide_my_comment();
    download_comments(main_collection.get(save_name));
}

function show_my_comment() {
    document.getElementById('my_comment_line').style.display = 'block';
    document.getElementById('show_my_comment').style.display = 'flex';
}

function hide_my_comment() {
    document.getElementById('my_comment_line').style.display = 'none';
    document.getElementById('show_my_comment').style.display = 'none';
}

function reset_my_comment() {
    document.getElementById('comment_input_name').value = '';
    document.getElementById('comment_input_text').value = '';
    document.getElementById('comment_input_rating').value = 5;
}

function download_comments(item) {
    refresh_comments();
    
    if (item[2] == null) {
        show_my_comment();
    }
    create_comment(item, 'movie_comments_container');
}

function refresh_comments() {
    var comments = document.querySelectorAll("div[class='Comment']");
    comments.forEach(e => e.remove());
}

function create_comment(item, id) {
    if (item[2] != null) {
        var 
            div_comment = document.createElement("div"),
            p_comment_info = document.createElement("p"),
            p_comment_content = document.createElement("p"),
            conteiner = document.getElementById(id);

        div_comment.setAttribute("class", 'Comment');
        p_comment_info.setAttribute("id", 'comment_autor');
        p_comment_content.setAttribute("id", 'comment_content');

        p_comment_info.innerText = item[2].autor + ' (оценка ' + item[2].rating + ' из 10)';
        p_comment_content.innerText = item[2].text;

        div_comment.appendChild(p_comment_info);
        div_comment.appendChild(p_comment_content);
        conteiner.appendChild(div_comment);
    }
}


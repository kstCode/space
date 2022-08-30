/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', ()=> {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img');
    const poster = document.querySelector('.promo__bg');
    const genre = poster.querySelector('.promo__genre');
    const moveiList = document.querySelector('.promo__interactive-list');
    const addForm = document.querySelector('form.add');
    const addInput = addForm.querySelector('.adding__input');
    const checkbox = addForm.querySelector('[type="checkbox"]');
    


    addForm.addEventListener('submit',  (e) => {
        e.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
            if (favorite) {
                console.log('Добавляем любимый фильм');
            }
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
        }
        

        createMovieList(movieDB.movies, moveiList);
        e.target.reset();
    });


    const deleteAdv = (arr) => {
        arr.forEach((item) => {
            item.remove();
        });
    };
    
    
    const makeChanges = () => {
        genre.textContent = 'драма';
        poster.style.background = "url('img/bg.jpg')";
    };



    

    const sortArr = (arr) => {
        arr.sort();
    };

    
    

    function createMovieList(films, parent) {
        parent.innerHTML = '';
        sortArr(films);
        films.forEach((item, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">${i+1} ${item}
                <div class="delete"></div>
            `; 
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', ()=> {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList(films, parent);
            });
        });
    }
    
    deleteAdv(adv);
    makeChanges();
    
    createMovieList(movieDB.movies, moveiList);
});

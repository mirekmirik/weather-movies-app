'use strict'
let question = document.querySelector('.main__question');
let main = document.querySelector('.main');
let allQuestions = document.querySelectorAll('.main__question');
let buttonNext = document.querySelector('.next');
let buttonNextAll = document.querySelectorAll('.next');
let allImages = document.querySelectorAll('.img__question');
const formWeatherAll = document.querySelectorAll('.form__weather');
const formWeather = document.querySelector('.form__weather');
const btnRadio = document.querySelectorAll('.btn__submit-radio');
const circlesLi = document.querySelectorAll('.circles li')
const circles = document.querySelectorAll('.circles');
const areaBackground = document.querySelector('.area');
const btnRadioAll = document.querySelectorAll('.btn__submit-radio');
const radioInputAll = document.querySelectorAll('.radio-input__question');
const labelsRadioAll = document.querySelectorAll('label');
const textQuestionAll = document.querySelectorAll('.text__question')
const inputRadioQuestionAll = document.getElementsByName('category')
const resetButtonAll = document.querySelectorAll('.fa-rotate')
const recommendFilm = document.querySelector('.recommend-film')
const recommendFilmTextAll = document.querySelectorAll('.recommend-film__text')
const secondSection = document.querySelector('.second-section')
const geoCodeApiKey = '513292572133505183489x105714';
const weatherApiKey = '8671261e88add48db4792add3ec5ede9';
const movieApiKey = 'a4f0ea1cc807a86b3fdda7945c5c3ebb'


// Cloud- Clear
let weatherApi = ['Clouds', 'Rain', 'Snow', 'Drizzle', 'Clear'];




const imgArr = ['Clouds-weather.jpg', 'Rain-weather.jpg', 'Snow-weather.jpg', 'Drizzle-weather.jpg', 'Clear-weather.jpg', 'Fog-weather.jpg'];
let backgroundColorOfWeather = ['#7b8ba2', '#6e95cb', '#e7e4e2', '#363c3d', '#a1cddc', '#696969'];
let buttonColorOfWeather = ['white', '#DCDCDC', '#8B4513', '#9673e8', '#ec830c', '#B0C4DE'];
const jenreOfFilms = ['Thriller', 'Fantastic', 'Comedy', 'Horror', 'Action', 'Drama']
let colorCircles = []
let i = 0;
let k = 0;
let checkedDatas = [];
let formattedWeather = [];
let categoryForThisWeather;
let filmId;

console.log(`In your city X weather, For this weather you love Y. Thats film category Y for you! `)



const changeImgName = imgArr.map((el, idx) => {
    let ss = el.split('-')[0] = weatherApi[idx]
    return ss = ss + '-' + el.split('-')[1]
    // return 
});


// Initialize Functions()

// Delete possibility clicks on circles -->(background)
const takeOffCirclesClick = function () {
    circlesLi.forEach((el, idx, arr) => {
        el.style.pointerEvents = 'none';
    })
}
takeOffCirclesClick()


// Add Image and give stylish
const addImg = function (imgPath) {
    allImages.forEach((el, idx, arr) => {
        el.src = `img/${imgPath[idx]}`;
        el.alt = imgArr[idx].split('-')[0];
        const html = `${el.alt[0].toUpperCase().concat(el.alt.slice(1))} weather`;
        el.insertAdjacentHTML('beforebegin', `
        <p class="weather__desc">${html}</p>
        <p>${idx+1}/${arr.length}</p>
        `);
    });
};
addImg(imgArr);

// Change font-color label of Input-radio
const radioInputChangeText = function () {
    radioInputAll.forEach((el, idx) => {
        el.style.color = buttonColorOfWeather[idx]
        el.querySelectorAll('label').forEach((el, idx) => {
            el.textContent = jenreOfFilms[idx]
        })

    })
}

// Change all <p>What genre of film do you prefer under the specified weather?</p> color
const changeColorTextQuestion = function () {
    textQuestionAll.forEach((el, idx) => {
        // console.log(el.style.color = 'red')
        el.style.color = buttonColorOfWeather[idx]
    })
}


// Change Circles color: place -->(background)
const changeColorCircle = function (elem, idx, arr) {
    elem.style.background = backgroundColorOfWeather[idx];
    elem.style.opacity = '0.3';
    if (!circlesLi[idx].style.cssText.includes('background')) {
        circlesLi[idx].style.cssText += `background: ${buttonColorOfWeather[k]}`
        k++;
        if (k == buttonColorOfWeather.length - 1) {
            k = 0;
        };
    }
}

// Change Background And Color text of Elements
const changeBackgroundColorOfElements = function () {
    areaBackground.style.background = backgroundColorOfWeather[i];
    buttonNextAll[i].style.background = buttonColorOfWeather[i];
    buttonNextAll[i].style.color = backgroundColorOfWeather[i];
    let weatherDesc = document.querySelectorAll(".weather__desc");
    weatherDesc[i].style.backgroundColor = buttonColorOfWeather[i];
    weatherDesc[i].style.color = backgroundColorOfWeather[i];
    weatherDesc[i].style.color = backgroundColorOfWeather[i];
    weatherDesc[i].style.textAlign = 'center';
    circlesLi.forEach((el, idx, arr) => changeColorCircle(el, idx, arr))
    radioInputChangeText()
    changeColorTextQuestion()
}
changeBackgroundColorOfElements();

// Functions

// Reset all datas
const resetData = function () {
    i = 0;
    formattedWeather = [];
    checkedDatas = [];
    inputRadioQuestionAll.forEach((el) => console.log(el.checked = false));
    console.clear();
    changeStateVisibleQuestion();
    changeBackgroundColorOfElements();
}

const changeStateVisibleQuestion = function () {
    allQuestions[i].classList.toggle('main__question--active');
    allQuestions[i].classList.toggle('none');
}

const getUserPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let user = {
    name: 'miroslav',
    surname: 'bondik',
    likeCategory: {
        Clouds: 'action',
        Rain: 'Thriller'
    },
}

for (const [weather, category] of Object.entries(user.likeCategory)) {
    console.log(weather, category)
}



const createError = function(err) {
    const html = `<p style="color: red; weight: 600; font-size: 40px">Something Went Wrong! ${err}</p>`

    document.querySelector('.main').insertAdjacentHTML('afterbegin', html)
}

const next = function () {
    changeStateVisibleQuestion()
    if (i == allQuestions.length - 1) {
        changeStateVisibleQuestion()

        Swal.fire({
            title: `You pick all the option! \n Your choise is \n ${formattedWeather.join('\n')}`,
            showDenyButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Reset`,
        }).then((result) => {
            console.log(result)
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                getUserPosition().then((data) => {
                    const { latitude: lat, longitude: lng } = data.coords;
                    console.log(lat, lng);
                    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherApiKey}`)
                }).catch((err) => {
                    createError(err.message)
                }).then((res) => {
                    return res.json()
                }).then((data) => {
                    console.log(data)

                    for (const [weather, category] of Object.entries(user.likeCategory)) {
                        if (weather == data.weather[0].main) {
                            categoryForThisWeather = category
                        }
                    }
                    recommendFilm.classList.remove('none')
                    // let datasFromApi = [data.name, data.weather[0].main, Math.round(data.main)]
                    secondSection.classList.remove('none')
                    // secondSection.classList.add('none')
                    secondSection.style.display = 'flex';

                    areaBackground.classList.add('none')
                    const htmlDatasAbout = `
                    <div class="recommend-film__text-wrapper">
                        <p class="recommend-film__text">Your place: ${data.name}</p> 
                        <div class="recommend-film__weather-wrapper">
                        <p class="recommend-film__text recommend-film__text--weather">Weather: ${data.weather[0].main}, ${Math.round(data.main.temp - 273, 15)} °C 
                        </p>
                            <img class="recommend-film__weather-icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">
                        </div>
                        
                         <p class="recommend-film__text">You like ${categoryForThisWeather}'s in ${data.weather[0].main} weather</p>
                         <p class="recommend-film__text movie">So this movie for you!</p>
                         </div>
                         <hr>
                         `
                    recommendFilm.insertAdjacentHTML('afterbegin', htmlDatasAbout)
                    return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${movieApiKey}`)
                }).then((res) => {
                    return res.json()
                }).then((data) => {
                    const getRandom = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
                    data.genres.find((el) => {
                        if (el.name.toLowerCase() == categoryForThisWeather) {
                            filmId = el.id
                        }
                    })
                    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movieApiKey}&with_genres=${filmId}&page=${getRandom}`)
                }).then((res) => {
                    return res.json()
                }).then((data) => {
                    let lengthFilms = data.results.length;

                    const getRandomFilm = Math.floor(Math.random() * (lengthFilms - 1 + 1)) + 1;
                    const { release_date, title, overview, vote_average, id, poster_path } = data.results[getRandomFilm]
                    console.log(lengthFilms, getRandomFilm, release_date, title, id, overview)
                    console.log(data)

                    if(!release_date) {
                        recommendFilm.insertAdjacentHTML('beforeend', 
                        `
                            <div class="about-movie">
                                <p class="about-movie__text about-movie__text--title">${title}</p>
    
    
                                <div class="about-movie__img-wrapper">
                                <img class="about-movie__img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}">
                                </div>
                                <p class="about-movie__text"><span class="about-movie__span">Average vote: </span>${vote_average} imDb</p>
                                <hr class="img__hr">
                                
                                <p class="about-movie__text about-movie__text--description">
                                <span class="about-movie__span">Overview:</span>
                                ${overview}
                                </p>
                    
                            </div>`)
                    }

                    recommendFilm.insertAdjacentHTML('beforeend', 
                    `
                        <div class="about-movie">
                            <p class="about-movie__text about-movie__text--title">${title}</p>

                            <p class="about-movie__text about-movie__text--release-data">${release_date.split('-')[0]}</p>

                            <div class="about-movie__img-wrapper">
                            <img class="about-movie__img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}">
                            </div>
                            <p class="about-movie__text"><span class="about-movie__span">Average vote: </span>${vote_average} imDb</p>
                            <hr class="img__hr">
                            
                            <p class="about-movie__text about-movie__text--description"><span class="about-movie__span">Overview: </span>${overview}</p>
                    
                
                        </div>`)

                    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${movieApiKey}&language=en-US`)
                }).then((res) => {
                    return res.json()
                }).then((data) => {
                    console.log(data)
                    console.log(data.overview)
                    console.log(data.tagline)
                    const { tagline, status, budget} = data
                    console.log(data.production_contries)
                    // console.log(production_contries.forEach((el) => el.name))
                    let imgWrapper = document.querySelector('.about-movie__img-wrapper')
                    if(budget) {
                        imgWrapper.insertAdjacentHTML('afterend',
                            `
                            <p class="about-movie__text about-movie__text--budget"><span class="about-movie__span">Budget: </span> ${budget}$</p>
                            `)
                    };
                    if (tagline) {
                        imgWrapper.insertAdjacentHTML('afterend',
                            `<div class="about-movie__tagline-wrapper">
                            <p class="about-movie__text about-movie__text--tagline"><span class="about-movie__span">Tags: </span>${tagline}</p>
                            </div>`)
                    };
                    const jenresOfFilm = [];
                    data.genres.forEach((el) => {
                        console.log(el.name);
                        jenresOfFilm.push(el.name);
                    });
                    imgWrapper.insertAdjacentHTML('afterend', `
                            <div class="about-movie__wrapper-info-data">
                                <p class="about-movie__text about-movie__text-jenres">
                                <span class="about-movie__span">Jenres: </span>
                                 ${jenresOfFilm.join(', ')}
                                <p class="about-movie__text about-movie__text-status">
                                <span class="about-movie__span">Status: </span>
                                ${status}
                                </p>
                            </div>
                            `);
                })
            } else if (result.isDenied) {
                resetData()
            } else if(result.isDismissed) {
                resetData()
            }
})
    } else {
    i++
    changeBackgroundColorOfElements()
    }
changeStateVisibleQuestion()
}



let userLikesList = [] 

const nextSlideBtn = function (elem) {
    elem.forEach((el) => {
        el.addEventListener('click', function (event) {
            event.preventDefault()
            if(!event.target.closest('div').closest('form').children[1].querySelector("[name='category']:checked")) {
                return Swal.fire({
                    title: 'Error!',
                    text: 'You did not pick the option!',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                  })
            } else {
                console.log(event.target.closest('div').closest('form').children[1].querySelector("[name='category']:checked"))
                
                checkedDatas.push(event.target.closest('div').closest('form').children[1].querySelector("[name='category']:checked"));
                if(i == allQuestions.length - 1) {
                imgArr.forEach((el, idx) => {
                    let whichWeather = el.replace('.', '-').split('-')[0]
                    let weather = el.replace('.', '-').split('-')[1]
                    let category = checkedDatas[idx].value
                    formattedWeather.push(whichWeather[0].toUpperCase() + whichWeather.slice(1) + ' ' + weather[0].toUpperCase() + weather.slice(1) + ': ' + checkedDatas[idx].value + ';')
                    console.log(formattedWeather[idx])
                    userLikesList.push([whichWeather, category])
                    const userLikesConvertToObj = Object.fromEntries(userLikesList)
                    const resultDataOfUser = Object.assign(user.likeCategory, userLikesConvertToObj)
                    console.log(resultDataOfUser)
                    console.log(user)
                });

                };
                next();
            }
        });
    });
};


nextSlideBtn(buttonNextAll);


resetButtonAll.forEach((el) => { 
    el.addEventListener('click', function () {
        // resetButton()
        return Swal.fire({
            title: 'Are you sure that page will be refresh and lost data?',
            showDenyButton: true,
            confirmButtonText: 'Yes, refresh this page',
            denyButtonText: 'Continue',
        }).then((response) => {
            if (response.isConfirmed) {
                changeStateVisibleQuestion();
                resetData();
            }
        })
    })

})























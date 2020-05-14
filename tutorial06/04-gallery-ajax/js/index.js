const photosURL = 'https://raw.githubusercontent.com/eecs130/spring2020/master/course-files/tutorials/tutorial06/04-gallery-ajax/data/flowers.json';
const bikesURL = 'https://raw.githubusercontent.com/eecs130/spring2020/master/course-files/tutorials/tutorial06/04-gallery-ajax/data/bikes.json';
const carsURL = 'https://raw.githubusercontent.com/eecs130/spring2020/master/course-files/tutorials/tutorial06/04-gallery-ajax/data/cars.json';

// defining the function loadCards, passing in list of photos
const loadCards = (photos) => {
    // reset.cards element
    document.querySelector('.cards').innerHTML = '';
    // loop through each photo in list of photos
    for (photo of photos) {
        // creating the template to display each card
        const template = `
            <div class="card" style="background-image:url('${photo}')"></div>`;
        // appending newly created template literal to .cards innerHTML
        document.querySelector('.cards').innerHTML += template;
    }
    // implements carousel feature
    initCarousel();
};

// query the data from the server:
fetch(bikesURL)
    // covert the data to json
    .then((response) => {
        return response.json();
    })
    .then(loadCards); // invokes a function to process the data

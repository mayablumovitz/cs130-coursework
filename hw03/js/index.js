
// This variable will always hold the "active" photo element (the div)
let activeCard = null;

// PART 1: Make the showPhoto function work
const showPhoto = (e) => {
    // Hint: figure out which element the user clicked from the event object:
    activeCard = e.target;
    console.log('the active element is:', activeCard);

    // Hint: figure out what its background image is:
    const imgURL = activeCard.style.backgroundImage;
    console.log('the background image of the active element is:', imgURL);

    // Your turn:
    // 1. set the .featured_image's background image to the imgURL (above), and
    document.querySelector('.featured_image').style.backgroundImage = imgURL;
    // 2. update the .preview_box's class to include the "active" class.
    document.querySelector('.preview').classList.add('active');
};

// PART 2: Replace this code with what's commented below.
//         Instead of just applying the event handler to
//         the first .card element, you want to apply it to
//         all of the card elements
// document.querySelector('.card').onclick = showPhoto;
 const cards = document.querySelectorAll('.card');
 for (card of cards) {
     card.onclick = showPhoto;
 }



// PART 3: Close functionality
const close = () => {
    // a. This function should remove the “active” class from the
    //    “.preview_box” element.
    document.querySelector('.preview').classList.remove('active');

};
// b. Attach your newly created “close” function to the onclick
//    event handler of the close button (in the upper right-hand corner).
document.querySelector('.close').onclick = close;

// PART 4: Next functionality:
// a. Modify the “next” function (below) so that that it replaces
//    the “.featured_image” background image to the next image in the list.
// b. Attach your newly created “next” function to the onclick event
//    handler of the “.next” button (in the upper right-hand corner).
// c. Also attach your “next” function to the onclick event handler of
//    the “.featured_image” element (so that clicking anywhere on the
//    image will advance it to the next one) — for convenience.
const next = () => {
    // HINTS:
    // 1. update the "activeCard" variable so that it's now the
    //    next card in the list.
    const cards = document.querySelectorAll('.card');
    if(activeCard == cards[(cards.length)-1])
    {
      activeCard = cards[0];
    }
    else {
      activeCard = activeCard.nextElementSibling;
    }
    document.querySelector('.featured_image').style.backgroundImage = activeCard.style.backgroundImage;
    document.querySelector('.preview').classList.add('active');
    // 2. Then do the same steps as before (in the showPhoto).
    console.log(activeCard.nextElementSibling);
}
document.querySelector('.next').onclick = next;
document.querySelector('.featured_image').onclick = next;

// PART 5: Previous functionality:
// a. Create a “previous” function that switches out the
//    “.featured_image” background image to the previous image
//    in the list.
const previous = () => {
    // HINTS:
    // 1. update the "activeCard" variable so that it's now the
    //    previous card in the list.
    const cards = document.querySelectorAll('.card');
    if(activeCard == cards[0])
    {
      activeCard = cards[(cards.length)-1];
    }
    else {
      activeCard = activeCard.previousElementSibling;
    }
    document.querySelector('.featured_image').style.backgroundImage = activeCard.style.backgroundImage;
    document.querySelector('.preview').classList.add('active');
    // 2. Then do the same steps as before (in the showPhoto).
    console.log(activeCard.previousElementSibling);
}
// b. Attach your newly created “previous” function to the onclick
//    event handler of the “.prev” button (in the upper right-hand corner).
document.querySelector('.prev').onclick = previous;

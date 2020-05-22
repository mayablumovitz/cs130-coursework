storestab = `<div>
  <img src="marianos-fresh-market.png">
  Mariano's
</div>
<div>
  <img src="costco.png">
  Costco
</div>
<div>
  <img src="whole-foods.jpg">
  Whole Foods
</div>
<div>
  <img src="Jewel-Osco-logo.png">
  Jewel Osco
</div>
<div>
  <img src="Safeway.png">
  Safeway
</div>
<div>
  More stores go here
</div>`

productstab = `<div>
  <img src="charmin-toilet-paper.jpg">
  Charmin's Toilet Paper
</div>
<div>
  <img src="wholewheatflour.jpeg">
  King Arthur Whole Wheat Flour
</div>
<div>
  <img src="brownie.png">
  Betty Crocker Brownie Mix
</div>
<div>
  <img src="lysolspray.png">
  Lysol Disinfecting Spray
</div>
<div>
  <img src="eggs.jpg">
  Eggs
</div>
<div>
  More products go here
</div>`

mylisttab = `<div>
  <img src="charmin-toilet-paper.jpg">
  Charmin's Toilet Paper
</div>
<div>
  <img src="wholewheatflour.jpeg">
  King Arthur Whole Wheat Flour
</div>
<div>
  <img src="brownie.png">
  Betty Crocker Brownie Mix
</div>
<div>
  <img src="eggs.jpg">
  Eggs
</div>
<div>
  More products go here
</div>`

settingstab = `<div>
  <img src="user.png">
  Jane Smith
</div>
<div>
  Zip Code: 60201
</div>
<div>
  Favorite Store: Mariano's
</div>
<div>
  Selected Stores
</div>
<div>
  More settings go here
</div>`

const search = (ev) => {
    const term = document.querySelector('#mySearch').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getStore(term);
    getProduct(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getStore = (term) => {
    console.log(`
        get store based on the search term
        "${term}" and load them into featured content`);
};

const getProduct = (term) => {
  console.log(`
      get product based on the search term
      "${term}" and load them into featured content`);
};


document.querySelector('#mySearch').onkeyup = (ev) => {
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};
document.querySelector('#StoresB').onclick = (ev) => {
    console.log(ev.keyCode);
    document.querySelector('h1').innerHTML = 'Stores';
    document.querySelector('main').innerHTML = storestab;
};

document.querySelector('#ProductsB').onclick = (ev) => {
    console.log(ev.keyCode);
    document.querySelector('h1').innerHTML = 'Products';
    document.querySelector('main').innerHTML = productstab;
    document.querySelector('img').height = '45px';
    document.querySelector('img').width = '55px';
};

document.querySelector('#MyListB').onclick = (ev) => {
    console.log(ev.keyCode);
    document.querySelector('h1').innerHTML = 'My List';
    document.querySelector('main').innerHTML = mylisttab;
};

document.querySelector('#SettingsB').onclick = (ev) => {
    console.log(ev.keyCode);
    document.querySelector('h1').innerHTML = 'Settings';
    document.querySelector('main').innerHTML = settingstab;
};

mylisttab = `<div>
  <img src="images/charmin-toilet-paper.jpg">
  Charmin's Toilet Paper
</div>
<div>
  <img src="images/wholewheatflour.jpeg">
  King Arthur Whole Wheat Flour
</div>
<div>
  <img src="images/brownie.png">
  Betty Crocker Brownie Mix
</div>
<div>
  <img src="images/eggs.jpg">
  Eggs
</div>
<div>
  More products go here
</div>`

settingstab = `<div>
  <img src="images/user.png">
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

const getProductCats = () => {
  document.querySelector('main').innerHTML = "";
  document.querySelector('#mySearch').value = "";
  console.log('getProductCats called');
  const template = `<div class="prodButtons">
  <p class="catButton" onclick=getProductsFromCat(this.innerHTML)>All Products</p>
  <p class="catButton" onclick=getProductsFromCat(this.innerHTML)>Dairy and Eggs</p>
  <p class="catButton" onclick=getProductsFromCat(this.innerHTML)>Meat and Seafood</p>
  <p class="catButton" onclick=getProductsFromCat(this.innerHTML)>Produce</p>
  <p class="catButton" onclick=getProductsFromCat(this.innerHTML)>Pantry</p>
  <p class="catButton" onclick=getProductsFromCat(this.innerHTML)>Household</p>
  <p class="catButton" onclick=getProductsFromCat(this.innerHTML)>Alcohol</p>
  <p class="catButton" onclick=getProductsFromCat(this.innerHTML)>Snacks</p>
  <p class="catButton" onclick=getProductsFromCat(this.innerHTML)>Beverages</p>
  <p class="catButton" onclick=getProductsFromCat(this.innerHTML)>Bakery</p>
  </div>`
  document.querySelector("main").innerHTML += template;
}

const getAllProducts = () => {
    console.log('getAllProducts called');
    document.querySelector('#mySearch').value = "";
    fetch("productlist.json")
    .then (response => response.json())
    .then (data => {
      console.log(data);
      document.querySelector('main').innerHTML = "";
      if(data.length == 0) {
        document.querySelector("main").innerHTML = "No products were found.";
      }
      document.querySelector("main").innerHTML += `<p class="back" onclick=getProductCats()>Back</p>`;
      for(product of data)
      {
        const template = `<div class="prod">
          <img src="${product.imgsrc}">
          ${product.name}
        </div>`;
        document.querySelector("main").innerHTML += template;
      }
    });
}
const getProductsFromCat = (cat) => {
    console.log('getProductsFromCat called');
    document.querySelector('#mySearch').value = "";
    fetch("productlist.json")
    .then (response => response.json())
    .then (data => {
      console.log(data);
      document.querySelector('main').innerHTML = "";
      if(cat == "All Products")
      {
        getAllProducts();
      }
      else {
        let check = false;
        document.querySelector("main").innerHTML += `<p class="back" onclick=getProductCats()>Back</p>`;
        for(product of data)
        {
          if(product.category == cat)
          {
            const template = `<div class="prod">
              <img src="${product.imgsrc}">
              ${product.name}
            </div>`;
            document.querySelector("main").innerHTML += template;
            check = true;
          }
        }
        if(check == false) {
          document.querySelector("main").innerHTML += "No products were found.";
        }
      }
    });
}
const getProduct = (term) => {
    console.log('getProducts called');
    document.querySelector('#mySearch').value = "";
    fetch("productlist.json")
    .then (response => response.json())
    .then (data => {
    document.querySelector('main').innerHTML = "";
    let check = false;
    document.querySelector("main").innerHTML += `<p class="back" onclick=getProductCats()>Back</p>`;
    for(product of data)
    {
      if (product.name.toUpperCase().includes(term.toUpperCase())) {
        const template = `<div class="prod">
          <img src="${product.imgsrc}">
          ${product.name}
        </div>`;
        document.querySelector("main").innerHTML += template;
        check = true;
      }
    }
    if(check == false) {
      document.querySelector("main").innerHTML += "No products were found.";
    }
  });
}


const getStores = () => {
  console.log('getStores called');
  fetch("storelist.json")
  .then (response => response.json())
  .then (data => {
    if(data.length == 0) {
      document.querySelector("main").innerHTML = "No stores were found.";
    }
  document.querySelector('main').innerHTML = "";
  document.querySelector('#mySearch').value = "";
  for(store of data)
  {
      const template = `<div class="storelist" id="${store.id}" onclick="getStoreInfo(${store.id})">
        <img src="${store.imgsrc}">${store.name}
      </div>`;
      document.querySelector("main").innerHTML += template;
  }
});
};

const getStore = (storename) => {
  console.log('getStore called');
  fetch("storelist.json")
  .then (response => response.json())
  .then (data => {
  document.querySelector('#mySearch').value = "";
  if(data.length == 0) {
      document.querySelector("main").innerHTML = "No stores were found.";
  }
  document.querySelector('main').innerHTML = "";
  document.querySelector("main").innerHTML += `<p class="back" onclick=getStores()>Back</p>`;
  let check = false;
  for(store of data)
  {
    if(store.name.toUpperCase().includes(storename.toUpperCase()))
    {
      const template = `<div class="storelist" id="${store.id}" onclick="getStoreInfo(${store.id})">
        <img src="${store.imgsrc}">${store.name}
      </div>`;
      document.querySelector("main").innerHTML += template;
      check = true;
    }
  }
  if(check == false) {
    document.querySelector("main").innerHTML += "No stores were found.";
  }
});
}

const getStoreInfo = (storeid) => {
  console.log('getStoreInfo called');
  fetch("storelist.json")
  .then (response => response.json())
  .then (data => {
  if(data.length == 0) {
      document.querySelector("main").innerHTML += "No stores were found.";
  }
  document.querySelector('main').innerHTML = "";
  document.querySelector("main").innerHTML += `<p class="back" onclick=getStores()>Back</p>`;
  let check = false;
  for(store of data)
  {
    if(store.id == storeid)
    {
      const template = `
      <h1>${store.name}</h1>
      <h3>store hours: 10:00am-9:00pm</h3>
      <h3>foot traffic:</h3>`;
      document.querySelector("main").innerHTML += template;
      check = true;
    }
  }
  if(check == false) {
    document.querySelector("main").innerHTML += "No stores were found.";
  }
});
}

const search = (ev) => {
    const term = document.querySelector('#mySearch').value;
    console.log('search for:', term);
    if(document.querySelector('#mySearch').placeholder == "Search for product...") {
      getProduct(term);
    }
    else {
      getStore(term);
    }
    if (ev) {
        ev.preventDefault();
    }
}

document.querySelector('#mySearch').onkeyup = (ev) => {
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};
document.querySelector('#StoresB').onclick = (ev) => {
    console.log(ev.keyCode);
    getStores();
    document.querySelector('#mySearch').style.display = "flex";
    document.querySelector('main').classList.remove('products');
    document.querySelector('main').classList.add('stores');
    document.querySelector('#mySearch').placeholder = "Search for store..."
};

document.querySelector('#ProductsB').onclick = (ev) => {
    console.log(ev.innerHTML);
    getProductCats();
    document.querySelector('#mySearch').style.display = "flex";
    document.querySelector('main').classList.remove('stores');
    document.querySelector('main').classList.add('products');
    document.querySelector('#mySearch').placeholder = "Search for product..."
};

document.querySelector('#MyListB').onclick = (ev) => {
    console.log(ev.keyCode);
    document.querySelector('main').innerHTML = mylisttab;
    document.querySelector('#mySearch').style.display = "none";
};

document.querySelector('#SettingsB').onclick = (ev) => {
    console.log(ev.keyCode);
    document.querySelector('main').innerHTML = settingstab;
    document.querySelector('#mySearch').style.display = "none";
};

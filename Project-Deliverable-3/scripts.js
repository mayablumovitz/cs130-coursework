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

//* Initialize Shopping Cart *//
const mylistjson = [];
localStorage.setItem('shoppingcart', JSON.stringify(mylistjson));

//* -------Getting Products-------- *//

//* Getting Product Categories *//
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

//* Getting All Products *//
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
      var html = `<p class="back" onclick=getProductCats()>Back</p>`;
      html += `<div class="allprods">`;
      for(product of data)
      {
        const template = `<div class="prod">
        <input class="add" onclick="addToList(${product.id})" type="button" value="+">
          <img src="${product.imgsrc}">
          ${product.name}
        </div>`;
        html += template;
      }
      html += `</div>`;
      document.querySelector("main").innerHTML = html;
    });
}

//* Getting All Products of a Category *//
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
        var html = `<p class="back" onclick=getProductCats()>Back</p>`;
        html += `<div class="allprods">`;
        for(product of data)
        {
          if(product.category == cat)
          {
            const template = `<div class="prod">
            <input class="add" onclick="addToList(${product.id})" type="button" value="+">
              <img src="${product.imgsrc}">
              ${product.name}
            </div>`;
            html += template;
            check = true;
          }
        }
        html += `</div>`;
        document.querySelector("main").innerHTML = html;
        if(check == false) {
          document.querySelector("main").innerHTML += "No products were found.";
        }
      }
    });
}

//* Getting Specific Product By Name *//
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
        <input class="add" onclick="addToList(${product.id})" type="button" value="+">
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

//* -------Getting Stores-------- *//

//* Getting All Stores *//
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

//* Getting Store By Name *//
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

//* Getting Store Information By ID *//
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

//* Add Item To Shopping List *//
/* To add:  1. retrieve item from local storage and JSON.parse it. 
2. shoppingcart.push({the dictionary})
3. stringify and write it to local storage again; */
const addToList = (itemID) => {
  console.log('addToList called');
  fetch("productlist.json")
  .then (response => response.json())
  .then (data => {
  for(product of data)
  {
    if (product.id == itemID) {
      console.log(product.name);
      var shoppingcart = JSON.parse(localStorage.getItem("shoppingcart"));
      var check = false;
      for (item of shoppingcart)
      {
        if(item.id == itemID) {
          check = true;
          break;
        }
      }
      if(!check) {
        const mylistjson = {"id":product.id,"name":product.name,"category":product.category,"imgsrc":product.imgsrc};
        shoppingcart.push(mylistjson);
        localStorage.setItem('shoppingcart', JSON.stringify(shoppingcart));
      }
    }
  }
});
}

//* Delete Item From Shopping List *//
/* To delete:  1. retrieve item from local storage and JSON.parse it. 
2. shoppingcart.splice(index); 
3. stringify and write it to local storage again*/
const delFromList = (itemID) => {
  console.log('delFromList called');
  fetch("productlist.json")
  .then (response => response.json())
  .then (data => {
    var shoppingcart = JSON.parse(localStorage.getItem("shoppingcart"));
    for (var i=0;i<shoppingcart.length;i++) {
      if(itemID == shoppingcart[i].id) {
        shoppingcart.splice(i, 1); 
        break;
      }
    }
    localStorage.setItem('shoppingcart', JSON.stringify(shoppingcart));
    var retrievedObject = localStorage.getItem('shoppingcart');
    retrievedObject = JSON.parse(retrievedObject);
    document.querySelector("main").innerHTML = "";
    for(product of retrievedObject)
    {
        const template = `<div class="prod">
        <input class="del" onclick="delFromList(${product.id})" type="button" value="-">
          <img src="${product.imgsrc}">
          ${product.name}
        </div>`;
        document.querySelector("main").innerHTML += template;
    }

});
}


//* Search for Product or Store *//
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
//* Search for Product or Store *//
document.querySelector('#mySearch').onkeyup = (ev) => {
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};

//* -------Nav Tab Definitions-------- *//

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
    var retrievedObject = localStorage.getItem('shoppingcart');
    retrievedObject = JSON.parse(retrievedObject);
    document.querySelector("main").innerHTML = "";
    console.log(retrievedObject.length);
    if(retrievedObject.length == 0) {
      document.querySelector("main").innerHTML = "Your list is empty. Go to 'Products' to start adding to your list.";
    }
    else {
    for(product of retrievedObject)
    {
        const template = `<div class="prod">
        <input type="button" class="del" onclick="delFromList(${product.id})" value="-">
          <img src="${product.imgsrc}">
          ${product.name}
        </div>`;
        document.querySelector("main").innerHTML += template;
    }
    document.querySelector('#mySearch').style.display = "none";
  }
};

document.querySelector('#SettingsB').onclick = (ev) => {
    console.log(ev.keyCode);
    document.querySelector('main').innerHTML = settingstab;
    document.querySelector('#mySearch').style.display = "none";
};

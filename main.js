
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}


/////////////////  ADDED CARD  /////////////////

let arr = []

function fetchData() {
  fetch("http://localhost:3000/pitches")
    .then(res => res.json())
    .then(data => {
      arr = data
      cardlist(data);
    })
    .catch(err => console.error("Fetch Error:", err));
}
fetchData()

function cardlist(data) {
  let store = data.map((el) =>
    `
       <a class="link" href="dic.html?image=${encodeURIComponent(el.image)}
       &title=${encodeURIComponent(el.title)}
       &category=${encodeURIComponent(el.category)}
       &founder=${encodeURIComponent(el.founder)}
       &price=${encodeURIComponent(el.price)}  "> 
       
       <div class="card01" style=" padding:
        50px; margin: 10px ; border: solid 1px black; border-radius: 10px;">
        <h4>${el.title}</h4>
        <img src="${el.image}" alt="${el.title} hieght="130px" width="130px">
        <p class="card-category" id= "update-pitch-category">Category: ${el.category}</p> 
        <p  class="card-founder">${el.founder}</p>
        <h4> Price : ${el.price} </h4>

         
        <button class="card-button" data-id='${el.id}'> delete </button>
        <button> <a href="#" data-id='${el.id}' class="card-link">Edit</a> </button>
  </div> </a>
        `
  )
  mainSection.innerHTML = store.join(" ")
}


document.getElementById("add-pitch").addEventListener("click",
  (e) => {

    let store = {

      title: pitchTitleInput.value,
      img: pitchImageInput.value,
      category: pitchCategoryInput.value,
      founder: pitchfounderInput.value,
      price: pitchPriceInput.value,
      btn: pitchCreateBtn.value

    }

    fetch('http://localhost:3000/pitches',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(store),
      })
      .then(response => response.json())
      .then(data => alert('POST request successful:', data))
      .catch(error => console.error('Error:', error));
  })


/////////////////  DELETE CARD   /////////////////

document.addEventListener('click', (e) => {

  if (e.target.classList.contains('card-button')) {
    deletefun(e.target.dataset.id)
  }
})


function deletefun(id) {

  fetch(`http://localhost:3000/pitches/${id}`, {
    method: 'DELETE',
  }).then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err))

}


/////////////////  EDIT CARD DATA  /////////////////


document.addEventListener('click', (e) => {
  if (e.target.classList.contains('card-link')) {
    updateFunction(e.target.dataset.id)
  }
})


function updateFunction(id) {
  fetch(`http://localhost:3000/pitches/${id}`)
    .then((res) => res.json())
    .then((data) => {
      updatePitchIdInput.value = data.id,
        updatePitchTitleInput.value = data.title,
        updatePitchImageInput.value = data.image,
        updatePitchfounderInput.value = data.founder,
        updatePitchCategoryInput.value = data.category,
        updatePitchPriceInput.value = data.price
    }
    )
}

updatePitchBtn.addEventListener('click', (e) => {

  let updateObj = {
    id: updatePitchIdInput.value,
    title: updatePitchTitleInput.value,
    image: updatePitchImageInput.value,
    founder: updatePitchfounderInput.value,
    category: updatePitchCategoryInput.value,
    price: updatePitchPriceInput.value,
  }

  // fetch(`http://localhost:3000/pitches/${updateobj.id}`)
  fetch(`http://localhost:3000/pitches/${updateObj.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateObj)
  }).then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err))

})

/////////////////  EDIT CARD PRICE  /////////////////


document.addEventListener('click', (e) => {

  if (e.target.classList.contains('card-link')) {
    updateprice(e.target.dataset.id)
  }
})

function updateprice(id) {

  fetch(`http://localhost:3000/pitches/${id}`)
    .then((res) => res.json())
    .then((data) => {

      updatePricePitchId.value = data.id,
        updatePricePitchPrice.value = data.price

    })
}


updatePricePitchPriceButton.addEventListener('click', (e) => {

  let updatedprice = {

    id: updatePricePitchId.value,
    price: updatePricePitchPrice.value

  }

  fetch(`http://localhost:3000/pitches/${updatedprice.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedprice)
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err))

})

/////////////////  SHORT PRICE  /////////////////

sortAtoZBtn.addEventListener('click', (e) => {
  let LowToHigh = arr.sort((a, b) =>
    a.price - b.price
  )
  cardlist(LowToHigh)
})

sortZtoABtn.addEventListener('click', (e) => {

  let HightToLow = arr.sort((a, b) => b.price - a.price)
  cardlist(HightToLow)
})

///////////////// FILTER CATOGARY  /////////////////

//-----f food 

filterFood.addEventListener('click', () => {

  let filterF = arr.filter((el) => {
    return el.category == "Food"
  })
  cardlist(filterF)
})

//-----f Eletronics' 

filterElectronics.addEventListener('click', () => {

  let filterE = arr.filter((el) => {
    return el.category == "Electronics"
  })
  cardlist(filterE)
})

//-----f Personal Care' 

filterPersonalCare.addEventListener('click', () => {

  let filterP = arr.filter((el) => {
    return el.category == "Personal Care"
  })
  cardlist(filterP)
})



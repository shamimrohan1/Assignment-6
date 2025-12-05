const loadCategory = () => {
    const url = "https://openapi.programming-hero.com/api/categories";

    fetch(url)//url promise kortechi j ami tomake response
    .then((res) => res.json())  // promise kortechi ami tomak data
    .then ((data) => displayCategory(data.categories));
};

let cart = [];
let total = 0;

// modal 
const loadPlandDetails=(id)=>{
   const url =`https://openapi.programming-hero.com/api/plant/${id}`;
   console.log(url);

   fetch(url)
   .then((res) => res.json())
   .then((data) =>displayDetails(data.plants));
}

//  {
//       "id": 1,
//       "category_name": "Fruit Tree",
//       "small_description": "Trees that bear edible fruits like mango, guava, and jackfruit."
//     },
const loadFoods =(id) =>{
    console.log("Clicked category id:", id);
    //1 - food container k hide kordo + loading ke show korbe
    document.getElementById("Plant-container").classList.add("hidden");
    document.getElementById("loading-spinner").classList.remove("hidden");

    const url =id?`https://openapi.programming-hero.com/api/category/${id}`
                :`https://openapi.programming-hero.com/api/plants/random`;

    //1- sobaike niye esche active class remove kore dao.
    const catBtns = document.querySelectorAll(".btn-category");
    // console.log(catBtns);
    catBtns.forEach((btn) => btn?.classList?.remove("active"));


    //2- Jke click kora hoise take active class dao
     const currentBtn = document.getElementById(`cat-btn-${id}`);
     console.log(currentBtn);
     currentBtn?.classList?.add("active");

    fetch(url) 
    .then((res) => res.json())
    .then((data) =>displayPlants(data.plants));
};

const displayCategory =(categories) =>{
    // console.log(plants);
    //1.jekhene rakho setake dhore niye asho
    const catContainer = document.getElementById("category-categories");
    // console.log(catContainer);
    
    catContainer.innerHTML ="";
    for(let cat of categories){
        //3- Create html element
        const categoryCard = document.createElement("div");
        categoryCard.innerHTML =` <button id="cat-btn-${cat.id}" onclick="loadFoods(${cat.id})"
                                     class="btn  justify-start btn-block 
                                    shadow btn-category bg-[#15803D]">
                                     ${cat.category_name}</button> `
              // categoryCard.innerHTML =`   <h1  id="cat-btn-${cat.id}" onclick="loadFoods(${cat.id})"
                //                             class="btn btn-block shadow btn-category">
                //                              ${cat.category_name}</h1>`

        // 4- Append the element
        catContainer.append(categoryCard);
        console.log(cat);
    }
};


    // {
    //   "id": 1,
    //   "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
    //   "name": "Mango Tree",
    //   "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
    //   "category": "Fruit Tree",
    //   "price": 500
    // },

const displayPlants = (plants) =>{
        const plantContainer = document.getElementById("Plant-container")
        plantContainer.innerHTML ="";

        plants.forEach((plant) =>{
            // console.log(plant);
            const plantCard = document.createElement("div");
            plantCard.innerHTML =`   <div  class="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden m-4 ">
                <img onclick="loadPlandDetails(${plant.id})" class="w-full h-48 object-cover  plant-img" src="${plant.image}" alt="Tree Image">
            <div class="p-5">
                <h2 class="text-2xl font-bold mb-2 plant-title">${plant.name}</h2>
                <p class="text-gray-700 mb-4">${plant.description}</p>
                  <div class="flex items-center justify-between">
                    <button class="btn btn-sm bg-[#15803D] rounded-full">${plant.category}</button>
                     <span class="text-green-600 font-semibold  plant-price">${plant.price}</span>
                 </div>
            </div>
            <button onclick="addtoCart(this)" class="btn btn-block shadow text-white 
             bg-[#15803D] rounded-full ">Add Cart</button>
            </div>`;

        plantContainer.append(plantCard);

        });
          //2 - food container k show kordo + loading ke hide korbe
    document.getElementById("Plant-container").classList.remove("hidden");
    document.getElementById("loading-spinner").classList.add("hidden");
    };

//      {
//     "id": 1,
//     "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
//     "name": "Mango Tree",
//     "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
//     "category": "Fruit Tree",
//     "price": 500
//   }
    const displayDetails = (plant) =>{
        const detailsContainer =  document.getElementById("details-container");
        detailsContainer.innerHTML ="";
      detailsContainer.innerHTML=`<div class="">
                                <img src="${plant.image}" alt="" >
                                </div>
                                <div class="">
                                <h1 class="text-3xl font-bold">${plant.name}</h2>
                                <p>${plant.description}</p>
                                </div>

                                <div class="flex items-center justify-between">
                    <button class="btn btn-sm bg-[#15803D] rounded-full">${plant.category}</button>
                     <span class="text-green-600 font-semibold">${plant.price}</span>
                 </div>
      `;
      document.getElementById("my_modal_3").showModal();
    };
/////////////////////////////////////////////////////////////////////////////////
loadCategory();
loadFoods(4);









// document.getElementById("Plant-container").addEventListener("click",(e) =>{
//     console.log(e.target);
// });
const addtoCart = (btn) => {
    // console.log("add to Cart button clicked",btn);
    const card = btn.parentNode.parentNode;
    const plantTitle =card.querySelector(".plant-title").innerText;
    const plantImg = card.querySelector(".plant-img").src;
    const plantPrice= card.querySelector(".plant-price").innerHTML;
    const plantPriceNum = Number(plantPrice);
    // console.log(plantTitle, plantImg,plantPriceNum);


    const selectedItem = {
        id: cart.length + 1,
        plantTitle: plantTitle,
        plantImg : plantImg,
        plantPrice:plantPriceNum,
    };
    cart.push(selectedItem);
    total =total + plantPriceNum;
    displayTotal(total);
    displayCart (cart);
    
};

const displayTotal = (val) => {
  document.getElementById("cart-Total").innerHTML = val;
};


const displayCart = (cart) =>{
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML ="";

    for (let item of cart) {
        const newItem = document.createElement("div");
        newItem.innerHTML =` <div class="p-1 bg-white flex gap-3 shadow rounded-xl relative">
            <div class="img">
            <span class=" cart-id">${item.id}</span>
              <img
                src=" ${item.plantImg} "
                alt=""
                class="w-[50px] rounded-xl h-[50px] object-cover"
              />
            </div>
            <div class="flex-1">
              <h1 class="text-xs font-bold plant-title">
               ${item.plantTitle}
              </h1>

              <div class="">
                <h2 class="text-yellow-600 font-semibold">
                  $ <span class="paroduct-price">${item.plantPrice}</span> BDT
                </h2>
              </div>
            </div>
            <div onclick="removeCart(this)"
              class="w-6 h-6 flex justify-center items-center bg-red-600 rounded-full absolute -top-1 -right-1 text-white"
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>`
          cartContainer.append(newItem);
    };
};

const removeCart = (btn) =>{
  const item = btn.parentNode;
  // const plantTitle = item.querySelector(".plant-title").innerText;
  const id = Number(item.querySelector(".cart-id").innerText)
  const plantPrice = Number(item.querySelector(".paroduct-price").innerText);
  // console.log(plantTitle);

  // cart = cart.filter((item) => item.plantTitle != plantTitle);
      cart = cart.filter((item) => item.id != id);
  // total=total-plantPrice;     /**avabe na kore card theke korte para jai */
  total = 0;
  cart.forEach((item) => (total += item.plantPrice));
  displayCart(cart);
  displayTotal(total);
};
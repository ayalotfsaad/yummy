
// nav menu 
function open() {
    $(".nav-menu").animate({
        left: 0
    }, 500)
    $(".open").removeClass("fa-align-justify");
    $(".open").addClass("fa-x");
     $("ul").addClass('animate__animated animate__backInLeft')

}

function close() {
    let boxWidth = $(".nav-menu .nav-hiden").outerWidth()
    $(".nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open").addClass("fa-align-justify");
    $(".open").removeClass("fa-x");
    // $('ul').addClass('animate__animated animate__backOutLeft')
}

close()
$(".nav-menu i.open").click(() => {
    if ($(".nav-menu").css("left") == "0px") {
        close()
    } else {
        open()
    }
})



// ///////////////////////////////search ////////////////////////////////////////

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")
    })
})

let Datalist=document.getElementById('Datalist')
async function searchByName(term) {
    close()
    if (Datalist !==null) {
        Datalist.innerHTML = ""
    }
   
    $(".inner-loading").fadeIn(100)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayfood(response.meals) : displayfood([])
    $(".inner-loading").fadeOut(100)

}

async function searchByFLetter(term) {
    close()
    if (Datalist !==null) {
        Datalist.innerHTML = ""
    }
       $(".inner-loading").fadeIn(100)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayfood(response.meals) : displayfood([])
    $(".inner-loading").fadeOut(100)

}

// display home 
let Data=document.getElementById('Data')
function displayfood(data) {
    let box = "";
    //  console.log(data[i].strMealThumb);
    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getdetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${data[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
if(Data !==null){
    Data.innerHTML = box

}
}


async function getdetails(mealID) {
    close()
    
    $(".inner-loading").fadeIn(200)
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displaydetails(respone.meals[0])
    $(".inner-loading").fadeOut(200)

}
function displaydetails(meal) {

    if (Datalist !==null) {
        Datalist.innerHTML = ""

    }

    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let box = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`
    
        Data.innerHTML = box

    
}



// categories ////////////////////////////////////////////////////////////////////////////////////
let categoriesbtn=document.getElementById('categoriesbtn')
let categoriesData = document.getElementById('categoriesData')
async function getcategories() {
    $(".inner-loading").fadeIn(100)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displaycategories(response.categories)
    // console.log(response.categories);
    $(".inner-loading").fadeOut(100)

}

function displaycategories(data) {
    let box = "";

    for (let i = 0; i < data.length; i++) {
        // console.log(data[i].strCategory);
        box += `
        <div class="col-md-3">
                <div onclick="getcategoryMeals('${data[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${data[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${data[i].strCategory}</h3>
                        <p>${data[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }
    if(categoriesData!==null){
        categoriesData.innerHTML = box
    }
}
getcategories()

async function getcategoryMeals(category) {
    if (categoriesData !== null) {
        categoriesData.innerHTML = ""

    }
    $(".inner-loading").fadeIn(100)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
   console.log(response);

    displaycategoriesmeals(response.meals)
    $(".inner-loading").fadeOut(100)

}
function displaycategoriesmeals(data) {
    let box = "";
    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getcategdetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${data[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
if(categoriesData !==null){
    categoriesData.innerHTML = box

}
}


async function getcategdetails(mealID) {
    close()
    
    $(".inner-loading").fadeIn(200)
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displaycategdetails(respone.meals[0])
    $(".inner-loading").fadeOut(200)

}
function displaycategdetails(meal) {

    if (categoriesData !==null) {
        categoriesData.innerHTML = ""

    }

    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let box = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`
    
            categoriesData.innerHTML = box

    
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
// area section 
let areaData= document.getElementById('areaData')
async function getArea() {
    $(".inner-loading").fadeIn(100)

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    // console.log(respone.meals);

    displayArea(respone.meals)
    // console.log(respone.meals);
    $(".inner-loading").fadeOut(100)

}
function displayArea(data) {
    let box = "";

    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getareaMeals('${data[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${data[i].strArea}</h3>
                </div>
        </div>
        `
    }
    if (areaData !== null){
        areaData.innerHTML = box
    }
    
}

getArea()

async function getareaMeals(area) {
    areaData.innerHTML = ""
    $(".inner-loading").fadeIn(200)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayareameals(response.meals.slice(0, 15))
    $(".inner-loading").fadeOut(200)

}
function displayareameals(data) {
    let box = "";
    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getareadetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${data[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
if(areaData !==null){
    areaData.innerHTML = box
}
}
async function getareadetails(mealID) {
    close()
    
    $(".inner-loading").fadeIn(200)
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayareadetails(respone.meals[0])
    $(".inner-loading").fadeOut(200)

}
function displayareadetails(meal) {

    if (areaData !==null) {
        areaData.innerHTML = ""

    }

    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let box = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`
    
            areaData.innerHTML = box

    
}

// ingredient ///////////////////////////////////////////////////////////////////////////////////////
let ingredentData=document.getElementById('ingredentData')

async function getingredients() {
    $(".inner-loading").fadeIn(100)
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    // console.log(respone.meals.slice(0, 20));

    displayingredients(respone.meals.slice(0, 20))
    $(".inner-loading").fadeOut(100)

}


function displayingredients(data) {
    let box = "";

    for (let i = 0; i < data.length; i++) {
        // console.log(data[i]);
        box += `
        <div class="col-md-3">
                <div onclick="getingredientsMeals('${data[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${data[i].strIngredient}</h3>
                        <p>${data[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }
    if( ingredentData !==null){
        ingredentData.innerHTML = box

    }

}

getingredients()

async function getingredientsMeals(ingredients) {
    ingredentData.innerHTML = ""
    $(".inner-loading").fadeIn(100)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayingredientmeals(response.meals.slice(0, 20))
    $(".inner-loading").fadeOut(100)

}
function displayingredientmeals(data) {
    let box = "";
    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getingreddetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${data[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
if(ingredentData !==null){
    ingredentData.innerHTML = box

}
}
async function getingreddetails(mealID) {
    close()
    
    $(".inner-loading").fadeIn(200)
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayingreddetails(respone.meals[0])
    $(".inner-loading").fadeOut(200)

}
function displayingreddetails(meal) {

    if (ingredentData !==null) {
        ingredentData.innerHTML = ""

    }

    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let box = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`
    
            ingredentData.innerHTML = box
}
// display details ///////////////////////////////////////////////////////////////






// validation 
let submitBtn = document.getElementById('submitBtn')
let nameInput = document.getElementById('nameInput');
let emailInput = document.getElementById('emailInput');
let phoneInput = document.getElementById('phoneInput');
let ageInput = document.getElementById('ageInput');
let passwordInput = document.getElementById('passwordInput');
let repasswordInput = document.getElementById('repasswordInput');
function nameregex() {
   return (/^[a-zA-Z ]+$/.test(nameInput.value))

    }
function emailregex() {

    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput.value))
}

function phoneregex() {

    return (/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/.test(passwordInput.value))
}
function ageregex() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(ageInput.value))
}
function passwordegex() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(passwordInput.value))
}
function repasswordregex() {
    return repasswordInput.value == passwordInput.value
}
if(nameInput !== null){
nameInput.addEventListener("focus", () => {
    nameInputTouch = true
})

}
if(emailInput !==null){
emailInput.addEventListener("focus", () => {
    emailInputTouch= true
})
}

if(phoneInput !==null){
    phoneInput.addEventListener("focus", () => {
        phoneInputTouch = true
    })
}

if (ageInput !==null ) {
    ageInput.addEventListener("focus", () => {
        ageInputTouch = true
    })
}

if(passwordInput !== null){
    passwordInput.addEventListener("focus", () => {
        passwordInputTouch = true
    })
}
if (repasswordInput !==null) {
    repasswordInput.addEventListener("focus", () => {
        repasswordInputTouch = true
    }) 
}





let nameInputTouch = false;
let emailInputTouch = false;
let phoneInputTouch = false;
let ageInputTouch= false;
let passwordInputTouch = false;
let repasswordInputTouch = false;


function Validation() {
    if (nameInputTouch) {
        if (nameregex()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouch) {

        if (emailregex()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouch) {
        if (phoneregex()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouch) {
        if (ageregex()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouch) {
        if (passwordegex()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouch) {
        if (repasswordregex()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameregex() &&
        emailregex() &&
        phoneregex() &&
        ageValidation() &&
        passwordegex() &&
        repasswordregex()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}
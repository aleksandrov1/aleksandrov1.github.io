const mealsEl = document.getElementById('meals');
const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('searchBtn');
const popup = document.getElementById('meal-popup');
const popupBtn = document.getElementById('closepopup');
const mealInfo = document.getElementById('meal-info');


getRandomMeal();

async function getRandomMeal() {
    const result = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const reslutData = await result.json();
    const randomMeal = reslutData.meals[0];

    addMeal(randomMeal, true);
}

async function searchForMeal(term) {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
    );

    const respData = await resp.json();
    const meals = respData.meals;

    return meals;
}

function showInfo(mealData) {
    const mealEl = document.createElement('div');

    mealEl.innerHTML = `
    <h1>${mealData.strMeal}</h1>
    <img src="${mealData.strMealThumb}" alt="">
</div>
<div>
    <p>${mealData.strInstructions}</p>
    `

    mealInfo.appendChild(mealEl);
    popup.classList.remove('hidden');
}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
        <div class="meal-header">
        ${random ? `
        <span class="random"> Random Recipe </span>` : ''}
        <img class="thumbnail"
           src="${mealData.strMealThumb}"
           alt="${mealData.strMeal}"
        />
        </div>
        <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        </div>
    `;

    meals.appendChild(meal);
    meal.addEventListener("click", () => {
        showInfo(mealData);
    });

}

searchBtn.addEventListener('click', async() => {
    //clear the HTML
    mealsEl.innerHTML = '';
    const text = searchTerm.value;
    const meals = await searchForMeal(text);

    if (meals) {
        meals.forEach(meal => {
            addMeal(meal);
        });
    }
});
popupBtn.addEventListener('click', () => {
    mealInfo.innerHTML = '';
    popup.classList.add('hidden');
})


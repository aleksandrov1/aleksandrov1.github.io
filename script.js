const meals = document.getElementById('meals');

getRandomMeal();

async function getRandomMeal() {
    const result = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const reslutData = await result.json();
    const randomMeal = reslutData.meals[0];

    addMeal(randomMeal);
    console.log(randomMeal);
}

function addMeal(mealData) {
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
        <div class="meal-header">
        <span class="random"> Random Recipe </span>
        <img
           src="${mealData.strMealThumb}"
           alt="${mealData.strMeal}"
        />
        </div>
        <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <p>${mealData.strInstructions}</p>
        </div>
    `;

    meals.appendChild(meal);

}
const submit=document.getElementById('submit');
const search =document.getElementById('search');
const generate=document.getElementById('generate');
const meals =document.getElementById('meals');
const selectedmeal=document.getElementById('selected-meal');
const resultheading=document.getElementById('result-heading');

function searchmeal(e) 
{
    e.preventDefault();

    const searchtext=search.value;
    console.log(searchtext);
    if(searchtext.trim())
    {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchtext}`)
        .then(res=>res.json())
        .then(data=> {
            console.log(data);
            resultheading.innerHTML=`<h2>search results for ${searchtext}</h2>`
            if(data.meals===null)
            {
                resultheading.innerHTML=`<h2>No results for ${searchtext}</h2>`
            }
            else{
                meals.innerHTML=data.meals.map(meal => `
                <div class="meal">
                <img src="${meal.strMealThumb}"  alt="${meal.strMeal}"/>
                <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
                </div>
                </div>
                `)
                .join('')
            }
        })
        search.value='';
    } else{
        alert('please enter some meal to search')
    }

};

function getmeal(mealID)
{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res=> res.json())
    .then(data => {
        console.log(data);
        const meal=data.meals[0];
        displaymealdetails(meal);
    })
};
function displaymealdetails(meal){
    meals.innerHTML = '';
    resultheading.innerHTML = '';
    const ingredients=[];
    for(let i=1; i<=20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]}:${meal[`strMeasure${i}`]}`);
        }
        else{
            break;
        }
    }
    selectedmeal.innerHTML=`
    <div class="selected-meal-detail">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class="selected-meal-info">
    ${meal.strCategory ? `<p>Meal category : ${meal.strCategory}</p>`:''}
    ${meal.strArea ? `<p> Meal Area : ${meal.strArea}</p>`:''}
    </div>
    <div class="selected-meal-instruction">
    <p>${meal.strInstructions}</p>
    <h3>Ingredients</h3>
    <ul>
    ${ingredients.map( ingredient=> `<li>${ingredient}</li>` ).join('')}
    </ul>
    </div>
    </div>
    `;
};

submit.addEventListener('submit', searchmeal);

meals.addEventListener('click', e => {

    const mealinfo=e.path.find(item=>{
        
        if(item.classList)
        {
            return item.classList.contains('meal-info')
        }

        else{
            return false;
        }
    })
   console.log(mealinfo);
   if(mealinfo)
   {
       const mealID= mealinfo.getAttribute('data-mealid')
       console.log(mealID);

        // fetch details of meals
  getmeal(mealID);
   }
 
} );
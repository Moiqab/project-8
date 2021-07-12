const submit=document.getElementById('submit');
const search =document.getElementById('search');
const generate=document.getElementById('generate');
const meal =document.getElementById('meal');
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
                meal.innerHTML=data.meals.map(meal => `
                <div class="meal">
                <img src="${meal.strMealThumb}"  alt="${meal.strMeal}"/>
                <div class="meal-info" data-mealid="${meal.idMeal}">
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

submit.addEventListener('submit', searchmeal);

meal.addEventListener('click', e => {
   const mealinfo = e.path.find(item => {
      if (item.classlist){
          return item.classlist.contains('meal-info');
      }
      else{
          return false;
      }
   });
   console.log(mealinfo);
  
} );
$(document).ready(function() {

$('.toast').toast('hide');
$('.cardFooter').hide();
// fetch testing with opendata
const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  closeModal = document.querySelector(".closeBtn"),
  mediaDiv = document.getElementById("media"),
  nutrition = document.getElementById("nutrition"),
  modalTitle = document.getElementById('modal-title');
  function clearDiv(){
    mediaDiv.innerHTML = " ";
  }
clearDiv();


function searchData(e) {

  e.preventDefault();
  // get search term
const term = search.value;
  console.log(term);
  modalTitle.innerHTML = `Beer info on ${term}`;

  //   if statement
  // check for empty input with an if statement
  if (term.trim()) {
    searchBeerInfo()
    fetch(
      `https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q=${term}&facet=style_name&facet=cat_name&facet=name_breweries&facet=country`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // result_heading.innerHTML = `<h3>Searched for '${term}' </h3>`;
        // console.log(records.fields.abv)
        if (data.records.length === 0) {
          console.log("Nothing found here!!!!!!!!");
          mediaDiv.innerHTML = `<h3> Nothing found for "${term}"`;
}
        // if(data.records.fields === null){
        //   console.log('no description')

        // }



        else {


          mediaDiv.innerHTML = data.records
            .map(
              record =>


                ` <div class='record card card-cascade mt-2 mb-3'>

                        <div class="card record-info view view-cascade gradient-card-header blue-gradient" data-recordID ="${
                          record.fields.id
                        }">

                        <h5 class="card-header-title mb-3 mt-2 text-center text-white"><strong>${record.fields.name}</strong></h5>
                        <span class="card-header-subtitle text-center text-white">
                            <small><strong>Brewer: </strong>${record.fields.name_breweries}</small>
                        </span>

                      </div>


                    <div class="card-body card-body-cascade text-center">
                        <h5 class="text-center"><strong>ABV: </strong>${record.fields.abv.toFixed(
                          1)}%</h5>


                        <h6 class="text-center"><strong>Style:</strong> ${
                          record.fields.cat_name
                        }</h6>
                        <p class="card-text"><strong>Description:</strong> ${record.fields.descript}</p>
                        <p class="card-text"><small>${record.fields.address1} ${record.fields.city}, ${record.fields.state}</small></p>

                    </div>


                      <div class="card-footer text-center">
                      <a href="${record.fields.website}" target="_blank" class="px-2 fa-lg code-ic"><i class="fas fa-file-code fa-1x"> </i></a>

                        </div>

                        </div>`

            )
            .join("");
        }
      });
    // clear search input

    search.value = "";

  }
  else {
    mediaDiv.innerHTML = `<h3 class="text-center"> Search input empty!`;
    modalTitle.innerHTML = ``;
  }


  //   end
}




// get nutrition from beers

// function getNutrition(){
//   const term = search.value;
//   fetch(`https://nutritionix-api.p.mashape.com/v1_1/search/'${term}'?fields=item_name%2Citem_id%2Cbrand_name%2Citem_type%2Cnf_serving_weight_grams%2Cnf_calories_from_fat%2Cnf_calories%2Cnf_total_fat%2Cnf_saturated_fat%2Cnf_monounsaturated_fat%2Cnf_polyunsaturated_fat%2Cnf_cholesterol%2Cnf_sodium%2Cnf_total_carbohydrate%2Cnf_dietary_fiber%2Cnf_sugars%2Cnf_potassium%2Cnf_protein%2Cupdated_at%2Cnf_ingredient_statement%2Cnf_vitamin_a_dv%2Cnf_vitamin_c_dv%2Cnf_calcium_mg%2Cnf_calcium_dv%2Cnf_iron_dv%2C`)
//   .then(res => res.json())
//       .then(data => {
//         console.log(data);

//       });
// };

// test for nutrition /////////////////// works here
function searchBeerInfo(){
   const term = search.value;
console.log('my beer calorie term: ' + term)
  var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://nutritionix-api.p.rapidapi.com/v1_1/search/" + term + "?fields=item_name%2Cbrand_name%2Citem_type%252Citem_id%252Cbrand_name%252Cnf_calories%2Cnf_serving_weight_grams%2Cnf_calories_from_fat%2Cnf_calories%2Cnf_total_fat%2Cnf_saturated_fat%2Cnf_monounsaturated_fat%2Cnf_polyunsaturated_fat%252Cnf_total_fat%2Cnf_total_carbohydrate%2Cnf_sugars%2Cnf_cholesterol%2Cnf_sodium%2Cnf_potassium%2Cnf_protein%2Cupdated_at%2Cnf_ingredient_statement%2Cnf_alcohol_content",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "nutritionix-api.p.rapidapi.com",
		"x-rapidapi-key": "gJfdnuyLaYmsh4HKda6ncwbjveEbp1ugScbjsnUcMbKRgrUK44"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
	const cals = response.hits[0].fields.nf_calories;

	const calories = document.getElementById('calories');
	const beerTitle = document.getElementById('beer-title');
	const itemName = document.getElementById('item-name')
	const carbs = document.getElementById('item-carbs')
	const sugar = document.getElementById('item-sugar')
	const sodium = document.getElementById('item-sodium')
	beerTitle.innerHTML = `${term}`;
	calories.innerHTML = `Calories: ${cals.toFixed(0)}`;
	itemName.innerHTML = `${response.hits[0].fields.item_name}`;
	carbs.innerHTML = `Carbohydrate: ${response.hits[0].fields.nf_total_carbohydrate}`;
	sugar.innerHTML = `Sugars: ${response.hits[0].fields.nf_sugars}`;
	sodium.innerHTML = `Sodium ${response.hits[0].fields.nf_sodium}`;

$('.cardFooter').show();



});

}


//////////////////////
nutrition.addEventListener("click", () => {
  $('.toast').toast('show');
})
    submit.addEventListener("submit", searchData, searchBeerInfo);


closeModal.addEventListener("click", () => {
  mediaDiv.innerHTML = " ";
  modalTitle.innerHTML = " ";
});


});

// for nutrition    url: 'https://nutritionix-api.p.mashape.com/v1_1/search/' + phrase + '?fields=item_name%2Citem_id%2Cbrand_name%2Citem_type%2Cnf_serving_weight_grams%2Cnf_calories_from_fat%2Cnf_calories%2Cnf_total_fat%2Cnf_saturated_fat%2Cnf_monounsaturated_fat%2Cnf_polyunsaturated_fat%2Cnf_cholesterol%2Cnf_sodium%2Cnf_total_carbohydrate%2Cnf_dietary_fiber%2Cnf_sugars%2Cnf_potassium%2Cnf_protein%2Cupdated_at%2Cnf_ingredient_statement%2Cnf_vitamin_a_dv%2Cnf_vitamin_c_dv%2Cnf_calcium_mg%2Cnf_calcium_dv%2Cnf_iron_dv%2C' + phrase, // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile

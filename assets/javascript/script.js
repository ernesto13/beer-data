$(document).ready(function() {




// fetch testing with opendata
const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  mediaDiv = document.getElementById("media"),
  result_heading = document.getElementById("result_heading");


function searchData(e) {
  e.preventDefault();
  // get search term
  const term = search.value;
  console.log(term);

  //   if statement
  // check for empty input with an if statement
  if (term.trim()) {
    fetch(
      `https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q=${term}&facet=style_name&facet=cat_name&facet=name_breweries&facet=country`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // result_heading.innerHTML = `<h3>Searched for '${term}' </h3>`;

        if (data.records === null || data.records.length === 0) {
          console.log("Nothing found here!!!!!!!!");
          result_heading.innerHTML = `<h3> nothing found! for '${term}'`;
        } else {
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
                          1
                        )}</h5>
                        <h6 class="text-center"><strong>Style:</strong> ${
                          record.fields.cat_name
                        }</h6>
                        <p class="card-text"><strong>Description:</strong> ${record.fields.descript}</p>
                    </div>
                      <div class="card-footer text-center">
                      <a href="${record.fields.website}" target="_blank" class="px-2 fa-lg code-ic"><i class="fas fa-file-code fa-2x"> </i></a>

                        </div>

                        </div>`
            )
            .join("");
        }
      });
    // clear search input

    search.value = "";
  } else {
    alert("Search Input needed!");
  }

  //   end
}

submit.addEventListener("submit", searchData);

});

// for nutrition    url: 'https://nutritionix-api.p.mashape.com/v1_1/search/' + phrase + '?fields=item_name%2Citem_id%2Cbrand_name%2Citem_type%2Cnf_serving_weight_grams%2Cnf_calories_from_fat%2Cnf_calories%2Cnf_total_fat%2Cnf_saturated_fat%2Cnf_monounsaturated_fat%2Cnf_polyunsaturated_fat%2Cnf_cholesterol%2Cnf_sodium%2Cnf_total_carbohydrate%2Cnf_dietary_fiber%2Cnf_sugars%2Cnf_potassium%2Cnf_protein%2Cupdated_at%2Cnf_ingredient_statement%2Cnf_vitamin_a_dv%2Cnf_vitamin_c_dv%2Cnf_calcium_mg%2Cnf_calcium_dv%2Cnf_iron_dv%2C' + phrase, // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile

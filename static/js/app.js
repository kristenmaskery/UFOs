// from data.js
const tableData = data

// get table references
var tbody = d3.select('tbody')

function buildTable(data) {
  // First, clear out any existing data
  tbody.html('')

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach(dataRow => {
    // Append a row to the table body
    let row = tbody.append('tr')

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach(val => {
      let cell = row.append('td')
      cell.text(val)
    })
  })
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {}

// 3. Use this function to update the filters.
function updateFilters() {
  // 4a. Save the element that was changed as a variable.
  let elementChanged = d3.select(this)
    let datetimeElement = d3.select("#datetime");
    let citynameElement = d3.select("#cityname");
    let statenameElement = d3.select("#statename");
    let countrynameElement = d3.select("#countryname");
    let shapenameElement = d3.select("#shapename");
  // 4b. Save the value that was changed as a variable.
  var elementValue = elementChanged.property('value')
    var datetimeValue = datetimeElement.property("value");
    var citynameValue = citynameElement.property("value");
    var statenameValue = statenameElement.property("value");
    var countrynameValue = countrynameElement.property("value");    
    var shapenameValue = shapenameElement.property("value");
 
  // 4c. Save the id of the filter that was changed as a variable.
  let filterId = elementChanged.attr('id')
    let filterdateTime = datetimeElement.attr('datetime');
    let filteredCity = citynameElement.attr('cityname');
    let filteredState = statenameElement.attr('statename');
    let filteredCountry = countrynameElement.attr('countryname');
    let filteredShape = shapenameElement.attr('shapename');
  
  // 5. If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object.
  if (elementValue) {
    filters[filterId] = elementValue
  } 
  else {
    delete filters[filterId]
  }

  // 6. Call function to apply all filters and rebuild the table
  filterTable()
}

// 7. Use this function to filter the table when data is entered.
function filterTable() {
  var date = d3.select('#datetime').property('value')
  var city = d3.select('#cityname').property('value')
  var state = d3.select('#statename').property('value')
  var country = d3.select('#countryname').property('value')
  var shape = d3.select('#shapename').property('value')

  // 8. Set the filtered data to the tableData.
  let filteredData = tableData

  // 9. Loop through all of the filters and keep any data that
  // matches the filter values
  if (date != '') {
    filteredData = filteredData.filter(row => row.datetime === date)
  }
  if (city != '') {
    filteredData = filteredData.filter(row => row.cityname === city)
  }
  if (state != '') {
    filteredData = filteredData.filter(row => row.statename === state)
  }
  if (country != '') {
    filteredData = filteredData.filter(row => row.countryname === country)
  }
  if (shape != '') {
    filteredData = filteredData.filter(row => row.shapename === shape)
  }
  buildTable(filteredData);

  // 10. Finally, rebuild the table using the filtered data
  function buildTable(filteredData) {
    tbody.html('')
    filteredData.forEach(dataRow => {
      let row = tbody.append('tr')
      Object.values(dataRow).forEach(val => {
        let cell = row.append('td')
        cell.text(val)
      })
    })
  }
}
// 2. Attach an event to listen for changes to each filter
d3.selectAll("input").on("change", updateFilters)

// Build the table when the page loads
buildTable(tableData)
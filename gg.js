var margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#chartContainer")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//document.getElementById("demo").addEventListener("click", myFunction);
//
//function myFunction() {
//  document.getElementById("demo").innerHTML = "YOU CLICKED ME!";
//}
//var image_x = document.getElementById('image_X');
//image_x.addEventListener("click", myFunction);
//function myFunction() {
//  image_x.remove();
//}
//var colors = ['#ffffcc','#c2e699','#78c679','#31a354','#006837'];

// Parse the Data
d3.csv("data.csv", function(data) {
    console.log
    (data);

  // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(1)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3.map(data, function(d){return(d.station)}).keys();
  console.log(subgroups)
  console.log(groups);

  for(let i = 0; i < data.length; i++) {
//        data[subgroups[i]] = parseInt(data[subgroups[i]]);
        for(let j = 1; j < data.columns.length; j++){
            data[i][data.columns[j]] = parseInt(data[i][data.columns[j]])
        }
  }
  console.log(data);

  // Add X axis
  var x = d3.scaleBand()

    .domain(groups)
    .range([0, width])
    .padding([0.5])
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 1000])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  //stack the data? --> stack per subgroup
  var stackedData = d3.stack()
    .keys(subgroups)
    (data)

  console.log(stackedData)

  // Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .enter().append("g")
      .attr("class", function(d) {return d.key})
//      .attr("fill", function(d) { return color(d.key);
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.data.station); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width",x.bandwidth());
})
//var redcode()
//    if d.data.station>50:
//        fill: red;
//  function draw(words) {
//    d3.select("body").append("svg")
//        .attr("width", 300)
//        .attr("height", 300)
//      .append("g")
//        .attr("transform", "translate(150,150)")
//      .selectAll("text")
//        .data(words)
//      .enter().append("text")
//        .style("font-size", function(d) { return d.size + "px"; })
//        .style("font-family", "Impact")
//        .style("fill", function(d, i) { return fill(i); })
//        .attr("text-anchor", "middle")
//        .attr("transform", function(d) {
//          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
//        })
//        .text(function(d) { reyturn d.text; })
//        .on("click", function(d) {
//        alert(d.text);
//        });
//  function clicked(event, d) {
//    if (event.defaultPrevented) return; // dragged
//
//    d3.select(this).transition()
//        .attr("fill", "black")
//        .attr("r", radius * 2)
//      .transition()
//        .attr("r", radius)
//        .attr("fill", d3.schemeCategory10[d.index % 10]);
//  }
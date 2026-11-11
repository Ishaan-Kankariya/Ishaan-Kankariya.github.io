// Barcelona La Liga points by season
const data = [
    { season: "2018-19", points: 87, champion: true },
    { season: "2019-20", points: 82, champion: false },
    { season: "2020-21", points: 79, champion: false },
    { season: "2021-22", points: 73, champion: false },
    { season: "2022-23", points: 88, champion: true },
    { season: "2023-24", points: 85, champion: false },
    { season: "2024-25", points: 88, champion: true }
];

// SVG size and margins
const width = 760;
const height = 400;
const margin = { top: 30, right: 20, bottom: 60, left: 60 };

// Create the SVG inside #chart (viewBox lets it shrink on small screens)
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("width", "100%");

// Scales
const x = d3.scaleBand()
    .domain(data.map(d => d.season))
    .range([margin.left, width - margin.right])
    .padding(0.2);

const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top]);

// Bars (gold = league champions, green = not)
svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(d.season))
    .attr("y", d => y(d.points))
    .attr("width", x.bandwidth())
    .attr("height", d => y(0) - y(d.points))
    .attr("fill", d => d.champion ? "#e9a23b" : "#2d6a4f");

// Point labels on top of each bar
svg.selectAll(".label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", d => x(d.season) + x.bandwidth() / 2)
    .attr("y", d => y(d.points) - 6)
    .attr("text-anchor", "middle")
    .attr("font-size", "13px")
    .text(d => d.points);

// X axis
svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x));

// Y axis
svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y));

// Axis titles
svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 15)
    .attr("text-anchor", "middle")
    .text("Season");

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 18)
    .attr("text-anchor", "middle")
    .text("La Liga Points");
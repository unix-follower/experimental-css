import * as d3 from "d3"

function processContainer1() {
  const divElement = document.querySelector(".container1")!
  const selection = d3.select(divElement)
  console.info(selection)

  const svgSelection = selection
    .append("svg")
    .attr("width", 500)
    .attr("height", 350)
    .style("border", "1px solid black")

  const groupSelection = svgSelection.append("g").attr("transform", "translate(0, 100)")

  groupSelection
    .append("rect")
    .attr("x", 20)
    .attr("y", 20)
    .attr("width", 200)
    .attr("height", 100)
    .attr("fill", "blue")

  groupSelection.append("circle").attr("cx", 300).attr("cy", 70).attr("r", 50).attr("fill", "green")

  groupSelection
    .append("line")
    .attr("x1", 370)
    .attr("y1", 20)
    .attr("x2", 400)
    .attr("y2", 120)
    .attr("stroke", "red")
    .attr("stroke-width", 2)

  groupSelection
    .append("text")
    .attr("x", 20)
    .attr("y", 200)
    .text("Hello, D3!")
    .attr("fill", "gray")
    .style("font-family", "Arial, sans-serif")
  console.info(groupSelection)
  console.info(svgSelection)
}

function processContainer2() {
  const data = [
    { width: 200, height: 100, color: "red" },
    { width: 100, height: 60, color: "green" },
    { width: 50, height: 30, color: "blue" },
  ]

  const svgSelection = d3.select(".container2 svg")
  console.info(svgSelection)

  const rectSelection = svgSelection
    .selectAll("rect")
    .data(data)
    .attr("width", (item) => item.width)
    .attr("height", (item) => item.height)
    .attr("fill", (item) => item.color)
  console.info(rectSelection)
}

interface CircleData {
  distance: number
  radius: number
  fill: string
}

function processContainer3() {
  const svgSelection = d3.select(".container3 svg")
  console.info(svgSelection)
  d3.json("./circles.json").then((data) => {
    const circleData = data as CircleData[]
    const circleSelection = svgSelection.selectAll("circle").data(circleData)

    circleSelection
      .enter()
      .append("circle")
      .attr("cx", (d) => d.distance)
      .attr("cy", 200)
      .attr("r", (d) => d.radius)
      .attr("fill", (d) => d.fill)
  })
}

function main() {
  processContainer1()
  processContainer2()
  processContainer3()
}

main()

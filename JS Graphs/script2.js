const data = [
    { id: 'chart1', percentage: 78 },
    { id: 'chart2', percentage: 95 },
    { id: 'chart3', percentage: 59 }
];

data.forEach(circle => {
    const svg = d3.select(`#${circle.id}`)
        .append("svg")
        .attr("width", 100)
        .attr("height", 100)
        .append("g")
        .attr("transform", "translate(50, 50)");

    const arc = d3.arc()
        .innerRadius(35)
        .outerRadius(45)
        .startAngle(0)
        .cornerRadius(0);

    const backgroundArc = d3.arc()
        .innerRadius(35)
        .outerRadius(45)
        .startAngle(0)
        .endAngle(2 * Math.PI)
        .cornerRadius(0);

    svg.append("path")
        .datum({ endAngle: 2 * Math.PI })
        .attr("class", "background-arc")
        .attr("fill", "#d3f7ee") 
        .attr("d", backgroundArc);

    svg.append("path")
        .datum({ endAngle: 0 })
        .attr("class", "arc")
        .attr("fill", "#1bd0a3") 
        .attr("d", arc);

    svg.append("text")
        .attr("class", "percentage")
        .attr("text-anchor", "middle")
        .attr("dy", "0.3em") 
        .text(`${circle.percentage}%`)
        .attr("fill", "black")
        .attr("pointer-events", "none");
});

function updateChart(id, percentage) {
    const svg = d3.select(`#${id} svg`);
    const circle = svg.select(".arc");
    const text = svg.select(".percentage");

    const endAngle = (percentage / 100) * (2 * Math.PI);

    circle.datum({ endAngle })
        .attr("d", d3.arc()
            .innerRadius(35)
            .outerRadius(45)
            .startAngle(0)
            .endAngle(endAngle)
            .cornerRadius(0)
        );

    text.text(`${percentage}%`);
}

data.forEach(circle => {
    updateChart(circle.id, circle.percentage);
});

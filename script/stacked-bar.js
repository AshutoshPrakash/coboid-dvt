$(document).ready(function(){

    $.get("http://localhost:9090/city", function( data ) {

        data.forEach(function(d){
            d.Population = +d.Population; // coerce to numbe
        });

        var maxVal = d3.max(data, function(d){
            return d.Population;
        });

        var margin = {
            top : 30,
            right : 30,
            bottom : 40,
            left : 80
        }

        var gap = 1;
        var height = 300 - margin.top - margin.bottom;
        var width = 1000 - margin.left - margin.right;
        var animateDuration = 500;
        var animateDelay = 20;

        var tooltip = d3.select('body').append('div')
            .style('position','absolute')
            .style('background','#f4f4f4')
            .style('padding','5 15px')
            .style('border','1px #333 solid')
            .style('border-radius','5px')
            .style('opacity','0')
        
        var yScale = d3.scale.linear()
            .domain([0, maxVal])
            .range([0, height]);

        var xScale = d3.scale.ordinal()
            .domain(d3.range(0, data.length))
            .rangeBands([0, width]);

        var colors = d3.scale.linear()
            .domain([0, data.length])
            .range(["#C0C0C0","#000000"]);

        var chart = d3.select("#chart").append('svg')
            .attr('width',width + margin.right + margin.left)
            .attr('height',height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate('+margin.left+','+margin.top+')')
            .selectAll('rect')
            .data(data)
            .enter().append('rect')
            .style('fill',function(d,i){
                return colors(i);
            })
            .attr('width',xScale.rangeBand())
            .attr('height',0)
            .attr('x',function(d,i){
                return xScale(i) + i*gap;
            })
            .attr('y',height)
            .on('mouseover', function(d){
                tooltip.transition()
                    .style('opacity',1);
                tooltip.html("<strong>ID:</strong> <span style='color:red'>" + d.ID + "</span><br>"+
                        "<strong>Name:</strong> <span style='color:red'>" + d.Name + "</span><br>"+
                        "<strong>CountryCode:</strong> <span style='color:red'>" + d.CountryCode + "</span><br>"+
                        "<strong>District:</strong> <span style='color:red'>" + d.District + "</span><br>"+
                        "<strong>Population:</strong> <span style='color:red'>" + d.Population+ "</span>"
                    )
                    .style('left',(d3.event.pageX)+'px')
                    .style('top',(d3.event.pageY)+'px');
                d3.select(this).style('opacity',0.5);
            })
            .on('mouseout',function(d){
                tooltip.transition()
                    .style('opacity',0);
                d3.select(this).style('opacity',1);
            })

        chart.transition()
            .attr('height',function(d){
                return yScale(d.Population);
            })
            .attr('y',function(d){
                return height - yScale(d.Population);
            })
            .duration(animateDuration)
            .delay(function(d,i){
                return i*animateDelay;
            })
            .ease('elastic');

        var vScale = d3.scale.linear()
            .domain([0, maxVal])
            .range([height, 0]);

        var hScale = d3.scale.ordinal()
            .domain(d3.range(0, data.length))
            .rangeBands([0, width]);

        //V Axis
        var vAxis = d3.svg.axis()
            .scale(vScale)
            .orient('left')
            .ticks(5)
            .tickPadding(5)

        //V Guide
        var vGuide = d3.select('svg')
            .append('g')
            vAxis(vGuide)
            vGuide.attr('transform','translate('+margin.left+','+margin.top+')')
            vGuide.selectAll('path')
                .style('fill', 'none')
                .style('stroke', '#000')
            vGuide.selectAll('line')
                .style('stroke', '#000')

        //H Axis
        var hAxis = d3.svg.axis()
            .scale(hScale)
            .orient('bottom')
            .tickValues(hScale.domain().filter(function(d,i){
                return !(i % (data.length/5));
            }))

        //H Guide
        var hGuide = d3.select('svg')
            .append('g')
            hAxis(hGuide)
            hGuide.attr('transform','translate('+margin.left+','+(height+margin.top)+')')
            hGuide.selectAll('path')
                .style('fill', 'none')
                .style('stroke', '#000')
            hGuide.selectAll('line')
                .style('stroke', '#000')
    });
})
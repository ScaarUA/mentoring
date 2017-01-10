import $ from 'jquery';
import * as d3 from 'd3';
import './index.scss';

window.forecast = (function () {
    let city = '';

    $('.forecast__city-input').on('change', e => {
        changeCity(e.target.value);
    });

    $('.forecast__button').on('click', () => {
        getForecast(city);
    });

    function changeCity(value) {
        city = value;
    }

    function updateError(err) {
        let errorField = $('.forecast-error');

        if (err) {
            errorField.text(err.message);
        } else {
            errorField.empty();
        }
    }
    
    function setLocation(country, city) {
        $('.chosen-city').text(`${country}, ${city}`);
    }

    function getForecast(city) {
        $.ajax(`http://api.apixu.com/v1/forecast.json?key=521dbdc42a124e37b72112744170901&q=${city}`)
            .then(res => {
                if (res.error) {
                    return Promise.reject(res.error);
                }
                updateError('');
                setLocation(res.location.country, res.location.name);
                return res.forecast.forecastday[0].hour;
            })
            .then(drawChart)
            .then(drawPie)
            .catch(updateError);
    }

    function drawChart(weather) {
        let data = weather.map(val => {
            return val.temp_c;
        });

        d3.select('.bar-chart-legend')
            .selectAll('.bar-chart-legend__time')
            .data(data)
            .enter()
            .append('div')
            .attr('class', 'bar-chart-legend__time')
            .html((d, i) => {
                let zero = i < 10 ? '0' : '';

                return zero + i + ':00';
            });

        let chart = d3.select('.bar-chart');

        chart.selectAll('.bar-chart__bars')
            .data(data)
            .enter()
            .append('div')
            .attr('class', 'bar-chart__bars');

        chart.selectAll('.bar-chart__bars')
            .data(data)
            .html(d => {
                return d;
            })
            .on('click', (d, i, el) => {
                d3.selectAll('.bar-chart__bars-info')
                    .remove();

                d3.select(el[i])
                    .append('div')
                    .attr('class', 'bar-chart__bars-info')
                    .style('left', () => {
                        if (i > 19) {
                            return '-180px';
                        }
                    })
                    .html(`<p>Feels like: <var>${weather[i].feelslike_c}</var></p>
                        <p>Humidity: <var>${weather[i].humidity}</var></p>
                        <p>Wind: <var>${weather[i].wind_kph} kph.</var></p>
                        ${weather[i].will_it_rain === 1 ? '<p><var>Rainy</var></p>' : ''}
                        ${weather[i].will_it_snow === 1 ? '<p><var>Snowy</var></p>' : ''}`)
                    .transition()
                    .style('opacity', '1');
            })
            .transition()
            .style('height', d => {
                return Math.abs(scaleToFit(d, 250)) + 'px';
            })
            .style('line-height', d => {
                return Math.abs(scaleToFit(d, 250)) + 'px';
            })
            .style('top', d => {
                if (d >= 0) {
                    return -scaleToFit(d, 250) + 'px';
                }
            });

        return Promise.resolve(data);

        function scaleToFit(value, dimension) {
            let max = data.reduce((prev, cur) => {
                return Math.max(Math.abs(prev), Math.abs(cur));
            });

            return value * dimension / max;
        }
    }

    function drawPie(data) {
        let pieLayout = d3.pie()
            .value(d => {
                return d.frequency;
            });

        let arcGenerator = d3.arc()
            .innerRadius(100)
            .outerRadius(200);

        let colors = d3.scaleOrdinal(d3.schemeCategory10);

        let pie = d3.select('.pie');


        pie.attr('width', 400)
            .attr('height', 400);

        pie.select('g')
            .selectAll('path')
            .remove();

        pie.select('g')
            .selectAll('path')
            .data(pieLayout(getPieData(data)))
            .enter()
            .append('path');

        pie.select('g')
            .selectAll('path')
            .transition()
            .attr('d', arcGenerator)
            .style('fill', (d, i) => colors(i));

        pie.select('g')
            .selectAll('text')
            .remove();

        pie.select('g')
            .selectAll('text')
            .data(pieLayout(getPieData(data)))
            .enter()
            .append('svg:text');

        pie.select('g')
            .selectAll('text')
            .attr('transform', d => {
                let point = (d.startAngle + d.endAngle) / 2 + Math.PI*3/2;

                let y =  150 * Math.sin(point),
                    x =  150 * Math.cos(point);

                return `translate(${x}, ${y})`;
            })
            .text(d => {
                return d.data.value;
            });
    }

    function getPieData(data) {
        let statData = [];

        let roundedData = data.map(value => {
            return Math.round(value);
        }).sort();

        let prev = null,
            lastIndex = -1;

        while (roundedData.length) {
            if (prev === roundedData[0]) {
                statData[lastIndex].frequency += 1;
            } else {
                lastIndex++;
                statData.push({
                    value: roundedData[0],
                    frequency: 1
                });
            }

            prev = roundedData.shift();
        }

        return statData;
    }

    getForecast('kiev');

})();
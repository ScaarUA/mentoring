function init(data) {
    const field = d3.select('body .graph');
    const margin = { top: 40, right: 20, bottom: 30, left: 40 };
    const width = 1000 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);


    const y = d3.scale.linear()
        .range([height, 0]);

    const xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    const yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    const tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(d => `<span style='color:red'>${d.value} </span> ${d.currency} <strong> per one US dollar</strong>`);

    field.select('svg').remove();

    const svg = field.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    svg.call(tip);

    x.domain(data.map(d => d.currency));
    y.domain([0, d3.max(data, d => d.value)]);

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Course');

    svg.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.currency))
        .attr('width', x.rangeBand())
        .attr('y', d => y(d.value))
        .attr('height', d => height - y(d.value))
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
}

function initSelect(currencies, selectedCurrency) {
    let data = currencies.map((item) => {
        return {
            id: item,
            text: item,
            selected: selectedCurrency.includes(item)
        }
    });

    const $select = $('.js-example-basic-multiple').select2({ data });
    $select.on('change', (e) => {
        const quotes = $(e.target).val();
        run(quotes);
    });

}

function prepareData(data) {
    const quotes = data.quotes;
    const result = [];
    for (var key in quotes) {
        if (quotes.hasOwnProperty(key)) {
            result.push({
                currency: key.slice(3),
                value: quotes[key]
            })
        }
    }
    return result;
}

function run(currencies) {
    const url = 'http://www.apilayer.net/api/live';
    const api = `${url}?access_key=e9568c555f60dc612e93214da97d35d8&format=1&currencies=${currencies}`;
    window.fetch(api)
        .then((response) => response.json())
        .then(prepareData)
        .then((data) => {
            init(data, currencies);
        });
}

const currencies = ['EUR', 'GBP', 'PLN', 'UAH', 'CAD', 'GBP', 'HKD', 'JPY', 'RUB'];
const selectedCurrencies = ['EUR', 'UAH', 'CAD', 'RUB'];
run(selectedCurrencies);

$(document).ready(() => {
    initSelect(currencies, selectedCurrencies);
});
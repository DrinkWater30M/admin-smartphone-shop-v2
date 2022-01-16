const canvas = document.getElementById('line-chart').getContext('2d');
const orderPrice = document.getElementsByName('order-price');
const orderNumber = document.getElementsByName('order-number');
const data = document.getElementsByName('order-time');
function parseDataToMonths() {

    let months = [];
    for (let i = 0; i < 12; i++)
    months[i] = 0;
    for (let i = 0; i < data.length; i++) {
        let time = data[i].defaultValue;
        time = time.slice(5, 7);
        months[parseInt(time, 10)-1] += orderPrice[i].defaultValue * orderNumber[i].defaultValue;
    }
    console.log(months);
    return months;
}
parseDataToMonths();
let chart = new Chart(canvas, {
    type: 'bar',
    data: {
        labels: ['1', '2', '3', '4', '5','6','7','8','9','10','11','12'],
        datasets: [{
            label: "vnđ",
            data: parseDataToMonths(),
            backgroundColor: [
                'blue'
            ]
        }],
    }
});
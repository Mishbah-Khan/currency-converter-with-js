let YOUR_API_KEY = '37843c983ecc1d5a2a9ee568';
let BASE_URL = `https://v6.exchangerate-api.com/v6/${YOUR_API_KEY}/pair`;

let selects = document.querySelectorAll('.dropdown select');
let btn = document.querySelector('button');
let inputValue = document.querySelector('.amount input');
let fromCurrency = document.querySelector('.from select');
let toCurrency = document.querySelector('.to select');
let msg = document.querySelector('.msg');


for (const select of selects) {
    for (code in countryList) {
        let option = document.createElement('option');
        option.innerText = code;
        option.value = code;
        
        if (select.name === "from" && code === "USD") {
            option.selected = "selected";
        } else if (select.name === "to" && code === "BDT") {
            option.selected = "selected";
        }
        select.append(option);
    }

    select.addEventListener('change', (e) => {
        flagUpdate(e.target);
    });

}

const flagUpdate = (req) => {
    let courrencyCode = req.value;
    let countryCode = countryList[courrencyCode];
    let imgLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let image = req.parentElement.querySelector('img');
    image.src = imgLink;
}

const currencyCalculation = async () => {
    let amount = inputValue.value;
    let fromCurr = fromCurrency.value;
    let toCurr = toCurrency.value;
    let URL = `${BASE_URL}/${fromCurr}/${toCurr}`;
    let response = await fetch(URL);
    let data = await response.json();
    let totalAmount = amount * data.conversion_rate;

    msg.innerText = `${amount} ${fromCurr} = ${totalAmount} ${toCurr}`;
}

btn.addEventListener('click', (e)=>{
    e.preventDefault();
    currencyCalculation();
});






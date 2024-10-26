const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const btn = document.querySelector("#convertButton");

const dropDown = document.querySelectorAll("#Converter select");
const fromCurr = document.querySelector("#from select");
const toCurr = document.querySelector("#to select");
const msg = document.querySelector("#msg");


for(let select of dropDown) {
    for(code in countryList){
        let options = document.createElement("option");
        options.value = code;
        options.innerText = code;
        if(select.name === "From" && code === "USD"){
            options.selected = "selected";
        } else if (select.name === "To" && code === "INR"){
            options.selected = "selected";
        }
        select.append(options);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let code = element.value;
    let countryCode = countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amt = document.querySelector("#amount input");
    let amtVal = amt.value;
    console.log(amtVal);
    if (amtVal === "0" || amtVal < 0){
        amtVal = 1;
        amt.value = "1";
    }

    const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finAmt = amtVal * rate;
    console.log(finAmt);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finAmt.toFixed(2)} ${toCurr.value}`;
    msg.style.color = "red";
});

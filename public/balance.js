

let exspensesUrl = "exspenses";
let incomesUrl = "incomes";
let sumExspenses = 0;
let sumIncome = 0;
let totalIncome = 0;
let getMonthsDate = new Date();
let monthsName = ["january", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementById("month").innerHTML = monthsName[getMonthsDate.getMonth()];
let getYearDate = new Date();
let yearName = document.getElementById("year").innerHTML = getYearDate.getFullYear();
let incomeHeadNumbers = document.getElementById("incomeHeadNumbers");
let expensesHeadNumbers = document.getElementById("expensesHeadNumbers");
let balance = document.getElementById("balance");
let percentageDom = document.getElementById("percentage");


function createIncomeOutcome() {

    let select = document.getElementById("select").value;
    let description = document.getElementById('idDescription').value;
    let amount = Number(document.getElementById('idValue').value);

    if (description != "" && !Number(description) && amount > 0) {

        axios.post(`/${select}`, {
            description: description,
            amount: amount
        })
            .then(function (response) {
                if (response.status == 201) {
                    showIncomesOutcome(select, response.data)
                    singlePreceng();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    } else {

        let erorr = document.getElementById("erorr");

        erorr.style.display = "block";
        erorr.innerText;
        let x = document.querySelector("#x");
        x.onclick = function () {
            erorr.style.display = "none";

        }


    }
}

//_________________________________________________________________________________________________________________________________________________________________________________________________________

function deleteIncomeOutcomeById(id, thisObject, url) {

    let amountSpan = thisObject.previousElementSibling.innerText;
    let amountSpanExpenses = Number(thisObject.previousElementSibling.previousElementSibling.innerText);
    amountSpan = amountSpan.split("%");
    amountSpan = Number(amountSpan[0]);


    axios.delete(`${url}/${id}`)
        .then(function (response) {
            if (response.status == 200) {
                if (url == incomesUrl) {
                    sumIncome -= Number(amountSpan);
                    incomeHeadNumbers.innerText = `${sumIncome}`;
                    updateBalance();
                } else {

                    sumExspenses -= Number(amountSpanExpenses);
                    expensesHeadNumbers.innerText = `${sumExspenses}`;
                    updateBalance();
                }

                singlePreceng();
                percentageDisply(sumExspenses, sumIncome)
                const parent = thisObject.parentElement;
                parent.remove();


            } else {
                console.log(`got erorr code from server: ${response.status}`);
            }
        })
        .catch(function (error) {
            console.log(error);
        });


}

//____________________________________________________________________________________________________________________________________________

let ButtomListExpensesHead = document.getElementById("ButtomListExpensesHead")
let ButtomListIncomHead = document.getElementById("ButtomListIncomHead")

function showIncomesOutcome(url, response ) {

    let amount = Number(document.getElementById('idValue').value);
    let div = document.createElement("div");


    if (url == incomesUrl) {
        ButtomListIncomHead.appendChild(div);
        let pIncome = document.createElement("p");
        pIncome.classList.add("listMaker");
        let span = document.createElement("span");
        span.classList.add("description_text");
        span.innerText = response.description;
        pIncome.appendChild(span);
        span = document.createElement("span");
        span.classList.add("amount");
        span.innerText = response.amount;
        pIncome.appendChild(span);
        let i = document.createElement("i");
        i.classList.add("x");
        i.classList.add("far");
        i.classList.add("fa-times-circle");
        pIncome.appendChild(i);
        div.appendChild(pIncome);

        sumIncome += response.amount;
        incomeHeadNumbers.innerText = `+${sumIncome}`;

        updateBalance();
        singlePreceng();
        percentageDisply(sumExspenses, sumIncome)
      
        
        

        i.onclick = function () {
            deleteIncomeOutcomeById(response.id, this, incomesUrl);
            
        }

    } else {
        ButtomListExpensesHead.appendChild(div);
        let pExpenses = document.createElement("p");
        pExpenses = document.createElement("p");
        pExpenses.classList.add("listMaker");
        span = document.createElement("span");
        span.classList.add("description_text");
        span.innerText = response.description;
        pExpenses.appendChild(span);
        span = document.createElement("span");
        span.classList.add("amount");
        span.classList.add("amount_expense");
        span.innerText = response.amount;
        pExpenses.appendChild(span);
        let spanPreceng = document.createElement("span");
        spanPreceng.classList.add("spanPreceng");
        pExpenses.appendChild(spanPreceng);


        i = document.createElement("i");
        i.classList.add("x");
        i.classList.add("far");
        i.classList.add("fa-times-circle");
        pExpenses.appendChild(i);
        div.appendChild(pExpenses);


        sumExspenses += response.amount;
        expensesHeadNumbers.innerText = `${sumExspenses}`;
        totalIncome -= amount;

        updateBalance();
        percentageDisply(sumExspenses, sumIncome)
        singlePreceng();
      

        i.onclick = function () {
            deleteIncomeOutcomeById(response.id, this, exspensesUrl);
          
        }
    }
}

//____________________________________________________________________________________________________________________________________________________
function getAll(url) {
    axios.get(`/${url}`)
        .then(function (response) {
            let arr = response.data;
            for (let i = 0; i < arr.length; i++) {
                showIncomesOutcome(url, arr[i]);
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}
getAll(exspensesUrl);
getAll(incomesUrl);


//_________________________________________________________________________________________________________________________________________

function percentageDisply(sumExspenses, sumIncome) {

    let precent = Math.floor((sumExspenses / sumIncome) * 100);
    if (precent == Infinity || isNaN(precent)) {
        precent = "0";
    } else {
        return percentageDom.innerText = `${precent}%`;
    }
}
//_____________________________________________________________________________________________________________________________________
function updateBalance() {
    if (totalIncome >= 0) {
        totalIncome = sumIncome - sumExspenses;
        balance.innerText = `${totalIncome}`;
    } else {
        totalIncome = sumIncome - sumExspenses;
        balance.innerText = totalIncome;
    }

}
//_____________________________________________________________________________________________________________________________________________
let spanPDisply;
function singlePreceng() {
    let expensesAmount = document.getElementsByClassName("amount_expense"),
        spanPDisply = document.getElementsByClassName('spanPreceng');
    //----------> run on array
    for (let i = 0; i < expensesAmount.length; i++) {
        //----------->for evrey index go to innerText and convert to a number &   calculat singlexpens / sumincomes * 100;
        let singleP = `${Math.round(Number(expensesAmount[i].innerText) / sumIncome * 100)}%`

        if (singleP == 'Infinity%') {

            singleP = 0;
        }
        //----------->display on browser;
        spanPDisply[i].innerText = singleP;
    }


}
//___________________________________________________________________________________________________________________

























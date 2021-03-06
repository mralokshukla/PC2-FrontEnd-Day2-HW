// (c) Anuflora Systems
// reading all data from html IDs, put in memory (not in var)
// getelementbyID will read from html
// since sccript is in body of html, below will run automatically

// Home Work - Alok Shukla (PC2 - 12)
// 1. Display balance amount instead of Deposit/Loan
// 2. Create bar chart

const balance = document.getElementById('balance');
const money_plus = document.getElementById('deposit');
const money_minus = document.getElementById('loan');
const list = document.getElementById('list');
const form = document.getElementById('form');
const custname = document.getElementById('custname');

const reco = document.getElementById('reco');
const b1 = document.getElementById('b1');
const b2 = document.getElementById('b2'); 

const bar_graph = document.querySelector('article');

// bank account data; this is NOT JSON object
const TransactionDataAll = [
   { id: 1, customername: 'Flora', bank: 'DBS', deposit: 3000, loan: 2000 },
   { id: 2, customername: 'Flora', bank: 'OCBC', deposit: 4000, loan: 2000 },
   { id: 3, customername: 'Mikhil', bank: 'DBS', deposit: 3000, loan: 2000 },
   { id: 4, customername: 'Sashil', bank: 'UOB', deposit: 6000, loan: 1000 },
   { id: 5, customername: 'Jack', bank: 'UOB', deposit: 6000, loan: 8000 },
   { id: 6, customername: 'Jill', bank: 'UOB', deposit: 7000, loan: 4000 },

  ];

console.log(TransactionDataAll);
 var TransactionData = null; //intermediate data to call the same data above



// Add transactions to DOM list
function addTransactionDOM(transaction) {

// Create li element; each row display the balance for each customer
  const balance_item = document.createElement('li');
  // check if balamce_item is + or -
  if (transaction.deposit > transaction.loan ) {
    balance_item.classList.add('plus')
  } else {
    balance_item.classList.add('minus') 
  } ;

  balance_item.innerHTML = `
  ${transaction.customername}-${transaction.bank} <span> $ ${Math.abs(
  transaction.deposit - transaction.loan  
  )}</span> 
  `;
  list.appendChild(balance_item);
}

// Update the balance, deposit and loan
function updateValues() {
  const deposits = TransactionData.map(transaction => transaction.deposit); //returns an array of the deposits
  const loans = TransactionData.map(transaction => transaction.loan); //returns an array of the loans
  const total_deposit = deposits.reduce((acc, item) => (acc += item), 0).toFixed(0);
  const total_loan = loans.reduce((acc, item) => (acc += item), 0).toFixed(0); //acc is accumulator; every time adds the item, initially zero as indicated in the 0 parameter above
  const bal = (total_deposit - total_loan);
  balance.innerText = `$${bal}`;
  // money_plus.innerText = `$${total_deposit}`;
  // money_minus.innerText = `$${total_loan}`;
  reco.innerText = (bal >= 0)? "You Have Sound Financial Health": "Your Financial Health is Weak";

// Bar Graph
  var graph_data = [total_deposit, total_loan];

  
// Append svg objece to the body
  var svg = d3.select("article").append('svg')
     .attr("width",500)
     .attr("height",50);
  

// Bars  
  svg.selectAll("rect")
    .data(graph_data)
    .enter().append("rect")
    .attr("transform",function(d, i) { return "translate(" + 65 + "," + i*25 + ")"  }) 
    .attr("fill",function(d, i) {if (i === 0) {return "green"} else {return "red"} }) //if function to change color
    .attr("height",20)
    .attr("width", function(d) { return d /100 + "px"; }); //"width", 40px, *10 just to make it big enough


//for values
  svg.selectAll("values")
    .data(graph_data)
    .enter().append("text")
    .attr("transform",function(d, i) { return "translate(70,"+Number(i*25+15)+")" })
    .attr("fill",'black')
    .text(function(d, i) { if (i ===0) {return "$ " + d} else {return "$ " + d}  });


   //for labels
   svg.selectAll("labels")
    .data(graph_data)
    .enter().append("text")
    .attr("transform",function(d, i) { return "translate(0,"+Number(i*25+15)+")" })
    .attr("fill",'black')
    .text(function(d, i) { if (i ===0) {return "Deposits"} else {return "Loans"}  });

  }


//initialization
function init() {
  
  list.innerHTML = '';
  reco.innerHTML = '';
  bar_graph.innerHTML = ''; //blank svg
  TransactionData = [...TransactionDataAll]; //copy one array into another array
  TransactionData.forEach(addTransactionDOM); //for each row of data, call this function
  updateValues();
}

//filter for a particular name
function filterTransaction(e) {
  e.preventDefault();  //to prevent form from submitting and refreshing the page or else will go back to original page
  list.innerHTML = '';
  reco.innerHTML = '';
  bar_graph.innerHTML = ''; //blank svg
  TransactionData = TransactionDataAll.filter(tran => tran.customername.toUpperCase() == custname.value.toUpperCase());  
  TransactionData.forEach(addTransactionDOM);
  updateValues(); 
}

init();
//form.addEventListener('submit', filterTransaction);
b1.addEventListener('click',filterTransaction);
b2.addEventListener('click',init);  //no need to call init when no event handler it will reload/referesh the page

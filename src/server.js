console.log("server is loading ...");
const express = require("express"),PORT = 8080;
const app = express();
app.use(express.json());
const path = require('path');
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

const routeHelper = require('./incomes_outcomes');


let incomes = [];
  
let exspenses = [];





app.delete("/incomes/:id",(req,res)=>{routeHelper.handleDeleteIncomeOutCome(req,res,incomes)})
app.post("/incomes", (req, res) => {routeHelper.handleCreateIncomeOutCome(req,res,incomes)});
app.get("/incomes", (req, res) => {res.send(incomes)});

//_________________________________________________________________________

app.delete("/exspenses/:id",(req,res)=>{routeHelper.handleDeleteIncomeOutCome(req,res, exspenses)})
app.post("/exspenses", (req, res) => {routeHelper.handleCreateIncomeOutCome(req,res, exspenses)});
app.get("/exspenses", (req, res) => {res.send(exspenses)});


app.get('*', function(req, res){ res.status(404).send('<h1 style="color: red;">erorr 404 </h1><h1 style="color: red";>page not found!!!</h1>')});

app.listen(PORT, () => {
  console.log(`server is listening on port : ${PORT}`);
});


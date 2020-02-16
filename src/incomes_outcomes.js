

let idCounter = 4;
function handleCreateIncomeOutCome(req, res, arr) {
  const newIncomeOutcome = req.body;

  newIncomeOutcome.id = idCounter;
  idCounter++;
  arr.push(newIncomeOutcome);

  res.status(201).send(newIncomeOutcome);

}

function handleDeleteIncomeOutCome(req, res, arr) {
  const id = req.params.id;
  const index = arr.findIndex(incomeOrOutcome => incomeOrOutcome.id == id);

  if (index == -1) {
    res.sendStatus(404);

  } else {
    arr.splice(index, 1);
    res.sendStatus(200);

  }
}





module.exports.handleDeleteIncomeOutCome = handleDeleteIncomeOutCome;
module.exports.handleCreateIncomeOutCome = handleCreateIncomeOutCome;









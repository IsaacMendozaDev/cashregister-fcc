const $cash = document.getElementById("cash");
const $calculateChangeInDrawForm = document.getElementById("calculate-form");

const $priceHTML = document.getElementById("price");
const $changeDueHTML = document.getElementById("change-due");
const $cashInDrawerHTML = document.getElementById("cid");

let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const displayUI = (msg, statusMsg) => {
  const message = statusMsg ? `Status: ${statusMsg}` : msg;

  $changeDueHTML.textContent = message;
};

const getCashInDrawerHTML = () => {
  let cashInDrawerHTML = "";

  cid.forEach((unitAndValue) => {
    const unit = unitAndValue[0];
    const value = unitAndValue[1];

    cashInDrawerHTML += `<p class="p label-drawer"><span class="drawer-unit" >${unit}: </span><span class="drawer-value">${value}</span></p>`;
  });

  return cashInDrawerHTML;
};

$cashInDrawerHTML.innerHTML = getCashInDrawerHTML();

const getStatusMessage = (changeDue, cashInDrawer, changeInDrawer) => {
  if (cashInDrawer < changeDue || changeInDrawer < changeDue)
    return "INSUFFICENT_FUNDS";

  if (cashInDrawer === changeDue) return "CLOSED";

  if (cashInDrawer > changeDue) return "OPEN";
};

const getChangeDue = (price, cash) => {
  const changeDue = cash - price;

  return changeDue;
};

const getCashInDrawer = () => {
  const cashInDrawerDecimal = cid.reduce(
    (acc, currentValue) => acc + currentValue[1],
    0
  );
  const cashInDrawer = Number(cashInDrawerDecimal.toFixed(2));

  return cashInDrawer;
};

const getChangeInDrawer = (changeDue) => {
  let exactChange = 0;
  const unitValues = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];

  unitValues.forEach((currentUnit, index) => {
    const indexUnitCid = cid.length - (1 + index);

    const convertToInteger = (num) => num * 1000;
    const convertToDecimal = (num) => num / 1000;

    while (currentUnit <= changeDue && cid[indexUnitCid][1] > 0) {
      exactChange += currentUnit;

      changeDue = convertToDecimal(
        convertToInteger(changeDue) - convertToInteger(currentUnit)
      );

      cid[indexUnitCid][1] = convertToDecimal(
        convertToInteger(cid[indexUnitCid][1]) - convertToInteger(currentUnit)
      );
    }
  });

  const changeInDrawer = Number(exactChange).toFixed(2);

  return changeInDrawer;
};

const validateCustomerPrice = (cash, price) => {
  if (cash < price)
    return alert("Customer does not have enough money to purchase the item");

  if (cash === price) {
    const msg = "No change due - customer paid with exact cash";
    displayMessage(msg);
  }

  if (cash > price) {
    const changeDue = getChangeDue(price, cash);

    const cashInDrawer = getCashInDrawer();
    const changeInDrawer = getChangeInDrawer(changeDue);

    const statusMsg = getStatusMessage(changeDue, cashInDrawer, changeInDrawer);
    const msg = "JIJIJAJA";

    displayUI(msg, statusMsg);
  }
};

$calculateChangeInDrawForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const cash = Number($cash.value);

  validateCustomerPrice(cash, price);
});

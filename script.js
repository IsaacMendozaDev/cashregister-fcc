/* cid means Cash In Drawer */
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

const displayResult = (msg, statusMsg) => {
  const $changeInDrawerHTML = document.getElementById("change-due");
  const message = statusMsg ? `Status: ${statusMsg}${msg} ` : msg;

  displayUI();
  $changeInDrawerHTML.innerHTML = message;
};

const getArrHTML = (arr) => {
  let arrHTML = "";

  arr.forEach((unitAndValue) => {
    const unit = unitAndValue[0];
    const value = unitAndValue[1];

    arrHTML += `<p class="p label-drawer"><span class="drawer-unit" >${unit}: </span><span class="drawer-value">${value}</span></p>`;
  });

  return arrHTML;
};

const displayUI = () => {
  const $cashInDrawerHTML = document.getElementById("cid");
  const cidHTML = getArrHTML(cid);

  $cashInDrawerHTML.innerHTML = cidHTML;
};

const getStatusMessageAndUpdateCid = (
  changeDue,
  cashInDrawer,
  changeInDrawer,
  newCid
) => {
  if (cashInDrawer < changeDue || changeInDrawer < changeDue)
    return "INSUFFICENT_FUNDS";

  if (cashInDrawer === changeDue) {
    cid = newCid;
    return "CLOSED";
  }

  if (cashInDrawer > changeDue) {
    cid = newCid;
    return "OPEN";
  }
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

const calculateChangeFromDrawer = (changeDue) => {
  let exactChange = 0;
  let newCid = structuredClone(cid);

  let changeInDrawerArr = [];

  const unitValues = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];

  unitValues.forEach((currentUnit, index) => {
    const indexUnitCid = newCid.length - (1 + index);

    const convertToInteger = (num) => num * 1000;
    const convertToDecimal = (num) => num / 1000;

    while (currentUnit <= changeDue && newCid[indexUnitCid][1] > 0) {
      exactChange += currentUnit;

      console.log(changeInDrawerArr[index]);
      if (changeInDrawerArr[index]) {
        changeInDrawerArr[index][1] += currentUnit;
      } else {
        const value = currentUnit;
        const unit = newCid[indexUnitCid][0];

        changeInDrawerArr.push([unit, value]);
      }

      changeDue = convertToDecimal(
        convertToInteger(changeDue) - convertToInteger(currentUnit)
      );

      newCid[indexUnitCid][1] = convertToDecimal(
        convertToInteger(newCid[indexUnitCid][1]) -
          convertToInteger(currentUnit)
      );
    }
  });

  const changeInDrawer = Number(exactChange).toFixed(2);

  return [newCid, changeInDrawerArr, changeInDrawer];
};

const validateCustomerChange = (cash, price) => {
  if (cash < price)
    return alert("Customer does not have enough money to purchase the item");

  if (cash === price) {
    const msg = "No change due - customer paid with exact cash";
    displayMessage(msg);
  }

  if (cash > price) {
    const changeDue = getChangeDue(price, cash);
    const cashInDrawer = getCashInDrawer();

    const [newCid, changeInDrawerArr, changeInDrawer] =
      calculateChangeFromDrawer(changeDue);

    const statusMsg = getStatusMessageAndUpdateCid(
      changeDue,
      cashInDrawer,
      changeInDrawer,
      newCid
    );

    const msg =
      statusMsg === "INSUFFICENT_FUNDS" ? "" : getArrHTML(changeInDrawerArr);

    displayResult(msg, statusMsg);
  }
};

const validateCustomerInput = (cash, price) => {
  const cashValid = Number(cash);
  const priceValid = Number(price);

  if (!cashValid || isNaN(cash)) return alert("Please input a valid cash");
  if (!priceValid || isNaN(price)) return alert("Please input a valid price");

  validateCustomerChange(cashValid, priceValid);
};

const $calculateChangeInDrawForm = document.getElementById("calculate-form");

$calculateChangeInDrawForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const $cash = document.getElementById("cash");
  const cash = $cash.value;

  const $priceInput = document.getElementById("input-price");
  const priceToUse = $priceInput.value || price;

  validateCustomerInput(cash, priceToUse);
});

displayUI();

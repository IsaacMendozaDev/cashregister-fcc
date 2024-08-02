//DOM VARIBLES
const cash = document.getElementById("cash");
const outputText = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const cidHTML = document.getElementById("cid");
const priceContainer = document.getElementById("price");
const priceInput = document.getElementById("input-price");
const calculateForm = document.getElementById("calculate-form");
//SCRIPT VARIABLES
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
const unitValues = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];

//DISPLAY UI INFORMATION

const displayUIInformation = () => {
  priceContainer.value = "";
  let cidConstructorHTML = "";
  cid.forEach((unitAndValue) => {
    cidConstructorHTML += `<p><b>${unitAndValue[0]}:</b> <span>$${unitAndValue[1]}</span></p>`;
  });

  priceContainer.innerHTML = `$${price}`;
  cidHTML.innerHTML = cidConstructorHTML;
};
displayUIInformation();

//COMPONENT 'STATUS REGISTER'
const queryStatusRegister = (changeValue) => {
  cash.value = "";
  const moneyInCid = cid
    .slice()
    .reverse()
    .reduce(
      (acc, currentValue, index) =>
        changeValue >= unitValues[index] || changeValue >= currentValue[1]
          ? acc + currentValue[1]
          : acc,
      0
    );
  if (moneyInCid < changeValue)
    return displayChange("INSUFFICIENT_FUNDS", false);
  if (moneyInCid == changeValue) return displayChange("CLOSED", changeValue);
  if (moneyInCid > changeValue) return displayChange("OPEN", changeValue);
};

//COMPONENT 'CHANGE MONEY'
const takeMoneyofCid = (changeValue) => {
  let change = changeValue;
  const changeArray = [
    ["ONE HUNDRED", 0],
    ["TWENTY", 0],
    ["TEN", 0],
    ["FIVE", 0],
    ["ONE", 0],
    ["QUARTER", 0],
    ["DIME", 0],
    ["NICKEL", 0],
    ["PENNY", 0],
  ];
  cid
    .slice()
    .reverse()
    .forEach((moneyInCash, index) => {
      while (
        change - unitValues[index] >= 0 &&
        moneyInCash[1] - unitValues[index] >= 0
      ) {
        change = parseFloat((change - unitValues[index]).toFixed(2));
        moneyInCash[1] = parseFloat(
          (moneyInCash[1] - unitValues[index]).toFixed(2)
        );
        changeArray[index][1] = parseFloat(
          (changeArray[index][1] + unitValues[index]).toFixed(2)
        );
      }
    });
  displayUIInformation();
  return changeArray;
};

const displayChange = (status, changeValue) => {
  const statusStyled =
    status === "INSUFFICIENT_FUNDS" || status === "CLOSED"
      ? `<span class="red" >${status}</span>`
      : `<span class="green" >${status}</span>`;

  if (changeValue === false)
    return (outputText.innerHTML = `<p><b>Status:</b> ${statusStyled}</p>`);

  outputText.innerHTML = `
  <p><b>Status:</b> ${statusStyled}</p>
  `;
  takeMoneyofCid(changeValue).forEach((unitAndValue) => {
    if (unitAndValue[1] != 0)
      outputText.innerHTML += `<p><b>${unitAndValue[0]}:</b> $${unitAndValue[1]}</p>`;
  });
};

//COMPONENT 'PURCHASE'
calculateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  price = priceInput.value ? priceInput.value : price;
  displayUIInformation();

  if (parseFloat(cash.value) == price)
    return (outputText.innerHTML = `<p>No change due - customer paid with exact cash</p>`);
  if (parseFloat(cash.value) - price < 0)
    return alert("Customer does not have enough money to purchase the item");

  if (parseFloat(cash.value) > price) {
    queryStatusRegister(cash.value - price);
    return cid;
  }
});

# cashregister-fcc
This is a cash register web application, which allows the user to change prices and enter their money to receive their change. This project was used to obtain the JavaScript Algorithms and Data Structures certification from freeCodeCamp.

## I have to fulfill the follow user stories to reach the certification:
1. You should have an input element with an id of "cash"
2. You should have a div, span or p element with an id of "change-due"
3. You should have a button element with an id of "purchase-btn"
4. When the value in the #cash element is less than price, an alert should appear with the text "Customer does not have enough money to purchase the item"
5. When the value in the #cash element is equal to price, the value in the #change-due element should be "No change due - customer paid with exact cash"
6. When price is 19.5, the value in the #cash element is 20, cid is [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]], and the #purchase-btn element is clicked, the value in the #change-due element should be "Status: OPEN QUARTER: $0.5"
8. When price is 3.26, the value in the #cash element is 100, cid is [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]], and the #purchase-btn element is clicked, the value in the #change-due element should be "Status: OPEN TWENTY: $60 TEN: $20 FIVE: $15 ONE: $1 QUARTER: $0.5 DIME: $0.2 PENNY: $0.04"
10. When price is 19.5, the value in the #cash element is 20, cid is [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]], and the #purchase-btn element is clicked, the value in the #change-due element should be "Status: INSUFFICIENT_FUNDS"
11. When price is 19.5, the value in the #cash element is 20, cid is [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]], and the #purchase-btn element is clicked, the value in the #change-due element should be "Status: INSUFFICIENT_FUNDS"
12. When price is 19.5, the value in the #cash element is 20, cid is [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]], and the #purchase-btn element is clicked, the value in the #change-due element should be "Status: CLOSED PENNY: $0.5"

document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseName = document.getElementById('expense-name');
    const expenseAmount = document.getElementById("expense-amount");
    const expenseList = document.getElementById('expense-list');
    const totalAmountDisplay = document.getElementById('total-amount');
    

    let expenses= JSON.parse(localStorage.getItem('expenses'))||[];
    let totalAmount = calculateExpenseTotal();
    renderExpenses();
    updateTotal();
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = expenseName.value.trim();
        const amount = parseFloat(expenseAmount.value.trim());
        
        if (name!=="" && !isNaN(amount) && amount>0) {
            const newExpense = {
                id: Date.now(),
                name:name,
                amount:amount,
            }
            expenses.push(newExpense);
            saveExpensetoLocale(expenses);
            renderExpenses();
            updateTotal();

            expenseName.value = '';
            expenseAmount.value = '';
            console.log(expenses);
        }
    });

    function saveExpensetoLocale(expenses) {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }
    function calculateExpenseTotal() {
        return expenses.reduce((sum,expense) => sum + expense.amount, 0);
    }
    function updateTotal(){
        totalAmount = calculateExpenseTotal();
        console.log(totalAmount)
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }
    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense) => {
            const li = document.createElement('li');
            li.innerHTML = `${expense.name} - ₹${expense.amount.toFixed(2)}
            <button class="delete-button" data-expense-id="${expense.id}">Delete</button>
            `;
            expenseList.appendChild(li);
        });
    }
    expenseList.addEventListener('click',(e)=>{
        if(e.target.tagName==="BUTTON"){
            const expenseId = parseInt(e.target.getAttribute('data-expense-id'));
            expenses=expenses.filter((expense)=>expense.id!==expenseId);
            saveExpensetoLocale(expenses);
            renderExpenses();
            updateTotal();
        }
    })

});
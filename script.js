document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseName = document.getElementById('expense-name');
    const expenseAmount = document.getElementById("expense-amount");
    const expenseList = document.getElementById('expense-list');
    const totalAmountDisplay = document.getElementById('total-amount');
    

    let expenses=[]; 
    let totalAmount = calculateExpenseTotal();

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = expenseName.value.trim();
        const amount = expenseAmount.value.trim();
        
        if (name!=="" && !isNaN(amount) && amount>0) {
            const newExpense = {
                id: Date.now(),
                name,
                amount,
            }
            expenses.push(newExpense);
            
        }
 

    });

    function calculateExpenseTotal() {

    }



});
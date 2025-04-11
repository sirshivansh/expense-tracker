document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const themeToggle = document.getElementById('theme-toggle');
    const expensesDiv = document.getElementById('expenses');
    const expenseChart = document.getElementById('expenseChart').getContext('2d');

    let expenses = {};
    let chart;

    // Load initial data and set up the chart
    setupChart();
    displayExpenses();

    expenseForm.addEventListener('submit', addExpense);
    themeToggle.addEventListener('change', toggleTheme);

    function addExpense(e) {
        e.preventDefault();

        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);

        if (!date || !description || isNaN(amount)) {
            alert('Please fill in all fields correctly.');
            return;
        }

        if (!expenses[date]) {
            expenses[date] = [];
        }

        expenses[date].push({ description, amount });
        displayExpenses();
        updateChart();
        expenseForm.reset();
    }

    function displayExpenses() {
        expensesDiv.innerHTML = '';

        Object.keys(expenses).sort().forEach(date => {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('expense-day');
            if (document.body.classList.contains('dark-mode')) {
                dayDiv.classList.add('dark-mode');
            }

            const dayHeader = document.createElement('h2');
            dayHeader.textContent = new Date(date).toDateString();
            dayDiv.appendChild(dayHeader);

            expenses[date].forEach((expense, index) => {
                const expenseDiv = document.createElement('div');
                expenseDiv.classList.add('expense');
                if (document.body.classList.contains('dark-mode')) {
                    expenseDiv.classList.add('dark-mode');
                }

                const expenseDescription = document.createElement('span');
                expenseDescription.textContent = expense.description;
                expenseDiv.appendChild(expenseDescription);

                const expenseAmount = document.createElement('span');
                expenseAmount.textContent = `₹${expense.amount}`;
                expenseDiv.appendChild(expenseAmount);

                // Edit Button
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.classList.add('edit');
                editButton.addEventListener('click', () => editExpense(date, index));
                expenseDiv.appendChild(editButton);

                // Delete Button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete');
                deleteButton.addEventListener('click', () => deleteExpense(date, index));
                expenseDiv.appendChild(deleteButton);

                dayDiv.appendChild(expenseDiv);
            });

            expensesDiv.appendChild(dayDiv);
        });

        // Ensure scrolling works if content is overflowing
        expensesDiv.scrollTop = expensesDiv.scrollHeight;
    }

    function editExpense(date, index) {
        const expense = expenses[date][index];
        document.getElementById('date').value = date;
        document.getElementById('description').value = expense.description;
        document.getElementById('amount').value = expense.amount;
        deleteExpense(date, index);
    }

    function deleteExpense(date, index) {
        expenses[date].splice(index, 1);
        if (expenses[date].length === 0) {
            delete expenses[date];
        }
        displayExpenses();
        updateChart();
    }

    function setupChart() {
        chart = new Chart(expenseChart, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Daily Expenses',
                    data: [],
                    borderColor: 'var(--button-background-light)', // Default color
                    backgroundColor: 'rgba(0, 255, 0, 0.3)',
                    borderWidth: 2,
                    pointRadius: 5,
                    pointBackgroundColor: [], // Will be updated dynamically
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return `₹${tooltipItem.raw}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function updateChart() {
        const labels = [];
        const data = [];
        const pointColors = [];

        Object.keys(expenses).sort().forEach(date => {
            let totalAmount = 0;
            expenses[date].forEach(expense => totalAmount += expense.amount);
            labels.push(new Date(date).toDateString());
            data.push(totalAmount);
            pointColors.push(totalAmount > 2000 ? 'red' : 'blue'); // Set point color based on amount
        });

        // Update chart data
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        chart.data.datasets[0].pointBackgroundColor = pointColors; // Apply dynamic point colors

        chart.update();
    }

    function toggleTheme() {
        if (themeToggle.checked) {
            document.body.classList.add('dark-mode');
            updateChartColors('dark');
        } else {
            document.body.classList.remove('dark-mode');
            updateChartColors('light');
        }
    }

    function updateChartColors(mode) {
        if (mode === 'dark') {
            chart.data.datasets[0].borderColor = 'blue'; // Neon blue in dark mode
            chart.data.datasets[0].backgroundColor = 'rgba(0, 0, 255, 0.3)';
        } else {
            chart.data.datasets[0].borderColor = 'green'; // Neon green in light mode
            chart.data.datasets[0].backgroundColor = 'rgba(0, 255, 0, 0.3)';
        }
        chart.update();
    }
});

🔍 Project Explanation: **Expense Tracker Web App**

🧠 Overview:

This is a **simple and interactive Expense Tracker** built using **HTML, CSS, and JavaScript**, enhanced with **Chart.js** to visualize daily expenses. It lets users:

- Add, view, edit, and delete daily expenses.
- Automatically group expenses by date.
- Switch between light and dark themes.
- Visualize total daily expenses on a **line chart** with dynamic colors.


📁 **File Structure & Roles:**

1. **index.html**:

- Creates the structure of the webpage.
    
- Includes:
    
    - Input form (Date, Description, Amount).
    - Div to display expenses.
    - Toggle for dark mode.
    - Canvas element for the chart.
    - Links to `styles.css` and `scripts.js`.
    

 2. **styles.css**:

- Defines styles for light and dark modes using CSS variables.
- Styles the form, buttons, expenses list, chart area, and theme toggle switch.
- Includes responsive design and smooth transition effects.
    

 3. **scripts.js**:

    - Handles **logic and interactivity**:
    - `addExpense()` to collect and store input.
    - `displayExpenses()` to show daily grouped expenses.
    - `editExpense()` and `deleteExpense()` for expense management.
    - `setupChart()` and `updateChart()` using Chart.js.
    - `toggleTheme()` switches between light/dark modes and adjusts chart colors accordingly.
        

### 🧪 Features:

- ✅ Add expense with date, description, and amount.
- ✅ Edit/Delete entries.
- ✅ Auto-grouping by date.
- ✅ Dark Mode switch.
- ✅ Real-time updating chart (Chart.js).
- ✅ Data point color changes based on value (`> ₹2000 = red`).
    

// Select necessary DOM elements
const pointsDisplay = document.getElementById("points");
const levelDisplay = document.getElementById("level");
const badgesDisplay = document.getElementById("badges");
const expenseForm = document.getElementById("expense-form");
const goalForm = document.getElementById("goal-form");
const generateReportButton = document.getElementById("generate-report");
const reportOutput = document.getElementById("report-output");
const progressBars = document.querySelectorAll(".progress-bar");

// Initialize user data
let points = 0;
let level = 1;
let expenses = [];
let goals = [];

// Update gamification elements
function updateGamification() {
    pointsDisplay.textContent = points;
    levelDisplay.textContent = level;

    if (points >= 50) {
        badgesDisplay.textContent = "Finance Guru";
    } else if (points >= 30) {
        badgesDisplay.textContent = "Saving Star";
    } else {
        badgesDisplay.textContent = "No badges earned yet";
    }
}

// Handle expense form submission
expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const category = document.getElementById("category").value;
    const amount = parseFloat(document.getElementById("amount").value);

    expenses.push({ category, amount });
    points += 5;  // Reward 5 points per expense entry
    updateGamification();

    // Clear input fields
    expenseForm.reset();
    alert("Expense added!");
});

// Handle goal form submission
goalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const goalName = document.getElementById("goal-name").value;
    const targetAmount = parseFloat(document.getElementById("target-amount").value);

    goals.push({ goalName, targetAmount, saved: 0 });
    alert("Goal added!");

    // Update the progress bars
    displayGoals();
    goalForm.reset();
});

// Display goals with progress bars
function displayGoals() {
    const savingsGoals = document.getElementById("savings-goals");
    savingsGoals.innerHTML = '<h2>Savings Goals</h2>';

    goals.forEach((goal, index) => {
        const goalDiv = document.createElement("div");
        goalDiv.classList.add("goal");
        goalDiv.innerHTML = `
            <p>Goal: ${goal.goalName}</p>
            <div class="progress-bar">
                <div class="progress" style="width: ${(goal.saved / goal.targetAmount) * 100}%;">
                    ${Math.min(((goal.saved / goal.targetAmount) * 100).toFixed(0), 100)}%
                </div>
            </div>
        `;
        savingsGoals.appendChild(goalDiv);
    });
}

// Generate monthly report
generateReportButton.addEventListener("click", () => {
    const reportData = expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) acc[expense.category] = 0;
        acc[expense.category] += expense.amount;
        return acc;
    }, {});

    reportOutput.innerHTML = "<h3>Monthly Report</h3>";
    for (const [category, amount] of Object.entries(reportData)) {
        reportOutput.innerHTML += `<p>${category}: $${amount.toFixed(2)}</p>`;
    }
});

// Basic level-up mechanism
function levelUp() {
    if (points >= 50) {
        level += 1;
        points = 0;  // Reset points after leveling up
        alert("Congratulations! You've leveled up!");
    }
    updateGamification();
}

// Track user spending habits for gamification
setInterval(() => {
    if (expenses.length > 5) {
        points += 10;
        alert("Great job! You earned 10 points for regular tracking.");
    }
    levelUp();
}, 10000);  // Check every 10 seconds for demo purposes

// Initialize with default values
updateGamification();
displayGoals();

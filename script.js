//  Creating DOM elements
const result = document.getElementById("result");
const moodButton = document.querySelectorAll(".mood-button");

// Iterate over all mood-buttons and store the input clicked by user in localstorage
moodButton.forEach((btn) => {
    btn.addEventListener("click", () => {
        const mood = btn.innerHTML;

        const date = new Date().toDateString();

        let moodData = JSON.parse(localStorage.getItem("moodData")) || {};
        moodData[date] = mood;
        localStorage.setItem("moodData", JSON.stringify(moodData));
        // Call displayTimeline function for every button clicked
        displayTimeline("month");
    });
});

// displayTimeline function to display the output of the user input
function displayTimeline(view) {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";
    let moodData = JSON.parse(localStorage.getItem("moodData")) || {};
    let days = Object.keys(moodData);
    days.sort();

    // Adding filter for the different type of views like day/week/month which is decided by the user
    let filteredDays = days.filter((day) => {
        let date = new Date(day);
        let now = new Date();
        if (view === "day") {
            return date.toDateString() === now.toDateString();
        } else if (view === "week") {
            let week = new Date();
            week.setDate(now.getDate() - 7);
            return date >= week;
        } else if (view === "month") {
            let month = new Date();
            month.setDate(date.getMonth() - 1);
            return date >= month;
        }
        return false;
    });

    filteredDays.forEach((day) => {
        const div = document.createElement("div");
        div.className = "day";
        div.innerHTML = `<h4 style="background-color: #f0f0f0; color: #000">${day}</h4><br />${moodData[day]}`;
        calendar.appendChild(div);
    });
}

displayTimeline("month");

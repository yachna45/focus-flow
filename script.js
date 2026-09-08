// ================================
// GET ELEMENTS FROM HTML
// ================================

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const taskCount = document.getElementById("taskCount");
const progress = document.getElementById("progress");

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const themeBtn = document.getElementById("themeBtn");


// ================================
// TASK COUNTER & DAILY PROGRESS
// ================================

function updateTaskCount() {
    const totalTasks = taskList.children.length;
    const completedTasks =
        taskList.querySelectorAll(".completed").length;

    taskCount.textContent =
        `${completedTasks} / ${totalTasks}`;

    let percentage = 0;

    if (totalTasks > 0) {
        percentage = Math.round(
            (completedTasks / totalTasks) * 100
        );
    }

    progress.textContent = `${percentage}%`;
}


// ================================
// ADD TASK
// ================================

addTaskBtn.addEventListener("click", function () {

    const taskText = taskInput.value;

    if (taskText.trim() === "") {
        return;
    }

    const task = document.createElement("li");
    task.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";

    task.appendChild(deleteBtn);


    // Complete task
    task.addEventListener("click", function () {
        task.classList.toggle("completed");
        updateTaskCount();
    });


    // Delete task
    deleteBtn.addEventListener("click", function (event) {
        event.stopPropagation();

        task.remove();
        updateTaskCount();
    });


    taskList.appendChild(task);

    taskInput.value = "";

    updateTaskCount();
});


// ================================
// FOCUS TIMER
// ================================

let timeLeft = 25 * 60;
let timerInterval = null;


// ================================
// UPDATE TIMER DISPLAY
// ================================

function updateTimerDisplay() {

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const formattedSeconds =
        seconds.toString().padStart(2, "0");

    timerDisplay.textContent =
        `${minutes}:${formattedSeconds}`;
}


// ================================
// START / PAUSE TIMER
// ================================

startBtn.addEventListener("click", function () {

    // If timer is running, pause it
    if (timerInterval !== null) {

        clearInterval(timerInterval);

        timerInterval = null;

        startBtn.textContent = "Resume";

        return;
    }


    // Start or resume timer
    timerInterval = setInterval(function () {

        if (timeLeft > 0) {

            timeLeft--;

            updateTimerDisplay();

        } else {

            clearInterval(timerInterval);

            timerInterval = null;

            startBtn.textContent = "Start";
        }

    }, 1000);


    startBtn.textContent = "Pause";
});


// ================================
// RESET TIMER
// ================================

resetBtn.addEventListener("click", function () {

    clearInterval(timerInterval);

    timerInterval = null;

    timeLeft = 25 * 60;

    updateTimerDisplay();

    startBtn.textContent = "Start";
});


// ================================
// DARK MODE
// ================================

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeBtn.textContent = "☀️";

    } else {

        themeBtn.textContent = "🌙";
    }
});


// ================================
// INITIAL SETUP
// ================================

updateTaskCount();

updateTimerDisplay();
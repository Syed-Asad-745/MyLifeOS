///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////START OF MY LIFEOS PROJECT//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const pageTitle = document.getElementById("page-title");
const pageContent = document.getElementById("page-content");
const navLinks = document.querySelectorAll(".nav-link");

greetAndDate();
loadTasks();
loadHabits();
loadWisdoms();
loadGoals();

////////////////////////////////////////////////////////////////////////////PAGES//////////////////////////////////////////////////////////////////////////////////////////////

const pages = {
  dashboard: {
    title: "Dashboard",
    content: `
    <section class="dashboard">
        <p class="sub-header">Welcome back to LifeOS</p>

        <div class="dashboard-grid">
            <div class="card">
                <h3>Tasks</h3>
                <p id="task-card-paragraph"></p>
            </div>

            <div class="card">
                <h3>Habits</h3>
                <p id="habit-card-paragraph"></p>
            </div>
            
            <div class="card">
                <h3>Goals</h3>
                <p id="goal-card-paragraph"></p>
            </div>

            <div class="card">
                <h3>Wisdom Vault</h3>
                <p id="wisdom-card-paragraph"></p>
            </div>
        </div>
    </section>
    `,
  },

  tasks: {
    title: "Tasks",
    content: `
    <section class="tasks-page">
        <p class="sub-header">Keep track of what you need to get done.</p>

        <form id="task-form">
            <input type="text" id="task-input" placeholder="What do you need to do?">
            <button type="submit" class="add-task-button">Add Task</button>
        </form>

        <div id="task-list"></div>
    </section>
    `,
  },

  habits: {
    title: "Habits",
    content: `
    <section class="habits-page">
      <p class="sub-header">Implement good habits daily and the results will shine!</p>

      <form id="habit-form">
        <input type="text" id="habit-input" placeholder="Add a habit">
        <button type="submit" class="add-habit-button">Add Habit</button>
      </form>
      
      <div id="habit-list"></div>
    </section>
      `,
  },

  goals: {
    title: "Goals",
    content: `
    <section class="goals-page">
      <p class="sub-header">Achieving your goals is how you know you are making real progress.</p>

      <div>
        <form id="goal-form">
          <input type="text" id="goal-input" placeholder="Add the goals you want to achieve">
          <button type="submit" class="add-goal-button">Set Goal</button>
        </form>
      </div>

      <div id="goal-grid"></div>
    </section>
    `,
  },
  wisdomvault: {
    title: "Wisdom Vault",
    content: `
    <section class="wisdom-vault-page">
      <p class="sub-header">Collect wisdom gems and look upon them for inspiration & clarity.</p>

      <div>
        <form id="wisdom-form">
          <input type="text" id="wisdom-quote-input" placeholder="Add a quote">
          <input type="text" id="wisdom-author-input" placeholder="-author">
          <button type="submit" class="add-wisdom-button">Add Card</button>
        </form>
    
        <div id="wisdom-grid"></div>
      </div>
    </section>`,
  },

  settings: {
    title: "Settings",
    content: `
    <section settings-page>
      <p>Change settings as per your preferences</p>

      <div id="settings-options">
        <div id="dark-mode-setting">
          <p>Select between Light mode and Dark mode for appearance preferance</p>
          <button id="dark-mode-button">⇄</button>
        </div>

        <div id="data-controls-setting">
          <p>Delete all data (tasks, habits, goals, wisdoms)</p>
          <button id="delete-all-data-button">⚠️</button>
        </div>

        <div id="about">
          <h2>About ⓘ</h2>
          <br>
          <p>LifeOS is a personal productivity system designed to help organize tasks, habits, goals, and meaningful thoughts in one place.</p>
          <br>
          <p>📝 Tasks — Keep track of things you need to get done.</p>
          <p>🔁 Habits — Build consistency through daily habits.</p>
          <p>🏆 Goals — Set meaningful goals and keep your achievements permanently.</p>
          <p>💭 Wisdom Vault — Save quotes, reminders, ideas, and things worth remembering.</p>
          <p>🌙 Dark Mode — Switch between light and dark themes.</p>
          <p>💾 Local Storage — Keep your data saved in the browser.</p>
          <br>
          <p>LifeOS was built around the idea that productivity isn't just about getting things done — it's also about building habits,
           pursuing meaningful goals, and remembering what matters.</p>
          <br>
          <p>Built with - HTML, CSS, JavaScript, Local Storage API</p>
          <br>
          <p>Built by - Syed Asad</p>
          <p>My LifeOS v1.0</p>
        </div>

      </div>
      </section>
    `,
  },
};

////////////////////////////////////////////////////////////////////////GREET & DATE///////////////////////////////////////////////////////////////////////////////////////////

function greetAndDate() {
  const greetMessage = document.getElementById("greet-message");
  const dateDisplay = document.getElementById("date-display");

  let date = new Date().toISOString().split("T")[0].split("-");
  dateDisplay.textContent = `${date[2]}-${date[1]}-${date[0]}`;

  let hours = new Date().getHours();
  if (hours < 5) {
    greetMessage.textContent = "It's Midnight you Owl 🦉";
  } else if (hours >= 5 && hours < 12) {
    greetMessage.textContent = "Good Morning";
  } else if (hours >= 12 && hours < 16) {
    greetMessage.textContent = "Good Afternoon";
  } else if (hours >= 16 && hours < 23) {
    greetMessage.textContent = "Good Evening";
  }
}

////////////////////////////////////////////////////////////////////////HANDLE NAV CLICK///////////////////////////////////////////////////////////////////////////////////////

function handleNavClick(pageName) {
  const page = pages[pageName];

  if (!page) return;

  pageTitle.textContent = page.title;
  pageContent.innerHTML = page.content;

  if (pageName === "dashboard") {
    setupDashboard();
  }

  if (pageName === "tasks") {
    setupTaskForm();
  }

  if (pageName === "habits") {
    setupHabitForm();
  }

  if (pageName === "goals") {
    setupGoalForm();
  }

  if (pageName === "wisdomvault") {
    setupWisdomVaultForm();
  }

  if (pageName === "settings") {
    setupSettingsPage();
  }

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.name.trim().toLowerCase() === pageName);
  });
}

handleNavClick("dashboard");

////////////////////////////////////////////////////////////////////////SETUP DASHBOARD////////////////////////////////////////////////////////////////////////////////////////

function setupDashboard() {
  let taskCardParagraph = document.getElementById("task-card-paragraph");
  if (tasks.length === 0) {
    taskCardParagraph.textContent = "No tasks are being tracked right now.";
  } else {
    let completedTaskCount = tasks.filter((task) => task.completed).length;
    taskCardParagraph.textContent = `${completedTaskCount} out of ${tasks.length} tasks completed.`;
  }

  let habitCardParagraph = document.getElementById("habit-card-paragraph");
  if (habits.length === 0) {
    habitCardParagraph.textContent = "No habits are being followed right now.";
  } else {
    let completedHabitCount = habits.filter((habit) => habit.completed).length;
    habitCardParagraph.textContent = `${completedHabitCount} out of ${habits.length} habits followed.`;
  }

  let wisdomCardParagraph = document.getElementById("wisdom-card-paragraph");
  if (wisdoms.length === 0) {
    wisdomCardParagraph.textContent = "No wisdom gems have been collected yet.";
  } else {
    let collectedWisdomsCount = wisdoms.length;
    wisdomCardParagraph.textContent = `${collectedWisdomsCount} wisdom gems collected so far.`;
  }

  let goalCardParagraph = document.getElementById("goal-card-paragraph");
  if (goals.length === 0) {
    goalCardParagraph.textContent = "No goals have been set yet.";
  } else {
    let completedGoalCount = goals.filter((goal) => goal.achieved).length;
    goalCardParagraph.textContent = `${completedGoalCount} out of ${goals.length} goals have been achieved.`;
  }
}

//////////////////////////////////////////////////////////////////////SETUP TASK FORM//////////////////////////////////////////////////////////////////////////////////////////

function setupTaskForm() {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");

  if (!taskForm || !taskInput) return;

  renderTasks();

  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (!taskText) return;

    tasks.push({
      id: Date.now(),
      text: taskText,
      completed: false,
    });

    renderTasks();
    saveTasks();

    taskInput.value = "";
  });
}

////////////////////////////////////////////////////////////////////////RENDER TASKS///////////////////////////////////////////////////////////////////////////////////////////

function renderTasks() {
  const taskList = document.getElementById("task-list");

  if (!taskList) return;

  taskList.innerHTML = "";
  tasks.forEach((task) => {
    let taskItemElement = document.createElement("div");
    taskItemElement.classList.add("task-item-div");

    let taskParagraphElement = document.createElement("p");
    taskParagraphElement.classList.add("task");
    if (task.completed) {
      taskParagraphElement.classList.add("completed");
    }
    taskParagraphElement.dataset.id = task.id;
    taskParagraphElement.textContent = task.text;

    let deleteTaskButtonElement = document.createElement("button");
    deleteTaskButtonElement.classList.add("delete-task-button");
    deleteTaskButtonElement.dataset.id = task.id;
    deleteTaskButtonElement.textContent = "×";

    taskItemElement.appendChild(taskParagraphElement);
    taskItemElement.appendChild(deleteTaskButtonElement);

    taskList.appendChild(taskItemElement);
  });

  const renderedTasks = document.querySelectorAll(".task");
  renderedTasks.forEach((task) => {
    task.addEventListener("click", function () {
      const clickedTask = tasks.find((element) => element.id === Number(task.dataset.id));
      if (clickedTask) {
        clickedTask.completed = !clickedTask.completed;
        task.classList.toggle("completed", clickedTask.completed);
        saveTasks();
      }
    });
  });

  setupTaskDeleteButton();
}

/////////////////////////////////////////////////////////////////SETUP TASK DELETE BUTTON//////////////////////////////////////////////////////////////////////////////////////

function setupTaskDeleteButton() {
  const deleteButtons = document.querySelectorAll(".delete-task-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const clickedTask = tasks.find((task) => task.id === Number(button.dataset.id));
      if (clickedTask) {
        tasks = tasks.filter((task) => task !== clickedTask);
        renderTasks();
        saveTasks();
      }
    });
  });
}

/////////////////////////////////////////////////////////////////////////LOAD TASKS////////////////////////////////////////////////////////////////////////////////////////////

function loadTasks() {
  let loadedTasks = localStorage.getItem("tasks");
  if (!loadedTasks) {
    return (tasks = []);
  } else {
    tasks = JSON.parse(loadedTasks);
  }
}

////////////////////////////////////////////////////////////////////////SAVE TASKS/////////////////////////////////////////////////////////////////////////////////////////////

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/////////////////////////////////////////////////////////////////////SETUP HABIT FORM//////////////////////////////////////////////////////////////////////////////////////////

function setupHabitForm() {
  const habitForm = document.getElementById("habit-form");
  const habitInput = document.getElementById("habit-input");

  if (!habitForm || !habitInput) return;

  renderHabits();

  habitForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const habitText = habitInput.value.trim();

    if (!habitText) return;

    habits.push({
      id: Date.now(),
      text: habitText,
      completed: false,
      completedDate: null,
    });
    renderHabits();
    saveHabits();

    habitInput.value = "";
  });
}

////////////////////////////////////////////////////////////////////////RENDER HABITS//////////////////////////////////////////////////////////////////////////////////////////

function renderHabits() {
  const habitList = document.getElementById("habit-list");

  if (!habitList) return;

  habitList.innerHTML = "";
  habits.forEach((habit) => {
    let habitItemElement = document.createElement("div");
    habitItemElement.classList.add("habit-item-div");

    let habitCheckboxElement = document.createElement("input");
    habitCheckboxElement.type = "checkbox";
    habitCheckboxElement.classList.add("habit-checkbox");
    habitCheckboxElement.id = habit.id;

    let habitLabelElement = document.createElement("label");
    habitLabelElement.htmlFor = habit.id;
    habitLabelElement.classList.add("habit");

    if (habit.completed) {
      habitLabelElement.classList.add("completed");
      habitCheckboxElement.disabled = true;
      habitCheckboxElement.checked = true;
    }
    habitCheckboxElement.dataset.id = habit.id;
    habitLabelElement.textContent = habit.text;

    let deleteHabitButtonElement = document.createElement("button");
    deleteHabitButtonElement.classList.add("delete-habit-button");
    deleteHabitButtonElement.dataset.id = habit.id;
    deleteHabitButtonElement.textContent = "×";

    habitItemElement.appendChild(habitCheckboxElement);
    habitItemElement.appendChild(habitLabelElement);
    habitItemElement.appendChild(deleteHabitButtonElement);

    habitList.appendChild(habitItemElement);
  });

  const renderedHabits = document.querySelectorAll(".habit-checkbox");
  renderedHabits.forEach((habit) => {
    habit.addEventListener("click", function () {
      const clickedHabit = habits.find((element) => element.id === Number(habit.dataset.id));
      if (clickedHabit) {
        clickedHabit.completedDate = new Date().toISOString().split("T")[0];
        clickedHabit.completed = true;
        habit.classList.add("completed", habit.completed);
        habit.disabled = true;
        renderHabits();
        saveHabits();
      }
    });
  });
  setupHabitDeleteButton();
}

////////////////////////////////////////////////////////////////////SETUP HABIT DELETE BUTTON//////////////////////////////////////////////////////////////////////////////////

function setupHabitDeleteButton() {
  const deleteButtons = document.querySelectorAll(".delete-habit-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const clickedHabit = habits.find((habit) => habit.id === Number(button.dataset.id));
      if (clickedHabit) {
        habits = habits.filter((habit) => habit !== clickedHabit);
        renderHabits();
        saveHabits();
      }
    });
  });
}

//////////////////////////////////////////////////////////////////////////LOAD HABITS//////////////////////////////////////////////////////////////////////////////////////////

function loadHabits() {
  let loadedHabits = localStorage.getItem("habits");
  if (!loadedHabits) {
    return (habits = []);
  } else {
    habits = JSON.parse(loadedHabits);
    habits.forEach((habit) => {
      if (new Date().toISOString().split("T")[0] !== habit.completedDate) {
        habit.completed = false;
        habit.completedDate = null;
      }
    });
  }
}

///////////////////////////////////////////////////////////////////////////SAVE HABITS/////////////////////////////////////////////////////////////////////////////////////////

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

//////////////////////////////////////////////////////////////////////SETUP WISDOM VAULT FORM//////////////////////////////////////////////////////////////////////////////////

function setupWisdomVaultForm() {
  const wisdomForm = document.getElementById("wisdom-form");
  const wisdomQuoteInput = document.getElementById("wisdom-quote-input");
  const wisdomAuthorInput = document.getElementById("wisdom-author-input");

  if (!wisdomForm || !wisdomQuoteInput || !wisdomAuthorInput) return;

  renderWisdoms();

  wisdomForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const wisdomText = wisdomQuoteInput.value.trim();
    const wisdomAuthor = wisdomAuthorInput.value.trim();

    if (!wisdomText || !wisdomAuthor) return;

    wisdoms.push({
      id: Date.now(),
      text: wisdomText,
      author: wisdomAuthor,
    });

    renderWisdoms();
    saveWisdoms();

    wisdomQuoteInput.value = "";
    wisdomAuthorInput.value = "";
  });
}

////////////////////////////////////////////////////////////////////////RENDER WISDOMS/////////////////////////////////////////////////////////////////////////////////////////

function renderWisdoms() {
  const wisdomGrid = document.getElementById("wisdom-grid");

  if (!wisdomGrid) return;

  wisdomGrid.innerHTML = "";
  wisdoms.forEach((wisdom) => {
    let wisdomCardElement = document.createElement("div");
    wisdomCardElement.classList.add("wisdom-card");

    let WisdomCardTextElement = document.createElement("p");
    WisdomCardTextElement.classList.add("wisdom-card-text");
    WisdomCardTextElement.textContent = wisdom.text;

    let WisdomCardAuthorElement = document.createElement("p");
    WisdomCardAuthorElement.classList.add("wisdom-card-author");
    WisdomCardAuthorElement.textContent = wisdom.author;

    let deleteWisdomCardButtonElement = document.createElement("button");
    deleteWisdomCardButtonElement.classList.add("delete-wisdom-card-button");
    deleteWisdomCardButtonElement.dataset.id = wisdom.id;
    deleteWisdomCardButtonElement.textContent = "×";

    wisdomCardElement.appendChild(WisdomCardTextElement);
    wisdomCardElement.appendChild(WisdomCardAuthorElement);
    wisdomCardElement.appendChild(deleteWisdomCardButtonElement);

    wisdomGrid.appendChild(wisdomCardElement);
  });
  setupWisdomCardDeleteButton();
}

////////////////////////////////////////////////////////////////////SETUP WISDOM DELETE BUTTON/////////////////////////////////////////////////////////////////////////////////

function setupWisdomCardDeleteButton() {
  const deleteButtons = document.querySelectorAll(".delete-wisdom-card-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const clickedWisdomCard = wisdoms.find((wisdom) => wisdom.id === Number(button.dataset.id));
      if (clickedWisdomCard) {
        wisdoms = wisdoms.filter((wisdom) => wisdom !== clickedWisdomCard);
        renderWisdoms();
        saveWisdoms();
      }
    });
  });
}

//////////////////////////////////////////////////////////////////////////LOAD WISDOMS/////////////////////////////////////////////////////////////////////////////////////////

function loadWisdoms() {
  let loadedWisdoms = localStorage.getItem("wisdoms");
  if (!loadedWisdoms) {
    return (wisdoms = []);
  } else {
    wisdoms = JSON.parse(loadedWisdoms);
  }
}

///////////////////////////////////////////////////////////////////////////SAVE WISDOMS////////////////////////////////////////////////////////////////////////////////////////

function saveWisdoms() {
  localStorage.setItem("wisdoms", JSON.stringify(wisdoms));
}

//////////////////////////////////////////////////////////////////////////SETUP GOAL FORM//////////////////////////////////////////////////////////////////////////////////////

function setupGoalForm() {
  const goalForm = document.getElementById("goal-form");
  const goalInput = document.getElementById("goal-input");

  if (!goalForm || !goalInput) return;

  renderGoals();

  goalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const goalText = goalInput.value.trim();

    if (!goalText) return;

    goals.push({
      id: Date.now(),
      text: goalText,
      achieved: false,
    });

    renderGoals();
    saveGoals();

    goalInput.value = "";
  });
}

////////////////////////////////////////////////////////////////////////////RENDER GOALS///////////////////////////////////////////////////////////////////////////////////////

function renderGoals() {
  const goalGrid = document.getElementById("goal-grid");

  if (!goalGrid) return;

  goalGrid.innerHTML = "";
  goals.forEach((goal) => {
    let goalCardElement = document.createElement("div");
    goalCardElement.classList.add("goal-card");
    if (goal.achieved === true) {
      goalCardElement.classList.add("achieved");
    }

    let goalTextElement = document.createElement("p");
    goalTextElement.classList.add("goal-card-text");
    goalTextElement.textContent = goal.text;
    if (goal.achieved) {
      goalTextElement.textContent += "🎖️";
    }
    goalCardElement.appendChild(goalTextElement);

    if (!goal.achieved) {
      let goalAchievedButton = document.createElement("button");
      goalAchievedButton.classList.add("goal-achieved-button");
      goalAchievedButton.textContent = "--MARK GOAL AS ACHIEVED--";
      goalAchievedButton.dataset.id = goal.id;
      goalCardElement.appendChild(goalAchievedButton);
    }

    goalGrid.appendChild(goalCardElement);
  });
  setupGoalAchievedButton();
}

////////////////////////////////////////////////////////////////////SETUP GOAL ACHIEVED BUTTON/////////////////////////////////////////////////////////////////////////////////

function setupGoalAchievedButton() {
  const achievedButtons = document.querySelectorAll(".goal-achieved-button");
  achievedButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const clickedGoal = goals.find((goal) => goal.id === Number(button.dataset.id));
      if (clickedGoal) {
        clickedGoal.achieved = true;
        renderGoals();
        saveGoals();
      }
    });
  });
}

//////////////////////////////////////////////////////////////////////////LOAD GOALS///////////////////////////////////////////////////////////////////////////////////////////

function loadGoals() {
  let loadedGoals = localStorage.getItem("goals");
  if (!loadedGoals) {
    return (goals = []);
  } else {
    goals = JSON.parse(loadedGoals);
  }
}

///////////////////////////////////////////////////////////////////////////SAVE GOALS//////////////////////////////////////////////////////////////////////////////////////////

function saveGoals() {
  localStorage.setItem("goals", JSON.stringify(goals));
}

///////////////////////////////////////////////////////////////////////SETUP SETTINGS PAGE/////////////////////////////////////////////////////////////////////////////////////

function setupSettingsPage() {
  const darkModeButton = document.getElementById("dark-mode-button");
  darkModeButton.addEventListener("click", function () {
    document.documentElement.classList.toggle("dark-mode");
  });

  const deleteAllDataButton = document.getElementById("delete-all-data-button");
  deleteAllDataButton.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete all of your app data? This action cannot be undone.")) {
      localStorage.removeItem("tasks");
      localStorage.removeItem("habits");
      localStorage.removeItem("goals");
      localStorage.removeItem("wisdoms");
      window.location.reload();
    }
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////THE END OF MY LIFEOS PROJECT////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

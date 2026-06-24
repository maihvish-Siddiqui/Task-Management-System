const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (user) {

  document.getElementById("profileName").innerText =
    user.name;

  document.getElementById("profileLetter").innerText =
    user.name.charAt(0).toUpperCase();
}

if (!token || token === "undefined") {
  window.location.href = "login.html";
}

const taskContainer = document.getElementById("taskContainer");
const taskForm = document.getElementById("taskForm");

let allTasks = [];

const dueDateInput = document.getElementById("dueDate");

// GET TODAY DATE

const today = new Date().toISOString().split("T")[0];

// DISABLE PREVIOUS DATES

dueDateInput.min = today;

/* FETCH TASKS */

async function fetchTasks() {

  try {

    const response = await fetch(
      "https://task-management-system-o1r2.onrender.com/api/tasks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      alert(data.message || "Unauthorized");
      return;
    }

    allTasks = Array.isArray(data) ? data : [];

    renderTasks(allTasks);
    updateStats();

  } catch (error) {
    console.log(error);
  }
}

// deadline 

function getDeadline(dueDate) {

  if (!dueDate) {
    return "No deadline";
  }

  const now = new Date();

  const deadline = new Date(dueDate);

  const diff = deadline - now;

  // DEADLINE PASSED

  if (diff <= 0) {
    return "Deadline passed";
  }

  // CALCULATE TIME

  const days = Math.floor(
    diff / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (diff / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (diff / (1000 * 60)) % 60
  );

  // SHOW DAYS

  if (days > 0) {
    return `⏳ ${days} day(s) left`;
  }

  // SHOW HOURS

  if (hours > 0) {
    return `⚠️ ${hours} hour(s) left`;
  }

  // SHOW MINUTES

  return `🚨 ${minutes} minute(s) left`;
}

/* RENDER TASKS */

function renderTasks(tasks) {

  taskContainer.innerHTML = "";

  tasks.forEach((task) => {

    taskContainer.innerHTML += `

      <div class="task-card">

        <h3>${task.title}</h3>

        <p>${task.description}</p>

        <p>Priority: ${task.priority}</p>
        <p class="deadline">
        Deadline:
        ${getDeadline(task.dueDate)}
        </p>

        <p>
          Status:
          ${task.completed ? "Completed" : "Pending"}
        </p>

        <button
        class="complete-btn"
        onclick="toggleTask('${task._id}', ${task.completed})"
        ${task.completed ? "disabled" : ""}>
        ${task.completed ? "Completed" : "Complete"}
        </button>
        
        <button
        class="update-btn"
        onclick="updateTask('${task._id}')"
        ${task.completed ? "disabled" : ""}>
        ${task.completed ? "Locked" : "Update"}
        </button>
        
        <button
        class="delete-btn"
        onclick="deleteTask('${task._id}')">
        Delete
        </button>

      </div>

    `;
  });
}

function updateStats() {

  // TOTAL TASKS

  document.getElementById("totalTasks").innerText =
    allTasks.length;

  // COMPLETED TASKS

  const completed = allTasks.filter(
    task => task.completed
  ).length;

  document.getElementById("completedTasks").innerText =
    completed;

  // PENDING TASKS

  const pending = allTasks.filter(
    task => !task.completed
  ).length;

  document.getElementById("pendingTasks").innerText =
    pending;
}

/* ADD TASK */

taskForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const title = document.getElementById("title").value;

  const description =
    document.getElementById("description").value;

  const priority =
    document.getElementById("priority").value;

  const dueDate =
    document.getElementById("dueDate").value;

  try {

    const response = await fetch(
      "https://task-management-system-o1r2.onrender.com/api/tasks",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title,
          description,
          priority,
          dueDate,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    taskForm.reset();

    fetchTasks();

  } catch (error) {
    console.log(error);
  }
});

/* DELETE TASK */

async function deleteTask(id) {

  // CONFIRM POPUP

  const confirmDelete = confirm(
    "Are you sure you want to delete this task?"
  );

  // IF USER CLICKS CANCEL

  if (!confirmDelete) {
    return;
  }

  try {

    await fetch(
      `https://task-management-system-o1r2.onrender.com/api/tasks/${id}`,
      {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchTasks();

  } catch (error) {

    console.log(error);

  }
}

// TOGGLE TASK

async function toggleTask(id, completed) {

  try {

    await fetch(
      `https://task-management-system-o1r2.onrender.com/api/tasks/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          completed: !completed,
        }),
      }
    );

    fetchTasks();

  } catch (error) {
    console.log(error);
  }
}

// UPDATE TASKS

async function updateTask(id) {

  const title = prompt("Enter new title");

  const description = prompt("Enter new description");

  const priority = prompt(
    "Enter priority: Low, Medium, High"
  );

  if (!title || !description || !priority) {
    return;
  }

  try {

    await fetch(
      `https://task-management-system-o1r2.onrender.com/api/tasks/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title,
          description,
          priority,
          updated: true,
        }),
      }
    );

    fetchTasks();

  } catch (error) {

    console.log(error);

  }
}

// FILTER BUTTONS

function showAllTasks() {
  renderTasks(allTasks);
}

function showCompletedTasks() {

  const completedTasks = allTasks.filter(
    task => task.completed
  );

  renderTasks(completedTasks);
}

function showPendingTasks() {

  const pendingTasks = allTasks.filter(
    task => !task.completed
  );

  renderTasks(pendingTasks);
}

// TOGGLE FORM

function toggleTaskForm() {
  taskForm.classList.toggle("hidden");
}

// LOGOUT

function logout() {

  // CONFIRM LOGOUT

  const confirmLogout = confirm(
    "Are you sure you want to logout?"
  );

  // IF USER CLICKS CANCEL

  if (!confirmLogout) {
    return;
  }

  // REMOVE STORAGE

  localStorage.removeItem("token");

  localStorage.removeItem("user");

  // REDIRECT

  window.location.href = "login.html";
}

function toggleMobileMenu() {

  const mobileMenu =
    document.getElementById("mobileMenu");

  mobileMenu.classList.toggle("show-menu");
}

// START APP

fetchTasks();


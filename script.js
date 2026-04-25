const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    const p = document.createElement("p");
    p.className = "empty-message";
    p.textContent = "Belum ada tugas";
    taskList.appendChild(p);
    return;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    const divActions = document.createElement("div");
    divActions.className = "task-actions";

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.onclick = () => toggleComplete(index);

    const completeIcon = document.createElement("i");
    completeIcon.className = task.completed
      ? "ri-checkbox-circle-fill"
      : "ri-checkbox-blank-line";
    completeIcon.style.color = task.completed ? "#22c55e" : "";
    completeBtn.appendChild(completeIcon);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteTask(index);

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "ri-delete-bin-line";
    deleteBtn.appendChild(deleteIcon);

    divActions.appendChild(completeBtn);
    divActions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(divActions);

    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({ text, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

renderTasks();

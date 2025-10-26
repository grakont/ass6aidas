// ====== Task 0 — First Script (name/group + alert) ======
/*
  В этой строке укажи СВОИ имя и группу: (для отчёта видно в Console)
*/
const STUDENT_NAME  = "Aida";     // <--- поменяй на своё имя
const STUDENT_GROUP = "SE-XX";    // <--- и на свою группу

window.addEventListener("DOMContentLoaded", () => {
  console.log(`Student: ${STUDENT_NAME}, Group: ${STUDENT_GROUP}`);
  alert("Hello, JavaScript World!"); // обязательный alert по заданию

  // Сразу прогоняем Task 1 при загрузке:
  runBasicsLogs();
});

// ====== Task 1 — Variables & Operators ======
function runBasicsLogs(){
  console.log("— Task 1: Variables & Operators —");

  // Типы
  const s = "строка";
  const n = 42;
  const b = true;
  console.log("Типы:", { s, n, b });

  // Арифметика
  const a = 10, c = 3;
  console.log("a + c =", a + c);
  console.log("a - c =", a - c);
  console.log("a * c =", a * c);
  console.log("a / c =", a / c);

  // Конкатенация
  const first = "Hello", second = "JS";
  console.log("concat:", first + " " + second + "!");
}
document.getElementById("relog").addEventListener("click", runBasicsLogs);

// ====== Task 2 — Changing Content ======
document.getElementById("changeTextBtn").addEventListener("click", () => {
  const p = document.getElementById("contentP");
  p.textContent = "Привет Аида";
});

// ====== Task 3 — Changing Styles ======
const styleBox = document.getElementById("styleBox");
let bigFont = false;
document.getElementById("bgBtn").addEventListener("click", () => {
  // простая смена фона
  styleBox.style.background =
    styleBox.style.background === "rgb(54, 54, 54)" ? "#1a1a1a" : "#363636";
});
document.getElementById("fsBtn").addEventListener("click", () => {
  bigFont = !bigFont;
  styleBox.style.fontSize = bigFont ? "1.25rem" : "1rem";
});

// ====== Task 4 — Creating & Removing Elements ======
const list = document.getElementById("itemList");
let counter = list.children.length + 1;
document.getElementById("addItemBtn").addEventListener("click", () => {
  const li = document.createElement("li");
  li.textContent = `Новый элемент ${counter++}`;
  list.appendChild(li);
});
document.getElementById("removeItemBtn").addEventListener("click", () => {
  const last = list.lastElementChild;
  if (last) last.remove();
});

// ====== Task 5 — Mouse Events ======
const hoverBox = document.getElementById("hoverBox");
hoverBox.addEventListener("mouseover", () => {
  hoverBox.style.background = "#2f7dff";
});
hoverBox.addEventListener("mouseout", () => {
  hoverBox.style.background = "#2b2b2b";
});

// ====== Task 6 — Keyboard Events ======
const liveInput = document.getElementById("liveInput");
const liveOutput = document.getElementById("liveOutput");
liveInput.addEventListener("keyup", (e) => {
  liveOutput.textContent = e.target.value || "—";
});

// ====== Task 7 — Form Validation (optional) ======
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const pw = document.getElementById("password").value.trim();

  if (!name || !email || !pw) {
    formMsg.textContent = "Заполните все поля.";
    formMsg.className = "form-msg error";
    return;
  }
  // простая проверка email по шаблону
  const okEmail = /^\S+@\S+\.\S+$/.test(email);
  if (!okEmail) {
    formMsg.textContent = "Неверный формат email.";
    formMsg.className = "form-msg error";
    return;
  }
  formMsg.textContent = "Форма валидна. Можно отправлять!";
  formMsg.className = "form-msg ok";
});

// ====== Task 8 — Mini To-Do (array + render) ======
const todoInput = document.getElementById("todoInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const todoList = document.getElementById("todoList");

let tasks = []; // временно в памяти

function renderTasks(){
  todoList.innerHTML = "";
  tasks.forEach((t, idx) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (t.done ? " done" : "");
    li.innerHTML = `
      <span class="text" title="Click to toggle">${t.text}</span>
      <button class="del" title="Delete">✖</button>
    `;
    // toggle done
    li.querySelector(".text").addEventListener("click", () => {
      t.done = !t.done;
      renderTasks();
    });
    // delete
    li.querySelector(".del").addEventListener("click", () => {
      tasks.splice(idx, 1);
      renderTasks();
    });
    todoList.appendChild(li);
  });
}

function addTask(){
  const text = todoInput.value.trim();
  if (!text) return;
  tasks.push({ text, done:false });
  todoInput.value = "";
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);
todoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addTask();
});

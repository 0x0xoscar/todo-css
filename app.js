const completedText = document.querySelector("#completedText");
const todoInput = document.querySelector("#todoInput");
const todoBtn = document.querySelector("#todoBtn");
const errorMsg = document.querySelector(".errorMsg");
const todoUl = document.querySelector("#todoUl");

let completedCount = 0;
const todoArray = [];

function showError() {
    errorMsg.style.display = 'block';
    errorMsg.classList.remove('errorMsg');
    void errorMsg.offsetWidth;
    errorMsg.classList.add('errorMsg');
}

function hideError() {
    errorMsg.style.display = 'none';
}

completedText.style.opacity = '0';
const container = document.getElementById('container');

container.addEventListener('animationend', () => {
    setTimeout(() => {
        completedText.style.transition = 'opacity 0.6s ease';
        completedText.style.opacity = '1';
    }, 400);
});

todoBtn.addEventListener("click", function () {
    if (todoInput.value === "") {
        showError();
        return;
    } else {
        hideError();
    }

    const li = document.createElement("li");
    const span = document.createElement("span");
    li.classList.add("todoItem");
    span.classList.add("todoText");
    span.innerText = todoInput.value;
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerText = "🗑️";
    span.append(deleteBtn);
    li.append(span);
    todoUl.append(li);
    todoInput.value = "";

    li.style.opacity = '0';
    li.style.transform = 'translateY(20px)';

    setTimeout(() => {
        li.style.opacity = '1';
        li.style.transform = 'translateY(0)';
    }, 50);

    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        li.remove();

        if (li.classList.contains("completed")) {
            completedCount--;
            completedText.textContent = `${completedCount} completed`;
        }

        const index = todoArray.indexOf(span.textContent);
        if (index > -1) {
            todoArray.splice(index, 1);
        }
    });

    span.addEventListener("click", function () {
        if (li.classList.contains("completed")) {
            li.classList.remove("completed");
            completedCount--;
        } else {
            li.classList.add("completed");
            completedCount++;
        }
        completedText.textContent = `${completedCount} completed`;
    });
});

var dataInput = document.querySelector("input[type='text']");
var ulSpisok = document.getElementById("list");
var spans = document.getElementsByClassName("delete-button");
var saveBtn = document.getElementById("save");
var clearBtn = document.getElementById("clear");
var closeBtn = document.getElementById("close-modal");




function deleteTodo(){
    for(let span of spans){
        span.addEventListener("click", function(){
            span.parentElement.remove();
            event.preventDefault();
        })
    }
};

function loadTodo(){
    if(localStorage.getItem("todoApplication")){
        ulSpisok.innerHTML = localStorage.getItem("todoApplication");
        deleteTodo();
    }
};

function toComplete(){
    for(let li of document.getElementsByClassName("task")){
      li.addEventListener('click', function(){
          li.style.textDecoration = 'line-through';
          event.preventDefault();
      })
    }
  }


// addEventListener - обработчик события с последующим вызовом функции

dataInput.addEventListener("keypress", function(keyPressed){
    if(keyPressed.which === 13){
        var newLi = document.createElement("li");
        var newSpan = document.createElement("span");
        var liveTime = document.createElement("span");
        var time = new Date();
        var option = {
            hour: 'numeric',
            minute: 'numeric', 
            second: 'numeric'
        }
        newLi.classList.add("task")
        newSpan.innerHTML = "Удалить ";
        newSpan.classList.add("delete-button")
        liveTime.innerHTML = time.toLocaleString("ru", option);//время в формате 24часа("En" - время в формате 12часов)

        var newTodo = this.value; // текущее значение input
        

        if(this.value !== "" && this.value !== " "){

            ulSpisok.appendChild(newLi).append(liveTime, " ", newTodo, newSpan);

        }

        this.value = ""; // очищаем поле ввода
        deleteTodo();
        toComplete();

    }
});

saveBtn.addEventListener("click", function(){
    localStorage.setItem("todoApplication", ulSpisok.innerHTML)
});

clearBtn.addEventListener("click", function(){
    ulSpisok.innerHTML = "";
    localStorage.setItem("todoApplication", ulSpisok.innerHTML);
});

document.getElementById("close-modal").onclick = function(){
    closeModal();
};

function closeModal(){
    document.getElementById("modal-frame").classList.toggle("close");
};


document.getElementById("about").onclick = function(){
    showModal();
};

function showModal(){
    document.getElementById("modal-frame").classList.toggle("show");
};

deleteTodo();
loadTodo();
toComplete();
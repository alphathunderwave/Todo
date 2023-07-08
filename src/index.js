import "./style.css";

const content = document.querySelector(".projects");
const form = document.getElementById("create-project");

var p =[]
var locp = JSON.parse(localStorage.getItem("array"));

if(locp !== null){
  p=locp
}

class Task {
  constructor(name) {
    this.name = name;
    this.completed = false;
  }
}

class Project {
  constructor(name) {
    this.name = name;
    this.taskList = [];
  }
}

function show() {
  console.log(p)
  localStorage.setItem("array", JSON.stringify(p));
  content.innerHTML = "";

  p.forEach((project) => {
    var d1 = document.createElement("div");
    var f1 = document.createElement("form");
    var i1 = document.createElement("input");
    d1.classList.add('project')
    i1.type = "text";
    i1.required = true;
    var s1 = document.createElement("input");
    s1.type = "submit";
    s1.value ='+'
    var h1 = document.createElement("h1");
    h1.textContent = project.name;
    f1.append(h1);
    f1.append(i1);
    f1.append(s1);
    f1.addEventListener("submit", (e) => {
      p[p.indexOf(project)].taskList.push(new Task(i1.value));
      f1.reset();
      show();
      e.preventDefault();
    });
    var rem = document.createElement("button");
    rem.textContent = "x";
    rem.addEventListener("click", function () {
      p.splice(p.indexOf(project),1);
      show();
    });
    f1.append(rem);
    var d2 = document.createElement("div");
    project.taskList.forEach((task) => {
      var ul = document.createElement("ul");
      var x = document.createElement("button");
      var complete = document.createElement("input");
      complete.type = 'checkbox'
      complete.checked = task.completed
      ul.textContent = task.name;
      ul.classList.add(task.completed);
      x.textContent = "x";
      x.addEventListener("click", function () {
        p[p.indexOf(project)].taskList.splice(
          p[p.indexOf(project)].taskList.indexOf(task),
          1
        );

        show();
      });
      complete.addEventListener("click", function () {
        p[p.indexOf(project)].taskList[
          p[p.indexOf(project)].taskList.indexOf(task)
        ].completed = !task.completed;
        show();
      });
      ul.append(complete);
      ul.append(x);
      d2.append(ul);
    });
    d1.append(f1);
    d1.append(d2);
    content.append(d1);
  });
}

form.addEventListener("submit", (e) => {
  p.push(new Project(form.elements["project-name"].value));
  form.reset();
  show();
  e.preventDefault();
});
show()
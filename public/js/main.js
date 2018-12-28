var getTasks, displayTasks, addTask, errorHandler, createTaskDOM, setButtonHandler, onAddTask;

getTasks = function(){
  fetch('http://rest.learncode.academy/api/srujan3/todos')
  .then(function(d){ return d.json()})
  .then(displayTasks)
  .catch(errorHandler)
}

displayTasks = function(tasks){
  var taskContainer = document.getElementById('tasks');
  var ul_ele = document.createElement('ul');
  if(tasks.length > 0){
    var tasksDOM = tasks.map(createTaskDOM);
    for(var i=0; i< tasksDOM.length;i++){
      ul_ele.appendChild(tasksDOM[i]);
    }
    console.log(ul_ele);
  }
  else if(!tasks.length && tasks.title){
    var tasksDOM = createTaskDOM(tasks);
    ul_ele.appendChild(tasksDOM);
    console.log(ul_ele);
  }

  taskContainer.appendChild(ul_ele);
}

createTaskDOM = function(task){
  console.log(task);
  var li_ele = document.createElement('li');
  li_ele.innerHTML = task.title;
  return li_ele;
}

errorHandler = function(e){
  console.error("Error",e);
}

setButtonHandler = function(){
  var btn = document.getElementById('addTask');
  btn.addEventListener('click', onAddTask)
}

onAddTask = function(e){
  var t = document.getElementById('task_txt').value;
  console.log("onAdd:",t);
  fetch('http://rest.learncode.academy/api/srujan3/todos', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify({'title':t,"isCompleted":false}), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(displayTasks)
}




window.addEventListener('load',function(){
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('../sw.js');
  }
  getTasks();
  setButtonHandler();
});

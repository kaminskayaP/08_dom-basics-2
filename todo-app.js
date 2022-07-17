(function() {
  // создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  // создаем и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('iput-group-append');
    button.classList.add('btn', 'btn-primary', 'disabled');
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  // создаем и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('group-list', 'pl-0');
    return list;
  }

  // создаем и возвращаем элемент списка
  function createTodoItem(name) {
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button')

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      item,
      doneButton,
      deleteButton,
    }
  }

  function createTodoApp(container, title = 'Список дел', tasksArray = [], keyStorage = 'tasks') {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    todoItemForm.input.addEventListener('input', function() {
      todoItemForm.button.classList.remove('disabled');
      if(todoItemForm.input.value === '') {
        todoItemForm.button.classList.add('disabled');
      }
    })

    for (let i = 0; i < tasksArray.length; i++) {
      let taskObj = {};
      let done;

      taskObj = tasksArray[i];
      taskObj.id = i;

      let todoItem = createTodoItem(taskObj.name)
      if (taskObj.done === true) {
        done = true;
        todoItem.item.classList.add('list-group-item-success')
      } else {
        done = false;
      }
      todoItem.doneButton.addEventListener('click', function(){
        todoItem.item.classList.toggle('list-group-item-success')
        done = !done;
        taskObj.done = done;
        localStorage.setItem(keyStorage, JSON.stringify(tasksArray));
      })
      todoItem.deleteButton.addEventListener('click', function(){
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();
          let k = tasksArray.indexOf(taskObj.id)
          tasksArray.splice(k, 1);
          localStorage.setItem(keyStorage, JSON.stringify(tasksArray));
        }
      }) 
      todoList.append(todoItem.item);
      localStorage.setItem(keyStorage, JSON.stringify(tasksArray));
    }
    

    todoItemForm.form.addEventListener('submit', function(e){
      e.preventDefault();

      let done = false;
      let i = tasksArray.length - 1;
      let newTask = { name , done };

      if (!todoItemForm.input.value) {
        return;
      }

      let todoItem = createTodoItem(todoItemForm.input.value);
      i++;

      todoItem.doneButton.addEventListener('click', function(){
        todoItem.item.classList.toggle('list-group-item-success')
        done = !done;
        newTask.done = done; 
        localStorage.setItem(keyStorage, JSON.stringify(tasksArray));
      })
      todoItem.deleteButton.addEventListener('click', function(){
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();
          tasksArray.splice(i, 1)
          localStorage.setItem(keyStorage, JSON.stringify(tasksArray))
        }
      })
      todoList.append(todoItem.item);
      newTask.name = todoItemForm.input.value;
     
      
      tasksArray.push(newTask);
      localStorage.setItem(keyStorage, JSON.stringify(tasksArray));
     


      // console.log(tasksArray);

      todoItemForm.input.value = '';
      todoItemForm.button.classList.add('disabled');
    })


    // console.log (tasksArray);
   

    // let tasks = [];

    // tasks = Array.from(todoList.querySelectorAll('.list-group-item'));
    // localStorage.setItem(keyStorage, JSON.stringify(tasks));
    // let arr =  JSON.parse(localStorage.getItem(keyStorage));
    // console.log(arr);
  }

  // window.addEventListener('onuload', function() {
  //   var preloaded = sessionStorage.getItem('preloaded');
  //   if(preloaded) {
  //     beforeReload();
  //   } else {
  //     sessionStorage.setItem('preloaded', true);
  //   }
  // })
  
  window.createTodoApp = createTodoApp;
 


})();

// Modelo

class Task {
    constructor(id, title, description, completed, priority, tag, dueDate) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.completed = completed;
      this.priority = priority;
      this.tag = tag;
      this.dueDate = dueDate;
    }
}

function mapAPIToTasks(data) {
    return data.map(item => {
        return new Task(
            item.id,
            item.title,
            item.description,
            item.completed,
            item.priority,
            item.tag,
            (new Date(item.dueDate))
        );
    });  
}

function oneTask(data) {
    return new Task(
      data.id,
      data.title,
      data.description,
      data.completed,
      data.priority,
      data.tag,
      (new Date(data.dueDate)),
    );
}

/*
const task1= new Task(1,"Limpiar carro","Vaciar carro y llevarlo a lavar","no-completada","baja","Salud",Date("2023-10-28"));
const task2= new Task(2,"Terminar trabajos","hacer todas las tareas, exposiciones y proyectos","no-completada","baja","Escuela",Date("2023-10-28"));
const taskList = [task1,task2];
*/

// views

function displayTasks(tasks) {

    clearList();

    const list = document.getElementById('to-do-list');

    tasks.forEach(task => {

        const card = document.createElement('div');
        card.className = 'list-element';
        card.innerHTML = `
                    <div class="task-information">
                        <h3>${task.title}&nbsp;&nbsp;&nbsp; -> &nbsp;&nbsp;&nbsp;${formatDate(task.dueDate)}</h3>
                        <div class="tag-container">
                        <p class="tag">Prioridad ${task.priority}</p>
                        <p class="tag">${task.tag}</p>
                        <p class="tag">Completada = ${task.completed}</p>
                        </div>
                        <p>${task.description}</p>

                    </div>
                    <div class="btn-container">
                    <button class="btn-update" alt="editar" data-task-id=${task.id}><i class="fa-regular fa-pen-to-square"></i></button>
                    <button class="btn-delete" alt="eliminar" data-task-id=${task.id}><i class="fa-regular fa-trash-can"></i></button>
                    </div>
        `;
        list.appendChild(card);
    })

    initDeleteTaskButtonHandler();
    initUpdateTaskButtonHandler();

}

function clearList(){
    const listBody = document.getElementById('to-do-list');
    listBody.innerHTML = '';
}
// #region AddTask
// boton para agregar 
function initAddTaskButtonsHandler() {

    document.getElementById('add-task').addEventListener('click', () => {
      openAddTaskModal()
    });
  
    document.getElementById('modal-background').addEventListener('click', () => {
      closeAddTaskModal();
    });
  
    document.getElementById('add-task-form').addEventListener('submit', event => {
      event.preventDefault();
      processSubmitTask();
    });
  
  }

  function openAddTaskModal() {
    document.getElementById('add-task-form').reset();
    document.getElementById('modal-background').style.display = 'block';
    document.getElementById('modal-create').style.display = 'block';
  }
  
  
  function closeAddTaskModal() {
    document.getElementById('add-task-form').reset();
    document.getElementById('modal-background').style.display = 'none';
    document.getElementById('modal-create').style.display = 'none';
  }
  
  
  function processSubmitTask() {
    const title = document.getElementById('task-title-field').value;
    const description = document.getElementById('description-field').value;
    const completed = document.getElementById('completed-field').value;
    const priority = document.getElementById('priority-field').value;
    const tag = document.getElementById('tag-field').value;

    const dueDateInput = document.getElementById('due-date-field').value;
    const dueDate = formatDate(new Date(dueDateInput));

    console.log(dueDate);

    const taskToSave = new Task(
      null,
      title,
      description,
      completed,
      priority,
      tag,
      dueDate
    );
  
    createTask(taskToSave);
  }
  
  //#endregion

// #region UpdateTask
  // boton para editar
  function initUpdateTaskButtonHandler() {
    document.querySelectorAll('.btn-update').forEach(button => {
      
        button.addEventListener('click', () => {

        const taskId = button.getAttribute('data-task-id');
        
        openUpdateTaskModal();
        getTaskById(taskId);
        console.log(taskId);
        

      });
    });

    document.getElementById('modal-background').addEventListener('click', () => {
        closeUpdateTaskModal();
      });

    document.getElementById('update-task-form').addEventListener('submit', event => {
        event.preventDefault();
        processUpdateTask();
      });

  }
  
  function openUpdateTaskModal() {
    document.getElementById('update-task-form').reset();
    document.getElementById('modal-background').style.display = 'block';
    document.getElementById('modal-update').style.display = 'block';
  }

  function closeUpdateTaskModal() {
    document.getElementById('update-task-form').reset();
    document.getElementById('modal-background').style.display = 'none';
    document.getElementById('modal-update').style.display = 'none';
  }

  function loadTaskIntoForm(task) {
    document.getElementById('update-task-title-field').value = task.title;
    document.getElementById('update-description-field').value = task.description;
    document.getElementById('update-completed-field').value = task.completed;
    document.getElementById('update-priority-field').value = task.priority;
    document.getElementById('update-tag-field').value = task.tag;
    document.getElementById('update-due-date-field').value = task.dueDate;
}

  function processUpdateTask(taskId) {
    const title = document.getElementById('update-task-title-field').value;
    const description = document.getElementById('update-description-field').value;
    const completed = document.getElementById('update-completed-field').value;
    const priority = document.getElementById('update-priority-field').value;
    const tag = document.getElementById('update-tag-field').value;
  
    const dueDateInput = document.getElementById('update-due-date-field').value;
    const dueDate = formatDate(new Date(dueDateInput));

    const existingTask = getTaskById(taskId);
        existingTask.title = title;
        existingTask.description = description;
        existingTask.completed = completed;
        existingTask.priority = priority;
        existingTask.tag = tag;
        existingTask.dueDate = dueDate;
  
        updateTask(existingTask);
  
    }
// #endregion

// #region btn delete Task
// boton Borrar
function initDeleteTaskButtonHandler() {

    document.querySelectorAll('.btn-delete').forEach(button => {
  
      button.addEventListener('click', () => {
  
        const taskId = button.getAttribute('data-task-id'); // Obtenemos el ID de la venta
        deleteTask(taskId); // Llamamos a la función para eleminar la venta

    });
  
    });
  
  }
// #endregion

// #region API
function getTaskById(taskId) {
    fetchAPI(`${apiURL}/users/219222258/tasks/${taskId}`, 'GET')
      .then(data => {
        const task = oneTask(data);
        loadTaskIntoForm(task);
        console.log("get task data");
        console.log(task);

      });
  }

function getTasksData() {
    fetchAPI(`${apiURL}/users/219222258/tasks`, 'GET')
      .then(data => {
        const tasksList = mapAPIToTasks(data);
        displayTasks(tasksList);
        
      });
  
  }

  function createTask(task) {
  
    fetchAPI(`${apiURL}/users/219222258/tasks`, 'POST', task)
      .then(task => {
        closeAddTaskModal();
        getTasksData();
        window.alert(`Tarea ${task.id} agregada correctamente`);
      });
  
  }
  
  function updateTask(task) {
  
    fetchAPI(`${apiURL}/users/219222258/tasks/${task.id}`, 'PUT', task)
      .then(task => {
        closeUpdateTaskModal();
        getTasksData();
        window.alert(`Tarea ${task.id} modificada correctamente`);
      });
  
  }

  function deleteTask(taskId) {
  
    const confirm = window.confirm(`¿seguro que desea eliminar task: ${taskId}?`);
  
    if (confirm) {
  
      fetchAPI(`${apiURL}/users/219222258/tasks/${taskId}`, 'DELETE')
        .then(() => {
          getTasksData();
          window.alert("Tarea eliminada.");
        });
  
    }
  }
//#endregion 

// controlador
getTasksData()
initAddTaskButtonsHandler();

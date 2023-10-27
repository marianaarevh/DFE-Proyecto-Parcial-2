
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

function mapAPIToTask(data) {
    return data.map(item => {
        return new Task(
            item.id,
            item.title,
            item.description,
            item.completed,
            item.priority,
            item.tag,
            new Date(item.dueDate)
        );
    });  
}
const task1= new Task(1,"Limpiar carro","Vaciar carro y llevarlo a lavar","no-completada","baja","Salud",Date("2023-10-28"));
const task2= new Task(2,"Terminar trabajos","hacer todas las tareas, exposiciones y proyectos","no-completada","baja","Escuela",Date("2023-10-28"));
const taskList = [task1,task2];

/* views */
function displayTasks(tasks) {
    const list = document.getElementById('to-do-list');

    tasks.forEach(task => {
        const card = document.createElement('div');
        card.className = 'list-element';
        card.innerHTML = `
                    <div class="task-information">
                        <h3>${task.title} - Oct 26 2023 </h3>
                        <p>description: ${task.description}</p>
                        <p>status: ${task.completed}</p>
                        <p>tag: ${task.tag}</p>
                    </div>
        `;
        list.appendChild(card);
    })
}

// controlador
displayTasks(taskList);
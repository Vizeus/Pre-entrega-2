// Definición de la clase Tarea
class Tarea {
    constructor(nombre) {
        this.nombre = nombre // Inicializa la tarea con un nombre
    }

    // Método para crear un elemento de lista (<li>) para la tarea
    crearElemento() {
        const elementoLista = document.createElement('li') // Crea un nuevo elemento <li>
        elementoLista.textContent = this.nombre // Establece el texto del elemento con el nombre de la tarea

        // Añade un evento de clic al elemento <li>
        elementoLista.addEventListener('click', () => {
            elementoLista.remove() // Elimina el elemento <li> del DOM
            this.eliminar() // Llama al método para eliminar la tarea del almacenamiento local
        })

        return elementoLista // Devuelve el elemento <li> creado
    }

    // Método para eliminar la tarea
    eliminar() {
        const elementoLista = document.querySelector(`li:contains('${this.nombre}')`) // Encuentra el elemento <li> correspondiente
        if (elementoLista) {
            elementoLista.remove() // Elimina el elemento <li> del DOM
            this.eliminarDeAlmacenamiento() // Elimina la tarea del almacenamiento local
        }
    }

    // Método para eliminar la tarea del almacenamiento local
    eliminarDeAlmacenamiento() {
        let tareas = JSON.parse(localStorage.getItem('tareas')) || [] // Recupera las tareas guardadas
        tareas = tareas.filter(t => t !== this.nombre) // Filtra la lista para eliminar la tarea actual
        localStorage.setItem('tareas', JSON.stringify(tareas)) // Guarda la lista actualizada en el almacenamiento local
    }

    // Método para guardar una tarea en el almacenamiento local
    guardar() {
        const tareas = JSON.parse(localStorage.getItem('tareas')) || [] // Recupera las tareas guardadas
        tareas.push(this.nombre) // Añade el nombre de la tarea a la lista
        localStorage.setItem('tareas', JSON.stringify(tareas)) // Guarda la lista actualizada en el almacenamiento local
    }
}

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Obtiene referencias a los elementos del DOM
    const formularioTarea = document.getElementById('formularioTarea') // El formulario para añadir nuevas tareas
    const entradaTarea = document.getElementById('entradaTarea') // El campo de entrada para el nombre de la tarea
    const listaTareas = document.getElementById('listaTareas') // El contenedor donde se mostrarán las tareas
    const botonCambiarColor = document.getElementById('cambiarColor') // El botón para cambiar el color de fondo

    // Carga las tareas guardadas desde el almacenamiento local
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || []
    tareasGuardadas.forEach(tareaNombre => {
        const tarea = new Tarea(tareaNombre) // Crea una nueva instancia de la tarea
        listaTareas.appendChild(tarea.crearElemento()) // Añade el elemento de la tarea a la lista en el DOM
    })

    // Carga el color de fondo guardado desde el almacenamiento de sesión
    const fondoGuardado = sessionStorage.getItem('fondo')
    if (fondoGuardado === 'azul') {
        document.body.classList.add('fondoAzul') // Aplica la clase de fondo azul si está guardada
    }

    // Maneja el envío del formulario para añadir nuevas tareas
    formularioTarea.addEventListener('submit', (evento) => {
        evento.preventDefault() // Previene el comportamiento predeterminado del formulario (recarga de página)
        const tareaNombre = entradaTarea.value.trim() // Obtiene y limpia el valor del campo de entrada
        if (tareaNombre) {
            const tarea = new Tarea(tareaNombre) // Crea una nueva instancia de la tarea
            listaTareas.appendChild(tarea.crearElemento()) // Añade el elemento de la tarea a la lista en el DOM
            tarea.guardar() // Guarda la tarea en el almacenamiento local
            entradaTarea.value = '' // Limpia el campo de entrada después de añadir la tarea
        }
    })

    // Maneja el clic en el botón para cambiar el color de fondo
    botonCambiarColor.addEventListener('click', () => {
        if (document.body.classList.contains('fondoAzul')) {
            document.body.classList.remove('fondoAzul') // Elimina la clase de fondo azul si está presente
            sessionStorage.removeItem('fondo') // Borra la preferencia del almacenamiento de sesión
        } else {
            document.body.classList.add('fondoAzul') // Añade la clase de fondo azul si no está presente
            sessionStorage.setItem('fondo', 'azul') // Guarda la preferencia en el almacenamiento de sesión
        }
    })
})

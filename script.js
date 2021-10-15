const addBtn = document.querySelector('.add');

const noteArray = JSON.parse(localStorage.getItem('notes')) || []

if (noteArray) {
    noteArray.forEach(note => addNote(note))
}

addBtn.addEventListener('click', () => addNote());

function addNote(text="") {
    const notesEl = document.createElement('div');
    notesEl.classList.add('notes');

    notesEl.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}" ></textarea>
    `;

    const editBtn = notesEl.querySelector('.edit');
    const deleteBtn = notesEl.querySelector('.delete');
    const main = notesEl.querySelector('.main');
    const textArea = notesEl.querySelector('textarea');

    main.innerHTML = text;
    textArea.value = text;
    
    
    
    
    deleteBtn.addEventListener('click', () => {
        notesEl.remove();

        updateLocalStorage()
    })

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input', (e) => {
        const {value} = e.target;
        main.innerHTML = value;

        updateLocalStorage()
    })



    document.body.appendChild(notesEl);
}

function updateLocalStorage() {
    const noteList = document.querySelectorAll('textarea')
    const noteArray = []
    noteList.forEach(note => noteArray.push(note.value))

    localStorage.setItem('notes', JSON.stringify(noteArray))
}
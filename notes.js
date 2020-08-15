const fs = require('fs');
const chalk = require('chalk');


const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title)
    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("new note added!"))
    } else {
        console.log(chalk.red.inverse("note title taken"))
    }
}

const removeNote = title => {
    const notes = loadNotes();
    const notesSansRemoved = [...notes].filter(note => note.title !== title);
    if (notes.length > notesSansRemoved.length) {
        saveNotes(notesSansRemoved);
        console.log(chalk.green.inverse("Note Removed"));
    } else {
        console.log(chalk.red.inverse("No Note found"));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.magenta("Your notes..."));
    notes.forEach(note => console.log(note.title));
}

const readNote = title => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title)
    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse("No note found"));
    }
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}; 
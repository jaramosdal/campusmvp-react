var express = require("express")
var app = express()

var listaTareas = []

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
    <title>Gestor de tareas (solo servidor)</title>
    <header>
        <h1>Gestor de tareas</h1>
        <p>Este gestor de tareas consiste en una página HTML estática que se comunica con un servidor. Esta aplicación no dispone de JavaScript en el lado del cliente para actualizar ni modificar la información</p>
    </header>
    <main>
        <h2>Tareas disponibles</h2>
        <ul>${listaTareas.map(({ titulo }) => `<li>${titulo}</li>`).join("")}</ul>
        <form action="/add" method="GET">
            <input type="text" name="titulo" placeholder="Nueva tarea" autofocus autocomplete="off">
            <input type="submit" value="Añadir">
        </form>
    </main>`)
})

app.get('/add', (req, res) => {
    // simula un tiempo de respuesta lento
    setTimeout(() => res.redirect('/'), 800)
    listaTareas.push(req.query)
})

app.listen(4000)
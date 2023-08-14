const API_BASEURL = "http://localhost:3000"

const api = endpoint => {
  const req = (id, method = "GET", body) => 
    fetch(API_BASEURL + endpoint + (id ? `/${id}` : ""), {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : null
    }).then(r => r.json())

  return {
    get: (id) => req(id),
    post: content => req(null, "POST", content),
    patch: (id, content) => req(id, "PATCH", content),
    delete: id => req(id, "DELETE")
  }
}

const cliente = {
  tareas: api("/tareas"),
  tablero: api("/tablero")
}

export default cliente
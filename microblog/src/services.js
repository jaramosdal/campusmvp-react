const API_BASEURL = "http://localhost:3000";
const api = (endpoint, method = "GET", body) => {
  return fetch(API_BASEURL + endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  }).then((r) => r.json());
};

export const getBlog = () =>
  api("/posts").then((ps) =>
    ps.sort((a, b) => Date.parse(b.fecha) - Date.parse(a.fecha))
  );

export const getAuthor = (autorId) => api(`/cuentas/${autorId}`);

export const editPost = (id, contenido) =>
  api(`/posts/${id}`, "PATCH", { contenido });

export const saveNewPost = (contenido) =>
  api("/posts", "POST", {
    contenido,
    autoria: 1,
    fecha: new Date().toISOString(),
  });

export const deletePost = (id) => api(`/posts/${id}`, "DELETE");

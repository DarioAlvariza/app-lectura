const form = document.getElementById("form-libro");
const tituloInput = document.getElementById("titulo");
const autorInput = document.getElementById("autor");
const estadoInput = document.getElementById("estado");

let libros = JSON.parse(localStorage.getItem("libros")) || [];

function guardarLibros() {
  localStorage.setItem("libros", JSON.stringify(libros));
}

function renderizarLibros() {
  document.getElementById("lista-quiero").innerHTML = "";
  document.getElementById("lista-leyendo").innerHTML = "";
  document.getElementById("lista-leido").innerHTML = "";

  libros.forEach((libro, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${libro.titulo}</strong> de ${libro.autor}`;

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "✏️ Editar";
    btnEditar.onclick = () => editarLibro(index);

    if (libro.estado === "quiero") {
      li.appendChild(btnEditar);
      document.getElementById("lista-quiero").appendChild(li);
    } else if (libro.estado === "leyendo") {
      li.appendChild(btnEditar);
      document.getElementById("lista-leyendo").appendChild(li);
    } else if (libro.estado === "leido") {
      li.appendChild(btnEditar);
      document.getElementById("lista-leido").appendChild(li);
    }
  });
}

function editarLibro(index) {
  const nuevoEstado = prompt(
    "Nuevo estado (quiero, leyendo, leido):",
    libros[index].estado
  );
  if (nuevoEstado === "quiero" || nuevoEstado === "leyendo" || nuevoEstado === "leido") {
    libros[index].estado = nuevoEstado;
    guardarLibros();
    renderizarLibros();
  } else {
    alert("Estado inválido.");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titulo = tituloInput.value.trim();
  const autor = autorInput.value.trim();
  const estado = estadoInput.value;

  if (libros.some((libro) => libro.titulo.toLowerCase() === titulo.toLowerCase())) {
    alert("Ese libro ya fue agregado.");
    return;
  }

  libros.push({ titulo, autor, estado });
  guardarLibros();
  renderizarLibros();

  form.reset();
});

renderizarLibros();




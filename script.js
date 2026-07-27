const toast = document.getElementById("toast");

// Configuração
const perfilconfigbtn = document.getElementById("perfil-config-btn");
const perfilconfig = document.getElementById("perfil-config");

// Visualização das notas
const notesContainer = document.getElementById("notes-container");
const notesEditor = document.getElementById("notes-editor");
const viewNoteContainer = document.getElementById("view-note-container");

const notesList = document.getElementById("notes-list");
const notes = document.querySelectorAll(".notes");
const noteTitle = document.querySelectorAll(".note-title");

const newDraft = document.getElementById("new-draft");
const newNote = document.querySelectorAll(".new-note");

// Navegação
const gridViewBtn = document.getElementById("grid-view-btn");
const listViewBtn = document.getElementById("list-view-btn");

const editorReturnBtn = document.getElementById("editor-return-btn");
const viewReturnBtn = document.getElementById("view-return-btn");

// Editor
const title = document.getElementById("title");
const textArea = document.getElementById("text-content");
const saveBtn = document.getElementById("save-btn")
const editorTagsContainer = document.getElementById("editor-tags-container")

// Toolbar
const titleH1Btn = document.getElementById("title-h1-btn");
const titleH2Btn = document.getElementById("title-h2-btn");
const boldBtn = document.getElementById("bold-btn");
const italicBtn = document.getElementById("italic-btn");
const codeBtn = document.getElementById("code-btn");
const listBtn = document.getElementById("list-btn");
const list0lBtn = document.getElementById("list-ol-btn");
const quoteBtn = document.getElementById("quote-btn");
const imageBtn = document.getElementById("image-btn");
const tagBtn = document.getElementById("tag-btn");

// Modal de imagem
const imageInsertContainer = document.getElementById("image-insert-container");
const imgAlt = document.getElementById("img-alt");
const imgUrl = document.getElementById("img-url");
const imageInsertBtn = document.getElementById("image-insert");
const cancelImageInsertBtn = document.getElementById("cancel-image-insert");

// Modal tag
const tagsInsertContainer = document.getElementById("tags-insert-container")
const tagInsertInput = document.getElementById("tag-insert-input")
const tagInsertBtn = document.getElementById("tag-insert")

perfilconfigbtn.addEventListener("change", (event) => {
    perfilconfig.setAttribute("class", event.target.checked ? "ativo" : "")
});

gridViewBtn.addEventListener("click", () => {
    notesList.style.flexDirection = "row";
    notesList.style.flexWrap = "wrap";
    aplicarGrid();
});

listViewBtn.addEventListener("click", () => {
    notesList.style.flexDirection = "column";
    notesList.style.flexWrap = "nowrap";
    notesList.style.alignItems = "center";
    aplicarLista();
});

function aplicarLista() {
    document.querySelectorAll(".notes").forEach(note => {
        note.style.width = "80%";
        note.style.padding = "30px 50px";
    });

    newDraft.style.width = "80%";
}

function aplicarGrid() {
    document.querySelectorAll(".notes").forEach((note) => {
        note.style.width = "";
        note.style.padding = "";
    });

    newDraft.style.width = "";
} 

newNote.forEach((button) => {
    button.addEventListener("click", () => {
        notesContainer.style.display = "none";
        notesEditor.style.display = "flex";
    });
})

viewReturnBtn.addEventListener("click", () => {
    notesContainer.style.display = "flex";
    viewNoteContainer.style.display = "none";
})

editorReturnBtn.addEventListener("click", () => {
    notesContainer.style.display = "flex";
    notesEditor.style.display = "none";
})

function ajustarAlturaTextarea() {
    textArea.style.height = "auto";
    textArea.style.height = textArea.scrollHeight + "px";
}

textArea.addEventListener("input", ajustarAlturaTextarea);

ajustarAlturaTextarea();

function aplicarMarcadores(inicio, fim) {
    textArea.focus();

    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;

    const textSelected = textArea.value.slice(start, end)

    textArea.setRangeText(
        inicio + textSelected + fim,
        start,
        end,
        "select"
    );
}

function aplicarMarcadorLista(prefixo) {
    textArea.focus();

    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;

    const textoSelected = textArea.value.slice(start, end)

    const newText = textoSelected.split("\n").map(linha => prefixo + linha).join("\n")

    textArea.setRangeText(
        newText,
        start,
        end,
        "select"
    )
}

function aplicarMarcadorListaOl() {
    textArea.focus();

    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;

    const textoSelected = textArea.value.slice(start, end)

    const newText = textoSelected.split("\n").map((linha, index) => `${index + 1}. ${linha}`).join("\n")

    textArea.setRangeText(
        newText,
        start,
        end,
        "select"
    )
}

function aplicarMarcadorImagem() {

}

titleH1Btn.addEventListener("click", () => {
    aplicarMarcadores("# ", "");
})

titleH2Btn.addEventListener("click", () => {
    aplicarMarcadores("## ", "");
})

boldBtn.addEventListener("click", () => {
    aplicarMarcadores("**", "**");
})

italicBtn.addEventListener("click", () => {
    aplicarMarcadores("*", "*");
})

codeBtn.addEventListener("click", () => {
    aplicarMarcadores("`", "`");
})

listBtn.addEventListener("click", () => {
    aplicarMarcadorLista("- ");
})

list0lBtn.addEventListener("click", () => {
    aplicarMarcadorListaOl()
})

quoteBtn.addEventListener("click", () => {
    aplicarMarcadores('"', '"');
})

imageBtn.addEventListener("change", (event) => {
    imageInsertContainer.setAttribute("class", event.target.checked ? "ativo" : "")
});

cancelImageInsertBtn.addEventListener("click", () => {
    imgAlt.value = '';
    imgUrl.value = '';
    imageBtn.checked = false;
    imageInsertContainer.removeAttribute("class")
});

function validarImgUrl() {
    const url = imgUrl.value.trim();
    const alt = imgAlt.value.trim();

    if (url == "") {
        alert("Informe a URL da imagem.")
        imgUrl.focus();
        return false
    }

    const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|gif|webp)/g;

    if (!urlRegex.test(url)) {
        alert("Informe uma URL de imagem válida.");
        imgUrl.focus();
        return false
    }

    return {
        url,
        alt
    };
}

imageInsertBtn.addEventListener("click", () => {
    const dados = validarImgUrl();

    if (!dados) return;

    const markdown = `![${dados.alt}](${dados.url})`;

    textArea.setRangeText(
        markdown,
        textArea.selectionStart,
        textArea.selectionEnd,
        "end"
    )

    imgAlt.value = '';
    imgUrl.value = '';
    imageBtn.checked = false;
    imageInsertContainer.removeAttribute("class")
});

tagBtn.addEventListener("change", (event) => {
    tagsInsertContainer.setAttribute("class", event.target.checked ? "ativo" : "")
});

function mostrarTagEditor() {
    const tag = document.createElement("div");
    tag.className = "editor-note-tag";

    tag.innerHTML = `
        ${tagInsertInput.value}
        <button class="remove-editor-tag">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

    tag.querySelector("button").addEventListener("click", () => {
        tag.remove();
    });

    editorTagsContainer.appendChild(tag);
}

let tags_array = []

tagInsertBtn.addEventListener("click", () => {
    const valor = tagInsertInput.value.trim();

    if (!valor) return;

    if (tags_array.includes(valor)) {
        mostrarToast("Essa tag já foi adicionada.");
        return;
    }

    mostrarTagEditor();

    tags_array.push(tagInsertInput.value)
    tagInsertInput.value = "";
    tagInsertInput.focus();
})

function mostrarToast(mensagem) {
    toast.textContent = mensagem;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function criarId() {
    return crypto.randomUUID()
}

function salvarNota() {
    const nota = {
        id: crypto.randomUUID(),
        titulo: title.value,
        conteudo: textArea.value,
        favorito: false,
        arquivado: false,
        tags: [...tags_array],
        data: new Date().toISOString()
    };

    const notas = JSON.parse(localStorage.getItem("notas")) || [];

    notas.push(nota);

    localStorage.setItem("notas", JSON.stringify(notas));

}

saveBtn.addEventListener("click", () => {
    mostrarToast("Salvando nota...");

    salvarNota();

    exibirNotas();

    setTimeout(() => {
        mostrarToast("Nota salva com sucesso!");
    }, 1000);

    tags_array = [];
    title.value = '';
    textArea.value = '';
    editorTagsContainer.innerHTML = "";
})

function exibirNotas() {
    const notas = JSON.parse(localStorage.getItem("notas")) || [];

    notesList.innerHTML = "";

    notas.forEach((nota) => {
        const tags = nota.tags.map(tag => `<span class="tag">${tag}</span>`).join("")

        const card = document.createElement('div')
        card.className = "notes"
        card.dataset.id = nota.id;

        card.innerHTML = `
            <h3 class="card-note-title">${nota.titulo}</h3>
            <p class="note-content limitado">${nota.conteudo}</p>
            <div class="note-tags">
                ${tags}
            </div>

            <div class="note-footer">
                <p class="note-date">${new Date(nota.data).toLocaleDateString()}</p>
                <ul>
                    <li>
                        <label class="note-action">
                            <input type="checkbox" class="note-favorite" ${nota.favorito ? "checked" : ""}>
                            <i class="fa-regular fa-star"></i>
                        </label>
                    </li>

                    <li>
                        <label class="note-action">
                            <input type="checkbox" class="note-archive" ${nota.arquivado ? "checked" : ""}>
                            <i class="fa-solid fa-box-archive"></i>
                        </label>
                    </li>

                    <li>
                        <button class="note-delete">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </li>

                    <li>
                        <button class="note-edit">
                            <i class="fa-regular fa-edit"></i>
                        </button>
                    </li>
                </ul>
            </div>
        `;

        notesList.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", exibirNotas);

function excluirNota(id) {
    const notas = JSON.parse(localStorage.getItem("notas")) || [];

    const novasNotas = notas.filter(nota => nota.id !== id);

    localStorage.setItem("notas", JSON.stringify(novasNotas));

    exibirNotas();
}

notesList.addEventListener("click", (event) => {

    // Excluir nota
    const deleteBtn = event.target.closest(".note-delete");

    if (deleteBtn) {
        const id = deleteBtn.closest(".notes").dataset.id;
        excluirNota(id);
        return;
    }

    // Abrir nota
    const titulo = event.target.closest(".card-note-title");

    if (titulo) {
        notesContainer.style.display = "none";
        viewNoteContainer.style.display = "flex";
    }

});
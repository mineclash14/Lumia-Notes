// Toast
const toast = document.getElementById("toast");

// Sidebar nav
const sidebarNotesBtn = document.getElementById("notas");
const sidebarFavBtn = document.getElementById("favoritos");
const sidebarArquivBtn = document.getElementById("arquivadas");

// Configuração
const perfilconfigbtn = document.getElementById("perfil-config-btn");
const perfilconfig = document.getElementById("perfil-config");

// Visualização das notas
const notesContainer = document.getElementById("notes-container");
const notesContFavorite = document.getElementById("notes-container-favorite")
const notasContArchive = document.getElementById("notes-container-archive")

const notesEditor = document.getElementById("notes-editor");
const viewNoteContainer = document.getElementById("view-note-container");

const viewNoteInfo = document.getElementById("view-note-info")
const viewNote = document.getElementById("view-note")

const notesList = document.getElementById("notes-list");
const favoriteList = document.getElementById("notes-list-favorite")
const archiveList = document.getElementById("notes-list-archive")

const notes = document.querySelectorAll(".notes");
const noteTitle = document.querySelectorAll(".note-title");

const newDraft = document.getElementById("new-draft");
const newNote = document.querySelectorAll(".new-note");

// Navegação
const gridViewBtn = document.querySelectorAll(".grid-view-btn");
const listViewBtn = document.querySelectorAll(".list-view-btn");

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

// Statistics 
const statisticValueNotes = document.getElementById("statistic-value-notes");
const statisticValueFavorito = document.getElementById("statistic-value-favorito")
const statisticValueArchive = document.getElementById("statistic-value-archive")

sidebarNotesBtn.addEventListener("click", () => {
    notesContainer.style.display = "flex"
    notesContFavorite.style.display = "none"
    notasContArchive.style.display = "none"
    notesEditor.style.display = "none"
    viewNoteContainer.style.display = "none"
    renderizarNotas(notasNormais, notesList);
})

sidebarFavBtn.addEventListener("click", () => {
    notesContainer.style.display = "none"
    notesContFavorite.style.display = "flex"
    notasContArchive.style.display = "none"
    notesEditor.style.display = "none"
    viewNoteContainer.style.display = "none"
    renderizarNotas(favoritos, favoriteList);
})

sidebarArquivBtn.addEventListener("click", () => {
    notesContainer.style.display = "none"
    notesContFavorite.style.display = "none"
    notasContArchive.style.display = "flex"
    notesEditor.style.display = "none"
    viewNoteContainer.style.display = "none"
    renderizarNotas(arquivadas, archiveList);
})

perfilconfigbtn.addEventListener("change", (event) => {
    perfilconfig.setAttribute("class", event.target.checked ? "ativo" : "")
});

gridViewBtn.forEach((button) => {
    button.addEventListener("click", () => {
        notesList.style.flexDirection = "row";
        notesList.style.flexWrap = "wrap";
        aplicarGrid();
    });
})

listViewBtn.forEach((button) => {
    button.addEventListener("click", () => {
        notesList.style.flexDirection = "column";
        notesList.style.flexWrap = "nowrap";
        notesList.style.alignItems = "center";
        aplicarLista();
    });
})

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

function atualizarContadorNotas() {
    const notas = JSON.parse(localStorage.getItem("notas")) || [];
    statisticValueNotes.textContent = notas.length;
}

saveBtn.addEventListener("click", () => {
    mostrarToast("Salvando nota...");

    salvarNota();

    exibirNotas();

    setTimeout(() => {
        mostrarToast("Nota salva com sucesso!");
    }, 2000);

    atualizarContadorNotas()

    tags_array = [];
    title.value = '';
    textArea.value = '';
    editorTagsContainer.innerHTML = "";
})

function filtrarNotas() {
    // Notas
    const notas = JSON.parse(localStorage.getItem("notas")) || [];

    // Seção Notas
    const notasNormais = notas;

    // Seção Favoritos
    const favoritos = notas.filter(nota =>
        nota.favorito && !nota.arquivado
    );

    // Seção Arquivadas
    const arquivadas = notas.filter(nota =>
        nota.arquivado
    );

    return {
        notasNormais,
        favoritos,
        arquivadas
    };
}

const { notasNormais, favoritos, arquivadas } = filtrarNotas();

function renderizarNotas(lista, container) {
    container.innerHTML = "";

    lista.forEach((nota) => {
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

        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", 
    renderizarNotas(notasNormais, notesList),
    atualizarContadorNotas(),
    atualizarContadorFavoritos(),
    atualizarContadorArquivados());

function excluirNota(id) {
    const notas = JSON.parse(localStorage.getItem("notas")) || [];

    const novasNotas = notas.filter(nota => nota.id !== id);

    localStorage.setItem("notas", JSON.stringify(novasNotas));

    atualizarContadorNotas()

    exibirNotas();
}

function  exibirNotasView(id) {
    const notas = JSON.parse(localStorage.getItem("notas")) || [];

    const nota = notas.find(n => n.id === id);

    if (!nota) return;

    viewNoteInfo.innerHTML = "";

    const tags = nota.tags.map(tag => `<span class="tag">${tag}</span>`).join("")

    const noteTags = document.createElement('div')
    noteTags.className = "note-tags"

    noteTags.innerHTML = `
        ${tags}
    `

    const noteDate = document.createElement("p");
    noteDate.className = "note-date";
    noteDate.textContent = new Date(nota.data).toLocaleDateString();

    viewNoteInfo.appendChild(noteTags);
    viewNoteInfo.appendChild(noteDate);    

    viewNote.innerHTML = `
        <h1 id="view-note-title" class="note-title">${nota.titulo}</h1>
        <div id="view-note-content" class="note-content">${nota.conteudo}</div>
    `;
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
        const id = titulo.closest(".notes").dataset.id;

        notesContainer.style.display = "none";
        viewNoteContainer.style.display = "flex";
        
        exibirNotasView(id);
    }

});

function atualizarContadorFavoritos() {
    const notas = JSON.parse(localStorage.getItem("notas")) || [];

    const totalFavoritas = notas.filter(nota => nota.favorito).length;

    statisticValueFavorito.textContent = totalFavoritas;
}

function atualizarContadorArquivados() {
    const notas = JSON.parse(localStorage.getItem("notas")) || [];

    const totalArquivados = notas.filter(nota => nota.arquivado).length

    statisticValueArchive.textContent = totalArquivados
}

notesList.addEventListener("change", (event) => {

    if (event.target.classList.contains("note-favorite")) {
        const id = event.target.closest(".notes").dataset.id;
        const notas = JSON.parse(localStorage.getItem("notas")) || [];

        const nota = notas.find(n => n.id === id);

        if (!nota) return;

        nota.favorito = event.target.checked;

        localStorage.setItem("notas", JSON.stringify(notas));

        atualizarContadorFavoritos();
    }

    if (event.target.classList.contains("note-archive")) {
        const id = event.target.closest(".notes").dataset.id;
        const notas = JSON.parse(localStorage.getItem("notas")) || [];

        const nota = notas.find(n => n.id === id);

        if (!nota) return;

        nota.arquivado = event.target.checked;

        localStorage.setItem("notas", JSON.stringify(notas));

        atualizarContadorArquivados();
    }

});

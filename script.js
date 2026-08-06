// Toast

const toast = document.querySelector(".toast");

// Sidebar

const sidebarElements = {
    sidebar: document.querySelector(".sidebar"),
    sidebarNotesBtn: document.getElementById("notes-tab"),
    sidebarFavBtn: document.getElementById("favorites-tab"),
    sidebarArquivBtn: document.getElementById("archive-tab"),
}

// Search 

const searchElements = {
    searchInput: document.querySelectorAll(".search"),
    searchMobileInput: document.querySelector(".search-mobile-input"),
    searchMobileBtn: document.querySelector(".search-mobile-btn")
}

// Show sidebar

const showSidebarElements = {
    showSidebarMobileBtn: document.getElementById("show-sidebar-mobile-btn"),
    closeSidebarMobileBtn: document.querySelector(".close-sidebar-mobile-btn"),
    tabletSidebarToggle: document.querySelector(".tablet-sidebar-toggle"),
    showSidebarTabletBtn: document.getElementById("show-sidebar-tablet-btn")
}

// Configuração

const perfilconfigbtn = document.getElementById("perfil-config-btn");
const perfilconfig = document.getElementById("perfil-config");

// Visualização das notas

const notesElements = {
    notesContainer: document.getElementById("all-notes-container"),
    notesContFavorite: document.getElementById("notes-container-favorite"),
    notasContArchive: document.getElementById("notes-container-archive"),

    notesEditor: document.getElementById("notes-editor"),
    viewNoteContainer: document.getElementById("view-note-container"),

    viewNoteInfo: document.getElementById("view-note-info"),
    viewNote: document.getElementById("view-note"),

    notesList: document.getElementById("notes-list"),
    favoriteList: document.getElementById("notes-list-favorite"),
    archiveList: document.getElementById("notes-list-archive"),

    notes: document.querySelectorAll(".notes"),
    noteTitle: document.querySelectorAll(".note-title"),

    newDraft: document.getElementById("new-draft"),
    newNote: document.querySelectorAll(".new-note"),
}

// Placeholders

const placeholders = {
    notePlaceholderContainer: document.querySelector(".placeholder-note-container"),
    notePlaceholder: document.querySelector(".placeholder-note-container h2"),
    arquivPlaceholder: document.getElementById("placeholder-archive"),
    favPlaceholder: document.getElementById("placeholder-favorite")
}

// Navegação

const navigationElements = {
    gridViewBtn: document.querySelectorAll(".grid-view-btn"),
    listViewBtn: document.querySelectorAll(".list-view-btn"),

    editorReturnBtn: document.getElementById("editor-return-btn"),
    viewReturnBtn: document.getElementById("view-return-btn")
}

// Editor

const editorElements = { 
    title: document.getElementById("title"),
    textArea: document.getElementById("text-content"),
    saveBtn: document.getElementById("save-btn"),
    editorTagsContainer: document.getElementById("editor-tags-container")
}

// Toolbar

const toolbarElements = {
    titleH1Btn: document.getElementById("title-h1-btn"),
    titleH2Btn: document.getElementById("title-h2-btn"),
    boldBtn: document.getElementById("bold-btn"),
    italicBtn: document.getElementById("italic-btn"),
    codeBtn: document.getElementById("code-btn"),
    listBtn: document.getElementById("list-btn"),
    list0lBtn: document.getElementById("list-ol-btn"),
    quoteBtn: document.getElementById("quote-btn"),
    imageBtn: document.getElementById("image-btn"),
    tagBtn: document.getElementById("tag-btn")
}

// Modal de imagem

const modalImageElements = {
    imageInsertBtn: document.getElementById("image-insert"),
    cancelImageInsertBtn: document.getElementById("cancel-image-insert"),
    imageInsertContainer: document.getElementById("image-insert-container"),
    imgAlt: document.getElementById("img-alt"),
    imgUrl: document.getElementById("img-url")
}

// Modal tag

const modalTagElements = {
    tagsInsertContainer: document.getElementById("tags-insert-container"),
    tagInsertInput: document.getElementById("tag-insert-input"),
    tagInsertBtn: document.getElementById("tag-insert")
}

// Statistics 

const statisticsElements = {
    statisticValueNotes: document.getElementById("statistic-value-notes"),
    statisticValueFavorito: document.getElementById("statistic-value-favorito"),
    statisticValueArchive: document.getElementById("statistic-value-archive")
}

// Mostrar e ocultar sidebar no mobile e tablet

showSidebarElements.showSidebarMobileBtn.addEventListener("change", (event) => {
    event.target.checked ? sidebarElements.sidebar.style.display = "flex" : sidebarElements.sidebar.style.display = "none";
});

showSidebarElements.closeSidebarMobileBtn.addEventListener("click", () => {
    sidebarElements.sidebar.style.display = "none";
    showSidebarElements.showSidebarMobileBtn.checked = false;
});

showSidebarElements.showSidebarTabletBtn.addEventListener("change", (event) => {
    if (event.target.checked) {
        showSidebarElements.tabletSidebarToggle.style.left = "207px";
        sidebarElements.sidebar.style.left = "0px";
    } else {
        showSidebarElements.tabletSidebarToggle.style.left = "";
        sidebarElements.sidebar.style.left = "";
    }
})

// Mostrar telas

function mostrarTela(tela) {
    notesElements.notesContainer.style.display = "none";
    notesElements.notesContFavorite.style.display = "none";
    notesElements.notasContArchive.style.display = "none";
    notesElements.notesEditor.style.display = "none";
    notesElements.viewNoteContainer.style.display = "none";

    tela.style.display = "flex";
}

sidebarElements.sidebarNotesBtn.addEventListener("click", () => {
    mostrarTela(notesElements.notesContainer);
});

sidebarElements.sidebarFavBtn.addEventListener("click", () => {
    mostrarTela(notesElements.notesContFavorite);
});

sidebarElements.sidebarArquivBtn.addEventListener("click", () => {
    mostrarTela(notesElements.notasContArchive);
});

// Configuração do perfil

perfilconfigbtn.addEventListener("change", (event) => {
    perfilconfig.setAttribute("class", event.target.checked ? "ativo" : "")
});

// Mostrar visualização em grid ou lista

function aplicarGrid() {
    notesElements.notesList.classList.remove("list-view");
    notesElements.favoriteList.classList.remove("list-view");
    notesElements.archiveList.classList.remove("list-view");

    notesElements.notesList.classList.add("grid-view");
    notesElements.favoriteList.classList.add("grid-view");
    notesElements.archiveList.classList.add("grid-view");

    notesElements.newDraft.classList.remove("list-view");
}

function aplicarLista() {
    notesElements.notesList.classList.remove("grid-view");
    notesElements.favoriteList.classList.remove("grid-view");
    notesElements.archiveList.classList.remove("grid-view");

    notesElements.notesList.classList.add("list-view");
    notesElements.favoriteList.classList.add("list-view");
    notesElements.archiveList.classList.add("list-view");

    notesElements.newDraft.classList.add("list-view");
}

navigationElements.gridViewBtn.forEach((button) => {
    button.addEventListener("click", aplicarGrid);
});

navigationElements.listViewBtn.forEach((button) => {
    button.addEventListener("click", aplicarLista);
});

// Mostrar editor de notas

notesElements.newNote.forEach((button) => {
    button.addEventListener("click", () => {
        notesElements.notesContainer.style.display = "none";
        notesElements.notesEditor.style.display = "flex";
    });
})

// Retornar para a lista de notas

navigationElements.viewReturnBtn.addEventListener("click", () => {
    notesElements.notesContainer.style.display = "flex";
    notesElements.viewNoteContainer.style.display = "none";
})

navigationElements.editorReturnBtn.addEventListener("click", () => {
    notesElements.notesContainer.style.display = "flex";
    notesElements.notesEditor.style.display = "none";
})

// Ajustar altura do textarea

function ajustarAlturaTextarea() {
    editorElements.textArea.style.height = "auto";
    editorElements.textArea.style.height = editorElements.textArea.scrollHeight + "px";
}

editorElements.textArea.addEventListener("input", ajustarAlturaTextarea);

ajustarAlturaTextarea();

// Aplicar marcadores de formatação

function aplicarMarcadores(inicio, fim) {
    editorElements.textArea.focus();

    const start = editorElements.textArea.selectionStart;
    const end = editorElements.textArea.selectionEnd;

    const textSelected = editorElements.textArea.value.slice(start, end)

    editorElements.textArea.setRangeText(
        inicio + textSelected + fim,
        start,
        end,
        "select"
    );
}

function aplicarMarcadorLista(prefixo) {
    editorElements.textArea.focus();

    const start = editorElements.textArea.selectionStart;
    const end = editorElements.textArea.selectionEnd;

    const textoSelected = editorElements.textArea.value.slice(start, end)

    const newText = textoSelected.split("\n").map(linha => prefixo + linha).join("\n")

    editorElements.textArea.setRangeText(
        newText,
        start,
        end,
        "select"
    )
}

function aplicarMarcadorListaOl() {
    editorElements.textArea.focus();

    const start = editorElements.textArea.selectionStart;
    const end = editorElements.textArea.selectionEnd;

    const textoSelected = editorElements.textArea.value.slice(start, end)

    const newText = textoSelected.split("\n").map((linha, index) => `${index + 1}. ${linha}`).join("\n")

    editorElements.textArea.setRangeText(
        newText,
        start,
        end,
        "select"
    )
}

// Adicionar eventos aos botões da toolbar

toolbarElements.titleH1Btn.addEventListener("click", () => {
    aplicarMarcadores("# ", "");
})

toolbarElements.titleH2Btn.addEventListener("click", () => {
    aplicarMarcadores("## ", "");
})

toolbarElements.boldBtn.addEventListener("click", () => {
    aplicarMarcadores("**", "**");
})

toolbarElements.italicBtn.addEventListener("click", () => {
    aplicarMarcadores("*", "*");
})

toolbarElements.codeBtn.addEventListener("click", () => {
    aplicarMarcadores("`", "`");
})

toolbarElements.listBtn.addEventListener("click", () => {
    aplicarMarcadorLista("- ");
})

toolbarElements.list0lBtn.addEventListener("click", () => {
    aplicarMarcadorListaOl()
})

toolbarElements.quoteBtn.addEventListener("click", () => {
    aplicarMarcadores('"', '"');
})

toolbarElements.imageBtn.addEventListener("change", (event) => {
    modalImageElements.imageInsertContainer.setAttribute("class", event.target.checked ? "ativo" : "")
});

toolbarElements.tagBtn.addEventListener("change", (event) => {
    modalTagElements.tagsInsertContainer.setAttribute("class", event.target.checked ? "ativo" : "");
});

// Cancelar inserção de imagem

modalImageElements.cancelImageInsertBtn.addEventListener("click", () => {
    modalImageElements.imgAlt.value = '';
    modalImageElements.imgUrl.value = '';
    toolbarElements.imageBtn.checked = false;
    modalImageElements.imageInsertContainer.removeAttribute("class")
});

// Validar URL da imagem

function validarImgUrl() {
    const url = modalImageElements.imgUrl.value.trim();
    const alt = modalImageElements.imgAlt.value.trim();

    if (url == "") {
        alert("Informe a URL da imagem.")
        modalImageElements.imgUrl.focus();
        return false
    }

    const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|gif|webp)/g;

    if (!urlRegex.test(url)) {
        alert("Informe uma URL de imagem válida.");
        modalImageElements.imgUrl.focus();
        return false
    }

    return {
        url,
        alt
    };
}

// Inserir imagem no editor

modalImageElements.imageInsertBtn.addEventListener("click", () => {
    const dados = validarImgUrl();

    if (!dados) return;

    const markdown = `![${dados.alt}](${dados.url})`;

    editorElements.textArea.setRangeText(
        markdown,
        editorElements.textArea.selectionStart,
        editorElements.textArea.selectionEnd,
        "end"
    )

    modalImageElements.imgAlt.value = '';
    modalImageElements.imgUrl.value = '';
    toolbarElements.imageBtn.checked = false;
    modalImageElements.imageInsertContainer.removeAttribute("class")
});

// Adicionar tag no editor

function mostrarTagEditor() {
    const tag = document.createElement("div");
    tag.className = "editor-note-tag";

    tag.innerHTML = `
        ${modalTagElements.tagInsertInput.value}
        <button class="remove-editor-tag">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

    tag.querySelector("button").addEventListener("click", () => {
        tag.remove();
    });

    editorElements.editorTagsContainer.appendChild(tag);
}

let tags_array = []

modalTagElements.tagInsertBtn.addEventListener("click", () => {
    const valor = modalTagElements.tagInsertInput.value.trim();

    if (!valor) return;

    if (tags_array.includes(valor)) {
        mostrarToast("Essa tag já foi adicionada.", "#d41b18");
        return;
    }

    mostrarTagEditor();

    tags_array.push(modalTagElements.tagInsertInput.value)
    modalTagElements.tagInsertInput.value = "";
    modalTagElements.tagInsertInput.focus();
})

// Toast

function mostrarToast(mensagem, bg_color = "") {
    toast.textContent = mensagem;
    toast.classList.add("show");
    toast.style.backgroundColor = bg_color;

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// Salvar nota

function criarId() {
    return crypto.randomUUID()
}

function salvarNota() {
    const nota = {
        id: crypto.randomUUID(),
        titulo: editorElements.title.value,
        conteudo: editorElements.textArea.value,
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
    statisticsElements.statisticValueNotes.textContent = notas.length;
}

function limparEditor() {
    tags_array = [];
    editorElements.title.value = "";
    editorElements.textArea.value = "";
    editorElements.editorTagsContainer.innerHTML = "";

    notesElements.notesContainer.style.display = "flex";
    notesElements.notesEditor.style.display = "none";
}

editorElements.saveBtn.addEventListener("click", () => {
    if (!editorElements.title.value.trim() || !editorElements.textArea.value.trim()) {
        mostrarToast("Preencha o título e o conteúdo da nota.", "#d41b18");
        return;
    }

    mostrarToast("Salvando nota...");

    salvarNota();

    atualizarNotas();

    setTimeout(() => {
        mostrarToast("Nota salva com sucesso!");
    }, 2000);

    limparEditor();
})

// Filtrar notas

function filtrarNotas() {
    const notas = JSON.parse(localStorage.getItem("notas")) || [];

    const notasNormais = notas;

    const favoritos = notas.filter(nota =>
        nota.favorito && !nota.arquivado
    );

    const arquivadas = notas.filter(nota =>
        nota.arquivado
    );

    return {
        notasNormais,
        favoritos,
        arquivadas
    };
}

// Atualizar placeholders

function atualizarPlaceholders(notas, favoritos, arquivadas) {
    placeholders.notePlaceholderContainer.style.display = notas.length ? "none" : "flex";
    placeholders.favPlaceholder.style.display = favoritos.length ? "none" : "block";
    placeholders.arquivPlaceholder.style.display = arquivadas.length ? "none" : "block";

    placeholders.notePlaceholder.textContent = "Você ainda não tem nenhuma nota";
    placeholders.favPlaceholder.textContent = "Você ainda não tem nenhuma nota favorita";
    placeholders.arquivPlaceholder.textContent = "Você ainda não tem nenhuma nota arquivada";
}

// Atualizar botão de nova nota

function atualizarNewDraft(notas) {
    notesElements.newDraft.style.display = notas.length ? "flex" : "none";
}

// Atualizar notas

function atualizarNotas() {
    const {
        notasNormais,
        favoritos,
        arquivadas
    } = filtrarNotas();

    renderizarNotas(notasNormais, notesElements.notesList);
    renderizarNotas(favoritos, notesElements.favoriteList);
    renderizarNotas(arquivadas, notesElements.archiveList);

    atualizarPlaceholders(notasNormais, favoritos, arquivadas)
    atualizarNewDraft(notasNormais)

    atualizarContadorNotas();
    atualizarContadorFavoritos();
    atualizarContadorArquivados();
}

// Renderizar notas 

function criarCardNota(nota) {
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

    return card;
}

function renderizarNotas(lista, container) {
    container.innerHTML = "";

    lista.forEach((nota) => {
        container.appendChild(criarCardNota(nota));
    });
}

// Inicializar a atualização das notas ao carregar a página

document.addEventListener("DOMContentLoaded", 
    atualizarNotas()
);

function excluirNota(id) {
    const notas = JSON.parse(localStorage.getItem("notas")) || [];

    const novasNotas = notas.filter(nota => nota.id !== id);

    localStorage.setItem("notas", JSON.stringify(novasNotas));

    atualizarNotas();
}

// Exibir nota na visualização

function buscarNota(id) {
    const notas = JSON.parse(localStorage.getItem("notas")) || [];
    return notas.find(nota => nota.id === id);
}

function criarTags(tags) {
    const noteTags = document.createElement("div");
    noteTags.className = "note-tags";

    noteTags.innerHTML = tags
        .map(tag => `<span class="tag">${tag}</span>`)
        .join("");

    return noteTags;
}

function criarData(data) {
    const noteDate = document.createElement("p");
    noteDate.className = "note-date";
    noteDate.textContent = new Date(data).toLocaleDateString();

    return noteDate;
}

function preencherInformacoesNota(nota) {
    notesElements.viewNoteInfo.innerHTML = "";

    notesElements.viewNoteInfo.appendChild(criarTags(nota.tags));
    notesElements.viewNoteInfo.appendChild(criarData(nota.data));
}

function preencherConteudoNota(nota) {
    notesElements.viewNote.innerHTML = `
        <h1 id="view-note-title" class="note-title">${nota.titulo}</h1>
        <div id="view-note-content" class="note-content">${nota.conteudo}</div>
    `;
}

function exibirNotasView(id) {
    const nota = buscarNota(id);

    if (!nota) return;

    preencherInformacoesNota(nota);
    preencherConteudoNota(nota);
}

// Eventos de clique nas listas de notas, favoritos e arquivados

[notesElements.notesList, notesElements.favoriteList, notesElements.archiveList].forEach(container => {

    container.addEventListener("click", (event) => {

        // Excluir
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

            notesElements.notesContainer.style.display = "none";
            notesElements.notesContFavorite.style.display = "none";
            notesElements.notasContArchive.style.display = "none";

            notesElements.viewNoteContainer.style.display = "flex";

            exibirNotasView(id);
        }

    });

});

// Atualizar contador de favoritos e arquivados

function atualizarContadorFavoritos() {
    const notas = JSON.parse(localStorage.getItem("notas")) || [];

    const totalFavoritas = notas.filter(nota => nota.favorito).length;

    statisticsElements.statisticValueFavorito.textContent = totalFavoritas;
}

function atualizarContadorArquivados() {
    const notas = JSON.parse(localStorage.getItem("notas")) || [];

    const totalArquivados = notas.filter(nota => nota.arquivado).length

    statisticsElements.statisticValueArchive.textContent = totalArquivados
}

// Atualizar favoritos e arquivados ao marcar/desmarcar

[notesElements.notesList, notesElements.favoriteList, notesElements.archiveList].forEach(container => {

    container.addEventListener("change", (event) => {

        const card = event.target.closest(".notes");
        if (!card) return;
        const id = card.dataset.id;
        const notas = JSON.parse(localStorage.getItem("notas")) || [];
        const nota = notas.find(n => n.id === id);
        if (!nota) return;


        // Favorito
        if (event.target.classList.contains("note-favorite")) {

            nota.favorito = event.target.checked;

        }


        // Arquivado
        if (event.target.classList.contains("note-archive")) {

            nota.arquivado = event.target.checked;

        }


        localStorage.setItem("notas", JSON.stringify(notas));

        atualizarNotas();

    });

});

// Atualizar notas ao digitar na barra de pesquisa

function filtrarNotasPorPesquisa(pesquisa) {
    const notas = JSON.parse(localStorage.getItem("notas")) || [];
    return notas.filter(nota => 
        nota.titulo.toLowerCase().includes(pesquisa)
    );
}

function atualizarPlaceholdersPesquisa(notasFiltradas) {
    const favoritos = notasFiltradas.filter(nota => nota.favorito && !nota.arquivado);
    const arquivadas = notasFiltradas.filter(nota => nota.arquivado);

    placeholders.notePlaceholder.style.display = notasFiltradas.length ? "none" : "flex";
    placeholders.favPlaceholder.style.display = favoritos.length ? "none" : "flex";
    placeholders.arquivPlaceholder.style.display = arquivadas.length ? "none" : "flex";

    placeholders.notePlaceholder.textContent = "Nenhuma nota com esse título foi encontrada.";

    placeholders.favPlaceholder.textContent = "Nenhuma nota favorita com esse título foi encontrada.";

    placeholders.arquivPlaceholder.textContent = "Nenhuma nota arquivada com esse título foi encontrada.";
}

searchElements.searchInput.forEach(input => {
    input.addEventListener("input", () => {
        const pesquisa = input.value.trim().toLowerCase();
        const notasFiltradas = filtrarNotasPorPesquisa(pesquisa);

        if (pesquisa === "") {
            atualizarNotas();
            atualizarPlaceholders();
            return;
        }

        renderizarNotas(notasFiltradas, notesElements.notesList);
        renderizarNotas(notasFiltradas.filter(nota => nota.favorito && !nota.arquivado), notesElements.favoriteList);
        renderizarNotas(notasFiltradas.filter(nota => nota.arquivado), notesElements.archiveList);

        atualizarPlaceholdersPesquisa(notasFiltradas);
    })
})

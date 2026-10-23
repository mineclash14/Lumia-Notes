// Toast

console.log("SCRIPT.JS CARREGADO!");

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

// Folders

const folderModalFormElement = document.getElementById("folder-modal-form");

const foldersElements = {
    foldersList: document.getElementById("folders-list"),
    addFolderBtn: document.getElementById("add-folder"),
    folderModal: document.getElementById("folder-modal"),
    folderModalForm: folderModalFormElement,
    folderModalTitle: document.getElementById("folder-modal-title"),
    folderModalDescription: document.getElementById("folder-modal-description"),
    folderModalInput: document.getElementById("folder-name-input"),
    folderModalError: document.getElementById("folder-modal-error"),
    folderModalSubmit: folderModalFormElement.querySelector(".folder-modal-submit"),
    folderModalLabel: folderModalFormElement.querySelector("label"),
    folderModalAcoesFechar: folderModalFormElement.querySelector(".folder-modal-extra-actions")
}

let pastaSelecionada = null;
let pastaEmEdicao = null;
let modoModalPasta = "criar";
let pastaParaExcluir = null;

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

sidebarElements.sidebarNotesBtn.addEventListener("click", async () => {
    await mostrarTodasAsNotas();
    mostrarTela(notesElements.notesContainer);
});

sidebarElements.sidebarFavBtn.addEventListener("click", () => {
    mostrarTela(notesElements.notesContFavorite);
});

sidebarElements.sidebarArquivBtn.addEventListener("click", () => {
    mostrarTela(notesElements.notasContArchive);
});

perfilconfigbtn.addEventListener("change", (event) => {
    event.target.checked ? perfilconfig.classList.add("ativo") : perfilconfig.classList.remove("ativo");
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
        limparEditor();
        pastaSelecionada = null;
        mostrarTela(notesElements.notesEditor);
    });
})

// Retornar para a lista de notas

navigationElements.viewReturnBtn.addEventListener("click", () => {
    mostrarTela(notesElements.notesContainer);
})

navigationElements.editorReturnBtn.addEventListener("click", () => {
    mostrarTela(notesElements.notesContainer);
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

    const tagText = document.createElement("span");
    tagText.textContent = modalTagElements.tagInsertInput.value;

    const removeButton = document.createElement("button");
    removeButton.className = "remove-editor-tag";

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-xmark";

    removeButton.appendChild(icon);

    removeButton.addEventListener("click", () => {
        tag.remove();
    });

    tag.appendChild(tagText);
    tag.appendChild(removeButton);

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

function getCookie(name) {
    let cookieValue = null;

    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");

        for (let cookie of cookies) {
            cookie = cookie.trim();

            if (cookie.startsWith(name + "=")) {
                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1)
                );
                break;
            }
        }
    }

    return cookieValue;
}

async function buscarNotas() {
    const response = await fetch("/notes/api/notas/", {
        method: "GET",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
        }
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar notas.");
    }

    return await response.json();
}

async function buscarNota(id) {
    const response = await fetch(`/notes/api/notas/${id}/`, {
        method: "GET",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
        }
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar nota.");
    }

    return await response.json();
}

async function salvarNota() {
    const dados = {
        titulo: editorElements.title.value.trim(),
        conteudo: editorElements.textArea.value.trim(),
        tags: tags_array,
        pasta_id: pastaSelecionada
    };

    const editando = notaEmEdicao !== null;

    const response = await fetch(
        editando
            ? `/notes/api/notas/${notaEmEdicao}/`
            : "/notes/api/notas/",
        {
            method: editando ? "PATCH" : "POST",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                ...(editando
                    ? { "Content-Type": "application/json" }
                    : { "Content-Type": "application/x-www-form-urlencoded" })
            },
            body: editando
                ? JSON.stringify(dados)
                : new URLSearchParams({
                    titulo: dados.titulo,
                    conteudo: dados.conteudo,
                    tags: JSON.stringify(dados.tags),
                    pasta_id: dados.pasta_id ?? ""
                })
        }
    );

    const resultado = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(resultado.erro || "Erro ao salvar a nota.");
    }

    return resultado;
}

function atualizarContadorNotas(notas) {
    statisticsElements.statisticValueNotes.textContent = notas.length;
}

function limparEditor() {
    notaEmEdicao = null;
    tags_array = [];
    editorElements.title.value = "";
    editorElements.textArea.value = "";
    editorElements.editorTagsContainer.innerHTML = "";

    notesElements.notesContainer.style.display = "flex";
    notesElements.notesEditor.style.display = "none";
}

editorElements.saveBtn.addEventListener("click", async () => {
    if (!editorElements.title.value.trim() || !editorElements.textArea.value.trim()) {
        mostrarToast("Preencha o título e o conteúdo da nota.", "#d41b18");
        return;
    }

    mostrarToast("Salvando nota...");

    try {
        await salvarNota();

        await atualizarNotas();

        setTimeout(() => {
            mostrarToast("Nota salva com sucesso!");
        }, 2000);

        limparEditor();

    } catch (error) {
        console.error(error)

        mostrarToast(
            "Erro ao salvar a nota.",
            "#d41b18"
        );

        return;
    }
})

// Filtrar notas

async function filtrarNotas() {
    const notas = await buscarNotas();

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

async function atualizarNotas() {
    try {
        const {
            notasNormais,
            favoritos,
            arquivadas
        } = await filtrarNotas();

        renderizarNotas(notasNormais, notesElements.notesList);
        renderizarNotas(favoritos, notesElements.favoriteList);
        renderizarNotas(arquivadas, notesElements.archiveList);

        atualizarPlaceholders(
            notasNormais,
            favoritos,
            arquivadas
        );

        atualizarNewDraft(notasNormais);

        atualizarContadorNotas(notasNormais);
        atualizarContadorFavoritos(notasNormais);
        atualizarContadorArquivados(notasNormais);

    } catch (error) {
        console.error(error);

        mostrarToast(
            "Erro ao carregar as notas.",
            "#d41b18"
        );
    }
}

// Renderizar notas 

function criarCardNota(nota) {
    const card = document.createElement('div')
    card.className = "notes"
    card.dataset.id = nota.id;

    const title = document.createElement("h3")
    title.className = "card-note-title";
    title.textContent = nota.titulo;

    const content = document.createElement("p")
    content.className = "note-content limitado";
    content.textContent = nota.conteudo

    const noteTags = document.createElement("div");
    noteTags.className = "note-tags";

    nota.tags.forEach(tag => {
        const tagElement = document.createElement("span");
        tagElement.className = "tag";
        tagElement.textContent = tag;

        noteTags.appendChild(tagElement)
    })

    card.appendChild(title);
    card.appendChild(content);
    card.appendChild(noteTags);

    card.appendChild(criarFooter(nota))

    return card;
}

function criarFooter(nota) {
    const noteFooter = document.createElement("div");
    noteFooter.className = "note-footer";

    noteFooter.innerHTML = `
        <p class="note-date">
            ${new Date(nota.data).toLocaleDateString()}
        </p>

        <ul>
            <li>
                <button type="button" class="note-move" title="Mover para pasta" data-pasta-id="${nota.pasta_id || ''}">
                    <i class="fa-regular fa-folder-open"></i>
                </button>
            </li>
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
    `;

    return noteFooter
}

function renderizarNotas(lista, container) {
    if (!container) return;

    const notasFiltradas = lista.filter(nota => {
        return (
            pastaSelecionada === null ||
            nota.pasta_id === Number(pastaSelecionada)
        );
    });

    container.replaceChildren();

    notasFiltradas.forEach(nota => {
        container.appendChild(criarCardNota(nota));
    });
}

// Inicializar a atualização das notas ao carregar a página

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await renderizarPastas();
        await atualizarNotas();
    } catch (error) {
        console.error(error);
        mostrarToast("Erro ao carregar os dados.", "#d41b18");
    }
});

async function excluirNota(id) {

    try {

        const response = await fetch(`/notes/api/notas/${id}/`, {
            method: "DELETE",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao excluir nota.");
        }

        await atualizarNotas();

        mostrarToast("Nota excluída com sucesso!");

    } catch (error) {

        console.error(error);

        mostrarToast(
            "Erro ao excluir a nota.",
            "#d41b18"
        );
    }
}

// Exibir nota na visualização

function criarTags(tags) {
    const noteTags = document.createElement("div");
    noteTags.className = "note-tags";

    tags.forEach(tag => {
        const tagElement = document.createElement("span");

        tagElement.className = "tag";
        tagElement.textContent = tag;

        noteTags.appendChild(tagElement);
    });

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
    const viewNoteTitle = document.createElement("h1");

    viewNoteTitle.id = "view-note-title";
    viewNoteTitle.className = "note-title";
    viewNoteTitle.textContent = nota.titulo;

    const viewNoteContent = document.createElement("div");

    viewNoteContent.id = "view-note-content";
    viewNoteContent.className = "note-content";
    viewNoteContent.textContent = nota.conteudo;

    notesElements.viewNote.innerHTML = "";

    notesElements.viewNote.appendChild(viewNoteTitle);
    notesElements.viewNote.appendChild(viewNoteContent);
}

let notaVisualizadaId = null;

async function exibirNotasView(id) {

    try {

        const nota = await buscarNota(id);
        notaVisualizadaId = nota.id;

        if (!nota) return;

        preencherInformacoesNota(nota);
        preencherConteudoNota(nota);

    } catch (error) {

        console.error(error);

        mostrarToast(
            "Erro ao carregar a nota.",
            "#d41b18"
        );
    }
}

document.getElementById("view-note-edit").addEventListener("click", () => {
    const titulo = document.getElementById("view-note-title");

    if (!titulo) return;

    if (notaVisualizadaId !== null) {
        editarNota(notaVisualizadaId);
    }
});

// Função de editar as notas

let notaEmEdicao = null;

async function editarNota(id) {
    try {
        const nota = await buscarNota(id);

        notaEmEdicao = nota.id;
        pastaSelecionada = nota.pasta_id ?? null;

        editorElements.title.value = nota.titulo;
        editorElements.textArea.value = nota.conteudo;

        tags_array = [...nota.tags];

        editorElements.editorTagsContainer.innerHTML = "";

        tags_array.forEach(tag => {
            const tagElement = document.createElement("div");
            tagElement.className = "editor-note-tag";

            const tagText = document.createElement("span");
            tagText.textContent = tag;

            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.className = "remove-editor-tag";
            removeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';

            removeButton.addEventListener("click", () => {
                tags_array = tags_array.filter(item => item !== tag);
                tagElement.remove();
            });

            tagElement.append(tagText, removeButton);
            editorElements.editorTagsContainer.appendChild(tagElement);
        });

        mostrarTela(notesElements.notesEditor);

        requestAnimationFrame(() => {
            ajustarAlturaTextarea();
        });

    } catch (error) {
        console.error(error);
        mostrarToast("Não foi possível abrir a nota para edição.", "#d41b18");
    }
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

        // Mover nota para uma pasta
        const moveBtn = event.target.closest(".note-move");

        if (moveBtn) {
            const card = moveBtn.closest(".notes");
            const id = card.dataset.id;
            const pastaIdAtual = moveBtn.dataset.pastaId;

            abrirSeletorPasta(id, pastaIdAtual, moveBtn);
            return;
        }

        // Editar nota pelo card
        const editBtn = event.target.closest(".note-edit");

        if (editBtn) {
            const card = editBtn.closest(".notes");
            const id = card.dataset.id;

            editarNota(id);
            return;
        }
    });

});

// Atualizar contador de favoritos e arquivados

function atualizarContadorFavoritos(notas) {
    const totalFavoritas = notas.filter(
        nota => nota.favorito
    ).length;

    statisticsElements.statisticValueFavorito.textContent =
        totalFavoritas;
}

function atualizarContadorArquivados(notas) {
    const totalArquivados = notas.filter(
        nota => nota.arquivado
    ).length;

    statisticsElements.statisticValueArchive.textContent =
        totalArquivados;
}

async function atualizarNota(id, dados) {

    const response = await fetch(`/notes/api/notas/${id}/`, {
        method: "PATCH",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados)
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar nota.");
    }

    return await response.json();
}

// Atualizar favoritos e arquivados ao marcar/desmarcar

[notesElements.notesList, notesElements.favoriteList, notesElements.archiveList]
.forEach(container => {

    container.addEventListener("change", async (event) => {

        const card = event.target.closest(".notes");

        if (!card) return;

        const id = card.dataset.id;

        try {

            if (event.target.classList.contains("note-favorite")) {

                await atualizarNota(id, {
                    favorito: event.target.checked
                });

            }

            if (event.target.classList.contains("note-archive")) {

                await atualizarNota(id, {
                    arquivado: event.target.checked
                });

            }

            await atualizarNotas();

        } catch (error) {

            console.error(error);

            mostrarToast(
                "Erro ao atualizar a nota.",
                "#d41b18"
            );
        }

    });

});

// Atualizar notas ao digitar na barra de pesquisa

async function filtrarNotasPorPesquisa(pesquisa) {

    const notas = await buscarNotas();

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

    input.addEventListener("input", async () => {

        const pesquisa = input.value.trim().toLowerCase();

        if (pesquisa === "") {
            await atualizarNotas();
            return;
        }

        const notasFiltradas =
            await filtrarNotasPorPesquisa(pesquisa);

        renderizarNotas(
            notasFiltradas,
            notesElements.notesList
        );

        renderizarNotas(
            notasFiltradas.filter(
                nota => nota.favorito && !nota.arquivado
            ),
            notesElements.favoriteList
        );

        renderizarNotas(
            notasFiltradas.filter(
                nota => nota.arquivado
            ),
            notesElements.archiveList
        );

        atualizarPlaceholdersPesquisa(notasFiltradas);
    });

});

// Funções referentes ao sistema de pastas

async function buscarPastas() {
    const response = await fetch("/notes/api/pastas/");

    if (!response.ok) {
        throw new Error("Não foi possível carregar as pastas.");
    }

    return response.json();
}

async function criarPasta(nome) {
    const dados = new URLSearchParams();
    dados.append("nome", nome);

    const response = await fetch("/notes/api/pastas/", {
        method: "POST",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: dados,
    });

    const resultado = await response.json();

    if (!response.ok) {
        throw new Error(resultado.erro || "Erro ao criar pasta.");
    }

    return resultado;
}

async function atualizarPasta(id, dados) {
    const response = await fetch(`/notes/api/pastas/${id}/`, {
        method: "PATCH",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    });

    const resultado = await response.json();

    if (!response.ok) {
        throw new Error(resultado.erro || "Erro ao renomear pasta.");
    }

    return resultado;
}

async function excluirPasta(id) {
    const response = await fetch(`/notes/api/pastas/${id}/`, {
        method: "DELETE",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
        },
    });

    if (!response.ok) {
        throw new Error("Não foi possível excluir a pasta.");
    }

    return response.json();
}

async function moverNotaParaPasta(notaId, pastaId) {
    try {
        await atualizarNota(notaId, {
            pasta_id: pastaId
        });

        await renderizarPastas();
        await atualizarNotas();

        mostrarToast(pastaId ? "Nota movida para a pasta com sucesso!" : "Nota removida da pasta com sucesso!");
    } catch (error) {
        console.error(error);

        mostrarToast(
            "Não foi possível mover a nota.",
            "#d41b18"
        );
    }
}

function abrirModalPasta(modo, pasta = null) {
    modoModalPasta = modo;
    pastaEmEdicao = pasta;
    pastaParaExcluir = modo === "excluir" ? pasta : null;

    foldersElements.folderModalError.hidden = true;
    foldersElements.folderModalError.textContent = "";

    foldersElements.folderModalInput.hidden = false;
    foldersElements.folderModalInput.style.display = "";
    foldersElements.folderModalLabel.hidden = false;
    foldersElements.folderModalLabel.style.display = "";
    foldersElements.folderModalInput.required = true;

    foldersElements.folderModalSubmit.hidden = false;
    foldersElements.folderModalSubmit.style.display = "";
    foldersElements.folderModalForm.querySelector(".folder-modal-cancel").textContent = "Cancelar";

    modoCriar(modo);
    modoRenomear(modo, pasta);
    modoExcluir(modo, pasta);

    foldersElements.folderModal.hidden = false;
    document.body.style.overflow = "hidden";

    if (modo !== "excluir") {
        requestAnimationFrame(() => {
            foldersElements.folderModalInput.focus();
            foldersElements.folderModalInput.select();
        });
    }
}

function modoCriar(modo) {
    if (modo === "criar") {
        foldersElements.folderModalTitle.textContent = "Nova pasta";
        foldersElements.folderModalDescription.textContent = "Organize suas notas em uma pasta.";
        foldersElements.folderModalSubmit.textContent = "Criar pasta";
        foldersElements.folderModalInput.value = "";
        foldersElements.folderModalSubmit.style.background = "";
        foldersElements.folderModalSubmit.style.borderColor = "";
    }
}

function modoRenomear(modo, pasta) {
    if (modo === "renomear") {
        foldersElements.folderModalTitle.textContent = "Renomear pasta";
        foldersElements.folderModalDescription.textContent = "Escolha um novo nome para esta pasta.";
        foldersElements.folderModalSubmit.textContent = "Salvar alterações";
        foldersElements.folderModalInput.value = pasta.nome;
        foldersElements.folderModalSubmit.style.background = "";
        foldersElements.folderModalSubmit.style.borderColor = "";
    }
}

function modoExcluir(modo, pasta) {
    if (modo === "excluir") {
        foldersElements.folderModalTitle.textContent = "Excluir pasta";
        foldersElements.folderModalDescription.textContent = `Tem certeza de que deseja excluir "${pasta.nome}"? As notas serão mantidas, mas ficarão sem pasta.`;

        foldersElements.folderModalInput.hidden = true;
        foldersElements.folderModalInput.style.display = "none";
        foldersElements.folderModalLabel.hidden = true;
        foldersElements.folderModalLabel.style.display = "none";
        foldersElements.folderModalInput.required = false;

        foldersElements.folderModalSubmit.textContent = "Excluir pasta";
        foldersElements.folderModalSubmit.style.background = "#dc3545";
        foldersElements.folderModalSubmit.style.borderColor = "#dc3545";
    }
}

function fecharModalPasta() {
    foldersElements.folderModal.hidden = true;
    document.body.style.overflow = "";

    foldersElements.folderModalForm.reset();
    
    foldersElements.folderModalInput.hidden = false;
    foldersElements.folderModalInput.style.display = "";
    foldersElements.folderModalLabel.hidden = false;
    foldersElements.folderModalLabel.style.display = "";
    foldersElements.folderModalInput.required = true;
    
    foldersElements.folderModalSubmit.hidden = false;
    foldersElements.folderModalSubmit.style.display = "";
    foldersElements.folderModalSubmit.style.background = "";
    foldersElements.folderModalSubmit.style.borderColor = "";

    foldersElements.folderModalError.hidden = true;

    pastaEmEdicao = null;
    pastaParaExcluir = null;
}

foldersElements.folderModal.querySelectorAll("[data-close-folder-modal]").forEach((elemento) => {
    elemento.addEventListener("click", fecharModalPasta);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !foldersElements.folderModal.hidden) {
        fecharModalPasta();
    }
});

foldersElements.addFolderBtn.addEventListener("click", () => {
    abrirModalPasta("criar");
});

foldersElements.folderModalForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    foldersElements.folderModalError.hidden = true;

    const nome = foldersElements.folderModalInput.value.trim();

    if (modoModalPasta !== "excluir" && !nome) {
        foldersElements.folderModalError.textContent = "Informe o nome da pasta.";
        foldersElements.folderModalError.hidden = false;
        foldersElements.folderModalInput.focus();
        return;
    }

    foldersElements.folderModalSubmit.disabled = true;

    try {
        switch (modoModalPasta) {
            case "criar": 
                await criarPasta(nome); 
                mostrarToast("Pasta criada com sucesso!");
                break
            case "renomear": 
                await atualizarPasta(pastaEmEdicao.id, {nome: nome}); 
                mostrarToast("Pasta renomeada com sucesso!");
                break;
            case "excluir": 
                await excluirPasta(pastaParaExcluir.id); 
                if (pastaSelecionada === pastaParaExcluir.id) pastaSelecionada = null;
                mostrarToast("Pasta excluída com sucesso!");
                break;
            default:
                break;
        }

        fecharModalPasta();
        await renderizarPastas();

    } catch (error) {
        foldersElements.folderModalError.textContent = error.message;
        foldersElements.folderModalError.hidden = false;
    } finally {
        foldersElements.folderModalSubmit.disabled = false;
    }
});

async function renderizarPastas() {
    const pastas = await buscarPastas();

    foldersElements.foldersList.replaceChildren();

    pastas.forEach((pasta) => {
        foldersElements.foldersList.appendChild(criarItemPasta(pasta))
    })
}

function criarItemPasta(pasta) {
    const item = document.createElement("div");
    item.className = "folder-item";
    if (pastaSelecionada === pasta.id) item.classList.add("active");

    const abrir = document.createElement("button");
    abrir.type = "button";
    abrir.className = "folder-open";
    abrir.setAttribute("aria-label", `Abrir pasta ${pasta.nome}`);
    abrir.innerHTML = '<i class="fa-regular fa-folder"></i>';

    const nome = document.createElement("span");
    nome.className = "folder-name";
    nome.textContent = pasta.nome;
    nome.title = pasta.nome;

    const menu = document.createElement("button");
    menu.type = "button";
    menu.className = "folder-menu";
    menu.setAttribute("aria-label", `Opções da pasta ${pasta.nome}`);
    menu.innerHTML = '<i class="fa-solid fa-ellipsis"></i>';

    item.append(abrir, nome, menu);

    vincularEventosPasta(pasta, { abrir, nome, menu });

    return item;
}

function vincularEventosPasta(pasta, { abrir, nome, menu }) {
    abrir.addEventListener("click", async () => {
        pastaSelecionada = pasta.id;
        await renderizarPastas();
        await atualizarNotas();
        mostrarTela(notesElements.notesContainer)
    })

    nome.addEventListener("dblclick", () => abrirModalPasta("renomear", pasta));
    menu.addEventListener("click", () => abrirModalAcoesPasta(pasta))
}

function abrirModalAcoesPasta(pasta) {
    const { folderModal, folderModalTitle, folderModalDescription,
            folderModalForm, folderModalInput, folderModalSubmit } = foldersElements;

    if (!folderModal || !folderModalTitle || !folderModalDescription ||
        !folderModalForm || !folderModalInput || !folderModalSubmit) {
        mostrarToast("Não foi possível abrir as opções da pasta.", "#d41b18");
        return;
    }

    foldersElements.folderModalAcoesFechar?.remove();

    folderModalTitle.textContent = pasta.nome;
    folderModalDescription.textContent = "O que você deseja fazer com esta pasta?";

    folderModalInput.hidden = true;
    folderModalInput.style.display = "none";
    folderModalInput.required = false;

    foldersElements.folderModalLabel.hidden = true;
    foldersElements.folderModalLabel.style.display = "none";

    folderModalSubmit.hidden = true;
    folderModalSubmit.style.display = "none";

    folderModal.hidden = false;
    document.body.style.overflow = "hidden";

    criarAcoesExtrasPasta(pasta);
}

function criarAcoesExtrasPasta(pasta) {
    const acoes = document.createElement("div");
    acoes.className = "folder-modal-extra-actions";

    const renomear = document.createElement("button");
    renomear.type = "button";
    renomear.className = "folder-modal-cancel";
    renomear.textContent = "Renomear";

    const excluir = document.createElement("button");
    excluir.type = "button";
    excluir.className = "folder-modal-submit btn-danger";
    excluir.textContent = "Excluir pasta";

    acoes.append(renomear, excluir);
    foldersElements.folderModalForm.appendChild(acoes);

    renomear.addEventListener("click", () => {
        acoes.remove();
        abrirModalPasta("renomear", pasta);
    });

    excluir.addEventListener("click", () => {
        acoes.remove();
        abrirModalPasta("excluir", pasta);
    });

    return acoes;
}

async function mostrarTodasAsNotas() {
    pastaSelecionada = null;
    await renderizarPastas();
    await atualizarNotas();
}

async function abrirSeletorPasta(notaId, pastaIdAtual, botao) {
    try {
        const pastas = await buscarPastas();

        document.querySelector(".note-folder-select")?.remove();

        const select = criarSelectPastas(pastas, pastaIdAtual);

        botao.insertAdjacentElement("afterend", select)
        select.focus();

        vincularEventosSelect(select, notaId, botao);
    } catch (error) {
        mostrarToast("Não foi possivel carregar as pastas.", "#d41b18")
    }
}

function criarSelectPastas(pastas, pastaIdAtual) {
    const select = document.createElement("select");
    select.className = "note-folder-select";
    select.setAttribute("aria-label", "Escolher pasta de destino");

    const opcaoSemPasta = document.createElement("option");
    opcaoSemPasta.value = "";
    opcaoSemPasta.textContent = "Sem pasta";
    if (!pastaIdAtual) opcaoSemPasta.selected = true;
    select.appendChild(opcaoSemPasta);

    pastas.forEach((pasta) => {
        const opcao = document.createElement("option");
        opcao.value = pasta.id;
        opcao.textContent = pasta.nome;

        if (String(pasta.id) === String(pastaIdAtual)) {
            opcao.selected = true;
        }

        select.appendChild(opcao);
    });

    return select;
}

function vincularEventosSelect(select, notaId, botao) {
    select.addEventListener("change", async () => {
        await moverNotaParaPasta(notaId, select.value || null);
        select.remove();
    });

    setTimeout(() => {
        const fecharSelect = (e) => {
            if (!select.contains(e.target) && e.target !== botao) {
                select.remove();
                document.removeEventListener("click", fecharSelect);
            }
        };
        document.addEventListener("click", fecharSelect);
    }, 0);
}

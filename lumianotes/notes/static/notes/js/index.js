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

//

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
    const dados = new URLSearchParams();

    dados.append("titulo", editorElements.title.value);
    dados.append("conteudo", editorElements.textArea.value);
    dados.append("tags", JSON.stringify(tags_array));

    const response = await fetch("/notes/api/notas/", {
        method: "POST",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: dados
    });

    if (!response.ok) {
        throw new Error("Erro ao salvar nota.");
    }

    return await response.json();
}

function atualizarContadorNotas(notas) {
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

    const noteFooter = document.createElement("div");
    noteFooter.className = "note-footer";

    noteFooter.innerHTML = `
        <p class="note-date">
            ${new Date(nota.data).toLocaleDateString()}
        </p>

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
    `;

    card.appendChild(noteFooter)

    return card;
}

function renderizarNotas(lista, container) {
    container.innerHTML = "";

    lista.forEach((nota) => {
        container.appendChild(criarCardNota(nota));
    });
}

// Inicializar a atualização das notas ao carregar a página

document.addEventListener("DOMContentLoaded", async () => {
    await atualizarNotas();
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

async function exibirNotasView(id) {

    try {

        const nota = await buscarNota(id);

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

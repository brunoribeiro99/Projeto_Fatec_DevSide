const avatarConfig = {
    caminhoBase: "avatar/Personagens/",
    areas: {
        programacao: {
            nome: "Programacao",
            masculino: 40,
            feminino: 40
        },
        design: {
            nome: "Designer",
            masculino: 40,
            feminino: 40
        },
        redes: {
            nome: "Redes",
            masculino: 40,
            feminino: 40
        },
        seguranca: {
            nome: "Ciberseguranca",
            masculino: 40,
            feminino: 40
        }
    }
};

// ========================================
// DESCOBRIR GÊNERO
// ========================================
function obterGeneroSelecionado() {

    const genero = document.querySelector(
        'input[name="genero"]:checked'
    );

    if (!genero) {
        console.warn(
            "⚠️ Nenhum gênero selecionado."
        );
        return null;
    }

    if (genero.value === "masculino") {
        return "Masculino";
    }

    if (genero.value === "feminino") {
        return "Feminino";
    }

    // Trans / Outros
    // Sorteia entre Masculino e Feminino.
    // O tom de pele continua sendo respeitado
    // porque a pasta da pele é definida separadamente.
    if (genero.value === "trans") {
        return Math.random() < 0.5
            ? "Masculino"
            : "Feminino";
    }

    return null;
}

// ========================================
// DESCOBRIR TOM DE PELE
// ========================================
function obterTomPeleSelecionado() {

    const tomPele = document.querySelector(
        'input[name="tomPele"]:checked'
    );

    if (!tomPele) {
        console.warn(
            "⚠️ Nenhum tom de pele selecionado."
        );
        return null;
    }

    return tomPele.value;
}

// ========================================
// CONVERTER TOM DE PELE PARA PASTA
// ========================================
function obterPastaPele(tomPele) {

    if (tomPele === "clara") {
        return "skin_1";
    }

    if (tomPele === "escura") {
        return "skin_2";
    }

    return null;
}

// ========================================
// ESCOLHER UM AVATAR
// ========================================
function escolherAvatar(area, genero, tomPele) {

    const configArea = avatarConfig.areas[area];

    if (!configArea) {
        console.error(
            "❌ Área de avatar não encontrada:",
            area
        );
        return null;
    }

    if (!genero) {
        console.warn(
            "⚠️ Não foi possível definir o gênero do avatar."
        );
        return null;
    }

    if (!tomPele) {
        console.warn(
            "⚠️ Não foi possível definir o tom de pele."
        );
        return null;
    }

    // ========================================
    // DESCOBRE A PASTA DA PELE
    // ========================================

    const pastaPele =
        obterPastaPele(tomPele);

    if (!pastaPele) {
        console.error(
            "❌ Tom de pele inválido:",
            tomPele
        );
        return null;
    }

    // ========================================
    // DESCOBRE QUANTOS AVATARES EXISTEM
    // PARA O GÊNERO ESCOLHIDO
    // ========================================

    const generoMinusculo =
        genero.toLowerCase();

    const quantidade =
        configArea[generoMinusculo];

    if (!quantidade || quantidade <= 0) {
        console.error(
            "❌ Nenhum avatar cadastrado para:",
            area,
            genero
        );
        return null;
    }

    // ========================================
    // SORTEIA O NÚMERO DO AVATAR
    // ========================================

    const numero =
        Math.floor(
            Math.random() * quantidade
        ) + 1;

    // ========================================
    // MONTA O NOME DO ARQUIVO
    // ========================================

    let nomeArquivo;

    // ========================================
    // CIBERSEGURANÇA
    // ========================================

    if (area === "seguranca") {

        nomeArquivo =
            "seguranca (" +
            numero +
            ").png";

    } else {

        // ========================================
        // OUTRAS ÁREAS
        // ========================================

        nomeArquivo =
            configArea.nome +
            " (" +
            numero +
            ").png";
    }

    // ========================================
    // MONTA O CAMINHO COMPLETO
    // ========================================

    const caminho =
        avatarConfig.caminhoBase +
        configArea.nome +
        "/" +
        genero +
        "/sprites/" +
        pastaPele +
        "/" +
        nomeArquivo;

    // ========================================
    // RETORNA OS DADOS DO AVATAR
    // ========================================

    return {
        area: area,
        genero: genero,
        tomPele: tomPele,
        pastaPele: pastaPele,
        numero: numero,
        imagem: caminho
    };
}

// ========================================
// MOSTRAR AVATAR NO RESULTADO
// ========================================
function mostrarAvatarNoResultado(avatar) {

    if (!avatar) {
        return;
    }

    // Procura o card do avatar
    const avatarCard =
        document.getElementById("avatarCard");

    if (!avatarCard) {
        console.error(
            "❌ #avatarCard não encontrado."
        );
        return;
    }

    // ========================================
    // REMOVE AVATAR ANTERIOR
    // ========================================

    avatarCard.innerHTML = "";

    // ========================================
    // CRIA CONTAINER
    // ========================================

    const container =
        document.createElement("div");

    container.className =
        "avatar-resultado";

    // ========================================
    // CRIA IMAGEM
    // ========================================

    const imagem =
        document.createElement("img");

    imagem.src =
        avatar.imagem;

    imagem.alt =
        "Avatar PixelU - " +
        avatar.area;

    // ========================================
    // CASO O ARQUIVO NÃO EXISTA
    // ========================================

    imagem.addEventListener(
        "error",
        function () {

            console.error(
                "❌ Não foi possível carregar o avatar:",
                avatar.imagem
            );

            container.remove();

            desativarBotaoBaixar();
        }
    );

    // ========================================
    // ADICIONA IMAGEM AO CONTAINER
    // ========================================

    container.appendChild(imagem);

    // ========================================
    // ADICIONA AVATAR AO CARD
    // ========================================

    avatarCard.appendChild(container);

    // ========================================
    // MOSTRA O NOME DO USUÁRIO
    // ========================================

    const nomeInput =
        document.getElementById("apelido");

    const nicknameInput =
    document.getElementById("nickname");

const nomeUsuario =
    (nicknameInput &&
        nicknameInput.value.trim()) ||
    "Jogador";

    const nomeElemento =
        document.createElement("p");

    nomeElemento.className =
        "avatar-nome";

    nomeElemento.textContent =
        nomeUsuario;

    avatarCard.appendChild(
        nomeElemento
    );

    // ========================================
    // LIGA O BOTÃO DE BAIXAR
    // ========================================

    configurarBotaoBaixar(avatar);

    // ========================================
    // DEBUG NO CONSOLE
    // ========================================

    console.log(
        "🎮 Avatar PixelU escolhido:"
    );

    console.log(avatar);

    console.log(
        "🖼️ Caminho da imagem:",
        avatar.imagem
    );
}

// ========================================
// NOME DO ARQUIVO PARA DOWNLOAD
// ========================================
function nomeArquivoDownload(avatar) {

    const nomeInput =
        document.getElementById("apelido");

    let nomeUsuario =
        (nomeInput &&
            nomeInput.value.trim()) ||
        "Avatar";

    // Remove acentos e caracteres especiais
    nomeUsuario = nomeUsuario
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .replace(
            /[^a-zA-Z0-9]+/g,
            "-"
        );

    const nomeArea =
        classes[avatar.area]
            ? classes[avatar.area].nome
                .normalize("NFD")
                .replace(
                    /[\u0300-\u036f]/g,
                    ""
                )
                .replace(
                    /[^a-zA-Z0-9]+/g,
                    "-"
                )
            : avatar.area;

    return `${nomeUsuario}-${nomeArea}.png`;
}

// ========================================
// CONFIGURA O BOTÃO DE BAIXAR
// ========================================
function configurarBotaoBaixar(avatar) {

    const btnBaixar =
        document.getElementById(
            "btnBaixarAvatar"
        );

    if (!btnBaixar) {
        return;
    }

    btnBaixar.disabled = false;

    btnBaixar.onclick = function () {

        const link =
            document.createElement("a");

        link.href =
            avatar.imagem;

        link.download =
            nomeArquivoDownload(avatar);

        document.body.appendChild(link);

        link.click();

        link.remove();
    };
}

// ========================================
// DESATIVA O BOTÃO
// ========================================
function desativarBotaoBaixar() {

    const btnBaixar =
        document.getElementById(
            "btnBaixarAvatar"
        );

    if (btnBaixar) {

        btnBaixar.disabled = true;

        btnBaixar.onclick = null;
    }
}

// ========================================
// PRINCIPAL
// ========================================
function criarAvatar(areaVencedora) {

    console.log(
        "Criando avatar da classe:",
        areaVencedora
    );

    // ========================================
    // DESCOBRE O GÊNERO
    // ========================================

    const genero =
        obterGeneroSelecionado();

    if (!genero) {

        console.warn(
            "⚠️ Erro de gênero."
        );

        return;
    }

    // ========================================
    // DESCOBRE O TOM DE PELE
    // ========================================

    const tomPele =
        obterTomPeleSelecionado();

    if (!tomPele) {

        console.warn(
            "⚠️ Erro no tom de pele."
        );

        return;
    }

    // ========================================
    // ESCOLHE O AVATAR
    // ========================================

    const avatar =
        escolherAvatar(
            areaVencedora,
            genero,
            tomPele
        );

    if (!avatar) {
        return;
    }

    // ========================================
    // MOSTRA O AVATAR
    // ========================================

    mostrarAvatarNoResultado(
        avatar
    );
}

// ========================================
// RESULTADO
// ========================================
document.addEventListener(
    "DOMContentLoaded",
    function () {

        const btnVerPontuacao =
            document.getElementById(
                "btnVerPontuacao"
            );

        if (!btnVerPontuacao) {

            console.warn(
                "⚠️ Botão #btnVerPontuacao não encontrado."
            );

            return;
        }

        btnVerPontuacao.addEventListener(
            "click",
            function () {

                // Pequeno atraso para garantir
                // que o script.js já tenha
                // montado o resultado.

                setTimeout(
                    function () {

                        // ========================================
                        // VERIFICA SE descobrirVencedor EXISTE
                        // ========================================

                        if (
                            typeof descobrirVencedor !==
                            "function"
                        ) {

                            console.error(
                                "❌ A função descobrirVencedor() não foi encontrada."
                            );

                            return;
                        }

                        // ========================================
                        // DESCOBRE A ÁREA VENCEDORA
                        // ========================================

                        const vencedor =
                            descobrirVencedor();

                        console.log(
                            "🏆 Área vencedora:",
                            vencedor
                        );

                        // ========================================
                        // CRIA O AVATAR
                        // ========================================

                        criarAvatar(
                            vencedor
                        );

                    },
                    50
                );
            }
        );
    }
);
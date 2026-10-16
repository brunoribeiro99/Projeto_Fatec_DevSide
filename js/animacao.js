/* =========================================================
   PIXELU — CONTROLE DO QUIZ
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const totalPerguntas = 10;

    /*
       0 = Dados pessoais
       1 = Pergunta 1
       ...
       10 = Pergunta 10
    */
    let etapaAtual = 0;


    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const dadosPessoais = document.getElementById("perguntaDados");


    /* =====================================================
       MOSTRAR ETAPA
       ===================================================== */

    function mostrarEtapa(etapa) {

        /* Esconde ou mostra os dados pessoais */
        if (dadosPessoais) {
            dadosPessoais.style.display =
                (etapa === 0) ? "block" : "none";
        }

        /* Esconde ou mostra as perguntas de 1 a 10 */
        for (let i = 1; i <= totalPerguntas; i++) {

            const pergunta =
                document.getElementById(`pergunta${i}`);

            if (pergunta) {
                pergunta.style.display =
                    (etapa === i) ? "block" : "none";
            }
        }

        etapaAtual = etapa;

        atualizarBotoes();

        /* Rola a página suavemente para o topo */
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =====================================================
       VERIFICAR DADOS PESSOAIS
       ===================================================== */

    function dadosPreenchidos() {

        const nome = document.getElementById("nome");
        const nickname = document.getElementById("nickname");
        const celular = document.getElementById("celular");
        const email = document.getElementById("email");
        const idade = document.getElementById("idade");

        const genero =
            document.querySelector(
                'input[name="genero"]:checked'
            );

        const tomPele =
            document.querySelector(
                'input[name="tomPele"]:checked'
            );


        if (
            !nome ||
            !celular ||
            !email ||
            !idade ||
            !genero ||
            !tomPele
        ) {
            return false;
        }


        const celularNumeros =
            celular.value.replace(/\D/g, "");


        const emailValido =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                email.value.trim()
            );


        return (
            nome.value.trim().length >= 3 &&
            (!nickname ||
                nickname.value.trim().length > 0) &&
            celularNumeros.length >= 10 &&
            emailValido &&
            idade.value.trim() !== ""
        );
    }


    /* =====================================================
       VERIFICAR PERGUNTA RESPONDIDA
       ===================================================== */

    function perguntaRespondida(numero) {

        const pergunta =
            document.getElementById(`pergunta${numero}`);


        if (!pergunta) {
            return false;
        }


        const respostas =
            pergunta.querySelectorAll(
                'input[type="radio"], input[type="checkbox"]'
            );


        return Array.from(respostas).some(
            resposta => resposta.checked
        );
    }


    /* =====================================================
       VERIFICAR ETAPA ATUAL
       ===================================================== */

    function etapaRespondida() {

        if (etapaAtual === 0) {
            return dadosPreenchidos();
        }

        return perguntaRespondida(etapaAtual);
    }


    /* =====================================================
       ATUALIZAR BOTÕES
       ===================================================== */

    function atualizarBotoes() {

        /* Dados pessoais (Etapa 0) */
        if (etapaAtual === 0) {

            const proxima =
                document.getElementById("btnProximaDados");


            if (proxima) {

                /* CORRIGIDO */
                proxima.disabled =
                    !dadosPreenchidos();
            }


            return;
        }


        /* Perguntas 1 a 9 */
        if (etapaAtual < totalPerguntas) {

            const proxima =
                document.getElementById(
                    `btnProxima${etapaAtual}`
                );


            if (proxima) {

                /* CORRIGIDO */
                proxima.disabled =
                    !perguntaRespondida(etapaAtual);
            }
        }


        /* Pergunta 10 */
        else if (etapaAtual === totalPerguntas) {

            const btnVerPontuacao =
                document.getElementById(
                    "btnVerPontuacao"
                );


            if (btnVerPontuacao) {

                btnVerPontuacao.disabled =
                    !perguntaRespondida(totalPerguntas);


                btnVerPontuacao.style.opacity =
                    perguntaRespondida(totalPerguntas)
                        ? "1"
                        : "0.5";
            }
        }
    }


    /* =====================================================
       IR PARA PRÓXIMA ETAPA
       ===================================================== */

    function proximaEtapa() {

        /* CORRIGIDO */
        if (!etapaRespondida()) {
            return;
        }


        if (etapaAtual === totalPerguntas) {

            finalizarQuiz();

            return;
        }


        mostrarEtapa(etapaAtual + 1);
    }


    /* =====================================================
       VOLTAR ETAPA
       ===================================================== */

    function voltarEtapa() {

        if (etapaAtual === 0) {
            return;
        }


        mostrarEtapa(etapaAtual - 1);
    }


    /* =====================================================
       FINALIZAR QUIZ
       ===================================================== */

    function finalizarQuiz() {

        alert("Quiz concluído com sucesso! 🎮");

        /*
           Aqui depois vamos colocar a lógica
           para gerar o avatar e mostrar o resultado.
        */
    }


    /* =====================================================
       REGISTRO DE EVENTOS
       ===================================================== */

    const nome =
        document.getElementById("nome");

    const nickname =
        document.getElementById("nickname");

    const celular =
        document.getElementById("celular");

    const email =
        document.getElementById("email");

    const idade =
        document.getElementById("idade");


    const generos =
        document.querySelectorAll(
            'input[name="genero"]'
        );


    const tonsPele =
        document.querySelectorAll(
            'input[name="tomPele"]'
        );


    if (nome) {
        nome.addEventListener(
            "input",
            atualizarBotoes
        );
    }


    if (nickname) {
        nickname.addEventListener(
            "input",
            atualizarBotoes
        );
    }


    if (celular) {
        celular.addEventListener(
            "input",
            atualizarBotoes
        );
    }


    if (email) {
        email.addEventListener(
            "input",
            atualizarBotoes
        );
    }


    if (idade) {
        idade.addEventListener(
            "input",
            atualizarBotoes
        );
    }


    generos.forEach(genero => {

        genero.addEventListener(
            "change",
            atualizarBotoes
        );

    });


    tonsPele.forEach(tom => {

        tom.addEventListener(
            "change",
            atualizarBotoes
        );

    });


    /* =====================================================
       BOTÃO PRÓXIMO DOS DADOS PESSOAIS
       ===================================================== */

    const btnProximaDados =
        document.getElementById(
            "btnProximaDados"
        );


    if (btnProximaDados) {

        btnProximaDados.addEventListener(
            "click",
            proximaEtapa
        );
    }


    /* =====================================================
       BOTÕES DE AVANÇAR E VOLTAR
       ===================================================== */

    for (let i = 1; i <= totalPerguntas; i++) {

        const btnProxima =
            document.getElementById(
                `btnProxima${i}`
            );


        const btnVoltar =
            document.getElementById(
                `btnVoltar${i}`
            );


        if (btnProxima) {

            btnProxima.addEventListener(
                "click",
                proximaEtapa
            );
        }


        if (btnVoltar) {

            btnVoltar.addEventListener(
                "click",
                voltarEtapa
            );
        }


        /* Detectar mudanças nas opções */

        const pergunta =
            document.getElementById(
                `pergunta${i}`
            );


        if (pergunta) {

            const respostas =
                pergunta.querySelectorAll(
                    'input[type="radio"], input[type="checkbox"]'
                );


            respostas.forEach(resposta => {

                resposta.addEventListener(
                    "change",
                    atualizarBotoes
                );

            });
        }
    }


    /* =====================================================
       BOTÃO FINAL — VER PONTUAÇÃO
       ===================================================== */

    const btnVerPontuacao =
        document.getElementById(
            "btnVerPontuacao"
        );


    if (btnVerPontuacao) {

        btnVerPontuacao.addEventListener(
            "click",
            function () {

                if (etapaRespondida()) {
                    finalizarQuiz();
                }

            }
        );
    }


    /* =====================================================
       INICIALIZAÇÃO DO APP
       ===================================================== */

    mostrarEtapa(0);

});
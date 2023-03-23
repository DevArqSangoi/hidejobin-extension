let ARRAY_DAS_VAGAS = [];
let ARRAY_DATA_JOB_ID = [];
let ARRAY_DOS_ARIALABEL = [];
let ARRAY_VAGAS_LIMPAS = [];

const OBSERVAR_DOM = new MutationObserver((mutations) => criarArrayVagas());

OBSERVAR_DOM.observe(document.body, {
    childList: true,
    subtree: true
});

function criarArrayVagas() {

    const ariaLabel = document.querySelectorAll('[aria-label*="com ação de Ocultar vaga"]');

    if (ARRAY_DAS_VAGAS.length === 0) {
        ARRAY_DAS_VAGAS = Array.from(ariaLabel);
        ARRAY_DOS_ARIALABEL = ARRAY_DAS_VAGAS.map(vaga => vaga.getAttribute('aria-Label'));
        ARRAY_VAGAS_LIMPAS = ARRAY_DOS_ARIALABEL.map((vaga) => {
            return vaga.replace('Marcar ', '').replace(' com ação de Ocultar vaga', '');
        });
    } else if (ariaLabel.length > ARRAY_DAS_VAGAS.length) {
        let novasVagas = Array.from(ariaLabel).slice(ARRAY_DAS_VAGAS.length);
        ARRAY_DAS_VAGAS = ARRAY_DAS_VAGAS.concat(novasVagas);
        ARRAY_DOS_ARIALABEL = ARRAY_DAS_VAGAS.map(vaga => vaga.getAttribute('aria-Label'));
        ARRAY_VAGAS_LIMPAS = ARRAY_DOS_ARIALABEL.map((vaga) => {
            return vaga.replace('Marcar ', '').replace(' com ação de Ocultar vaga', '');
        });

        novasVagas.forEach((vaga) => {
            const vagaStorage = vaga.getAttribute('aria-label').replace('Marcar ', '').replace(' com ação de Ocultar vaga', '');
            if (verificarParaOcultar(vagaStorage)) {
                vaga.parentNode.style.display = 'none';
            }
        });
    }

    ariaLabel.forEach((vaga) => {
        vaga.addEventListener('click', () => {
            const vagaClicada = vaga.getAttribute('aria-Label');
            console.log(vagaClicada);
            ARRAY_VAGAS_LIMPAS.forEach((vagasArray) => {
                console.log(vagasArray);
                if (vagaClicada.includes(vagasArray)) {
                    localStorage.setItem(vagasArray, true);
                }
            })
        });
    });

    ARRAY_DAS_VAGAS.forEach((vaga) => {
        const vagaStorage = vaga.getAttribute('aria-label').replace('Marcar ', '').replace(' com ação de Ocultar vaga', '');
        if (verificarParaOcultar(vagaStorage)) {
            vaga.parentNode.style.display = 'none';
        }
    });
};

function verificarParaOcultar(vagaStorage) {
    return localStorage.getItem(vagaStorage) === 'true';
}

const ariaLabel = document.querySelectorAll('[aria-label*="com ação de Ocultar vaga"]');

if (ARRAY_DAS_VAGAS.length === 0) {
    ARRAY_DAS_VAGAS = Array.from(ariaLabel);
    ARRAY_DOS_ARIALABEL = ARRAY_DAS_VAGAS.map(vaga => vaga.getAttribute('aria-Label'));
    ARRAY_VAGAS_LIMPAS = ARRAY_DOS_ARIALABEL.map((vaga) => {
        return vaga.replace('Marcar ', '').replace(' com ação de Ocultar vaga', '');
    });
} else if (ariaLabel.length > ARRAY_DAS_VAGAS.length) {
    let novasVagas = Array.from(ariaLabel).slice(ARRAY_DAS_VAGAS.length);
    ARRAY_DAS_VAGAS = ARRAY_DAS_VAGAS.concat(novasVagas);
    ARRAY_DOS_ARIALABEL = ARRAY_DAS_VAGAS.map(vaga => vaga.getAttribute('aria-Label'));
    ARRAY_VAGAS_LIMPAS = ARRAY_DOS_ARIALABEL.map((vaga) => {
        return vaga.replace('Marcar ', '').replace(' com ação de Ocultar vaga', '');
    });

    novasVagas.forEach((vaga) => {
        const vagaStorage = vaga.getAttribute('aria-label').replace('Marcar ', '').replace(' com ação de Ocultar vaga', '');
        if (verificarParaOcultar(vagaStorage)) {
            vaga.parentNode.style.display = 'none';
        }
    });
}

ariaLabel.forEach((vaga) => {
    vaga.addEventListener('click', () => {
        const vagaClicada = vaga.getAttribute('aria-Label');
        console.log(vagaClicada);
        ARRAY_VAGAS_LIMPAS.forEach((vagasArray) => {
            console.log(vagasArray);
            if (vagaClicada.includes(vagasArray)) {
                localStorage.setItem(vagasArray, true);
            }
        })
    });
});

ARRAY_DAS_VAGAS.forEach((vaga) => {
    const vagaStorage = vaga.getAttribute('aria-label').replace('Marcar ', '').replace(' com ação de Ocultar vaga', '');
    if (verificarParaOcultar(vagaStorage)) {
        vaga.parentNode.style.display = 'none';
    }
});
let ARRAY_DATA_JOB_ID = [];
let ARRAY_NODE_JOB_ID = [];

function coletarDataJobId() {
    const dataJobIds = Array.from(document.querySelectorAll('div[data-job-id]'));
    return dataJobIds.map(vaga => vaga.getAttribute('data-job-id'));
};

function coletarNodes() {
    const dataJobIds = Array.from(document.querySelectorAll('div[data-job-id]'));
    return dataJobIds;
};

function monitorarVagas() {
    ARRAY_NODE_JOB_ID = coletarNodes();
    console.log("CRIANDO NODES");
    ARRAY_NODE_JOB_ID.forEach((vaga) => {
        vaga.addEventListener('click', () => {
            console.log("ADICIONANDO EVENT");
            let vagaClicada = vaga.getAttribute('data-job-id');
            if (localStorage.getItem(vagaClicada === null)) {
                localStorage.setItem(vagaClicada, "HideJobIn");
                console.log("VAGA INSERIDA NO STORAGE " + vagaClicada);
            }
        });
    });
};

function verificarVagasOcultas(vagas) {
    vagas.forEach((vaga) => {
        let vagaOcultada = document.querySelector(`[data-job-id="${vaga}"]`);
        if ((localStorage.getItem(vaga) === "HideJobIn") && (vagaOcultada.parentNode.style.display !== 'none')) {
            vagaOcultada.parentNode.style.display = 'none';
            console.log("VAGA OCULTADA " + vaga);
        }
    });
};

function observarNovasVagas() {
    ARRAY_DATA_JOB_ID = coletarDataJobId();
    const OBSERVAR_DOM = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute('data-job-id')) {
                        console.log("VERIFICANDO VAGAS");
                        let novasVagas = coletarDataJobId().filter(vaga => !ARRAY_DATA_JOB_ID.includes(vaga));
                        monitorarVagas();
                        verificarVagasOcultas(novasVagas);
                    }
                });
            }
        });
    });

    OBSERVAR_DOM.observe(document.body, {
        childList: true,
        subtree: true
    });
};

observarNovasVagas();
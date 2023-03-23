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

function monitorarVagas(vagas) {
    vagas.forEach((vaga) => {
        vaga.addEventListener('click', () => {
            const vagaClicada = vaga.getAttribute('data-job-id');
            if (localStorage.getItem(vagaClicada) === null) {
                localStorage.setItem(vagaClicada, "HideJobIn");
            }
        });
    });
};

function verificarVagasOcultas(vagas) {
    vagas.forEach((vaga) => {
        const vagaId = vaga.getAttribute('data-job-id');
        if ((localStorage.getItem(vagaId) === "HideJobIn") && (vaga.parentNode.style.display !== 'none')) {
            vaga.parentNode.style.display = 'none';            
        }
    });
};

function observarNovasVagas() {
    ARRAY_NODE_JOB_ID = coletarNodes();
    ARRAY_DATA_JOB_ID = coletarDataJobId();

    monitorarVagas(ARRAY_NODE_JOB_ID);
    verificarVagasOcultas(ARRAY_NODE_JOB_ID);

    const OBSERVAR_DOM = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute('data-job-id')) {                        
                        const novasVagas = coletarNodes().filter(vaga => !ARRAY_NODE_JOB_ID.includes(vaga));
                        ARRAY_DATA_JOB_ID = ARRAY_DATA_JOB_ID.concat(coletarDataJobId(novasVagas));
                        ARRAY_NODE_JOB_ID = ARRAY_NODE_JOB_ID.concat(novasVagas);
                        monitorarVagas(novasVagas);
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
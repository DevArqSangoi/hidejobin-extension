let ARRAY_GET_JOBID = [];
let ARRAY_DATA_JOB_ID = [];
let dataJobId = [];

const OBSERVAR_DOM = new MutationObserver((mutations) => criarArrayVagas());

OBSERVAR_DOM.observe(document.body, {
    childList: true,
    subtree: true
});

function criarArrayVagas() {
    dataJobId = document.querySelectorAll('div[data-job-id]');

    if (ARRAY_GET_JOBID.length === 0) {
        ARRAY_GET_JOBID = Array.from(dataJobId);
        ARRAY_DATA_JOB_ID = ARRAY_GET_JOBID.map(vaga => vaga.getAttribute('data-job-id'));
    } else if (dataJobId.length > ARRAY_GET_JOBID.length) {
        let novasVagas = Array.from(dataJobId).slice(ARRAY_GET_JOBID.length);
        ARRAY_GET_JOBID = ARRAY_GET_JOBID.concat(novasVagas);
        ARRAY_DATA_JOB_ID = ARRAY_GET_JOBID.map(vaga => vaga.getAttribute('data-job-id'));
    }
};

function observarSeOcultou() {
    ARRAY_DATA_JOB_ID.forEach((vaga) => {
        vaga.addEventListener('click', () => {
            const vagaClicada = vaga.getAttribute('data-job-id');
            ARRAY_DATA_JOB_ID.forEach((jobIdArray) => {
                if (vagaClicada.includes(jobIdArray)) {
                    localStorage.setItem(jobIdArray, true);
                    console.log("PASSOU AQUI");
                }
            })
        });
    });
}

const jobIdStorage = vaga.getAttribute('data-job-id');
if (verificarParaOcultar(jobIdStorage)) {
    vaga.parentNode.style.display = 'none';
}

function conferirVagasOcultadas(jobIdStorage) {
    return localStorage.getItem(jobIdStorage) === 'true';
}
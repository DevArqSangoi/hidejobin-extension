let ARRAY_GET_JOBID = [];
let ARRAY_DATA_JOB_ID = [];
let dataJobId = [];
let novasVagas = [];

const OBSERVAR_DOM = new MutationObserver((mutations) => criarArrayVagas());
const ADICIONAR_EL = new MutationObserver((mutations) => adicionarEventListener());
const CONFERIR_JOB = new MutationObserver((mutations) => conferirVagasOcultas());

OBSERVAR_DOM.observe(document.body, {
    childList: true,
    subtree: true
});

ADICIONAR_EL.observe(document.body, {
    childList: true,
    subtree: true
});

CONFERIR_JOB.observe(document.body, {
    childList: true,
    subtree: true
});

function criarArrayVagas() {
    dataJobId = document.querySelectorAll('div[data-job-id]');

    if (ARRAY_GET_JOBID.length === 0) {
        ARRAY_GET_JOBID = Array.from(dataJobId);
        ARRAY_DATA_JOB_ID = ARRAY_GET_JOBID.map(vaga => vaga.getAttribute('data-job-id'));
    } else if (dataJobId.length > ARRAY_GET_JOBID.length) {
        novasVagas = Array.from(dataJobId).slice(ARRAY_GET_JOBID.length);
        ARRAY_GET_JOBID = ARRAY_GET_JOBID.concat(novasVagas);
        ARRAY_DATA_JOB_ID = ARRAY_GET_JOBID.map(vaga => vaga.getAttribute('data-job-id'));
    }
};

function adicionarEventListener() {
    if (ARRAY_DATA_JOB_ID.length > 0) {
        ARRAY_DATA_JOB_ID.forEach((vaga) => {
            vaga.addEventListener('click', () => {
                vagaOcultada(vaga);
            });
        });
    }
}

function vagaOcultada(vaga) {
    let vagaClicada = vaga.getAttribute('data-job-id');
    ARRAY_DATA_JOB_ID.forEach((jobIdArray) => {
        if (vagaClicada.includes(jobIdArray)) {
            localStorage.setItem(jobIdArray, true);
            console.log("PASSOU AQUI");
        }
    })
}

/* function conferirVagasOcultas() {
    jobIdStorage.forEach((vaga) => {
        let vagaClicada = vaga.getAttribute('data-job-id');
        if (localStorage.getItem(jobIdStorage) === 'true) {
            vaga.parentNode.style.display = 'none';
        }
        });

    return localStorage.getItem(jobIdStorage) === 'true';
}*/

/*function observarNovasVagas() {
    ARRAY_DATA_JOB_ID = coletarDataJobId();
    const OBSERVAR_DOM = new MutationObserver((mutations) => {
        const novasVagas = coletarDataJobId().filter(vaga => !ARRAY_DATA_JOB_ID.includes(vaga));
        monitorarVagas();
        verificarVagasOcultas(novasVagas);
    });

    OBSERVAR_DOM.observe(document.body, {
        childList: true,
        subtree: true
    });
};*/
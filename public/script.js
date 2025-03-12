import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAz7EaASw3bGM2KYcN1PFo4QbdzC8_lfdU",
    authDomain: "eventos-rdr.firebaseapp.com",
    databaseURL: "https://eventos-rdr-default-rtdb.firebaseio.com",
    projectId: "eventos-rdr",
    storageBucket: "eventos-rdr.firebasestorage.app",
    messagingSenderId: "820714214725",
    appId: "1:820714214725:web:c48ec5ea89a4281c8c9a2c",
    measurementId: "G-5S05E5C37J"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);



// Função executada quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    // Preencher datas e horas na página
    carregarDadosDoFirebase().catch(erro => {
        console.error("Falha ao inicializar dados:", erro);
      });
    // Configurar botão de tópicos de oração
    setupPrayerButton();

    // Adicionar animações aos cards
    addCardAnimations();


});



// Função para preencher campos de data
// Função para carregar dados do Firebase

async function carregarDadosDoFirebase() {
    try {
        // Referência ao nó 'eventos' que contém todas as variáveis
        const eventosRef = ref(database, 'jejum');

        // Faz a leitura única de todos os valores
        const snapshot = await get(eventosRef);

        // Verifica se os dados existem
        if (snapshot.exists()) {
            const dados = snapshot.val();

            // Objeto que irá armazenar todas as variáveis
            const variaveis = {
                mes: dados.mes || "",
                primeiro_dia: dados.primeiro_dia + `/${dados.mes || ""}` || "",
                segundo_dia: dados.segundo_dia + `/${dados.mes || ""}` || "",
                ultimo_dia: dados.ultimo_dia + `/${dados.mes || ""}` || "",
                diaSemanaInicio: dados.dia_semana_i || "",
                diaSemanFim: dados.dia_semana_f || "",
                horasJovens1: dados.horas_jovens_1 || "",
                horasJovens2: dados.horas_jovens_2 || "",
                horasAdultos1: dados.horas_adultos_1 || "",
                horasAdultos2: dados.horas_adultos_2 || ""
            };

            console.log("Variáveis carregadas com sucesso:", variaveis);

            // Chamar a função para preencher os campos na página
            populateDateFields(variaveis);

            return variaveis;
        } else {
            console.log("Nenhum dado encontrado no nó 'eventos'");
            throw new Error("Dados não encontrados");
        }
    } catch (erro) {
        console.error("Erro ao carregar variáveis:", erro);

        // Mostrar mensagem de erro para o usuário
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.textContent = `Erro ao carregar dados: ${erro.message}`;
            errorMessage.style.display = 'block';
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 3000);
        }

        throw erro;
    }
}

// Função para preencher os elementos na página com os dados carregados
function populateDateFields(dados) {
    const dateFields = {
        "mes": dados.mes,
        "dataInicio": dados.primeiro_dia,
        "dataInicio2": dados.primeiro_dia,
        "dataInicio3": dados.primeiro_dia,
        "dataIntermediaria": dados.segundo_dia,
        "dataIntermediaria2": dados.segundo_dia,
        "dataFim": dados.ultimo_dia,
        "dataFim2": dados.ultimo_dia,
        "dataFim3": dados.ultimo_dia,
        "diaSemanaInicio": dados.diaSemanaInicio,
        "diaSemanFim": dados.diaSemanFim,
        "horasJovens1": dados.horasJovens1,
        "horasJovens2": dados.horasJovens2,
        "horasAdultos1": dados.horasAdultos1,
        "horasAdultos2": dados.horasAdultos2
    };

    // Preencher todos os campos de data
    for (const [id, value] of Object.entries(dateFields)) {
        const element = document.getElementById(id);
        if (element) {
            // Verificar se o elemento é um campo de seleção ou texto comum
            if (element.tagName === 'SELECT') {
                // Para elementos SELECT, definir o value
                element.value = value;
            } else {
                // Para outros elementos, definir o textContent
                element.textContent = value;
            }
        } else {
            console.warn(`Elemento com ID "${id}" não encontrado no DOM`);
        }
    }

    console.log("Campos preenchidos com sucesso");
}
// Função para configurar botão de tópicos de oração
function setupPrayerButton() {
    const showPrayer = document.getElementById("showPrayer");
    const prayerTopics = document.getElementById("prayerTopics");
    const buttonText = document.getElementById("buttonText");
    const buttonIcon = document.getElementById("buttonIcon");

    showPrayer.addEventListener("click", function () {
        const isVisible = prayerTopics.style.display === "block";

        // Alterar visibilidade da seção
        prayerTopics.style.display = isVisible ? "none" : "block";

        // Alterar texto do botão
        buttonText.textContent = isVisible ? "Ver Tópicos de Oração" : "Esconder Tópicos de Oração";

        // Alterar ícone do botão (rotacionar seta)
        buttonIcon.className = isVisible
            ? "fas fa-chevron-down"
            : "fas fa-chevron-up";

        // Se estiver abrindo, adicionar animação
        if (!isVisible) {
            prayerTopics.classList.add("fade-in");

            // Scroll suave até a seção de tópicos
            setTimeout(() => {
                prayerTopics.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    });
}

// Função para adicionar animações aos cards
function addCardAnimations() {
    const cards = document.querySelectorAll('.card');

    // Observador de interseção para animar cards quando entrarem na viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observar cada card
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Adicionar eventos para melhorar a UX dos itens de oração
document.addEventListener('DOMContentLoaded', function () {
    const prayerItems = document.querySelectorAll('.prayer-item');

    prayerItems.forEach(item => {
        item.addEventListener('click', function () {
            // Efeito visual ao clicar em um tópico de oração
            this.style.backgroundColor = 'var(--primary-dark)';
            this.style.color = 'white';

            // Restaurar após um tempo
            setTimeout(() => {
                this.style.backgroundColor = '';
                this.style.color = '';
            }, 300);
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const overlay = document.getElementById('overlay');

    // Toggle menu when hamburger icon is clicked
    menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        overlay.classList.toggle('active');

        // Prevent scrolling when menu is open
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on the overlay
    overlay.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close menu when clicking on a nav item
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when window is resized above mobile breakpoint
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
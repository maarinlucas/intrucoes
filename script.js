// Configurações de datas (variáveis para fácil alteração)
const dataInicio = "14/03";
const dataIntermediaria = "15/03";
const dataFim = "16/03";
const diaSemanaInicio = "sexta";
const diaSemanFim = "domingo";

// Configurações de horas (variáveis para fácil alteração)
const horasJovens1 = "6 a 7";
const horasJovens2 = "7 a 8";
const horasAdultos1 = "7 a 8";
const horasAdultos2 = "8 a 10";

// Função executada quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Preencher datas e horas na página
    populateDateFields();
    
    // Configurar botão de tópicos de oração
    setupPrayerButton();
    
    // Adicionar animações aos cards
    addCardAnimations();
    
   
});

// Função para preencher campos de data
function populateDateFields() {
    const dateFields = {
        "dataInicio": dataInicio,
        "dataInicio2": dataInicio,
        "dataInicio3": dataInicio,
        "dataIntermediaria": dataIntermediaria,
        "dataIntermediaria2": dataIntermediaria,
        "dataFim": dataFim,
        "dataFim2": dataFim,
        "dataFim3": dataFim,
        "diaSemanaInicio": diaSemanaInicio,
        "diaSemanFim": diaSemanFim,
        "horasJovens1": horasJovens1,
        "horasJovens2": horasJovens2,
        "horasAdultos1": horasAdultos1,
        "horasAdultos2": horasAdultos2
    };
    
    // Preencher todos os campos de data
    for (const [id, value] of Object.entries(dateFields)) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }
}

// Função para configurar botão de tópicos de oração
function setupPrayerButton() {
    const showPrayer = document.getElementById("showPrayer");
    const prayerTopics = document.getElementById("prayerTopics");
    const buttonText = document.getElementById("buttonText");
    const buttonIcon = document.getElementById("buttonIcon");
    
    showPrayer.addEventListener("click", function() {
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
document.addEventListener('DOMContentLoaded', function() {
    const prayerItems = document.querySelectorAll('.prayer-item');
    
    prayerItems.forEach(item => {
        item.addEventListener('click', function() {
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


document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const overlay = document.getElementById('overlay');
    
    // Toggle menu when hamburger icon is clicked
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on the overlay
    overlay.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close menu when clicking on a nav item
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when window is resized above mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
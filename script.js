document.addEventListener('DOMContentLoaded', function() {
    // 1. Menu Hambúrguer
    const header = document.querySelector('header');
    const menuToggle = document.createElement('div');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    header.appendChild(menuToggle);

    const nav = document.createElement('nav');
    const navLinks = Array.from(document.querySelectorAll('header a'));
    navLinks.forEach(link => nav.appendChild(link.cloneNode(true))); // Clone os links para o menu

    header.insertBefore(nav, header.lastElementChild); // Insere nav antes do menu-toggle

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('open');
        this.classList.toggle('open');
    });

    // Esconde o menu em telas maiores (CSS fará o controle visual inicial)
    function handleResize() {
        if (window.innerWidth > 768) {
            nav.classList.remove('open');
            menuToggle.classList.remove('open');
        }
    }
    window.addEventListener('resize', handleResize);

    // 2. Rolagem Suave
    const navLinksSmooth = document.querySelectorAll('header nav a');
    navLinksSmooth.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - header.offsetHeight, // Considera a altura do header
                    behavior: 'smooth'
                });

                // Fecha o menu mobile após clicar no link
                if (nav.classList.contains('open')) {
                    nav.classList.remove('open');
                    menuToggle.classList.remove('open');
                }
            }
        });
    });

    // 3. Validação do Formulário de Contato
    const formContato = document.getElementById('form-contato');
    if (formContato) {
        formContato.addEventListener('submit', function(e) {
            let isValid = true;
            const nomeInput = document.querySelector('#contato input[placeholder="Nome"]');
            const emailInput = document.querySelector('#contato input[placeholder="E-mail"]');
            const mensagemTextarea = document.querySelector('#contato textarea[placeholder="Mensagem"]');

            if (!nomeInput.value.trim()) {
                alert('Por favor, preencha o seu nome.');
                isValid = false;
                nomeInput.focus();
            } else if (!emailInput.value.trim()) {
                alert('Por favor, preencha o seu e-mail.');
                isValid = false;
                emailInput.focus();
            } else if (!isValidEmail(emailInput.value.trim())) {
                alert('Por favor, digite um e-mail válido.');
                isValid = false;
                emailInput.focus();
            } else if (!mensagemTextarea.value.trim()) {
                alert('Por favor, digite a sua mensagem.');
                isValid = false;
                mensagemTextarea.focus();
            }

            if (!isValid) {
                e.preventDefault(); // Impede o envio do formulário se houver erros
            } else {
                alert('Mensagem enviada com sucesso! (Funcionalidade de envio real não implementada neste código)');
                // Aqui você colocaria o código para enviar os dados do formulário
                formContato.reset();
            }
        });

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }

    // 4. Carrossel de Depoimentos (Opcional - Requer biblioteca externa como Slick Carousel)
    // Para implementar um carrossel, você precisaria incluir a biblioteca
    // no seu HTML (<link rel="stylesheet" type="text/css" href="slick/slick.css"/>
    // <link rel="stylesheet" type="text/css" href="slick/slick-theme.css"/>)
    // e adicionar o seguinte código:
    /*
    const depoimentosContainer = document.querySelector('#depoimentos');
    if (depoimentosContainer) {
        $('.depoimentos').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true
        });
    }
    */

    // 5. Animações de Entrada (Opcional - Pode ser feito com CSS Transitions/Animations ou bibliotecas como AOS)
    // Exemplo básico com JavaScript para adicionar uma classe 'fade-in' ao scroll:
    /*
    const elementsToAnimate = document.querySelectorAll('.fade-in-element');

    function checkVisibility() {
        elementsToAnimate.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 50) { // Ajuste o valor '-50' conforme necessário
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Verifica na carga inicial
    */
});
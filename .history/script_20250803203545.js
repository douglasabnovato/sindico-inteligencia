document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const contactForm = document.getElementById('contact-form');

    const form = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    // 1. Navegação do Menu Hambúrguer (UX)
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link (para mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // 2. Rolagem Suave (UX)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerOffset = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // 3. Validação do Formulário de Contato (Conversão)
    /*contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validação básica dos campos
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || phone === '' || message === '') {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        // Simulação de envio de formulário
        alert('Obrigado! Sua mensagem foi enviada com sucesso. Em breve entraremos em contato.');
        contactForm.reset();
    });*/

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }


    // Função para esconder a mensagem de feedback
    window.hideFeedback = function() {
        formFeedback.style.display = 'none';
        form.style.display = 'block'; // Mostra o formulário novamente
    };

    // 4. Envio Assíncrono do Formulário e Feedback
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || phone === '' || message === '') {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Sucesso: Esconde o formulário e exibe a mensagem de feedback
                form.style.display = 'none';
                formFeedback.style.display = 'block';
                form.reset();
            } else {
                // Erro: Exibe uma mensagem de erro
                const data = await response.json();
                alert(data.error);
            }
        } catch (error) {
            console.error('Erro no envio do formulário:', error);
            alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
        }
    });

});
document.addEventListener('DOMContentLoaded', function () {
    // Tela inicial: escolha de "Sim" ou "Não"
    const simButton = document.getElementById("sim");
    const naoButton = document.getElementById("nao");

    if (simButton && naoButton) {
        simButton.onclick = function () {
            document.getElementById("content").innerHTML = '<h1>Boa escolha!</h1>';
            const h1Element = document.querySelector('h1');
            let opacity = 1;
            const fadeOut = setInterval(() => {
                if (opacity <= 0) {
                    clearInterval(fadeOut);
                    carregarVideo();
                } else {
                    opacity -= 0.1;
                    h1Element.style.opacity = opacity;
                }
            }, 100);
        };

        naoButton.onclick = function () {
            document.getElementById("content").innerHTML = '<h1>Entendemos que o medo é grande demais para enfrentar tamanho mistério, talvez numa próxima vez você seja corajoso o suficiente.</h1>';
        };
    }

    function carregarVideo() {
        document.getElementById("content").innerHTML = '<video id="video1" width="100%" autoplay><source src="video1.mp4" type="video/mp4"></video>';
        const video = document.getElementById('video1');
        video.onended = function () {
            esmaecerTela();
        };
    }

    function esmaecerTela() {
        const video = document.getElementById('video1');
        video.style.transition = 'opacity 1s ease';
        video.style.opacity = 0; // Inicia o efeito de esmaecimento

        setTimeout(() => {
            piscarTela();
        }, 1000); // Aguarda o esmaecimento
    }

    function piscarTela() {
        let flashInterval = setInterval(() => {
            document.body.style.backgroundColor = document.body.style.backgroundColor === 'orange' ? 'black' : 'orange';
        }, 150); // Piscar mais rápido

        setTimeout(() => {
            clearInterval(flashInterval);
            window.location.href = "#inscricao"; // Troca para a página de inscrição
            carregarInscricao();
        }, 3000); // Duração do piscar
    }

    // Página de inscrição: troca de fotos de perfil
    function carregarInscricao() {
        document.body.innerHTML = `
        <div class="inscricao-container">
            <h1>Seja bem-vindo!</h1>

            <div class="profile-selector">
                <button id="left-arrow">&lt;</button>
                <div class="profile-image">
                    <img id="profile-pic" src="perfil1.png" alt="Foto de Perfil">
                </div>
                <button id="right-arrow">&gt;</button>
            </div>

            <form id="signup-form">
                <input type="text" id="name" placeholder="Nome" required>
                <input type="email" id="email" placeholder="E-mail" required>
                <input type="password" id="password" placeholder="Senha" required>
                <input type="password" id="confirm-password" placeholder="Confirme sua Senha" required>
                <button type="submit" id="confirmar">Confirmar</button>
            </form>

            <p>Já possui uma conta? <a href="#login">Entre aqui</a></p>
        </div>
        `;

        const profiles = ['perfil1.png', 'perfil2.png', 'perfil3.png'];
        let currentProfileIndex = 0;

        const leftArrow = document.getElementById("left-arrow");
        const rightArrow = document.getElementById("right-arrow");
        const profilePic = document.getElementById("profile-pic");

        leftArrow.onclick = function () {
            currentProfileIndex = (currentProfileIndex === 0) ? profiles.length - 1 : currentProfileIndex - 1;
            profilePic.src = profiles[currentProfileIndex];
        };

        rightArrow.onclick = function () {
            currentProfileIndex = (currentProfileIndex === profiles.length - 1) ? 0 : currentProfileIndex + 1;
            profilePic.src = profiles[currentProfileIndex];
        };

        // Validação e Cadastro de usuário
        const signupForm = document.getElementById('signup-form');
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }

            // Salvar dados do usuário no localStorage (pode ser substituído por um banco de dados real)
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                alert('Este e-mail já está cadastrado!');
            } else {
                users.push({ name, email, password });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Usuário cadastrado com sucesso!');
                window.location.href = "#login"; // Redireciona para a página de login
                carregarLogin();
            }
        });
    }

    // Página de login
    function carregarLogin() {
        document.body.innerHTML = `
        <div class="login-container">
            <h1>Bom te ver novamente!</h1>

            <form id="login-form">
                <input type="email" id="login-email" placeholder="E-mail" required>
                <input type="password" id="login-password" placeholder="Senha" required>
                <button type="submit">Entrar</button>
            </form>

            <p>Primeira vez aqui? <a href="#inscricao">Faça sua inscrição</a></p>
        </div>
        `;

        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                alert('Login realizado com sucesso!');
                // Redirecionar para a próxima parte do site
            } else {
                alert('E-mail ou senha incorretos!');
            }
        });
    }
});

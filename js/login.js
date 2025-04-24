document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    const mensagemDiv = document.getElementById('login-mensagem');
    
    // Carrega usuários do localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Limpa mensagens anteriores
        mensagemDiv.textContent = '';
        mensagemDiv.className = '';
        
        // Obtém valores dos campos
        const loginOuEmail = document.getElementById('login-email').value;
        const senha = document.getElementById('login-senha').value;
        
        // Verifica se há usuários cadastrados
        if (usuarios.length === 0) {
            mostrarMensagem('Nenhum usuário cadastrado. Por favor, cadastre-se primeiro.', 'error');
            return;
        }
        
        // Busca o usuário por email ou login
        const usuario = usuarios.find(u => 
            u.email === loginOuEmail || u.login === loginOuEmail
        );
        
        if (!usuario) {
            mostrarMensagem('Email/login não encontrado!', 'error');
            return;
        }
        
        // Verifica a senha (em aplicação real, seria senha criptografada)
        if (usuario.senha !== senha) {
            mostrarMensagem('Senha incorreta!', 'error');
            return;
        }
        
        // Login bem-sucedido
        mostrarMensagem('Login realizado com sucesso! Redirecionando...', 'success');
        
        // Armazena o usuário logado na sessão
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        
        // Redireciona para página restrita (você pode criar esta página)
        setTimeout(() => {
            window.location.href = 'dashboard.html'; // Página após login
        }, 1500);
    });
    
    function mostrarMensagem(texto, tipo) {
        mensagemDiv.textContent = texto;
        mensagemDiv.className = tipo;
    }
});
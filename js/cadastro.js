document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastro-form');
    const mensagemDiv = document.getElementById('mensagem');
    
    // Carrega usuários do localStorage ou cria array vazio
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Limpa mensagens anteriores
        mensagemDiv.textContent = '';
        mensagemDiv.className = '';
        
        // Obtém valores dos campos
        const email = document.getElementById('email').value;
        const login = document.getElementById('login').value;
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmar-senha').value;
        
        // Validações
        if (senha !== confirmarSenha) {
            mostrarMensagem('As senhas não coincidem!', 'error');
            return;
        }
        
        if (senha.length < 6) {
            mostrarMensagem('A senha deve ter pelo menos 6 caracteres!', 'error');
            return;
        }
        
        // Verifica se email ou login já existem
        const usuarioExistente = usuarios.find(u => u.email === email || u.login === login);
        if (usuarioExistente) {
            mostrarMensagem('Email ou login já cadastrados!', 'error');
            return;
        }
        
        // Cria novo usuário
        const novoUsuario = {
            email,
            login,
            senha // Em aplicações reais, a senha deve ser criptografada
        };
        
        // Adiciona ao array e salva no localStorage
        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        // Limpa o formulário
        form.reset();
        
        // Mostra mensagem de sucesso
        mostrarMensagem('Cadastro realizado com sucesso!', 'success');
    });
    
    function mostrarMensagem(texto, tipo) {
        mensagemDiv.textContent = texto;
        mensagemDiv.className = tipo;
    }
});
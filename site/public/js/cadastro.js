function trocar() {
    section_principal.style.display = "none";
    section_secundaria.style.display = "block";
  }
  
  function destrocar() {
   section_principal.style.display = "block";
    
   section_secundaria.style.display = "none";
  }
  function cadastrar() {
    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;
    var validacao = 0

    if (nomeVar === "" || emailVar === "" || senhaVar === "" || confirmacaoSenhaVar === "") {
      alert("Todos os campos são obrigatórios!");
      return false;
    } 
    
    if(nomeVar.length > 10) {
      erro_usuario.style.opacity = '1'
    }
    else {
      erro_usuario.style.opacity = '0'
      validacao++
    }
    if(senhaVar.length < 6) {
      erro_senha.style.opacity = '1'
    } else {
      erro_senha.style.opacity = '0'
      validacao++
    }
    
    if(confirmacaoSenhaVar != senhaVar) {
      erro_confirmar.style.opacity = '1'
    } else {
      erro_confirmar.style.opacity = '0'
      validacao++
    }
    
    if (emailVar.indexOf('@') == -1) {
      erro_email.style.opacity = '1'
    } else {
      erro_email.style.opacity = '0'
      validacao++
    }
    if(validacao < 4) {
      return false
    }

    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar,
      }),
    })
      .then(function (resposta) {
        if (resposta.ok) {
          alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...");
          setTimeout(() => {
            trocar();
          }, 800);
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }

  function entrar() {
    var usuarioVar = login_usuario.value;
    var senhaVar = login_senha.value;

    if (usuarioVar === "" || senhaVar === "") {
      alert("Todos os campos são obrigatórios!");
      return false;
    }

    fetch("/usuarios/autenticar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailServer: usuarioVar,
        senhaServer: senhaVar,
      }),
    })
      .then(function (resposta) {
        if (resposta.ok) {
          resposta.json().then((json) => {
            sessionStorage.EMAIL_USUARIO = json.email;
            sessionStorage.NOME_USUARIO = json.nome;
            sessionStorage.ID_USUARIO = json.idUsuario;

            alert("Login realizado com sucesso!");
            window.location = "./dashboard/dashboard.html";
          });
        } else {
          throw "Usuário ou senha inválidos!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        erro_login.style.opacity = '1'
      });

    return false;
  }

  
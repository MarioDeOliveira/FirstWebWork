function mostraRegistos(registos) {

    let conteudo = "";
    for (registo of registos) {
        conteudo += `<tr><td>${registo.id}</td><td>${registo.nome}</td><td>${registo.descricao}</td><td>${registo.km}</td><td>${registo.piso}</td><td>${registo.regiao}</td><td><p type="button" class="btn btn-primary btElimine" data-id="${registo.id}">+Info na descrição</p></td></tr>`;
    }
    document.querySelector("#tabeladados tbody").innerHTML = conteudo;
    document.querySelector("#totalRegistos").textContent = registos.length;


    let botoes = document.getElementsByClassName("btElimina");
    for (botao of botoes) {
        botao.addEventListener("click", function () {
            if (confirm("Confirma a eliminação do registo?")) {
                let id = this.getAttribute("data-id");
                fetch("http://localhost:3000/ciclovias/" + id, { method: "delete" })
                    .then(response => response.json())
                    .then(() => {
                        alert("Registo eliminado");
                        return todosRegistos();
                    })
                    .catch(erro => alert("Ocorreu um erro - mostraRegistos"));
            }
        })
    }
}

function todosRegistos() {
    fetch("http://localhost:3000/Ciclovias")
        .then(response => response.json())
        .then(registos => {
            mostraRegistos(registos);
        })
        .catch(erro => console.error("Ocorreu um erro - todosRegistos" + erro));
}


document.getElementById("btPesquisa").addEventListener("click", function () {
    let valorPesquisa = document.getElementById("pesquisa").value;
    fetch("http://localhost:3000/Ciclovias?nome_like=" + valorPesquisa)
        .then(response => response.json())
        .then(registos => {
            console.log(registos);
            mostraRegistos(registos);
        })
        .catch(erro => alert("Ocorreu um erro - pesquisa"));
});


document.getElementById("btLimpaPesquisa").addEventListener("click", function () {
    document.getElementById("pesquisa").value = "";
    todosRegistos();
});


document.querySelector("#tabeladados tbody").addEventListener("click", function (evento) {
    let elementoClicado = evento.target.tagName;
    if (elementoClicado === "TD") {

        let id = evento.target.parentElement.getElementsByClassName("btElimine")[0].getAttribute("data-id");
        fetch("http://localhost:3000/Ciclovias/" + id)
            .then(response => response.json())
            .then(registo => {
                let conteudo = `<p><strong>Nome</strong>: ${registo.nome}</p><p><strong>DescricaoNome</strong>: ${registo.descricao}</strong></p><p><strong>Km</strong>: ${registo.km}</p><p><strong>Piso</strong>: ${registo.piso}</strong></p><p><strong>Regiao</strong>: ${registo.regiao}</strong></p>`;
                document.getElementById("infoRegisto").innerHTML = conteudo;
            })
            .catch(erro => alert("Ocorreu um erro - registo único"));
    }
    evento.stopPropagation();
});

todosRegistos();


 /*Botão TOP*/

  mybutton = document.getElementById("myBtn");

  window.onscroll = function() {scrollFunction()};
  
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
  
  function topFunction() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
  }

  /*Login*/

let loginForm = document.getElementById("login-form");
let loginButton = document.getElementById("login-form-submit");
if (typeof (loginButton) != 'undefined' && loginButton != null) {
  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    if (username === "Mario" && password === "112233") {             
      location.href = "listasAdmin.html"        //Optei por não colocar o alert de login com sucesso, isto porque prefiro entrar logo no menu do que dar mais um click.
    } else {
      alert("Login falhou!")
    }
  })
}
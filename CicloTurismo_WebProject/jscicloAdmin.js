
function mostraRegistos(registos) {

    let conteudo = "";
    for (registo of registos) {
        conteudo += `<tr><td>${registo.id}</td><td>${registo.nome}</td><td>${registo.descricao}</td><td>${registo.km}</td><td>${registo.piso}</td><td>${registo.regiao}</td><td><button type="button" class="btn btn-primary btElimina" data-id="${registo.id}">X</button></td></tr>`;
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

        let id = evento.target.parentElement.getElementsByClassName("btElimina")[0].getAttribute("data-id");
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


document.getElementById("registoCiclo").addEventListener("submit", function (evento) {
    evento.preventDefault();

    const dadosForm = new FormData(this);
    const dadosReaisForm = Object.fromEntries(dadosForm.entries());

    const dadosFinais = JSON.stringify(dadosReaisForm);
    fetch('http://localhost:3000/Ciclovias', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: dadosFinais
    }).then(function (response) {
        return response.json();
    }).then(() => {
        alert("Registo Inserido");
        document.getElementById("registoCiclo").reset();
        return todosRegistos();
    }).catch((error) => {
        console.error('Error:', error);
    });
});

todosRegistos();


/*Botão TOP*/


mybutton = document.getElementById("myBtn");

window.onscroll = function () { scrollFunction() };

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



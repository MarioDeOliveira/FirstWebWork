//slider//

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000);
}

//openweathermap//

window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = []; window.myWidgetParam.push({ id: 14, cityid: '2738752', appid: '2eb2dbb2ac49e99bfa24fec9e1f95ebe', units: 'metric', containerid: 'openweathermap-widget-14', }); (function () { var script = document.createElement('script'); script.async = true; script.charset = "utf-8"; script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js"; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s); })();

//Login//

let loginForm = document.getElementById("login-form");
let loginButton = document.getElementById("login-form-submit");
if (typeof (loginButton) != 'undefined' && loginButton != null) {
  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    if (username === "Mario" && password === "112233") {
      location.href = "listasAdmin.html"           //Optei por não colocar o alert de login com sucesso, isto porque prefiro entrar logo no menu do que dar mais um click.
    } else {
      alert("Login falhou!")
    }
  })
}

//Botão Top//

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

//cookies//

(() => {
  if (!localStorage.pureJavaScriptCookies) {
    document.querySelector(".box-cookies").classList.remove('hide');
  }

  const acceptCookies = () => {
    document.querySelector(".box-cookies").classList.add('hide');
    localStorage.setItem("pureJavaScriptCookies", "accept");
  };

  const btnCookies = document.querySelector(".btn-cookies");

  btnCookies.addEventListener('click', acceptCookies);
})();
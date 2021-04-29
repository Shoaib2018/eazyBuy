<style>
*, *::after, *::before {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  line-height: 1;
  margin: 0;
  width: 100%;
  height: 100%;
  background: #1C1D21;
}

main {
  position: relative;
  z-index: 1;
  height: 100vh;
  overflow: hidden;
  box-shadow: 0 0 50px #000;
  transition: transform .5s;
}

.nav-open main {
  transform: scale(.8);
}

.intro {
  height: 100vh;
  width: 100%;
  display: table;
  background: #26292f url('../img/bg.jpg') no-repeat center center;
  background-size: cover;
}

h1 {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-size: 45px;
  color: white;
}

.nav-trigger {
  position: fixed;
  z-index: 4;
  top: 40px;
  right: 40px;
  height: 44px;
  width: 44px;

  overflow: hidden;
  color: transparent;
  white-space: nowrap;
  text-indent: 100%;
}

.nav-trigger span,
.nav-trigger span::before,
.nav-trigger span::after {
  position: absolute;
  height: 4px;
  width: 36px;
  background: #999999;
}

.nav-trigger span {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: background .3s;
}

.nav-trigger span::before,
.nav-trigger span::after {
  content: '';
  top: 0;
  left: 0;
  transition: background .3s, transform .3s;
}

.nav-trigger span::before {
  transform: translateY(-12px);
}

.nav-trigger span::after {
  transform: translateY(12px);
}

.nav-trigger:hover span, 
.nav-trigger:hover span::before,
.nav-trigger:hover span::after {
  background: white;
}

.nav-open .nav-trigger span {
  background: transparent;
}

.nav-open .nav-trigger span::before,
.nav-open .nav-trigger span::after {
  background: #1F2B3D;
}

.nav-open .nav-trigger span::before {
  transform: rotate(-45deg);
}

.nav-open .nav-trigger span::after {
  transform: rotate(45deg);
}

.overlay {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1C1D21;
  opacity: 0;
  visibility: hidden;
  transition: opacity .5s, visibility .5s;
}

.nav-open .overlay {
  opacity: .6;
  visibility: visible;
}

.nav-container {
  position: fixed;
  z-index: 3;
  top: 0;
  right: 0;
  height: 100%;
  width: 90%;
  max-width: 460px;
  padding: 2em 3.5em;
  background: #F3F3F3;
  overflow: auto;
  transform: translateZ(0);
  transform: translateX(100%);
  transition: transform .5s cubic-bezier(.07,.23,.34,1);
}

.nav-open .nav-container {
  transform: translateX(0);
}

.nav-container h2 {
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  color: #AAAAAA;
  margin: 1.5em 0;
}

.nav {
  list-style: none;
  padding: 0;
}

.nav a {
  display: block;
  padding: .4em 0;
  font-size: 40px;
  font-weight: bold;
  font-family: serif;
  text-decoration: none;
  color: #1F2B3D;
  transform: translateZ(0);
}

.nav-open .nav a {
  animation: slide-in .4s .2s backwards;
}

.nav-open .nav li:nth-of-type(2) a {
  animation-delay: .3s;
}

.nav-open .nav li:nth-of-type(3) a {
  animation-delay: .4s;
}

.nav-open .nav li:nth-of-type(4) a {
  animation-delay: .5s;
}

.nav-open .nav li:nth-of-type(5) a {
  animation-delay: .6s;
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateX(80px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
<body>
<a href="#navigation" class="nav-trigger">
  Menu <span></span>
</a>

<main>
<a href="facebook.com">F</a>
  <section class="intro">
    <h1>Final Project</h1>
  </section>
</main>

<nav class="nav-container" id="navigation">
  <header>
    <h2>Navigation</h2>
  </header>

  <ul class="nav">
    <li><a href="#0">About</a></li>
    <li><a href="#0">Services</a></li>
    <li><a href="#0">Portfolio</a></li>
    <li><a href="#0">Clients</a></li>
    <li><a href="#0">Contact</a></li>
  </ul>
</nav>

<div class="overlay"></div> <!-- improve main element 3d movement -->
</body>  
<script>
var navTrigger = document.getElementsByClassName('nav-trigger')[0],
    body = document.getElementsByTagName('body')[0];

navTrigger.addEventListener('click', toggleNavigation);

function toggleNavigation(event) {
  event.preventDefault();
  body.classList.toggle('nav-open');
}
</script>
// Mejoras progresivas: el contenido sigue visible sin JavaScript.
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const text = (selector, value) => { $(selector).textContent = value; };
const press = (selector, active) => $$(selector).forEach(button => {
  button.setAttribute('aria-pressed', String(button === active));
});
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: .04 });
  $$('.concept-card, .diagram, .section-heading').forEach(element => {
    element.classList.add('will-reveal'); observer.observe(element);
  });
}
// Un solo tokenizador preserva el texto y evita insertar HTML del código fuente.
const token = /(\/\/[^\n]*|#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:const|let|await|async|import|from|return|if|else|new|true|false|try|catch|while)\b|\b\d+(?:\.\d+)?\b)/g;
$$('code[data-language]').forEach(element => {
  const source = element.textContent, fragment = document.createDocumentFragment();
  let cursor = 0;
  for (const match of source.matchAll(token)) {
    fragment.append(document.createTextNode(source.slice(cursor, match.index)));
    const span = document.createElement('span');
    const value = match[0];
    span.className = 'syntax-' + (/^(\/\/|#)/.test(value) ? 'comment' : /^["']/.test(value) ? 'string' : /^\d/.test(value) ? 'number' : 'keyword');
    span.textContent = value; fragment.append(span); cursor = match.index + value.length;
  }
  fragment.append(document.createTextNode(source.slice(cursor))); element.replaceChildren(fragment);
});


let observer = 'local', account = false, https = true;
const visibility = {
  local: ['Red local / ISP', 'IP del equipo, conexión al guard, tiempos y volumen.', 'Destino final ni contenido de la sesión por este flujo Tor.'],
  guard: ['Guard / primer salto', 'IP de origen, siguiente salto, horarios y volumen.', 'Destino final y contenido de aplicación por su rol.'],
  middle: ['Middle / tránsito', 'Peers adyacentes y patrones de tráfico.', 'Asociación directa entre IP de origen y destino final por su rol.'],
  exit: ['Exit / salida clearnet', 'Destino de red, resolución de salida, horarios y volumen.', 'IP de origen del cliente por el circuito.'],
  servidor: ['Servidor / extremo de aplicación', 'IP de exit, solicitudes y contexto que recibe la aplicación.', 'IP original por el circuito Tor, salvo revelación adicional.']
};
function render() {
  const [title, visible, hidden] = visibility[observer];
  text('#observer-title', title);
  text('#observer-visible', visible + (observer === 'exit' ? https ? ' El payload permanece cifrado con TLS válido.' : ' Con HTTP puede leer y alterar el contenido del tramo de salida.' : observer === 'servidor' ? account ? ' La cuenta autenticada identifica al usuario.' : ' Sin cuenta, todavía puede correlacionar cookies y comportamiento.' : ''));
  text('#observer-hidden', hidden + (observer === 'exit' && https ? ' Tampoco lee el contenido HTTPS normalmente.' : ''));
  text('#tor-account', account ? 'Escenario: cuenta autenticada' : 'Escenario: sin cuenta autenticada');
  text('#tor-https', https ? 'HTTPS activo' : 'HTTP sin TLS / riesgo de salida');
  $('#tor-account').setAttribute('aria-pressed', String(account)); $('#tor-https').setAttribute('aria-pressed', String(https));
  text('#tor-scenario', 'Modelo conceptual de Tor + ' + (https ? 'HTTPS' : 'HTTP') + '. ' + (account ? 'La cuenta revela identidad al servidor pese a la ruta Tor.' : 'La ausencia de cuenta no garantiza anonimato completo.') + ' No procede de un circuito real.');
}
$$('[data-observer]').forEach(button => button.addEventListener('click', () => { observer = button.dataset.observer; press('[data-observer]', button); render(); }));
$('#tor-account').addEventListener('click', () => { account = !account; render(); });
$('#tor-https').addEventListener('click', () => { https = !https; render(); });
render();
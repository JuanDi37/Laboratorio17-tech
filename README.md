# Lab 17 — Tor Browser y Threat Modeling

Sesión 20.

## Título y objetivo

Construir un modelo de amenazas para un venture y explicar visibilidad por participante en Tor, HTTPS e I2P conceptual.

## Instrucciones

En este laboratorio trabajamos en Visual Studio Code para elaborar un informe de privacidad sobre Tor Browser, navegación HTTPS e I2P conceptual, aplicado al flujo de información de un venture ficticio. Representamos un circuito de navegación clearnet con guard, middle y exit, y analizamos qué pueden observar la red local, el proveedor de internet, cada nodo Tor y el servidor de destino. Distinguimos la protección de las capas Tor de la sesión HTTPS que mantiene cifrado el contenido hasta el servidor, explicando por qué un exit no debe interpretarse como un lector del payload TLS. Construimos una tabla de visibilidad y una comparación con navegación normal, atendiendo a direcciones IP, resolución de destinos, volumen, tiempos y cuentas autenticadas. Desarrollamos THREAT.md con activos, adversarios, fronteras de confianza, posibilidades de correlación y medidas aplicadas a consultas públicas y acceso a un portal del venture. Implementamos un circuito interactivo cuyos participantes muestran información visible y oculta bajo escenarios predefinidos, sin presentar la visualización como una medición de tráfico real. Analizamos fingerprints, compromiso de endpoints, exits maliciosos y límites de anonimato, y comparamos conceptualmente la orientación interna de I2P. Entregamos la página, sus estilos, interacciones, modelo de amenazas y README, respetando el alcance académico sin procedimientos de evasión institucional ni instalación de relays, bridges o servicios onion.

## Descripción del trabajo

El circuito permite seleccionar red local, guard, middle, exit y servidor. Dos controles cambian HTTPS y autenticación para mostrar el efecto en contenido e identidad. THREAT.md desarrolla activos, adversarios, supuestos y riesgo residual.

## Tecnologías

Tor Browser, circuitos de tres roles para clearnet, TLS/HTTPS, visibilidad de red e I2P conceptual. Presentación local con HTML5, CSS3 y JavaScript.

## Resultados

El modelo distingue origen visible al guard, destino visible al exit y contenido que HTTPS entrega solo al servidor. Una cuenta puede identificar al usuario pese a la ruta Tor. No se conectó Tor Browser ni se documentó un circuito real.

## Aprendizaje

Aprendimos a preguntar quién observa cada tramo y a separar origen, destino, contenido e identidad de aplicación. Comprendimos que Tor, HTTPS e I2P responden a contextos distintos y que un modelo de amenazas útil conserva supuestos, adversarios y riesgos residuales en lugar de prometer anonimato universal.

## Visualización

Abrimos la carpeta WEB3-LABS en Visual Studio Code. Con la extensión Live Server instalada, hacemos clic derecho en este index.html y elegimos **Open with Live Server**. La navegación principal está en ../index.html. Usamos localhost para Web Crypto; no se necesitan cuentas ni credenciales. Los controles se operan con Tab, Enter y Espacio.

## Rúbrica original

- Tor Browser oficial conectado y circuito documentado: 25%.
- Tabla de visibilidad de nodos y comparación con navegador normal: 20%.
- THREAT.md comparando HTTPS, Tor e I2P: 30%.
- Análisis de adversarios, límites de Tor e I2P conceptual: 15%.
- Comentarios de aprendizaje: 10%.

Total: 100%. Los alcances y límites se describen en la tabla HTML; no se asignan calificaciones por ejecuciones no realizadas.

## Alcance académico

Las simulaciones se identifican en pantalla; no representan conexiones, publicaciones ni transacciones externas. No se proporcionaron penalizaciones adicionales y no se inventan deducciones. alcance conceptual y académico; sin evasión de controles institucionales ni instalación de relays, bridges o servicios onion.

## Fuentes primarias

- [Tor Project · visibilidad con HTTPS](https://support.torproject.org/about-tor/security/https-encryption-and-tor/)
- [Tor Project · función del guard](https://support.torproject.org/tor-browser/security/guard-relay/)
- [Tor Project · especificación de guards](https://spec.torproject.org/guard-spec/index.html)
- [I2P · comparación arquitectónica con Tor](https://geti2p.net/en/comparison/tor)

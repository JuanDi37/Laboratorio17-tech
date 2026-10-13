# THREAT — Modelo de amenazas de Aurora

## Flujos

Aurora es un venture ficticio. Flujo A: un miembro consulta documentación pública sin autenticación. Flujo B: un miembro inicia sesión en un portal de trabajo. Activos: IP de origen, intereses reflejados en destinos, contenido del portal, identidad de cuenta y sesiones.

```text
Dispositivo → red local / ISP → ruta de red → servidor
Tor clearnet: dispositivo → guard → middle → exit → servidor HTTPS
I2P conceptual: túneles salientes → destino I2P → túneles entrantes
```

## Supuestos y fronteras

Suponemos endpoint íntegro y actualizado, HTTPS válido y canal de aplicación adecuado. Las fronteras son dispositivo, acceso a red, relays y servicio. Cambiar esos supuestos cambia las garantías. El documento no acredita una conexión real de Tor Browser.

## Comparación

| Dato | HTTPS directo | Tor + HTTPS | I2P conceptual |
| --- | --- | --- | --- |
| IP visible al servicio clearnet | IP pública de conexión | IP del exit | Depende del outproxy si se usa clearnet |
| Destino ante observador local | IP y posibles nombres por DNS/SNI u otros indicios | Conexión a guard; no destino final por ese flujo | Conexiones a peers; no equiparar con clearnet directo |
| Contenido en red | TLS hasta servicio | TLS más capas Tor | Cifrado y túneles propios; protocolo de aplicación importa |
| Identidad de cuenta | Servicio la reconoce | Servicio la reconoce | El servicio puede reconocerla |
| Metadatos | Volumen y tiempos | Volumen y tiempos en posiciones respectivas | Patrones y dependencias de túneles |

## Adversarios y riesgos

| Adversario | Capacidad relevante | Riesgo | Medida y límite |
| --- | --- | --- | --- |
| Observador local / ISP | Inspeccionar su tramo | Intereses y patrones de uso | TLS protege contenido; Tor cambia visibilidad del destino en ese tramo |
| Guard | Ver origen y siguiente salto | Asociación con participación Tor | No conoce destino final por su rol; endpoint importa |
| Exit | Ver destino y tráfico de salida | Lectura de HTTP, modificación y patrón temporal | HTTPS válido limita lectura de contenido |
| Servidor | Terminar TLS y gestionar cuenta | Asociar solicitudes, cookies y usuario | Minimizar datos y separar finalidades; Tor no borra una cuenta |
| Correlador de entrada/salida | Comparar tiempos y volumen | Vincular origen y destino | Riesgo residual; no prometer anonimato perfecto |
| Actor con acceso al endpoint | Leer pantalla y sesión | Contenido y cuentas expuestos | Sanear equipo, controlar acceso y revisar sesiones |

## Decisiones del venture

Para consulta pública minimizamos datos y autenticación innecesaria. Para portal laboral priorizamos acceso y endpoint: la identidad de cuenta forma parte del flujo. Revisamos cookies, sesiones y comportamiento que pueda identificar al miembro. Evitamos modificaciones que vuelvan singular un navegador diseñado para uniformidad.

## Límites y alcance

Tor no elimina correlación ni compromiso del dispositivo. I2P está orientado a su entorno interno y usa túneles unidireccionales; los outproxies introducen otras dependencias para clearnet. No proporcionamos evasión institucional ni configuración de relays, bridges o servicios onion.

## Aprendizaje

Aprendimos a expresar garantías por dato, actor y posición. La herramienta se elige según el flujo y sus riesgos, no como una promesa universal de anonimato.

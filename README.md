# Planify Go

App móvil construida con **Expo** y **React Native** para gestionar un plan de trabajo mensual día a día: ver el progreso de cada día, agregar tareas con categoría y hora, y recibir un recordatorio local cuando llega el momento.

Es la contraparte móvil de [Agenda Planify](https://github.com/Melany0213/Agenda_Planify), un proyecto propio con backend en Django REST Framework para automatizar planes de trabajo mensuales. Mientras que Agenda Planify resuelve la generación y el seguimiento del plan en el servidor, Planify Go explora cómo se vería ese mismo plan en manos del usuario final, desde el teléfono.

Proyecto en construcción, a nivel de repositorio (sin publicar en tiendas todavía).

## Qué hace

- **Inicio**: calendario del mes actual, con el progreso de tareas completadas por día.
- **Detalle de día**: lista de tareas de un día puntual, con opción de marcarlas como hechas o eliminarlas.
- **Nueva tarea**: formulario con título, hora opcional y categoría (trabajo / estudio / personal).
- **Recordatorio local**: si la tarea tiene hora, se programa una notificación local con `expo-notifications`.
- **Tema claro/oscuro**: alternable manualmente y persistido entre sesiones.

Todo el estado se guarda localmente con `AsyncStorage`; no depende de un backend para funcionar.

## Stack técnico

| Área | Tecnología |
|---|---|
| Framework | Expo (SDK 57) + React Native |
| Navegación | Expo Router (file-based, `src/app/`) |
| Estilos | NativeWind (Tailwind CSS para React Native) |
| Persistencia | `@react-native-async-storage/async-storage` |
| Notificaciones | `expo-notifications` (recordatorios locales programados) |
| Lenguaje | TypeScript |

La paleta de color (violeta) es la misma que uso en mi [portafolio web](https://github.com/Melany0213), para que ambos proyectos se reconozcan como parte de la misma identidad.

## Cómo correrlo

Requiere Node.js y la app **Expo Go** instalada en un teléfono (Android o iOS), o un emulador configurado.

```bash
npm install
npx expo start
```

Escanea el código QR que aparece en la terminal con Expo Go (Android) o la cámara (iOS).

### Comandos útiles

```bash
npx expo lint        # lint
npx tsc --noEmit      # chequeo de tipos
npx expo-doctor       # diagnóstico de dependencias
```

## Estructura del proyecto

```
src/
  app/              # pantallas (Expo Router: cada archivo es una ruta)
    _layout.tsx     # layout raíz: navegación, proveedor de datos, tema
    index.tsx       # inicio: calendario del mes
    day/[date].tsx  # detalle de un día
    task/new.tsx    # formulario de nueva tarea
  components/       # UI reutilizable (tarjetas, pastillas, barra de progreso...)
  context/          # estado global de tareas (React Context + AsyncStorage)
  lib/              # helpers puros: fechas, notificaciones, almacenamiento
  types.ts          # tipos compartidos
```

## Notas de diseño

- Las notificaciones solo se programan si la tarea tiene hora y esa hora todavía no pasó; si se borra o se edita la tarea, el recordatorio pendiente se cancela.
- El selector de tema usa `useColorScheme` de NativeWind directamente, sin estado propio duplicado: solo persiste la preferencia elegida en `AsyncStorage` para recordarla entre sesiones.

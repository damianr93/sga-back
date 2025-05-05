# SGA-Back

Backend API para la gestión del Sistema de Gestión Ambiental (SGA), complemento del proyecto frontend.

## Descripción

SGA-Back es un servicio RESTful desarrollado con **Nest.js** y **TypeScript** que provee las funcionalidades necesarias para que el frontend (SGA-Front) interactúe con los datos del Sistema de Gestión Ambiental conforme a la norma ISO 14001.

Entre sus responsabilidades principales se encuentran:

* Exponer endpoints para CRUD de entidades ambientales (procesos, documentos, registros, métricas, acciones correctivas y preventivas).
* Gestión y almacenamiento de archivos relacionados (PDF, imágenes, CSV).
* Validación de datos de entrada y manejo de errores en rutas.
* Autenticación y control de acceso por roles.
* Configuración mediante variables de entorno.
* Ejecución de pruebas unitarias y de integración.

## Tecnologías

* **Node.js**
* **Nest.js**
* **TypeScript**
* **Multer** (para subida de archivos)
* **TypeORM** o **Mongoose** (según la base de datos elegida)
* **Jest** + **Supertest** (para pruebas)
* **ESLint** + **Prettier** (para calidad de código)

## Instalación y puesta en marcha

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/damianr93/sga-back.git
   cd sga-back
   ```
2. Instalar dependencias:

   ```bash
   npm install
   ```
3. Crear y configurar archivo de entorno `.env` (basado en `.env.template`):

4. Lanzar en modo desarrollo:

   ```bash
   npm run start:dev
   ```
5. Compilar para producción:

   ```bash
   npm run build
   npm run start:prod
   ```

## Convenciones de desarrollo

* Usar **DTOs** y **Pipes** de Nest.js para validar y sanitizar entradas.
* Seguir la arquitectura **Clean** (dominio, aplicación, infraestructura, presentación).
* Documentar nuevos endpoints con **Swagger** o comentarios claros.
* Incluir pruebas unitarias para lógica crítica y pruebas de integración para rutas.

## Contribuciones

¡Contribuciones bienvenidas! Para colaborar:

1. Abre un *issue* describiendo tu propuesta.
2. Crea una rama `feature/...` o `fix/...`.
3. Asegúrate de que todos los linters y tests pasen.
4. Envía un *pull request* explicando los cambios.


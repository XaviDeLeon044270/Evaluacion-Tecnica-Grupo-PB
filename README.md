# Sistema de Encuestas Serverless 🚀

Proyecto de evaluación técnica implementando una arquitectura 100% Serverless en AWS.

## 🏗 Arquitectura
El sistema utiliza una arquitectura desacoplada para optimizar costos y escalabilidad:
* **Frontend**: React + Vite alojado en **AWS S3** (Hosting estático).
* **Backend**: Node.js + Express adaptado a **AWS Lambda** usando `serverless-http`.
* **Base de Datos**: **AWS RDS** (MySQL) para persistencia relacional.
* **IaC**: Framework **Serverless** para el despliegue de infraestructura.

## ⚙️ Decisiones Técnicas
1.  **AWS Lambda vs EC2**: Se eligió Lambda para reducir costos operativos (Free Tier) y eliminar la necesidad de administrar servidores.
2.  **Prisma ORM**: Para garantizar seguridad de tipos (Type-Safety) y facilitar la migración de esquemas.
3.  **Fedora & Linux Binaries**: Se configuró explícitamente `binaryTargets` en Prisma para asegurar compatibilidad entre el entorno de desarrollo local y el entorno de ejecución en AWS (Amazon Linux 2).

## 🚀 Cómo ejecutar localmente
1.  Clonar el repositorio.
2.  Backend:
    ```bash
    cd backend
    npm install
    # Configurar .env con DATABASE_URL
    npm run dev
    ```
3.  Frontend:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## 📈 Mejoras Futuras
* Implementar autenticación (Cognito).
* Agregar caché con ElastiCache/Redis para los catálogos de países.
* Automatizar el despliegue del frontend con GitHub Actions.

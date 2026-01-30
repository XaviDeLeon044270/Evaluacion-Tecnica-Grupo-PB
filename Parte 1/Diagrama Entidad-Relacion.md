# Diagrama entidad-relacion

```mermaid
erDiagram
    paises ||--o{ empresas : "tiene"
    empresas ||--o{ sedes : "tiene"
    preguntas ||--o{ opciones : "tiene"
    preguntas ||--o{ respuestas_usuario : "recibe"
    sedes ||--o{ respuestas_usuario : "recibe"
    opciones ||--o{ respuestas_usuario : "selecciona"

    paises {
        int id PK
        varchar nombre
    }

    empresas {
        int id PK
        varchar nombre
        int id_pais FK
    }

    sedes {
        int id PK
        varchar nombre
        int id_empresa FK
    }

    preguntas {
        int id PK
        varchar texto_pregunta
    }

    opciones {
        int id PK
        int id_pregunta FK
        varchar texto_opcion
        int valor
    }

    respuestas_usuario {
        int id PK
        int id_sede FK
        int id_pregunta FK
        int id_opcion FK
        timestamp fecha_creacion
    }
```

Notas:
- Cada pais puede tener varias empresas; cada empresa pertenece a un unico pais.
- Cada empresa puede tener varias sedes; cada sede pertenece a una unica empresa.
- Cada pregunta puede tener varias opciones de respuesta.
- Cada respuesta de usuario referencia una sede, una pregunta y la opcion elegida.
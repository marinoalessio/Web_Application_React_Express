# Exam Web Application in React and Express
This repository contains the exam project for "Web Application" university course at Politecnico di Torino. 
This ReadMe is in Italian, I will write an English version.


## React Client Application Routes

- Route `/`: Homepage, può essere visualizzata anche se non loggati, in questo caso mostra solo la lista dei corsi.
Una volta fatto il login, viene mostrato anche il piano di studi, se già creato. Vi è la possibilità di entrare in "edit mode" per la modifica e, se tutti i vincoli e controlli sono rispettati, il salvataggio permanente.
Se l'utente non ha ancora creato il piano, può farlo navigando alla route _/create_.
I parametri passati sono la lista dei corsi e l'eventuale piano di studio, isCreatedSP è un boolean che indica la presenza di un piano di studio rispetto all'utente loggato e serve a mostrare l'interfaccia corretta.

- Route `/create`: Accessibile solo se loggati, altrimenti si viene reindirizzati alla route _/login_. Se il piano di studio per l'utente loggato è già creato, qui è permesso cancellare la copia permanente sul database, per crearne uno nuovo.
Se il piano di studio non esiste, vi è la possibilità di crearne uno, scegliendo tra l'opzione part-time e full-time, salvare, oppure annullare le modifiche.
Tra i parametri principali ci sono i suddetti piano di studio e lista dei corsi, che sono condivisi attraverso l'app.

- Route `/login`: Visualizza una pagina per il login con username e password.

- Route `*`: Visualizza una generica PageNotFound.

## API Server

- POST `/api/sessions`
  
  - Permette il login utente
  - Request: ID sessione
  - Request body:
    ```
    {username: "test@test.it", password: "password"}
    ``` 
  - Response: 
    `200 Ok` (success), `401 Unauthorized` ("Incorrect username and/or password.").

  - Response body (se Ok):
    ```
    {"id":1,"username":"test@test.it","name":"Test"}
    ```
---
- GET `/api/sessions/current`

  - Controlla se l'utente è loggato, se sí restituisce le informazioni utente.
  - Request: ID sessione
  - Response: 
    `200 Ok` (success), `401 Unauthorized` ("Unauthenticated user!")

  - Response body (se Ok):
    ```
    {"id":1,"username":"test@test.it","name":"Test"}
    ```
---

- DELETE `/api/sessions/current`
  
  - Request: ID sessione
  - Response: `200 OK` (success)
---

- GET `/api/courses`

  - Response: `200 Ok`, `500` 'Database error while retrieving courses'
  - Response body:

    ```
    [
      {
        "code":"01UDFOV",
        "name":"Applicazioni Web I",
        "credits":6,
        "max_students":null,
        "propaedeutic":null
      },
      ...,
    ]
    ```
---

- GET `/api/study_plan`

  - Accessibile solo tramite ID sessione valido
  - Response: `200 Ok`, `500` 'Database error while retrieving study plan'
  - Response body: 

    ```
    [
      {
        "code":"01OTWOV",
        "name":"Computer Network Technologies and Services",
        "credits":6,
        "max_students":3,
        "propaedeutic":null
      },
      ...,
    ]
    ```
---

- GET `/api/courses/incompatibilities/:code`
  
  - Response: `200 Ok`, `500` 'Database error while retrieving incompatibilities'
  - Response body:

    ```
    [
      {"code":"01SQLOV","name":"Database systems","credits":8},
      {"code":"01SQMOV","name":"Data Science e Tecnologie per le Basi di Dati","credits":8},
      ...,
    ]
    ```
---

- GET `/api/courses/propaedeutics/:code`
  
  - Response: `200 Ok`, `500` 'Database error while retrieving propaedeutics'
  - Response body:

    ```
    [
      {
        "code":"02GOLOV",
        "name":"Architetture dei sistemi di elaborazione",
        "credits":12
      }
    ]
    ```
---

- GET `/api/courses/enrolled/:code`
  
  - Response: `200 Ok`, `500` 'Database error while retrieving enrolled students'

  - Response body: 
    ```
    0...n. 
    ```
    > Numero di studenti iscritti ad un corso 'code'
---

- GET `/api/is_full_time`

  - Accessibile solo tramite ID sessione valido
  - Response: `200 Ok`, `500` 'Database error while retrieving info about user'

  - Response body:
    ```
    true/false
    ```
    > true se lo studente è full-time, false altrimenti.
    Esiste sempre, perché richiesto solo se il piano di studi è creato
---

- POST `/api/create`
  
  - Accessibile solo tramite ID sessione valido

  - Request: 
    ```
    {
      "list":["01UDFOV","03UEWOV","01SQJOV", ...,"01TYMOV"],
      "isFullTime":false
    }
    ```
  - Response: `200 Created`, `503 Service Unavailable`

  - Response body, se si è verificato un errore mostra una delle seguenti ragioni:
    ```
    {error: "One or more element in list is not valid"}
    {error: "Credits out of range"}
    {error: "Preliminariness violated"}
    {error: "Compatibility violated"}
    {error: "'02GOLOV' is unfortunately full"} 
    {error: "Cannot parse server response"} 
    {error: "Cannot communicate with the server."} 
    ```
---

- POST `/api/edit`

  - Accessibile solo tramite ID sessione valido

  - Request: 
    ```
    {
      "list":["01UDFOV","03UEWOV","01SQJOV", ...,"01TYMOV"],
    }
    ```
  - Response: `201 Created`, `503 Service Unavailable`

  - Response body, se si è verificato un errore mostra una delle seguenti ragioni:
    ```
    {error: "One or more element in list is not valid"}
    {error: "Credits out of range"}
    {error: "Preliminariness violated"}
    {error: "Compatibility violated"}
    {error: "Cannot parse server response"} 
    {error: "Cannot communicate with the server."} 
    ```
---

- DELETE `/api/delete`

  - Accessibile solo tramite ID sessione valido

  - Response: `204 No Content`, `503 Service Unavailable`

  - Response body, solo in caso di errore:
    ```
    {error: "Database error during the deletion of the Study Plan"}
    {error: "Cannot parse server response."}
    {error: "Cannot communicate with the server."}
    ```
---

## Database Tables

- Table `users`

|        | id               | email   | name | password | salt    | is_fulltime |
|--------|------------------|---------|------|----------|---------|-------------|
| _type_ | INTEGER NN PK AI | TEXT NN | TEXT | TEXT NN  | TEXT NN | BIT         |

- Table `courses`

|        | code    | name | credits          | max_students      | propaedeutic |
|--------|---------|------|------------------|-------------------|--------------|
| _type_ | TEXT PK | TEXT | UNSIGNED TINYINT | UNSIGNED SMALLINT | TEXT         |

- Table `study_plan`

|        | user_id    | course_code |
|--------|------------|-------------|
| _type_ | INTEGER NN | TEXT NN     |

| _constraints_                       |
|-------------------------------------|
| user_id FK -> users(id)             |
| course_code FK -> courses(code)     |
| PK (user_id, course_code)           |

- Table `incompatibilities`

|        | code          | reference_code           |
|--------|---------------|--------------------------|
| _type_ | TEXT          | TEXT FK -> courses(code) |

| _constraints_                       |
|-------------------------------------|
| code FK -> courses(code)            |
| reference_code FK -> courses(code)  |
| PK (code, reference_code)           |



## Main React Components

- `Homepage` (in `Homepage.js`): Componente della route principale ( _/_ ) Contiene la lista dei corsi e il piano di studio, se presente. Ha lo scopo di disporre correttamente i componenti e può entrare in modalità "edit".

- `StudyPlanForm` (in `StudyPlanForm.js`): Componente della route _/create_. Allo stesso modo, si occupa di coordinare i componenti lista dei corsi e piano di studio, ma in sessione di creazione.

- `CoursesList` (in `CoursesComponents.js`): Crea una tabella di tutti i corsi

- `StudyPlanTable` (in `CoursesComponents.js`): Crea una tabella dei corsi appartenenti al piano di studio di un utente.

- `CourseRow` (in `CoursesComponents.js`): Rappresenta una singola riga, la sua potenza consiste nella ripetibilità del codice, perché genericamente può essere un sottocomponente sia di _CoursesList_ che di _StudyPlanTable_, pertanto ha bisogno della lista dei corsi e del piano di studio. E' qui che vengono gestiti la maggior parte dei controlli lato client sui vincoli di propedeuticità, incompatibilità e di raggiunta del massimo.
Presenta le informazioni relative a codice del corso, nome, crediti, numero di studenti già registrati (Enrolled), numero di studenti massimo permesso (Allowed), e in una sezione espandibile i corsi incompatibili e propedeutici. Se in modalità "edit" a fianco ha un bottone di aggiunta o rimozione, a seconda del componente che lo contiene.

- `RowDetails` (in `CoursesComponents.js`): Si tratta della sezione espandibile che carica i corsi incompatibili è propedeutici di un corso. Viene chiamato da _CourseRow_, che a sua volta può essere sia in _CoursesList_ che in _StudyPlanTable_.

- `NavBar` (in `Navbar.js`): E' una barra di navigazione minimale sempre visibile su tutte le pagine, permette la navigazione tra le route. A destra mostra il nome dell'utente e il pulsante di logout, se loggato, il pulsante di login altrimenti.

- `LoginForm` (in `LoginComponents.js`): Componente alla route _/login_, gestisce e controlla il processo di login.


## Screenshot

![Screenshot](./img/screenshot.png)

## Users Credentials

> username | password | carriera

- test@test.it | password | null
- marinoalessio@gmail.com | password | part-time
- jackie@hotmail.it | password | full-time
- gelsy@libero.it | password | full-time
- charlie@outlook.com | password | part-time

# BugHunt

## Opis aplikacije

BugHunt je web aplikacija namenjena učenju i vežbanju programiranja kroz rešavanje zadataka i izazova. Glavne funkcionalnosti uključuju:

* Registraciju i prijavu korisnika sa autentifikacijom putem JWT tokena
* Pregled svih dostupnih izazova i pojedinačnih zadataka
* Slanje rešenja za zadatke i praćenje rešenih izazova
* Dashboard sa pregledom statistike korisnika

Aplikacija se sastoji iz tri glavna sloja:

1. **Frontend** – React + Vite
2. **Backend** – Express.js + Drizzle ORM
3. **Baza podataka** – PostgreSQL

---

## Tehnologije korišćene

| Tehnologija                                  | Namena                                  |
| -------------------------------------------- | --------------------------------------- |
| Node.js 20                                   | Backend runtime environment             |
| Express.js                                   | REST API framework                      |
| React + Vite                                 | Frontend razvoj                         |
| PostgreSQL 15                                | Relaciona baza podataka                 |
| Drizzle ORM                                  | ORM za komunikaciju sa bazom            |
| Docker & Docker Compose                      | Kontejnerizacija i orkestracija servisa |
| Swagger (swagger-jsdoc + swagger-ui-express) | Dokumentacija API-ja                    |

---

## Instalacija i lokalno pokretanje

### 1. Kloniranje repozitorijuma

```bash
git clone <repo-url>
cd BugHunt/backend
```

### 2. Instalacija zavisnosti

```bash
npm install
```

### 3. Pokretanje backend servera

```bash
npm run start
```

### 4. Pokretanje frontend servera

```bash
cd ../frontend
npm install
npm run dev
```

### 5. Otvorite aplikaciju

* Frontend: `http://localhost:5173`
* Backend API: `http://localhost:5000`
* Swagger UI: `http://localhost:5000/api-docs`

> Napomena: PostgreSQL server mora biti pokrenut i baza `bughunt_db` mora postojati sa korisnikom i lozinkom definisanim u `.env` fajlu.

---

## Pokretanje pomoću Docker-a

### 1. Build i pokretanje svih servisa

```bash
docker-compose up --build
```

### 2. Pokretanje servisa u pozadini

```bash
docker-compose up -d --build
```

### 3. Zaustavljanje i uklanjanje servisa

```bash
docker-compose down
```

### Dostupne adrese nakon pokretanja

* Frontend: `http://localhost:5173`
* Backend API: `http://localhost:5000`
* Swagger UI: `http://localhost:5000/api-docs`

---

## Struktura projekta

```
BugHunt/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── app.js
│   ├── package.json
│   └── swagger.config.js
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── docker-compose.yml
```

---

## API dokumentacija

Za pregled i testiranje svih REST API ruta koristi se Swagger UI, dostupan na:

```
http://localhost:5000/api-docs
```

Swagger omogućava:

* pregled svih dostupnih ruta
* pregled parametara i tipova podataka
* pregled odgovora servera
* testiranje zahteva direktno iz browser-a

---

## Kontakt

Za dodatne informacije, možete kontaktirati autora projekta na email: `your-email@example.com`

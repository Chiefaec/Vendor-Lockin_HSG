# Vendor-Lockin Bewertungstool

Strategische Bewertung von Vendor-Abhängigkeiten — firmenisoliert, dauerhaft persistent, kostenlos hostbar.

## Setup in 5 Schritten

### 1. Repository auf GitHub erstellen
- github.com → «New repository» → Name: `vendor-lockin-tool`
- Alle Dateien dieses Ordners hochladen (index.html, api/, vercel.json, package.json)

### 2. Vercel Projekt erstellen
- vercel.com → «Add New Project» → GitHub-Repo wählen → Deploy

### 3. Upstash Redis verbinden
- Im Vercel Dashboard → dein Projekt → «Storage»
- Upstash → Redis → «Create» → mit Projekt verbinden («Connect Project»)
- Vercel setzt KV_REST_API_URL und KV_REST_API_TOKEN automatisch als Env-Variablen

### 4. Redeploy
- Vercel Dashboard → «Deployments» → «Redeploy»
- (Nötig damit die neuen Umgebungsvariablen aktiv werden)

### 5. Fertig
- App läuft unter https://dein-projekt.vercel.app
- Jede Firma meldet sich mit ihrem Namen an
- Daten sind dauerhaft in Upstash Redis gespeichert
- Jede Firma sieht ausschliesslich ihre eigenen Daten
- Firma kann ihre Daten jederzeit selbst löschen

## Datenspeicherung
- Upstash Redis (serverless, kostenlos bis 10'000 requests/Tag)
- Schlüssel pro Firma: portfolio:<firmenname>
- Keine Firma kann Daten einer anderen Firma sehen oder löschen
- Daten bleiben dauerhaft erhalten bis zur aktiven Löschung

## Projektstruktur
```
vendor-lockin-tool/
├── index.html          ← gesamte Frontend-App
├── api/
│   ├── portfolio.js    ← GET/POST/DELETE Portfoliodaten pro Firma
│   └── firms.js        ← GET/POST Firmenliste (für Login-Chips)
├── vercel.json         ← Routing-Konfiguration
├── package.json        ← @upstash/redis Dependency
└── README.md
```

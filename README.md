# Vendor-Lockin Bewertungstool

Strategische Bewertung von Vendor-Abhängigkeiten — firmenisoliert, persistent, kostenlos hostbar.

## Setup in 5 Schritten

### 1. Repository auf GitHub erstellen
- Gehe auf github.com → «New repository»
- Name: `vendor-lockin-tool`
- Alle Dateien dieses Ordners hochladen

### 2. Vercel Projekt erstellen
- vercel.com → «Add New Project» → GitHub-Repo auswählen → Deploy

### 3. Vercel KV Datenbank einrichten (kostenlos)
- Im Vercel Dashboard → dein Projekt → Tab «Storage»
- «Create Database» → «KV (Redis)» wählen
- Name: `vendor-lockin-kv` → Create
- Dann: «Connect to Project» → dein Projekt auswählen
- Vercel setzt die Umgebungsvariablen (`KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`) automatisch

### 4. Redeploy
- Im Vercel Dashboard → «Deployments» → «Redeploy»
- (Nötig damit die neuen Umgebungsvariablen aktiv werden)

### 5. Fertig
- Deine App ist unter `https://dein-projekt.vercel.app` erreichbar
- Jede Firma meldet sich mit ihrem Namen an
- Daten sind dauerhaft gespeichert und firmenspezifisch isoliert
- Firma kann ihre eigenen Daten jederzeit löschen

## Datenspeicherung
- Alle Daten liegen in Vercel KV (Redis)
- Jede Firma hat ihren eigenen Schlüssel: `portfolio:<firmenname>`
- Kostenlos bis 30 MB Datenmenge (reicht für hunderte von Bewertungen)
- Keine Firma kann Daten einer anderen Firma sehen oder löschen

## Lokale Entwicklung (optional)
```bash
npm install -g vercel
vercel dev
```

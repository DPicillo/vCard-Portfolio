# Hugo Portfolio Website - Benutzerhandbuch

## 🎯 Übersicht
Diese Website wurde von einer Single-Page-Anwendung zu Hugo migriert, um die Bearbeitung so einfach wie möglich zu machen. Die Website unterstützt Deutsch und Englisch und besteht aus drei Hauptseiten: Über Mich, Lebenslauf und Blog.

## 🚀 Website starten
```bash
cd hugo-portfolio
hugo server -D --port 1315
```
Die Website ist dann unter `http://localhost:1315` erreichbar.

## 📝 Inhalte bearbeiten

### Über Mich / About Me Seite
**Deutsche Version:** `content/_index.md`
**Englische Version:** `content/_index.en.md`

Diese Dateien enthalten nur die Metadaten. Der Hauptinhalt wird direkt in den Layout-Dateien bearbeitet:
- `layouts/index.html` (für beide Sprachen)

### Lebenslauf / Resume Seite
**Deutsche Version:** `content/resume/_index.md`
**Englische Version:** `content/resume/_index.en.md`

Der Hauptinhalt wird in der Layout-Datei bearbeitet:
- `layouts/resume/list.html`

### Blog Seite
**Deutsche Version:** `content/blog/_index.md`
**Englische Version:** `content/blog/_index.en.md`

Neue Blog-Artikel hinzufügen:
1. Erstelle einen neuen Ordner in `content/blog/`
2. Füge eine `index.md` und `index.en.md` Datei hinzu
3. Die Artikel werden automatisch auf der Blog-Seite angezeigt

## 🔧 Wichtige Dateien

### Konfiguration
- `hugo.toml` - Hauptkonfiguration der Website
- `layouts/_default/baseof.html` - Basis-Template für alle Seiten

### Navigation und Sidebar
- `layouts/partials/navbar.html` - Hauptnavigation
- `layouts/partials/sidebar.html` - Seitenleiste mit Kontaktinformationen

### Styling
- `static/css/main.css` - Alle CSS-Styles
- `static/images/` - Alle Bilder und Icons

## 🌍 Mehrsprachigkeit

Die Website erkennt automatisch die Browser-Sprache:
- Deutsch: Standardsprache
- Englisch: Verfügbar über `/en/` URLs

### Neue Übersetzungen hinzufügen
1. Kopiere eine bestehende `.md` Datei
2. Benenne sie mit `.SPRACHE.md` um (z.B. `.fr.md` für Französisch)
3. Übersetze den Inhalt
4. Füge die Sprache in `hugo.toml` hinzu

## 📁 Ordnerstruktur
```
hugo-portfolio/
├── content/              # Alle Inhalte
│   ├── _index.md        # Deutsche Startseite
│   ├── _index.en.md     # Englische Startseite
│   ├── resume/          # Lebenslauf-Sektion
│   └── blog/            # Blog-Sektion
├── layouts/             # HTML-Templates
│   ├── _default/        # Standard-Templates
│   ├── partials/        # Wiederverwendbare Komponenten
│   ├── index.html       # Startseiten-Template
│   └── resume/          # Lebenslauf-Templates
├── static/              # Statische Dateien
│   ├── css/            # Stylesheets
│   ├── js/             # JavaScript
│   └── images/         # Bilder und Icons
└── hugo.toml           # Hauptkonfiguration
```

## ✏️ Einfache Bearbeitungen

### Text ändern
1. Öffne die entsprechende `.md` oder `.html` Datei
2. Bearbeite den Text
3. Speichere die Datei
4. Die Website wird automatisch neu geladen

### Bilder hinzufügen
1. Kopiere das Bild nach `static/images/`
2. Verwende es mit `![Alt-Text](/images/bildname.jpg)`

### Neue Blog-Artikel
1. Erstelle Ordner: `content/blog/mein-neuer-artikel/`
2. Erstelle `index.md` mit:
```markdown
---
title: "Mein neuer Artikel"
date: 2024-01-01
---

Hier ist mein Artikel-Inhalt...
```

### Kontaktinformationen ändern
Bearbeite `layouts/partials/sidebar.html` für:
- E-Mail-Adresse
- Geburtstag
- Standort
- Social Media Links

## 🎨 Design anpassen

### Farben ändern
Bearbeite `static/css/main.css` und suche nach:
- `--primary-color` für die Hauptfarbe (Orange)
- `--text-color` für Textfarben
- `--background-color` für Hintergrundfarben

### Layout ändern
- `layouts/_default/baseof.html` - Grundstruktur
- `layouts/partials/` - Einzelne Komponenten

## 🚨 Wichtige Hinweise

1. **Immer Backups erstellen** vor größeren Änderungen
2. **Teste lokale Änderungen** mit `hugo server -D` bevor du sie veröffentlichst
3. **Markdown-Syntax verwenden** für Inhalte in `.md` Dateien
4. **Beide Sprachen aktualisieren** wenn du Inhalte änderst

## 📞 Support

Bei Problemen oder Fragen:
1. Überprüfe die Hugo-Dokumentation: https://gohugo.io/documentation/
2. Kontaktiere den Entwickler für technische Unterstützung

---

**Erstellt:** August 2025  
**Hugo Version:** v0.134.2  

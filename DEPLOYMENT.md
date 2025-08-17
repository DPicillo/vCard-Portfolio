# GitHub Pages & CloudFront Deployment Guide

Dieses Dokument erklärt, wie Sie die Website automatisch auf GitHub Pages veröffentlichen und optional CloudFront als CDN verwenden.

## 🚀 Automatische GitHub Pages Deployment

### Schritt 1: Repository Setup
1. **Repository zu GitHub pushen**:
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment workflow"
   git push origin main
   ```

2. **GitHub Pages in Repository-Einstellungen aktivieren**:
   - Gehe zu GitHub Repository → Settings → Pages
   - Source: "GitHub Actions" auswählen
   - Die Workflow-Datei `.github/workflows/deploy.yml` ist bereits erstellt

### Schritt 2: Deployment-Workflow aktivieren
Der Workflow wird automatisch ausgeführt bei:
- **Jeder Push** auf den `main` Branch
- **Manuell** über GitHub Actions Tab

Nach dem ersten Push:
1. Gehe zu **Actions** Tab in deinem Repository
2. Der "Deploy to GitHub Pages" Workflow sollte automatisch laufen
3. Nach erfolgreichem Deployment ist die Website verfügbar unter:
   `https://username.github.io/repository-name`

### Schritt 3: Custom Domain (Optional)
Für `david.picillo.de`:
1. **In Repository Settings → Pages**:
   - Custom domain: `david.picillo.de` eingeben
   - "Enforce HTTPS" aktivieren

2. **DNS-Einstellungen bei deinem Provider**:
   ```
   # A Records für GitHub Pages
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   
   # CNAME Record (alternative)
   CNAME    david    username.github.io
   ```

## ⚡ CloudFront CDN Setup

**Ja, du kannst CloudFront als CDN für GitHub Pages verwenden!** Das bringt folgende Vorteile:
- Bessere Performance weltweit
- Eigenes SSL-Zertifikat
- Erweiterte Caching-Kontrolle
- WAF (Web Application Firewall) Integration

### CloudFront Distribution erstellen

1. **AWS CloudFront Console öffnen**
2. **"Create Distribution" klicken**
3. **Origin Settings**:
   ```
   Origin Domain: username.github.io
   Origin Path: /repository-name (falls nicht root)
   Protocol: HTTPS only
   ```

4. **Default Cache Behavior**:
   ```
   Viewer Protocol Policy: Redirect HTTP to HTTPS
   Allowed HTTP Methods: GET, HEAD, OPTIONS
   Cache Key and Origin Requests: Use legacy cache settings
   TTL Settings:
     - Default TTL: 86400 (24 hours)
     - Maximum TTL: 31536000 (1 year)
   ```

5. **Distribution Settings**:
   ```
   Alternate Domain Names (CNAMEs): david.picillo.de
   SSL Certificate: Custom SSL Certificate (ACM)
   Default Root Object: index.html
   ```

### SSL-Zertifikat erstellen (AWS Certificate Manager)

1. **AWS ACM Console (in us-east-1 Region!)**
2. **"Request Certificate"**:
   ```
   Domain: david.picillo.de
   Validation: DNS validation (empfohlen)
   ```
3. **DNS-Validierung** durchführen
4. **Zertifikat in CloudFront** auswählen

### DNS-Konfiguration für CloudFront

```bash
# Bei deinem DNS-Provider:
CNAME    david    d1234567890.cloudfront.net
# Oder A Record auf CloudFront IP (über Alias bei Route 53)
```

## 📊 Monitoring & Performance

### CloudWatch Metrics
- **Requests**: Anzahl der Anfragen
- **BytesDownloaded**: Übertragenes Datenvolumen
- **OriginLatency**: Antwortzeit von GitHub Pages

### Performance Optimierungen

1. **Cache Headers in .htaccess** (bereits konfiguriert):
   ```apache
   # Browser Caching
   ExpiresActive On
   ExpiresByType text/css "access plus 1 year"
   ExpiresByType application/javascript "access plus 1 year"
   ExpiresByType image/png "access plus 1 year"
   ```

2. **CloudFront Cache Behaviors**:
   ```
   /src/styles/*  - Cache 1 year
   /src/scripts/* - Cache 1 year
   /src/assets/*  - Cache 1 year
   /*.html        - Cache 24 hours
   ```

## 🔧 Troubleshooting

### GitHub Pages Probleme
- **404 Error**: Prüfe ob `index.html` im Root liegt
- **Assets nicht gefunden**: Stelle sicher, dass Pfade relativ sind (`./src/`)
- **Workflow fails**: Prüfe Permissions in Repository Settings → Actions

### CloudFront Probleme
- **SSL-Zertifikat**: Muss in `us-east-1` Region erstellt werden
- **Cache Issues**: Invalidation erstellen für `/*`
- **Origin Errors**: GitHub Pages muss öffentlich zugänglich sein

## 💰 Kosten

### GitHub Pages
- **Kostenlos** für öffentliche Repositories
- Bandwidth: 100 GB/Monat
- Builds: 2000 Minuten/Monat

### CloudFront
- **Pay-per-use**:
  - Erste 1 TB: ~$0.085/GB
  - HTTP/HTTPS Requests: ~$0.0075/10.000 requests
  - SSL-Zertifikat: Kostenlos via ACM

**Beispielkosten** für kleine Website:
- 10 GB Traffic: ~$0.85/Monat
- 100.000 Requests: ~$0.75/Monat
- **Total**: ~$1.60/Monat

## 🚀 Deployment-Workflow

```mermaid
graph LR
    A[Code Push] --> B[GitHub Actions]
    B --> C[Build & Deploy]
    C --> D[GitHub Pages]
    D --> E[CloudFront CDN]
    E --> F[david.picillo.de]
```

### Automatischer Ablauf:
1. **Code Push** auf main Branch
2. **GitHub Actions** startet Workflow
3. **Deployment** auf GitHub Pages
4. **CloudFront** cached neue Inhalte
5. **Website** ist live unter david.picillo.de

## 📋 Checkliste

- [ ] Repository auf GitHub gepusht
- [ ] GitHub Pages in Settings aktiviert
- [ ] Workflow erfolgreich durchgelaufen
- [ ] Website unter github.io URL erreichbar
- [ ] Custom Domain konfiguriert (optional)
- [ ] CloudFront Distribution erstellt (optional)
- [ ] SSL-Zertifikat konfiguriert
- [ ] DNS-Einstellungen aktualisiert
- [ ] Website unter finaler Domain erreichbar

---

**Bei Fragen oder Problemen**: Prüfe die GitHub Actions Logs und CloudFront Distribution Status.
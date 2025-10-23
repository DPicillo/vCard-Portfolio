---
title: "Keycloak User Federation mit Active Directory"
date: 2025-01-15T10:00:00Z
description: "Umfassender Leitfaden zur Integration von Keycloak mit Active Directory über LDAP User Federation für Single Sign-On und Identity Management."
tags: ["Keycloak", "Active Directory", "LDAP", "SSO", "IAM", "Identity Management"]
categories: ["Identity and Access Management"]
draft: false
---

## Überblick

Die Integration von Keycloak mit Active Directory durch User Federation ermöglicht es Unternehmen, ihre bestehende AD-Infrastruktur zu nutzen und gleichzeitig moderne Identity Management-Funktionen bereitzustellen. In diesem Artikel erkläre ich die praktische Implementierung einer solchen Lösung.

> **Ziel - Single Sign-On (SSO):** Bestehende AD-Benutzer sollen sich nahtlos mit ihren gewohnten Zugangsdaten bei Keycloak-geschützten Anwendungen anmelden können, ohne dass neue Accounts erstellt werden müssen. Eine zentrale IAM-Lösung für alle Anwendungen.

## Architektur-Übersicht

![Keycloak Active Directory Integration Architecture](/images/diagrams/keycloak-ad-architecture.svg)

Die Architektur zeigt den Datenfluss zwischen den verschiedenen Komponenten:

- **Anwendungen** authentifizieren sich über OIDC/SAML bei Keycloak
- **Keycloak** fungiert als Identity Provider und vermittelt zwischen Apps und AD
- **Active Directory** bleibt die zentrale Benutzerverwaltung
- **LDAP-Protokoll** ermöglicht die Kommunikation zwischen Keycloak und AD

## Konfiguration der User Federation

### 1. LDAP Provider erstellen

Navigieren Sie in der Keycloak Admin Console zu "User Federation" und erstellen Sie einen neuen LDAP Provider:

```
Console Path: Realm → User Federation → Add Provider → LDAP

Connection URL: ldaps://dc1.example.com:636
Bind DN: CN=keycloak-svc,OU=Service Accounts,DC=example,DC=com
Bind Credential: [Service Account Password]
```

### 2. Basis-Konfiguration

```bash
# LDAP Settings
Users DN: OU=Users,DC=example,DC=com
Username LDAP attribute: sAMAccountName
RDN LDAP attribute: cn
UUID LDAP attribute: objectGUID
User Object Classes: person, organizationalPerson, user

# Connection Settings
Connection Timeout: 5000
Read Timeout: 10000
Connection Pooling: true
Pagination: true
```

### 3. Mapper-Konfiguration

Erstellen Sie Attribut-Mapper für die gewünschten AD-Felder:

```bash
# Standard Mapper
- username → sAMAccountName
- email → mail  
- firstName → givenName
- lastName → sn

# Gruppen Mapper
Name: group-ldap-mapper
Mapper Type: group-ldap-mapper
LDAP Groups DN: OU=Groups,DC=example,DC=com
Group Object Classes: group
Group Name LDAP Attribute: cn
```

## Erweiterte Funktionen

### Rollenbasierte Zugriffskontrolle

#### Option 1: Automatische Rollenzuweisung basierend auf AD-Gruppen

**Voraussetzungen für Option 1:** Stellen Sie sicher, dass die Benutzerrollen auf dem LDAP-Server wie folgt repräsentiert sind:

- Eine Organisationseinheit (OU), z.B. "Roles" oder "Groups"
- Gruppen unter dieser Einheit, die die individuellen Benutzerrollen repräsentieren
- Das cn-Attribut der Gruppen entspricht den Namen der Keycloak-Rollen
- Benutzer werden über das member-Attribut zu diesen Gruppen hinzugefügt

#### Option 2: Standard-Rolle für alle LDAP-Benutzer

Falls die AD-Gruppen nicht den Keycloak-Rollennamen entsprechen, verwenden Sie einen Standard-Mapper, der allen LDAP-Benutzern eine Platzhalterrolle zuweist.

### Password Sync

> **Hinweis:** Bei AD-Integration wird empfohlen, Passwort-Updates weiterhin über AD durchzuführen und Keycloak im READ_ONLY Modus zu betreiben.

## Troubleshooting

### Häufige Probleme

- **LDAP Connection Failed:** Überprüfen Sie Firewall-Regeln und Zertifikate
- **User Import Issues:** Validieren Sie die Users DN und Object Classes
- **Group Mapping Fehler:** Stellen Sie sicher, dass der Service Account Lesezugriff auf Gruppen hat
- **Performance Probleme:** Aktivieren Sie Connection Pooling und Pagination

## Best Practices

- **Service Account:** Verwenden Sie einen dedizierten Service Account mit minimalen Berechtigungen
- **SSL/TLS:** Nutzen Sie immer verschlüsselte LDAPS-Verbindungen
- **Caching:** Konfigurieren Sie angemessene Cache-Einstellungen für bessere Performance
- **Monitoring:** Implementieren Sie Überwachung für LDAP-Verbindungen und Sync-Prozesse
- **Testing:** Testen Sie die Integration mit verschiedenen AD-Gruppenmitgliedschaften

## Fazit

Die Integration von Keycloak mit Active Directory über User Federation bietet eine elegante Lösung für hybride Identity Management-Szenarien. Durch die zentrale Verwaltung in AD bleiben bestehende Prozesse erhalten, während moderne SSO-Funktionen für neue Anwendungen verfügbar werden.

Diese Architektur bildet eine solide Grundlage für die schrittweise Migration zu cloud-nativen Identity-Lösungen, ohne bestehende Workflows zu unterbrechen.
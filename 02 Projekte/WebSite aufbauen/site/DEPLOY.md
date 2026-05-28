# Deployment

Statischer OnePager auf Hetzner Webhosting (`www639.your-server.de`, Domain `wirkvektor.de`).

## Warum nicht aus der Cloud-Session

Die Network-Policy der Claude-Cloud-Session sperrt ausgehenden SFTP (Port 22). Build geht, Upload nicht. Deploy daher **lokal** ausführen.

## Einmal einrichten

Auf dem lokalen Rechner:

```bash
# lftp installieren
brew install lftp           # macOS
sudo apt install lftp       # Debian/Ubuntu

# Repo + Branch holen
git clone git@github.com:SZzip/WirkVektor.git
cd "WirkVektor/02 Projekte/WebSite aufbauen/site"

# Zugangsdaten anlegen (wird durch .gitignore ignoriert)
cp .env.deploy.example .env.deploy
$EDITOR .env.deploy         # SFTP_PASS und ggf. SFTP_REMOTE_DIR setzen
```

`SFTP_REMOTE_DIR` ist das Webroot der Domain im KonsoleH. Üblich: `/public_html`. Wenn die Domain als eigenes Unterverzeichnis konfiguriert ist (`Domains → wirkvektor.de → Verzeichnis`), den dort eingetragenen Pfad nehmen.

## Deployen

```bash
./deploy.sh --dry          # zeigt was übertragen würde, schreibt nichts
./deploy.sh                # baut frisch und spiegelt dist/ aufs Webhosting
./deploy.sh --skip-build   # nur Upload, falls dist/ schon aktuell ist
```

Das Skript:

1. installiert Dependencies (`npm ci`),
2. läuft die Tests,
3. baut das Production-Bundle,
4. entfernt Source-Maps aus `dist/`,
5. spiegelt `dist/` per SFTP ins Webroot — `--delete` räumt verwaiste Dateien auf dem Server weg.

## Nach dem ersten Deploy

1. **HTTPS aktivieren** im KonsoleH (Hetzner Webhosting → SSL → Let's Encrypt für `wirkvektor.de` und `www.wirkvektor.de`). Die `.htaccess` erzwingt danach automatisch HTTPS.
2. **Passwort rotieren** — das initial geteilte SFTP-Passwort im KonsoleH neu setzen und in `.env.deploy` ersetzen.
3. **Domain prüfen** — `wirkvektor.de` und `www.wirkvektor.de` zeigen beide auf den Webhosting-Account.
4. **Manuelle Stichprobe** an `https://wirkvektor.de`: Theme-Wechsel, Carousel, Form, Bookmark-Liste.

## Was die `.htaccess` macht

Liegt in `public/.htaccess` und wird durch Vite in `dist/.htaccess` kopiert.

- HTTP → HTTPS Redirect (301)
- `www.wirkvektor.de` → `wirkvektor.de` Redirect (301)
- gzip für HTML, CSS, JS, SVG, Fonts
- Lang-Cache für gehashte Assets (`max-age=31536000, immutable`)
- HTML immer revalidieren (`max-age=0, must-revalidate`)
- Security-Header: HSTS, X-Content-Type-Options, Referrer-Policy, X-Frame-Options, Permissions-Policy
- Directory-Listing aus
- Dotfiles gesperrt

## Rollback

`dist/` lokal aus einem älteren Commit neu bauen und `./deploy.sh --skip-build` mit dem zuvor gebauten `dist/`.

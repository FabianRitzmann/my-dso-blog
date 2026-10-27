# Juice Shop Master

This repository documents security challenges solved on the [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/), an intentionally vulnerable web application used for security training. All content in this repository is for **educational purposes only** and was created as part of a pentesting training project. No real personal data, credentials, or infrastructure information is included.

## Table of Contents

- [Quickstart](#quickstart)
- [Challenges](#challenges)
  - [1. Broken Authentication – Login Bjoern](#1-broken-authentication--login-bjoern)
  - [2. Server-side XSS Protection](#2-server-side-xss-protection)
  - [3. Broken Authentication – Two Factor Authentication (wurstbrot)](#3-broken-authentication--two-factor-authentication-wurstbrot)
- [Disclaimer](#disclaimer)

## Quickstart

1. Clone the OWASP Juice Shop repository:
   ```bash
   git clone https://github.com/juice-shop/juice-shop.git
   ```
2. Move into the project directory:
   ```bash
   cd juice-shop
   ```
3. Install dependencies and start the application:
   ```bash
   npm install
   npm start
   ```
4. Open `http://localhost:3000` in your browser once the server is running.
5. Each challenge has its own folder in this directory, containing a `README.md` with a full write-up and supporting screenshots.
6. A short (≤5 minute) video demonstrating each attack is linked from the corresponding challenge's `README.md`.

## Challenges

| # | Challenge | Category | Difficulty | Write-up |
|---|-----------|----------|------------|----------|
| 1 | Login Bjoern | Broken Authentication | ★★★★ | [View](./01-login-bjoern/README.md) |
| 2 | Server-side XSS Protection | Cross-Site Scripting (XSS) | ★★★★ | [View](./02-server-side-xss-protection/README.md) |
| 3 | Two Factor Authentication (wurstbrot) | Broken Authentication | ★★★★★ | [View](./03-two-factor-authentication/README.md) |

### 1. Broken Authentication – Login Bjoern

Logging into Bjoern's Google-linked account by exploiting a predictable, client-side password-generation scheme used for OAuth sign-ins, without changing his password, using SQL Injection, or compromising his Google account.

➡️ Full write-up: [`01-login-bjoern/README.md`](./01-login-bjoern/README.md)
🎥 Video: [Watch on Loom](https://somup.com/cO6YFzVfns1)

### 2. Server-side XSS Protection

Performing a persisted XSS attack with a nested `<iframe src="javascript:alert('xss')">` payload, bypassing a server-side sanitization filter that only strips a disallowed tag once instead of re-checking its own output.

➡️ Full write-up: [`02-server-side-xss-protection/README.md`](./02-server-side-xss-protection/README.md)
🎥 Video: [Watch on ScreenPal](https://go.screenpal.com/watch/cO6YYyny02M)

### 3. Broken Authentication – Two Factor Authentication (wurstbrot)

Solving the 2FA challenge for user wurstbrot by generating a genuine, valid TOTP code (combining a SQL-Injection login bypass with a TOTP secret exposed in the application's public source code), without disabling, bypassing, or overwriting the account's 2FA settings.

➡️ Full write-up: [`03-two-factor-authentication/README.md`](./03-two-factor-authentication/README.md)
🎥 Video: [Watch on ScreenPal](https://go.screenpal.com/watch/cO63YcnyUXV)

## Disclaimer

This repository, its write-ups and videos were created exclusively for educational purposes as part of a security-training exercise using the intentionally vulnerable OWASP Juice Shop application. No real systems, users, or data were targeted.
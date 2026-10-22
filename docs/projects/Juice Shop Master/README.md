# Juice Shop Master
 
This repository documents security challenges solved on the [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/), an intentionally vulnerable web application used for security training. All content in this repository is for **educational purposes only** and was created as part of a pentesting training project. No real personal data, credentials, or infrastructure information is included.
 
## Table of Contents
 
- [Quickstart](#quickstart)
- [Challenges](#challenges)
  - [1. Broken Authentication – Login Bjoern](#1-broken-authentication--login-bjoern)
- [Disclaimer](#disclaimer)
## Quickstart
 
1. Clone this repository.
2. Each challenge has its own folder under [`challenges/`](./challenges), containing a `README.md` with a full write-up and supporting screenshots.
3. A short (≤5 minute) video demonstrating each attack is linked from the corresponding challenge's `README.md`.
4. To reproduce the challenges yourself, run a local OWASP Juice Shop instance, e.g.:
```bash
   docker run --rm -p 3000:3000 bkimminich/juice-shop
```
   Then open `http://localhost:3000` in your browser.
 
## Challenges
 
| # | Challenge | Category | Difficulty | Write-up |
|---|-----------|----------|------------|----------|
| 1 | Login Bjoern | Broken Authentication | ★★★ | [View](./challenges/01-broken-authentication-login-bjoern/README.md) |
 
### 1. Broken Authentication – Login Bjoern
 
Logging into Bjoern's Google-linked account by exploiting a predictable, client-side password-generation scheme used for OAuth sign-ins — without changing his password, using SQL Injection, or compromising his Google account.
 
➡️ Full write-up: [`challenges/01-broken-authentication-login-bjoern/README.md`](./challenges/01-broken-authentication-login-bjoern/README.md)
🎥 Video: [Watch on Loom](https://somup.com/cO6YFzVfns1)
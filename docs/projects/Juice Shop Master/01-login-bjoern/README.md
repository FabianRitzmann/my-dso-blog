# Login Bjoern: Broken Authentication

## Challenge Overview

| | |
|---|---|
| **Category** | Broken Authentication |
| **Target** | OWASP Juice Shop |
| **Objective** | Log in with Bjoern's Gmail account without changing his password, using SQL Injection, or hacking his Google account |
| **Video** | [Link to recording](https://somup.com/cO6YFzVfns1) |

## Vulnerability Summary

OWASP Juice Shop allows users to sign in either with a local email/password combination or via "Login with Google" (OAuth). When a user authenticates via Google, the application still needs to store *some* password hash for that account, because the login endpoint always compares submitted credentials against a password column in the database.

The placeholder password for OAuth accounts is generated deterministically: reverse the email address character by character, then Base64-encode the result. Because this logic is fully client-side and deterministic, anyone who knows the victim's email address can recompute the exact password stored for their OAuth account, without ever touching Google, without SQL Injection, and without resetting anything.

## Prerequisites

- A local OWASP Juice Shop instance (`docker run --rm -p 3000:3000 bkimminich/juice-shop`)
- Burp Suite (or browser DevTools) to inspect the login request
- [CyberChef](https://gchq.github.io/CyberChef/) (or any tool that can reverse a string and Base64-encode it)

## Step-by-Step Walkthrough

### 1. Find Bjoern's Gmail address

Bjoern Kimminich is the real-world author and maintainer of OWASP Juice Shop, so information about him is publicly available. His [GitHub profile](https://github.com/bkimminich) shows his full name: **Bjoern Kimminich**.

Combining his first and last name and appending the `@gmail.com` domain, a common convention for personal Gmail addresses, produces a plausible candidate:

```
bjoern.kimminich@gmail.com
```

> ⚠️ Note: Be careful not to confuse this with his internal/OWASP address (`bjoern@owasp.org`), which also appears in public sources. The "Login Bjoern" challenge specifically targets the Google-linked account, so only the Gmail address works here.

### 2. Analyze the login request

Open the Juice Shop login page, enter any dummy credentials, and intercept the request with Burp Suite to understand the request format expected by `/rest/user/login`.

The request is a simple JSON POST with `email` and `password` fields. An early attempt with an empty password (`""`) confirmed that OAuth accounts do **not** have an empty/blank password stored, ruling out that shortcut and pointing toward the actual OAuth password-generation logic described above.

### 3. Recompute the OAuth placeholder password

Using Bjoern's Gmail address, apply the same logic the frontend uses:

**a) Reverse the email address**

```
Input:  bjoern.kimminich@gmail.com
Output: moc.liamg@hcinimmik.nreojb
```

**b) Base64-encode the reversed string**

```
Input:  moc.liamg@hcinimmik.nreojb
Output: bW9jLmxpYW1nQGhjaW5pbW1pay5ucmVvamI=
```

Both steps can be done in a single CyberChef recipe: **"Reverse"** → **"To Base64"**.

### 4. Log in with the derived credentials

On the normal Juice Shop login form, submit:

| Field | Value |
|---|---|
| Email | `bjoern.kimminich@gmail.com` |
| Password | `bW9jLmxpYW1nQGhjaW5pbW1pay5ucmVvamI=` |

The login succeeds and the "Login Bjoern" challenge is marked as solved on the score board.

## Root Cause

The vulnerability is a classic **Broken Authentication** issue (OWASP Top 10, A07:2021): the application derives account credentials using a deterministic, reversible, client-side algorithm based on publicly knowable input (the user's email address). Because the transformation (`reverse` + `Base64`) is trivial to reproduce and Base64 is an *encoding*, not encryption, anyone who knows (or can guess) the victim's OAuth-linked email address can reconstruct their "password", completely bypassing the intended OAuth flow.

## Impact

- **Account takeover** of any user who registered via Google OAuth, as long as their email address is known or guessable.
- Attackers do not need access to the victim's Google account, a password reset flow, or any injection technique; only the email address and basic knowledge of the client-side source code.
- Because OAuth is typically perceived as a *more* secure authentication method, users and administrators may not expect OAuth-linked accounts to have an exploitable local password at all, making this flaw easy to overlook during security reviews.

## Remediation

- **Never derive secrets (passwords, tokens) from public or predictable user attributes** such as an email address.
- For OAuth-based accounts, do not store a usable local password at all; if a local password field is required by the data model, populate it with a cryptographically random value that is never derived from user-controlled or publicly known data, and disable local password login entirely for such accounts.
- Perform the password/placeholder generation (if unavoidable) server-side using a cryptographically secure random generator, never via client-side JavaScript logic that can be read, reproduced, and reverse-engineered by anyone.
- Treat Base64 strictly as an encoding, never as a form of secret protection.

## Disclaimer

This documentation and the accompanying video were created exclusively for educational purposes as part of a DevSecOps training exercise using the intentionally vulnerable OWASP Juice Shop application. No real systems, users, or data were targeted.
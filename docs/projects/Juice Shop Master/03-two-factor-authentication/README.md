# Two Factor Authentication: wurstbrot

## Challenge Overview

| | |
|---|---|
| **Category** | Broken Authentication / Two Factor Authentication |
| **Target** | OWASP Juice Shop (local instance, `127.0.0.1:3000`) |
| **Objective** | Solve the 2FA challenge for user `wurstbrot` by generating a valid TOTP code, without disabling, bypassing, or overwriting the account's 2FA settings |
| **Video** | [Link to recording](https://go.screenpal.com/watch/cO63YcnyUXV) |

## Vulnerability Summary

The Juice Shop source repository ships a YAML fixture file that seeds demo user accounts for the application's database, including each account's email, password, role, and (where enabled) its TOTP secret. Because this file is committed to the public GitHub repository, the 2FA secret for the user `wurstbrot` is exposed in plaintext to anyone who reads the project's source code. A second, independent weakness, a SQL injection in the login form, allows the password check to be bypassed entirely, so the only real barrier to full account takeover is the second factor itself, and that factor's secret was never meant to be kept confidential in the way a real deployment would require.

## Prerequisites

- A local OWASP Juice Shop instance running on `127.0.0.1:3000`
- Burp Suite (or an equivalent intercepting proxy) to capture and replay the login and 2FA-verification requests
- CyberChef, to decode the Base32 TOTP secret and generate time-based codes
- Read access to the Juice Shop GitHub repository (`https://github.com/juice-shop/juice-shop`)

## Step-by-Step Walkthrough

1. **Authenticate as wurstbrot without the real password.** Submit the login form with `wurstbrot@juice-sh.op' --` as the email and any value as the password. The trailing SQL comment sequence truncates the rest of the `WHERE` clause, so the password is never actually checked.
2. **Capture the password-stage response.** Because the account has 2FA enabled, the server does not return a full session. Instead it responds with `{"status":"totp_token_required","data":{"tmpToken":"<JWT>"}}`, confirming the password stage succeeded and a second factor is now required.
3. **Search the public source repository for the account's seed data.** Juice Shop's demo accounts, including `wurstbrot`, are defined in a YAML fixture file used to populate the database on startup. Using GitHub's code search against the repository for the username `wurstbrot` locates the relevant entry, which includes a `totpSecret` field: `IFTXE3SPOEYVURT2MRYGI52TKJ4HC3KH`.
4. **Generate a valid TOTP code.** In CyberChef, use the `Generate TOTP` operator directly on the Base32 secret (no separate `From Base32` decoding step is needed, the operator decodes it internally) with the default parameters (SHA1, 6 digits, 30-second interval, epoch offset 0). This produces a 6-digit, time-based one-time code.
5. **Submit the second factor.** Send a new fresh request containing the `tmpToken` from step 2 and the `totpToken` generated in step 4, in immediate succession (the tmpToken and the TOTP window are both short-lived).
6. **Confirm success.** The server returns a 200 response with a full authentication token, and the Juice Shop Score Board marks the "Two Factor Authentication" challenge as solved.

## Root Cause

**Category of vulnerability:** Sensitive data exposure combined with a second, independent authentication bypass.

- **Hardcoded secrets in version control:** The TOTP seed for a real (demo) account is stored in plaintext in a file that is committed to a public repository. Any secret that ends up in source control, even for a "test" account, should be treated as compromised the moment the repository is public, since it remains recoverable from history even if later removed.
- **SQL injection in the login endpoint:** The email field is concatenated into the login query without parameterization, allowing a comment sequence (`' --`) to truncate the password check entirely. This independently defeats the first authentication factor and, combined with the exposed secret, removes any real barrier to logging in as `wurstbrot`.

## Impact

- With both weaknesses combined, an attacker needs no valid credentials at all to obtain a fully authenticated session for `wurstbrot`: the SQL injection defeats the password check, and the leaked seed file supplies the 2FA secret.
- Because the 2FA secret is static and recoverable from source control, it provides no real security benefit for this account. The second factor can be computed by anyone with repository access at any time, not just at enrollment.
- In a non-demo application, an equivalent source-control leak of TOTP seeds would let an attacker bypass 2FA account-wide for any user whose secret appears in the same file or system, turning a single exposure into a mass authentication bypass.
- Combined with the SQL injection, this represents a full authentication bypass chain: no legitimate credential, password, or 2FA device is required to take over the account.

## Remediation

- Parameterize all SQL queries (or use an ORM with bound parameters) so user-supplied input in the login form can never alter query structure.
- Never commit real or production-equivalent secrets, including TOTP seeds, to source control. Generate per-account secrets at runtime or in a secrets manager, and keep seed/fixture data for demos clearly separated from anything resembling production configuration.
- If a secret has already been committed, treat it as permanently exposed: rotate it, and do not rely on removing it from the latest commit, since it remains recoverable from repository history.
- Apply rate limiting and anomaly detection to both the login and 2FA-verification endpoints to slow down credential- and code-guessing attempts regardless of this specific issue.

## Disclaimer

This report was produced exclusively for educational purposes as part of a security-training exercise against the intentionally vulnerable OWASP Juice Shop application, running locally. No real systems, users, or data were targeted.
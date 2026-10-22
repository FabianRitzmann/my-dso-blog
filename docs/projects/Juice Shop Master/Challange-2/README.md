# Server-side XSS Protection: Cross-Site Scripting (XSS)

## Challenge Overview

| | |
|---|---|
| **Category** | Cross-Site Scripting (XSS) |
| **Target** | OWASP Juice Shop |
| **Objective** | Perform a *persisted* XSS attack with `<iframe src="javascript:alert(`xss`)">`, bypassing a server-side security mechanism |
| **Video** | [Link to recording](https://go.screenpal.com/watch/cO6YYyny02M) |

## Vulnerability Summary

Juice Shop sanitizes feedback comments server-side to strip dangerous tags like `<iframe>`. However, the filter only removes a disallowed tag **once**, without re-checking the result. Nesting a tag inside itself causes the filter to strip only the inner match, leaving behind a new, still-malicious tag that is never re-evaluated. This is a classic **non-recursive input sanitization** flaw.

## Prerequisites

- A local OWASP Juice Shop instance (`docker run --rm -p 3000:3000 bkimminich/juice-shop`)
- Burp Suite (or browser DevTools) to craft and submit the feedback request
- Access to the public Feedback form (no login required)

## Step-by-Step Walkthrough

### 1. Navigate to the Feedback form

The Feedback form on the OWASP Juice Shop frontend is accessible anonymously, without login.

### 2. Craft a nested payload

Instead of submitting the plain payload (which the server-side sanitizer successfully strips), nest it inside a duplicate of itself in the `comment` field of the request body:

```
<<iframe src="javascript:alert(`xss`)">iframe src="javascript:alert(`xss`)">
```

### 3. Submit the request

The sanitizer detects and removes the well-formed inner `<iframe src="javascript:alert(`xss`)">` tag from the middle of the string. The leftover prefix and suffix characters recombine into a brand-new, valid `<iframe src="javascript:alert(`xss`)">` tag, one the filter never re-examines.

### 4. View the stored feedback

View the stored feedback (e.g., on the public Feedback/testimonials display, or as an administrator in the admin panel). The browser renders the surviving `<iframe>` tag and executes the `javascript:alert(`xss`)` payload, producing a persisted (stored) XSS popup.

### 5. Confirmation

The OWASP Juice Shop Score Board (`/#/score-board`) marks the "Server-side XSS Protection" challenge as solved once the payload is successfully stored and matches the server's internal success check.

## Root Cause

**Category of vulnerability:** Stored / Persisted Cross-Site Scripting (XSS), caused by an **incomplete server-side input sanitization mechanism**. Blocklist- or single-pass-based input sanitization is fragile: removing a matched pattern exactly once, without re-scanning the result, allows an attacker to construct input that reassembles into malicious markup after the one and only sanitization pass.

## Impact

- Unlike reflected XSS, a **persisted** payload is stored on the server and delivered to *every* user (or specifically to administrators) who later views the affected content, without the attacker needing to trick a victim into clicking a malicious link.
- Because the payload is injected through a public, unauthenticated form (the feedback form), **any anonymous visitor** can plant the attack.
- If triggered in an **administrator's** browser session (e.g., via an admin feedback-review panel), the attacker's injected JavaScript executes with the privileges and session context of that administrator. In a real-world application, this could be used to:
  - Steal the administrator's session token or authentication cookies
  - Perform actions on the admin's behalf (privilege escalation)
  - Redirect the admin to a phishing page
  - Exfiltrate sensitive data visible in the admin panel

## Remediation

- Use a well-tested, actively maintained HTML sanitization library configured to process input **recursively** until no further changes occur, rather than a single pass.
- Alternatively, use an allowlist approach combined with proper output encoding (contextual escaping) at render time, rather than relying solely on removing "bad" patterns at input time.
- Apply the same sanitization logic consistently wherever user-supplied content is rendered (public display and admin panel alike).

## Disclaimer

This documentation and the accompanying video were created exclusively for educational purposes as part of a DevSecOps training exercise using the intentionally vulnerable OWASP Juice Shop application. No real systems, users, or data were targeted.
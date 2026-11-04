# Security Policy

## 1. Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

---

## 2. Security Architecture & Threat Model

LinkVault is intentionally architected to minimize attack surfaces:

1. **Static Deployment Model**:
   - The publicly deployed site contains zero server-side logic, databases, or execution endpoints.
   - There are no session tokens or administrative credentials on the public client.
2. **Local Studio Isolation**:
   - The visual Studio runs strictly on the developer's local workstation.
   - Dev middleware explicitly binds to loopback (`127.0.0.1`, `::1`) and rejects non-localhost requests.
   - In production builds (`npm run build`), `rollupOptions.input` builds **only** `index.html`. `studio.html` and Studio JavaScript bundles are completely excluded from the deployment output.
3. **Strict URL Sanitization**:
   - All profile URLs are strictly validated using Zod against `javascript:`, `vbscript:`, and malicious data URIs.
4. **Referrer & Tab-Nabbing Protection**:
   - All external outbound links enforce `rel="noopener noreferrer"`.
5. **Atomic File Safety**:
   - The local save API writes to a temporary file before renaming, preventing profile corruption.

---

## 3. Reporting a Vulnerability

If you discover a security vulnerability within LinkVault, please report it responsibly:

- **Email**: `ashishsinghbora@users.noreply.github.com`
- **GitHub Security Advisories**: You can submit a private security advisory via the repository's Security tab.

Please do not open public GitHub issues for security vulnerabilities.

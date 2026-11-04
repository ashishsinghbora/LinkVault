# Contributing to LinkVault

Thank you for your interest in improving LinkVault! We welcome contributions from developers, security researchers, designers, and technical writers.

---

## 1. Development Workflow

1. **Fork the repository** on GitHub: `https://github.com/ashishsinghbora/LinkVault`.
2. **Clone your fork**:
   ```bash
   git clone https://github.com/<your-username>/LinkVault.git
   cd LinkVault
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the local preview server**:
   ```bash
   npm run dev
   ```
5. **Open the visual management Studio**:
   ```bash
   npm run studio
   # Opens http://127.0.0.1:5173/studio.html
   ```

---

## 2. Validation & Quality Standards

Before submitting a Pull Request, ensure all tests and type checks pass:

```bash
# 1. Validate profile configuration schema
npm run validate

# 2. Run TypeScript checks
npm run typecheck

# 3. Run Vitest unit tests
npm test

# 4. Verify production build
npm run build
```

---

## 3. Pull Request Guidelines

- Branch names should be descriptive (e.g., `feat/custom-accent`, `fix/mobile-touch-target`).
- Ensure no secrets, tokens, or personal credentials are included in commits.
- Maintain accessible markup (semantic elements, visible focus rings, aria labels).
- Do not add heavy external analytics or third-party tracking scripts.

# 🧹 Code Quality Guide

This project uses **ESLint** and **Prettier** to maintain consistent code quality and formatting across the monorepo.

## 🛠️ Tools Used

### ESLint

- **Purpose**: Code linting and error detection
- **Config**: `eslint.config.js` (flat config format)
- **Rules**: TypeScript, React, Next.js, and NestJS specific rules

### Prettier

- **Purpose**: Code formatting
- **Config**: `.prettierrc.json`
- **Settings**: Consistent formatting across JS, TS, JSON, MD files

### VS Code Integration

- **Auto-format on save** enabled
- **Auto-fix ESLint issues** on save
- **Recommended extensions** in `.vscode/extensions.json`

## 📋 Available Commands

### Root Level (Monorepo)

```bash
# Lint all files with auto-fix
npm run lint

# Check linting without fixing
npm run lint:check

# Format all files
npm run format

# Check formatting without fixing
npm run format:check

# Run both linting and formatting
npm run quality

# Check both without fixing
npm run quality:check
```

### Backend Specific

```bash
cd backend

# Lint TypeScript files
npm run lint
npm run lint:check

# Format files
npm run format
```

### Admin Specific

```bash
cd admin

# Lint React/Next.js files
npm run lint

# Format files
npm run format
```

## 🎯 Code Quality Rules

### General Rules

- **Single quotes** for strings
- **Semicolons** required
- **2 spaces** for indentation
- **Trailing commas** in multiline objects/arrays
- **100 character** line length limit

### TypeScript Rules

- Unused variables not allowed (except with `_` prefix)
- `any` type generates warnings
- Prefer `const` over `let`
- Template literals over string concatenation

### Backend (NestJS) Rules

- Console logging allowed in backend
- Decorators properly supported
- TypeORM patterns recognized

### Frontend (Next.js/React) Rules

- React import not required (Next.js auto-import)
- Hooks rules enforced
- Next.js specific optimizations
- Image component preferred over `<img>`

## 🔧 Editor Setup

### VS Code (Recommended)

1. Install recommended extensions (VS Code will prompt you)
2. Settings are pre-configured in `.vscode/settings.json`
3. Code will auto-format and auto-lint on save

### Other Editors

- Ensure Prettier and ESLint plugins are installed
- Point to `.prettierrc.json` and `eslint.config.js`
- Enable format on save and lint on save

## 🚀 CI/CD Integration

### GitHub Actions

- **Workflow**: `.github/workflows/code-quality.yml`
- **Triggers**: Push and PR to `main`/`develop`
- **Checks**: Linting, formatting, TypeScript, builds, tests

### Pre-commit Hooks (Optional)

To add pre-commit hooks with Husky:

```bash
npm install --save-dev husky lint-staged

# Add to package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,yml,yaml}": ["prettier --write"]
  }
}
```

## 📁 File Exclusions

### ESLint Ignores

- `node_modules/`
- `dist/` and `build/`
- `.next/`
- Coverage reports
- Generated type files

### Prettier Ignores

- Same as ESLint plus:
- `package-lock.json`
- Log files
- Environment files

## 🎨 Formatting Examples

### TypeScript/JavaScript

```typescript
// ✅ Good
const user = {
  name: 'John Doe',
  email: 'john@example.com',
  active: true,
};

const greeting = `Hello, ${user.name}!`;

// ❌ Bad
const user = {
  name: 'John Doe',
  email: 'john@example.com',
  active: true,
};

const greeting = 'Hello, ' + user.name + '!';
```

### React/JSX

```tsx
// ✅ Good
export default function UserCard({ user, onEdit }: UserCardProps) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <button onClick={() => onEdit(user.id)}>Edit User</button>
    </div>
  );
}

// ❌ Bad
export default function UserCard({ user, onEdit }: UserCardProps) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <button onClick={() => onEdit(user.id)}>Edit User</button>
    </div>
  );
}
```

## 🐛 Troubleshooting

### Common Issues

1. **ESLint not working in VS Code**
   - Restart VS Code after installing extensions
   - Check ESLint output panel for errors

2. **Prettier conflicts with ESLint**
   - We use `eslint-config-prettier` to disable conflicting rules
   - Run `npm run quality` to fix both

3. **TypeScript errors not showing**
   - Ensure TypeScript extension is installed
   - Check workspace uses correct TS version

### Reset Configuration

```bash
# Remove node_modules and reinstall
rm -rf node_modules backend/node_modules admin/node_modules
npm run install:all

# Clear VS Code settings if needed
# Delete .vscode folder and restart VS Code
```

## 📚 Resources

- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [TypeScript ESLint Rules](https://typescript-eslint.io/rules/)
- [Next.js ESLint](https://nextjs.org/docs/basic-features/eslint)

---

**Questions?** Check our [Contributing Guidelines](CONTRIBUTING.md) or open an issue!

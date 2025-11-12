# Development Workflow Guide

## Overview

This document outlines the development workflow for the Cosmic Player project, including quality gates, automation tools, and best practices.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run all quality checks before committing
npm run validate
```

## Development Environment Setup

### 1. Prerequisites

- **Node.js**: v20.x or higher
- **npm**: v9.x or higher
- **Git**: Latest version
- **VS Code**: Recommended IDE

### 2. Initial Setup

```bash
# Clone the repository
git clone https://github.com/lavish112000/Cosmic-Player.git
cd Cosmic-Player

# Install dependencies
npm install

# Install VS Code recommended extensions
# (VS Code will prompt you automatically)
```

### 3. Environment Variables

Create a `.env.local` file for local development:

```env
# Add your environment variables here
# Never commit this file to Git
```

## Development Workflow

### Daily Workflow

1. **Start Development Server**

   ```bash
   npm run dev
   ```

   - Opens at http://localhost:9002
   - Hot reload enabled
   - TypeScript errors shown in browser

2. **Make Changes**
   - Write code following our [code standards](CONTRIBUTING.md)
   - VS Code will auto-format on save (if configured)
   - ESLint will highlight issues inline

3. **Run Quality Checks**

   ```bash
   # Run all checks at once
   npm run validate

   # Or run individually:
   npm run typecheck    # TypeScript type checking
   npm run lint         # ESLint
   npm run format:check # Prettier
   npm test             # Jest tests
   ```

4. **Commit Changes**

   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

   Pre-commit hooks will automatically:
   - Run tests
   - Lint and format staged files
   - Block commit if checks fail

5. **Push Changes**

   ```bash
   git push
   ```

   Pre-push hooks will run:
   - Full validation suite
   - All tests with coverage
   - Type checking
   - Linting
   - Format checking

## Quality Gates

### Local Quality Gates (Pre-commit)

Enforced automatically via Husky:

- ✅ All tests pass
- ✅ Code is properly formatted
- ✅ No ESLint errors

### Pre-Push Quality Gates

Enforced automatically before push:

- ✅ TypeScript compilation succeeds
- ✅ All tests pass with coverage ≥70%
- ✅ No ESLint warnings or errors
- ✅ Code is properly formatted

### CI/CD Quality Gates

Enforced on every pull request:

1. **Code Quality Checks**
   - TypeScript type checking
   - ESLint validation
   - Prettier formatting check
   - Test coverage ≥70%

2. **Security Audit**
   - npm audit for dependencies
   - Dependency vulnerability scanning
   - Secret detection

3. **Build Verification**
   - Production build succeeds
   - No build warnings or errors

4. **Performance Monitoring**
   - Lighthouse performance audit
   - Bundle size analysis
   - Core Web Vitals check

## Available Commands

### Development

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm start`     | Start production server  |

### Code Quality

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm run lint`         | Check for linting errors         |
| `npm run lint:fix`     | Fix linting errors automatically |
| `npm run format`       | Format all files with Prettier   |
| `npm run format:check` | Check if files are formatted     |
| `npm run typecheck`    | Run TypeScript type checking     |

### Testing

| Command                 | Description              |
| ----------------------- | ------------------------ |
| `npm test`              | Run all tests            |
| `npm run test:watch`    | Run tests in watch mode  |
| `npm run test:coverage` | Generate coverage report |

### Validation

| Command                  | Description            |
| ------------------------ | ---------------------- |
| `npm run validate`       | Run all quality checks |
| `npm run security:audit` | Run security audit     |

## Git Workflow

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates
- `test/` - Test additions/updates
- `chore/` - Maintenance tasks

Examples:

```
feature/add-playlist-shuffle
fix/video-playback-issue
refactor/player-controls
docs/update-readme
```

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `perf`: Performance improvement
- `test`: Testing
- `chore`: Maintenance

**Examples:**

```bash
git commit -m "feat(player): add fullscreen mode"
git commit -m "fix(playlist): resolve shuffle infinite loop"
git commit -m "docs: update contributing guidelines"
```

## Pull Request Workflow

### 1. Create Pull Request

- Use the [PR template](.github/PULL_REQUEST_TEMPLATE.md)
- Link related issues
- Provide clear description
- Add screenshots if UI changes

### 2. Automated Checks

CI/CD will automatically:

- Run all quality checks
- Generate code review report
- Post comments with results
- Check code coverage

### 3. Code Review

- At least one approval required
- Address all review comments
- Update PR based on feedback
- Re-request review after changes

### 4. Merge

Once approved and all checks pass:

- Squash and merge to main branch
- Delete feature branch
- CI/CD will deploy automatically

## Testing Strategy

### Unit Tests

- Test individual functions/components
- Mock external dependencies
- Aim for 70%+ coverage

```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test implementation
  });
});
```

### Integration Tests

- Test component interactions
- Test API integrations
- Verify data flow

### E2E Tests (Future)

- Test complete user flows
- Simulate real user behavior
- Run in CI/CD pipeline

## Debugging

### VS Code Debugging

1. Set breakpoints in VS Code
2. Press F5 to start debugging
3. Debug in Chrome/Edge

### Common Issues

**TypeScript Errors**

```bash
npm run typecheck
```

**Linting Errors**

```bash
npm run lint:fix
```

**Test Failures**

```bash
npm test -- --verbose
```

**Build Failures**

```bash
npm run build
# Check error messages
```

## Performance Optimization

### Best Practices

1. **Code Splitting**
   - Use dynamic imports
   - Lazy load components
   - Split routes

2. **Image Optimization**
   - Use Next.js Image component
   - Provide proper sizes
   - Use WebP format

3. **Bundle Size**
   - Monitor bundle size
   - Remove unused dependencies
   - Use tree shaking

### Performance Monitoring

```bash
# Analyze bundle size
npm run build
```

Check the build output for:

- Page sizes
- First Load JS
- Route chunks

## Security Best Practices

### Environment Variables

- Never commit `.env.local`
- Use environment-specific configs
- Rotate credentials regularly

### Dependencies

```bash
# Check for vulnerabilities
npm run security:audit

# Update dependencies
npm update

# Check outdated packages
npm outdated
```

### Code Review Checklist

Before submitting PR, verify:

- [ ] No hardcoded secrets
- [ ] Input validation implemented
- [ ] XSS prevention in place
- [ ] Dependencies up to date
- [ ] Security audit passes

## Continuous Integration

### GitHub Actions Workflows

1. **Code Quality CI** (`.github/workflows/ci.yml`)
   - Runs on push/PR
   - Type checking
   - Linting
   - Testing
   - Build verification

2. **Code Review Automation** (`.github/workflows/code-review.yml`)
   - Runs on PR
   - Automated review report
   - Coverage report
   - Quality checks

3. **Performance Monitoring** (`.github/workflows/performance.yml`)
   - Lighthouse audit
   - Bundle size analysis
   - Performance metrics

## Troubleshooting

### Pre-commit Hook Issues

If pre-commit hooks fail:

```bash
# Fix the issue
npm run lint:fix
npm run format

# Try committing again
git commit -m "your message"
```

### Pre-push Hook Issues

If pre-push validation fails:

```bash
# Run validation locally
npm run validate

# Fix any issues
# Try pushing again
```

### Husky Not Working

```bash
# Reinstall Husky
rm -rf .husky
npx husky init
```

## Getting Help

- Review [CONTRIBUTING.md](CONTRIBUTING.md)
- Check [CODE_REVIEW.md](CODE_REVIEW.md)
- Create an issue on GitHub
- Ask in project discussions

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Testing Library Docs](https://testing-library.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

Last Updated: 2025-11-12

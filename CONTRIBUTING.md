# Contributing to Cosmic Player

Thank you for your interest in contributing to Cosmic Player! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Standards](#code-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Code Review](#code-review)

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/Cosmic-Player.git`
3. Add upstream remote: `git remote add upstream https://github.com/lavish112000/Cosmic-Player.git`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## Development Setup

### Prerequisites

- Node.js 20.x or higher
- npm 9.x or higher
- Git

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run linting
npm run lint

# Run type checking
npm run typecheck

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### VS Code Setup

We recommend using VS Code with the following extensions (see `.vscode/extensions.json`):

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- Error Lens
- GitLens
- Better Comments

## Code Standards

### TypeScript

- Always use TypeScript for new files
- Use strict type checking
- Avoid `any` type - use `unknown` or proper types
- Define interfaces for component props
- Export types/interfaces that might be reused

Example:

```typescript
interface VideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  onEnded?: () => void;
}

export function VideoPlayer({
  src,
  autoPlay = false,
  onEnded,
}: VideoPlayerProps) {
  // Component implementation
}
```

### React Components

- Use functional components with hooks
- Use PascalCase for component names
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop destructuring

### Styling

- Use Tailwind CSS utility classes
- Follow the existing design system
- Ensure responsive design (mobile-first)
- Maintain dark mode compatibility

### File Organization

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   └── ...          # Feature-specific components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── contexts/        # React contexts
└── types/           # TypeScript type definitions
```

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```bash
feat(player): add fullscreen mode support

Add fullscreen API integration for video player
component with proper keyboard shortcuts.

Closes #123
```

```bash
fix(playlist): resolve infinite loop in shuffle mode

The shuffle algorithm was causing infinite loop when
playlist had less than 3 items.

Fixes #456
```

## Pull Request Process

### Before Submitting

1. Ensure all tests pass: `npm test`
2. Run linting: `npm run lint`
3. Run type checking: `npm run typecheck`
4. Update documentation if needed
5. Add/update tests for your changes

### PR Title Format

Follow the same format as commit messages:

```
feat(scope): description
```

### PR Description Template

```markdown
## Description

Brief description of the changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

Describe how you tested your changes

## Checklist

- [ ] My code follows the code standards
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass locally
- [ ] I have reviewed the CODE_REVIEW.md checklist

## Screenshots (if applicable)

Add screenshots to help explain your changes

## Related Issues

Closes #(issue number)
```

### Review Process

1. Submit your PR with a clear description
2. Automated checks will run (CI/CD pipeline)
3. Address any failing automated checks
4. Wait for code review from maintainers
5. Address review feedback
6. Get approval from at least one maintainer
7. Squash and merge (maintainers will handle this)

## Testing

### Writing Tests

- Write tests for all new features
- Maintain minimum 70% code coverage
- Test edge cases and error scenarios
- Use descriptive test names

Example:

```typescript
describe('VideoPlayer', () => {
  it('should play video when play button is clicked', () => {
    // Test implementation
  });

  it('should handle missing video source gracefully', () => {
    // Test implementation
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test VideoPlayer.test.tsx
```

## Code Review

All submissions require code review before merging. Please review [CODE_REVIEW.md](./CODE_REVIEW.md) for our comprehensive code review checklist.

### As a Reviewer

- Be respectful and constructive
- Explain the reasoning behind suggestions
- Distinguish between required changes and suggestions
- Use severity labels (🔴 Blocker, 🟡 Major, 🟢 Minor, 💡 Suggestion)

### As an Author

- Be open to feedback
- Ask questions if feedback is unclear
- Make requested changes promptly
- Update tests if implementation changes

## Questions?

If you have questions, please:

1. Check existing documentation
2. Search through existing issues
3. Create a new issue with the `question` label

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Thank You!

Your contributions make Cosmic Player better for everyone! 🎉

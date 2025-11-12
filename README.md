# Cosmic Player 🚀

A high-performance 4K video player built with Next.js 15, React 18, and TypeScript.

[![CI Status](https://github.com/lavish112000/Cosmic-Player/workflows/Code%20Quality%20CI/badge.svg)](https://github.com/lavish112000/Cosmic-Player/actions)
[![Code Review](https://github.com/lavish112000/Cosmic-Player/workflows/Code%20Review%20Automation/badge.svg)](https://github.com/lavish112000/Cosmic-Player/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.3-black.svg)](https://nextjs.org/)

## ✨ Features

- 🎬 4K video playback support
- 🎨 Modern, responsive UI built with Tailwind CSS
- ⚡ Optimized performance with Next.js 15
- 🔒 Type-safe with TypeScript
- 🧪 Comprehensive testing with Jest
- 📱 Mobile-friendly design
- 🌙 Dark mode support

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 9.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/lavish112000/Cosmic-Player.git

# Navigate to the project directory
cd Cosmic-Player

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) to see the application.

## 📝 Available Scripts

| Command                  | Description                           |
| ------------------------ | ------------------------------------- |
| `npm run dev`            | Start development server on port 9002 |
| `npm run build`          | Build production-ready application    |
| `npm start`              | Start production server               |
| `npm run lint`           | Run ESLint to check code quality      |
| `npm run lint:fix`       | Automatically fix ESLint issues       |
| `npm run format`         | Format code with Prettier             |
| `npm run format:check`   | Check code formatting                 |
| `npm run typecheck`      | Run TypeScript type checking          |
| `npm test`               | Run test suite                        |
| `npm run test:watch`     | Run tests in watch mode               |
| `npm run test:coverage`  | Generate test coverage report         |
| `npm run validate`       | Run all quality checks                |
| `npm run security:audit` | Run security audit                    |

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **UI Library**: [React 18](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/react)
- **Code Quality**: ESLint, Prettier
- **Pre-commit Hooks**: Husky, lint-staged

## 🏗️ Project Structure

```
Cosmic-Player/
├── .github/
│   └── workflows/          # CI/CD pipelines
├── .husky/                 # Git hooks
├── .vscode/                # VS Code settings
├── src/
│   ├── app/               # Next.js app router pages
│   ├── components/        # React components
│   │   └── ui/           # Reusable UI components
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── __tests__/        # Test files
├── CODE_REVIEW.md        # Code review checklist
├── CONTRIBUTING.md       # Contributing guidelines
├── SECURITY.md          # Security policy
└── package.json         # Project dependencies
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- Development setup
- Code standards
- Commit guidelines
- Pull request process
- Testing requirements

### Code Review Process

All pull requests must pass our [10-point code review checklist](CODE_REVIEW.md):

1. ✅ Code Quality & Standards
2. ✅ TypeScript Compliance
3. ✅ Performance
4. ✅ Security
5. ✅ Testing
6. ✅ Accessibility
7. ✅ Documentation
8. ✅ Code Structure
9. ✅ Git Practices
10. ✅ Build & Deployment

### Quality Gates

Every PR must pass:

- ✅ TypeScript type checking
- ✅ ESLint validation
- ✅ Prettier formatting
- ✅ Unit tests (70%+ coverage)
- ✅ Security audit
- ✅ Build verification

## 🔒 Security

Please review our [Security Policy](SECURITY.md) for information on reporting vulnerabilities and security best practices.

## 📊 CI/CD Pipeline

Our automated pipeline includes:

- **Code Quality Checks**: Linting, type checking, formatting
- **Testing**: Unit tests with coverage reporting
- **Security Scanning**: Dependency vulnerabilities, code analysis
- **Build Verification**: Production build testing
- **Automated Reviews**: PR analysis and feedback

## 🎨 VS Code Setup

We recommend using VS Code with our workspace settings. Install recommended extensions:

1. ESLint
2. Prettier
3. TypeScript and JavaScript Language Features
4. Tailwind CSS IntelliSense
5. Error Lens
6. GitLens

The workspace will automatically configure formatting and linting on save.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

Built with ❤️ using modern web technologies.

---

For questions or support, please open an issue on GitHub.

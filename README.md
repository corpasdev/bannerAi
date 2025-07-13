# Flashes - Scalable React Application

A modern, scalable React application built with Vite, TypeScript, Tailwind CSS, and Firebase. This project follows best practices for enterprise-level development with proper testing, CI/CD, and multi-environment support.

## 🚀 Tech Stack

### Frontend
- **React 19** - Latest React with improved performance and features
- **TypeScript** - Type-safe JavaScript with enhanced developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS v4** - Modern utility-first CSS framework
- **Sass** - Enhanced CSS with variables, mixins, and nesting
- **Shadcn/UI** - Modern UI components with accessibility built-in

### Backend Services
- **Firebase Auth** - User authentication and authorization
- **Firestore** - NoSQL document database
- **Firebase Storage** - File storage and management
- **Firebase Hosting** - Static site hosting

### Development Tools
- **ESLint** - Code linting and quality enforcement
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **React Testing Library** - Component testing utilities
- **GitHub Actions** - CI/CD pipeline

## 📁 Project Structure

```
flashes/
├── .github/
│   └── workflows/
│       └── ci.yml                 # CI/CD pipeline
├── public/
├── src/
│   ├── features/                  # Feature-based modules
│   │   ├── init.ts               # Firebase initialization
│   │   ├── auth.ts               # Authentication service
│   │   ├── db.ts                 # Firestore database service
│   │   └── storage.ts            # Storage service
│   ├── lib/                      # Utility functions
│   ├── ui/                       # Reusable UI components
│   ├── styles/                   # Global styles and variables
│   │   ├── global.scss           # Global styles with Tailwind
│   │   ├── variables.scss        # Sass variables
│   │   └── mixins.scss           # Sass mixins
│   ├── test/                     # Test utilities
│   │   ├── setupTests.ts         # Jest setup
│   │   └── utils.tsx             # Test utilities
│   ├── App.tsx                   # Main application component
│   └── main.tsx                  # Application entry point
├── babel.config.js               # Babel configuration
├── jest.config.js                # Jest configuration
├── components.json               # Shadcn/UI configuration
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite configuration
└── README.md                     # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18.x or 20.x
- npm (comes with Node.js)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd flashes
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Setup

#### Create Firebase Projects
Create three Firebase projects for different environments:
- `flashes-dev` (Development)
- `flashes-staging` (Staging)
- `flashes-prod` (Production)

#### Configure Environment Variables
Create environment files for each environment:

**`.env.development.local`** (Development)
```env
VITE_FIREBASE_API_KEY_DEV=your-api-key-dev
VITE_FIREBASE_AUTH_DOMAIN_DEV=flashes-dev.firebaseapp.com
VITE_FIREBASE_PROJECT_ID_DEV=flashes-dev
VITE_FIREBASE_STORAGE_BUCKET_DEV=flashes-dev.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID_DEV=your-sender-id-dev
VITE_FIREBASE_APP_ID_DEV=your-app-id-dev
VITE_FIREBASE_MEASUREMENT_ID_DEV=G-MEASUREMENT-ID-DEV
```

**`.env.staging.local`** (Staging)
```env
VITE_FIREBASE_API_KEY_STAGING=your-api-key-staging
VITE_FIREBASE_AUTH_DOMAIN_STAGING=flashes-staging.firebaseapp.com
VITE_FIREBASE_PROJECT_ID_STAGING=flashes-staging
VITE_FIREBASE_STORAGE_BUCKET_STAGING=flashes-staging.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID_STAGING=your-sender-id-staging
VITE_FIREBASE_APP_ID_STAGING=your-app-id-staging
VITE_FIREBASE_MEASUREMENT_ID_STAGING=G-MEASUREMENT-ID-STAGING
```

**`.env.production.local`** (Production)
```env
VITE_FIREBASE_API_KEY_PROD=your-api-key-prod
VITE_FIREBASE_AUTH_DOMAIN_PROD=flashes-prod.firebaseapp.com
VITE_FIREBASE_PROJECT_ID_PROD=flashes-prod
VITE_FIREBASE_STORAGE_BUCKET_PROD=flashes-prod.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID_PROD=your-sender-id-prod
VITE_FIREBASE_APP_ID_PROD=your-app-id-prod
VITE_FIREBASE_MEASUREMENT_ID_PROD=G-MEASUREMENT-ID-PROD
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔧 Development Workflow

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:staging` | Build for staging environment |
| `npm run build:production` | Build for production environment |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run type-check` | Run TypeScript type checking |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:ci` | Run tests with coverage for CI |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run preview` | Preview production build |

### Code Quality
- **ESLint**: Configured with TypeScript and React rules
- **Prettier**: Automatic code formatting
- **TypeScript**: Strict type checking enabled
- **Pre-commit hooks**: Automatic linting and formatting (recommended)

### Testing Strategy
- **Unit Tests**: Jest + React Testing Library
- **Component Tests**: Test individual components
- **Integration Tests**: Test feature workflows
- **Coverage**: Aim for >80% coverage

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI
npm run test:ci
```

### Test Structure
- Tests are located in `__tests__` folders within each feature
- Test utilities are in `src/test/`
- Mock data and helpers are provided in `src/test/utils.tsx`

### Writing Tests
```typescript
import { render, screen } from '@/test/utils';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
```

## 🏗️ Build and Deployment

### Local Build
```bash
# Development build
npm run build

# Staging build
npm run build:staging

# Production build
npm run build:production
```

### CI/CD Pipeline
The project uses GitHub Actions for automated testing and deployment:

1. **Pull Request**: Runs tests, linting, and type checking
2. **Staging**: Deploys to staging environment on `develop` branch
3. **Production**: Deploys to production environment on `main` branch

### Deployment Environments
- **Development**: Local development server
- **Staging**: Firebase Hosting staging channel
- **Production**: Firebase Hosting live channel

## 🔒 Security

### Environment Variables
- All sensitive data is stored in environment variables
- Different configurations for each environment
- Secrets are managed through GitHub Secrets

### Security Measures
- Firebase Security Rules configured for each environment
- Regular dependency audits via `npm audit`
- Automated security scanning in CI/CD pipeline

## 📖 Architecture Decisions

### Feature-Based Architecture
- Code is organized by features, not by file type
- Each feature contains its own components, hooks, and tests
- Promotes maintainability and scalability

### State Management
- React's built-in state management (useState, useReducer)
- Context API for global state when needed
- Custom hooks for complex state logic

### Styling Strategy
- Tailwind CSS for utility-first styling
- Sass for complex styles and variables
- CSS Modules for component-specific styles
- `@apply` directive for reusable utility combinations

## 🤝 Contributing

### Development Process
1. Create a feature branch from `develop`
2. Make your changes following the coding standards
3. Write tests for new functionality
4. Run linting and tests locally
5. Create a pull request to `develop`
6. After review, merge to `develop` for staging deployment
7. Create a pull request from `develop` to `main` for production

### Coding Standards
- Follow TypeScript best practices
- Use meaningful variable and function names
- Write comprehensive tests
- Document complex logic with comments
- Follow the existing code style

## 🆘 Troubleshooting

### Common Issues

#### Firebase Configuration
- Ensure all environment variables are correctly set
- Verify Firebase project permissions
- Check Firebase Security Rules

#### Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check TypeScript errors: `npm run type-check`

#### Test Issues
- Clear Jest cache: `npx jest --clearCache`
- Check test configuration in `jest.config.js`
- Ensure all mocks are properly configured

### Getting Help
- Check the [Issues](../../issues) section
- Review the [Wiki](../../wiki) for detailed guides
- Contact the development team

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

### Phase 1: Foundation ✅
- [x] Project setup with Vite + TypeScript
- [x] Tailwind CSS v4 integration
- [x] Firebase multi-environment setup
- [x] Testing infrastructure
- [x] CI/CD pipeline

### Phase 2: Core Features (In Progress)
- [ ] User authentication system
- [ ] User profile management
- [ ] Dashboard implementation
- [ ] Real-time notifications

### Phase 3: Advanced Features (Planned)
- [ ] Advanced search and filtering
- [ ] File upload and management
- [ ] Analytics and reporting
- [ ] Mobile responsive design

### Phase 4: Optimization (Future)
- [ ] Performance optimization
- [ ] SEO improvements
- [ ] PWA features
- [ ] Advanced caching strategies

---

**Happy coding! 🚀**

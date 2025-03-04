# CLAUDE.md - Log-Log Project Guidelines

## Build/Deploy Commands
- `cd functions && npm run serve` - Start Firebase emulator locally
- `cd functions && npm run deploy` - Deploy Firebase functions
- `firebase deploy` - Deploy entire project to Firebase
- `cd functions && npm test` - Run tests (if implemented)

## Code Style Guidelines

### JavaScript
- Use `var` for global variables, `const` for unchanging values
- Prefer ES6 arrow functions for callbacks
- Use template literals for string interpolation `${variable}`
- Use camelCase for variable/function names
- Space after keywords like `if`, `for`, `function`
- Use JSDoc-style comments for function documentation

### CSS
- Use CSS variables for color themes (defined in `:root`)
- Follow BEM-like naming convention for components
- Use responsive design with `@media` queries

### Error Handling
- Use try/catch blocks for API calls and async operations
- Include descriptive error messages in catch blocks
- Log errors to console before displaying to user

### Firebase/Data
- Store timestamps in ISO format (YYYY-MM-DDTHH)
- Use Firebase transactions for atomic operations
- Ensure proper CORS handling for Firebase functions
# Web app template

Templates base structure for a web app project, including packages required, config files and folder structure.

## Packages
1. NPM: Includes a `package.json` file along with NPM and required packages.
2. Webpack: Includes webpack and webpack config files for both `dev` and `production` environments with support for standard file types.
3. ESLint: Installs ESLint and a `eslint.config.mjs` file with some typical settings.
4. Jest: Install Jest and a `jest.config.js` template file
5. Babel: Installs Babel and a `babel.config.js` file for compatibility of ES6 imports in Jest.

## Directory structure
The directory follows a standard webpack project structure with `dist` to be filled dynamically by webpack.
```
Project/
├── All config files
├── .gitignore
├── README.md
├── dist/
|   ├── .gitkeep
└── src/
    ├── index.js
    ├── index.html
    ├── static/
    │   └── styles.css
    ├── components/
    │   └── component.js
    ├── assets/
    │   └── .gitkeep
    └── tests/
        └── .gitkeep
```

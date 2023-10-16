module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  collectCoverage: true, // Activa la cobertura de código
  collectCoverageFrom: [
    "src/**/*.ts", // Rutas de los archivos a considerar en la cobertura
  ],
  coverageDirectory: "coverage", // Directorio donde se generará el reporte de cobertura
};
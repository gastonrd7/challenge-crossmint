import { logInConsole } from '../logs'; // Reemplaza 'yourModule' con la ruta correcta a tu módulo
import { IdataToLog } from '../../interfaces/Ilog'; // Reemplaza 'yourInterfaces' con la ruta correcta a tus interfaces

// Simulamos la salida de la consola para capturar los mensajes
let consoleOutput: string[] = [];
const originalConsoleError = console.error;
const originalConsoleLog = console.log;

beforeEach(() => {
  console.error = (...args: any[]) => {
    consoleOutput.push(args.join(' '));
  };

  console.log = (...args: any[]) => {
    consoleOutput.push(args.join(' '));
  };
});

afterEach(() => {
  consoleOutput = [];
  console.error = originalConsoleError;
  console.log = originalConsoleLog;
});

describe('logInConsole', () => {
  it('should log an error for status 400', () => {
    const dataToLog: IdataToLog = {
      row: '1',
      column: '2',
      objectToCreate: 'SomeObject',
      status: 400,
      errorMessage: 'Error message',
    };

    logInConsole(dataToLog);

    expect(consoleOutput).toContain(
      `Error for row 1, column 2 creating SomeObject Error message`
    );
  });

  it('should log a retry message for status 429', () => {
    const dataToLog: IdataToLog = {
      row: '3',
      column: '4',
      objectToCreate: 'AnotherObject',
      status: 429,
    };

    logInConsole(dataToLog);

    expect(consoleOutput).toContain(`Too Many Requests. Retrying in 5 seconds...`);
  });

  it('should log an error for status 500', () => {
    const dataToLog: IdataToLog = {
      row: '5',
      column: '6',
      objectToCreate: 'YetAnotherObject',
      status: 500,
      errorMessage: 'Another error message',
    };

    logInConsole(dataToLog);

    expect(consoleOutput).toContain(
      `Error for row 5, column 6 creating YetAnotherObject Another error message`
    );
  });

  it('should log a success message for status 200', () => {
    const dataToLog: IdataToLog = {
      row: '7',
      column: '8',
      objectToCreate: 'SuccessfulObject',
      status: 200,
    };

    logInConsole(dataToLog);

    expect(consoleOutput).toContain(
      `Request for row 7, column 8 to create SuccessfulObject was successful.`
    );
  });

  it('should log a success message for status 201', () => {
    const dataToLog: IdataToLog = {
      row: '9',
      column: '10',
      objectToCreate: 'AnotherSuccessfulObject',
      status: 201,
    };

    logInConsole(dataToLog);

    expect(consoleOutput).toContain(
      `Request for row 9, column 10 to create AnotherSuccessfulObject was successful.`
    );
  });
});

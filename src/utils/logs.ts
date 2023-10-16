import { IdataToLog } from "../interfaces/Ilog";

export const logInConsole = (dataToLog: IdataToLog) => {
  switch (dataToLog.status) {
    case 400:
      console.error(`Error for row ${dataToLog.row}, column ${dataToLog.column} creating ${dataToLog.objectToCreate}`, dataToLog.errorMessage);
      break;
    case 429:
      console.log(`Too Many Requests. Retrying in 5 seconds...`);
      break;
    case 500:
      console.error(`Error for row ${dataToLog.row}, column ${dataToLog.column} creating ${dataToLog.objectToCreate}`, dataToLog.errorMessage);
      break;
    case 200:
      console.log(`Request for row ${dataToLog.row}, column ${dataToLog.column} to create ${dataToLog.objectToCreate} was successful.`);
    case 201:
      console.log(`Request for row ${dataToLog.row}, column ${dataToLog.column} to create ${dataToLog.objectToCreate} was successful.`);
      break;
  }
}

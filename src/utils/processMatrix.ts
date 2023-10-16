import { createObjectInTheUniverse } from '../api/createObjectInTheUniverseApi';
import { IRequestData } from '../interfaces/IRequest';
import { Imatrix } from '../interfaces/Ibase';
import { IdataToLog } from '../interfaces/Ilog';
import { logInConsole } from './logs';

const makeRequestWithRetry = async (
  apiFunction: Function,
  data: IRequestData,
  retries: number,
  log: IdataToLog,
  endPoint: string,
) => {
  try {
    const response = await apiFunction(data, endPoint);
    logInConsole({...log, status: response.status});
  } catch (error: any) {
    if (error.response && error.response.status === 429 && retries > 0) {
      logInConsole({...log, status: error.response.status, errorMessage: error.response.data.message});
      await new Promise(resolve => setTimeout(resolve, 5000));
      makeRequestWithRetry(apiFunction, data, retries - 1, log, endPoint);
    } else {
      logInConsole({...log, objectToCreate: "POLYANET", status: error.response.status, errorMessage: error.response.data.message});
    }
  }
};

export async function handleCellValue(cellValue: string, requestData: IRequestData, log: IdataToLog, maxRetries: number) {
  switch (cellValue) {
    case 'POLYANET':
      return await makeRequestWithRetry(createObjectInTheUniverse, requestData, maxRetries, { ...log, objectToCreate: "POLYANET" }, "polyanets");
    case 'WHITE_SOLOON':
    case 'BLUE_SOLOON':
    case 'PURPLE_SOLOON':
    case 'RED_SOLOON':
      const color = cellValue.split('_')[0].toLowerCase();
      return await makeRequestWithRetry(createObjectInTheUniverse, { ...requestData, color }, maxRetries, { ...log, objectToCreate: "SOLOON" }, "soloons");
    case 'UP_COMETH':
    case 'DOWN_COMETH':
    case 'LEFT_COMETH':
    case 'RIGHT_COMETH':
      const direction = cellValue.split('_')[0].toLowerCase();
      return await makeRequestWithRetry(createObjectInTheUniverse, { ...requestData, direction }, maxRetries, { ...log, objectToCreate: "COMETH" }, "comeths");
  }
}

// matrixUtils.ts


export async function processMatrix(
  matrix: Imatrix,
  candidateId: string,
  MAX_RETRIES: number
) {
  for (let row = 0; row < matrix.goal.length; row++) {
    for (let col = 0; col < matrix.goal[row].length; col++) {
      const cellValue = matrix.goal[row][col];
      const requestData: IRequestData = {
        row: row.toString(),
        column: col.toString(),
        candidateId: candidateId,
      };

      let log: IdataToLog = {
        column: col.toString(),
        row: row.toString(),
        objectToCreate: "",
        status: -1,
      };

      await handleCellValue(cellValue, requestData, log, MAX_RETRIES);
    }
  }
}

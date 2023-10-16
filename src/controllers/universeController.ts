import { Request, Response } from 'express';
import { fetchMatrix } from '../api/goalApi';
import { processMatrix } from '../utils/processMatrix';
import { Imatrix } from '../interfaces/Ibase';

const MAX_RETRIES = 3;


export const createNewConstellation = async (req: Request, res: Response): Promise<void> => {
  try {
    const matrix: Imatrix = await fetchMatrix(req.body.candidateId);
    await processMatrix(matrix, req.body.candidateId, MAX_RETRIES);
  } catch {
    res.status(500).json({ error: 'Error getting target matrix' });
  }
  res.status(201).json({ message: 'All cells were processed, see the log to know the status of each one.' });
};

import csv from 'csvtojson';
import fs from 'fs';
import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';

interface Request {
  csvFilename: string;
}

interface CSV {
  title: string;
  type: 'income' | 'outcome';
  value: string;
  category: string;
}

class ImportTransactionsService {
  private transactions: Transaction[] = [];

  async execute({ csvFilename }: Request): Promise<Transaction[]> {
    const createTransactionService = new CreateTransactionService();
    const csvFile = await csv().fromFile(csvFilename);

    for (let x = 0; x < csvFile.length; x += 1) {
      const { title, type, value, category }: CSV = csvFile[x];
      await createTransactionService.execute({
        title,
        category,
        value: parseInt(value, 0),
        type,
      });
      this.transactions.push(csvFile[x]);
    }

    await fs.promises.unlink(csvFilename);

    return this.transactions;
  }
}

export default ImportTransactionsService;

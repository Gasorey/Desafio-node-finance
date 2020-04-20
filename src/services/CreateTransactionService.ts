import { getCustomRepository } from 'typeorm';
import CreateCategoryService from './CreateCategoryService';
import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

interface Balance {
  total: number;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionRepository);

    const createCategory = new CreateCategoryService();

    const getCategory = await createCategory.execute({ category });

    const transaction = transactionRepository.create({
      title,
      type,
      value,
      category_id: getCategory.id,
    });

    const balance = transactionRepository.getBalance();

    if (type === 'outcome' && value > (await balance).total) {
      throw new AppError(
        'You can not make an outcome higher than you balance',
        400,
      );
    }
    await transactionRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;

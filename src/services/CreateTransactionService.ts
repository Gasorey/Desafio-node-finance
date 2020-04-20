import { getCustomRepository } from 'typeorm';
import CreateCategoryService from './CreateCategoryService';
import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
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
    await transactionRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;

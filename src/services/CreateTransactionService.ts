import { getCustomRepository } from 'typeorm';
import CreateCategoryService from './CreateCategoryService';

import TransactionRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: string;
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
      value,
      type,
      category: getCategory.id,
    });
    await transactionRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;

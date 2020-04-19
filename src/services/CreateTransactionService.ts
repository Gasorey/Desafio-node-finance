import { getRepository, getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import AppError from '../errors/AppError';
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

    const categoryRepostory = getRepository(Category);

    const category_id = await categoryRepostory.findOne(category);

    if (!category_id) {
      const newCategory_id = await categoryRepostory.create({
        title: category,
      });
      await categoryRepostory.save(newCategory_id);
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category: Category,
    });
    await transactionRepository.save(transaction);
  }
}

export default CreateTransactionService;

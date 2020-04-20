import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}
class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const transaction = await transactionRepository.findOne({ where: { id } });
    if (!transaction) {
      throw new AppError('this transaction was not found', 401);
    }
    await transactionRepository.delete(transaction.id);
  }
}

export default DeleteTransactionService;

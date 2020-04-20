import { getRepository } from 'typeorm';
import Category from '../models/Category';

interface Request {
  category: string;
}

export default class CreateCategoryService {
  public async execute({ category }: Request): Promise<Category> {
    const categoryRepository = getRepository(Category);
    const getCategory = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!getCategory) {
      const newCategory = categoryRepository.create({ title: category });
      await categoryRepository.save(newCategory);
      return newCategory;
    }
    return getCategory;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/schemas/book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel('Book') private bookModel: Model<Book>) {}
  async bookList() {
    const findBookAvailable = await this.bookModel
      .find({
        stock: { $gt: 0 },
      })
      .select('-stock -__v')
      .exec();

    const result = {
      bookAvailableAtBorrow: findBookAvailable.length,
      bookList: findBookAvailable,
    };
    return result;
  }
}

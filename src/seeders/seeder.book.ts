import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './interfaces/interface.book';
import { BooksService } from './services/service.book';

@Injectable()
export class BooksSeeder {
  constructor(
    private readonly booksService: BooksService,
    @InjectModel('Book') private bookModel: Model<Book>,
  ) {}

  async seedBook() {
    const booksExist = await this.booksService.checkIfBooksExist();
    const books = [
      {
        code: 'JK-45',
        title: 'Harry Potter',
        author: 'J.K Rowling',
        stock: 1,
      },
      {
        code: 'SHR-1',
        title: 'A Study in Scarlet',
        author: 'Arthur Conan Doyle',
        stock: 1,
      },
      {
        code: 'TW-11',
        title: 'Twilight',
        author: 'Stephenie Meyer',
        stock: 1,
      },
      {
        code: 'HOB-83',
        title: 'The Hobbit, or There and Back Again',
        author: 'J.R.R. Tolkien',
        stock: 1,
      },
      {
        code: 'NRN-7',
        title: 'The Lion, the Witch and the Wardrobe',
        author: 'C.S. Lewis',
        stock: 1,
      },
    ];

    if (!booksExist) {
      await this.bookModel.insertMany(books);
    }
  }
}

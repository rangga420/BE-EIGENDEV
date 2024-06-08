import { Controller, Get } from '@nestjs/common';
import { BookService } from '../service/book.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Book')
@Controller('/api')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Get list of books' })
  @ApiResponse({ status: 200, description: 'List of books' })
  @Get('/books')
  async bookList() {
    return this.bookService.bookList();
  }
}

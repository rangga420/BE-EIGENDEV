import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/schemas/book.schema';
import { BookBorrow } from 'src/schemas/bookBorrow.schema';
import { Member } from 'src/schemas/member.schema';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel('Member') private memberModel: Model<Member>,
    @InjectModel('Book') private bookModel: Model<Book>,
    @InjectModel('BookBorrow') private bookBorrowModel: Model<BookBorrow>,
  ) {}

  async memberList(): Promise<Member[]> {
    const members = await this.memberModel.find().exec();
    const findBookBorrow = await Promise.all(
      members.map(async (item: any) => {
        const bookBorrow = await this.bookBorrowModel
          .find({ memberCode: item.code })
          .exec();

        const bookCodes = bookBorrow.map((item: any) => item.bookCode);

        const bookList = await this.bookModel
          .find({
            code: { $in: bookCodes },
          })
          .select('-stock -__v')
          .exec();

        const newData = {
          _id: item._id,
          code: item.code,
          name: item.name,
          bookBarrow: bookList,
        };
        return newData;
      }),
    );

    return findBookBorrow;
  }

  async memberBookBorrow(body: any) {
    const findMember = await this.memberModel.findById(body.memberId).exec();

    if (findMember.penalty) {
      const result = {
        statusCode: 403,
        message: 'Unable to borrow book due to 3-day penalty.',
      };
      throw new HttpException(result, HttpStatus.FORBIDDEN);
    }

    const checkBookAtBorrow = await this.bookBorrowModel
      .find({
        memberCode: findMember.code,
      })
      .exec();

    if (checkBookAtBorrow.length >= 2) {
      const result = {
        statusCode: 403,
        message:
          'Unable to borrow the book because the borrowing limit has been reached.',
      };
      throw new HttpException(result, HttpStatus.FORBIDDEN);
    }

    const bookAvailable = await this.bookModel
      .findOne({
        _id: body.bookId,
        stock: { $gt: 0 },
      })
      .select('-stock -__v')
      .exec();

    if (!bookAvailable) {
      const result = {
        statusCode: 403,
        message:
          'The borrowed book is not available for borrowing by other members.',
      };
      throw new HttpException(result, HttpStatus.FORBIDDEN);
    }

    const createBookBorrow = this.bookBorrowModel.create({
      memberCode: findMember.code,
      bookCode: bookAvailable.code,
      loadDate: body.loadDate,
    });

    const updateStockBook = await this.bookModel.updateOne(
      { _id: body.bookId },
      { $inc: { stock: -1 } },
    );

    const result = {
      statusCode: 201,
      bookBorrow: [bookAvailable],
      message: 'Borrowing the book was successful.',
    };
    return result;
  }

  async memberReturnBook(body: any) {
    const findMember = await this.memberModel
      .findOne({ _id: body.memberId })
      .select('-__v')
      .exec();

    const findBook = await this.bookModel
      .findOne({ _id: body.bookId })
      .select('-stock -__v');

    const checkListBookBorrow = await this.bookBorrowModel.findOne({
      memberCode: findMember.code,
      bookCode: findBook.code,
    });

    if (!checkListBookBorrow) {
      const result = {
        statusCode: 403,
        message: 'The returned book does not belong to the member.',
      };
      throw new HttpException(result, HttpStatus.FORBIDDEN);
    }

    const returnDate = new Date(body.loadDate);
    const penaltyThresholdDate = new Date(checkListBookBorrow.loadDate);
    const timeDifference =
      returnDate.getTime() - penaltyThresholdDate.getTime();
    const differenceInDays = Math.floor(timeDifference / (1000 * 3600 * 24));
    if (differenceInDays > 7) {
      const updatePenalty = await this.memberModel.updateOne(
        { _id: body.memberId },
        { penalty: true },
      );
    }

    const removeBookBorrow = await this.bookBorrowModel.deleteOne({
      bookCode: findBook.code,
    });

    const updateStockBook = await this.bookModel.updateOne(
      { _id: body.bookId },
      { stock: 1 },
    );

    const result = {
      statusCode: 200,
      returnBook: [findBook],
      message: 'Book returned successfully.',
    };
    return result;
  }
}

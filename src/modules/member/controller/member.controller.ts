import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { MemberService } from '../service/member.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Members')
@Controller('/api')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @ApiOperation({ summary: 'Get list of members' })
  @Get('/members')
  @ApiResponse({ status: 200, description: 'List of members', type: 'Member' })
  async memberList() {
    const members = await this.memberService.memberList();
    return members;
  }

  @ApiOperation({ summary: 'Borrow a book' })
  @ApiBody({ description: 'Optional description of the request body' })
  @Post('/members/books/borrow')
  async memberBookBorrow(@Body() requestsBody: any) {
    console.log(requestsBody);
    try {
      return await this.memberService.memberBookBorrow(requestsBody);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiOperation({ summary: 'Return a book' })
  @ApiBody({ description: 'Optional description of the request body' })
  @HttpCode(200)
  @Post('/members/return-book')
  async memberReturnBook(@Body() requestBody: any) {
    try {
      return await this.memberService.memberReturnBook(requestBody);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}

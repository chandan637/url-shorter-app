import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateLinkDto } from 'src/dto/create-Link.dto';
import { LinksService } from './links.service';
const shortid = require('shortid');

@Controller()
export class LinksController {
  constructor(private linkService: LinksService) {}
  @Get(':urlHash')
  async findOne(@Param() params, @Res() res: Response) {
    console.log(params.urlHash);
    const link = await this.linkService.findByUrlHash(params.urlHash);
    if (!link) {
      return res.status(HttpStatus.NOT_FOUND);
    }
    res.setHeader('Location', link.url);
    return res.status(HttpStatus.FOUND).send();
  }

  @Post('/links')
  async create(@Body() createLinkDto: CreateLinkDto, @Req() req: Request) {
    let authToken = req.headers.authorization;

    if (!authToken) {
      return 'Invalid request';
    }
    //get the whitable host from the bearer token;
    let whiteLabelUrl = authToken.replace('Bearer ', '').split(':')[0];

    const url = createLinkDto.url;
    const urlHash = shortid.generate();

    const shortUrl = `http://${whiteLabelUrl}/${urlHash}`;
    const linkDto = { url, urlHash, shortUrl }; // we can create a mapper to generate dto as well

    await this.linkService.create(linkDto);
    return linkDto;
  }
}

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Link, LinkDocument } from '../schemas/link.schema';
import { CreateLinkDto } from '../dto/create-Link.dto';

@Injectable()
export class LinksService {
  constructor(@InjectModel('Link') private LinkModel: Model<LinkDocument>) {}

  async create(createLinkDto: CreateLinkDto): Promise<Link> {
    const createdLink = new this.LinkModel(createLinkDto);
    return createdLink.save();
  }

  async findByUrlHash(urlHash): Promise<Link> {
    return this.LinkModel.findOne({ urlHash }).exec();
  }
}

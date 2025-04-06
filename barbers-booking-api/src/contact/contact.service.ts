import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact) private contactRepo: Repository<Contact>,
  ) {}

  create(createContactDto: CreateContactDto) {
    this.contactRepo.save(createContactDto);
  }

  findAll() {
    return this.contactRepo.find();
  }

  findOne(id: number) {
    const findedContact = this.contactRepo.findOneBy({ id });

    if (!findedContact) {
      throw new NotFoundException('User not found');
    }

    return findedContact;
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const contact = await this.contactRepo.findOneBy({ id });

    if (!contact) throw new Error('Schedule not found');

    Object.assign(contact, updateContactDto);

    return this.contactRepo.save(contact);
  }

  async remove(id: number) {
    const contact = await this.contactRepo.findOneBy({ id });

    if (!contact) throw new Error('Schedule not found');

    return this.contactRepo.remove(contact);
  }
}

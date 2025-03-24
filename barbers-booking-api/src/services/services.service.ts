import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dtos/create.service-dto';
import { UpdateServiceDto } from './dtos/update.service-dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const { name, price } = createServiceDto;
    const service = new Service();
    service.name = name;
    service.price = price;

    return this.serviceRepository.save(service);
  }

  async findOne(id: number): Promise<Service> {
    return this.serviceRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const service = await this.serviceRepository.findOneBy({ id });
    if (!service) throw new Error('Service not found');
    Object.assign(service, updateServiceDto);
    return this.serviceRepository.save(service);
  }

  async remove(id: number): Promise<void> {
    await this.serviceRepository.delete(id);
  }
}

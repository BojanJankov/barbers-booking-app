import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dtos/create.service-dto';
import { UpdateServiceDto } from './dtos/update.service-dto';
import { Service } from './entities/service.entity';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    return this.servicesService.create(createServiceDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Service> {
    return this.servicesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.servicesService.remove(id);
  }
}

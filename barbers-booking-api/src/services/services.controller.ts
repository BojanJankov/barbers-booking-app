import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dtos/create.service-dto';
import { UpdateServiceDto } from './dtos/update.service-dto';
import { Service } from './entities/service.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RoleType } from 'src/roles/roles.model';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Service> {
    return this.servicesService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleType.BARBER)
  @Post()
  async create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    console.log('DTO in controller:', createServiceDto);
    return this.servicesService.create(createServiceDto);
  }

  @Roles(RoleType.BARBER)
  @Get('barber/:id')
  async findServicesByBarber(@Param('id') id: number) {
    return this.servicesService.findServicesByBarber(id);
  }

  @Roles(RoleType.BARBER)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Roles(RoleType.BARBER)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.servicesService.remove(id);
  }
}

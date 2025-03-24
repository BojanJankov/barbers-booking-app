import { Test, TestingModule } from '@nestjs/testing';
import { BarbersService } from './barbers.service';

describe('BarbersService', () => {
  let service: BarbersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BarbersService],
    }).compile();

    service = module.get<BarbersService>(BarbersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

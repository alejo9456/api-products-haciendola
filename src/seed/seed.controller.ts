import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @ApiOperation({ summary: 'Execute seed process' })
  @ApiResponse({ status: 200, description: 'Seed process executed successfully' })
  executeSeed() {
    return this.seedService.runSeed();
  }

  
}

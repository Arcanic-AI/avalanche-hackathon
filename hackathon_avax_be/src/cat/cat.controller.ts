import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CatService } from './cat.service';
@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) { }

}


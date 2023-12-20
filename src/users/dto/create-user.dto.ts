import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsArray,
  ArrayMinSize,
  IsIn,
  IsDefined,
} from 'class-validator';
import { groups, roles } from '../utils/data';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @IsIn(roles, { each: true })
  roles: string[];

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @IsIn(groups, { each: true })
  groups: string[];
}

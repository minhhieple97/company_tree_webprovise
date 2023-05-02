import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class GetCompanyDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;
}

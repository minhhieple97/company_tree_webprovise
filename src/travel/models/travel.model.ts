import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Travel {
  @Field()
  id: string;

  @Field()
  createdAt: string;

  @Field()
  employeeName: string;

  @Field()
  departure: string;

  @Field()
  destination: string;

  @Field()
  parentId: string;

  @Field()
  price: string;

  @Field()
  companyId: string;
}

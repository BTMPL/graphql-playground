import { Query, Resolver } from '@nestjs/graphql';
import { FeeBase, Loan } from 'src/graphql';

const loans = [
  {
    id: '1',
    name: 'test 1',
    date: new Date().getTime().toString(),
    documents: [
      {
        id: '1',
      },
    ],
    fee: [
      {
        id: '1',
        type: 'base',
        value: 1,
      } as FeeBase,
      {
        id: '2',
        type: 'array',
        value: [1, 2],
      } as FeeBase,
    ],
  },
];

@Resolver('Loan')
export class LoansResolver {
  @Query()
  async loans(): Promise<Loan[]> {
    return loans;
  }
}

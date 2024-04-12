import { UsePipes } from '@nestjs/common';
import { Query, Resolver, Args } from '@nestjs/graphql';
import { FeeBase, Loan, LoanInput } from 'src/graphql';
import { loanInput, ZodValidationPipe } from './validation';

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
  @UsePipes(new ZodValidationPipe(loanInput))
  async loans(@Args('input') input: LoanInput): Promise<Loan[]> {
    return loans;
  }
}

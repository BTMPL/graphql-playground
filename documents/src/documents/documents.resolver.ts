import { Query, ResolveReference, Resolver } from '@nestjs/graphql';
import { Document } from 'src/graphql';

const documents = [
  {
    id: '1',
    name: 'test 1',
    type: 'documentType',
  },
  {
    id: '2',
    name: 'test 2',
    type: 'other document type',
  },
];

@Resolver('Document')
export class DocumentsResolver {
  @Query()
  async documents(): Promise<Document[]> {
    return documents;
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    console.log('[documents] Resolve reference');
    return documents.find((doc) => doc.id === reference.id);
  }
}

import { BadRequestException, PipeTransform } from '@nestjs/common';
import { z } from 'zod';

export const loanInput = z.object({
  config: z
    .object({
      createdAfter: z.string().min(3).optional(),
    })
    .optional(),
});

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodSchema) {}

  async transform(value: unknown) {
    try {
      const parsedValue = await this.schema.parseAsync(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException(
          'Validation failed: ' +
            error.errors.map((err) => `${err.path}: ${err.message}`).join('; '),
        );
      }
      throw new BadRequestException('INTERNAL_SERVER_ERROR');
    }
  }
}

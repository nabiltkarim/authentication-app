import { BadRequestException, ValidationPipe, ValidationPipeOptions } from '@nestjs/common'
import { ValidationError } from 'class-validator'

export const defaultValidationPipeOptions: Readonly<ValidationPipeOptions> = {
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  validationError: { target: false },
  exceptionFactory: (errors: readonly ValidationError[]): Error => {
    const formattedErrors = errors.map((error) => ({
      property: error.property,
      constraints: error.constraints,
    }))
    return new BadRequestException(formattedErrors)
  },
}

export class RouteValidationPipe extends ValidationPipe {
  constructor(validationPipeOptions: Readonly<ValidationPipeOptions> = defaultValidationPipeOptions) {
    super(validationPipeOptions)
  }
}

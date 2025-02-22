import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class EmailValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}

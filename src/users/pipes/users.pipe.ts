import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../dto/createUser.dto';

@Injectable()
export class UsersClassPipe implements PipeTransform {
  /**
   * use to transform the class properties on runtime
   * @param value 
   * @param metadata 
   * @returns 
   */
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log('inside validator');
    console.log(value);
    console.log(metadata)

    const parseAgeToInt = parseInt(value.age.toString());

    if(isNaN(parseAgeToInt)) {
      console.log(`${value.age} is not a number`);
      throw new HttpException('Invalid data type for property age. Expacted number', HttpStatus.BAD_REQUEST);
    }
    return {...value, age: parseAgeToInt};

    return value;
  }
}

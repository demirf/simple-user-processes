import { BadRequestException } from '@nestjs/common';

export default class ValidationException extends BadRequestException {
  constructor(objectOrError?: string | object | any) {
    super({
      isSuccess: false,
      statusCode: 412,
      result: {},
      validations: objectOrError.reduce((acc, item) => {
        if (item?.children?.length) {
          item.children.forEach((child) => {
            acc.push({
              field: `${child.children[0].property}-${child.property}`,
              code: Object.keys(child.children[0].constraints)[0],
            });
          });
        } else {
          acc.push({
            field: item.property,
            code: Object.keys(item.constraints)[0],
          });
        }

        return acc;
      }, []),
    });
  }
}

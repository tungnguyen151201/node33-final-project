import { IsNotEmpty } from 'class-validator';

export class CreateLocationDto {
  /**
   * @example Long Hai
   */
  @IsNotEmpty()
  locationName: string;

  /**
   * @example Ba Ria, Vung Tau
   */
  @IsNotEmpty()
  province: string;

  /**
   * @example Viet Nam
   */
  @IsNotEmpty()
  country: string;

  image?: string;
}

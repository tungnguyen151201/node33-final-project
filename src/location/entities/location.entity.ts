export class LocationEntity {
  id: number;
  locationName: string;
  province: string;
  country: string;
  image: string;

  constructor(partial: Partial<LocationEntity>) {
    Object.assign(this, partial);
  }
}

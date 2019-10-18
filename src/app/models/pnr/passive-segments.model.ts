export class PassiveSegmentsModel {
  segmentNo: number;
  segmentType: string;
  vendorName: string;
  vendorCode: string;
  confirmationNo: string;
  departureDate: string;
  departureTime: string;
  departureCity = '';
  destinationCity = '';
  arrivalDate: string;
  arrivalTime: string;
  tourName: string;
  noPeople: string;
  noNights: string;
  roomType: string;
  mealPlan: string;
  stateRoom: string;
  cabinNo: string;
  dining: string;
  policyNo: string;
  isNew: boolean;
  isPassive: boolean;
  airlineCode: string;
  flightNumber: string;
  classService: string;
  airlineRecloc: string;
  othersText: string;
  zzdepartureCity: string;
  zzdestinationCity: string;
  zzairlineCode: string;
  lineNo: string;
  status: string;
  passengerNo: string;

  // rail
  trainNumber: string;
  fromStation: string;
  arrivalStation: string;
  carNumber: string;
  seatNumber: string;
  pickupLoc = 'HOME';
  transferTo = 'AIRPORT';
  phone: string;
  rateType: string;
  rate: string;
  taxOnRate: string;
  gratuities: string;
  parking: string;
  toll: string;
  limoCoAgent: string;
  meetDriveAt: string;
  additionalInfo: string;
  cancellationInfo: string;
  includeTax = false;
  includeToll = false;
  includeParking = false;
  includeGratuities = false;

  // car
  carType: string;
  dropOffLoc: string;
  pickupOffAddress = '';
  dropOffAddress = '';
  rentalCost: string;
  currency = 'CAD';
  duration = 'DAILY';
  mileage: 'UNL';
  mileagePer = 'KM';
  dropOffFee: string;
  cdNumber: string;
  idNumber: string;
  frequentFlierNumber: string;
  specialEquipment: string;
  specialRequest: string;
  frequentflightNumber: string;
  rateBooked: string;
  // hotel
  chainCode: string;
  nightlyRate: string;
  numberOfRooms = 1;
  guaranteedLate = 'NO';
  confirmedWith: string;
  hotelCode: string;
  hotelCityName: string;
  hotelName: string;
  fax: string;
  address: string;
  province: string;
  zipCode: string;
  country: string;

  // insurance
  insuranceType: string;
}

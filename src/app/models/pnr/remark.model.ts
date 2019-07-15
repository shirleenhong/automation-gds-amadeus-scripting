export class RemarkModel {
  remarkType: string;
  remarkText: string;
  category: string;
  relatedSegments: string[] = [];
  relatedPassengers: string[];
  lineNo: string;
}

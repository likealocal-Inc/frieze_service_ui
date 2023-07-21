export interface OrderModel {
  id: string;
  created: Date;
  updated: Date;
  userId: string;
  startLng: string;
  startLat: string;
  startAddress: string;
  goalLng: string;
  goalLat: string;
  goalAddress: string;
  priceInfo: string;
  status: string;
  approvalDate: string;
}

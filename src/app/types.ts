export enum Device {
  "mobile" = 1,
  "desktop" = 2,
}

export type Responsive = { width: number; responsive: number };

export enum Result {
  "SUCCESS" = 1,
  "ERROR" = 2,
}

export enum Sex {
  "male" = 1,
  "female" = 2,
}

export type ResultCode = {
  code: string,
  message: string,
}
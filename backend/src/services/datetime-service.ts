export const DATETIME_SERVICE = 'DATETIME_SERVICE';

export interface DatetimeService {
  getCurrentDatetime(): Date;
}
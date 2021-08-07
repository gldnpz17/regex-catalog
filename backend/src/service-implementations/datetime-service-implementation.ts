import { Injectable } from "@nestjs/common";
import { DatetimeService } from "src/services/datetime-service";

@Injectable()
export class DateTimeServiceImplementation implements DatetimeService {
  getCurrentDatetime(): Date {
    return new Date();
  }
}
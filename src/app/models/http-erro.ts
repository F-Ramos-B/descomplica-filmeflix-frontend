import { HttpErrorResponse } from "@angular/common/http";

export default class HttpErrorMensagem<T> extends HttpErrorResponse {
  override error: T
}

export class GeneralErrorResponse extends Error {
  public readonly statusCode: number;
  public readonly apiCode: string;
  public readonly errors?: any[];

  constructor(
    statusCode: number,
    { apiCode, message }: { apiCode: string; message: string },
    errors?: any[],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.apiCode = apiCode;
    this.errors = errors ? errors : [];
  }
}

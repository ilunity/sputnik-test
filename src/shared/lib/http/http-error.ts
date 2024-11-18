export class HttpError extends Error {
  readonly status?: string;

  constructor(message?: string, status?: string) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toString = () => `${this.name}(${this.status}): ${this.message}`;
}

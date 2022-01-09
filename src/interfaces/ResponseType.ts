export default interface ResponseType<P> {
  code: number;
  msg: string;
  data: P;
}

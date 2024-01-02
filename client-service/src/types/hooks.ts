export enum Status {
  Initial,
  Pending,
  Success,
  Failed,
}

export enum Method {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
}

export type AxiosProps = {
  url: string
  method: Method
}

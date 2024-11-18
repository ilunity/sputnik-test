export * from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    authorization?: boolean | undefined;
    request?: GetServerSidePropsContext['req'] | undefined;
  }
}

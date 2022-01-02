import 'styled-components';

export type Message = {
  username: string,
  message: string
};

declare module 'styled-components' {
  export interface DefaultTheme {
    window: {
      color: string,
      borderRadius: string,
      filter: string
    },
    element: {
      borderRadius: string,
      background: {
        normal: string,
        hover: string,
        active: string
      }
    },
    txtClr: string,
    accentClr: string,
    borderColor: string,
    border: string
  }
}

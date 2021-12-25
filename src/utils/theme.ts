import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  window: {
    color: '#10101073',
    borderRadius: '25px',
    filter: 'blur(10px)'
  },
  element: {
    borderRadius: '5px',
    background: {
      normal: '#00c2ff',
      hover: '#10d2ff',
      active: '#00b2ef'
    }
  },
  txtClr: '#fff',
  accentClr: '#00c2ff',
  borderColor: '#ffffff19',
  get border() {
    return `1px solid ${this.borderColor}`;
  }
};

export default theme;

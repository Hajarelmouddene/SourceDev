import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *,
  *:before,
  *:after {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
  }

  html, body, div,
  input, button, select, option,
  h1, h2, h3, h4, h5, h6, p,
  text {
      font-family: sans-serif;
  }

  html, body {
      font-family: sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.15rem;
    font-weight: 700;
  }

  h1 {
  font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  body {
    line-height: 1.5;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }

  button {
  background: transparent;
  border: none;
  cursor: pointer;
  max-width: fit-content;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.05rem;
  }

  ::placeholder {
    font-size: 1rem;
    font-family: 'Open Sans', sans-serif;
    color: ${({ theme }) => theme.placeholderTextColor};

  }

  input[type="date"]:before {
    content: attr(placeholder) ":" !important;
    color: ${({ theme }) => theme.placeholderTextColor};
    margin-right: 0.5em;
  }

  input[type="date"] {
    color: ${({ theme }) => theme.placeholderTextColor};
    font-size: 1rem;
  }

  input[type="date"]:focus:before,
  input[type="date"]:valid:before {
    content: "";
  }

  select {
  width: 30%;
  padding: 16px 20px;
  border: none;
  margin: 2.1rem 0rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inputBackground}
}

textarea {
  background-color: ${({ theme }) => theme.inputBackground};
  border: none;
  height: 8rem;
  width: 30%;
}

  /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      vertical-align: baseline;
  }


  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }


  ol, ul {
      list-style: none;
  }

  blockquote, q {
      quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }

p,
a,
li,
blockquote,
input {
  font-family: 'Open Sans', sans-serif;
}

`;

export default GlobalStyles;

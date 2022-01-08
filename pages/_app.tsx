import { createGlobalStyle, defaultTheme, Preflight } from "@xstyled/emotion";
import { AnolisProvider, buttonTheme, createTheme, defaultTheme as anolisTheme, Typography, typographyTheme } from "anolis-ui";
import { AppProps } from "next/app";
import { FC } from "react";

const xstyledTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    ...anolisTheme.colors,
    "zadruha-50": "#ffe5e5",
    "zadruha-100": "#f9bbbb",
    "zadruha-200": "#ef9191",
    "zadruha-300": "#e76565",
    "zadruha-400": "#dd3333",
    "zadruha-500": "#c52121",
    "zadruha-600": "#9a1718",
    "zadruha-700": "#6e0f11",
    "zadruha-800": "#450708",
    "zadruha-900": "#1e0000"
  }
};

const theme = createTheme({
  ...buttonTheme({
    baseStyle: {
      bg: "zadruha-700"
    },
    variants: {
      solid: {
        bg: { _: "zadruha-700", hover: "zadruha-800" },
        borderRadius: 1,
        color: { _: "white", hover: "white" }
      }
    }
  }),
  ...typographyTheme({
    baseStyle: {
      p: {
        fontFamily: "'Lora', serif;"
      },
      h1: {
        fontFamily: "'Lora', serif;"
      },
      h2: {
        fontFamily: "'Lora', serif;"
      },
      h3: {
        fontFamily: "'Lora', serif;"
      }
    }
  })
});

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AnolisProvider xstyledTheme={xstyledTheme} theme={theme}>
      <Preflight />
      <GlobalStyle />
      <Typography topLevel>
        <Component {...pageProps} />
      </Typography>
    </AnolisProvider>
  );
};

export default MyApp;

const GlobalStyle = createGlobalStyle`
  a {
    color: zadruha-600;
    transition: 200ms color;
  }

  a:hover {
    color: zadruha-900;
  }

  body {
    background: black;
  }

  body h1, body h2, body h3, body h4, body p {
    font-family: 'Lora',serif !important;
  }
`;

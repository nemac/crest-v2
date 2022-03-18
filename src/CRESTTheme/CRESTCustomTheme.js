import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

/*
custom MUI theme for CREST based on components and colors defined in the figma
design document https://www.figma.com/file/TCrt1Fgs9CnKeQH1NLB4aQ/CREST---Color?node-id=0%3A1
*/



const CustomTheme = createTheme({
  palette: {
    mode: 'dark',
    text: {
      primary: '#ffffff',
      CRESTLightText: '#ffffff',
      CRESTMedText: '#F8F9FA',
      CRESTDarkText: '#000000',
    },
    background: {
      default: '#323232',
      paper: '#0a0a0a',
      contrastText: '#fff'
    },
    CRESTGridBackground: {
      main: '#323232',
      dark: '#0a0a0a',
      light: '#5b5b5b',
      contrastText: '#fff'
    },
    CRESTCta: {
      main: '#17A2B8',
      dark: '#007388',
      light: '#60d4ea',
      contrastText: '#fff'
    },
    CRESTPrimary: {
      main: '#F8F9FA',
      dark: '#c5c6c7',
      light: '#ffffff',
      contrastText: '#000000'
    },
    CRESTSecondary: {
      main: '#657A8E',
      dark: '#394e61',
      light: '#93a9be',
      contrastText: '#000000'
    },
    CRESTLight: {
      main: '#F8F9FA',
      dark: '#c5c6c7',
      light: '#ffffff',
      contrastText: '#000000'
    },
    CRESTDark: {
      main: '#000000',
      dark: '#000000',
      light: '#2c2c2c',
      contrastText: '#fff'
    },
    CRESTDarkAlt: {
      main: '#444444',
      dark: '#6f6f6f',
      light: '#818181',
      contrastText: '#fff'
    },
    CRESTBorderColor: {
      main: '#555555',
      dark: '#2c2c2c',
      light: '#1d1d1d',
      contrastText: '#fff'
    },
    CRESTLightBorderColor: {
      main: '#2c2c2c',
      dark: '#000000',
      light: '#555555',
      contrastText: '#fff'
    },
    CRESTExampleCurrentSteps: {
      main: '#858585',
      dark: '#585858',
      light: '#C4C4C4',
      contrastText: '#000000'
    },
    CRESTExampleOtherSteps: {
      main: '#ffffff',
      dark: '#858585',
      light: '#C4C4C4',
      contrastText: '#000000'
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#17A2B8',
          fontWeight: '500',
          textDecorationColor: '#17A2B8',
          '&:hover': {
            color: '#007388',
            textDecorationColor: '#007388',
          },
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderColor: '#555555',
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#555555',
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#60d4ea',
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          textTransform: 'capitalize',
          "&:hover": {
            backgroundColor: '#6f6f6f',
          },
          "&.Mui-selected": {
            color: "#60d4ea",
            backgroundColor: '#444444',
            textTransform: 'capitalize',
          }
        },
      }
    }
  }
});

export default CustomTheme
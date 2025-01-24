import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#FF2323",
            light: "#FF5050",
            dark: "#C10000"
        }
    },
    typography: {
        fontFamily: "Roboto condensed, sans-serif",
        
    },
    components: {
        MuiSwitch: {
          styleOverrides: {
            switchBase: {
              '&.Mui-checked': {
                color: '#ffffff', // Thumb color in checked state
              },
              '&.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#ffffff', // Track color in checked state
              },
            },
          },
        },
      }
})
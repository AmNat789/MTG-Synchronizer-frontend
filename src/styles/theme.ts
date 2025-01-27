// styles/theme.ts
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2a9d8f',
      dark: '#264653',
    },

    secondary: {
      main: '#f4a261',
    },
    background: {
      default: '#e0e1dd',
    }
  },
  spacing: 8, // Default spacing unit
})

export default theme

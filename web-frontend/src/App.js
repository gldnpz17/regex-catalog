import { createTheme, ThemeProvider } from "@material-ui/core";
import { deepPurple, grey, teal } from "@material-ui/core/colors";
import Navbar from "./components/navbar"
import HomePage from "./pages/home-page"

const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
      contrastText: grey[50],
      light: teal[50]
    },
    secondary: {
      main: deepPurple[500]
    }
  }
})

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <HomePage />
      </ThemeProvider>
    </>
  );
}

export default App;

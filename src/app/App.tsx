import { CssBaseline } from '@mui/material'
import { AppProviders } from './providers/AppProviders'
import { AppRouter } from './providers/AppRouter'

const App = () => {
  return (
    <AppProviders>
      <CssBaseline />
      <AppRouter />
    </AppProviders>
  )
}

export default App
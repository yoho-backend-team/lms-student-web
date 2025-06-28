import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { ToastProvider } from './components/ui/toast';

function App() {
	return (
		<ToastProvider>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
		</ToastProvider>
	);
}

export default App;

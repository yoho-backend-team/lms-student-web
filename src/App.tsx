import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { ToastProvider } from './components/ui/toast';
import { AuthProvider } from './context/AuthContext/AuthContext';
import { LoadingProvider } from './context/LoadingContext/LoadingContext';
function App() {
	return (
		<ToastProvider>
			<BrowserRouter>
				<LoadingProvider>
					<AuthProvider>
						<AppRoutes />
					</AuthProvider>
				</LoadingProvider>
			</BrowserRouter>
		</ToastProvider>
	);
}

export default App;

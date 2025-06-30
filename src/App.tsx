import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { ToastProvider } from './components/ui/toast';
import { AuthProvider } from './context/AuthContext/AuthContext';

function App() {
	return (
		<ToastProvider>
			<BrowserRouter>
				<AuthProvider>
					<AppRoutes />
				</AuthProvider>
			</BrowserRouter>
		</ToastProvider>
	);
}

export default App;

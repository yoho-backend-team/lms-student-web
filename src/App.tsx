import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { ToastProvider } from './components/ui/toast';
import { AuthProvider } from './context/AuthContext/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LoadingProvider } from './context/LoadingContext/LoadingContext';
function App() {
	return (
		<ToastProvider>
			<BrowserRouter>
				<LoadingProvider>
					<ToastContainer position='top-right' autoClose={3000} />
					<AuthProvider>
						<AppRoutes />
					</AuthProvider>
				</LoadingProvider>
			</BrowserRouter>
		</ToastProvider>
	);
}

export default App;

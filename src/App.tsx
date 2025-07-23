import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { ToastProvider } from './components/ui/toast';
import { AuthProvider } from './context/AuthContext/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<ToastProvider>
			<BrowserRouter>
				<AuthProvider>
						<ToastContainer position="top-right" autoClose={3000} />
					<AppRoutes />
				</AuthProvider>
			</BrowserRouter>
		</ToastProvider>
	);
}

export default App;

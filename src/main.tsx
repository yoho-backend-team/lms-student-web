import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './store/store';
import { StudentSocketProvider } from './context/socketContext.tsx';

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<StudentSocketProvider>
			<App />
		</StudentSocketProvider>
	</Provider>
);

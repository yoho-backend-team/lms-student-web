import { createContext, useContext, useEffect, useState, } from 'react';
import type { ReactNode } from 'react';

type UserType = {
  id: string;
  name: string;
  email: string;
 
};

type AuthContextType = {

	isAuthenticated: boolean;
	 isLoading: boolean;
	 user: UserType | null;
	login: (data: string) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState<UserType | null>(null);

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		setIsAuthenticated(!!token);
		setIsLoading(false);
	}, []);

	const login = (data: string) => {
		try {
			if (data) {
				localStorage.setItem('authToken', data);
				setIsAuthenticated(true);
			}
		} catch (error) {
			console.error('Login failed:', error);
		}
	};

	const logout = () => {
		 setUser(null);
		localStorage.clear();
		localStorage.removeItem('authToken');
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider 
		value ={{ isAuthenticated,isLoading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

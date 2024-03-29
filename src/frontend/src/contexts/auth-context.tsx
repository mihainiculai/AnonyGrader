import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { axiosInstance } from '@/components/axiosInstance';
import useSWR from 'swr'
import { mutate } from 'swr';
import { fetcher } from '@/components/fetcher';

const HANDLERS = {
    INITIALIZE: 'INITIALIZE',
    SIGN_IN: 'SIGN_IN',
    SIGN_OUT: 'SIGN_OUT'
};

export type User = {
    email: string;
    name: string;
    roleId: number;
};

interface State {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

type Action = {
    type: string;
    payload?: any;
};

const initialState: State = {
    isAuthenticated: false,
    isLoading: true,
    user: null
};

export interface AuthContextType {
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, passwird: string, name: string, roleId: number) => Promise<void>;
    signOut: () => Promise<void>;
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
}

function User() {
    const { data, error, isValidating, mutate } = useSWR('auth/me', fetcher, {
        refreshInterval: 1000 * 60 * 10,
        shouldRetryOnError: false
    });

    return {
        user: data,
        isLoading: isValidating,
        isSignedIn: !error,
        refreshUser: mutate
    }
}

const handlers = {
    [HANDLERS.INITIALIZE]: (state: State, action: Action) => {
        const user = action.payload;

        return {
            ...state,
            isAuthenticated: Boolean(user),
            isLoading: false,
            user
        };
    },
    [HANDLERS.SIGN_IN]: (state: State) => {
        mutate('auth/me');
        return {
            ...state,
            isAuthenticated: false,
            isLoading: true,
        };
    },
    [HANDLERS.SIGN_OUT]: (state: State) => {
        return {
            ...state,
            isAuthenticated: false,
            user: null
        };
    }
};

const reducer = (state: State, action: Action) => (
    handlers[action.type] ? handlers[action.type](state, action) : state
);

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { user, isSignedIn, isLoading, refreshUser } = User();

    useEffect(() => {
        if (isLoading) {
            return;
        }

        dispatch({
            type: HANDLERS.INITIALIZE,
            payload: isSignedIn ? user : null
        });
    }, [user, isSignedIn, isLoading]);

    const signIn = async (email: string, password: string) => {
        await axiosInstance.post('auth/login', { email, password });
        dispatch({
            type: HANDLERS.SIGN_IN,
        });
    };

    const signUp = async (email: string, password: string, name: string, roleId: number) => {
        await axiosInstance.post('auth/register', { email, password, name, roleId });
        dispatch({
            type: HANDLERS.SIGN_IN,
        });
    };

    const signOut = async () => {
        try {
            await axiosInstance.post('auth/logout');
            dispatch({
                type: HANDLERS.SIGN_OUT
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                signIn,
                signUp,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
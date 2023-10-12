import {
  FunctionComponent,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from "react";
import { ActionMap } from "../types";
import { sleep } from "../utils";
import { createFakeJwt, decodeFakeJwt } from "../utils/fakeJwt";

export type SignInPayload = {
  username: string;
  password: string;
};

type AuthActionCallback = (e?: Error) => void;

export type AuthContextType = AuthStateType & {
  authorize: (token?: string, cb?: AuthActionCallback) => Promise<void>;
  signIn: (
    credentials: SignInPayload,
    cb?: AuthActionCallback,
  ) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!);

type User = {
  username: string;
};

export interface StorageAdapter {
  get: () => string;
  set: (value: string) => void;
  delete: () => void;
}

type AuthProviderProps = {
  children: ReactNode;
  lazy?: boolean;
  storageAdapter?: StorageAdapter;
};

const initialAuthReducer = {
  user: null,
  isAuth: false,
  loading: false,
  error: null,
};

type AuthStateType = {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  token?: string;
  error: Error | null;
};

enum AuthActionType {
  PROGRESS = "PROGRESS",
  ERROR = "ERROR",
  LOG_OUT = "LOG_OUT",
  DONE = "DONE",
}

type AuthPayload = {
  [AuthActionType.PROGRESS]: boolean;
  [AuthActionType.ERROR]: Error | null;
  [AuthActionType.LOG_OUT]: undefined;
  [AuthActionType.DONE]: {
    token: string;
    user: User;
  };
};

type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

const authReducer = (
  state: AuthStateType,
  action: AuthActions,
): AuthStateType => {
  switch (action.type) {
    case AuthActionType.ERROR:
      return { ...state, error: action.payload };
    case AuthActionType.PROGRESS:
      return { ...state, loading: action.payload };
    case AuthActionType.LOG_OUT:
      return initialAuthReducer;
    case AuthActionType.DONE:
      return {
        ...state,
        ...action.payload,
        isAuth: !!action.payload.user && !!action.payload.token,
      };

    default:
      return state;
  }
};

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({
  children,
  storageAdapter,
  lazy,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthReducer);

  useEffect(() => {
    if (lazy) return;

    const token = storageAdapter?.get();
    authorize(token);
  }, []);

  const authorize = async (token?: string, cb?: AuthActionCallback) => {
    dispatch({ type: AuthActionType.PROGRESS, payload: true });

    try {
      // fake request and fake response
      const username = decodeFakeJwt(token) as string;
      const result = await sleep({ user: { username }, token: token! }, 500);

      dispatch({ type: AuthActionType.DONE, payload: result });
      cb?.();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch({ type: AuthActionType.ERROR, payload: error });
      cb?.(error);
    } finally {
      dispatch({ type: AuthActionType.PROGRESS, payload: false });
    }
  };

  const signIn = async (
    { username }: SignInPayload,
    cb?: AuthActionCallback,
  ) => {
    dispatch({ type: AuthActionType.PROGRESS, payload: true });

    try {
      // fake request
      const result = await sleep(
        { user: { username }, token: createFakeJwt(username) },
        500,
      );

      storageAdapter?.set(result.token);

      dispatch({ type: AuthActionType.DONE, payload: result });
      cb?.();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch({ type: AuthActionType.ERROR, payload: error });
      cb?.(error);
    } finally {
      dispatch({ type: AuthActionType.PROGRESS, payload: false });
    }
  };

  const logout = () => {
    dispatch({ type: AuthActionType.LOG_OUT });
    storageAdapter?.delete();
  };

  return (
    <AuthContext.Provider value={{ ...state, authorize, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

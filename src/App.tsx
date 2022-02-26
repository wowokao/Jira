import React from 'react';
import './App.css';
import {useAuth} from "./context/auth-context";
import {FullPageError, FullPageLoading} from "./components/lib";
import { ErrorBoundary } from 'components/error-boundary';

const AuthenticatedApp = React.lazy(() => import('authenticated-app'))
const UnauthenticatedApp = React.lazy(() => import('unauthenticated-app'))

function App() {
    const {user} = useAuth()
  return (
    <div className="App">
        <ErrorBoundary fallbackRender={FullPageError}>
            <React.Suspense fallback={<FullPageLoading/>}>
                {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
            </React.Suspense>
        </ErrorBoundary>

    </div>
  );
}

export default App;

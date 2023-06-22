import React from 'react';
import AppContextProvider from '@crema/utility/AppContextProvider';
import AppThemeProvider from '@crema/utility/AppThemeProvider';
import AppStyleProvider from '@crema/utility/AppStyleProvider';
import AppLocaleProvider from '@crema/utility/AppLocaleProvider';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GroupCalender from 'pages/GroupCalender';
import Login from 'pages/Login/SigninEtter';
import PropTypes from 'prop-types';
import configureStore from 'redux/store';
import { Provider } from 'react-redux';

const store = configureStore();

const App = () => {

  const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem('Calender');
    if (!isLoggedIn) {
      return <Navigate to='/' />
    }
    return children
  }

  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <AppContextProvider>
      <Provider store={store}>
        <AppThemeProvider>
          <AppStyleProvider>
            <AppLocaleProvider>
              <BrowserRouter>
                <Routes>
                  <Route index path='/GroupCalender' element={
                    <ProtectedRoute>
                      <GroupCalender />
                    </ProtectedRoute>
                  } />
                  <Route path='/' element={<Login />} />
                </Routes>
              </BrowserRouter>
            </AppLocaleProvider>
          </AppStyleProvider>
        </AppThemeProvider>
      </Provider>
    </AppContextProvider>
  )
};

export default App;

import React from 'react';
import { Outlet } from 'react-router-dom';
import Logout from '../../components/auth/Logout';
import Navbar from '../../components/Nav/Navbar';
import HomePage from '../../components/User/Event/MainPage';

export default function Home() {
  return (
    <>
      <div>
        <HomePage />
      </div>
      <Outlet />
    </>
  );
}

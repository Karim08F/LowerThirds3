import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LowerThirdDisplay from './components/LowerThirdDisplay';
import AdminPanel from './components/AdminPanel';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LowerThirdDisplay />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

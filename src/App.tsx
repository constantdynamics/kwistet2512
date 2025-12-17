import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { HomePage, QuizPage, BadgesPage, ProfilePage } from './pages';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/badges" element={<BadgesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Layout>
  );
};

export default App;

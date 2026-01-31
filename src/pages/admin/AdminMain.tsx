import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Login from './Login';
import AdminLayout from '../../components/admin/AdminLayout';
import Dashboard from './Dashboard';
import ProjectsManager from './ProjectsManager';
import ProjectForm from './ProjectForm';
import ContentManager from './ContentManager';
import type { Database } from '../../lib/database.types';

type Project = Database['public']['Tables']['projects']['Row'];

type AdminPage =
  | 'dashboard'
  | 'projects'
  | 'new-project'
  | 'edit-project'
  | 'content';

export default function AdminMain() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#ff6b35]"></div>
      </div>
    );
  }

  if (!user) {
    return <Login onLoginSuccess={() => setCurrentPage('dashboard')} />;
  }

  const handleNavigate = (
    page: 'dashboard' | 'projects' | 'content'
  ) => {
    setCurrentPage(page);
    setEditingProject(null);
  };

  const handleNewProject = () => {
    setEditingProject(null);
    setCurrentPage('new-project');
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setCurrentPage('edit-project');
  };

  const handleFormBack = () => {
    setEditingProject(null);
    setCurrentPage('projects');
  };

  const handleFormSuccess = () => {
    setEditingProject(null);
    setCurrentPage('projects');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;

      case 'projects':
        return (
          <ProjectsManager
            onNewProject={handleNewProject}
            onEditProject={handleEditProject}
          />
        );

      case 'new-project':
        return (
          <ProjectForm
            onBack={handleFormBack}
            onSuccess={handleFormSuccess}
          />
        );

      case 'edit-project':
        return (
          <ProjectForm
            project={editingProject}
            onBack={handleFormBack}
            onSuccess={handleFormSuccess}
          />
        );

      case 'content':
        return <ContentManager />;

      default:
        return <Dashboard />;
    }
  };

  const getCurrentLayoutPage = () =>
    currentPage === 'dashboard'
      ? 'dashboard'
      : currentPage === 'content'
      ? 'content'
      : 'projects';

  return (
    <AdminLayout currentPage={getCurrentLayoutPage()} onNavigate={handleNavigate}>
      {renderContent()}
    </AdminLayout>
  );
}

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronDown, ChevronRight, Folder, LayoutDashboard, Loader2, LogOut, Save } from 'lucide-react';
import { siteTree, type TreeNode } from '../config/siteTree';
import { useAuth } from '../hooks/useAuth';

interface CMSLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  breadcrumbs: string[];
  onSave?: () => Promise<void>;
  isSaving?: boolean;
  saveSuccess?: boolean;
}

export const CMSLayout: React.FC<CMSLayoutProps> = ({
  children,
  title,
  description,
  breadcrumbs,
  onSave,
  isSaving = false,
  saveSuccess = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    global: true,
    pages: true,
    'service-details': true,
    legal: false,
    media: true,
  });

  const isActive = (path: string) => location.pathname === path;
  const toggleFolder = (folderId: string) => {
    setOpenFolders((prev) => ({ ...prev, [folderId]: !prev[folderId] }));
  };

  const renderNode = (node: TreeNode, depth = 0): React.ReactNode => {
    if (node.type === 'folder') {
      const isOpen = openFolders[node.id] ?? true;
      return (
        <div key={node.id} className="space-y-1">
          <div
            onClick={() => toggleFolder(node.id)}
            className="flex items-center gap-2 cursor-pointer rounded-md text-[13px] text-[#9aa59d] hover:text-[#eef4ef] hover:bg-white/[0.04] transition-colors select-none"
            style={{ padding: '7px 12px', marginLeft: depth * 14 }}
          >
            {isOpen ? <ChevronDown className="w-[14px] h-[14px]" /> : <ChevronRight className="w-[14px] h-[14px]" />}
            <node.icon className="w-[14px] h-[14px] text-[#7fd0ae]" />
            <span className="font-medium text-[12px] uppercase tracking-wider">{node.label}</span>
          </div>
          {isOpen ? <div className="space-y-1">{node.children.map((child) => renderNode(child, depth + 1))}</div> : null}
        </div>
      );
    }

    return (
      <div
        key={node.id}
        onClick={() => navigate(node.path)}
        className={`flex items-center gap-2.5 cursor-pointer rounded-md text-[13px] transition-colors ${
          isActive(node.path)
            ? 'bg-[#5BA585]/15 text-[#5BA585] font-medium shadow-[inset_0_0_0_1px_rgba(91,165,133,0.18)]'
            : 'text-[#999] hover:text-[#eef4ef] hover:bg-white/[0.04]'
        }`}
        style={{ padding: '7px 12px', marginLeft: depth * 14 }}
      >
        <node.icon className="w-[15px] h-[15px] shrink-0" />
        <span className="truncate">{node.label}</span>
      </div>
    );
  };

  return (
    <div className="h-screen flex overflow-hidden font-['Inter',sans-serif] bg-[#eef2ef]">
      <aside className="w-[300px] shrink-0 bg-[#0f1512] border-r border-white/[0.08] flex flex-col">
        <div className="px-5 pt-5 pb-4">
          <div className="bg-white rounded-xl px-4 py-2.5 flex items-center justify-center">
            <img src="/logo-cropped.png" alt="MrGardenr" className="h-8 w-auto object-contain" />
          </div>
          <div className="mt-4 px-1">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#7fd0ae] font-semibold">Content Studio</div>
            <div className="text-[13px] text-[#78827c] mt-1 leading-relaxed">
              Tree-based editing across global content, pages, services, media, and legal sections.
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <div
            onClick={() => navigate('/dashboard')}
            className={`flex items-center gap-2.5 px-3 py-[7px] cursor-pointer rounded-md text-[13px] transition-colors ${
              isActive('/dashboard')
                ? 'bg-[#5BA585]/15 text-[#5BA585] font-medium'
                : 'text-[#999] hover:text-[#eef4ef] hover:bg-white/[0.04]'
            }`}
          >
            <LayoutDashboard className="w-[15px] h-[15px] shrink-0" />
            <span>Overview</span>
          </div>
          <div className="h-px bg-white/[0.06] my-3 mx-1" />
          <div className="space-y-1">{siteTree.map((node) => renderNode(node))}</div>
        </nav>

        <div className="px-3 py-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5BA585] to-[#3d7a5e] flex items-center justify-center text-xs font-bold text-white shrink-0">
              <Folder className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-white truncate">Live Draft Editing</div>
              <div className="text-[11px] text-[#666] truncate">Tree mode for full-site content coverage</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-[#f4f7f4]">
        <header className="h-14 shrink-0 border-b border-gray-200/80 flex items-center justify-between px-8 bg-white/92 backdrop-blur-sm">
          <div className="flex items-center gap-1.5 text-[13px]">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={`${crumb}-${index}`}>
                {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-300" />}
                <span className={index === breadcrumbs.length - 1 ? 'text-gray-800 font-medium capitalize' : 'text-gray-400 capitalize'}>
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-[12px] text-gray-500">
              <span className="font-medium text-gray-700">{user?.name}</span>
              <span className="uppercase tracking-wide">{user?.role}</span>
            </div>
            {saveSuccess ? (
              <span className="text-[#5BA585] flex items-center gap-1.5 text-[13px] font-medium">
                <CheckCircle2 className="w-4 h-4" /> Published
              </span>
            ) : null}
            {onSave ? (
              <button
                onClick={onSave}
                disabled={isSaving}
                className="bg-[#5BA585] hover:bg-[#4a8a6e] active:bg-[#3f7a60] text-white h-9 px-5 rounded-lg font-medium text-[13px] disabled:opacity-50 flex items-center gap-2 transition-colors"
              >
                {isSaving ? <Loader2 className="w-4 h-4 spin" /> : <Save className="w-4 h-4" />}
                Publish
              </button>
            ) : null}
            <button
              onClick={() => {
                logout();
                navigate('/login', { replace: true });
              }}
              className="h-9 px-4 rounded-lg border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 text-[13px] font-medium inline-flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-8 py-8">
            <div className="mb-6 max-w-3xl">
              <h1 className="text-[30px] leading-tight font-bold text-gray-900">{title}</h1>
              {description ? <p className="mt-3 text-[15px] leading-relaxed text-gray-500">{description}</p> : null}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

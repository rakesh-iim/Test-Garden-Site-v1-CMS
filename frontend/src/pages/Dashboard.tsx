import { useNavigate } from 'react-router-dom';
import { ArrowRight, FolderTree, Globe, Image as ImageIcon, Layers3, PencilLine } from 'lucide-react';
import { CMSLayout } from '../components/CMSLayout';
import { editorNodes, siteTree } from '../config/siteTree';

const folderCount = (nodes: typeof siteTree): number =>
  nodes.reduce((total, node) => total + (node.type === 'folder' ? 1 + folderCount(node.children) : 0), 0);

export const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Editable nodes', value: String(editorNodes.length), icon: PencilLine, tone: 'bg-emerald-50 text-emerald-700' },
    { label: 'Tree folders', value: String(folderCount(siteTree)), icon: FolderTree, tone: 'bg-blue-50 text-blue-700' },
    { label: 'Global groups', value: '2', icon: Globe, tone: 'bg-amber-50 text-amber-700' },
    { label: 'Media tools', value: '1', icon: ImageIcon, tone: 'bg-purple-50 text-purple-700' },
  ];

  const topEditors = editorNodes.slice(0, 8);

  return (
    <CMSLayout title="Dashboard" description="Site-wide editing is organized as a content tree. Open any node to edit a page, a global section, or a service detail surface." breadcrumbs={['overview']}>
      <div className="space-y-8">
        <section className="grid grid-cols-1 xl:grid-cols-[1.3fr_0.7fr] gap-6">
          <div className="bg-[#0f1512] text-white rounded-2xl p-8 overflow-hidden relative">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(127,208,174,0.28),transparent_58%)] pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1.5 text-[12px] uppercase tracking-[0.18em] text-[#9fd9bf] font-semibold">
                <Layers3 className="w-4 h-4" />
                Tree Content Mode
              </div>
              <h2 className="mt-5 text-[34px] leading-tight font-semibold">
                Edit the site by structure, not by scattered screens.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/68 max-w-xl">
                Global navigation, page sections, service detail pages, legal pages, and media are now grouped in one content tree so the CMS mirrors the website.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/dashboard/global/navigation')}
                  className="bg-[#5BA585] hover:bg-[#4a8a6e] text-white rounded-lg px-4 py-2.5 text-[13px] font-medium inline-flex items-center gap-2 transition-colors"
                >
                  Open Navigation <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/dashboard/pages/homepage')}
                  className="bg-white/8 hover:bg-white/12 text-white rounded-lg px-4 py-2.5 text-[13px] font-medium inline-flex items-center gap-2 transition-colors"
                >
                  Open Homepage <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.tone}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="mt-4 text-[30px] leading-none font-semibold text-gray-900">{stat.value}</div>
                <div className="mt-2 text-[13px] text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-[16px] font-semibold text-gray-900">Tree coverage</h3>
            <p className="mt-2 text-[13px] text-gray-500">The primary website structure is now represented directly in the CMS navigation.</p>
            <div className="mt-5 space-y-3">
              {siteTree.map((node) => (
                <div key={node.id} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/70 px-4 py-3">
                  <node.icon className="w-4 h-4 mt-0.5 text-[#5BA585]" />
                  <div>
                    <div className="text-[13px] font-medium text-gray-900">{node.label}</div>
                    <div className="text-[12px] text-gray-500">
                      {node.type === 'folder' ? `${node.children.length} child node${node.children.length === 1 ? '' : 's'}` : 'Direct editor node'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[16px] font-semibold text-gray-900">Top editors</h3>
                <p className="mt-2 text-[13px] text-gray-500">Jump into the most important surfaces for the public site.</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {topEditors.map((node) => (
                <button
                  key={node.id}
                  onClick={() => navigate(node.path)}
                  className="text-left rounded-xl border border-gray-200 bg-gray-50/60 hover:bg-[#5BA585]/6 hover:border-[#5BA585]/25 transition-colors p-4 group"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-[#5BA585]">
                        <node.icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[14px] font-medium text-gray-900 truncate">{node.label}</div>
                        <div className="text-[12px] text-gray-500 truncate">{node.pageId}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#5BA585] transition-colors" />
                  </div>
                  <p className="mt-3 text-[12px] leading-relaxed text-gray-500">{node.description}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </CMSLayout>
  );
};

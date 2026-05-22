import { useEffect, useState } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CMSLayout } from '../components/CMSLayout';
import { api } from '../lib/api';
import { editorNodes } from '../config/siteTree';
import type { EditorField } from '../config/contentSchema';

type ContentState = Record<string, unknown>;

const inputCls = 'w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[14px] text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-[#5BA585] focus:ring-2 focus:ring-[#5BA585]/20';
const labelCls = 'text-[13px] font-semibold text-gray-700 mb-1.5 block';
const helperCls = 'text-[12px] text-gray-400 mt-1';
const sectionCls = 'bg-white rounded-xl border border-gray-200 p-6';

const createDefaultItem = (field: Extract<EditorField, { type: 'collection' }>) =>
  field.fields.reduce<Record<string, unknown>>((acc: Record<string, unknown>, subField) => {
    acc[subField.key] = subField.type === 'checkbox' ? false : '';
    return acc;
  }, {});

const createDefaultData = (fields: EditorField[]): ContentState =>
  fields.reduce<ContentState>((acc, field) => {
    if (field.type === 'collection') {
      acc[field.key] = [];
    } else {
      acc[field.key] = '';
    }
    return acc;
  }, {});

export const SectionEditorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const config = editorNodes.find((node) => node.path === location.pathname);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [formData, setFormData] = useState<ContentState>({});

  useEffect(() => {
    if (!config) {
      navigate('/dashboard', { replace: true });
      return;
    }

    const defaultData = createDefaultData(config.fields);
    const timeoutId = window.setTimeout(() => {
      setFormData(defaultData);
    }, 0);

    const fetchContent = async () => {
      try {
        const response = await api.get(`/content/${config.pageId}`);
        if (response.data?.data) {
          setFormData({ ...defaultData, ...response.data.data });
        }
      } catch (error) {
        console.error(`Error fetching content for ${config.pageId}`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();

    return () => window.clearTimeout(timeoutId);
  }, [config, navigate]);

  if (!config) return null;

  const handleScalarChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCollectionItemChange = (
    fieldKey: string,
    itemIndex: number,
    subKey: string,
    value: string | boolean
  ) => {
    setFormData((prev) => {
      const collection = Array.isArray(prev[fieldKey]) ? [...(prev[fieldKey] as Record<string, unknown>[])] : [];
      collection[itemIndex] = {
        ...collection[itemIndex],
        [subKey]: value,
      };
      return { ...prev, [fieldKey]: collection };
    });
  };

  const addCollectionItem = (field: Extract<EditorField, { type: 'collection' }>) => {
    setFormData((prev) => {
      const collection = Array.isArray(prev[field.key]) ? [...(prev[field.key] as Record<string, unknown>[])] : [];
      collection.push(createDefaultItem(field));
      return { ...prev, [field.key]: collection };
    });
  };

  const removeCollectionItem = (fieldKey: string, itemIndex: number) => {
    setFormData((prev) => {
      const collection = Array.isArray(prev[fieldKey]) ? [...(prev[fieldKey] as Record<string, unknown>[])] : [];
      collection.splice(itemIndex, 1);
      return { ...prev, [fieldKey]: collection };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await api.put(`/content/${config.pageId}`, formData);
      setSaveSuccess(true);
      window.setTimeout(() => setSaveSuccess(false), 2500);
    } catch (error) {
      console.error(`Error saving content for ${config.pageId}`, error);
      alert('Failed to save content. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderScalarField = (field: Exclude<EditorField, { type: 'collection' }>) => {
    const value = typeof formData[field.key] === 'number'
      ? String(formData[field.key] ?? '')
      : String(formData[field.key] ?? '');

    return (
      <div key={field.key}>
        <label className={labelCls}>{field.label}</label>
        {field.type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => handleScalarChange(field.key, e.target.value)}
            className={`${inputCls} h-28 resize-none`}
            placeholder={field.placeholder}
          />
        ) : (
          <input
            type={field.type === 'number' ? 'number' : 'text'}
            value={value}
            onChange={(e) => handleScalarChange(field.key, e.target.value)}
            className={inputCls}
            placeholder={field.placeholder}
          />
        )}
        {field.helperText ? <p className={helperCls}>{field.helperText}</p> : null}
      </div>
    );
  };

  const renderCollectionField = (field: Extract<EditorField, { type: 'collection' }>) => {
    const items = Array.isArray(formData[field.key]) ? (formData[field.key] as Record<string, unknown>[]) : [];

    return (
      <section key={field.key} className={sectionCls}>
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-[15px] font-bold text-gray-900">{field.label}</h2>
            {field.helperText ? <p className="text-[12px] text-gray-400 mt-1">{field.helperText}</p> : null}
          </div>
          <button
            onClick={() => addCollectionItem(field)}
            className="text-[13px] flex items-center gap-1.5 text-[#5BA585] font-semibold hover:bg-[#5BA585]/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" /> Add {field.itemLabel}
          </button>
        </div>

        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-8 text-[13px] text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              No items added yet.
            </div>
          ) : null}

          {items.map((item, itemIndex) => (
            <div key={`${field.key}-${itemIndex}`} className="relative bg-gray-50/80 border border-gray-200 rounded-lg p-4">
              <button
                onClick={() => removeCollectionItem(field.key, itemIndex)}
                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <div className="space-y-3 pr-8">
                {field.fields.map((subField: Extract<EditorField, { type: 'collection' }>['fields'][number]) => {
                  const subValue = item[subField.key];
                  return (
                    <div key={subField.key}>
                      <label className={labelCls}>{subField.label}</label>
                      {subField.type === 'checkbox' ? (
                        <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] font-medium text-gray-600">
                          <input
                            type="checkbox"
                            checked={Boolean(subValue)}
                            onChange={(e) => handleCollectionItemChange(field.key, itemIndex, subField.key, e.target.checked)}
                            className="rounded border-gray-300 text-[#5BA585] focus:ring-[#5BA585]/20 w-4 h-4"
                          />
                          <span>Enabled</span>
                        </label>
                      ) : subField.type === 'textarea' ? (
                        <textarea
                          value={String(subValue ?? '')}
                          onChange={(e) => handleCollectionItemChange(field.key, itemIndex, subField.key, e.target.value)}
                          className={`${inputCls} h-24 resize-none`}
                          placeholder={subField.placeholder}
                        />
                      ) : (
                        <input
                          type={subField.type === 'number' ? 'number' : 'text'}
                          value={String(subValue ?? '')}
                          onChange={(e) => handleCollectionItemChange(field.key, itemIndex, subField.key, e.target.value)}
                          className={inputCls}
                          placeholder={subField.placeholder}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <Loader2 className="spin w-8 h-8 text-[#5BA585]" />
      </div>
    );
  }

  return (
    <CMSLayout
      title={config.title}
      description={config.description}
      breadcrumbs={config.path.replace('/dashboard/', '').split('/').map((part) => part.replace(/-/g, ' '))}
      onSave={handleSave}
      isSaving={isSaving}
      saveSuccess={saveSuccess}
    >
      <div className="space-y-6">
        <section className={sectionCls}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.fields
              .filter((field) => field.type !== 'collection')
              .map((field) => renderScalarField(field))}
          </div>
        </section>

        {config.fields
          .filter((field) => field.type === 'collection')
          .map((field) => renderCollectionField(field))}
      </div>
    </CMSLayout>
  );
};

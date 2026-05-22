import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CMSLayout } from '../components/CMSLayout';
import { api } from '../lib/api';
import { 
  Image as ImageIcon, UploadCloud, Copy, Trash2, 
  Check, Loader2, ExternalLink, AlertCircle 
} from 'lucide-react';

interface MediaFile {
  id: string;
  filename: string;
  url: string;
  provider?: string;
  size?: number;
}

const getErrorMessage = (error: unknown, fallback: string) => {
  if (
    typeof error === 'object'
    && error !== null
    && 'response' in error
    && typeof error.response === 'object'
    && error.response !== null
    && 'data' in error.response
    && typeof error.response.data === 'object'
    && error.response.data !== null
    && 'message' in error.response.data
    && typeof error.response.data.message === 'string'
  ) {
    return error.response.data.message;
  }

  return fallback;
};

export const MediaLibrary = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [images, setImages] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  // Fetch all images
  const fetchImages = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/upload');
      if (res.data?.status === 'success') {
        setImages(res.data.data || []);
      }
    } catch (err: unknown) {
      console.error('Error fetching media:', err);
      setError('Failed to load media files.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchImages();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchImages]);

  // Handle file upload
  const uploadFile = async (file: File) => {
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed.');
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data?.status === 'success') {
        // Refresh list
        await fetchImages();
      }
    } catch (err: unknown) {
      console.error('Upload error:', err);
      setError(getErrorMessage(err, 'Failed to upload image.'));
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  // Drag and Drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  // Copy Link to clipboard
  const copyToClipboard = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Delete image
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    try {
      const res = await api.delete(`/upload/${id}`);
      if (res.data?.status === 'success') {
        setImages(prev => prev.filter(img => img.id !== id));
      }
    } catch (err: unknown) {
      console.error('Delete error:', err);
      alert('Failed to delete image.');
    }
  };

  return (
    <CMSLayout title="Media Library" breadcrumbs={['Media', 'Library']}>
      <p className="text-[14px] text-gray-500 -mt-4 mb-6">Upload and manage image assets. You can copy their links to use anywhere on your website.</p>

      {/* Drag & Drop Upload Zone */}
      <div 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative bg-white border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragActive 
            ? 'border-[#5BA585] bg-[#5BA585]/5 scale-[0.99]' 
            : 'border-gray-200 hover:border-[#5BA585] hover:bg-gray-50/50'
        }`}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />

        <div className="flex flex-col items-center justify-center">
          {isUploading ? (
            <>
              <Loader2 className="w-10 h-10 text-[#5BA585] animate-spin mb-4" />
              <p className="text-[14px] font-semibold text-gray-700">Uploading your image...</p>
              <p className="text-[12px] text-gray-400 mt-1">Please wait a moment</p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#5BA585] flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-[14px] font-semibold text-gray-700">
                Drag & drop your image here, or <span className="text-[#5BA585] hover:underline">browse</span>
              </p>
              <p className="text-[12px] text-gray-400 mt-1">Supports PNG, JPG, JPEG, WEBP, GIF up to 5MB</p>
            </>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg p-3.5 text-[13px] text-red-600">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Media Grid Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-bold text-gray-900">
            All Files <span className="text-gray-400 font-normal text-xs ml-1">({images.length})</span>
          </h2>
          <button 
            onClick={fetchImages}
            className="text-[12px] text-gray-400 hover:text-gray-600 font-medium transition-colors"
          >
            Refresh
          </button>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <Loader2 className="w-8 h-8 text-[#5BA585] animate-spin mx-auto mb-2" />
            <p className="text-[13px] text-gray-400">Loading library files...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center mb-4">
              <ImageIcon className="w-7 h-7" />
            </div>
            <h3 className="text-[14px] font-bold text-gray-700 mb-1">No media files found</h3>
            <p className="text-[12px] text-gray-400 max-w-xs leading-relaxed">
              Upload images above and they will appear here as copyable URLs.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div 
                key={img.id} 
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
              >
                {/* Thumbnail Preview */}
                <div className="relative aspect-video bg-gray-50 border-b border-gray-100 overflow-hidden flex items-center justify-center">
                  <img 
                    src={img.url} 
                    alt={img.filename} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                    <button 
                      onClick={() => copyToClipboard(img.url, index)}
                      className="p-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors shadow-md"
                      title="Copy URL"
                    >
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <a 
                      href={img.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors shadow-md"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button 
                      onClick={() => handleDelete(img.id)}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md"
                      title="Delete image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Metadata & Actions */}
                <div className="p-3 flex-1 flex flex-col justify-between min-w-0">
                  <p className="text-[12px] font-medium text-gray-700 truncate" title={img.filename}>
                    {img.filename}
                  </p>
                  <p className="mt-1 text-[11px] text-gray-400 truncate">
                    {img.provider === 'r2' ? 'Cloudflare R2' : 'Local storage'}
                  </p>
                  
                  <div className="mt-2.5 flex items-center gap-2">
                    <button 
                      onClick={() => copyToClipboard(img.url, index)}
                      className={`flex-1 text-[11px] font-bold py-1.5 px-2 rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                        copiedIndex === index 
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                          : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600'
                      }`}
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Link
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CMSLayout>
  );
};

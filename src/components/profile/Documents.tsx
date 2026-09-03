import React from 'react';
import { FileText, Download, Eye, UploadCloud, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const mockDocs = [
  { id: '1', name: 'PAN Card', date: '12 Jan 2024', status: 'verified', size: '1.2 MB', ext: 'PDF' },
  { id: '2', name: 'Aadhaar Card', date: '12 Jan 2024', status: 'verified', size: '2.4 MB', ext: 'PDF' },
  { id: '3', name: 'Cancelled Cheque', date: '14 Jan 2024', status: 'verified', size: '850 KB', ext: 'JPG' },
  { id: '4', name: 'Client Master Report (CMR)', date: '15 Jan 2024', status: 'verified', size: '3.1 MB', ext: 'PDF' },
  { id: '5', name: 'Income Proof (Optional)', date: '--', status: 'missing', size: '--', ext: '--' },
];

export const Documents: React.FC = () => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 md:p-8 shadow-premium w-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-brand-navy flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" /> Uploaded Documents
        </h3>
        <button 
          onClick={() => toast('Opening file picker...', { icon: '📂' })}
          className="text-xs font-black bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary transition flex items-center gap-1 shadow-glow-blue"
        >
          <UploadCloud className="w-4 h-4" /> Upload New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDocs.map((doc) => (
          <div key={doc.id} className="border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:border-primary/30 transition-all group flex flex-col justify-between h-[200px]">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xs ${doc.status === 'verified' ? 'bg-slate-100 text-slate-500' : 'bg-slate-50 text-slate-300 border border-slate-100'}`}>
                  {doc.ext}
                </div>
                <div>
                  <span className="text-sm font-black text-brand-navy block truncate max-w-[120px]">{doc.name}</span>
                  <span className="text-[10px] text-slate-500 font-bold block">{doc.size}</span>
                </div>
              </div>
              {doc.status === 'verified' && (
                <span className="w-2 h-2 rounded-full bg-success"></span>
              )}
            </div>

            <div className="mt-auto">
              {doc.status === 'verified' ? (
                <>
                  <span className="text-[9px] font-bold text-slate-400 uppercase block mb-3">Uploaded: {doc.date}</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toast(`Opening ${doc.name}...`)}
                      className="flex-1 bg-slate-50 text-slate-600 text-[10px] font-black py-2 rounded-lg hover:bg-slate-100 transition flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                    <button 
                      onClick={() => toast.success(`Downloading ${doc.name}...`)}
                      className="flex-1 bg-slate-50 text-slate-600 text-[10px] font-black py-2 rounded-lg hover:bg-slate-100 transition flex items-center justify-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                </>
              ) : (
                <button 
                  onClick={() => toast('Opening file picker...', { icon: '📂' })}
                  className="w-full bg-slate-50 border border-slate-200 border-dashed text-slate-500 text-xs font-black py-4 rounded-xl hover:border-primary hover:text-primary transition flex flex-col items-center justify-center gap-1 h-full"
                >
                  <UploadCloud className="w-5 h-5" /> Upload Document
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

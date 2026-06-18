import React, { useState } from 'react';
import {
  LayoutDashboard, ShoppingBag, Users, FileText, 
  ChevronLeft, ChevronRight, Plus, Search, Bell, 
  TrendingUp, FileDown, Eye, Edit, Trash2,
  CheckCircle2, Clock, X, Building, Mail, Phone,
  CreditCard, Tag, Calendar, BarChart3, AlertCircle,
  ArrowRight, FileSignature, Target, Briefcase
} from 'lucide-react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl border border-slate-200/70 shadow-sm ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = 'gray', className = '' }) => {
  const variants = {
    gray: 'bg-slate-100 text-slate-700 border-slate-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${variants[variant] || variants.gray} ${className}`}>
      {children}
    </span>
  );
};

const MetricCard = ({ title, value, subtext, trend, trendUp, icon: Icon, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    rose: 'bg-rose-50 text-rose-600',
  };

  return (
    <Card className="p-5 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`flex items-center text-xs font-medium ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trendUp ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingUp className="w-3.5 h-3.5 mr-1 rotate-180" />}
            {trend}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{value}</h3>
        <p className="text-sm font-medium text-slate-500 mt-1">{title}</p>
        {subtext && <p className="text-xs text-slate-400 mt-2 border-t border-slate-100 pt-2">{subtext}</p>}
      </div>
    </Card>
  );
};

const Button = ({ children, variant = 'primary', icon: Icon, onClick, className = '' }) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
    secondary: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm',
    outline: 'bg-transparent hover:bg-blue-50 text-blue-600 border border-blue-200',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600',
    danger: 'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200',
  };
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${variants[variant]} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

const initialOrders = [
  { 
    id: 'SO-2026-081', 
    client: 'PT. Alpha Mandiri', 
    needs: 'Seragam Teknisi Lapangan',
    qty: 200,
    price: 45000000, 
    stage: 'Produksi', 
    date: '15 Jun 2026',
    designMockup: 'alpha_v2.pdf'
  },
  { 
    id: 'SO-2026-082', 
    client: 'CV. Bintang Terang', 
    needs: 'Kemeja Safety Project',
    qty: 150, 
    price: 32500000, 
    stage: 'Desain', 
    date: '17 Jun 2026',
    designMockup: 'Menunggu Editor'
  },
  { 
    id: 'SO-2026-083', 
    client: 'Universitas X', 
    needs: 'Jaket BEM Kampus',
    qty: 300, 
    price: 60000000, 
    stage: 'Sales Deal', 
    date: '18 Jun 2026',
    designMockup: 'Belum Ada'
  },
  { 
    id: 'SO-2026-079', 
    client: 'Toko Olahraga Jaya', 
    needs: 'Jersey Lari Marathon',
    qty: 500, 
    price: 75000000, 
    stage: 'QC & Kirim', 
    date: '02 Jun 2026',
    designMockup: 'jersey_final.pdf'
  },
];

const pipelineStages = [
  { id: 'Sales Deal', label: 'Sales Deal', count: 4, value: 'Rp 145M', color: 'bg-slate-100 text-slate-700' },
  { id: 'Desain', label: 'Desain (View Only)', count: 3, value: 'Rp 90M', color: 'bg-purple-50 text-purple-700' },
  { id: 'Produksi', label: 'Produksi (View)', count: 5, value: 'Rp 210M', color: 'bg-blue-50 text-blue-700' },
  { id: 'QC & Kirim', label: 'QC & Kirim', count: 2, value: 'Rp 75M', color: 'bg-emerald-50 text-emerald-700' },
];

export default function SalesWorkspace() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Overview');
  const [orders, setOrders] = useState(initialOrders);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const menuItems = [
    { id: 'Overview', label: 'Sales Overview', icon: LayoutDashboard },
    { id: 'Pipeline', label: 'Pipeline Deals', icon: Target },
    { id: 'Orders', label: 'Manajemen Order', icon: ShoppingBag },
    { id: 'Clients', label: 'Database Klien', icon: Users },
  ];

  const Sidebar = () => (
    <div className={`bg-[#0F172A] text-slate-300 flex flex-col transition-all duration-300 ease-in-out relative ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="h-20 flex items-center px-5 border-b border-slate-800/50">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
            <span className="font-bold text-white text-xl">F</span>
          </div>
          {!isSidebarCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg text-white tracking-wide whitespace-nowrap">FuturaLabs</span>
              <span className="text-[10px] text-blue-400 font-medium tracking-wider uppercase">SaaS Manufacturing</span>
            </div>
          )}
        </div>
      </div>
      
      <button 
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        className="absolute -right-3 top-24 bg-[#1E293B] border border-slate-700 rounded-full p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 z-10 transition-colors shadow-sm"
      >
        {isSidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      <div className="px-4 py-4">
        <p className={`text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider ${isSidebarCollapsed ? 'text-center' : ''}`}>
          {isSidebarCollapsed ? 'WS' : 'Sales Command'}
        </p>
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                title={isSidebarCollapsed ? item.label : ''}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive ? 'bg-blue-600/10 text-blue-400 font-medium' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-500' : 'text-slate-400'}`} />
                {!isSidebarCollapsed && <span className="text-sm whitespace-nowrap">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-slate-800/50">
        <div className={`flex items-center gap-3 ${isSidebarCollapsed ? 'justify-center' : 'p-2 bg-slate-800/50 rounded-xl border border-slate-700/50'}`}>
          <img src="https://ui-avatars.com/api/?name=Sales+Rep&background=3b82f6&color=fff" alt="Profile" className="w-9 h-9 rounded-full shrink-0" />
          {!isSidebarCollapsed && (
            <div className="overflow-hidden text-left">
              <p className="text-sm font-semibold text-white truncate">Andi Firmansyah</p>
              <p className="text-xs text-slate-400 truncate">Sales Representative</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const Header = () => (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/70 flex items-center justify-between px-8 sticky top-0 z-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          {menuItems.find(m => m.id === activeMenu)?.label || 'Sales Workspace'}
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">Kelola pesanan klien dan pantau alur kerja produksi.</p>
      </div>
      <div className="flex items-center gap-5">
        <div className="relative group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Cari ID Pesanan, Klien..." 
            className="pl-10 pr-4 py-2.5 text-sm bg-slate-100/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-72 transition-all group-focus-within:bg-white"
          />
        </div>
        <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-full transition-colors border border-transparent hover:border-slate-200">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        <Button icon={Plus} onClick={() => setIsOrderModalOpen(true)}>Pesanan Baru</Button>
      </div>
    </header>
  );

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Top Level KPIs (Leading & Lagging Indicators) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">Performa Q2 (Juni 2026)</h2>
          <Badge variant="indigo" className="text-xs">Data Real-time</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard 
            title="Total Revenue (Lagging)" 
            value="Rp 520M" 
            subtext="Target Q2: Rp 800M"
            trend="+12%" 
            trendUp={true}
            icon={TrendingUp}
            color="emerald"
          />
          <MetricCard 
            title="Pipeline Value (Leading)" 
            value="Rp 845M" 
            subtext="Potensi deal dalam diskusi"
            trend="+5%" 
            trendUp={true}
            icon={Target}
            color="blue"
          />
          <MetricCard 
            title="Win Rate" 
            value="32%" 
            subtext="Dari total prospek kuartal ini"
            trend="-2%" 
            trendUp={false}
            icon={Briefcase}
            color="indigo"
          />
          <MetricCard 
            title="Siklus Deal Rata-rata" 
            value="18 Hari" 
            subtext="Waktu dari prospek hingga closing"
            icon={Clock}
            color="amber"
          />
        </div>
      </div>

      {/* Actionable Pipeline Alert & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-0 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
             <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                Action Required (Deals Tertahan)
             </h3>
             <button className="text-sm text-blue-600 font-medium hover:underline">Lihat Semua</button>
          </div>
          <div className="p-0 overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-xs text-slate-500 bg-white border-b border-slate-100 uppercase">
                  <tr>
                    <th className="px-5 py-3 font-medium">Klien</th>
                    <th className="px-5 py-3 font-medium">Status / Hambatan</th>
                    <th className="px-5 py-3 font-medium">Nilai</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-slate-800">Universitas X</td>
                    <td className="px-5 py-3 text-amber-600 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Menunggu ACC Harga</td>
                    <td className="px-5 py-3 font-medium">Rp 60.000.000</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-slate-800">CV. Bintang Terang</td>
                    <td className="px-5 py-3 text-rose-500 flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5"/> Revisi Kontrak</td>
                    <td className="px-5 py-3 font-medium">Rp 32.500.000</td>
                  </tr>
                </tbody>
             </table>
          </div>
        </Card>

        {/* Quick Actions Panel */}
        <Card className="p-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden flex flex-col justify-center">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
          <h3 className="font-bold text-lg mb-2 relative z-10">Sales Action</h3>
          <p className="text-blue-100 text-sm mb-6 relative z-10">Akses cepat untuk aktivitas utama sales Anda hari ini.</p>
          
          <div className="space-y-3 relative z-10">
            <button onClick={() => setIsOrderModalOpen(true)} className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-colors text-sm font-medium border border-white/10">
              <span className="flex items-center gap-2"><Plus className="w-4 h-4"/> Input Order Baru</span>
              <ArrowRight className="w-4 h-4 text-blue-200" />
            </button>
            <button onClick={() => setActiveMenu('Pipeline')} className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-colors text-sm font-medium border border-white/10">
              <span className="flex items-center gap-2"><BarChart3 className="w-4 h-4"/> Cek Status Desain (View)</span>
              <ArrowRight className="w-4 h-4 text-blue-200" />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderPipeline = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Pelacakan Pipeline Produksi</h2>
          <p className="text-sm text-slate-500 mt-1">
            Kemampuan: <strong className="text-indigo-600">View Only</strong> untuk tahap Desain & Produksi.
          </p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
           <button className="px-4 py-1.5 text-sm font-medium bg-white shadow-sm rounded-md text-slate-800">List View</button>
           <button className="px-4 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-800">Kanban View</button>
        </div>
      </div>

      {/* Pipeline Stage Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {pipelineStages.map(stage => (
          <div key={stage.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1 h-full ${stage.color.split(' ')[0]}`}></div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{stage.label}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <h4 className="text-2xl font-bold text-slate-800">{stage.count}</h4>
              <span className="text-sm text-slate-400">Order</span>
            </div>
            <p className="text-sm font-medium text-slate-600 mt-1">{stage.value}</p>
          </div>
        ))}
      </div>
      
      {/* Detailed Pipeline List */}
      <div className="space-y-4">
          {orders.map((row) => (
            <Card key={row.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:border-blue-200 transition-colors">
              <div className="flex-1 lg:w-1/3">
                <div className="flex items-center gap-3 mb-1.5">
                  <h3 className="font-bold text-slate-800 text-lg">{row.client}</h3>
                  <span className="text-xs font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{row.id}</span>
                </div>
                <p className="text-sm text-slate-600 font-medium mb-1">{row.needs}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><ShoppingBag className="w-3.5 h-3.5"/> {row.qty} pcs</span>
                  <span>•</span>
                  <span className="font-semibold text-slate-700">Rp {row.price.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Progress Bar (Visualizing the Hand-off) */}
              <div className="flex-1 lg:w-1/3 w-full">
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className={row.stage !== 'Batal' ? 'text-indigo-600' : 'text-slate-400'}>Sales Deal</span>
                  <span className={['Desain', 'Produksi', 'QC & Kirim'].includes(row.stage) ? 'text-indigo-600' : 'text-slate-400'}>Desain</span>
                  <span className={['Produksi', 'QC & Kirim'].includes(row.stage) ? 'text-indigo-600' : 'text-slate-400'}>Produksi</span>
                  <span className={row.stage === 'QC & Kirim' ? 'text-indigo-600' : 'text-slate-400'}>Siap Kirim</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  <div className={`h-full ${row.stage !== 'Batal' ? 'bg-indigo-500' : ''}`} style={{ width: '25%' }}></div>
                  <div className={`h-full ${['Desain', 'Produksi', 'QC & Kirim'].includes(row.stage) ? 'bg-blue-500' : ''}`} style={{ width: '25%' }}></div>
                  <div className={`h-full ${['Produksi', 'QC & Kirim'].includes(row.stage) ? 'bg-amber-500' : ''}`} style={{ width: '25%' }}></div>
                  <div className={`h-full ${row.stage === 'QC & Kirim' ? 'bg-emerald-500' : ''}`} style={{ width: '25%' }}></div>
                </div>
              </div>

              {/* Action/View Section based on Matriks Role */}
              <div className="lg:w-1/4 text-right flex flex-col items-start lg:items-end gap-2 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-5">
                <Badge 
                  variant={
                    row.stage === 'Sales Deal' ? 'gray' : 
                    row.stage === 'Desain' ? 'purple' : 
                    row.stage === 'Produksi' ? 'blue' : 'green'
                  }
                  className="mb-1"
                >
                  Status: {row.stage}
                </Badge>
                
                {row.designMockup !== 'Belum Ada' && row.designMockup !== 'Menunggu Editor' ? (
                  <button onClick={() => showToast('Membuka preview mockup... (Sesuai role: View Only)', 'success')} className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                    <Eye className="w-3.5 h-3.5" /> Lihat Mockup (View Only)
                  </button>
                ) : (
                  <span className="text-xs font-medium text-slate-400 italic bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">Mockup: {row.designMockup}</span>
                )}
              </div>
            </Card>
          ))}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Main Table Area (CRUD Focus) */}
      <Card className="flex flex-col">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Manajemen Dokumen Order</h2>
            <p className="text-sm text-slate-500 mt-1">Pusat kontrol <strong className="text-slate-700">FULL CRUD</strong> untuk Tim Sales.</p>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" icon={FileDown}>Export CSV</Button>
             <Button variant="primary" icon={Plus} onClick={() => setIsOrderModalOpen(true)}>Create Order</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">ID & Tanggal</th>
                <th className="px-6 py-4">Klien & Kebutuhan</th>
                <th className="px-6 py-4">Nilai Deal (Rp)</th>
                <th className="px-6 py-4">Status Alur Kerja</th>
                <th className="px-6 py-4 text-center">Aksi (CRUD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-800">{row.id}</div>
                    <div className="text-xs text-slate-500 mt-1">{row.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{row.client}</div>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                       <Tag className="w-3 h-3"/> {row.needs} ({row.qty} pcs)
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700">
                    Rp {row.price.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={row.stage === 'Sales Deal' ? 'gray' : 'blue'}>{row.stage}</Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button title="Edit Order" onClick={() => showToast('Membuka form edit order...', 'success')} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button title="Generate PDF Penawaran/Kontrak" onClick={() => showToast('PDF Kontrak & Invoice berhasil di-generate.', 'success')} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100">
                        <FileSignature className="w-4 h-4" />
                      </button>
                      <button title="Hapus Order" onClick={() => showToast('Order dihapus (Akses FULL CRUD).', 'danger')} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const OrderModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[95vh] md:max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <FileText className="w-6 h-6" />
             </div>
             <div>
               <h3 className="font-bold text-xl text-slate-800">Form Pembuatan Sales Order</h3>
               <p className="text-sm text-slate-500 mt-1">Dokumen resmi pengikatan deal klien sebelum masuk ke Tim Desain.</p>
             </div>
          </div>
          <button onClick={() => setIsOrderModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-200/50 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 space-y-10">
          
          {/* Section 1: Klien - Form Layout Berbasis Kolom */}
          <section>
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-6">
               <Building className="w-5 h-5 text-indigo-600" />
               <h4 className="text-base font-bold text-slate-800">1. Data Klien & PIC</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Perusahaan / Institusi <span className="text-rose-500">*</span></label>
                <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm transition-all" placeholder="Contoh: PT. Maju Bersama" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nama PIC (Penanggung Jawab)</label>
                <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm transition-all" placeholder="Nama lengkap..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Jabatan PIC</label>
                <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm transition-all" placeholder="Misal: Procurement Manager" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Bisnis</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="email" className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm transition-all" placeholder="pic@perusahaan.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">No. WhatsApp / Telepon</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="tel" className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm transition-all" placeholder="0812..." />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Spesifikasi - Form Layout */}
          <section>
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-6">
               <Tag className="w-5 h-5 text-indigo-600" />
               <h4 className="text-base font-bold text-slate-800">2. Rincian Kebutuhan Manufaktur</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Produk / Jenis Pakaian <span className="text-rose-500">*</span></label>
                <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm transition-all" placeholder="Contoh: Kemeja Lapangan Drill (Lengan Pendek)" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Kuantitas Total (Pcs) <span className="text-rose-500">*</span></label>
                <input type="number" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm transition-all" placeholder="Minimum 50 pcs" />
              </div>
              
              <div className="md:col-span-3 bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                 <label className="block text-sm font-semibold text-slate-800 mb-2">Brief / Instruksi Khusus untuk Tim Desain (Opsional)</label>
                 <p className="text-xs text-slate-500 mb-3">Tuliskan referensi warna, letak logo bordir, atau detail lain agar desainer bisa membuat mockup dengan presisi.</p>
                 <textarea rows="3" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm transition-all bg-white" placeholder="Logo di dada kiri ukuran 5cm, tulisan departemen di punggung..."></textarea>
              </div>
            </div>
          </section>

          {/* Section 3: Keuangan */}
          <section>
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-6">
               <CreditCard className="w-5 h-5 text-indigo-600" />
               <h4 className="text-base font-bold text-slate-800">3. Nilai Deal & Termin Pembayaran</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Grand Total Disepakati (Rp) <span className="text-rose-500">*</span></label>
                <div className="relative mb-4">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-lg">Rp</span>
                  <input type="text" className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-xl text-slate-800 transition-all bg-white shadow-inner" placeholder="0" />
                </div>
                
                <label className="block text-sm font-semibold text-slate-700 mb-2 mt-4">Target Selesai Produksi (Deadline)</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="date" className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm transition-all bg-white" />
                </div>
              </div>
              
              <div className="space-y-4">
                 <label className="block text-sm font-semibold text-slate-700 mb-1">Skema Pembayaran</label>
                 
                 <label className="flex items-start gap-3 p-4 border border-blue-200 bg-blue-50/30 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors">
                    <input type="radio" name="payment" className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500" defaultChecked />
                    <div>
                       <span className="block font-semibold text-slate-800 text-sm">DP 50% - Pelunasan Sebelum Kirim</span>
                       <span className="block text-xs text-slate-500 mt-1">Standar B2B manufacture. Tagihan DP dicetak otomatis.</span>
                    </div>
                 </label>
                 
                 <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                    <input type="radio" name="payment" className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500" />
                    <div>
                       <span className="block font-semibold text-slate-800 text-sm">Full Payment (100% di Muka)</span>
                       <span className="block text-xs text-slate-500 mt-1">Untuk klien ritel atau order quantity kecil.</span>
                    </div>
                 </label>
              </div>
            </div>
          </section>
        </div>

        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] z-10">
          <p className="text-xs text-slate-500 hidden md:block">
            Menyimpan data akan <strong className="text-slate-700">mengirim notifikasi ke Tim Desain</strong>.
          </p>
          <div className="flex gap-3 w-full md:w-auto justify-end">
             <Button variant="ghost" onClick={() => setIsOrderModalOpen(false)}>Batal</Button>
             <Button 
               variant="primary" 
               icon={FileSignature}
               onClick={() => {
                 setIsOrderModalOpen(false);
                 showToast('Data Order berhasil disimpan. PDF Kontrak telah digenerate.', 'success');
               }}
             >
               Create Order & Generate PDF
             </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth">
          <div className="max-w-6xl mx-auto">
            {activeMenu === 'Overview' && renderOverview()}
            {activeMenu === 'Pipeline' && renderPipeline()}
            {activeMenu === 'Orders' && renderOrders()}
            {activeMenu === 'Clients' && (
              <div className="flex items-center justify-center h-64 text-slate-400">
                <p>Modul Database Klien (CRUD) - Tersedia di rilis berikutnya.</p>
              </div>
            )}
          </div>
        </main>

        {/* Global Toast Notification */}
        {toast && (
          <div className="absolute bottom-8 right-8 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className={`text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border ${
              toast.type === 'danger' ? 'bg-rose-600 border-rose-500' : 'bg-slate-900 border-slate-700/50'
            }`}>
              {toast.type === 'danger' ? <Trash2 className="w-5 h-5 text-white" /> : <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              <p className="text-sm font-medium pr-4">{toast.message}</p>
            </div>
          </div>
        )}
      </div>

      {isOrderModalOpen && <OrderModal />}
    </div>
  );
}
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  LayoutDashboard, Plus, History, Bell, Search, Download, AlertCircle, 
  CheckCircle, Clock, Send, FileText, User, MoreHorizontal, Menu, X, 
  TrendingUp, Package, DollarSign, Settings, ChevronRight, Filter, 
  ArrowUpRight, ArrowDownRight, Briefcase, ChevronDown, Command
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, BarChart, Bar 
} from 'recharts';

const CHART_DATA = [
  { name: 'Jan', turnover: 85000, pipeline: 45000 },
  { name: 'Feb', turnover: 92000, pipeline: 52000 },
  { name: 'Mar', turnover: 108000, pipeline: 61000 },
  { name: 'Apr', turnover: 98000, pipeline: 75000 },
  { name: 'May', turnover: 115000, pipeline: 82000 },
  { name: 'Jun', turnover: 135000, pipeline: 95000 },
];

const MOCK_ORDERS = [
  { id: 'ORD-8095', client: 'AeroDynamics LLC', product: 'Aluminum Extrusion Profiles', amount: 12450, status: 'Pending Editor', date: '2026-06-18', priority: 'High' },
  { id: 'ORD-8094', client: 'Quantum Build', product: 'Titanium Fasteners', amount: 8900, status: 'In Production', date: '2026-06-17', priority: 'Medium' },
  { id: 'ORD-8093', client: 'Stellar Tech', product: 'Machined Casings', amount: 45000, status: 'Completed', date: '2026-06-16', priority: 'High' },
  { id: 'ORD-8092', client: 'TechCorp Solutions', product: 'Custom Steel Brackets', amount: 8200, status: 'Issue', date: '2026-06-15', priority: 'Urgent' },
  { id: 'ORD-8091', client: 'NexGen Motors', product: 'Alloy Wheels (Batch)', amount: 112000, status: 'In Production', date: '2026-06-14', priority: 'High' },
  { id: 'ORD-8088', client: 'BuildIt Inc', product: 'Industrial Fasteners (10k)', amount: 4100, status: 'Completed', date: '2026-06-12', priority: 'Low' },
  { id: 'ORD-8081', client: 'Global Manufacturing', product: 'Titanium Valves', amount: 35000, status: 'Completed', date: '2026-06-05', priority: 'Medium' },
];

const MOCK_CLIENTS = [
  { id: 'CLI-001', name: 'TechCorp Solutions', sector: 'Technology', totalOrders: 14, totalSpent: 145000, status: 'Active', accountManager: 'John Doe' },
  { id: 'CLI-002', name: 'AeroDynamics LLC', sector: 'Aerospace', totalOrders: 8, totalSpent: 82450, status: 'Active', accountManager: 'Jane Smith' },
  { id: 'CLI-003', name: 'BuildIt Inc', sector: 'Construction', totalOrders: 22, totalSpent: 56100, status: 'At Risk', accountManager: 'John Doe' },
  { id: 'CLI-004', name: 'Global Manufacturing', sector: 'Industrial', totalOrders: 45, totalSpent: 450000, status: 'Key Account', accountManager: 'Sarah Lee' },
];

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'issue', title: 'Production Delay', message: 'Order #ORD-8092 delayed: Material shortage.', time: '10m ago', read: false },
  { id: 2, type: 'success', title: 'Order Completed', message: 'Order #ORD-8088 ready for shipping.', time: '1h ago', read: false },
  { id: 3, type: 'info', title: 'Quote Approved', message: 'Editor approved quotation #QT-102.', time: '3h ago', read: true },
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
};

const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // High-performance toast handler
  const triggerToast = useCallback((title, message, type = 'success') => {
    setToast({ title, message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // Keyboard shortcut listener for efficient navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // In a real app, this would open a command palette
        triggerToast('Command Palette', 'Global search shortcut triggered.', 'info');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerToast]);

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Toast Notification System */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-white border border-slate-200 shadow-xl rounded-xl p-4 pr-12 flex items-start gap-3 relative min-w-[300px]">
            {toast.type === 'success' && <CheckCircle className="text-emerald-500 mt-0.5" size={20} />}
            {toast.type === 'info' && <Bell className="text-blue-500 mt-0.5" size={20} />}
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">{toast.title}</h4>
              <p className="text-slate-500 text-sm mt-0.5">{toast.message}</p>
            </div>
            <button onClick={() => setToast(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Enterprise Navigation Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 w-72 bg-white border-r border-slate-200 flex flex-col z-40 transition-transform duration-300 ease-in-out",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-inner shadow-indigo-400/20">
              <Briefcase size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">FuturaLabs<span className="text-indigo-600">.</span></span>
          </div>
        </div>

        <div className="px-4 py-6">
          <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Main Menu</p>
          <nav className="space-y-1">
            <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active={activeView === 'dashboard'} onClick={() => { setActiveView('dashboard'); setSidebarOpen(false); }} />
            <NavItem icon={<Package size={18} />} label="Order Pipeline" active={activeView === 'orders'} badge="12" onClick={() => { setActiveView('orders'); setSidebarOpen(false); }} />
            <NavItem icon={<User size={18} />} label="Client CRM" active={activeView === 'crm'} onClick={() => { setActiveView('crm'); setSidebarOpen(false); }} />
          </nav>

          <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-8 mb-2">Workspace</p>
          <nav className="space-y-1">
            <NavItem icon={<Plus size={18} />} label="Create New Order" active={activeView === 'new'} onClick={() => { setActiveView('new'); setSidebarOpen(false); }} />
            <NavItem icon={<FileText size={18} />} label="Quotations" active={false} onClick={() => triggerToast('Module Locked', 'Quotations module requires Enterprise plan.', 'info')} />
            <NavItem icon={<History size={18} />} label="Reports" active={false} onClick={() => triggerToast('Generating', 'Your period report is being generated.', 'info')} />
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-200">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" className="w-10 h-10 rounded-full border border-slate-200" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">John Sales</p>
              <p className="text-xs text-slate-500 truncate">National Acct Mgr</p>
            </div>
            <Settings size={18} className="text-slate-400" />
          </div>
        </div>
      </aside>

      {/* Main App Workspace */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Top Header - High Efficiency Search & Actions */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 z-20 shrink-0 sticky top-0">
          <div className="flex items-center gap-4 flex-1">
            <button className="lg:hidden text-slate-500 hover:text-slate-900 p-2 -ml-2" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            
            {/* Enterprise Search Bar */}
            <div className="hidden sm:flex items-center relative max-w-md w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search orders, clients, or ID..." 
                className="w-full pl-10 pr-12 py-2 bg-slate-100/50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <kbd className="hidden lg:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-white border border-slate-200 rounded"><Command size={10} className="mr-0.5"/>K</kbd>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-5">
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors" onClick={() => triggerToast('Synced', 'All offline data has been synced to the server.')}>
              <Clock size={14} /> Synced just now
            </button>
            <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
            
            <NotificationCenter />
            
            <button 
              onClick={() => setActiveView('new')}
              className="hidden lg:flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 transition-all active:scale-95"
            >
              <Plus size={16} /> New Order
            </button>
          </div>
        </header>

        {/* Dynamic View Controller */}
        <div className="flex-1 overflow-y-auto bg-slate-50/50 scroll-smooth">
          <div className="p-4 lg:p-8 max-w-[1400px] mx-auto min-h-full">
            {activeView === 'dashboard' && <DashboardView triggerToast={triggerToast} />}
            {activeView === 'orders' && <OrderPipelineView triggerToast={triggerToast} />}
            {activeView === 'crm' && <ClientCRMView triggerToast={triggerToast} />}
            {activeView === 'new' && <NewOrderEnterpriseForm triggerToast={triggerToast} onSubmit={() => setActiveView('orders')} />}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, badge, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
        active 
          ? "bg-indigo-50 text-indigo-700" 
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      <div className="flex items-center gap-3">
        <span className={active ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"}>
          {icon}
        </span>
        {label}
      </div>
      {badge && (
        <span className={cn(
          "px-2 py-0.5 rounded-full text-[10px] font-bold",
          active ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"
        )}>
          {badge}
        </span>
      )}
    </button>
  );
}

function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button 
        className="p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-full transition-colors relative"
        onClick={() => setOpen(!open)}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-sm">
              <h3 className="font-semibold text-slate-900">Notifications</h3>
              <span className="text-xs font-medium text-slate-500 hover:text-indigo-600 cursor-pointer transition-colors">Mark all as read</span>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {MOCK_NOTIFICATIONS.map(notif => (
                <div key={notif.id} className={cn(
                  "p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer flex gap-3 transition-colors",
                  !notif.read && "bg-indigo-50/30"
                )}>
                  <div className="mt-0.5 shrink-0">
                    {notif.type === 'issue' && <AlertCircle size={18} className="text-rose-500" />}
                    {notif.type === 'success' && <CheckCircle size={18} className="text-emerald-500" />}
                    {notif.type === 'info' && <Bell size={18} className="text-indigo-500" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{notif.title}</p>
                    <p className="text-sm text-slate-600 mt-0.5 leading-snug">{notif.message}</p>
                    <p className="text-xs text-slate-400 mt-2">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 text-center border-t border-slate-100 bg-slate-50/50">
              <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All Activity</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function DashboardView({ triggerToast }) {
  // Memoized stats to prevent recalculation on superficial renders
  const stats = useMemo(() => ({
    turnover: MOCK_ORDERS.filter(o => o.status === 'Completed').reduce((sum, o) => sum + o.amount, 0),
    pipeline: MOCK_ORDERS.filter(o => o.status !== 'Completed' && o.status !== 'Issue').reduce((sum, o) => sum + o.amount, 0),
    issues: MOCK_ORDERS.filter(o => o.status === 'Issue').length
  }), []);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Sales Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time performance metrics and pipeline monitoring.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm flex items-center gap-2">
            <Filter size={16} /> Filter
          </button>
          <button 
            onClick={() => triggerToast('Report Generated', 'Your PDF turnover report is downloading.', 'success')}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm flex items-center gap-2"
          >
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* KPI Grid - Enterprise Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard 
          title="Monthly Turnover" value={formatCurrency(stats.turnover)} trend="+12.5%" trendUp={true} 
          icon={<DollarSign size={20} />} color="emerald" subtitle="vs last month"
        />
        <StatCard 
          title="Active Pipeline" value={formatCurrency(stats.pipeline)} trend="+8.2%" trendUp={true} 
          icon={<TrendingUp size={20} />} color="indigo" subtitle="Across 14 active deals"
        />
        <StatCard 
          title="Completed Orders" value="142" trend="+15" trendUp={true} 
          icon={<Package size={20} />} color="blue" subtitle="Year to date"
        />
        <StatCard 
          title="Production Issues" value={stats.issues.toString()} trend="-2" trendUp={true} 
          icon={<AlertCircle size={20} />} color="rose" subtitle="Requires attention"
        />
      </div>

      {/* Chart & Tables Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Analytics Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">Revenue & Pipeline Trend</h3>
              <p className="text-xs text-slate-500 mt-1">6-month rolling forecast</p>
            </div>
            <select className="text-sm border-slate-200 rounded-lg text-slate-600 bg-slate-50 py-1.5 pl-3 pr-8 focus:ring-indigo-500 focus:border-indigo-500">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTurnover" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPipeline" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `$${val/1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Area type="monotone" dataKey="pipeline" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorPipeline)" name="Pipeline" />
                <Area type="monotone" dataKey="turnover" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorTurnover)" name="Turnover" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Action List */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
            <h3 className="font-semibold text-slate-900">Priority Attention</h3>
            <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-1 rounded-full">2 Action Items</span>
          </div>
          <div className="flex-1 p-2 overflow-y-auto">
            {MOCK_ORDERS.filter(o => o.priority === 'Urgent' || o.status === 'Issue').map(order => (
              <div key={order.id} className="p-4 hover:bg-slate-50 rounded-xl transition-colors group cursor-pointer border border-transparent hover:border-slate-100">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <AlertCircle size={10} /> {order.status}
                  </span>
                  <span className="text-xs font-medium text-slate-500">{order.id}</span>
                </div>
                <h4 className="font-semibold text-slate-900 text-sm">{order.client}</h4>
                <p className="text-sm text-slate-500 truncate mt-0.5">{order.product}</p>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-900">{formatCurrency(order.amount)}</span>
                  <button className="text-indigo-600 font-medium text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Resolve <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ))}
            
            {/* Additional info block */}
            <div className="p-4 mt-2 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <h4 className="text-sm font-semibold text-indigo-900 mb-1">Editor Note</h4>
              <p className="text-xs text-indigo-700 leading-relaxed">Raw material shipment for Steel Brackets is delayed by 48h. Adjusting client expectations recommended.</p>
            </div>
          </div>
        </div>

      </div>
      
      {/* Mini Data Table Overview */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-slate-900">Recent Deals</h3>
            <p className="text-xs text-slate-500 mt-0.5">Latest entered into the system</p>
          </div>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            View Pipeline <ChevronRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Product Line</th>
                <th className="px-6 py-4">Value</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ORDERS.slice(0,4).map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{order.id}</td>
                  <td className="px-6 py-4">{order.client}</td>
                  <td className="px-6 py-4">{order.product}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{formatCurrency(order.amount)}</td>
                  <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function OrderPipelineView({ triggerToast }) {
  const [filter, setFilter] = useState('All');
  
  // Memoize filtered results for performance
  const displayOrders = useMemo(() => {
    if (filter === 'All') return MOCK_ORDERS;
    return MOCK_ORDERS.filter(o => o.status.includes(filter));
  }, [filter]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Order Pipeline</h1>
        <p className="text-sm text-slate-500 mt-1">Manage active orders, track production status, and view history.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex-1 flex flex-col overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {['All', 'Pending', 'Production', 'Completed', 'Issue'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                  filter === f ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Filter orders..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
            <button className="p-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 bg-white" title="Advanced Filters">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Enterprise Data Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-slate-500 uppercase text-[11px] font-bold tracking-wider sticky top-0 shadow-sm z-10">
              <tr>
                <th className="px-6 py-4 border-b border-slate-200">
                  <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                </th>
                <th className="px-6 py-4 border-b border-slate-200 cursor-pointer hover:text-slate-700">Order ID</th>
                <th className="px-6 py-4 border-b border-slate-200 cursor-pointer hover:text-slate-700">Client</th>
                <th className="px-6 py-4 border-b border-slate-200">Product / Details</th>
                <th className="px-6 py-4 border-b border-slate-200 cursor-pointer hover:text-slate-700">Value</th>
                <th className="px-6 py-4 border-b border-slate-200">Date Logged</th>
                <th className="px-6 py-4 border-b border-slate-200">Status</th>
                <th className="px-6 py-4 border-b border-slate-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {displayOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 opacity-50 group-hover:opacity-100" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                        {order.client.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-700">{order.client}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{order.product}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{formatCurrency(order.amount)}</td>
                  <td className="px-6 py-4 text-slate-500">{order.date}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => triggerToast('Generating PDF', `Downloading quotation for ${order.id}...`, 'info')}
                      className="text-slate-400 hover:text-indigo-600 p-1 transition-colors" 
                      title="Download PDF"
                    >
                      <Download size={18} />
                    </button>
                    <button className="text-slate-400 hover:text-slate-700 p-1 ml-2 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {displayOrders.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              <Package size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-lg font-medium text-slate-900">No orders found</p>
              <p className="text-sm mt-1">Adjust your filters or create a new order.</p>
            </div>
          )}
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between text-sm text-slate-500">
          <span>Showing {displayOrders.length} of {MOCK_ORDERS.length} entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientCRMView() {
  const [selectedClient, setSelectedClient] = useState(MOCK_CLIENTS[0]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Client CRM</h1>
        <p className="text-sm text-slate-500 mt-1">Manage accounts, review lifetime value, and historical order data.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[600px]">
        
        {/* Client Directory */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search clients..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {MOCK_CLIENTS.map((client) => (
              <button
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className={cn(
                  "w-full text-left p-4 rounded-xl transition-all mb-1 border",
                  selectedClient.id === client.id 
                    ? "bg-indigo-50 border-indigo-200 shadow-sm" 
                    : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200"
                )}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-slate-900">{client.name}</h4>
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                    client.status === 'Key Account' ? 'bg-amber-100 text-amber-700' :
                    client.status === 'At Risk' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                  )}>
                    {client.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{client.sector}</p>
                <div className="mt-3 flex justify-between text-sm items-end">
                  <div>
                    <p className="text-slate-400 text-xs">LTV</p>
                    <p className="font-semibold text-slate-900">{formatCurrency(client.totalSpent)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-xs">Orders</p>
                    <p className="font-medium text-slate-700">{client.totalOrders}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Client Detail Pane */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
          {/* Detail Header */}
          <div className="p-6 lg:p-8 border-b border-slate-200 bg-slate-50/30">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl font-bold shadow-inner">
                  {selectedClient.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedClient.name}</h2>
                  <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                    <Briefcase size={14} /> {selectedClient.sector} • Acct Mgr: {selectedClient.accountManager}
                  </p>
                </div>
              </div>
              <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Total Lifetime Value</p>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(selectedClient.totalSpent)}</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-slate-900">{selectedClient.totalOrders}</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Avg Order Value</p>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(selectedClient.totalSpent / selectedClient.totalOrders)}</p>
              </div>
            </div>
          </div>

          {/* History List */}
          <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">Order History</h3>
              <button className="text-sm font-medium text-indigo-600 hover:underline">View Full Ledger</button>
            </div>
            
            <div className="space-y-3">
              {MOCK_ORDERS.filter(o => o.client === selectedClient.name || selectedClient.name === 'TechCorp Solutions').map((order, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:shadow-md transition-shadow bg-white">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{order.id}</p>
                      <p className="text-sm text-slate-500 mt-0.5">{order.product}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-slate-400 mb-0.5">Value</p>
                      <span className="font-semibold text-slate-900">{formatCurrency(order.amount)}</span>
                    </div>
                    <div className="w-32 text-right">
                      <StatusBadge status={order.status} />
                      <p className="text-[11px] text-slate-400 mt-1">{order.date}</p>
                    </div>
                    <button className="text-slate-400 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 p-2 rounded-lg transition-colors">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function NewOrderEnterpriseForm({ triggerToast, onSubmit }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ client: '', product: '', qty: 1, price: 0 });

  const handleNext = () => {
    if (step === 1 && !formData.client) return triggerToast('Error', 'Please select a client.', 'issue');
    if (step === 2 && !formData.product) return triggerToast('Error', 'Please configure the product.', 'issue');
    setStep(s => s + 1);
  };

  const handleSubmit = () => {
    triggerToast('Order Submitted', 'Order recorded and automatically routed to the Editor.', 'success');
    onSubmit();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Create New Order</h1>
        <p className="text-sm text-slate-500 mt-1">Configure products, apply pricing, and generate quotations instantly.</p>
      </div>

      {/* Progress Tracker */}
      <div className="flex items-center mb-8">
        {[
          { num: 1, label: 'Client Details' },
          { num: 2, label: 'Product Config' },
          { num: 3, label: 'Review & Quote' }
        ].map((s, idx) => (
          <React.Fragment key={s.num}>
            <div className="flex flex-col items-center relative">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 z-10",
                step >= s.num ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white border-slate-200 text-slate-400"
              )}>
                {step > s.num ? <CheckCircle size={16} /> : s.num}
              </div>
              <span className={cn(
                "absolute top-10 text-xs font-semibold whitespace-nowrap",
                step >= s.num ? "text-slate-900" : "text-slate-400"
              )}>{s.label}</span>
            </div>
            {idx < 2 && (
              <div className={cn(
                "flex-1 h-0.5 mx-4 transition-colors",
                step > idx + 1 ? "bg-indigo-600" : "bg-slate-200"
              )} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mt-8">
        
        {/* Step 1: Client */}
        {step === 1 && (
          <div className="p-6 lg:p-8 animate-in slide-in-from-right-4 fade-in">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Select or Create Client</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Search Existing Account *</label>
                <select 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                  onChange={(e) => setFormData({...formData, client: e.target.value})}
                  value={formData.client}
                >
                  <option value="">Select a client...</option>
                  {MOCK_CLIENTS.map(c => <option key={c.id} value={c.name}>{c.name} ({c.id})</option>)}
                </select>
              </div>
              
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-slate-500">Or enter new details</span></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                  <input type="text" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none placeholder-slate-400" placeholder="e.g. Acme Corp" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contact Email</label>
                  <input type="email" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none placeholder-slate-400" placeholder="contact@acme.com" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Product */}
        {step === 2 && (
          <div className="p-6 lg:p-8 animate-in slide-in-from-right-4 fade-in">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Product Configuration</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Product Line *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Aluminum Extrusion Profiles', 'Custom Steel Brackets', 'Titanium Valves', 'Machined Casings'].map(prod => (
                    <button 
                      key={prod}
                      onClick={() => setFormData({...formData, product: prod, price: 5000})}
                      className={cn(
                        "p-4 border rounded-xl text-left transition-all",
                        formData.product === prod ? "border-indigo-600 bg-indigo-50 shadow-sm" : "border-slate-200 hover:border-slate-300 bg-white"
                      )}
                    >
                      <h4 className="font-semibold text-slate-900 text-sm">{prod}</h4>
                      <p className="text-xs text-slate-500 mt-1">Standard industrial spec.</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                  <input 
                    type="number" 
                    min="1"
                    value={formData.qty}
                    onChange={(e) => setFormData({...formData, qty: parseInt(e.target.value) || 1})}
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Customizations</label>
                  <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none">
                    <option>Standard Finish</option>
                    <option>Anodized</option>
                    <option>Powder Coated</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="p-6 lg:p-8 animate-in slide-in-from-right-4 fade-in bg-slate-50/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Review & Generate</h3>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-200">Draft Status</span>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6">
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div className="text-slate-500">Client</div>
                <div className="font-medium text-slate-900 text-right">{formData.client}</div>
                
                <div className="text-slate-500">Product Line</div>
                <div className="font-medium text-slate-900 text-right">{formData.product}</div>
                
                <div className="text-slate-500">Quantity x Base</div>
                <div className="font-medium text-slate-900 text-right">{formData.qty} x $5,000</div>
                
                <div className="col-span-2 border-t border-slate-100 my-2"></div>
                
                <div className="text-slate-700 font-semibold text-lg">Estimated Total</div>
                <div className="font-bold text-indigo-600 text-xl text-right">{formatCurrency(formData.qty * 5000)}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => triggerToast('Generated', 'Quotation PDF has been downloaded.', 'success')}
                className="flex-1 px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <FileText size={18} /> Preview Quotation PDF
              </button>
              <button 
                onClick={handleSubmit}
                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2"
              >
                <Send size={18} /> Submit to Editor
              </button>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between">
          <button 
            disabled={step === 1}
            onClick={() => setStep(s => s - 1)}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 disabled:opacity-30 transition-colors"
          >
            Back
          </button>
          
          {step < 3 && (
            <button 
              onClick={handleNext}
              className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              Next Step <ChevronRight size={16} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, trend, trendUp, icon, color, subtitle }) {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-700',
    indigo: 'bg-indigo-100 text-indigo-700',
    emerald: 'bg-emerald-100 text-emerald-700',
    rose: 'bg-rose-100 text-rose-700',
  };

  return (
    <div className="bg-white p-5 lg:p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start">
        <div className={cn("p-2.5 rounded-xl transition-colors", colorMap[color], "group-hover:bg-opacity-80")}>
          {icon}
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1", 
            trendUp ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          )}>
            {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
        <div className="flex items-center gap-2 mt-1">
          <h4 className="text-slate-500 font-medium text-sm">{title}</h4>
          {subtitle && <span className="text-[10px] text-slate-400 hidden lg:inline-block border-l border-slate-300 pl-2">{subtitle}</span>}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const configs = {
    'Pending Editor': { style: "bg-amber-50 text-amber-700 border-amber-200", icon: <Clock size={12} className="mr-1.5" /> },
    'In Production': { style: "bg-blue-50 text-blue-700 border-blue-200", icon: <Settings size={12} className="mr-1.5 animate-spin" /> },
    'Completed': { style: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <CheckCircle size={12} className="mr-1.5" /> },
    'Issue': { style: "bg-rose-50 text-rose-700 border-rose-200", icon: <AlertCircle size={12} className="mr-1.5" /> },
  };

  const config = configs[status] || { style: "bg-slate-50 text-slate-700 border-slate-200", icon: null };

  return (
    <span className={cn("inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border shadow-sm", config.style)}>
      {config.icon}
      {status}
    </span>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { 
  Bell, Menu, Home, Globe, HeadphonesIcon, Send, Mail, ShieldCheck,
  Calendar, CheckCircle, EyeOff, FileText,
  CreditCard, Settings, Bookmark,
  ChevronDown, Hexagon, Package, ArrowUpRight, ArrowDownRight, Award, Share2, Rocket, ArrowUpCircle, Compass
} from "lucide-react";
import MintModal from "@/components/MintModal";

export default function DesktopDashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("My");

  // Wallet State
  const [userWallet, setUserWallet] = useState<string>("******");
  const [walletBalance, setWalletBalance] = useState<string>("0.00");
  
  // NFT State
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);
  const [myNfts, setMyNfts] = useState<any[]>([]);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("tf_user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed.walletAddress) {
          setUserWallet(parsed.walletAddress);
          fetchBalance(parsed.walletAddress);
          fetchNfts(parsed.walletAddress);
        }
      }
    } catch { }
  }, []);

  const fetchNfts = async (wallet: string) => {
    try {
      const res = await fetch(`/api/nfts?ownerWallet=${wallet}`);
      const data = await res.json();
      if (data.success && data.nfts) {
        setMyNfts(data.nfts);
      }
    } catch (err) {
      console.error("Failed to fetch user NFTs:", err);
    }
  };

  const fetchBalance = async (address: string) => {
    try {
      if (address.startsWith("0x")) {
        // EVM
        const win = window as any;
        if (win.ethereum) {
          const balHex = await win.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] });
          const ethVal = (parseInt(balHex, 16) / 1e18).toFixed(4);
          setWalletBalance(ethVal);
        }
      } else {
        // Solana
        const res = await fetch("https://api.mainnet-beta.solana.com", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0", id: 1,
            method: "getBalance",
            params: [address]
          })
        });
        const data = await res.json();
        if (data && data.result) {
          const solVal = (data.result.value / 1e9).toFixed(4);
          setWalletBalance(solVal);
        }
      }
    } catch (err) {
      console.error("Failed to fetch balance:", err);
    }
  };

  const getMaskedWallet = (wallet: string) => {
    if (!wallet || wallet === "******") return "******";
    return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;
  };
  
  // Custom SVG Icons mimicking the app
  const CoinT = () => (
    <div className="w-5 h-5 rounded-full bg-[#1dbca5] text-white flex items-center justify-center font-bold text-[10px] shadow-sm transform scale-110 shrink-0">
      T
    </div>
  );
  
  const BoxIcon = () => (
    <div className="w-6 h-6 text-cyan-400 relative flex items-center justify-center shrink-0">
      <Package size={22} className="opacity-90 drop-shadow-sm" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f1f8fc] text-slate-800 font-sans selection:bg-teal-100 relative overflow-x-hidden">
      
      {/* Mint Modal Overlay */}
      <MintModal 
        isOpen={isMintModalOpen} 
        onClose={() => setIsMintModalOpen(false)} 
        walletAddress={userWallet}
        onSuccess={(newNft) => setMyNfts(prev => [newNft, ...prev])}
      />

      {/* Background Gradient Effect matching mobile app background */}
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-br from-[#d4f8f4] via-[#e2f0fb] to-[#f4ebe6] opacity-90 border-none -z-10" />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-[68px] bg-white/60 backdrop-blur-md border-b justify-center border-white/50 flex flex-row items-center px-8 z-40 shadow-sm">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer">
            {/* Logo Box */}
            <div className="w-9 h-9 rounded-lg relative shadow-md flex items-center justify-center bg-gradient-to-br from-[#f8fdff] to-[#d6effd] border border-white">
                <div className="absolute -left-1.5 -bottom-1.5 shadow-sm">
                <div className="w-4.5 h-4.5 bg-[#fcd436] rounded-full border border-white flex items-center justify-center">
                    <span className="text-[10px] text-slate-700">â˜ºï¸Ž</span>
                </div>
                </div>
                <Package className="text-[#64d0f6]" size={22} />
            </div>
            <span className="text-[22px] font-extrabold tracking-tight text-slate-900 mt-0.5">
                Quantum <span className="font-semibold text-slate-600">NFT</span>
            </span>
            </div>

            {/* Right Nav */}
            <div className="flex items-center gap-6 relative">
            <button className="flex items-center font-semibold gap-1.5 hover:bg-white/50 px-3 py-1.5 rounded-full transition-colors">
                <div className="relative">
                <Bell size={22} className="text-slate-700" strokeWidth={2.5} />
                <div className="absolute -top-0.5 -right-0.5 w-[10px] h-[10px] bg-[#f95741] rounded-full border-2 border-white"></div>
                </div>
                <span className="ml-1 text-[#64d0f6] text-[17px] tracking-wide relative">
                    Airdrop
                    <div className="absolute -bottom-1 left-0 w-full border-b-[2px] border-dotted border-[#fcd436]/60"></div>
                </span>
            </button>
            
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="p-2 hover:bg-white/50 rounded-full transition relative">
                <Menu size={32} className="text-slate-800" strokeWidth={2} />
            </button>

            {/* Nav Dropdown (Screenshot 2) */}
            {isDropdownOpen && (
                <div className="absolute top-[60px] right-0 w-[240px] bg-white shadow-2xl rounded-[16px] border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
                <NavItem icon={<Home size={20} strokeWidth={2.5}/>} label="Home" />
                <NavItem icon={<Globe size={20} strokeWidth={2.5}/>} label="Language" />
                <NavItem icon={<HeadphonesIcon size={20} strokeWidth={2.5}/>} label="Service" />
                <NavItem icon={<Send size={20} className="fill-blue-500 text-blue-500" />} label="Telegram" />
                <NavItem icon={<Mail size={20} strokeWidth={2.5}/>} label="Internal Message" />
                <NavItem icon={<ShieldCheck size={20} strokeWidth={2.5}/>} label="Security TAP" />
                </div>
            )}
            </div>
        </div>
      </header>

      <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex gap-8 pb-12 items-start">
        
        {/* SIDEBAR (Desktop specific adaptation from bottom nav) */}
        <div className="hidden lg:flex w-64 shrink-0 flex-col gap-2 sticky top-24">
           {/* Sidebar branding / quick stats */}
           <div className="mb-4 px-4 hidden">
             <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Navigation</h2>
           </div>

           <SidebarItem 
              icon={<Hexagon size={24} strokeWidth={2}/>} 
              label="Stake" 
              active={activeTab === 'Stake'} 
              onClick={() => setActiveTab('Stake')} 
           />
           <SidebarItem 
              icon={<ArrowUpRight size={24} strokeWidth={2}/>} 
              label="Earn" 
              active={activeTab === 'Earn'} 
              onClick={() => setActiveTab('Earn')} 
           />
           <SidebarItem 
              icon={<Package size={24} strokeWidth={2}/>} 
              label="Reserve" 
              active={activeTab === 'Reserve'} 
              onClick={() => setActiveTab('Reserve')} 
           />
           <SidebarItem 
              icon={<CreditCard size={24} strokeWidth={2}/>} 
              label="Assets" 
              active={activeTab === 'Assets'} 
              onClick={() => setActiveTab('Assets')} 
           />
           <SidebarItem 
              icon={<FileText size={24} strokeWidth={2}/>} 
              label="My" 
              active={activeTab === 'My'} 
              onClick={() => setActiveTab('My')} 
           />
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="flex-1 space-y-6 w-full max-w-full min-w-0">
          
          {activeTab === 'My' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* USER PROFILE SUMMARY ROW (Screenshot 1 top portion) */}
              <div className="bg-transparent flex flex-row items-start justify-between px-2 mb-2">
              <div className="flex items-center gap-5">
                {/* Avatar ring */}
                <div className="w-[84px] h-[84px] shrink-0 rounded-full p-[3px] bg-gradient-to-tr from-[#64d0f6] via-white to-[#f0b5d9] shadow-md">
                  <div className="w-full h-full rounded-full border-2 border-white bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden relative shadow-inner">
                    <img src="https://picsum.photos/100/100" className="w-full h-full object-cover opacity-80" alt="avatar"/>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 flex-wrap">
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-[#1f2833] text-2xl tracking-tight">{getMaskedWallet(userWallet)}</span>
                    {/* Badge */}
                    <div className="bg-[#fff9e6] text-[#df9a00] p-1 rounded-md shadow-sm border border-[#fde8a0]">
                      <ShieldCheck size={16} strokeWidth={3} className="fill-[#fecf52] text-[#fff9e6]" />
                    </div>
                    <EyeOff size={18} className="text-slate-400" strokeWidth={2.5}/>
                  </div>
                  <div className="text-[13px] text-slate-500 font-semibold tracking-wide flex items-center gap-1">
                    UID : <span className="text-slate-700">{userWallet !== "******" ? userWallet.substring(userWallet.length - 6) : "******"}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    <button className="bg-white/80 hover:bg-white text-slate-700 text-sm font-semibold px-4 py-1.5 rounded-full border border-slate-200/60 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] transition-all flex items-center gap-2">
                       <Award size={16} className="text-orange-400" /> 
                       <span>Level 1</span> 
                       <ChevronDown size={14} className="-rotate-90 text-slate-400" />
                    </button>
                    <button className="bg-white/80 hover:bg-white text-slate-700 text-sm font-semibold px-4 py-1.5 rounded-full border border-slate-200/60 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] transition-all flex items-center gap-2">
                       <span className="text-slate-600">1025 Points</span> 
                       <ChevronDown size={14} className="-rotate-90 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>
              <button className="p-3 bg-white/40 hover:bg-white/80 rounded-2xl transition border border-transparent hover:border-slate-200 shadow-sm mt-1">
                <Calendar size={24} className="text-slate-700" strokeWidth={2}/>
              </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start w-full">

              {/* LEFT COLUMN: Data Stats */}
              <div className="xl:col-span-5 flex flex-col gap-6 w-full min-w-0">
                  
                  {/* Wallet & Balances Card (Screenshot 1 middle) */}
                  <div className="bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-xl rounded-[28px] shadow-[0_8px_30px_-12px_rgba(0,20,40,0.08)] border border-white p-7 flex flex-col gap-7 w-full overflow-hidden relative">
                    
                    <div className="flex flex-col gap-1.5 z-10 w-full min-w-0">
                        <div className="text-slate-500 text-[15px] font-semibold tracking-wide">Wallet Balance {userWallet !== "******" && (userWallet.startsWith("0x") ? "(ETH)" : "(SOL)")}</div>
                        <div className="flex items-center gap-3 truncate">
                        <CoinT />
                        <span className="font-extrabold text-[28px] text-[#1f2833] tracking-tight truncate w-full">{walletBalance}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 z-10 w-full min-w-0">
                        <div className="text-slate-500 text-[15px] font-semibold tracking-wide">QNFT Balance</div>
                        <div className="flex items-center gap-3 truncate">
                        <BoxIcon />
                        <span className="font-extrabold text-[28px] text-[#1f2833] tracking-tight truncate w-full">1,333,488</span>
                        </div>
                    </div>
                    
                    {/* Income Table */}
                    <div className="mt-2 w-full">
                        <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 gap-y-4 mb-4 font-bold text-slate-500 text-sm border-b border-slate-100/80 pb-4">
                            <div className="w-[110px]"></div>
                            <div className="text-right w-[100px]">Daily income</div>
                            <div className="text-right w-[110px]">Total income</div>
                        </div>
                        <div className="flex flex-col gap-5 w-full">
                            {[
                                { label: "Comprehensive", daily: "0.0", total: "1233547.8", type: "t" },
                                { label: "Reserve", daily: "0.0", total: "2747.8", type: "t" },
                                { label: "Team", daily: "0.0", total: "0.0", type: "t" },
                                { label: "Activity", daily: "0.0", total: "0.0", type: "t" },
                                { label: "Earn", daily: "0.0", total: "0.0", type: "t" },
                                { label: "Bid", daily: "0.0", total: "0.0", type: "t" },
                                { label: "Stake", daily: "0.0", total: "1230800.0", type: "box" },
                            ].map((item, i) => (
                            <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-x-6 gap-y-0 items-center justify-between font-extrabold text-[#111820] text-[15px]">
                                <div className="text-left text-[#3d4955] font-semibold truncate w-[110px]">{item.label}</div>
                                <div className="flex items-center justify-end gap-2 w-[100px]">
                                    {item.type === 't' ? <CoinT /> : <BoxIcon />}
                                    <span className="truncate">{item.daily}</span>
                                </div>
                                <div className="flex items-center justify-end gap-2 w-[110px]">
                                    {item.type === 't' ? <CoinT /> : <BoxIcon />}
                                    <span className="truncate">{item.total}</span>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                  </div>

              </div>
              
              {/* RIGHT COLUMN: Overviews, Teams, Functions */}
              <div className="xl:col-span-7 flex flex-col gap-6 w-full min-w-0">
                  
                  {/* My Team (Screenshot 3) */}
                  <div className="bg-white/90 backdrop-blur-xl rounded-[28px] shadow-[0_8px_30px_-12px_rgba(0,20,40,0.08)] border border-white p-6 sm:p-8 w-full">
                    <div className="text-[19px] font-extrabold text-[#1f2833] tracking-tight mb-8">My Team</div>
                    
                    <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center mb-10 w-full">
                        <div className="flex flex-col h-full bg-[#f8fbff] rounded-xl p-3 sm:p-4 border border-blue-50">
                            <div className="text-2xl font-extrabold text-[#111820] mb-2 truncate">0</div>
                            <div className="text-[#647184] font-semibold text-[13px] leading-snug">Community<br/>rewards</div>
                        </div>
                        <div className="flex flex-col h-full bg-[#f8fbff] rounded-xl p-3 sm:p-4 border border-blue-50">
                            <div className="text-2xl font-extrabold text-[#111820] mb-2 truncate">0</div>
                            <div className="text-[#647184] font-semibold text-[13px] leading-snug">Valid<br/>Members</div>
                        </div>
                        <div className="flex flex-col h-full bg-[#f8fbff] rounded-xl p-3 sm:p-4 border border-blue-50">
                            <div className="text-2xl font-extrabold text-[#111820] mb-2 truncate">0</div>
                            <div className="text-[#647184] font-semibold text-[13px] leading-snug">A<br/>enthusiast</div>
                        </div>
                        <div className="flex flex-col h-full bg-[#f8fbff] rounded-xl p-3 sm:p-4 border border-blue-50">
                            <div className="text-2xl font-extrabold text-[#111820] mb-2 truncate">0</div>
                            <div className="text-[#647184] font-semibold text-[13px] leading-snug">B+C<br/>enthusiasts</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center w-full">
                        <TeamAction icon={<div className="w-12 h-12 bg-[#ebf7ff] text-[#4f9bed] rounded-full flex items-center justify-center shadow-inner"><Rocket size={24} strokeWidth={2}/></div>} label="Community enthusiasts" />
                        <TeamAction icon={<div className="w-12 h-12 bg-[#ebf7ff] text-[#4ea0ea] rounded-full flex items-center justify-center shadow-inner"><Award size={24} strokeWidth={2}/></div>} label="Community contribution" />
                        <TeamAction icon={<div className="w-12 h-12 bg-[#f0f8fd] text-[#6cbcf6] rounded-full flex items-center justify-center shadow-inner"><FileText size={24} strokeWidth={2}/></div>} label="Community orders" />
                        <TeamAction icon={<div className="w-12 h-12 bg-[#edfafd] text-[#55c0e1] rounded-full flex items-center justify-center shadow-inner"><Share2 size={24} strokeWidth={2}/></div>} label="Referral" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full min-w-0">
                      
                      {/* My Orders (Screenshot 3 & 4 elements) */}
                      <div className="bg-white/90 backdrop-blur-xl rounded-[28px] shadow-[0_8px_30px_-12px_rgba(0,20,40,0.08)] border border-white p-6 sm:p-8 w-full h-full flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-[19px] font-extrabold text-[#1f2833] tracking-tight">My Orders</div>
                            <button className="text-slate-400 text-sm font-semibold flex items-center gap-1 hover:text-slate-700 transition">
                            Check Orders <ChevronDown size={16} className="-rotate-90" strokeWidth={2.5}/>
                            </button>
                        </div>

                        <div className="grid grid-cols-4 gap-2 text-center mb-auto w-full px-2">
                            <div>
                                <div className="text-[22px] font-extrabold text-[#111820] mb-1">82</div>
                                <div className="text-[#647184] text-xs font-semibold">Orders</div>
                            </div>
                            <div>
                                <div className="text-[22px] font-extrabold text-[#111820] mb-1">0</div>
                                <div className="text-[#647184] text-xs font-semibold">Processing</div>
                            </div>
                            <div>
                                <div className="text-[22px] font-extrabold text-[#111820] mb-1">41</div>
                                <div className="text-[#647184] text-xs font-semibold">Bought</div>
                            </div>
                            <div>
                                <div className="text-[22px] font-extrabold text-[#111820] mb-1">41</div>
                                <div className="text-[#647184] text-xs font-semibold">Sold</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2 border-t border-slate-100/80 pt-6 mt-8 w-full px-2">
                            <QuickAction icon={<div className="text-[#67c3ce]"><ArrowUpCircle size={30} strokeWidth={1.5} /></div>} label="My Bid" />
                            <QuickAction icon={<div className="text-[#9fc1e2]"><FileText size={30} strokeWidth={1.5} /></div>} label="Details" />
                            <QuickAction icon={<div className="text-[#7bdcdf]"><CreditCard size={30} strokeWidth={1.5} /></div>} label="Deposit" />
                            <QuickAction icon={<div className="text-[#8cd9cc]"><ArrowDownRight size={30} strokeWidth={1.5} /></div>} label="Withdraw" />
                        </div>
                      </div>

                      {/* Common Functions (Screenshot 3) */}
                      <div className="bg-white/90 backdrop-blur-xl rounded-[28px] shadow-[0_8px_30px_-12px_rgba(0,20,40,0.08)] border border-white p-6 sm:p-8 w-full h-full flex flex-col">
                        <div className="text-[19px] font-extrabold text-[#1f2833] tracking-tight mb-8">Common Functions</div>
                        <div className="grid grid-cols-2 gap-y-10 gap-x-2 my-auto px-4 w-full">
                            <QuickAction icon={<div className="text-[#7bdcdf]"><Compass size={32} strokeWidth={1.5}/></div>} label="Tutorials" />
                            <QuickAction icon={<div className="text-[#65b2f1]"><Settings size={32} strokeWidth={1.5}/></div>} label="Settings" />
                            <QuickAction icon={<div className="text-[#8ce6d6]"><ArrowUpRight size={32} strokeWidth={1.5}/></div>} label="Mint" onClick={() => setIsMintModalOpen(true)} />
                            <QuickAction icon={<div className="text-[#7abdff]"><Bookmark size={32} strokeWidth={1.5}/></div>} label="Collection" />
                        </div>
                      </div>

                  </div>
              </div>
          </div>
          </div>
          )}

          {activeTab === 'Reserve' && <ReserveTabContent myNfts={myNfts} />}
          {activeTab === 'Stake' && <StakeTabContent myNfts={myNfts} />}
          {activeTab === 'Earn' && <EarnTabContent />}
          {activeTab === 'Assets' && <AssetsTabContent walletBalance={walletBalance} userWallet={userWallet} />}

        </div>
      </div>
    </div>
  );
}

// Sub Components 

function ReserveTabContent({ myNfts }: { myNfts: any[] }) {
  const [innerTab, setInnerTab] = useState("Today's");

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 w-full flex flex-col gap-6">
      <div className="bg-white/90 backdrop-blur-xl rounded-[28px] shadow-[0_8px_30px_-12px_rgba(0,20,40,0.08)] border border-white py-7 px-4 sm:px-7 w-full overflow-hidden min-h-[600px] flex flex-col">
        
        {/* Top 6 Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mb-10 w-full">
            <MetricCard title="Today Earnings" value="0" colorClass="bg-[#2ebcff]" />
            <MetricCard title="Cumulative Income" value="0" colorClass="bg-[#2fd49f]" />
            <MetricCard title="Team Benefits" value="0" colorClass="bg-[#b3becc]" />
            <MetricCard title="Reservation range" value="0~0" colorClass="bg-[#ff953f]" />
            <MetricCard title="Wallet Balance" value="0" colorClass="bg-[#48c9e5]" />
            <MetricCard title="Balance for Reservation" value="0" colorClass="bg-[#1f2b38]" />
        </div>

        {/* Tabs: Today's | Reserve | Collected */}
        <div className="flex items-center justify-around border-b border-slate-100/80 w-full mb-8">
            <button 
              onClick={() => setInnerTab("Today's")}
              className={`pb-4 text-[17px] font-bold relative transition-colors ${innerTab === "Today's" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
            >
                Today's
                {innerTab === "Today's" && (
                  <div className="absolute -bottom-[1px] left-0 w-full h-[3px] bg-gradient-to-r from-[#21c2a8] via-[#6ed8d4] to-[#fdb98a] rounded-t-sm"></div>
                )}
            </button>
            <button 
              onClick={() => setInnerTab("Reserve")}
              className={`pb-4 text-[17px] font-bold relative transition-colors ${innerTab === "Reserve" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
            >
                Reserve
                {innerTab === "Reserve" && (
                  <div className="absolute -bottom-[1px] left-0 w-full h-[3px] bg-gradient-to-r from-[#21c2a8] via-[#6ed8d4] to-[#fdb98a] rounded-t-sm"></div>
                )}
            </button>
            <button 
              onClick={() => setInnerTab("Collected")}
              className={`pb-4 text-[17px] font-bold relative transition-colors ${innerTab === "Collected" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
            >
                Collected
                {innerTab === "Collected" && (
                  <div className="absolute -bottom-[1px] left-0 w-full h-[3px] bg-gradient-to-r from-[#21c2a8] via-[#6ed8d4] to-[#fdb98a] rounded-t-sm"></div>
                )}
            </button>
        </div>

        {/* Empty State / Illustration or NFT Collection */}
        {innerTab === 'Collected' && myNfts.length > 0 ? (
          <div className="p-6 w-full min-h-[220px]">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {myNfts.map((nft) => (
                <div key={nft.id} className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col p-2 hover:shadow-md transition">
                  <div className="w-full h-24 bg-slate-100 rounded-lg overflow-hidden relative">
                    <img src={nft.imageUrl} alt={nft.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-2">
                    <h3 className="text-[14px] font-bold text-slate-800 truncate">{nft.name}</h3>
                    <p className="text-[12px] text-slate-400 truncate">{nft.collection}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center pt-8 pb-16">
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
              {/* Background glowing circle */}
              <div className="absolute w-[140px] h-[140px] bg-gradient-to-br from-[#e0f7f9] to-[#ebf1f9] rounded-full blur-xl"></div>
              
              {/* The clipboard/paper graphics */}
              <div className="relative z-10 bg-gradient-to-b from-white to-[#f4f9f9] border-[1.5px] border-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] rounded-xl w-[90px] h-[110px] p-3 flex flex-col gap-2.5 items-center justify-center transform -rotate-3">
                 <div className="w-12 h-1.5 bg-[#dbe8ed] rounded-full"></div>
                 <div className="w-16 h-1.5 bg-[#dbe8ed] rounded-full"></div>
                 <div className="w-14 h-1.5 bg-[#dbe8ed] rounded-full"></div>
                 <div className="w-16 h-1.5 bg-[#dbe8ed] rounded-full"></div>
              </div>
              
              {/* Secondary smaller floating paper */}
              <div className="absolute z-0 bg-white border border-white shadow-xl rounded-lg w-[45px] h-[55px] bottom-6 left-2 p-1.5 flex flex-col gap-1 items-start justify-center transform -rotate-12">
                 <div className="w-4 h-4 bg-[#bdf0ef] rounded-sm mb-1"></div>
                 <div className="w-6 h-1 bg-[#dbe8ed] rounded-full"></div>
                 <div className="w-8 h-1 bg-[#dbe8ed] rounded-full"></div>
                 <div className="w-5 h-1 bg-[#dbe8ed] rounded-full"></div>
              </div>

              {/* Sparkles/Stars */}
              <div className="absolute top-2 left-6 w-3 h-3 text-[#6bc8db]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L3 12l8.5-2.5z"/></svg>
              </div>
              <div className="absolute bottom-10 right-4 w-2 h-2 text-[#6bc8db] rotate-45">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L3 12l8.5-2.5z"/></svg>
              </div>
              
              {/* Red Cross Mark */}
              <div className="absolute -bottom-2 right-6 z-20">
                 <div className="w-14 h-14 bg-gradient-to-br from-[#ff6b6b] to-[#ff4757] rounded-full shadow-[0_8px_20px_rgba(255,71,87,0.4)] flex items-center justify-center font-bold text-white text-3xl">
                   &times;
                 </div>
              </div>
            </div>
            
            <h3 className="text-[17px] font-extrabold text-[#111820] tracking-tight mb-2">No Data Available</h3>
            <p className="text-[14px] font-bold text-[#647184] tracking-wide">(GMT+05:30) {(new Date()).toISOString().replace('T', ' ').substring(0, 19)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-6 py-[18px] rounded-2xl font-extrabold text-[17px] transition-all duration-200 outline-none ${
        active 
          ? "bg-white text-[#111820] shadow-[0_4px_20px_-8px_rgba(0,0,0,0.1)] border border-white scale-[1.03] transform" 
          : "text-slate-500 hover:bg-white/50 hover:text-slate-800 hover:scale-[1.01]"
      }`}
    >
      <div className={`transition-colors duration-200 ${active ? "text-[#1dc3b5]" : "text-slate-400"}`}>
        {icon}
      </div>
      <div className="tracking-wide">{label}</div>
    </button>
  );
}

function NavItem({ icon, label, className = "text-slate-700" }: any) {
  return (
    <button className={`w-full flex items-center gap-4 px-5 py-3 hover:bg-[#f1f8fc] transition-colors text-[15px] font-bold tracking-wide ${className}`}>
      {icon}
      {label}
    </button>
  );
}

// ================= STAKE TAB =================
function StakeTabContent({ myNfts }: { myNfts: any[] }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 w-full flex flex-col gap-6">
      <div className="bg-gradient-to-br from-[#1b1c2b] to-[#12141d] rounded-[28px] shadow-xl p-8 w-full relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[80px] -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-purple-500/20 rounded-full blur-[60px] -ml-10 -mb-10"></div>
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">NFT Staking</h2>
              <p className="text-slate-400 font-semibold mb-8 max-w-sm">Stake your Collectibles to generate daily passive QNFT yields.</p>
              
              <div className="flex gap-8 border-t border-slate-700/50 pt-6">
                 <div>
                    <div className="text-slate-400 text-sm font-bold mb-1">Total Staked</div>
                    <div className="text-2xl font-extrabold text-white">1,240 <span className="text-cyan-400 text-lg">QNFT/day</span></div>
                 </div>
                 <div>
                    <div className="text-slate-400 text-sm font-bold mb-1">Current APY</div>
                    <div className="text-2xl font-extrabold text-[#2fd49f]">124.5%</div>
                 </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col gap-4">
               <div className="flex justify-between items-center text-white font-bold">
                 <span>My Staking Pool</span>
                 <span className="text-cyan-400 text-sm">Reward: 0.00 QNFT</span>
               </div>
               
               <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-1/3 rounded-full"></div>
               </div>
               
               <button className="mt-2 w-full bg-white text-slate-900 font-bold py-3 rounded-xl hover:bg-slate-100 transition shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                 Claim Rewards
               </button>
            </div>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-xl rounded-[28px] shadow-[0_8px_30px_-12px_rgba(0,20,40,0.08)] border border-white p-7 w-full">
         <h3 className="text-[19px] font-extrabold text-[#1f2833] tracking-tight mb-6">Stakable Assets</h3>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {myNfts.length > 0 ? myNfts.map((nft) => (
              <div key={nft.id} className="bg-[#f8fbff] rounded-xl border border-blue-50 overflow-hidden flex flex-col p-2">
                <div className="w-full aspect-square bg-slate-100 rounded-lg overflow-hidden relative mb-3">
                  <img src={nft.imageUrl} alt={nft.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white px-2 py-1 flex items-center gap-1 rounded-md text-xs font-bold">
                    <Rocket size={12} className="text-cyan-400" /> +15/d
                  </div>
                </div>
                <div className="px-1 text-center font-bold text-slate-800 text-sm truncate mb-2">{nft.name}</div>
                <button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 rounded-lg text-sm transition">
                  Stake Now
                </button>
              </div>
            )) : (
              <div className="col-span-full py-10 flex flex-col items-center justify-center text-slate-400 font-bold text-sm">
                 <Package size={40} className="mb-3 opacity-20" />
                 No eligible NFTs found for staking.
              </div>
            )}
         </div>
      </div>
    </div>
  );
}

// ================= EARN TAB =================
function EarnTabContent() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 w-full flex flex-col gap-6">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white/90 backdrop-blur-xl rounded-[24px] shadow-sm border border-white p-6 relative overflow-hidden h-[160px] flex flex-col justify-between">
           <div className="absolute top-0 right-0 w-2 h-full bg-[#fcd436]"></div>
           <div className="text-slate-500 font-bold text-sm">Active Farms</div>
           <div className="text-4xl font-extrabold text-slate-800">4</div>
         </div>
         <div className="bg-white/90 backdrop-blur-xl rounded-[24px] shadow-sm border border-white p-6 relative overflow-hidden h-[160px] flex flex-col justify-between">
           <div className="absolute top-0 right-0 w-2 h-full bg-[#2fd49f]"></div>
           <div className="text-slate-500 font-bold text-sm">Total Yield Accrued</div>
           <div className="text-4xl font-extrabold text-slate-800">8,204.5 <span className="text-lg">QNFT</span></div>
         </div>
         <div className="bg-gradient-to-b from-[#21c2a8] to-[#12a188] rounded-[24px] shadow-lg p-6 h-[160px] flex flex-col justify-between text-white relative">
           <div className="absolute right-[-20px] bottom-[-20px] opacity-10"><Rocket size={100} /></div>
           <div className="font-bold text-sm text-emerald-100">APR Boost</div>
           <div>
             <div className="text-4xl font-extrabold">Active</div>
             <div className="text-sm font-bold text-emerald-200 mt-1">+10% Yield Bonus</div>
           </div>
         </div>
       </div>

       <div className="bg-white/90 backdrop-blur-xl rounded-[28px] shadow-[0_8px_30px_-12px_rgba(0,20,40,0.08)] border border-white p-7 w-full">
         <h3 className="text-[19px] font-extrabold text-[#1f2833] tracking-tight mb-6">Yield Pools</h3>
         
         <div className="flex flex-col gap-4">
           {[
             { name: "USDT / QNFT Liquidity", apy: "240% APY", tvl: "$124,500", tags: ['Hot', 'Dual'] },
             { name: "NFT Collateralized Reserve", apy: "85% APY", tvl: "820 NFTs", tags: ['Stable'] },
             { name: "SOL Single Sided", apy: "12% APY", tvl: "$89,000", tags: ['Low Risk'] },
           ].map((pool, idx) => (
             <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl bg-[#f8fbff] border border-blue-50 hover:shadow-md transition">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-800 text-lg">{pool.name}</span>
                    {pool.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 bg-cyan-100 text-cyan-700 text-[10px] font-bold rounded-sm">{t}</span>
                    ))}
                  </div>
                  <div className="text-slate-500 font-semibold text-sm">TVL: {pool.tvl}</div>
                </div>

                <div className="flex items-center gap-6 mt-4 sm:mt-0">
                  <div className="flex flex-col items-end">
                    <span className="text-emerald-500 font-extrabold text-lg">{pool.apy}</span>
                    <span className="text-slate-400 text-xs font-bold">Auto-compounding</span>
                  </div>
                  <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-bold transition">Deposit</button>
                </div>
             </div>
           ))}
         </div>
       </div>
    </div>
  );
}

// ================= ASSETS TAB =================
function AssetsTabContent({ walletBalance, userWallet }: any) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 w-full flex flex-col gap-6">
      
      {/* Portfolio Card */}
      <div className="bg-gradient-to-r from-[#2ebcff] to-[#48c9e5] rounded-[28px] p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 mix-blend-overlay w-[60%] h-full pointer-events-none">
          <svg viewBox="0 0 100 100" fill="white" className="w-full h-full scale-150 transform -translate-y-10"><circle cx="50" cy="50" r="40" stroke="white" strokeWidth="20" fill="none"/></svg>
        </div>
        
        <div className="relative z-10 flex flex-col gap-1">
          <span className="text-blue-100 font-bold text-sm tracking-wide">Total Estimated Value</span>
          <div className="text-[42px] font-extrabold tracking-tighter mt-1">$4,250.00</div>
          <span className="bg-white/20 w-max px-3 py-1 rounded-full text-xs font-bold mt-2">Available to Withdraw: $1,200.00</span>
        </div>

        <div className="relative z-10 flex items-center gap-4 mt-8">
           <button className="bg-white text-blue-500 font-bold px-8 py-3 rounded-full hover:shadow-lg transition">Deposit</button>
           <button className="bg-blue-500/40 text-white font-bold px-8 py-3 rounded-full hover:bg-blue-500/60 transition border border-white/20">Withdraw</button>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-xl rounded-[28px] shadow-[0_8px_30px_-12px_rgba(0,20,40,0.08)] border border-white p-7 w-full min-h-[400px]">
        <h3 className="text-[19px] font-extrabold text-[#1f2833] tracking-tight mb-6">Asset Balances</h3>
        
        <div className="flex flex-col gap-2">
          {/* Main Wallet Token Row */}
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4 hover:bg-slate-50 transition rounded-2xl cursor-pointer">
             <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
               {userWallet.startsWith("0x") ? "ETH" : "SOL"}
             </div>
             <div>
               <div className="font-extrabold text-slate-800 text-lg">Native Chain Token</div>
               <div className="font-semibold text-slate-400 text-sm">Used for Gas Fees</div>
             </div>
             <div className="text-right">
               <div className="font-extrabold text-slate-800 text-lg">{walletBalance}</div>
               <div className="font-bold text-slate-400 text-sm">~ $---.--</div>
             </div>
          </div>

          {/* USDT Row */}
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4 hover:bg-slate-50 transition rounded-2xl cursor-pointer">
             <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
               <span className="text-xs">USDT</span>
             </div>
             <div>
               <div className="font-extrabold text-slate-800 text-lg">Tether USD</div>
               <div className="font-semibold text-slate-400 text-sm">Polygon / ERC20</div>
             </div>
             <div className="text-right">
               <div className="font-extrabold text-slate-800 text-lg">0.00</div>
               <div className="font-bold text-slate-400 text-sm">$ 0.00</div>
             </div>
          </div>

          {/* QNFT Token Row */}
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4 hover:bg-slate-50 transition rounded-2xl cursor-pointer">
             <div className="w-12 h-12 rounded-full bg-[#1dbca5] text-white flex items-center justify-center font-bold text-xl">
               T
             </div>
             <div>
               <div className="font-extrabold text-slate-800 text-lg">Quantum NFT Token</div>
               <div className="font-semibold text-slate-400 text-sm">Platform Yield Token</div>
             </div>
             <div className="text-right">
               <div className="font-extrabold text-slate-800 text-lg">1,333,488.0</div>
               <div className="font-bold text-slate-400 text-sm">~ $1,100.00</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, colorClass }: any) {
  return (
    <div className="bg-[#fcfdfe] rounded-[18px] p-4 sm:p-5 border border-slate-100 shadow-[inset_0_2px_12px_rgba(230,240,245,0.5)] relative flex flex-col justify-end w-full h-[100px]">
      <div className={`absolute top-5 left-0 w-1.5 h-10 rounded-r-md opacity-90 ${colorClass}`}></div>
      <div className="text-[13px] font-bold text-[#728096] pl-4 leading-snug mb-3 flex-1">{title}</div>
      <div className="text-xl sm:text-2xl font-extrabold text-[#111820] pl-4 truncate">{value}</div>
    </div>
  );
}

function TeamAction({ icon, label }: any) {
  return (
    <div className="flex flex-col items-center gap-3 cursor-pointer group px-1">
      <div className="h-[60px] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-[13px] font-bold text-[#5c6a7e] leading-snug">
        {label}
      </div>
    </div>
  );
}

function QuickAction({ icon, label, onClick }: any) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-3 cursor-pointer group">
      <div className="h-[44px] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
        {icon}
      </div>
      <div className="text-[14px] font-bold text-[#5c6a7e] tracking-tight">
        {label}
      </div>
    </div>
  );
}

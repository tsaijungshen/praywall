import React, { useState, useMemo, useEffect } from 'react';
import { 
  Heart, 
  Search, 
  Plus, 
  Download, 
  Upload, 
  Copy, 
  Edit3, 
  Check, 
  User, 
  Users, 
  BookOpen, 
  Clock, 
  Grid, 
  List, 
  ChevronRight, 
  Filter, 
  X, 
  Sparkles,
  FileSpreadsheet,
  Share2
} from 'lucide-react';

// Initial Data parsing from user prompt
const INITIAL_ROSTER = [
  // 信光區 弟兄 聖徒
  ...["左其浩","林建安","蔡雨桐","陳子謙","陳秋雄","黃才育","陳明宏","李冠融","廖文毅","姜心誠","黃睿聰","呂穗枝","呂亦揚"].map(name => ({
    id: `xg-b-${name}`, district: "信光區", ageGroup: "", gender: "弟兄", identity: "聖徒", name, notes: ""
  })),
  // 信光區 弟兄 福音朋友
  ...["房宣佑","李亦晟","胡書倉","胡瑞源","林建宏","莊文凱","黃志強","徐寶泰","黃朝御"].map(name => ({
    id: `xg-bf-${name}`, district: "信光區", ageGroup: "", gender: "弟兄", identity: "福音朋友", name, notes: ""
  })),
  // 信光區 姊妹 聖徒
  ...["房陳怡冰","房慈娜","莊陳怡汝","蔡鄭庭婷","陳劉芳群","陳劉雅倫","耿謝修心","耿明","徐佩婷","陳麗俐","歐陽太詠","歐陽太鈞","方淑蘭","黃徐懿瑤","葉淑芳","楊文淑","李晴和","姚桂蘭","方淑娟","楊麗妮","左李植芳","徐詠慈"].map(name => ({
    id: `xg-s-${name}`, district: "信光區", ageGroup: "", gender: "姊妹", identity: "聖徒", name, notes: ""
  })),
  // 信光區 姊妹 福音朋友
  ...["黃素杏","陳蘭秀","黃圓懿","陳玉嬌","黃淑芬","鄭怡伶","林宛蓉","陳華美"].map(name => ({
    id: `xg-sf-${name}`, district: "信光區", ageGroup: "", gender: "姊妹", identity: "福音朋友", name, notes: ""
  })),

  // 藝文區 弟兄 聖徒
  ...["胡哲維","賴建旭","甘霖","李書維","梁基棠","梁力尹","葛三民","胡師賓","邱育","王智文","連富儀","蔡明翰","張常生","謝金元"].map(name => ({
    id: `yw-b-${name}`, district: "藝文區", ageGroup: "", gender: "弟兄", identity: "聖徒", name, notes: ""
  })),
  // 藝文區 弟兄 福音朋友
  ...["裴佳羿","胡辰瑞","康逸銘","蘇易昇","呂健璋"].map(name => ({
    id: `yw-bf-${name}`, district: "藝文區", ageGroup: "", gender: "弟兄", identity: "福音朋友", name, notes: ""
  })),
  // 藝文區 姊妹 聖徒
  ...["胡薇雅","甘徐恩典","賴邱馨儀","李張貞齡","梁林玉琴","胡張巧雲","黃思文","陳美鳳","江東旭","高優香","連陳淑文","葛姜錦玲","張高金蘭","謝呂淑宜","張曉吉","廖蘇美如","詹昀妮","周猷葳"].map(name => ({
    id: `yw-s-${name}`, district: "藝文區", ageGroup: "", gender: "姊妹", identity: "聖徒", name, notes: ""
  })),
  // 藝文區 姊妹 福音朋友
  ...["古慈緣","廖貞惠","黃瑋婷","徐黃罔","康寶玲","康寶珊","蘇韋溱","鄭森妹","蔡雨蓉","呂瑩嘉"].map(name => ({
    id: `yw-sf-${name}`, district: "藝文區", ageGroup: "", gender: "姊妹", identity: "福音朋友", name, notes: ""
  })),

  // 寶慶區 弟兄 聖徒
  ...["何積忠","曾志強","陳伯易","曾信恩","王祥名","何柏諺","李瑛奇","姚愈郁","方鴻鳴","林維祥","柯貝德","李元勳","羅和平","李浚凌","楊立綱"].map(name => ({
    id: `bq-b-${name}`, district: "寶慶區", ageGroup: "", gender: "弟兄", identity: "聖徒", name, notes: ""
  })),
  // 寶慶區 弟兄 福音朋友
  ...["陳柏翰","陳展毅"].map(name => ({
    id: `bq-bf-${name}`, district: "寶慶區", ageGroup: "", gender: "弟兄", identity: "福音朋友", name, notes: ""
  })),
  // 寶慶區 姊妹 聖徒
  ...["何何蕙明","曾曾玉仙","張吳杼庭","楊文玲","李欣儒","畢呂岱蓉","張佑甄","張素連","林張錦珠","方李蕙君","羅黃愛真","莊王淑英","齊張復莉","鍾玉珍","王淑君","吳淑金","李陳香玲","姚宏愛","姚信真","呂良昭","郭美雪","易向東","蔡素惠","柯陳羿云","董子靈","陳秋美","林維雍","李李辰薇","羅亦喻"].map(name => ({
    id: `bq-s-${name}`, district: "寶慶區", ageGroup: "", gender: "姊妹", identity: "聖徒", name, notes: ""
  })),
  // 寶慶區 姊妹 福音朋友
  ...["姚晴徽","陳仕蓁","陳秀琴"].map(name => ({
    id: `bq-sf-${name}`, district: "寶慶區", ageGroup: "", gender: "姊妹", identity: "福音朋友", name, notes: name === "陳秀琴" ? "王淑君姐妹的婆婆" : ""
  })),

  // 自強區 弟兄 聖徒
  ...["陳逸峰","鄭勝忠","齊文駿","陳鴻琩","劉文邦","劉得寬","鄭志成"].map(name => ({
    id: `zq-b-${name}`, district: "自強區", ageGroup: "", gender: "弟兄", identity: "聖徒", name, notes: ""
  })),
  // 自強區 弟兄 福音朋友
  ...["陳庭成","蔡忠穆","吳昀霖","陳楚恩","王建中","許庭豪"].map(name => ({
    id: `zq-bf-${name}`, district: "自強區", ageGroup: "", gender: "弟兄", identity: "福音朋友", name, notes: ""
  })),
  // 自強區 姊妹 聖徒
  ...["陳蔡怡君","鄭王苔菱","齊沈采蓉","陳潘婉柔","鄭安秀","徐李甜琇","王蔡宜倩","黃姿榳","潘育華","王佳怡","李函穎","康秀娜","楊主恩","林香圻","聶少秋","熊娟賢","廖敏玲","張鷹梅","葉虹妘"].map(name => ({
    id: `zq-s-${name}`, district: "自強區", ageGroup: "", gender: "姊妹", identity: "聖徒", name, notes: ""
  })),
  // 自強區 姊妹 福音朋友
  ...["曾靖元","朱芸","玥宇","邱思旋","吾羽","王嘉瑜","張家瑋","陳家慧","吳亭葶","羅心廷"].map(name => ({
    id: `zq-sf-${name}`, district: "自強區", ageGroup: "", gender: "姊妹", identity: "福音朋友", name, notes: ""
  })),

  // 青職
  { id: "qz-1", district: "", ageGroup: "青職", gender: "弟兄", identity: "聖徒", name: "連亮凱", notes: "" },
  { id: "qz-2", district: "", ageGroup: "青職", gender: "弟兄", identity: "聖徒", name: "許訓輔", notes: "" },
  { id: "qz-3", district: "", ageGroup: "青職", gender: "弟兄", identity: "聖徒", name: "郭宇新", notes: "" },
  { id: "qz-4", district: "", ageGroup: "青職", gender: "弟兄", identity: "聖徒", name: "白日恩", notes: "" },
  { id: "qz-5", district: "", ageGroup: "青職", gender: "弟兄", identity: "聖徒", name: "胡秉宏", notes: "" },
  { id: "qz-6", district: "", ageGroup: "大專", gender: "姊妹", identity: "聖徒", name: "彭芷榆", notes: "大四" },
  { id: "qz-7", district: "", ageGroup: "大專", gender: "姊妹", identity: "聖徒", name: "鄭芷芸", notes: "大四" },
  { id: "qz-8", district: "", ageGroup: "大專", gender: "姊妹", identity: "聖徒", name: "阮紅焰", notes: "大四" },
  { id: "qz-9", district: "", ageGroup: "大專", gender: "姊妹", identity: "聖徒", name: "林莉雅", notes: "大四" },
  { id: "qz-10", district: "", ageGroup: "大專", gender: "弟兄", identity: "聖徒", name: "鄭文豪", notes: "大四 (美國)" },
  { id: "qz-11", district: "", ageGroup: "大專", gender: "姊妹", identity: "聖徒", name: "呂亦茹", notes: "" },
  { id: "qz-12", district: "", ageGroup: "大專", gender: "弟兄", identity: "聖徒", name: "李謝晟", notes: "" },
  { id: "qz-13", district: "", ageGroup: "大專", gender: "姊妹", identity: "聖徒", name: "葉芬", notes: "體大-運動保健" },
  { id: "qz-14", district: "", ageGroup: "大專", gender: "姊妹", identity: "聖徒", name: "黃宣雅", notes: "中央光電" },
  { id: "qz-15", district: "", ageGroup: "大專", gender: "姊妹", identity: "聖徒", name: "陳映", notes: "大三 (國防護理)" },
  { id: "qz-16", district: "", ageGroup: "大專", gender: "弟兄", identity: "福音朋友", name: "裴佳羿", notes: "大三" },
  { id: "qz-17", district: "", ageGroup: "大專", gender: "姊妹", identity: "聖徒", name: "張艾綸", notes: "大二 (致理)" },
  { id: "qz-18", district: "", ageGroup: "大專", gender: "姊妹", identity: "聖徒", name: "張馨云", notes: "大二 (成大)" },
  { id: "qz-19", district: "", ageGroup: "大專", gender: "弟兄", identity: "聖徒", name: "陳逸嘉", notes: "大二 (交大)" },
  { id: "qz-20", district: "", ageGroup: "大專", gender: "姊妹", identity: "聖徒", name: "鍾念恩", notes: "專一 (馬偕護專淡水)" },

  // 青少年
  ...["林中天","張育碩","歐以樂","張奇恩","廖辰晟","畢勝"].map(name => ({ id: `qs-b-g3-${name}`, district: "", ageGroup: "高中", gender: "弟兄", identity: "聖徒", name, notes: "高三" })),
  ...["謝瑋芸","林祐鈺","蔡聖怡","黃妍睿"].map(name => ({ id: `qs-s-g3-${name}`, district: "", ageGroup: "高中", gender: "姊妹", identity: "聖徒", name, notes: name === "黃妍睿" ? "高三 (陽明)" : "高三" })),
  { id: "qs-b-g2-1", district: "", ageGroup: "高中", gender: "弟兄", identity: "聖徒", name: "陳熹", notes: "高二" },
  ...["黃捷瑄","黃宥靜","呂愛語"].map(name => ({ id: `qs-s-g2-${name}`, district: "", ageGroup: "高中", gender: "姊妹", identity: "聖徒", name, notes: "高二" })),
  ...["陳品睿","陳藝","陳立恩"].map(name => ({ id: `qs-b-g1-${name}`, district: "", ageGroup: "高中", gender: "弟兄", identity: "聖徒", name, notes: "高一" })),
  { id: "qs-j3-1", district: "", ageGroup: "國中", gender: "弟兄", identity: "聖徒", name: "李鐵非", notes: "國三" },
  { id: "qs-j3-2", district: "", ageGroup: "國中", gender: "姊妹", identity: "聖徒", name: "鄭莉茗", notes: "國三" },
  { id: "qs-j3-3", district: "", ageGroup: "國中", gender: "弟兄", identity: "聖徒", name: "黃楷睿", notes: "國三 (慈文)" },
  { id: "qs-j2-1", district: "", ageGroup: "國中", gender: "弟兄", identity: "聖徒", name: "王博睿", notes: "國二" },
  ...["吳秉諺","黃毓琦","黃湘晴","邱卉瑜","范雋奕","江羽揚","陳祐揚"].map(name => ({ id: `qs-f-${name}`, district: "", ageGroup: "國中", gender: "弟兄", identity: "福音朋友", name, notes: "青少年福音朋友" })),

  // 兒童
  ...["邱子綾","王苡晴","張新城","柯宇樂","張丞翊","陳云","李每拿","張尹榛","張睿","徐宇睿"].map(name => ({ id: `child-${name}`, district: "", ageGroup: "兒童", gender: "姊妹", identity: "聖徒", name, notes: "學齡" })),
  { id: "child-w1", district: "", ageGroup: "兒童", gender: "弟兄", identity: "聖徒", name: "溫祐辰", notes: "小六" },
  { id: "child-w2", district: "", ageGroup: "兒童", gender: "弟兄", identity: "聖徒", name: "溫軒霆", notes: "學齡" },
  { id: "child-c1", district: "", ageGroup: "兒童", gender: "姊妹", identity: "聖徒", name: "蔡聖萱", notes: "小五" },
  { id: "child-s1", district: "", ageGroup: "兒童", gender: "姊妹", identity: "聖徒", name: "謝茗晶", notes: "小四" },
  { id: "child-s2", district: "", ageGroup: "兒童", gender: "姊妹", identity: "聖徒", name: "謝瑀芯", notes: "小六" },
  { id: "child-p1", district: "", ageGroup: "兒童", gender: "弟兄", identity: "聖徒", name: "彭定偉", notes: "小三" },
  ...["何家悅","李芮嘉","梁庭萱"].map(name => ({ id: `child-g1-${name}`, district: "", ageGroup: "兒童", gender: "姊妹", identity: "聖徒", name, notes: "小一" })),
  ...["陳詠恩","陳詠約","邱苡琳","甘慕淳","甘心","賴享主","賴享恩","潘陳悅皿","潘陳悅安","陳慕","陳晞","邱彥愷","徐妤安","徐妤心","徐裕森","陳妍霏","侯泓羽","侯泓芸","李睿恩","楊恩旭","楊恩碩","王真言","王真依","林容瑤","葉睿丞","程熙","徐宇芯"].map(name => ({ id: `child-pre-${name}`, district: "", ageGroup: "學齡前", gender: "姊妹", identity: "聖徒", name, notes: "學齡前" })),
  ...["陳昱蓉","許芷","李品初","張家琦","林洵薇","賴彥彬","林子涵","林渃禾","張煜青","李玉婷"].map(name => ({ id: `child-f-${name}`, district: "", ageGroup: "兒童", gender: "姊妹", identity: "福音朋友", name, notes: name.includes("品格園") ? "品格園" : "兒童福音朋友" }))
];

const INITIAL_PRAYER_ITEMS = [
  {
    id: "p1",
    category: "聖徒狀況",
    title: "為弟兄們",
    content: "1. 2030目標預備：為話語職事、成為柱子\n2. 下半年成全：11/22",
    updatedAt: "2025-09-10"
  },
  {
    id: "p2",
    category: "聖徒狀況",
    title: "為姐妹們",
    content: "1. 建立禱告的負擔與服事，一環一環得以擴大，並堅定持續\n2. 聖徒穩定參加禱告聚會，緊緊跟隨",
    updatedAt: "2025-09-10"
  },
  {
    id: "p3",
    category: "聖徒狀況",
    title: "為召會下一代",
    content: `願主加增以色列家的人數，多如羊群。
1. 青職 - 建立事奉的配搭，人人入排
   A. 穩定就業，服事釋放
   B. 建立家室，有活力伴，保守青職的家穩固並得成全
   C. 生命讀經共讀
   D. 11/21福音聚會（八會所）

2. 大專 - 召會年輕有活力
   A. 校園得著中幹
   B. 校園福音焚燒
   C. 本地/開南/銘傳/長庚/體大

3. 青少年 - 建立享受主的習慣
   A. 聖別主日
   B. 六年讀新舊約二遍
   C. 國中排服事及校園福音（慈文/文昌/經國/同德）
   D. 得少：
      a. 賴彥儒（莊敬小五）、王呈時（父）、鄭敏（奶奶）
      b. 董昕怡（同德國二）、艾葳（同德國二）、洪智惠（奶奶）、羅喻馨（昕怡朋友）
      c. 黃妍睿（陽明高三）、黃楷睿（慈文國三）

4. 兒童 - 預備貴重的器皿
   A. 13會所兒童排（永順國小一帶）定及新增福音家
   B. 學齡主日的服事，人力跟場地
   C. 11/21家長見證分享交通`,
    updatedAt: "2025-09-12"
  },
  {
    id: "p4",
    category: "福音白馬",
    title: "為福音朋友",
    content: `召會繁殖得擴增，各區名單對象能敞開、月月結新果、且長存。
A. 新人：
   1月：陳沛琳、姜心誠
   3月：謝茗晶
   4月：張新城
   5月：柯宇樂、柯新宇、柯玲恩、鄭謝涼子
   8月：溫軒霆
   10月：陳勇在（開南）

B. 每週六 15:30 小檜溪特區開展（信光路77號）
C. 藝文特區、永安路、開南大學（五週開展 12/15-1/18）`,
    updatedAt: "2025-09-15"
  },
  {
    id: "p5",
    category: "召會行動",
    title: "召會行動與吹號",
    content: `2025年9月吹號負擔：
1. 拿起負擔 傳揚福音。
2. 全力以赴 建造小排。
3. 召會全體 成全青年。
4. 預備新婦 催促主來。
5. 12/20（11/13）數算主恩`,
    updatedAt: "2025-09-01"
  },
  {
    id: "p6",
    category: "其他",
    title: "其他代禱事項",
    content: `1. 蔡勝德 / 梁力尹 / 林建安：恢復健康、過正常召會生活
2. 健康恢復：盧蘇惠芬、梁林玉琴、陳美鳳、何秀霞、謝呂淑宜、Lilygrace、薇雅、淑文、周恩惠、庭婷、聶少秋、張素連、莊麗英、方淑蘭、曾曾玉仙
3. 采蓉：心情穩定、照顧新生兒、調整作息
4. 家得恢復：建旭馨儀 / 文毅美如 / 雨桐庭婷`,
    updatedAt: "2025-09-18"
  }
];

// Start logs from an empty array with no preset records
const INITIAL_LOGS = [];

export default function App() {
  // State with LocalStorage Persistence
  const [activeTab, setActiveTab] = useState('roster'); // roster | items | logs
  const [prayerSubView, setPrayerSubView] = useState('items'); // items | weeklySummary
  const [viewMode, setViewMode] = useState('card'); // card | summary

  const [roster, setRoster] = useState(() => {
    const saved = localStorage.getItem('prayer_wall_roster');
    return saved ? JSON.parse(saved) : INITIAL_ROSTER;
  });

  const [prayerItems, setPrayerItems] = useState(() => {
    const saved = localStorage.getItem('prayer_wall_prayer_items');
    return saved ? JSON.parse(saved) : INITIAL_PRAYER_ITEMS;
  });

  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('prayer_wall_logs');
    return saved ? JSON.parse(saved) : INITIAL_LOGS;
  });

  const [coEditorName, setCoEditorName] = useState(() => {
    return localStorage.getItem('prayer_wall_co_editor_name') || '';
  });

  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isSelfOnline, setIsSelfOnline] = useState(false);
  const [isOnlineModalOpen, setIsOnlineModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Persist roster changes
  useEffect(() => {
    localStorage.setItem('prayer_wall_roster', JSON.stringify(roster));
  }, [roster]);

  // Persist prayer items changes
  useEffect(() => {
    localStorage.setItem('prayer_wall_prayer_items', JSON.stringify(prayerItems));
  }, [prayerItems]);

  // Persist activity logs
  useEffect(() => {
    localStorage.setItem('prayer_wall_logs', JSON.stringify(logs));
  }, [logs]);

  // Persist co-editor name
  useEffect(() => {
    localStorage.setItem('prayer_wall_co_editor_name', coEditorName);
  }, [coEditorName]);

  // Roster Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('全部');
  const [selectedIdentity, setSelectedIdentity] = useState('全部');
  const [selectedAge, setSelectedAge] = useState('全部');

  // Modals state
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    district: '信光區',
    ageGroup: '',
    gender: '弟兄',
    identity: '聖徒',
    name: '',
    notes: ''
  });

  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [currentPrayerItem, setCurrentPrayerItem] = useState({
    id: '',
    category: '召會行動',
    title: '',
    content: ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  // Keep self online status updated dynamically with user's current co-editor name
  useEffect(() => {
    if (coEditorName.trim() && isSelfOnline) {
      setOnlineUsers(prev => {
        const exists = prev.some(u => u.isSelf);
        if (exists) {
          return prev.map(u => u.isSelf ? { ...u, name: coEditorName.trim() } : u);
        } else {
          return [
            ...prev,
            { id: 'u-self', name: coEditorName.trim(), status: "線上活動中", avatarBg: "bg-[#8C6D58]", isSelf: true, lastActive: "剛剛" }
          ];
        }
      });
    } else {
      setOnlineUsers(prev => prev.filter(u => !u.isSelf));
    }
  }, [coEditorName, isSelfOnline]);

  // Helper function to log actions
  const addLog = (actionText) => {
    const newLog = {
      id: `l-${Date.now()}`,
      user: coEditorName || '尚未設定',
      action: actionText,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setLogs(prev => [newLog, ...prev]);
  };

// Roster filtering
  const filteredRoster = useMemo(() => {
    return roster.filter(item => {
      // 區別篩選：如果選「全部」則通過；如果選特定區別，則檢查是否相符（或者該對象區別為空但符合該年齡層群組）
      if (selectedDistrict !== '全部') {
        if (item.district !== selectedDistrict) return false;
      }
      
      // 身份篩選
      if (selectedIdentity !== '全部' && item.identity !== selectedIdentity) return false;
      
      // 年齡層篩選：支援精準對應或包含關係
      if (selectedAge !== '全部') {
        if (!item.ageGroup || !item.ageGroup.includes(selectedAge)) {
          return false;
        }
      }

      // 搜尋關鍵字
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchNotes = item.notes.toLowerCase().includes(query);
        const matchDistrict = item.district.toLowerCase().includes(query);
        const matchAge = item.ageGroup.toLowerCase().includes(query);
        if (!matchName && !matchNotes && !matchDistrict && !matchAge) return false;
      }
      return true;
    });
  }, [roster, selectedDistrict, selectedIdentity, selectedAge, searchQuery]);

  // Handlers for Member Ops
  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    if (!newMember.name.trim()) return;

    const created = {
      ...newMember,
      id: `custom-${Date.now()}`
    };

    setRoster(prev => [created, ...prev]);
    addLog(`新增代禱名單: ${created.name} (${created.district || '未分類'})`);
    setIsAddMemberOpen(false);
    setNewMember({
      district: '信光區',
      ageGroup: '',
      gender: '弟兄',
      identity: '聖徒',
      name: '',
      notes: ''
    });
    showToast(`已成功新增名單：${created.name}`);
  };

  // Handlers for CSV Import / Export
  const handleExportCSV = () => {
    const headers = "大分類(區別),年齡層,性別,身份,姓名,備註\n";
    const rows = roster.map(r => `"${r.district}","${r.ageGroup}","${r.gender}","${r.identity}","${r.name}","${r.notes}"`).join("\n");
    const blob = new Blob(["\uFEFF" + headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `代禱名單_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addLog("匯出代禱名單 CSV 檔案");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target.result;
        const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
        if (lines.length <= 1) {
          showToast("檔案格式錯誤或內容為空");
          return;
        }

        const newItems = [];
        for (let i = 1; i < lines.length; i++) {
          const parts = lines[i].split(",").map(p => p.replace(/^"|"$/g, '').trim());
          if (parts.length >= 5) {
            newItems.push({
              id: `csv-${Date.now()}-${i}`,
              district: parts[0] || "",
              ageGroup: parts[1] || "",
              gender: parts[2] || "弟兄",
              identity: parts[3] || "聖徒",
              name: parts[4],
              notes: parts[5] || ""
            });
          }
        }

        if (newItems.length > 0) {
          setRoster(prev => [...newItems, ...prev]);
          addLog(`批量匯入了 ${newItems.length} 筆名單`);
          showToast(`成功匯入 ${newItems.length} 筆代禱名單！`);
        }
      } catch (err) {
        showToast("解析 CSV 失敗，請確認格式");
      }
    };
    reader.readAsText(file);
  };

  // Handlers for Prayer Items
  const handleSavePrayerItem = (e) => {
    e.preventDefault();
    if (!currentPrayerItem.title.trim() || !currentPrayerItem.content.trim()) return;

    const today = new Date().toISOString().slice(0, 10);
    if (currentPrayerItem.id) {
      setPrayerItems(prev => prev.map(p => p.id === currentPrayerItem.id ? { ...currentPrayerItem, updatedAt: today } : p));
      addLog(`更新了代禱事項: 【${currentPrayerItem.title}】`);
      showToast("代禱事項已更新！");
    } else {
      const newItem = {
        ...currentPrayerItem,
        id: `p-${Date.now()}`,
        updatedAt: today
      };
      setPrayerItems(prev => [newItem, ...prev]);
      addLog(`新增了代禱事項: 【${newItem.title}】`);
      showToast("已新增代禱事項！");
    }

    setIsPrayerModalOpen(false);
  };

  const handleCopyText = (text, title) => {
    navigator.clipboard.writeText(text);
    showToast(`已複製「${title}」內容`);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#3D3735] font-sans flex flex-col selection:bg-[#E8DFC0] selection:text-[#3D3735]">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#EBE4D8] px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-2">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-1.5 shrink-0">
            <Heart className="w-4 h-4 text-[#8C6D58] fill-[#8C6D58]" />
            <h1 className="font-serif font-medium text-base text-[#2C2725] tracking-wide">代禱牆</h1>
          </div>

          {/* Evenly Centered Top Nav Tabs with Icons */}
          <div className="flex-1 flex justify-center items-center gap-1 bg-[#F4EFEA] p-1 rounded-xl border border-[#E6DDD0] max-w-xs">
            <button
              onClick={() => setActiveTab('roster')}
              className={`flex-1 flex items-center justify-center space-x-1 text-center py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'roster' ? 'bg-[#FDFBF7] text-[#8C6D58] shadow-xs' : 'text-[#8C827A] hover:text-[#5A524D]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>名單</span>
            </button>
            <button
              onClick={() => setActiveTab('items')}
              className={`flex-1 flex items-center justify-center space-x-1 text-center py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'items' ? 'bg-[#FDFBF7] text-[#8C6D58] shadow-xs' : 'text-[#8C827A] hover:text-[#5A524D]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>事項</span>
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`flex-1 flex items-center justify-center space-x-1 text-center py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'logs' ? 'bg-[#FDFBF7] text-[#8C6D58] shadow-xs' : 'text-[#8C827A]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>更新</span>
            </button>
          </div>

          {/* Online Co-editors Counter & Co-editor trigger */}
          <div className="flex items-center space-x-1.5 shrink-0">
            <button
              onClick={() => setIsOnlineModalOpen(true)}
              className="flex items-center space-x-1 bg-[#E8F0E8] hover:bg-[#DCE8DC] px-2 py-1.5 rounded-full border border-[#CDE0CD] transition-colors"
              title="查看線上配搭"
            >
              <span className="w-2 h-2 rounded-full bg-[#4E6B4E] animate-pulse"></span>
              <Users className="w-3.5 h-3.5 text-[#4E6B4E]" />
              <span className="text-xs font-medium text-[#3A523A]">{onlineUsers.length}位</span>
            </button>

            <button 
              onClick={() => setIsEditorModalOpen(true)}
              className="flex items-center space-x-1 text-xs bg-[#F4EFEA] hover:bg-[#EBE4D8] px-2 py-1.5 rounded-full border border-[#E6DDD0] transition-colors"
              title="設定配搭名稱"
            >
              <User className="w-3.5 h-3.5 text-[#8C6D58]" />
              <span className="text-[#5A524D] font-medium hidden sm:inline">{coEditorName || "尚未設定"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-lg w-full mx-auto pb-12 px-4 pt-4">
        
        {/* TAB 1: 代禱名單 */}
        {activeTab === 'roster' && (
          <div className="space-y-4 animate-fade-in">
            {/* Action Bar */}
            <div className="flex items-center justify-between gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A0958B]" />
                <input 
                  type="text"
                  placeholder="搜尋姓名或備註..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F4EFEA] border border-[#E8DFC0]/40 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#8C6D58] placeholder-[#A0958B]"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0958B]">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* View Switcher */}
              <div className="flex bg-[#F4EFEA] p-0.5 rounded-xl border border-[#E6DDD0]">
                <button 
                  onClick={() => setViewMode('card')}
                  className={`p-1.5 rounded-lg transition-all ${viewMode === 'card' ? 'bg-[#FDFBF7] shadow-xs text-[#8C6D58]' : 'text-[#8C827A]'}`}
                  title="卡片檢視"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('summary')}
                  className={`p-1.5 rounded-lg transition-all ${viewMode === 'summary' ? 'bg-[#FDFBF7] shadow-xs text-[#8C6D58]' : 'text-[#8C827A]'}`}
                  title="分類總表"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter Tags */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-0.5">
                <span className="text-[11px] text-[#9E948A] whitespace-nowrap px-1">區別:</span>
                {['全部', '信光區', '藝文區', '寶慶區', '自強區'].map(d => (
                  <button
                    key={d}
                    onClick={() => setSelectedDistrict(d)}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap text-xs transition-all ${selectedDistrict === d ? 'bg-[#8C6D58] text-white shadow-xs' : 'bg-[#F4EFEA] text-[#6B625B] hover:bg-[#EBE4D8]'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-0.5">
                <span className="text-[11px] text-[#9E948A] whitespace-nowrap px-1">身份:</span>
                {['全部', '聖徒', '福音朋友'].map(i => (
                  <button
                    key={i}
                    onClick={() => setSelectedIdentity(i)}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap text-xs transition-all ${selectedIdentity === i ? 'bg-[#768A75] text-white shadow-xs' : 'bg-[#F4EFEA] text-[#6B625B] hover:bg-[#EBE4D8]'}`}
                  >
                    {i}
                  </button>
                ))}
                <span className="text-[11px] text-[#9E948A] whitespace-nowrap px-1 pl-2">年齡:</span>
                {['全部', '青職', '大專', '高中', '國中', '兒童', '學齡前'].map(a => (
                  <button
                    key={a}
                    onClick={() => setSelectedAge(a)}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap text-xs transition-all ${selectedAge === a ? 'bg-[#6E5A4D] text-white shadow-xs' : 'bg-[#F4EFEA] text-[#6B625B] hover:bg-[#EBE4D8]'}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Header info & Excel Ops */}
            <div className="flex items-center justify-between text-xs text-[#8C827A] pt-1 border-b border-[#EBE4D8] pb-2">
              <div>共包含 <span className="font-semibold text-[#8C6D58]">{filteredRoster.length}</span> 位代禱對象</div>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-1 cursor-pointer hover:text-[#3D3735]">
                  <Upload className="w-3.5 h-3.5 text-[#768A75]" />
                  <span>匯入CSV</span>
                  <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
                </label>
                <span>|</span>
                <button onClick={handleExportCSV} className="flex items-center space-x-1 hover:text-[#3D3735]">
                  <Download className="w-3.5 h-3.5 text-[#8C6D58]" />
                  <span>導出</span>
                </button>
              </div>
            </div>

            {/* VIEW MODE 1: CARD VIEW */}
            {viewMode === 'card' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {filteredRoster.map(item => (
                  <div key={item.id} className="bg-[#FDFBF7] border border-[#EBE4D8] rounded-xl p-3 shadow-xs hover:border-[#D5C9B8] transition-all flex flex-col justify-between relative group">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${item.identity === '福音朋友' ? 'bg-[#E8F0E8] text-[#4E6B4E]' : 'bg-[#F2EBE4] text-[#7A6455]'}`}>
                          {item.identity}
                        </span>
                        {item.district && <span className="text-[10px] text-[#A0958B]">{item.district}</span>}
                      </div>
                      <div className="font-medium text-sm text-[#2C2725] font-serif mb-1">{item.name}</div>
                      <div className="flex items-center gap-1 text-[10px] text-[#8C827A]">
                        <span>{item.gender}</span>
                        {item.ageGroup && (
                          <>
                            <span>•</span>
                            <span>{item.ageGroup}</span>
                          </>
                        )}
                      </div>
                      {item.notes && (
                        <div className="mt-1 text-[10px] text-[#8C6D58] bg-[#F4EFEA] p-1 rounded font-sans">
                          {item.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

       {/* VIEW MODE 2: SUMMARY TABLE */}
            {viewMode === 'summary' && (
              <div className="space-y-4">
                {/* 當區別選「全部」且篩選了特定年齡層時，以年齡層/組別來彙整顯示 */}
                {selectedDistrict === '全部' && selectedAge !== '全部' ? (
                  <div className="bg-[#FDFBF7] border border-[#EBE4D8] rounded-xl p-3.5 shadow-xs">
                    <div className="flex items-center justify-between border-b border-[#EBE4D8] pb-2 mb-2">
                      <span className="font-serif font-medium text-sm text-[#2C2725]">年齡層篩選總表：{selectedAge}</span>
                      <span className="text-xs text-[#8C6D58] bg-[#F2EBE4] px-2 py-0.5 rounded-full font-medium">
                        共 {filteredRoster.length} 人
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-[#F4EFEA]/60 p-2 rounded-lg">
                        <div className="font-medium text-[#7A6455] mb-1">聖徒 ({filteredRoster.filter(i => i.identity === '聖徒').length})</div>
                        <div className="text-[#5A524D] leading-relaxed">
                          {filteredRoster.filter(i => i.identity === '聖徒').map(i => `${i.name}${i.district ? `(${i.district})` : ''}`).join('、') || '無'}
                        </div>
                      </div>
                      <div className="bg-[#E8F0E8]/50 p-2 rounded-lg">
                        <div className="font-medium text-[#4E6B4E] mb-1">福音朋友 ({filteredRoster.filter(i => i.identity === '福音朋友').length})</div>
                        <div className="text-[#5A524D] leading-relaxed">
                          {filteredRoster.filter(i => i.identity === '福音朋友').map(i => `${i.name}${i.district ? `(${i.district})` : ''}`).join('、') || '無'}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* 預設四大分區總表 */
                  ['信光區', '藝文區', '寶慶區', '自強區'].map(dist => {
                    const distItems = filteredRoster.filter(r => r.district === dist);
                    if (distItems.length === 0) return null;

                    return (
                      <div key={dist} className="bg-[#FDFBF7] border border-[#EBE4D8] rounded-xl p-3.5 shadow-xs">
                        <div className="flex items-center justify-between border-b border-[#EBE4D8] pb-2 mb-2">
                          <span className="font-serif font-medium text-sm text-[#2C2725]">{dist}</span>
                          <span className="text-xs text-[#8C6D58] bg-[#F2EBE4] px-2 py-0.5 rounded-full font-medium">
                            共 {distItems.length} 人
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-[#F4EFEA]/60 p-2 rounded-lg">
                            <div className="font-medium text-[#7A6455] mb-1">聖徒 ({distItems.filter(i => i.identity === '聖徒').length})</div>
                            <div className="text-[#5A524D] leading-relaxed">
                              {distItems.filter(i => i.identity === '聖徒').map(i => i.name).join('、') || '無'}
                            </div>
                          </div>
                          <div className="bg-[#E8F0E8]/50 p-2 rounded-lg">
                            <div className="font-medium text-[#4E6B4E] mb-1">福音朋友 ({distItems.filter(i => i.identity === '福音朋友').length})</div>
                            <div className="text-[#5A524D] leading-relaxed">
                              {distItems.filter(i => i.identity === '福音朋友').map(i => i.name).join('、') || '無'}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

        {/* TAB 2: 代禱事項 */}
        {activeTab === 'items' && (
          <div className="space-y-4 animate-fade-in">
            {/* Header & Sub-view toggle */}
            <div className="flex flex-col gap-2 border-b border-[#EBE4D8] pb-3">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-sm font-medium text-[#2C2725] tracking-wide">召會與肢體代禱事項</h2>
                <button 
                  onClick={() => {
                    setCurrentPrayerItem({ id: '', category: '召會行動', title: '', content: '' });
                    setIsPrayerModalOpen(true);
                  }}
                  className="flex items-center space-x-1 text-xs bg-[#8C6D58] hover:bg-[#785C49] text-white px-3 py-1.5 rounded-xl shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>新增事項</span>
                </button>
              </div>

              {/* Sub-view switcher */}
              <div className="flex bg-[#F4EFEA] p-1 rounded-xl border border-[#E6DDD0] text-xs">
                <button 
                  onClick={() => setPrayerSubView('items')}
                  className={`flex-1 py-1.5 rounded-lg text-center transition-all ${prayerSubView === 'items' ? 'bg-[#FDFBF7] font-medium text-[#8C6D58] shadow-xs' : 'text-[#8C827A]'}`}
                >
                  分項卡片列表
                </button>
                <button 
                  onClick={() => setPrayerSubView('weeklySummary')}
                  className={`flex-1 py-1.5 rounded-lg text-center transition-all ${prayerSubView === 'weeklySummary' ? 'bg-[#FDFBF7] font-medium text-[#8C6D58] shadow-xs' : 'text-[#8C827A]'}`}
                >
                  每週最新一版紀錄彙整
                </button>
              </div>
            </div>

            {prayerSubView === 'items' ? (
              <div className="space-y-3">
                {prayerItems.map(item => (
                  <div key={item.id} className="bg-[#FDFBF7] border border-[#EBE4D8] rounded-xl p-4 shadow-xs relative">
                    <div className="flex items-start justify-between border-b border-[#EBE4D8] pb-2 mb-2">
                      <div>
                        <span className="text-[10px] text-[#8C6D58] bg-[#F2EBE4] px-2 py-0.5 rounded-full font-medium">
                          {item.category}
                        </span>
                        <h3 className="font-serif font-medium text-base text-[#2C2725] mt-1">{item.title}</h3>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={() => handleCopyText(`${item.title}\n\n${item.content}`, item.title)}
                          className="p-1.5 text-[#8C827A] hover:text-[#8C6D58] hover:bg-[#F4EFEA] rounded-lg transition-colors"
                          title="複製整篇"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setCurrentPrayerItem(item);
                            setIsPrayerModalOpen(true);
                          }}
                          className="p-1.5 text-[#8C827A] hover:text-[#8C6D58] hover:bg-[#F4EFEA] rounded-lg transition-colors"
                          title="編輯"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-[#4A423E] leading-relaxed whitespace-pre-wrap font-sans">
                      {item.content}
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#F2EBE4] text-[10px] text-[#A0958B] flex justify-between items-center">
                      <span>最後更新日期: {item.updatedAt}</span>
                      <button 
                        onClick={() => handleCopyText(`${item.title}\n\n${item.content}`, item.title)}
                        className="text-[#8C6D58] flex items-center space-x-1 hover:underline"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>快速分享</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Weekly Summary Integrated Document */
              <div className="bg-[#FDFBF7] border border-[#EBE4D8] rounded-xl p-4 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#EBE4D8] pb-2">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#8C6D58]" />
                    <h3 className="font-serif font-medium text-sm text-[#2C2725]">本週最新一版代禱事項總彙整</h3>
                  </div>
                  <button
                    onClick={() => {
                      const fullText = prayerItems.map(item => `【${item.title}】\n${item.content}`).join("\n\n--------------------\n\n");
                      handleCopyText(fullText, "本週最新一版總彙整");
                    }}
                    className="flex items-center space-x-1 text-xs bg-[#8C6D58] text-white px-2.5 py-1 rounded-lg hover:bg-[#785C49]"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>一鍵複製全篇</span>
                  </button>
                </div>

                <div className="text-xs text-[#3D3735] space-y-4 leading-relaxed font-sans bg-[#F4EFEA]/60 p-3.5 rounded-xl border border-[#E8DFC0]/40">
                  {prayerItems.map((item, idx) => (
                    <div key={item.id} className="space-y-1">
                      <div className="font-medium text-[#8C6D58] font-serif border-b border-[#E6DDD0] pb-1 flex justify-between">
                        <span>{idx + 1}. 【{item.category}】{item.title}</span>
                        <span className="text-[10px] font-sans text-[#A0958B]">更新: {item.updatedAt}</span>
                      </div>
                      <div className="whitespace-pre-wrap text-[#4A423E] pt-1 pl-1">
                        {item.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: 近況更新 (Activity Logs) */}
        {activeTab === 'logs' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-[#EBE4D8] pb-2">
              <h2 className="font-serif text-sm font-medium text-[#2C2725]">共同編輯與近況更新</h2>
              <span className="text-xs text-[#8C827A]">歷史紀錄 ({logs.length})</span>
            </div>

            {logs.length === 0 ? (
              <div className="text-center py-12 bg-[#FDFBF7] border border-[#EBE4D8] rounded-xl text-[#A0958B] text-xs">
                目前尚無近況更新紀錄。新增名單或編輯代禱事項時，將在此自動產生紀錄。
              </div>
            ) : (
              <div className="relative border-l-2 border-[#EBE4D8] ml-3 pl-4 space-y-4">
                {logs.map((log) => (
                  <div key={log.id} className="relative group">
                    {/* Circle Marker */}
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#8C6D58] border-2 border-[#FDFBF7]"></div>
                    
                    <div className="bg-[#FDFBF7] border border-[#EBE4D8] rounded-xl p-3 shadow-xs">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-medium text-[#8C6D58]">{log.user}</span>
                        <span className="text-[10px] text-[#A0958B]">{log.timestamp}</span>
                      </div>
                      <p className="text-xs text-[#3D3735]">{log.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Floating Add Button (For Roster Tab) */}
      {activeTab === 'roster' && (
        <button 
          onClick={() => setIsAddMemberOpen(true)}
          className="fixed right-5 bottom-6 z-30 bg-[#8C6D58] hover:bg-[#785C49] text-white p-3.5 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center"
          title="新增名單"
        >
          <Plus className="w-5 h-5" />
        </button>
      )}

      {/* MODAL 1: Co-Editor Name Modal */}
      {isEditorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] rounded-2xl border border-[#EBE4D8] p-5 w-full max-w-xs shadow-xl animate-scale-up">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif font-medium text-base text-[#2C2725]">設定配搭名稱</h3>
              <button 
                onClick={() => {
                  if (!coEditorName.trim()) {
                    showToast("提醒：尚未填寫配搭名稱，更新將顯示為『尚未設定』");
                  }
                  setIsEditorModalOpen(false);
                }} 
                className="text-[#A0958B] hover:text-[#3D3735]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#8C827A] mb-4">請輸入您的姓名/稱呼，以便配搭們識別彼此的更新紀錄。</p>
            <input 
              type="text"
              value={coEditorName}
              onChange={(e) => setCoEditorName(e.target.value)}
              placeholder="例如: 張弟兄 / 莊姊妹"
              className="w-full bg-[#F4EFEA] border border-[#E6DDD0] rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#8C6D58] mb-3"
            />

            {/* Offline status switch if already set */}
            {coEditorName.trim() && (
              <div className="mb-4 flex items-center justify-between text-xs bg-[#F4EFEA] p-2 rounded-xl border border-[#E6DDD0]">
                <span className="text-[#6E645D]">線上連線狀態：</span>
                <button
                  type="button"
                  onClick={() => setIsSelfOnline(!isSelfOnline)}
                  className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
                    isSelfOnline ? 'bg-[#E8F0E8] text-[#3A523A] border border-[#CDE0CD]' : 'bg-[#F2EBE4] text-[#7A6455]'
                  }`}
                >
                  {isSelfOnline ? '線上' : '已下線'}
                </button>
              </div>
            )}

            <div className="flex gap-2">
              <button 
                onClick={() => {
                  if (!coEditorName.trim()) {
                    showToast("提醒：尚未填寫配搭名稱，更新將顯示為『尚未設定』");
                  } else {
                    setIsSelfOnline(true);
                    addLog(`${coEditorName.trim()} 已上線加入配搭`);
                    showToast("已儲存配搭名稱");
                  }
                  setIsEditorModalOpen(false);
                }}
                className="w-full bg-[#8C6D58] hover:bg-[#785C49] text-white text-xs py-2 rounded-xl transition-colors font-medium"
              >
                確定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Online Co-editors List Modal */}
      {isOnlineModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] rounded-2xl border border-[#EBE4D8] p-5 w-full max-w-xs shadow-xl animate-scale-up">
            <div className="flex items-center justify-between mb-3 border-b border-[#EBE4D8] pb-2">
              <div className="flex items-center space-x-2">
                <span className={`w-2.5 h-2.5 rounded-full ${onlineUsers.length > 0 ? 'bg-[#4E6B4E] animate-pulse' : 'bg-[#A0958B]'}`}></span>
                <h3 className="font-serif font-medium text-base text-[#2C2725]">目前線上配搭</h3>
              </div>
              <button onClick={() => setIsOnlineModalOpen(false)} className="text-[#A0958B] hover:text-[#3D3735]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#8C827A] mb-3">
              {onlineUsers.length > 0 ? (
                <>當前有 <span className="font-semibold text-[#4E6B4E]">{onlineUsers.length} 位</span> 配搭同時在線上：</>
              ) : (
                <>目前尚無配搭在線上，請點選右上角圖示設定名稱並連線。</>
              )}
            </p>

            {onlineUsers.length > 0 ? (
              <div className="space-y-2.5 mb-4">
                {onlineUsers.map(u => (
                  <div key={u.id} className="flex items-center justify-between bg-[#F4EFEA] p-2.5 rounded-xl border border-[#E6DDD0]">
                    <div className="flex items-center space-x-2.5">
                      <div className={`w-7 h-7 rounded-full ${u.avatarBg} text-white flex items-center justify-center text-xs font-serif shadow-xs`}>
                        {u.name.slice(0, 1)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-medium text-[#2C2725]">{u.name}</span>
                          {u.isSelf && <span className="text-[10px] bg-[#8C6D58] text-white px-1.5 py-0.2 rounded font-sans">(你)</span>}
                        </div>
                        <span className="text-[10px] text-[#8C827A] block">{u.status}</span>
                      </div>
                    </div>
                    {u.isSelf ? (
                      <button 
                        onClick={() => {
                          setIsSelfOnline(false);
                          addLog(`${u.name} 已下線`);
                          showToast("已下線");
                        }}
                        className="text-[10px] text-[#A84A4A] hover:underline"
                      >
                        下線
                      </button>
                    ) : (
                      <span className="text-[10px] text-[#A0958B]">{u.lastActive}</span>
                    )}
                  </div>
                ))}
              </div>
            ) : null}

            <button 
              onClick={() => setIsOnlineModalOpen(false)}
              className="w-full bg-[#8C6D58] text-white text-xs py-2 rounded-xl hover:bg-[#785C49] transition-colors"
            >
              關閉
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: Add Member Modal */}
      {isAddMemberOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] rounded-2xl border border-[#EBE4D8] p-5 w-full max-w-sm shadow-xl animate-scale-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 border-b border-[#EBE4D8] pb-2">
              <h3 className="font-serif font-medium text-base text-[#2C2725]">新增代禱名單</h3>
              <button onClick={() => setIsAddMemberOpen(false)} className="text-[#A0958B] hover:text-[#3D3735]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMemberSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#6E645D] mb-1">大分類 (區別)</label>
                <select 
                  value={newMember.district}
                  onChange={(e) => setNewMember({ ...newMember, district: e.target.value })}
                  className="w-full bg-[#F4EFEA] border border-[#E6DDD0] rounded-xl px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="信光區">信光區</option>
                  <option value="藝文區">藝文區</option>
                  <option value="寶慶區">寶慶區</option>
                  <option value="自強區">自強區</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#6E645D] mb-1">年齡層</label>
                  <select 
                    value={newMember.ageGroup}
                    onChange={(e) => setNewMember({ ...newMember, ageGroup: e.target.value })}
                    className="w-full bg-[#F4EFEA] border border-[#E6DDD0] rounded-xl px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="">(無)</option>
                    <option value="青職">青職</option>
                    <option value="大專">大專</option>
                    <option value="高中">高中</option>
                    <option value="國中">國中</option>
                    <option value="兒童">兒童</option>
                    <option value="學齡前">學齡前</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#6E645D] mb-1">性別</label>
                  <select 
                    value={newMember.gender}
                    onChange={(e) => setNewMember({ ...newMember, gender: e.target.value })}
                    className="w-full bg-[#F4EFEA] border border-[#E6DDD0] rounded-xl px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="弟兄">弟兄</option>
                    <option value="姊妹">姊妹</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#6E645D] mb-1">身份</label>
                <select 
                  value={newMember.identity}
                  onChange={(e) => setNewMember({ ...newMember, identity: e.target.value })}
                  className="w-full bg-[#F4EFEA] border border-[#E6DDD0] rounded-xl px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="聖徒">聖徒 (聖徒未得救家人)</option>
                  <option value="福音朋友">福音朋友</option>
                </select>
              </div>

              <div>
                <label className="block text-[#6E645D] mb-1">姓名 *</label>
                <input 
                  type="text"
                  required
                  placeholder="請輸入姓名"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full bg-[#F4EFEA] border border-[#E6DDD0] rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#6E645D] mb-1">備註 (如：大三/香蘭姐妹孫侄子)</label>
                <textarea 
                  rows={2}
                  placeholder="補充說明..."
                  value={newMember.notes}
                  onChange={(e) => setNewMember({ ...newMember, notes: e.target.value })}
                  className="w-full bg-[#F4EFEA] border border-[#E6DDD0] rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setIsAddMemberOpen(false)}
                  className="px-4 py-2 text-xs rounded-xl text-[#8C827A] hover:bg-[#F4EFEA]"
                >
                  取消
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-xs rounded-xl bg-[#8C6D58] text-white hover:bg-[#785C49]"
                >
                  確認新增
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Edit/Add Prayer Item Modal */}
      {isPrayerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] rounded-2xl border border-[#EBE4D8] p-5 w-full max-w-md shadow-xl animate-scale-up max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-[#EBE4D8] pb-2">
              <h3 className="font-serif font-medium text-base text-[#2C2725]">
                {currentPrayerItem.id ? "編輯代禱事項" : "新增代禱事項"}
              </h3>
              <button onClick={() => setIsPrayerModalOpen(false)} className="text-[#A0958B] hover:text-[#3D3735]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePrayerItem} className="space-y-3 text-xs flex-1 flex flex-col">
              <div>
                <label className="block text-[#6E645D] mb-1">分類標籤</label>
                <select 
                  value={currentPrayerItem.category}
                  onChange={(e) => setCurrentPrayerItem({ ...currentPrayerItem, category: e.target.value })}
                  className="w-full bg-[#F4EFEA] border border-[#E6DDD0] rounded-xl px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="召會行動">召會行動</option>
                  <option value="福音白馬">福音白馬</option>
                  <option value="聖徒狀況">聖徒狀況</option>
                  <option value="其他">其他</option>
                </select>
              </div>

              <div>
                <label className="block text-[#6E645D] mb-1">標題 *</label>
                <input 
                  type="text"
                  required
                  placeholder="輸入事項標題"
                  value={currentPrayerItem.title}
                  onChange={(e) => setCurrentPrayerItem({ ...currentPrayerItem, title: e.target.value })}
                  className="w-full bg-[#F4EFEA] border border-[#E6DDD0] rounded-xl px-3 py-2 text-xs focus:outline-none font-medium"
                />
              </div>

              <div className="flex-1 flex flex-col min-h-[160px]">
                <label className="block text-[#6E645D] mb-1">整篇內文 (可直接複製粘貼或編輯) *</label>
                <textarea 
                  required
                  rows={8}
                  placeholder="寫下詳細代禱內容..."
                  value={currentPrayerItem.content}
                  onChange={(e) => setCurrentPrayerItem({ ...currentPrayerItem, content: e.target.value })}
                  className="w-full flex-1 bg-[#F4EFEA] border border-[#E6DDD0] rounded-xl p-3 text-xs focus:outline-none leading-relaxed font-sans"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setIsPrayerModalOpen(false)}
                  className="px-4 py-2 text-xs rounded-xl text-[#8C827A] hover:bg-[#F4EFEA]"
                >
                  取消
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-xs rounded-xl bg-[#8C6D58] text-white hover:bg-[#785C49]"
                >
                  儲存並發布
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#3D3735] text-[#FDFBF7] px-4 py-2 rounded-full text-xs shadow-md flex items-center space-x-1.5 animate-bounce-short">
          <Check className="w-3.5 h-3.5 text-[#768A75]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

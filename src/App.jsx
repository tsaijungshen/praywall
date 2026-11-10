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
  { id: "qz-10", district: "", ageGroup: "大專", gender: "弟兄", identity

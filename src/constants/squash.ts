


// 1. Định nghĩa kiểu dữ liệu cho thống kê cầu thủ
export type PlayerStats = {
  // Thống kê cơ bản
  matchesPlayed: number;
  minutesPlayed: number;
  goals: number;
  assists: number;
  
  // Thống kê kỹ thuật
  passAccuracy: number; // %
  passesCompleted: number;
  passesAttempted: number;
  keyPasses: number;
  
  // Thống kê tấn công
  shotsOnTarget: number;
  shotsOffTarget: number;
  shotAccuracy: number; // %
  dribbleSuccess: number; // %
  dribblesCompleted: number;
  dribblesAttempted: number;
  
  // Thống kê phòng ngự
  tackles: number;
  tackleSuccess: number; // %
  interceptions: number;
  clearances: number;
  blocks: number;
  
  // Thống kê thể lực
  sprintSpeed: number; // km/h
  distance: number; // km per game
  stamina: number; // %
  
  // Rating tổng thể
  overallRating: number; // 0-100
  formRating: number; // Recent form 0-100
};

export type PlayerAttributes = {
  // Thuộc tính kỹ thuật (0-100)
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physicality: number;
};

export type PlayerCareerStats = {
  season: string;
  stats: PlayerStats;
};

// 2. Định nghĩa kiểu dữ liệu cho một cầu thủ (mở rộng)
export type Player = {
    id: number;
    firstName: string;
    lastName: string;
    number: number;
    imageSrc: string;
    position: string;
    logo: string;
    
    // Thông tin chi tiết
    age: number;
    height: number; // cm
    weight: number; // kg
    nationality: string;
    preferredFoot: 'Left' | 'Right' | 'Both';
    marketValue: number; // in millions
    
    // Thống kê hiện tại
    currentStats: PlayerStats;
    attributes: PlayerAttributes;
    careerStats: PlayerCareerStats[];
  };

// Hàm helper để tạo dữ liệu mẫu
const createSampleStats = (overrides: Partial<PlayerStats> = {}): PlayerStats => ({
  matchesPlayed: 35,
  minutesPlayed: 2800,
  goals: 12,
  assists: 8,
  passAccuracy: 85,
  passesCompleted: 1250,
  passesAttempted: 1470,
  keyPasses: 65,
  shotsOnTarget: 45,
  shotsOffTarget: 25,
  shotAccuracy: 64,
  dribbleSuccess: 78,
  dribblesCompleted: 145,
  dribblesAttempted: 186,
  tackles: 35,
  tackleSuccess: 72,
  interceptions: 28,
  clearances: 15,
  blocks: 8,
  sprintSpeed: 28.5,
  distance: 10.2,
  stamina: 88,
  overallRating: 82,
  formRating: 85,
  ...overrides
});

const createSampleAttributes = (overrides: Partial<PlayerAttributes> = {}): PlayerAttributes => ({
  pace: 85,
  shooting: 78,
  passing: 82,
  dribbling: 88,
  defending: 45,
  physicality: 72,
  ...overrides
});

export const anphuPlayers: Player[] = [
  {
    id: 1,
    firstName: 'Hao',
    lastName: 'Nguyen',
    number: 7,
    imageSrc: '/anphu/hao.png',
    position: 'LW',
    logo: 'HN',
    age: 25,
    height: 175,
    weight: 68,
    nationality: 'Vietnam',
    preferredFoot: 'Left',
    marketValue: 2.5,
    currentStats: createSampleStats({
      goals: 18,
      assists: 12,
      dribbleSuccess: 82,
      overallRating: 84
    }),
    attributes: createSampleAttributes({
      pace: 88,
      dribbling: 85,
      shooting: 80,
      defending: 35
    }),
    careerStats: [
      { season: '2023/24', stats: createSampleStats({ goals: 15, assists: 10 }) },
      { season: '2022/23', stats: createSampleStats({ goals: 12, assists: 8 }) }
    ]
  },
  {
    id: 2,
    firstName: 'Tuan',
    lastName: 'Tran',
    number: 10,
    imageSrc: '/anphu/tuan.png',
    position: 'AM',
    logo: 'TT',
    age: 28,
    height: 172,
    weight: 65,
    nationality: 'Vietnam',
    preferredFoot: 'Right',
    marketValue: 3.2,
    currentStats: createSampleStats({
      goals: 22,
      assists: 15,
      keyPasses: 85,
      passAccuracy: 88,
      overallRating: 87
    }),
    attributes: createSampleAttributes({
      pace: 82,
      shooting: 85,
      passing: 90,
      dribbling: 87,
      defending: 40
    }),
    careerStats: [
      { season: '2023/24', stats: createSampleStats({ goals: 20, assists: 14 }) },
      { season: '2022/23', stats: createSampleStats({ goals: 18, assists: 12 }) }
    ]
  },
  {
    id: 3,
    firstName: 'Triet',
    lastName: 'Le',
    number: 8,
    imageSrc: '/anphu/triet.png',
    position: 'CM',
    logo: 'TL',
    age: 26,
    height: 178,
    weight: 72,
    nationality: 'Vietnam',
    preferredFoot: 'Both',
    marketValue: 2.8,
    currentStats: createSampleStats({
      goals: 8,
      assists: 18,
      passAccuracy: 92,
      keyPasses: 95,
      overallRating: 85
    }),
    attributes: createSampleAttributes({
      pace: 75,
      shooting: 72,
      passing: 92,
      dribbling: 80,
      defending: 68
    }),
    careerStats: [
      { season: '2023/24', stats: createSampleStats({ goals: 6, assists: 16 }) },
      { season: '2022/23', stats: createSampleStats({ goals: 4, assists: 14 }) }
    ]
  },
  {
    id: 4,
    firstName: 'Vinh',
    lastName: 'Pham',
    number: 11,
    imageSrc: '/anphu/vinh.png',
    position: 'RW',
    logo: 'VP',
    age: 24,
    height: 173,
    weight: 67,
    nationality: 'Vietnam',
    preferredFoot: 'Left',
    marketValue: 2.3,
    currentStats: createSampleStats({
      goals: 16,
      assists: 10,
      dribbleSuccess: 80,
      shotAccuracy: 68,
      overallRating: 83
    }),
    attributes: createSampleAttributes({
      pace: 90,
      shooting: 78,
      passing: 75,
      dribbling: 88,
      defending: 38
    }),
    careerStats: [
      { season: '2023/24', stats: createSampleStats({ goals: 14, assists: 8 }) },
      { season: '2022/23', stats: createSampleStats({ goals: 11, assists: 6 }) }
    ]
  },
  {
    id: 5,
    firstName: 'Lam',
    lastName: 'Khieu',
    number: 6,
    imageSrc: '/anphu/lam-khieu.png',
    position: 'DM',
    logo: 'LK',
    age: 29,
    height: 180,
    weight: 75,
    nationality: 'Vietnam',
    preferredFoot: 'Right',
    marketValue: 2.1,
    currentStats: createSampleStats({
      goals: 3,
      assists: 12,
      tackles: 65,
      interceptions: 45,
      passAccuracy: 89,
      overallRating: 82
    }),
    attributes: createSampleAttributes({
      pace: 70,
      shooting: 60,
      passing: 85,
      dribbling: 72,
      defending: 88,
      physicality: 82
    }),
    careerStats: [
      { season: '2023/24', stats: createSampleStats({ goals: 2, assists: 10 }) },
      { season: '2022/23', stats: createSampleStats({ goals: 1, assists: 8 }) }
    ]
  },
  {
    id: 6,
    firstName: 'Vu',
    lastName: 'Hoang',
    number: 4,
    imageSrc: '/anphu/vu.png',
    position: 'CB',
    logo: 'VH',
    age: 27,
    height: 185,
    weight: 78,
    nationality: 'Vietnam',
    preferredFoot: 'Right',
    marketValue: 1.8,
    currentStats: createSampleStats({
      goals: 5,
      assists: 3,
      tackles: 78,
      clearances: 125,
      blocks: 25,
      passAccuracy: 86,
      overallRating: 81
    }),
    attributes: createSampleAttributes({
      pace: 65,
      shooting: 45,
      passing: 75,
      dribbling: 55,
      defending: 92,
      physicality: 88
    }),
    careerStats: [
      { season: '2023/24', stats: createSampleStats({ goals: 4, assists: 2 }) },
      { season: '2022/23', stats: createSampleStats({ goals: 3, assists: 1 }) }
    ]
  },
  {
    id: 7,
    firstName: 'Tan',
    lastName: 'Vo',
    number: 3,
    imageSrc: '/anphu/tan.png',
    position: 'LB',
    logo: 'TV',
    age: 25,
    height: 176,
    weight: 70,
    nationality: 'Vietnam',
    preferredFoot: 'Left',
    marketValue: 1.6,
    currentStats: createSampleStats({
      goals: 2,
      assists: 8,
      tackles: 52,
      interceptions: 35,
      passAccuracy: 83,
      overallRating: 79
    }),
    attributes: createSampleAttributes({
      pace: 85,
      shooting: 55,
      passing: 78,
      dribbling: 75,
      defending: 80,
      physicality: 75
    }),
    careerStats: [
      { season: '2023/24', stats: createSampleStats({ goals: 1, assists: 6 }) },
      { season: '2022/23', stats: createSampleStats({ goals: 0, assists: 4 }) }
    ]
  },
  {
    id: 8,
    firstName: 'Luan',
    lastName: 'Dang',
    number: 2,
    imageSrc: '/anphu/luan.png',
    position: 'RB',
    logo: 'LD',
    age: 26,
    height: 174,
    weight: 69,
    nationality: 'Vietnam',
    preferredFoot: 'Right',
    marketValue: 1.7,
    currentStats: createSampleStats({
      goals: 3,
      assists: 9,
      tackles: 48,
      interceptions: 32,
      passAccuracy: 84,
      overallRating: 80
    }),
    attributes: createSampleAttributes({
      pace: 88,
      shooting: 58,
      passing: 80,
      dribbling: 78,
      defending: 82,
      physicality: 76
    }),
    careerStats: [
      { season: '2023/24', stats: createSampleStats({ goals: 2, assists: 7 }) },
      { season: '2022/23', stats: createSampleStats({ goals: 1, assists: 5 }) }
    ]
  },
  {
    id: 9,
    firstName: 'Cong',
    lastName: 'Danh',
    number: 9,
    imageSrc: '/anphu/cong-danh.png',
    position: 'ST',
    logo: 'CD',
    age: 27,
    height: 182,
    weight: 76,
    nationality: 'Vietnam',
    preferredFoot: 'Right',
    marketValue: 3.5,
    currentStats: createSampleStats({
      goals: 28,
      assists: 6,
      shotsOnTarget: 78,
      shotAccuracy: 72,
      overallRating: 88
    }),
    attributes: createSampleAttributes({
      pace: 85,
      shooting: 92,
      passing: 75,
      dribbling: 82,
      defending: 25,
      physicality: 85
    }),
    careerStats: [
      { season: '2023/24', stats: createSampleStats({ goals: 25, assists: 5 }) },
      { season: '2022/23', stats: createSampleStats({ goals: 22, assists: 4 }) }
    ]
  },
  {
    id: 10,
    firstName: 'Duc',
    lastName: 'Vo',
    number: 99,
    imageSrc: '/anphu/duc.png',
    position: 'PRESIDENT',
    logo: 'MD',
    age: 35,
    height: 175,
    weight: 72,
    nationality: 'Vietnam',
    preferredFoot: 'Right',
    marketValue: 5.0,
    currentStats: createSampleStats({
      goals: 0,
      assists: 100,
      passAccuracy: 100,
      overallRating: 100,
      formRating: 100
    }),
    attributes: createSampleAttributes({
      pace: 70,
      shooting: 60,
      passing: 100,
      dribbling: 85,
      defending: 90,
      physicality: 80
    }),
    careerStats: [
      { season: '2023/24', stats: createSampleStats({ goals: 0, assists: 95 }) },
      { season: '2022/23', stats: createSampleStats({ goals: 0, assists: 90 }) }
    ]
  },
  {
    id: 11,
    firstName: 'Van',
    lastName: 'Thanh',
    number: 1,
    imageSrc: '/anphu/coach.png',
    position: 'GK',
    logo: 'VT',
    age: 30,
    height: 188,
    weight: 82,
    nationality: 'Vietnam',
    preferredFoot: 'Right',
    marketValue: 1.2,
    currentStats: createSampleStats({
      goals: 0,
      assists: 2,
      tackles: 8,
      clearances: 45,
      blocks: 35,
      passAccuracy: 78,
      overallRating: 83
    }),
    attributes: createSampleAttributes({
      pace: 55,
      shooting: 30,
      passing: 65,
      dribbling: 40,
      defending: 95,
      physicality: 90
    }),
    careerStats: [
      { season: '2023/24', stats: createSampleStats({ goals: 0, assists: 1 }) },
      { season: '2022/23', stats: createSampleStats({ goals: 0, assists: 0 }) }
    ]
  }
];




// 1. Định nghĩa kiểu dữ liệu cho một cầu thủ (ví dụ)
export type Player = {
    id: number;
    firstName: string;
    lastName: string;
    number: number;
    imageSrc: string;
    position: string;
    logo: string;
  };

export const anphuPlayers: Player[] = [
  {
    id: 1,
    firstName: 'Hao',
    lastName: 'Nguyen',
    number: 7,
    imageSrc: '/anphu/hao.png',
    position: 'LW',
    logo: 'HN'
  },
  {
    id: 2,
    firstName: 'Tuan',
    lastName: 'Tran',
    number: 10,
    imageSrc: '/anphu/tuan.png',
    position: 'AM',
    logo: 'TT'
  },
  {
    id: 3,
    firstName: 'Triet',
    lastName: 'Le',
    number: 8,
    imageSrc: '/anphu/triet.png',
    position: 'CM',
    logo: 'TL'
  },
  {
    id: 4,
    firstName: 'Vinh',
    lastName: 'Pham',
    number: 11,
    imageSrc: '/anphu/vinh.png',
    position: 'RW',
    logo: 'VP'
  },
  {
    id: 5,
    firstName: 'Lam',
    lastName: 'Khieu',
    number: 6,
    imageSrc: '/anphu/lam-khieu.png',
    position: 'DM',
    logo: 'LK'
  },
  {
    id: 6,
    firstName: 'Vu',
    lastName: 'Hoang',
    number: 4,
    imageSrc: '/anphu/vu.png',
    position: 'CB',
    logo: 'VH'
  },
  {
    id: 7,
    firstName: 'Tan',
    lastName: 'Vo',
    number: 3,
    imageSrc: '/anphu/tan.png',
    position: 'LB',
    logo: 'TV'
  },
  {
    id: 8,
    firstName: 'Luan',
    lastName: 'Dang',
    number: 2,
    imageSrc: '/anphu/luan.png',
    position: 'RB',
    logo: 'LD'
  },
  {
    id: 9,
    firstName: 'Cong',
    lastName: 'Danh',
    number: 9,
    imageSrc: '/anphu/cong-danh.png',
    position: 'ST',
    logo: 'CD'
  },
  {
    id: 10,
    firstName: 'Minh',
    lastName: 'Duc',
    number: 99,
    imageSrc: '/anphu/president.png',
    position: 'PRE',
    logo: 'MD'
  },
  {
    id: 11,
    firstName: 'Van',
    lastName: 'Thanh',
    number: 1,
    imageSrc: '/anphu/coach.png',
    position: 'GK',
    logo: 'VT'
  }
];

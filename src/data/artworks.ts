export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  image: string;
  width: number;
  height: number;
}

export const artworks: Artwork[] = [
  {
    id: '1',
    title: '读书的女子',
    artist: '约翰内斯·维米尔',
    year: 1665,
    image: '/src/assets/1.jpg',
    width: 320,
    height: 400,
  },
  {
    id: '2',
    title: '黑衣绅士肖像',
    artist: '伦勃朗·凡·莱因',
    year: 1634,
    image: '/src/assets/2.jpg',
    width: 280,
    height: 360,
  },
  {
    id: '3',
    title: '沉思的哲学家',
    artist: '伦勃朗·凡·莱因',
    year: 1631,
    image: '/src/assets/3.jpg',
    width: 400,
    height: 480,
  },
  {
    id: '4',
    title: '戴帽的少女',
    artist: '约翰内斯·维米尔',
    year: 1665,
    image: '/src/assets/4.jpg',
    width: 280,
    height: 360,
  },
  {
    id: '5',
    title: '微笑的骑士',
    artist: '弗兰斯·哈尔斯',
    year: 1624,
    image: '/src/assets/1.jpg',
    width: 480,
    height: 560,
  },
  {
    id: '6',
    title: '拿破仑肖像',
    artist: '雅克-路易·大卫',
    year: 1807,
    image: '/src/assets/2.jpg',
    width: 240,
    height: 320,
  },
  {
    id: '7',
    title: '持貂女子',
    artist: '列奥纳多·达·芬奇',
    year: 1489,
    image: '/src/assets/3.jpg',
    width: 360,
    height: 440,
  },
];
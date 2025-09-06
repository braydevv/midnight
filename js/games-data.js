// Games data for the midnight website
const GAMES_DATA = [
  {
    id: 'bad-parenting',
    title: 'bad parenting',
    description: 'bad parenting is a funny game where you make bad choices as a parent and see what happens.',
    image: 'https://m.media-amazon.com/images/M/MV5BMzUyMjM4NmUtMWU5MS00MjJhLTlkZmUtYmM0OGIyMWQ5MTRlXkEyXkFqcGc@._V1_QL75_UY281_CR0,0,500,281_.jpg',
    url: '/midnight/g/bad-parenting'
  },
  {
    id: 'space-waves',
    title: 'space waves',
    description: 'ride the waves of space, dodge obstacles, and chase the highest score.',
    image: 'https://imgs.crazygames.com/space-waves_16x9/20241203031650/space-waves_16x9-cover?metadata=none&quality=100&width=1200&height=630&fit=crop',
    url: '/midnight/g/space-waves'
  },
  {
    id: 'monkey-mart',
    title: 'monkey mart',
    description: 'help the monkey run a busy market, stock shelves, and serve customers.',
    image: 'https://1games.io/data/image/game/monkey-mart.jpg',
    url: '/midnight/g/monkey-mart'
  },
  {
    id: 'hill-climb-racing',
    title: 'hill climb racing',
    description: 'control a growing snake to collect food while avoiding walls and your own tail.',
    image: 'https://store-images.microsoft.com/image/apps.18483.9007199266379485.0000ad5a-1400-4539-b79a-62b2b9248545.0ac4e475-8d4b-42bb-8723-14576cb8e50a?h=1280',
    url: '/midnight/g/hill-climb-racing'
  },
  {
    id: 'crazy-cars',
    title: 'crazy cars',
    description: 'race fast cars through wild tracks and dodge obstacles.',
    image: 'https://play-lh.googleusercontent.com/6C2xlwUSqWrcWa-25Ir1mMzGnjnoShLcxhrWkL8pBuGFS6aqZpDOqDpe09dHsSQQinE=w526-h296-rw',
    url: '/midnight/g/crazy-cars'
  },
  {
    id: 'dreadhead-parkour',
    title: 'dreadhead parkour',
    description: 'jump, flip, and run through tricky parkour levels.',
    image: 'https://i.ytimg.com/vi/_bxWHYcv4UA/maxresdefault.jpg',
    url: '/midnight/g/dreadhead-parkour'
  },
  {
    id: 'fnaf',
    title: 'fnaf',
    description: 'survive the night and watch out for haunted animatronics.',
    image: 'https://image.api.playstation.com/vulcan/img/cfn/11307beluGq0SO4-dqIevRAKnuYU-hs2n9oqxsSitAxewEH8dX32eH6cDSt29sMFte8lQEG-2CvTYaGGEllg0vS6jsECJJGo.png',
    url: '/midnight/g/fnaf'
  },
  {
    id: 'geometry-dash',
    title: 'geometry dash',
    description: 'jump and fly through rhythm based levels full of spikes and obstacles.',
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/322170/capsule_616x353.jpg?t=1703006148',
    url: '/midnight/g/geometry-dash'
  },
  {
    id: 'breakout',
    title: 'breakout',
    description: 'bounce a ball to break through rows of colorful blocks in this classic game.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    url: 'https://breakout.io'
  },
  {
    id: 'frogger',
    title: 'frogger',
    description: 'help a frog cross busy roads and rivers to reach safety in this arcade classic.',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    url: 'https://frogger.io'
  },
  {
    id: 'centipede',
    title: 'centipede',
    description: 'shoot down a centipede that moves through a field of mushrooms in this shooter.',
    image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    url: 'https://centipede.io'
  },
  {
    id: 'galaga',
    title: 'galaga',
    description: 'defend against waves of alien ships in this classic space shooter game.',
    image: 'https://images.unsplash.com/photo-1523867574998-1a336b6ded04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    url: 'https://galaga.io'
  },
  {
    id: 'qbert',
    title: 'q*bert',
    description: 'hop around a pyramid changing cube colors while avoiding enemies in this arcade game.',
    image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    url: 'https://qbert.io'
  },
  {
    id: 'dig-dug',
    title: 'dig dug',
    description: 'dig tunnels underground to defeat enemies by inflating them in this arcade classic.',
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    url: 'https://digdug.io'
  },
  {
    id: 'donkey-kong',
    title: 'donkey kong',
    description: 'rescue pauline from the giant ape by climbing ladders and jumping over barrels.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    url: 'https://donkeykong.io'
  },
  {
    id: 'ms-pacman',
    title: 'ms. pac-man',
    description: 'guide ms. pac-man through mazes while eating dots and avoiding ghosts.',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    url: 'https://mspacman.io'
  },
  {
    id: 'defender',
    title: 'defender',
    description: 'protect humanoids from alien abduction in this side-scrolling space shooter.',
    image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    url: 'https://defender.io'
  },
  {
    id: 'tempest',
    title: 'tempest',
    description: 'shoot enemies on the edges of a geometric tunnel in this vector graphics game.',
    image: 'https://images.unsplash.com/photo-1523867574998-1a336b6ded04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    url: 'https://tempest.io'
  },
  {
    id: 'robotron',
    title: 'robotron 2084',
    description: 'rescue humans from robots in this intense twin-stick shooter arcade game.',
    image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    url: 'https://robotron.io'
  },
  {
    id: 'joust',
    title: 'joust',
    description: 'fly on an ostrich and joust with enemy knights in this medieval arcade game.',
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    url: 'https://joust.io'
  }
];

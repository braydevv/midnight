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
    id: 'tetris',
    title: 'tetris',
    description: 'classic block-stacking puzzle game that challenges your spatial reasoning skills.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    url: 'https://tetris.io'
  },
  {
    id: 'snake',
    title: 'snake',
    description: 'control a growing snake to collect food while avoiding walls and your own tail.',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    url: 'https://snake.io'
  },
  {
    id: 'pacman',
    title: 'pac-man',
    description: 'navigate through mazes while eating dots and avoiding ghosts in this arcade classic.',
    image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    url: 'https://pacman.io'
  },
  {
    id: 'space-invaders',
    title: 'space invaders',
    description: 'defend earth from waves of alien invaders in this retro shooting game.',
    image: 'https://images.unsplash.com/photo-1523867574998-1a336b6ded04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    url: 'https://spaceinvaders.io'
  },
  {
    id: 'pong',
    title: 'pong',
    description: 'classic table tennis simulation that started the video game revolution.',
    image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    url: 'https://pong.io'
  },
  {
    id: 'asteroids',
    title: 'asteroids',
    description: 'destroy floating space rocks while avoiding collisions in this arcade shooter.',
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    url: 'https://asteroids.io'
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

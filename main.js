import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

// --- Web Audio 音效合成器 ---
class SoundFx {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playMiningHit() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(160, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playBreak() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playPlace() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(240, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playJump() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playItemPickup() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playHitZombie() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playPlayerHurt() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.6, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playTNTFuse() {
    this.init();
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 1.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 1.5);
    noise.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
  }

  playExplosion() {
    this.init();
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.15));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.8, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.8);
    noise.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
  }

  playBrushSound() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.06);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  playWolfBark() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(350, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }
}

const sounds = new SoundFx();

// --- 1.20.6 方塊與物品種類定義 ---
const BLOCKS = {
  OAK_LOG: { id: 1, name: '🌳 橡樹原木 (Oak Log)', color: 0x674d3c, requiredHits: 4 },
  SPRUCE_LOG: { id: 2, name: '🌲 雲杉原木 (Spruce Log)', color: 0x3a281a, requiredHits: 4 },
  BIRCH_LOG: { id: 3, name: '🪵 樺樹原木 (Birch Log)', color: 0xf0f0f0, requiredHits: 4 },
  JUNGLE_LOG: { id: 4, name: '🌴 叢林原木 (Jungle Log)', color: 0x523e2b, requiredHits: 4 },
  ACACIA_LOG: { id: 5, name: '🏜️ 金合歡原木 (Acacia Log)', color: 0x636569, requiredHits: 4 },
  DARK_OAK_LOG: { id: 6, name: '🌑 深色橡樹原木 (Dark Oak)', color: 0x2a1b0c, requiredHits: 4 },
  CHERRY_LOG: { id: 7, name: '🌸 櫻花原木 (Cherry Log)', color: 0xb56576, requiredHits: 4 },
  CHERRY_LEAVES: { id: 8, name: '🌸 櫻花樹葉 (Cherry Leaves)', color: 0xffb7c5, transparent: true, opacity: 0.9, requiredHits: 2 },
  CHEST: { id: 9, name: '📦 寶箱 (Chest)', color: 0x855428, requiredHits: 3 },
  SUSPICIOUS_SAND: { id: 10, name: '🏛️ 可疑的沙子 (Suspicious Sand)', color: 0xe0c068, requiredHits: 2 },
  COPPER_BULB: { id: 11, name: '💡 1.20.6 銅燈 (Copper Bulb)', color: 0xc87d55, emissive: 0xff8c00, requiredHits: 3 },
  CRAFTER: { id: 12, name: '⚙️ 1.20.6 自動合成器 (Crafter)', color: 0x5a5a6e, requiredHits: 4 },
  DECORATED_POT: { id: 13, name: '🏺 1.20.6 古風陶罐 (Decorated Pot)', color: 0xb25d38, requiredHits: 2 },
  GRASS: { id: 14, name: '草地方塊 (Grass)', color: 0x557a2b, requiredHits: 3 },
  DIRT: { id: 15, name: '泥土 (Dirt)', color: 0x866043, requiredHits: 3 },
  STONE: { id: 16, name: '石頭 (Stone)', color: 0x808080, requiredHits: 5 },
  LEAVES: { id: 17, name: '樹葉 (Leaves)', color: 0x3a5f0b, transparent: true, opacity: 0.9, requiredHits: 2 },
  BRICK: { id: 18, name: '磚塊 (Brick)', color: 0x9b4738, requiredHits: 4 },
  GLASS: { id: 19, name: '玻璃 (Glass)', color: 0xadd8e6, transparent: true, opacity: 0.5, requiredHits: 2 },
  DIAMOND: { id: 20, name: '鑽石塊 (Diamond)', color: 0x4eedd8, requiredHits: 5 },
  TNT: { id: 21, name: '💣 TNT 炸藥', color: 0xd93829, requiredHits: 1 },
  GLOWSTONE: { id: 22, name: '✨ 螢光石 (Glowstone)', color: 0xffe885, emissive: 0xffaa00, requiredHits: 3 },
  BRUSH_TOOL: { id: 23, name: '🧹 考古刷 (Archaeology Brush)', color: 0xd4a373, requiredHits: 1, isTool: true },
  BONE_ITEM: { id: 24, name: '🦴 骨頭 (餵食馴服狼)', color: 0xfefae0, requiredHits: 1, isTool: true },
  WOLF_ARMOR: { id: 25, name: '🛡️ 1.20.6 狼鎧甲 (Wolf Armor)', color: 0x8b5e3c, requiredHits: 1, isTool: true }
};

let HOTBAR_BLOCKS = [
  BLOCKS.OAK_LOG,
  BLOCKS.SPRUCE_LOG,
  BLOCKS.BIRCH_LOG,
  BLOCKS.JUNGLE_LOG,
  BLOCKS.ACACIA_LOG,
  BLOCKS.DARK_OAK_LOG,
  BLOCKS.CHERRY_LOG,
  BLOCKS.CHEST,
  BLOCKS.SUSPICIOUS_SAND,
  BLOCKS.DIAMOND
];

let selectedBlockIndex = 0;

// 32x32 高畫質紋理生成
function createPixelTexture(type, face = 'all') {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');

  function randomNoise(baseR, baseG, baseB, variance = 20) {
    const v = (Math.random() - 0.5) * variance;
    return `rgb(${Math.min(255, Math.max(0, baseR + v))}, ${Math.min(255, Math.max(0, baseG + v))}, ${Math.min(255, Math.max(0, baseB + v))})`;
  }

  if (type === 'GRASS') {
    if (face === 'top') {
      for (let x = 0; x < 32; x++) {
        for (let y = 0; y < 32; y++) {
          ctx.fillStyle = randomNoise(90, 165, 50, 25);
          ctx.fillRect(x, y, 1, 1);
        }
      }
    } else if (face === 'side') {
      for (let x = 0; x < 32; x++) {
        for (let y = 0; y < 32; y++) {
          ctx.fillStyle = randomNoise(130, 90, 60, 25);
          ctx.fillRect(x, y, 1, 1);
        }
      }
      for (let x = 0; x < 32; x++) {
        const grassDepth = 6 + Math.floor(Math.random() * 5);
        for (let y = 0; y < grassDepth; y++) {
          ctx.fillStyle = randomNoise(90, 165, 50, 25);
          ctx.fillRect(x, y, 1, 1);
        }
      }
    } else {
      for (let x = 0; x < 32; x++) {
        for (let y = 0; y < 32; y++) {
          ctx.fillStyle = randomNoise(130, 90, 60, 25);
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  } else if (type === 'DIRT') {
    for (let x = 0; x < 32; x++) {
      for (let y = 0; y < 32; y++) {
        ctx.fillStyle = randomNoise(130, 90, 60, 30);
        ctx.fillRect(x, y, 1, 1);
      }
    }
  } else if (type === 'STONE') {
    for (let x = 0; x < 32; x++) {
      for (let y = 0; y < 32; y++) {
        ctx.fillStyle = randomNoise(128, 128, 128, 35);
        ctx.fillRect(x, y, 1, 1);
      }
    }
  } else if (type === 'WOOD' || type === 'OAK_LOG') {
    if (face === 'top' || face === 'bottom') {
      ctx.fillStyle = '#a07850';
      ctx.fillRect(0, 0, 32, 32);
      ctx.strokeStyle = '#5c4028';
      ctx.lineWidth = 2;
      ctx.strokeRect(3, 3, 26, 26);
      ctx.strokeRect(9, 9, 14, 14);
      ctx.fillStyle = '#b88a5c';
      ctx.fillRect(13, 13, 6, 6);
    } else {
      for (let x = 0; x < 32; x++) {
        for (let y = 0; y < 32; y++) {
          ctx.fillStyle = (x % 6 < 2) ? '#3c281e' : randomNoise(103, 77, 60, 20);
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  } else if (type === 'SPRUCE_LOG') {
    if (face === 'top' || face === 'bottom') {
      ctx.fillStyle = '#7a583a';
      ctx.fillRect(0, 0, 32, 32);
      ctx.strokeStyle = '#3a2414';
      ctx.lineWidth = 2;
      ctx.strokeRect(3, 3, 26, 26);
      ctx.strokeRect(9, 9, 14, 14);
    } else {
      for (let x = 0; x < 32; x++) {
        for (let y = 0; y < 32; y++) {
          ctx.fillStyle = (x % 5 < 2) ? '#1e140a' : randomNoise(58, 40, 26, 25);
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  } else if (type === 'BIRCH_LOG') {
    if (face === 'top' || face === 'bottom') {
      ctx.fillStyle = '#d6c89b';
      ctx.fillRect(0, 0, 32, 32);
      ctx.strokeStyle = '#b5a578';
      ctx.lineWidth = 2;
      ctx.strokeRect(3, 3, 26, 26);
      ctx.strokeRect(9, 9, 14, 14);
      ctx.strokeStyle = '#e6e6e6';
      ctx.strokeRect(0, 0, 32, 32);
    } else {
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, 32, 32);
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(2, 6, 8, 3);
      ctx.fillRect(18, 12, 10, 3);
      ctx.fillRect(8, 22, 12, 3);
      ctx.fillRect(24, 28, 6, 2);
    }
  } else if (type === 'JUNGLE_LOG') {
    if (face === 'top' || face === 'bottom') {
      ctx.fillStyle = '#996d4d';
      ctx.fillRect(0, 0, 32, 32);
      ctx.strokeStyle = '#5c3d28';
      ctx.lineWidth = 2;
      ctx.strokeRect(3, 3, 26, 26);
      ctx.strokeRect(9, 9, 14, 14);
    } else {
      for (let x = 0; x < 32; x++) {
        for (let y = 0; y < 32; y++) {
          ctx.fillStyle = (y % 6 < 2) ? '#38281c' : randomNoise(82, 62, 43, 20);
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  } else if (type === 'ACACIA_LOG') {
    if (face === 'top' || face === 'bottom') {
      ctx.fillStyle = '#b8482d';
      ctx.fillRect(0, 0, 32, 32);
      ctx.strokeStyle = '#d05a3c';
      ctx.lineWidth = 2;
      ctx.strokeRect(3, 3, 26, 26);
      ctx.strokeRect(9, 9, 14, 14);
    } else {
      for (let x = 0; x < 32; x++) {
        for (let y = 0; y < 32; y++) {
          ctx.fillStyle = (x % 7 < 2) ? '#3d3f42' : randomNoise(99, 101, 105, 20);
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  } else if (type === 'DARK_OAK_LOG') {
    if (face === 'top' || face === 'bottom') {
      ctx.fillStyle = '#483018';
      ctx.fillRect(0, 0, 32, 32);
      ctx.strokeStyle = '#2a1b0c';
      ctx.lineWidth = 2;
      ctx.strokeRect(3, 3, 26, 26);
      ctx.strokeRect(9, 9, 14, 14);
    } else {
      for (let x = 0; x < 32; x++) {
        for (let y = 0; y < 32; y++) {
          ctx.fillStyle = (x % 6 < 2) ? '#181008' : randomNoise(42, 27, 12, 20);
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  } else if (type === 'CHEST') {
    ctx.fillStyle = '#855428';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#3a2412';
    ctx.fillRect(0, 0, 32, 2);
    ctx.fillRect(0, 30, 32, 2);
    ctx.fillRect(0, 0, 2, 32);
    ctx.fillRect(30, 0, 2, 32);
    ctx.fillRect(0, 14, 32, 3);
    if (face === 'front') {
      ctx.fillStyle = '#e6b800';
      ctx.fillRect(13, 11, 6, 8);
      ctx.fillStyle = '#222';
      ctx.fillRect(15, 14, 2, 3);
    }
  } else if (type === 'LEAVES') {
    ctx.fillStyle = '#2d5a1e';
    ctx.fillRect(0, 0, 32, 32);
    for (let i = 0; i < 90; i++) {
      const rx = Math.floor(Math.random() * 32);
      const ry = Math.floor(Math.random() * 32);
      ctx.fillStyle = randomNoise(60, 145, 40, 40);
      ctx.fillRect(rx, ry, 2, 2);
    }
  } else if (type === 'BRICK') {
    ctx.fillStyle = '#b8523f';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#d1d5db';
    ctx.fillRect(0, 15, 32, 2);
    ctx.fillRect(0, 30, 32, 2);
    ctx.fillRect(15, 0, 2, 15);
    ctx.fillRect(31, 0, 2, 15);
    ctx.fillRect(7, 16, 2, 15);
    ctx.fillRect(23, 16, 2, 15);
  } else if (type === 'GLASS') {
    ctx.fillStyle = 'rgba(200, 235, 255, 0.2)';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fillRect(4, 4, 4, 4);
    ctx.fillRect(8, 8, 2, 2);
    ctx.fillRect(22, 22, 6, 2);
  } else if (type === 'DIAMOND') {
    ctx.fillStyle = '#4ee1d8';
    ctx.fillRect(0, 0, 32, 32);
    for (let x = 0; x < 32; x++) {
      for (let y = 0; y < 32; y++) {
        if ((x + y) % 4 === 0) {
          ctx.fillStyle = randomNoise(90, 240, 230, 25);
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  } else if (type === 'TNT') {
    ctx.fillStyle = '#d93829';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 10, 32, 12);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText('TNT', 5, 20);
  } else if (type === 'GLOWSTONE') {
    ctx.fillStyle = '#fce586';
    ctx.fillRect(0, 0, 32, 32);
    for (let x = 0; x < 32; x++) {
      for (let y = 0; y < 32; y++) {
        ctx.fillStyle = randomNoise(245, 210, 80, 40);
        ctx.fillRect(x, y, 1, 1);
      }
    }
  } else if (type === 'CHERRY_LOG') {
    if (face === 'top' || face === 'bottom') {
      ctx.fillStyle = '#e8a5b8';
      ctx.fillRect(0, 0, 32, 32);
      ctx.strokeStyle = '#9c526b';
      ctx.strokeRect(4, 4, 24, 24);
      ctx.strokeRect(10, 10, 12, 12);
    } else {
      for (let x = 0; x < 32; x++) {
        for (let y = 0; y < 32; y++) {
          ctx.fillStyle = (x % 8 < 2) ? '#5c2d3e' : randomNoise(181, 101, 118, 20);
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  } else if (type === 'CHERRY_LEAVES') {
    ctx.fillStyle = '#ffb7c5';
    ctx.fillRect(0, 0, 32, 32);
    for (let i = 0; i < 90; i++) {
      const rx = Math.floor(Math.random() * 32);
      const ry = Math.floor(Math.random() * 32);
      ctx.fillStyle = randomNoise(255, 180, 200, 40);
      ctx.fillRect(rx, ry, 2, 2);
    }
  } else if (type === 'CHERRY_PLANKS') {
    ctx.fillStyle = '#e8a5b8';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#c77d94';
    ctx.fillRect(0, 7, 32, 2);
    ctx.fillRect(0, 15, 32, 2);
    ctx.fillRect(0, 23, 32, 2);
  } else if (type === 'BAMBOO_BLOCK') {
    for (let x = 0; x < 32; x++) {
      for (let y = 0; y < 32; y++) {
        ctx.fillStyle = (x % 6 < 2) ? '#4e7322' : randomNoise(118, 160, 53, 20);
        ctx.fillRect(x, y, 1, 1);
      }
    }
  } else if (type === 'BAMBOO_MOSAIC') {
    ctx.fillStyle = '#aacc44';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#779922';
    ctx.strokeRect(2, 2, 12, 12);
    ctx.strokeRect(18, 18, 12, 12);
  } else if (type === 'SUSPICIOUS_SAND') {
    for (let x = 0; x < 32; x++) {
      for (let y = 0; y < 32; y++) {
        ctx.fillStyle = randomNoise(224, 192, 104, 35);
        ctx.fillRect(x, y, 1, 1);
      }
    }
    ctx.fillStyle = '#8f6527';
    ctx.fillRect(8, 8, 4, 4);
    ctx.fillRect(20, 18, 5, 4);
  } else if (type === 'COPPER_BULB') {
    ctx.fillStyle = '#c87d55';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#ffaa00';
    ctx.fillRect(8, 8, 16, 16);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(12, 12, 8, 8);
  } else if (type === 'CRAFTER') {
    ctx.fillStyle = '#5a5a6e';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#2d2d38';
    ctx.fillRect(4, 4, 24, 24);
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(24, 4, 4, 4);
  } else if (type === 'DECORATED_POT') {
    ctx.fillStyle = '#b25d38';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#6b321a';
    ctx.strokeRect(6, 6, 20, 20);
  } else if (type === 'BRUSH_TOOL') {
    ctx.fillStyle = '#d4a373';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#faedcd';
    ctx.fillRect(10, 4, 12, 12);
    ctx.fillStyle = '#d4a373';
    ctx.fillRect(14, 16, 4, 14);
  } else if (type === 'BONE_ITEM') {
    ctx.fillStyle = '#333333';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#fefae0';
    ctx.fillRect(6, 14, 20, 4);
    ctx.fillRect(4, 12, 4, 8);
    ctx.fillRect(24, 12, 4, 8);
  } else if (type === 'WOLF_ARMOR') {
    ctx.fillStyle = '#8b5e3c';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#d4a373';
    ctx.strokeRect(4, 4, 24, 24);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  return texture;
}

const blockMaterials = {};
function getBlockMaterials(blockTypeKey) {
  if (blockMaterials[blockTypeKey]) return blockMaterials[blockTypeKey];

  if (['WOOD', 'OAK_LOG', 'SPRUCE_LOG', 'BIRCH_LOG', 'JUNGLE_LOG', 'ACACIA_LOG', 'DARK_OAK_LOG', 'CHERRY_LOG'].includes(blockTypeKey)) {
    const topMat = new THREE.MeshLambertMaterial({ map: createPixelTexture(blockTypeKey, 'top') });
    const sideMat = new THREE.MeshLambertMaterial({ map: createPixelTexture(blockTypeKey, 'side') });
    blockMaterials[blockTypeKey] = [sideMat, sideMat, topMat, topMat, sideMat, sideMat];
  } else if (blockTypeKey === 'CHEST') {
    const frontMat = new THREE.MeshLambertMaterial({ map: createPixelTexture('CHEST', 'front') });
    const sideMat = new THREE.MeshLambertMaterial({ map: createPixelTexture('CHEST', 'side') });
    const topMat = new THREE.MeshLambertMaterial({ map: createPixelTexture('CHEST', 'top') });
    blockMaterials[blockTypeKey] = [sideMat, sideMat, topMat, topMat, frontMat, sideMat];
  } else if (blockTypeKey === 'GRASS') {
    const topMat = new THREE.MeshLambertMaterial({ map: createPixelTexture('GRASS', 'top') });
    const sideMat = new THREE.MeshLambertMaterial({ map: createPixelTexture('GRASS', 'side') });
    const bottomMat = new THREE.MeshLambertMaterial({ map: createPixelTexture('DIRT') });
    blockMaterials[blockTypeKey] = [sideMat, sideMat, topMat, bottomMat, sideMat, sideMat];
  } else if (blockTypeKey === 'COPPER_BULB') {
    const mat = new THREE.MeshStandardMaterial({
      map: createPixelTexture('COPPER_BULB'),
      emissive: 0xffaa00,
      emissiveIntensity: 0.8
    });
    blockMaterials[blockTypeKey] = mat;
  } else if (blockTypeKey === 'GLOWSTONE') {
    const mat = new THREE.MeshStandardMaterial({
      map: createPixelTexture('GLOWSTONE'),
      emissive: 0xffaa00,
      emissiveIntensity: 0.6
    });
    blockMaterials[blockTypeKey] = mat;
  } else {
    const config = BLOCKS[blockTypeKey] || BLOCKS.DIRT;
    const mat = new THREE.MeshLambertMaterial({
      map: createPixelTexture(blockTypeKey),
      transparent: config.transparent || false,
      opacity: config.opacity || 1.0
    });
    blockMaterials[blockTypeKey] = mat;
  }
  return blockMaterials[blockTypeKey];
}

// --- Three.js 初始化 ---
const container = document.getElementById('game-container');
const scene = new THREE.Scene();

const skyColorDay = new THREE.Color(0x7ec0ee);
const skyColorNight = new THREE.Color(0x0a0e1a);
const skyColorSunset = new THREE.Color(0xd97746);
scene.background = skyColorDay.clone();
scene.fog = new THREE.FogExp2(0x7ec0ee, 0.008);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

scene.add(camera);

const controls = new PointerLockControls(camera, document.body);

// 光照系統
const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xfff5ea, 1.1);
sunLight.position.set(80, 120, 50);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
scene.add(sunLight);

// 手臂與十字鎬動畫
const handGroup = new THREE.Group();

const armMat = new THREE.MeshLambertMaterial({ color: 0xd9c5b2 });
const armMesh = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.6, 0.2), armMat);
armMesh.position.set(0, 0, 0);

const pickaxeGroup = new THREE.Group();
const handleMat = new THREE.MeshLambertMaterial({ color: 0x674d3c });
const handleMesh = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.7, 0.06), handleMat);
handleMesh.position.set(0, 0.2, 0);

const headMat = new THREE.MeshLambertMaterial({ color: 0x808080 });
const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.08, 0.08), headMat);
headMesh.position.set(0, 0.5, 0);

pickaxeGroup.add(handleMesh);
pickaxeGroup.add(headMesh);
pickaxeGroup.rotation.z = -Math.PI / 4;
pickaxeGroup.position.set(0, 0.2, -0.1);

handGroup.add(armMesh);
handGroup.add(pickaxeGroup);
handGroup.position.set(0.4, -0.35, -0.5);
camera.add(handGroup);

let isSwinging = false;
let swingProgress = 0;

function swingArm() {
  isSwinging = true;
  swingProgress = 0;
}

function updateArmAnimation(delta) {
  if (isSwinging) {
    swingProgress += delta * 12;
    const angle = Math.sin(swingProgress) * 0.8;
    handGroup.rotation.x = -angle;
    handGroup.rotation.y = angle * 0.5;
    if (swingProgress >= Math.PI) {
      isSwinging = false;
      handGroup.rotation.set(0, 0, 0);
    }
  }
}

// 方塊與碰撞世界
const voxelMap = new Map();
const blockHitsMap = new Map();
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

function getVoxelKey(x, y, z) {
  return `${Math.floor(x)},${Math.floor(y)},${Math.floor(z)}`;
}

function hasBlock(x, y, z) {
  return voxelMap.has(getVoxelKey(x, y, z));
}

// 取得精確地面高度 (通用)
function getGroundHeight(x, z) {
  const bx = Math.floor(x);
  const bz = Math.floor(z);
  for (let y = 20; y >= 0; y--) {
    if (hasBlock(bx, y, bz)) {
      return y + 1;
    }
  }
  return 1;
}

// 取得玩家腳正下方精確地面高度（僅採計腳底以下的方塊，絕不採計頭頂與身旁樹葉，切實防飛樹頂！）
function getGroundHeightAtFeet(x, feetY, z) {
  const bx = Math.floor(x);
  const bz = Math.floor(z);
  const maxCheckY = Math.min(20, Math.floor(feetY + 0.3));
  for (let y = maxCheckY; y >= 0; y--) {
    if (hasBlock(bx, y, bz)) {
      if (y + 1 <= feetY + 0.3) {
        return y + 1;
      }
    }
  }
  return 1;
}

function addBlock(x, y, z, blockTypeKey) {
  const key = getVoxelKey(x, y, z);
  if (voxelMap.has(key)) return;

  const mat = getBlockMaterials(blockTypeKey);
  const mesh = new THREE.Mesh(boxGeometry, mat);
  mesh.position.set(Math.floor(x) + 0.5, Math.floor(y) + 0.5, Math.floor(z) + 0.5);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData = { key, typeKey: blockTypeKey };

  scene.add(mesh);
  voxelMap.set(key, { mesh, typeKey: blockTypeKey });
}

// 🎁 掉落物管理 (Dropped Items System)
const droppedItems = [];
const itemGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);

function spawnDroppedItem(pos, typeKey) {
  const mat = getBlockMaterials(typeKey);
  const mesh = new THREE.Mesh(itemGeometry, mat);
  mesh.position.copy(pos).add(new THREE.Vector3(0, 0.2, 0));
  scene.add(mesh);

  droppedItems.push({
    mesh,
    typeKey,
    time: Math.random() * 10
  });
}

function updateDroppedItems(delta, playerPos) {
  for (let i = droppedItems.length - 1; i >= 0; i--) {
    const item = droppedItems[i];
    item.time += delta * 3;

    // 旋轉與漂浮
    item.mesh.rotation.y += delta * 2;
    item.mesh.position.y += Math.sin(item.time) * 0.003;

    // 玩家靠近自動撿起掉落物 (Distance < 1.6)
    const dist = playerPos.distanceTo(item.mesh.position);
    if (dist < 1.6) {
      sounds.playItemPickup();
      scene.remove(item.mesh);
      droppedItems.splice(i, 1);
    }
  }
}

function removeBlock(x, y, z, spawnDebris = true) {
  const key = getVoxelKey(x, y, z);
  if (!voxelMap.has(key)) return;

  const { mesh, typeKey } = voxelMap.get(key);
  if (spawnDebris) {
    spawnBlockDebris(mesh.position, BLOCKS[typeKey]?.color || 0x888888);
    // 🎁 產生掉落物！
    spawnDroppedItem(mesh.position, typeKey);
  }

  scene.remove(mesh);
  if (mesh.geometry) mesh.geometry.dispose();
  voxelMap.delete(key);
  blockHitsMap.delete(key);
}

// 挖掘打擊邏輯（生存模式需要 3~5 次，創造模式 1 次秒破）
function hitBlock(x, y, z) {
  const key = getVoxelKey(x, y, z);
  if (!voxelMap.has(key)) return;

  if (currentMode === GAME_MODES.CREATIVE) {
    sounds.playBreak();
    removeBlock(x, y, z, true);
    return;
  }

  const { mesh, typeKey } = voxelMap.get(key);
  const blockConfig = BLOCKS[typeKey];
  const requiredHits = blockConfig?.requiredHits || 3;

  const currentHits = (blockHitsMap.get(key) || 0) + 1;
  blockHitsMap.set(key, currentHits);

  sounds.playMiningHit();
  spawnBlockDebris(mesh.position, blockConfig?.color || 0x888888);

  mesh.scale.set(0.9, 0.9, 0.9);
  setTimeout(() => {
    if (voxelMap.has(key)) mesh.scale.set(1, 1, 1);
  }, 80);

  if (currentHits >= requiredHits) {
    sounds.playBreak();
    removeBlock(x, y, z, true);
  }
}

// 💾 世界存檔與載入
function saveWorldToStorage() {
  const data = [];
  voxelMap.forEach((val, key) => {
    const [x, y, z] = key.split(',').map(Number);
    data.push({ x, y, z, typeKey: val.typeKey });
  });
  localStorage.setItem('MC_WORLD_SAVE', JSON.stringify(data));
  alert('💾 世界存檔已成功儲存！下次打開可直接載入。');
}

function loadWorldFromStorage() {
  const saved = localStorage.getItem('MC_WORLD_SAVE');
  if (!saved) {
    alert('⚠️ 找不到歷史存檔，將為您生成新世界。');
    return false;
  }
  const data = JSON.parse(saved);
  voxelMap.forEach((val) => scene.remove(val.mesh));
  voxelMap.clear();

  data.forEach(item => {
    addBlock(item.x, item.y, item.z, item.typeKey);
  });
  alert('📂 成功載入世界存檔！');
  return true;
}

// 粒子破壞效果
const activeParticles = [];
const particleGeo = new THREE.BoxGeometry(0.15, 0.15, 0.15);

function spawnBlockDebris(pos, colorHex) {
  const mat = new THREE.MeshLambertMaterial({ color: colorHex });
  for (let i = 0; i < 8; i++) {
    const p = new THREE.Mesh(particleGeo, mat);
    p.position.copy(pos).add(new THREE.Vector3(
      (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.5
    ));
    const vel = new THREE.Vector3(
      (Math.random() - 0.5) * 5,
      Math.random() * 4 + 2,
      (Math.random() - 0.5) * 5
    );
    scene.add(p);
    activeParticles.push({ mesh: p, vel, life: 0.8 });
  }
}

function updateParticles(delta) {
  for (let i = activeParticles.length - 1; i >= 0; i--) {
    const p = activeParticles[i];
    p.life -= delta * 1.5;
    p.vel.y -= 15 * delta;
    p.mesh.position.addScaledVector(p.vel, delta);
    p.mesh.scale.setScalar(Math.max(0, p.life));

    if (p.life <= 0) {
      scene.remove(p.mesh);
      activeParticles.splice(i, 1);
    }
  }
}

// TNT 爆炸
function triggerTNT(x, y, z) {
  const key = getVoxelKey(x, y, z);
  if (!voxelMap.has(key)) return;

  const { mesh } = voxelMap.get(key);
  sounds.playTNTFuse();

  let flashCount = 0;
  const fuseInterval = setInterval(() => {
    flashCount++;
    mesh.scale.setScalar(flashCount % 2 === 0 ? 1.15 : 1.0);
    if (flashCount >= 8) {
      clearInterval(fuseInterval);
      explodeTNT(x, y, z);
    }
  }, 180);
}

function explodeTNT(centerX, centerY, centerZ) {
  sounds.playExplosion();
  const radius = 3;
  const cx = Math.floor(centerX);
  const cy = Math.floor(centerY);
  const cz = Math.floor(centerZ);

  for (let dx = -radius; dx <= radius; dx++) {
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dz = -radius; dz <= radius; dz++) {
        if (dx * dx + dy * dy + dz * dz <= radius * radius) {
          removeBlock(cx + dx, cy + dy, cz + dz, true);
        }
      }
    }
  }

  for (let i = 0; i < 40; i++) {
    const colorHex = Math.random() > 0.5 ? 0xff4500 : 0xffa500;
    spawnBlockDebris(new THREE.Vector3(cx + 0.5, cy + 0.5, cz + 0.5), colorHex);
  }
}

// 🐑 精緻方塊小羊（踏實行走、不穿牆、有清晰五官）
class VoxelSheep {
  constructor(x, z) {
    this.group = new THREE.Group();

    const woolMat = new THREE.MeshLambertMaterial({ color: 0xf5f5f5 });
    const skinMat = new THREE.MeshLambertMaterial({ color: 0xdfcbb5 });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const snoutMat = new THREE.MeshLambertMaterial({ color: 0xffb6c1 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 1.6), woolMat);
    body.position.y = 0.8;
    this.group.add(body);

    this.head = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.65, 0.65), skinMat);
    this.head.position.set(0, 1.25, 0.85);

    const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.05), eyeMat);
    eyeL.position.set(-0.2, 0.1, 0.33);

    const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.05), eyeMat);
    eyeR.position.set(0.2, 0.1, 0.33);

    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 0.05), snoutMat);
    snout.position.set(0, -0.1, 0.33);

    this.head.add(eyeL);
    this.head.add(eyeR);
    this.head.add(snout);
    this.group.add(this.head);

    this.legs = [];
    const legPositions = [
      [-0.4, 0.35, 0.5],
      [0.4, 0.35, 0.5],
      [-0.4, 0.35, -0.5],
      [0.4, 0.35, -0.5]
    ];
    legPositions.forEach(pos => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.7, 0.3), skinMat);
      leg.position.set(...pos);
      this.group.add(leg);
      this.legs.push(leg);
    });

    const groundY = getGroundHeight(x, z);
    this.group.position.set(x, groundY, z);
    scene.add(this.group);

    this.targetDir = new THREE.Vector3();
    this.changeDirectionTimer = 0;
  }

  update(delta, time) {
    this.changeDirectionTimer -= delta;
    if (this.changeDirectionTimer <= 0) {
      const angle = Math.random() * Math.PI * 2;
      this.targetDir.set(Math.cos(angle), 0, Math.sin(angle));
      this.group.rotation.y = Math.atan2(this.targetDir.x, this.targetDir.z);
      this.changeDirectionTimer = 3 + Math.random() * 4;
    }

    // 防穿牆與防漂浮行走邏輯
    const nextPos = this.group.position.clone().addScaledVector(this.targetDir, delta * 0.7);
    const targetY = getGroundHeight(nextPos.x, nextPos.z);

    // 防穿牆：如果前方有高於1格的牆壁則轉向
    if (targetY - this.group.position.y <= 1.1) {
      this.group.position.x = nextPos.x;
      this.group.position.z = nextPos.z;
      this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, targetY, 0.25);
    } else {
      this.changeDirectionTimer = 0; // 碰牆立轉向
    }

    this.legs.forEach((leg, idx) => {
      leg.rotation.x = Math.sin(time * 6 + idx) * 0.4;
    });
    this.head.rotation.y = Math.sin(time * 2) * 0.2;
  }
}

// 🧟 殭屍 Mob（清晰五官面孔、防穿牆、攻擊不到跳高玩家）
class VoxelZombie {
  constructor(x, z) {
    this.group = new THREE.Group();

    const skinMat = new THREE.MeshLambertMaterial({ color: 0x48793b });
    const shirtMat = new THREE.MeshLambertMaterial({ color: 0x3b8595 });
    const pantsMat = new THREE.MeshLambertMaterial({ color: 0x223652 });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff2222 }); // 經典紅色發光眼神
    const mouthMat = new THREE.MeshBasicMaterial({ color: 0x152e12 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.2, 0.4), shirtMat);
    body.position.y = 1.2;
    this.group.add(body);

    // 殭屍頭部與五官面孔
    this.head = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), skinMat);
    this.head.position.y = 2.1;

    const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.05), eyeMat);
    eyeL.position.set(-0.18, 0.08, 0.31);

    const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.05), eyeMat);
    eyeR.position.set(0.18, 0.08, 0.31);

    const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 0.05), mouthMat);
    mouth.position.set(0, -0.12, 0.31);

    this.head.add(eyeL);
    this.head.add(eyeR);
    this.head.add(mouth);
    this.group.add(this.head);

    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.9), skinMat);
    armL.position.set(-0.55, 1.5, 0.35);
    this.group.add(armL);

    const armR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.9), skinMat);
    armR.position.set(0.55, 1.5, 0.35);
    this.group.add(armR);

    this.legL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.0, 0.35), pantsMat);
    this.legL.position.set(-0.2, 0.5, 0);
    this.group.add(this.legL);

    this.legR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.0, 0.35), pantsMat);
    this.legR.position.set(0.2, 0.5, 0);
    this.group.add(this.legR);

    const groundY = getGroundHeight(x, z);
    this.group.position.set(x, groundY, z);
    scene.add(this.group);
    this.health = 3;
    this.attackCooldown = 0;
  }

  hit() {
    this.health--;
    sounds.playHitZombie();
    spawnBlockDebris(this.group.position.clone().add(new THREE.Vector3(0, 1.5, 0)), 0x48793b);
    if (this.health <= 0) {
      scene.remove(this.group);
      return true;
    }
    return false;
  }

  update(delta, playerPos, hurtPlayerCb) {
    if (currentMode === GAME_MODES.SPECTATOR) return;
    this.attackCooldown -= delta;
    const dir = new THREE.Vector3().subVectors(playerPos, this.group.position);

    // 高度差判定：如果玩家在腳下墊高了 2 格以上，殭屍摸不到玩家！
    const heightDiff = playerPos.y - 1.6 - this.group.position.y;
    dir.y = 0;
    const dist = dir.length();

    if (dist > 0.8 && dist < 25) {
      dir.normalize();

      const nextPos = this.group.position.clone().addScaledVector(dir, delta * 1.5);
      const targetY = getGroundHeight(nextPos.x, nextPos.z);

      // 防穿牆：前方有無法躍過的牆壁則無法前進
      if (targetY - this.group.position.y <= 1.1) {
        this.group.position.x = nextPos.x;
        this.group.position.z = nextPos.z;
        this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, targetY, 0.25);
      }
      this.group.rotation.y = Math.atan2(dir.x, dir.z);

      const t = performance.now() / 200;
      this.legL.rotation.x = Math.sin(t) * 0.5;
      this.legR.rotation.x = -Math.sin(t) * 0.5;
    }

    // 只有在垂直距離 < 1.5 且水平近距離時才能攻擊到玩家！
    if (dist <= 1.3 && Math.abs(heightDiff) < 1.5 && this.attackCooldown <= 0) {
      this.attackCooldown = 1.5;
      hurtPlayerCb();
    }
  }
}

// 🦔 1.20.6 犰狳 (Armadillo - 遇生物或玩家靠近會縮成防護球體)
class VoxelArmadillo {
  constructor(x, z) {
    this.group = new THREE.Group();
    const shellMat = new THREE.MeshLambertMaterial({ color: 0x9c6644 });
    const bodyMat = new THREE.MeshLambertMaterial({ color: 0x7f4f24 });
    const earMat = new THREE.MeshLambertMaterial({ color: 0xb07d62 });

    this.body = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.9), shellMat);
    this.body.position.y = 0.35;
    this.group.add(this.body);

    this.head = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.35), bodyMat);
    this.head.position.set(0, 0.35, 0.55);

    const earL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, 0.08), earMat);
    earL.position.set(-0.12, 0.22, 0.05);
    const earR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, 0.08), earMat);
    earR.position.set(0.12, 0.22, 0.05);

    this.head.add(earL);
    this.head.add(earR);
    this.group.add(this.head);

    this.legs = [];
    [[-0.25, 0.12, 0.3], [0.25, 0.12, 0.3], [-0.25, 0.12, -0.3], [0.25, 0.12, -0.3]].forEach(pos => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.25, 0.15), bodyMat);
      leg.position.set(...pos);
      this.group.add(leg);
      this.legs.push(leg);
    });

    const groundY = getGroundHeight(x, z);
    this.group.position.set(x, groundY, z);
    scene.add(this.group);

    this.isRolledUp = false;
    this.changeDirTimer = 0;
    this.targetDir = new THREE.Vector3();
  }

  update(delta, time, playerPos) {
    const distToPlayer = this.group.position.distanceTo(playerPos);

    // 1.20.6 特色：當玩家靠近 3.5 格內時，犰狳會縮成防護球體！
    if (distToPlayer < 3.5 && !this.isRolledUp) {
      this.isRolledUp = true;
      this.head.scale.set(0.1, 0.1, 0.1);
      this.body.scale.set(1.1, 1.1, 1.1);
    } else if (distToPlayer >= 4.5 && this.isRolledUp) {
      this.isRolledUp = false;
      this.head.scale.set(1, 1, 1);
      this.body.scale.set(1, 1, 1);
    }

    if (this.isRolledUp) return;

    this.changeDirTimer -= delta;
    if (this.changeDirTimer <= 0) {
      const angle = Math.random() * Math.PI * 2;
      this.targetDir.set(Math.cos(angle), 0, Math.sin(angle));
      this.group.rotation.y = Math.atan2(this.targetDir.x, this.targetDir.z);
      this.changeDirTimer = 3 + Math.random() * 4;
    }

    const nextPos = this.group.position.clone().addScaledVector(this.targetDir, delta * 0.6);
    const targetY = getGroundHeight(nextPos.x, nextPos.z);
    if (targetY - this.group.position.y <= 1.1) {
      this.group.position.x = nextPos.x;
      this.group.position.z = nextPos.z;
      this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, targetY, 0.25);
    } else {
      this.changeDirTimer = 0;
    }

    this.legs.forEach((leg, idx) => {
      leg.rotation.x = Math.sin(time * 5 + idx) * 0.3;
    });
  }
}

// 🐺 1.20.6 可馴服狼 & 狼鎧甲 Companion Wolf
class VoxelWolf {
  constructor(x, z) {
    this.group = new THREE.Group();
    this.skinMat = new THREE.MeshLambertMaterial({ color: 0xd3d3d3 });
    this.armorMat = new THREE.MeshLambertMaterial({ color: 0x9c6644 }); // 1.20.6 狼鎧甲
    this.collarMat = new THREE.MeshBasicMaterial({ color: 0xe63946 });

    this.body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 1.0), this.skinMat);
    this.body.position.y = 0.6;
    this.group.add(this.body);

    this.collar = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.1, 0.62), this.collarMat);
    this.collar.position.set(0, 0.8, 0.4);
    this.collar.visible = false;
    this.group.add(this.collar);

    this.head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), this.skinMat);
    this.head.position.set(0, 0.9, 0.6);

    const earL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.2, 0.12), this.skinMat);
    earL.position.set(-0.16, 0.3, 0);
    const earR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.2, 0.12), this.skinMat);
    earR.position.set(0.16, 0.3, 0);

    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.2, 0.3), this.skinMat);
    snout.position.set(0, -0.1, 0.3);

    this.head.add(earL);
    this.head.add(earR);
    this.head.add(snout);
    this.group.add(this.head);

    this.legs = [];
    [[-0.2, 0.25, 0.3], [0.2, 0.25, 0.3], [-0.2, 0.25, -0.3], [0.2, 0.25, -0.3]].forEach(pos => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.5, 0.2), this.skinMat);
      leg.position.set(...pos);
      this.group.add(leg);
      this.legs.push(leg);
    });

    const groundY = getGroundHeight(x, z);
    this.group.position.set(x, groundY, z);
    scene.add(this.group);

    this.isTamed = false;
    this.attackCooldown = 0;
  }

  tame() {
    this.isTamed = true;
    this.collar.visible = true;
    this.body.material = this.armorMat; // 穿上 1.20.6 狼鎧甲！
    sounds.playWolfBark();
  }

  update(delta, playerPos, zombies) {
    this.attackCooldown -= delta;

    if (this.isTamed) {
      // 尋找最近的殭屍主動幫玩家戰鬥！
      let nearestZombie = null;
      let minDist = 15;
      zombies.forEach(zombie => {
        const d = this.group.position.distanceTo(zombie.group.position);
        if (d < minDist) {
          minDist = d;
          nearestZombie = zombie;
        }
      });

      if (nearestZombie) {
        const dir = new THREE.Vector3().subVectors(nearestZombie.group.position, this.group.position);
        dir.y = 0;
        const dist = dir.length();
        if (dist > 1.0) {
          dir.normalize();
          this.group.position.addScaledVector(dir, delta * 3.2);
          this.group.rotation.y = Math.atan2(dir.x, dir.z);
        } else if (this.attackCooldown <= 0) {
          this.attackCooldown = 1.0;
          sounds.playHitZombie();
          const isDead = nearestZombie.hit();
          if (isDead) {
            const idx = zombies.indexOf(nearestZombie);
            if (idx !== -1) zombies.splice(idx, 1);
          }
        }
      } else {
        // 跟隨玩家
        const dir = new THREE.Vector3().subVectors(playerPos, this.group.position);
        dir.y = 0;
        const dist = dir.length();
        if (dist > 2.5) {
          dir.normalize();
          this.group.position.addScaledVector(dir, delta * 2.5);
          this.group.rotation.y = Math.atan2(dir.x, dir.z);
        }
      }
    }
  }
}

// 48x48 擴大 1.20.6 世界地圖 (含櫻花樹林區與可疑沙子)
function generateInitialWorld() {
  const WORLD_SIZE = 48;
  const HALF_SIZE = WORLD_SIZE / 2;

  for (let x = -HALF_SIZE; x < HALF_SIZE; x++) {
    for (let z = -HALF_SIZE; z < HALF_SIZE; z++) {
      const height = Math.floor(Math.sin(x * 0.15) * Math.cos(z * 0.15) * 2.2) + 3;
      for (let y = 0; y < height; y++) {
        if (y === 0) addBlock(x, y, z, 'STONE');
        else addBlock(x, y, z, 'DIRT');
      }

      // 1.20.6 櫻花樹林區 (Cherry Blossom Biome)
      if (x > 0 && z > 0) {
        addBlock(x, height, z, 'GRASS');
        if (Math.random() < 0.035 && Math.abs(x) > 3) {
          generateCherryTree(x, height + 1, z);
        }
      } else if (x < -10 && z < -10) {
        // 1.20.6 考古沙區 (Archaeology Suspicious Sand Area)
        addBlock(x, height, z, Math.random() < 0.3 ? 'SUSPICIOUS_SAND' : 'DIRT');
      } else {
        addBlock(x, height, z, 'GRASS');
        if (Math.random() < 0.015 && Math.abs(x) > 3) {
          generateTree(x, height + 1, z);
        }
      }
    }
  }
}

function generateTree(trX, trY, trZ) {
  const treeHeight = 4 + Math.floor(Math.random() * 2);
  for (let i = 0; i < treeHeight; i++) {
    addBlock(trX, trY + i, trZ, 'WOOD');
  }
  const leafBaseY = trY + treeHeight - 1;
  for (let lx = -2; lx <= 2; lx++) {
    for (let lz = -2; lz <= 2; lz++) {
      for (let ly = 0; ly <= 2; ly++) {
        if (Math.abs(lx) === 2 && Math.abs(lz) === 2 && ly === 2) continue;
        if (lx === 0 && lz === 0 && ly < 2) continue;
        addBlock(trX + lx, leafBaseY + ly, trZ + lz, 'LEAVES');
      }
    }
  }
}

// 🌸 1.20.6 櫻花樹生成器
function generateCherryTree(trX, trY, trZ) {
  const treeHeight = 5 + Math.floor(Math.random() * 2);
  for (let i = 0; i < treeHeight; i++) {
    addBlock(trX, trY + i, trZ, 'CHERRY_LOG');
  }
  const leafBaseY = trY + treeHeight - 1;
  for (let lx = -2; lx <= 2; lx++) {
    for (let lz = -2; lz <= 2; lz++) {
      for (let ly = 0; ly <= 2; ly++) {
        if (Math.abs(lx) === 2 && Math.abs(lz) === 2 && ly === 2) continue;
        if (lx === 0 && lz === 0 && ly < 2) continue;
        addBlock(trX + lx, leafBaseY + ly, trZ + lz, 'CHERRY_LEAVES');
      }
    }
  }
}

generateInitialWorld();

const sheepList = [new VoxelSheep(4, 4), new VoxelSheep(-6, -6), new VoxelSheep(10, -8)];
const zombieList = [new VoxelZombie(-10, -10), new VoxelZombie(12, 12)];
const armadilloList = [new VoxelArmadillo(2, -4), new VoxelArmadillo(-5, 6)];
const wolfList = [new VoxelWolf(3, 3), new VoxelWolf(-3, -3)];

const spawnGroundY = getGroundHeight(0, 0);
camera.position.set(0, spawnGroundY + 1.6, 0);

// 準心高亮
const selectionGeo = new THREE.BoxGeometry(1.02, 1.02, 1.02);
const selectionMat = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, wireframeLinewidth: 2 });
const selectionBox = new THREE.Mesh(selectionGeo, selectionMat);
selectionBox.visible = false;
scene.add(selectionBox);

const raycaster = new THREE.Raycaster();
const centerVector = new THREE.Vector2(0, 0);

function updateRaycaster() {
  if (currentMode === GAME_MODES.SPECTATOR) {
    selectionBox.visible = false;
    return null;
  }
  raycaster.setFromCamera(centerVector, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);
  const validHits = intersects.filter(hit => hit.object !== selectionBox && (hit.object.userData.key || hit.object.parent));

  if (validHits.length > 0 && validHits[0].distance < 8) {
    const hit = validHits[0];
    if (hit.object.userData.key) {
      selectionBox.position.copy(hit.object.position);
      selectionBox.visible = true;
    }
    return hit;
  } else {
    selectionBox.visible = false;
    return null;
  }
}

// --- 遊戲模式狀態 System ---
const GAME_MODES = {
  SURVIVAL: 'SURVIVAL',
  CREATIVE: 'CREATIVE',
  SPECTATOR: 'SPECTATOR'
};

let currentMode = GAME_MODES.SURVIVAL;

function updateModeDisplay() {
  const modeEl = document.getElementById('mode-display');
  if (!modeEl) return;
  if (currentMode === GAME_MODES.SURVIVAL) {
    modeEl.className = 'mode-badge survival';
    modeEl.innerText = '🟢 生存模式 (Survival)';
  } else if (currentMode === GAME_MODES.CREATIVE) {
    modeEl.className = 'mode-badge creative';
    modeEl.innerText = '⚡ 創造模式 (Creative)';
  } else if (currentMode === GAME_MODES.SPECTATOR) {
    modeEl.className = 'mode-badge spectator';
    modeEl.innerText = '👻 旁觀模式 (Spectator)';
  }
}

// 玩家物理（最大跳躍 1 格高、實體防穿牆）
let playerHealth = 10;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let moveUp = false, moveDown = false;
let canJump = false;
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
let prevTime = performance.now();
let dayTime = 0.25;
let isFastTime = false;

function hurtPlayer() {
  if (currentMode === GAME_MODES.CREATIVE || currentMode === GAME_MODES.SPECTATOR) return;
  playerHealth--;
  sounds.playPlayerHurt();
  updateHealthBar();
  if (playerHealth <= 0) {
    alert('💀 你已被殭屍擊敗！世界已重置重生。');
    playerHealth = 10;
    const respawnY = getGroundHeight(0, 0) + 1.6;
    camera.position.set(0, respawnY, 0);
    updateHealthBar();
  }
}

function updateHealthBar() {
  const heartContainer = document.getElementById('heart-container');
  heartContainer.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const span = document.createElement('span');
    span.className = 'heart';
    span.innerText = i < playerHealth ? '❤️' : '🖤';
    heartContainer.appendChild(span);
  }
}

// 背包 UI
const invModal = document.getElementById('inventory-modal');
const closeInvBtn = document.getElementById('close-inv-btn');
const invGrid = document.getElementById('inventory-grid');

function initInventoryUI() {
  invGrid.innerHTML = '';
  Object.keys(BLOCKS).forEach(key => {
    const block = BLOCKS[key];
    const card = document.createElement('div');
    card.className = 'inv-item-card';

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = `#${block.color.toString(16).padStart(6, '0')}`;
    ctx.fillRect(4, 4, 24, 24);
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(4, 4, 24, 24);

    const name = document.createElement('span');
    name.innerText = block.name;

    card.appendChild(canvas);
    card.appendChild(name);

    card.addEventListener('click', () => {
      HOTBAR_BLOCKS[selectedBlockIndex] = block;
      initHotbarUI();
      invModal.classList.add('hidden');
      controls.lock();
    });

    invGrid.appendChild(card);
  });
}

function toggleInventory() {
  if (invModal.classList.contains('hidden')) {
    controls.unlock();
    invModal.classList.remove('hidden');
    initInventoryUI();
  } else {
    invModal.classList.add('hidden');
    controls.lock();
  }
}

closeInvBtn.addEventListener('click', () => {
  invModal.classList.add('hidden');
  controls.lock();
});

// 按鍵監聽
document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyE') {
    toggleInventory();
    return;
  }

  // 旁觀模式 (Spectator) 切換：按 Backspace (刪除鍵) 鍵
  if (event.code === 'Backspace') {
    event.preventDefault();
    currentMode = (currentMode === GAME_MODES.SPECTATOR) ? GAME_MODES.SURVIVAL : GAME_MODES.SPECTATOR;
    updateModeDisplay();
    return;
  }

  // 創造模式 (Creative) 切換：按 Shift 鍵
  if (event.key === 'Shift' || event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    if (controls.isLocked) {
      currentMode = (currentMode === GAME_MODES.CREATIVE) ? GAME_MODES.SURVIVAL : GAME_MODES.CREATIVE;
      updateModeDisplay();
      return;
    }
  }

  switch (event.code) {
    case 'KeyW': moveForward = true; break;
    case 'KeyS': moveBackward = true; break;
    case 'KeyA': moveLeft = true; break;
    case 'KeyD': moveRight = true; break;
    case 'KeyC':
    case 'ControlLeft':
    case 'ControlRight':
      moveDown = true;
      break;
    case 'Space':
      moveUp = true;
      if (canJump && currentMode !== GAME_MODES.SPECTATOR) {
        // 精確限制最大跳躍高度恰好為 1 格高！(v = sqrt(2 * g * h) = sqrt(2 * 25 * 1.0) ≈ 7.07)
        velocity.y = 7.07;
        sounds.playJump();
        canJump = false;
      }
      break;
    case 'KeyT': isFastTime = !isFastTime; break;
    case 'Digit1': selectHotbarSlot(0); break;
    case 'Digit2': selectHotbarSlot(1); break;
    case 'Digit3': selectHotbarSlot(2); break;
    case 'Digit4': selectHotbarSlot(3); break;
    case 'Digit5': selectHotbarSlot(4); break;
    case 'Digit6': selectHotbarSlot(5); break;
    case 'Digit7': selectHotbarSlot(6); break;
    case 'Digit8': selectHotbarSlot(7); break;
    case 'Digit9': selectHotbarSlot(8); break;
    case 'Digit0': selectHotbarSlot(9); break;
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyW': moveForward = false; break;
    case 'KeyS': moveBackward = false; break;
    case 'KeyA': moveLeft = false; break;
    case 'KeyD': moveRight = false; break;
    case 'Space': moveUp = false; break;
    case 'KeyC':
    case 'ControlLeft':
    case 'ControlRight':
      moveDown = false;
      break;
  }
});

document.addEventListener('wheel', (e) => {
  if (e.deltaY > 0) {
    selectHotbarSlot((selectedBlockIndex + 1) % HOTBAR_BLOCKS.length);
  } else {
    selectHotbarSlot((selectedBlockIndex - 1 + HOTBAR_BLOCKS.length) % HOTBAR_BLOCKS.length);
  }
});

// 滑鼠點擊
document.addEventListener('mousedown', (e) => {
  if (!controls.isLocked) return;
  if (currentMode === GAME_MODES.SPECTATOR) return; // 旁觀模式無法互動或破壞/放置

  swingArm();

  const hit = updateRaycaster();
  if (!hit) return;

  let parentObj = hit.object;
  while (parentObj && parentObj.parent && parentObj.parent !== scene) {
    parentObj = parentObj.parent;
  }
  const targetZombieIdx = zombieList.findIndex(z => z.group === parentObj);

  if (targetZombieIdx !== -1 && e.button === 0) {
    const isDead = zombieList[targetZombieIdx].hit();
    if (isDead) zombieList.splice(targetZombieIdx, 1);
    return;
  }

  if (hit.object.position) {
    const { position } = hit.object;
    const vx = position.x - 0.5;
    const vy = position.y - 0.5;
    const vz = position.z - 0.5;

    if (e.button === 0) {
      const selectedBlock = HOTBAR_BLOCKS[selectedBlockIndex];
      // 1.20.6 拿骨頭餵狼並穿上狼鎧甲
      if (selectedBlock === BLOCKS.BONE_ITEM) {
        let parentObj = hit.object;
        while (parentObj && parentObj.parent && parentObj.parent !== scene) {
          parentObj = parentObj.parent;
        }
        const targetWolf = wolfList.find(w => w.group === parentObj);
        if (targetWolf && !targetWolf.isTamed) {
          targetWolf.tame();
          alert('🐺 成功馴服狼！狼已裝備 1.20.6 狼鎧甲 (Wolf Armor)，將護衛玩家並攻擊殭屍！');
          return;
        }
      }

      const typeKey = hit.object.userData.typeKey;
      if (typeKey === 'TNT') triggerTNT(vx, vy, vz);
      else hitBlock(vx, vy, vz);
    } else if (e.button === 2) {
      const selectedBlock = HOTBAR_BLOCKS[selectedBlockIndex];
      // 1.20.6 使用考古刷刷「可疑的沙子」
      if (selectedBlock === BLOCKS.BRUSH_TOOL && hit.object.userData.typeKey === 'SUSPICIOUS_SAND') {
        sounds.playBrushSound();
        spawnBlockDebris(hit.object.position, 0xe0c068);
        const key = hit.object.userData.key;
        const brushCount = (blockHitsMap.get(key) || 0) + 1;
        blockHitsMap.set(key, brushCount);
        if (brushCount >= 3) {
          removeBlock(hit.object.position.x - 0.5, hit.object.position.y - 0.5, hit.object.position.z - 0.5, false);
          addBlock(hit.object.position.x - 0.5, hit.object.position.y - 0.5, hit.object.position.z - 0.5, 'DIRT');
          spawnDroppedItem(hit.object.position, 'DIAMOND');
          alert('🏺 1.20.6 考古挖掘成功！發現古代陶罐與鑽石寶物！');
        }
        return;
      }

      sounds.playPlace();
      const normal = hit.face.normal;
      const targetPos = position.clone().add(normal);
      const keys = Object.keys(BLOCKS);
      const blockKey = keys.find(k => BLOCKS[k] === selectedBlock);

      if (blockKey) {
        addBlock(targetPos.x - 0.5, targetPos.y - 0.5, targetPos.z - 0.5, blockKey);
      }
    }
  }
});

document.addEventListener('contextmenu', e => e.preventDefault());

// 快捷列 UI
const hotbarEl = document.getElementById('hotbar');
const blockNameDisplay = document.getElementById('block-name-display');
const selectedBlockInfo = document.getElementById('selected-block-info');
const timeDisplay = document.getElementById('time-display');

function initHotbarUI() {
  hotbarEl.innerHTML = '';
  HOTBAR_BLOCKS.forEach((block, index) => {
    const slot = document.createElement('div');
    slot.className = `hotbar-slot ${index === selectedBlockIndex ? 'active' : ''}`;

    const keyLabel = document.createElement('span');
    keyLabel.className = 'hotbar-key';
    keyLabel.innerText = (index + 1) % 10;
    slot.appendChild(keyLabel);

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = `#${block.color.toString(16).padStart(6, '0')}`;
    ctx.fillRect(4, 4, 24, 24);
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(4, 4, 24, 24);
    slot.appendChild(canvas);

    slot.addEventListener('click', () => selectHotbarSlot(index));
    hotbarEl.appendChild(slot);
  });
  updateSelectedBlockText();
}

function selectHotbarSlot(index) {
  selectedBlockIndex = index;
  const slots = hotbarEl.querySelectorAll('.hotbar-slot');
  slots.forEach((s, idx) => {
    if (idx === index) s.classList.add('active');
    else s.classList.remove('active');
  });
  updateSelectedBlockText();
}

function updateSelectedBlockText() {
  const b = HOTBAR_BLOCKS[selectedBlockIndex];
  blockNameDisplay.innerText = b.name;
  selectedBlockInfo.innerText = b.name;
}

initHotbarUI();

const overlay = document.getElementById('overlay');
const startBtn = document.getElementById('start-btn');
const posDisplay = document.getElementById('pos-display');

document.getElementById('save-world-btn').addEventListener('click', (e) => {
  e.stopPropagation();
  saveWorldToStorage();
});
document.getElementById('load-world-btn').addEventListener('click', (e) => {
  e.stopPropagation();
  loadWorldFromStorage();
});

function enterGame() {
  sounds.init();
  overlay.classList.add('hidden');
  try {
    controls.lock();
  } catch (err) {
    console.warn('Pointer lock request warning:', err);
  }
}

startBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  enterGame();
});

overlay.addEventListener('click', (e) => {
  const saveBtn = document.getElementById('save-world-btn');
  const loadBtn = document.getElementById('load-world-btn');
  if (e.target !== saveBtn && e.target !== loadBtn) {
    enterGame();
  }
});

container.addEventListener('click', () => {
  if (invModal.classList.contains('hidden')) {
    overlay.classList.add('hidden');
    try {
      controls.lock();
    } catch (err) {}
  }
});

controls.addEventListener('lock', () => overlay.classList.add('hidden'));
controls.addEventListener('unlock', () => {
  if (invModal.classList.contains('hidden')) overlay.classList.remove('hidden');
});

// 實體 AABB 碰撞檢查 (牆壁、1格高台階與樹幹實體檔牆)
function checkPlayerCollision(newPos) {
  if (currentMode === GAME_MODES.SPECTATOR) return false; // 旁觀模式穿牆 (noclip)
  const px = newPos.x;
  const py = newPos.y;
  const pz = newPos.z;
  const radius = 0.32;
  const feetY = py - 1.55;
  const headY = py + 0.15;

  const minX = Math.floor(px - radius);
  const maxX = Math.floor(px + radius);
  const minZ = Math.floor(pz - radius);
  const maxZ = Math.floor(pz + radius);
  const minY = Math.floor(feetY + 0.2); // 膝蓋高度以上判定為實體牆壁或台階
  const maxY = Math.floor(headY);

  for (let bx = minX; bx <= maxX; bx++) {
    for (let bz = minZ; bz <= maxZ; bz++) {
      for (let by = minY; by <= maxY; by++) {
        if (hasBlock(bx, by, bz)) {
          return true; // 碰到樹幹、樹葉或台階牆壁，阻擋橫向移動！
        }
      }
    }
  }
  return false;
}

// 主遊戲循環
function animate() {
  requestAnimationFrame(animate);

  // 需求 3：按 ESC 釋放視角 / 開啟選單遮罩時，遊戲完全暫停 (生物、時間、物理皆停止)
  if (!controls.isLocked) {
    renderer.render(scene, camera);
    return;
  }

  const delta = Math.min((performance.now() - prevTime) / 1000, 0.1);
  prevTime = performance.now();

  updateArmAnimation(delta);

  // 日夜時間
  dayTime = (dayTime + delta * (isFastTime ? 0.1 : 0.005)) % 1.0;
  const angle = dayTime * Math.PI * 2;
  sunLight.position.x = Math.cos(angle) * 80;
  sunLight.position.y = Math.sin(angle) * 80;

  const hours = Math.floor(dayTime * 24);
  const minutes = Math.floor((dayTime * 24 % 1) * 60);
  timeDisplay.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  // 生物與掉落物更新
  sheepList.forEach(sheep => sheep.update(delta, performance.now() / 1000));
  zombieList.forEach(zombie => zombie.update(delta, camera.position, hurtPlayer));
  armadilloList.forEach(armadillo => armadillo.update(delta, performance.now() / 1000, camera.position));
  wolfList.forEach(wolf => wolf.update(delta, camera.position, zombieList));
  updateParticles(delta);
  updateDroppedItems(delta, camera.position);

  updateRaycaster();

  // 需求 2：計算攝影機視角水平前進向量 (W 前進方向 100% 精確對齊視角面向)
  const camDir = new THREE.Vector3();
  camera.getWorldDirection(camDir);
  camDir.y = 0;
  camDir.normalize();

  const camRight = new THREE.Vector3();
  camRight.crossVectors(camDir, camera.up).normalize();

  const moveVec = new THREE.Vector3();
  if (moveForward) moveVec.add(camDir);
  if (moveBackward) moveVec.sub(camDir);
  if (moveRight) moveVec.add(camRight);
  if (moveLeft) moveVec.sub(camRight);
  if (moveVec.lengthSq() > 0) moveVec.normalize();

  if (currentMode === GAME_MODES.SPECTATOR) {
    // 👻 旁觀模式：自由穿牆飛行 (Noclip Fly)
    velocity.set(0, 0, 0);
    const flySpeed = 15.0 * delta;

    const dirVector = new THREE.Vector3();
    camera.getWorldDirection(dirVector);
    const sideVector = new THREE.Vector3().crossVectors(dirVector, camera.up).normalize();

    if (moveForward) camera.position.addScaledVector(dirVector, flySpeed);
    if (moveBackward) camera.position.addScaledVector(dirVector, -flySpeed);
    if (moveRight) camera.position.addScaledVector(sideVector, flySpeed);
    if (moveLeft) camera.position.addScaledVector(sideVector, -flySpeed);
    if (moveUp) camera.position.y += flySpeed;
    if (moveDown) camera.position.y -= flySpeed;

  } else if (currentMode === GAME_MODES.CREATIVE) {
    // ⚡ 創造模式：支援自由飛行與無敵
    const flySpeed = (isFastTime ? 12.0 : 7.0) * delta;
    if (moveVec.lengthSq() > 0) {
      const oldPos = camera.position.clone();
      camera.position.x += moveVec.x * flySpeed;
      if (checkPlayerCollision(camera.position)) camera.position.x = oldPos.x;

      camera.position.z += moveVec.z * flySpeed;
      if (checkPlayerCollision(camera.position)) camera.position.z = oldPos.z;
    }

    if (moveUp) velocity.y = 8.0;
    else if (moveDown) velocity.y = -8.0;
    else velocity.y -= velocity.y * 10.0 * delta;

    const oldPos = camera.position.clone();
    camera.position.y += velocity.y * delta;
    if (checkPlayerCollision(camera.position)) camera.position.y = oldPos.y;

    const playerFeetY = camera.position.y - 1.6;
    const targetGroundY = getGroundHeightAtFeet(camera.position.x, playerFeetY, camera.position.z) + 1.6;
    if (camera.position.y <= targetGroundY) {
      if (!moveUp) {
        velocity.y = 0;
        camera.position.y = targetGroundY;
        canJump = true;
      }
    }

  } else {
    // 🟢 生存模式：取消自動踏台階 (1格高台階必須跳躍才能過去)、對齊視角前進、防飛樹頂
    velocity.y -= 25.0 * delta; // 重力

    const moveSpeed = (isFastTime ? 10.0 : 5.5) * delta;
    const oldPos = camera.position.clone();

    // 依視角方向分步前進碰撞 (遇到 1 格高台階或樹幹時，會撞牆擋住，需按 Space 跳躍)
    if (moveVec.lengthSq() > 0) {
      camera.position.x += moveVec.x * moveSpeed;
      if (checkPlayerCollision(camera.position)) {
        camera.position.x = oldPos.x;
      }

      camera.position.z += moveVec.z * moveSpeed;
      if (checkPlayerCollision(camera.position)) {
        camera.position.z = oldPos.z;
      }
    }

    // Y 軸重力與腳底地面物理 (需求 4：絕不判定頭頂樹葉為地面，切實防飛樹頂)
    camera.position.y += velocity.y * delta;
    const playerFeetY = camera.position.y - 1.6;
    const targetGroundY = getGroundHeightAtFeet(camera.position.x, playerFeetY, camera.position.z) + 1.6;

    if (camera.position.y <= targetGroundY) {
      velocity.y = 0;
      camera.position.y = targetGroundY;
      canJump = true;
    }

    if (camera.position.y < -10) {
      velocity.y = 0;
      const respawnY = getGroundHeight(0, 0) + 1.6;
      camera.position.set(0, respawnY, 0);
    }
  }

  posDisplay.innerText = `X: ${Math.floor(camera.position.x)}, Y: ${Math.floor(camera.position.y - 1.6)}, Z: ${Math.floor(camera.position.z)}`;

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

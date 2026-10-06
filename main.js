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

  playEatSound() {
    this.init();
    if (!this.ctx) return;
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220 + Math.random() * 80, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
      }, i * 100);
    }
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
  WOLF_ARMOR: { id: 25, name: '🛡️ 1.20.6 狼鎧甲 (Wolf Armor)', color: 0x8b5e3c, requiredHits: 1, isTool: true },
  CHERRY_PLANKS: { id: 26, name: '🌸 櫻花木板 (Cherry Planks)', color: 0xe8a5b8, requiredHits: 3 },
  BAMBOO_BLOCK: { id: 27, name: '🎋 竹子塊 (Bamboo Block)', color: 0x76a035, requiredHits: 3 },
  BAMBOO_MOSAIC: { id: 28, name: '🎋 竹木馬賽克 (Bamboo Mosaic)', color: 0x99bb33, requiredHits: 3 },
  SHEEP_MEAT: { id: 29, name: '🥩 生羊肉 (Raw Mutton)', color: 0xc45c5c, isFood: true, restoresHunger: 3, isTool: true },
  PIG_MEAT: { id: 30, name: '🥓 生豬肉 (Raw Porkchop)', color: 0xe07a7a, isFood: true, restoresHunger: 4, isTool: true },
  COW_MEAT: { id: 31, name: '🥩 生牛肉 (Raw Beef)', color: 0x943030, isFood: true, restoresHunger: 4, isTool: true },
  CHICKEN_MEAT: { id: 32, name: '🍗 生雞肉 (Raw Chicken)', color: 0xd6996b, isFood: true, restoresHunger: 3, isTool: true },
  LEATHER_SADDLE: { id: 33, name: '🏇 皮革馬鞍 (Leather Saddle)', color: 0x5c3317, requiredHits: 1, isTool: true }
};

let HOTBAR_BLOCKS = [null, null, null, null, null, null, null, null, null, null];
let selectedBlockIndex = 0;

// --- 64x64 高解析度 HD 超擬真 Minecraft 紋理生成器 ---
const textureCache = new Map();

function createPixelTexture(type, face = 'all') {
  const cacheKey = `${type}_${face}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const canvas = document.createElement('canvas');
  const size = 64;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  function randomNoise(baseR, baseG, baseB, variance = 18) {
    const v = (Math.random() - 0.5) * variance;
    const r = Math.min(255, Math.max(0, Math.floor(baseR + v)));
    const g = Math.min(255, Math.max(0, Math.floor(baseG + v)));
    const b = Math.min(255, Math.max(0, Math.floor(baseB + v)));
    return `rgb(${r},${g},${b})`;
  }

  if (type === 'GRASS') {
    if (face === 'top') {
      ctx.fillStyle = '#5c8e2b';
      ctx.fillRect(0, 0, size, size);
      for (let x = 0; x < size; x += 2) {
        for (let y = 0; y < size; y += 2) {
          ctx.fillStyle = randomNoise(92, 148, 42, 26);
          ctx.fillRect(x, y, 2, 2);
        }
      }
      for (let i = 0; i < 60; i++) {
        const rx = Math.floor(Math.random() * (size - 4));
        const ry = Math.floor(Math.random() * (size - 4));
        ctx.fillStyle = Math.random() > 0.4 ? '#7cb33d' : '#3d631d';
        ctx.fillRect(rx, ry, 3, 3);
      }
    } else if (face === 'side') {
      ctx.fillStyle = '#866043';
      ctx.fillRect(0, 0, size, size);
      for (let x = 0; x < size; x += 2) {
        for (let y = 0; y < size; y += 2) {
          ctx.fillStyle = randomNoise(134, 96, 67, 24);
          ctx.fillRect(x, y, 2, 2);
        }
      }
      for (let x = 0; x < size; x += 2) {
        const depth = 12 + Math.floor(Math.sin(x * 0.2) * 4 + Math.random() * 6);
        for (let y = 0; y < depth; y += 2) {
          ctx.fillStyle = randomNoise(92, 148, 42, 24);
          ctx.fillRect(x, y, 2, 2);
        }
        ctx.fillStyle = '#3d631d';
        ctx.fillRect(x, depth, 2, 2);
      }
    } else {
      ctx.fillStyle = '#866043';
      ctx.fillRect(0, 0, size, size);
      for (let x = 0; x < size; x += 2) {
        for (let y = 0; y < size; y += 2) {
          ctx.fillStyle = randomNoise(134, 96, 67, 24);
          ctx.fillRect(x, y, 2, 2);
        }
      }
    }
  } else if (type === 'DIRT') {
    ctx.fillStyle = '#866043';
    ctx.fillRect(0, 0, size, size);
    for (let x = 0; x < size; x += 2) {
      for (let y = 0; y < size; y += 2) {
        ctx.fillStyle = randomNoise(134, 96, 67, 28);
        ctx.fillRect(x, y, 2, 2);
      }
    }
    for (let i = 0; i < 20; i++) {
      const rx = Math.floor(Math.random() * (size - 4));
      const ry = Math.floor(Math.random() * (size - 4));
      ctx.fillStyle = Math.random() > 0.5 ? '#5c412d' : '#a67b5b';
      ctx.fillRect(rx, ry, 4, 4);
    }
  } else if (type === 'STONE') {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, size, size);
    for (let x = 0; x < size; x += 2) {
      for (let y = 0; y < size; y += 2) {
        ctx.fillStyle = randomNoise(128, 128, 128, 32);
        ctx.fillRect(x, y, 2, 2);
      }
    }
    for (let i = 0; i < 15; i++) {
      const rx = Math.floor(Math.random() * (size - 6));
      const ry = Math.floor(Math.random() * (size - 6));
      ctx.fillStyle = '#545454';
      ctx.fillRect(rx, ry, 6, 2);
      ctx.fillStyle = '#a8a8a8';
      ctx.fillRect(rx, ry + 2, 6, 2);
    }
  } else if (['SHEEP_MEAT', 'PIG_MEAT', 'COW_MEAT', 'CHICKEN_MEAT', 'LEATHER_SADDLE'].includes(type)) {
    const config = BLOCKS[type];
    ctx.fillStyle = `#${config.color.toString(16).padStart(6, '0')}`;
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(16, 16, 32, 32);
    ctx.fillStyle = `#${config.color.toString(16).padStart(6, '0')}`;
    ctx.fillRect(20, 20, 24, 24);
  } else if (['WOOD', 'OAK_LOG', 'SPRUCE_LOG', 'BIRCH_LOG', 'JUNGLE_LOG', 'ACACIA_LOG', 'DARK_OAK_LOG', 'CHERRY_LOG'].includes(type)) {
    if (face === 'top' || face === 'bottom') {
      ctx.fillStyle = type === 'CHERRY_LOG' ? '#e8a5b8' : (type === 'BIRCH_LOG' ? '#d6c89b' : '#a07850');
      ctx.fillRect(0, 0, size, size);
      ctx.strokeStyle = '#5c4028';
      ctx.lineWidth = 4;
      ctx.strokeRect(6, 6, size - 12, size - 12);
      ctx.strokeRect(18, 18, size - 36, size - 36);
      ctx.fillStyle = '#5c4028';
      ctx.fillRect(28, 28, 8, 8);
    } else {
      ctx.fillStyle = '#674d3c';
      ctx.fillRect(0, 0, size, size);
      for (let x = 0; x < size; x += 2) {
        for (let y = 0; y < size; y += 2) {
          const isGroove = (x % 12 < 4);
          if (type === 'BIRCH_LOG') {
            ctx.fillStyle = isGroove ? '#1a1a1a' : randomNoise(235, 235, 235, 15);
          } else if (type === 'CHERRY_LOG') {
            ctx.fillStyle = isGroove ? '#45222e' : randomNoise(181, 101, 118, 24);
          } else {
            ctx.fillStyle = isGroove ? '#3c281e' : randomNoise(115, 85, 62, 24);
          }
          ctx.fillRect(x, y, 2, 2);
        }
      }
    }
  } else if (type === 'LEAVES' || type === 'CHERRY_LEAVES') {
    const isCherry = (type === 'CHERRY_LEAVES');
    ctx.fillStyle = isCherry ? '#ffb7c5' : '#2d5a1e';
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 240; i++) {
      const rx = Math.floor(Math.random() * (size - 3));
      const ry = Math.floor(Math.random() * (size - 3));
      if (isCherry) {
        ctx.fillStyle = randomNoise(255, 175, 195, 45);
      } else {
        ctx.fillStyle = randomNoise(60, 145, 40, 45);
      }
      ctx.fillRect(rx, ry, 4, 4);
    }
  } else if (type === 'DIAMOND') {
    ctx.fillStyle = '#3dbdb2';
    ctx.fillRect(0, 0, size, size);
    for (let x = 0; x < size; x += 4) {
      for (let y = 0; y < size; y += 4) {
        if ((x + y) % 8 === 0) {
          ctx.fillStyle = '#bdffff';
          ctx.fillRect(x, y, 4, 4);
        } else {
          ctx.fillStyle = randomNoise(60, 215, 205, 30);
          ctx.fillRect(x, y, 4, 4);
        }
      }
    }
    ctx.strokeStyle = '#217a74';
    ctx.lineWidth = 3;
    ctx.strokeRect(2, 2, size - 4, size - 4);
  } else if (type === 'TNT') {
    ctx.fillStyle = '#cc2e21';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 20, size, 24);
    ctx.fillStyle = '#000000';
    ctx.font = '900 20px sans-serif';
    ctx.fillText('TNT', 11, 39);
    ctx.fillStyle = '#8b1d14';
    ctx.fillRect(0, 0, size, 4);
    ctx.fillRect(0, size - 4, size, 4);
  } else if (type === 'SUSPICIOUS_SAND') {
    ctx.fillStyle = '#e0c068';
    ctx.fillRect(0, 0, size, size);
    for (let x = 0; x < size; x += 2) {
      for (let y = 0; y < size; y += 2) {
        ctx.fillStyle = randomNoise(224, 192, 104, 32);
        ctx.fillRect(x, y, 2, 2);
      }
    }
    ctx.fillStyle = '#8f6527';
    ctx.fillRect(16, 16, 8, 8);
    ctx.fillRect(40, 36, 10, 8);
    ctx.fillRect(12, 44, 6, 6);
  } else if (type === 'COPPER_BULB') {
    ctx.fillStyle = '#c87d55';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#ffaa00';
    ctx.fillRect(16, 16, 32, 32);
    ctx.fillStyle = '#fff3b5';
    ctx.fillRect(24, 24, 16, 16);
    ctx.strokeStyle = '#7a4228';
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, size - 8, size - 8);
  } else if (type === 'GLOWSTONE') {
    ctx.fillStyle = '#ffe885';
    ctx.fillRect(0, 0, size, size);
    for (let x = 0; x < size; x += 4) {
      for (let y = 0; y < size; y += 4) {
        ctx.fillStyle = randomNoise(245, 210, 80, 50);
        ctx.fillRect(x, y, 4, 4);
      }
    }
  } else if (type === 'CHEST') {
    ctx.fillStyle = '#855428';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#3a2412';
    ctx.fillRect(0, 0, size, 4);
    ctx.fillRect(0, size - 4, size, 4);
    ctx.fillRect(0, 0, 4, size);
    ctx.fillRect(size - 4, 0, 4, size);
    ctx.fillRect(0, 28, size, 6);
    if (face === 'front') {
      ctx.fillStyle = '#e6b800';
      ctx.fillRect(26, 22, 12, 16);
      ctx.fillStyle = '#222';
      ctx.fillRect(30, 28, 4, 6);
    }
  } else {
    const config = BLOCKS[type] || BLOCKS.DIRT;
    const hex = `#${config.color.toString(16).padStart(6, '0')}`;
    ctx.fillStyle = hex;
    ctx.fillRect(0, 0, size, size);
    for (let x = 0; x < size; x += 4) {
      for (let y = 0; y < size; y += 4) {
        if ((x + y) % 8 === 0) {
          ctx.fillStyle = 'rgba(255,255,255,0.15)';
          ctx.fillRect(x, y, 4, 4);
        }
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestMipmapLinearFilter;
  texture.generateMipmaps = true;
  textureCache.set(cacheKey, texture);
  return texture;
}

const blockMaterialsCache = {};
function getBlockMaterials(blockTypeKey) {
  if (blockMaterialsCache[blockTypeKey]) return blockMaterialsCache[blockTypeKey];

  if (['WOOD', 'OAK_LOG', 'SPRUCE_LOG', 'BIRCH_LOG', 'JUNGLE_LOG', 'ACACIA_LOG', 'DARK_OAK_LOG', 'CHERRY_LOG'].includes(blockTypeKey)) {
    const topMat = new THREE.MeshLambertMaterial({ map: createPixelTexture(blockTypeKey, 'top') });
    const sideMat = new THREE.MeshLambertMaterial({ map: createPixelTexture(blockTypeKey, 'side') });
    blockMaterialsCache[blockTypeKey] = [sideMat, sideMat, topMat, topMat, sideMat, sideMat];
  } else if (blockTypeKey === 'CHEST') {
    const frontMat = new THREE.MeshLambertMaterial({ map: createPixelTexture('CHEST', 'front') });
    const sideMat = new THREE.MeshLambertMaterial({ map: createPixelTexture('CHEST', 'side') });
    const topMat = new THREE.MeshLambertMaterial({ map: createPixelTexture('CHEST', 'top') });
    blockMaterialsCache[blockTypeKey] = [sideMat, sideMat, topMat, topMat, frontMat, sideMat];
  } else if (blockTypeKey === 'GRASS') {
    const topMat = new THREE.MeshLambertMaterial({ map: createPixelTexture('GRASS', 'top') });
    const sideMat = new THREE.MeshLambertMaterial({ map: createPixelTexture('GRASS', 'side') });
    const bottomMat = new THREE.MeshLambertMaterial({ map: createPixelTexture('DIRT') });
    blockMaterialsCache[blockTypeKey] = [sideMat, sideMat, topMat, bottomMat, sideMat, sideMat];
  } else if (blockTypeKey === 'COPPER_BULB') {
    const mat = new THREE.MeshStandardMaterial({
      map: createPixelTexture('COPPER_BULB'),
      emissive: 0xffaa00,
      emissiveIntensity: 0.8,
      roughness: 0.3
    });
    blockMaterialsCache[blockTypeKey] = mat;
  } else if (blockTypeKey === 'GLOWSTONE') {
    const mat = new THREE.MeshStandardMaterial({
      map: createPixelTexture('GLOWSTONE'),
      emissive: 0xffaa00,
      emissiveIntensity: 0.6
    });
    blockMaterialsCache[blockTypeKey] = mat;
  } else {
    const config = BLOCKS[blockTypeKey] || BLOCKS.DIRT;
    const mat = new THREE.MeshLambertMaterial({
      map: createPixelTexture(blockTypeKey),
      transparent: config.transparent || false,
      opacity: config.opacity || 1.0
    });
    blockMaterialsCache[blockTypeKey] = mat;
  }
  return blockMaterialsCache[blockTypeKey];
}

// --- Three.js 初始化 ---
const container = document.getElementById('game-container');
const scene = new THREE.Scene();

const skyColorDay = new THREE.Color(0x7ec0ee);
const skyColorNight = new THREE.Color(0x0a0e1a);
scene.background = skyColorDay.clone();
scene.fog = new THREE.FogExp2(0x7ec0ee, 0.002);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1500);
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

const sunLight = new THREE.DirectionalLight(0xfff5ea, 1.25);
sunLight.position.set(80, 120, 50);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 350;
sunLight.shadow.camera.left = -150;
sunLight.shadow.camera.right = 150;
sunLight.shadow.camera.top = 150;
sunLight.shadow.camera.bottom = -150;
scene.add(sunLight);

// 第一人稱手臂與十字鎬動畫
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

// --- 方塊世界與 InstancedMesh 高效渲染管理器 ---
const voxelMap = new Map();
const blockHitsMap = new Map();
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

function getVoxelKey(x, y, z) {
  return `${Math.floor(x)},${Math.floor(y)},${Math.floor(z)}`;
}

function hasBlock(x, y, z) {
  return voxelMap.has(getVoxelKey(x, y, z));
}

function isTransparentBlock(typeKey) {
  return BLOCKS[typeKey]?.transparent || typeKey === 'GLASS' || typeKey === 'LEAVES' || typeKey === 'CHERRY_LEAVES';
}

function isBlockOccluded(x, y, z) {
  const neighbors = [
    [x + 1, y, z], [x - 1, y, z],
    [x, y + 1, z], [x, y - 1, z],
    [x, y, z + 1], [x, y, z - 1]
  ];
  for (let i = 0; i < neighbors.length; i++) {
    const [nx, ny, nz] = neighbors[i];
    const nKey = getVoxelKey(nx, ny, nz);
    const nVal = voxelMap.get(nKey);
    if (!nVal || isTransparentBlock(nVal.typeKey)) {
      return false;
    }
  }
  return true;
}

class BlockRenderManager {
  constructor(scene) {
    this.scene = scene;
    this.instancedMeshes = new Map();
    this.dummy = new THREE.Object3D();
    this.isDirty = false;
  }

  markDirty() {
    this.isDirty = true;
  }

  update() {
    if (!this.isDirty) return;
    this.isDirty = false;

    const typeGroups = new Map();
    voxelMap.forEach((val, key) => {
      const { x, y, z, typeKey } = val;
      if (isBlockOccluded(x, y, z)) return;

      if (!typeGroups.has(typeKey)) {
        typeGroups.set(typeKey, []);
      }
      typeGroups.get(typeKey).push({ x, y, z, key });
    });

    typeGroups.forEach((blockList, typeKey) => {
      let imesh = this.instancedMeshes.get(typeKey);
      const count = blockList.length;

      if (!imesh || imesh.instanceMatrix.array.length / 16 < count) {
        if (imesh) {
          this.scene.remove(imesh);
          imesh.geometry.dispose();
        }
        const capacity = Math.max(count + 3000, 10000);
        const materials = getBlockMaterials(typeKey);
        imesh = new THREE.InstancedMesh(boxGeometry, materials, capacity);
        imesh.castShadow = true;
        imesh.receiveShadow = true;
        imesh.userData = { isVoxelTerrain: true, typeKey };
        this.scene.add(imesh);
        this.instancedMeshes.set(typeKey, imesh);
      }

      imesh.count = count;
      for (let i = 0; i < count; i++) {
        const b = blockList[i];
        this.dummy.position.set(b.x + 0.5, b.y + 0.5, b.z + 0.5);
        this.dummy.updateMatrix();
        imesh.setMatrixAt(i, this.dummy.matrix);
      }
      imesh.instanceMatrix.needsUpdate = true;
    });

    this.instancedMeshes.forEach((imesh, typeKey) => {
      if (!typeGroups.has(typeKey)) {
        imesh.count = 0;
        imesh.instanceMatrix.needsUpdate = true;
      }
    });
  }

  getRenderableMeshes() {
    return Array.from(this.instancedMeshes.values()).filter(m => m.count > 0);
  }
}

const blockRenderManager = new BlockRenderManager(scene);

// 取得精確地面高度
function getGroundHeight(x, z) {
  const bx = Math.floor(x);
  const bz = Math.floor(z);
  for (let y = 25; y >= 0; y--) {
    if (hasBlock(bx, y, bz)) {
      return y + 1;
    }
  }
  return 1;
}

function getGroundHeightAtFeet(x, feetY, z) {
  const bx = Math.floor(x);
  const bz = Math.floor(z);
  const maxCheckY = Math.min(25, Math.floor(feetY + 0.3));
  for (let y = maxCheckY; y >= 0; y--) {
    if (hasBlock(bx, y, bz)) {
      if (y + 1 <= feetY + 0.3) {
        return y + 1;
      }
    }
  }
  return 1;
}

function addBlock(x, y, z, blockTypeKey, triggerRenderUpdate = true) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const iz = Math.floor(z);
  const key = getVoxelKey(ix, iy, iz);
  if (voxelMap.has(key)) return;

  voxelMap.set(key, { typeKey: blockTypeKey, x: ix, y: iy, z: iz });
  if (triggerRenderUpdate) {
    blockRenderManager.markDirty();
  }
}

function removeBlock(x, y, z, spawnDebris = true) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const iz = Math.floor(z);
  const key = getVoxelKey(ix, iy, iz);
  if (!voxelMap.has(key)) return;

  const { typeKey } = voxelMap.get(key);
  const blockPos = new THREE.Vector3(ix + 0.5, iy + 0.5, iz + 0.5);
  if (spawnDebris) {
    spawnBlockDebris(blockPos, BLOCKS[typeKey]?.color || 0x888888);
    spawnDroppedItem(blockPos, typeKey);
  }

  voxelMap.delete(key);
  blockHitsMap.delete(key);
  blockRenderManager.markDirty();
}

// 🎁 掉落物與愛心粒子 System
const droppedItems = [];
const itemGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const activeHeartParticles = [];

function spawnHeartParticles(pos) {
  for (let i = 0; i < 5; i++) {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    ctx.font = '24px sans-serif';
    ctx.fillText('❤️', 2, 24);
    const texture = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(0.6, 0.6, 0.6);
    sprite.position.copy(pos).add(new THREE.Vector3(
      (Math.random() - 0.5) * 0.6,
      0.8 + Math.random() * 0.4,
      (Math.random() - 0.5) * 0.6
    ));
    scene.add(sprite);
    activeHeartParticles.push({ sprite, life: 1.2 });
  }
}

function updateHeartParticles(delta) {
  for (let i = activeHeartParticles.length - 1; i >= 0; i--) {
    const hp = activeHeartParticles[i];
    hp.life -= delta;
    hp.sprite.position.y += delta * 0.8;
    hp.sprite.material.opacity = Math.max(0, hp.life / 1.2);
    if (hp.life <= 0) {
      scene.remove(hp.sprite);
      hp.sprite.material.dispose();
      activeHeartParticles.splice(i, 1);
    }
  }
}

function spawnDroppedItem(pos, typeKey, count = 1) {
  for (let c = 0; c < count; c++) {
    const mat = getBlockMaterials(typeKey);
    const mesh = new THREE.Mesh(itemGeometry, mat);
    const offset = new THREE.Vector3((Math.random() - 0.5) * 0.4, 0.2 + c * 0.1, (Math.random() - 0.5) * 0.4);
    mesh.position.copy(pos).add(offset);
    scene.add(mesh);

    droppedItems.push({
      mesh,
      typeKey,
      time: Math.random() * 10
    });
  }
}

function addItemToHotbar(typeKey) {
  const blockObj = BLOCKS[typeKey];
  if (!blockObj) return;

  let existingIndex = HOTBAR_BLOCKS.findIndex(b => b && b.id === blockObj.id);
  if (existingIndex !== -1) {
    selectHotbarSlot(existingIndex);
    return;
  }

  let emptyIndex = HOTBAR_BLOCKS.findIndex(b => b === null);
  if (emptyIndex !== -1) {
    HOTBAR_BLOCKS[emptyIndex] = blockObj;
    selectHotbarSlot(emptyIndex);
  } else {
    HOTBAR_BLOCKS[selectedBlockIndex] = blockObj;
    selectHotbarSlot(selectedBlockIndex);
  }
}

function updateDroppedItems(delta, playerPos) {
  for (let i = droppedItems.length - 1; i >= 0; i--) {
    const item = droppedItems[i];
    item.time += delta * 3;

    item.mesh.rotation.y += delta * 2;
    item.mesh.position.y += Math.sin(item.time) * 0.003;

    const dist = playerPos.distanceTo(item.mesh.position);
    if (dist < 1.6) {
      sounds.playItemPickup();
      addItemToHotbar(item.typeKey);
      scene.remove(item.mesh);
      droppedItems.splice(i, 1);
    }
  }
}

// 挖掘打擊邏輯
function hitBlock(x, y, z) {
  const key = getVoxelKey(x, y, z);
  if (!voxelMap.has(key)) return;

  if (currentMode === GAME_MODES.CREATIVE) {
    sounds.playBreak();
    removeBlock(x, y, z, true);
    return;
  }

  const { typeKey } = voxelMap.get(key);
  const blockConfig = BLOCKS[typeKey];
  const requiredHits = blockConfig?.requiredHits || 3;

  const currentHits = (blockHitsMap.get(key) || 0) + 1;
  blockHitsMap.set(key, currentHits);

  sounds.playMiningHit();
  spawnBlockDebris(new THREE.Vector3(Math.floor(x) + 0.5, Math.floor(y) + 0.5, Math.floor(z) + 0.5), blockConfig?.color || 0x888888);

  if (currentHits >= requiredHits) {
    sounds.playBreak();
    removeBlock(x, y, z, true);
  }
}

// 💾 世界存檔與載入
function saveWorldToStorage() {
  const data = [];
  voxelMap.forEach((val, key) => {
    data.push({ x: val.x, y: val.y, z: val.z, typeKey: val.typeKey });
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
  voxelMap.clear();

  data.forEach(item => {
    addBlock(item.x, item.y, item.z, item.typeKey, false);
  });
  blockRenderManager.markDirty();
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

  sounds.playTNTFuse();

  let flashCount = 0;
  const fuseInterval = setInterval(() => {
    flashCount++;
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

// 🐑 精緻方塊小羊
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

    this.health = 5;
    this.targetDir = new THREE.Vector3();
    this.changeDirectionTimer = 0;
  }

  hit() {
    this.health--;
    sounds.playHitZombie();
    spawnBlockDebris(this.group.position.clone().add(new THREE.Vector3(0, 0.8, 0)), 0xf5f5f5);
    if (this.health <= 0) {
      scene.remove(this.group);
      const count = 1 + Math.floor(Math.random() * 3);
      spawnDroppedItem(this.group.position, 'SHEEP_MEAT', count);
      return true;
    }
    return false;
  }

  update(delta, time, playerPos) {
    const dx = this.group.position.x - playerPos.x;
    const dz = this.group.position.z - playerPos.z;
    const distSq = dx * dx + dz * dz;

    if (distSq > 3600) {
      this.group.visible = false;
      return;
    }
    this.group.visible = true;

    this.changeDirectionTimer -= delta;
    if (this.changeDirectionTimer <= 0) {
      const angle = Math.random() * Math.PI * 2;
      this.targetDir.set(Math.cos(angle), 0, Math.sin(angle));
      this.group.rotation.y = Math.atan2(this.targetDir.x, this.targetDir.z);
      this.changeDirectionTimer = 3 + Math.random() * 4;
    }

    const nextX = this.group.position.x + this.targetDir.x * delta * 0.7;
    const nextZ = this.group.position.z + this.targetDir.z * delta * 0.7;
    const targetY = getGroundHeight(nextX, nextZ);

    if (targetY - this.group.position.y <= 1.1) {
      this.group.position.x = nextX;
      this.group.position.z = nextZ;
      this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, targetY, 0.25);
    } else {
      this.changeDirectionTimer = 0;
    }

    this.legs.forEach((leg, idx) => {
      leg.rotation.x = Math.sin(time * 6 + idx) * 0.4;
    });
    this.head.rotation.y = Math.sin(time * 2) * 0.2;
  }
}

// 🐷 方塊小豬
class VoxelPig {
  constructor(x, z) {
    this.group = new THREE.Group();

    const skinMat = new THREE.MeshLambertMaterial({ color: 0xf4a261 });
    const snoutMat = new THREE.MeshLambertMaterial({ color: 0xff85a1 });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.8, 1.4), skinMat);
    body.position.y = 0.7;
    this.group.add(body);

    this.head = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), skinMat);
    this.head.position.set(0, 1.0, 0.7);

    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.1), snoutMat);
    snout.position.set(0, -0.05, 0.32);

    const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.04), eyeMat);
    eyeL.position.set(-0.18, 0.1, 0.31);
    const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.04), eyeMat);
    eyeR.position.set(0.18, 0.1, 0.31);

    this.head.add(snout);
    this.head.add(eyeL);
    this.head.add(eyeR);
    this.group.add(this.head);

    this.legs = [];
    [[-0.35, 0.3, 0.4], [0.35, 0.3, 0.4], [-0.35, 0.3, -0.4], [0.35, 0.3, -0.4]].forEach(pos => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.6, 0.28), skinMat);
      leg.position.set(...pos);
      this.group.add(leg);
      this.legs.push(leg);
    });

    const groundY = getGroundHeight(x, z);
    this.group.position.set(x, groundY, z);
    scene.add(this.group);

    this.health = 4;
    this.targetDir = new THREE.Vector3();
    this.changeDirectionTimer = 0;
  }

  hit() {
    this.health--;
    sounds.playHitZombie();
    spawnBlockDebris(this.group.position.clone().add(new THREE.Vector3(0, 0.7, 0)), 0xf4a261);
    if (this.health <= 0) {
      scene.remove(this.group);
      const count = 1 + Math.floor(Math.random() * 3);
      spawnDroppedItem(this.group.position, 'PIG_MEAT', count);
      return true;
    }
    return false;
  }

  update(delta, time, playerPos) {
    const dx = this.group.position.x - playerPos.x;
    const dz = this.group.position.z - playerPos.z;
    const distSq = dx * dx + dz * dz;

    if (distSq > 3600) {
      this.group.visible = false;
      return;
    }
    this.group.visible = true;

    this.changeDirectionTimer -= delta;
    if (this.changeDirectionTimer <= 0) {
      const angle = Math.random() * Math.PI * 2;
      this.targetDir.set(Math.cos(angle), 0, Math.sin(angle));
      this.group.rotation.y = Math.atan2(this.targetDir.x, this.targetDir.z);
      this.changeDirectionTimer = 3 + Math.random() * 4;
    }

    const nextX = this.group.position.x + this.targetDir.x * delta * 0.8;
    const nextZ = this.group.position.z + this.targetDir.z * delta * 0.8;
    const targetY = getGroundHeight(nextX, nextZ);

    if (targetY - this.group.position.y <= 1.1) {
      this.group.position.x = nextX;
      this.group.position.z = nextZ;
      this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, targetY, 0.25);
    } else {
      this.changeDirectionTimer = 0;
    }

    this.legs.forEach((leg, idx) => {
      leg.rotation.x = Math.sin(time * 7 + idx) * 0.4;
    });
  }
}

// 🐮 方塊乳牛
class VoxelCow {
  constructor(x, z) {
    this.group = new THREE.Group();

    const bodyMat = new THREE.MeshLambertMaterial({ color: 0x4a3b32 });
    const udderMat = new THREE.MeshLambertMaterial({ color: 0xdfcbb5 });
    const hornMat = new THREE.MeshLambertMaterial({ color: 0xcccccc });

    const body = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.0, 1.8), bodyMat);
    body.position.y = 1.0;
    this.group.add(body);

    this.head = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), bodyMat);
    this.head.position.set(0, 1.4, 0.95);

    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.25, 0.1), udderMat);
    snout.position.set(0, -0.1, 0.36);

    const hornL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.25, 0.1), hornMat);
    hornL.position.set(-0.32, 0.4, 0);
    const hornR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.25, 0.1), hornMat);
    hornR.position.set(0.32, 0.4, 0);

    this.head.add(snout);
    this.head.add(hornL);
    this.head.add(hornR);
    this.group.add(this.head);

    this.legs = [];
    [[-0.45, 0.45, 0.6], [0.45, 0.45, 0.6], [-0.45, 0.45, -0.6], [0.45, 0.45, -0.6]].forEach(pos => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.9, 0.35), bodyMat);
      leg.position.set(...pos);
      this.group.add(leg);
      this.legs.push(leg);
    });

    const groundY = getGroundHeight(x, z);
    this.group.position.set(x, groundY, z);
    scene.add(this.group);

    this.health = 6;
    this.targetDir = new THREE.Vector3();
    this.changeDirectionTimer = 0;
  }

  hit() {
    this.health--;
    sounds.playHitZombie();
    spawnBlockDebris(this.group.position.clone().add(new THREE.Vector3(0, 1.0, 0)), 0x4a3b32);
    if (this.health <= 0) {
      scene.remove(this.group);
      const count = 1 + Math.floor(Math.random() * 3);
      spawnDroppedItem(this.group.position, 'COW_MEAT', count);
      return true;
    }
    return false;
  }

  update(delta, time, playerPos) {
    const dx = this.group.position.x - playerPos.x;
    const dz = this.group.position.z - playerPos.z;
    const distSq = dx * dx + dz * dz;

    if (distSq > 3600) {
      this.group.visible = false;
      return;
    }
    this.group.visible = true;

    this.changeDirectionTimer -= delta;
    if (this.changeDirectionTimer <= 0) {
      const angle = Math.random() * Math.PI * 2;
      this.targetDir.set(Math.cos(angle), 0, Math.sin(angle));
      this.group.rotation.y = Math.atan2(this.targetDir.x, this.targetDir.z);
      this.changeDirectionTimer = 3 + Math.random() * 4;
    }

    const nextX = this.group.position.x + this.targetDir.x * delta * 0.65;
    const nextZ = this.group.position.z + this.targetDir.z * delta * 0.65;
    const targetY = getGroundHeight(nextX, nextZ);

    if (targetY - this.group.position.y <= 1.1) {
      this.group.position.x = nextX;
      this.group.position.z = nextZ;
      this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, targetY, 0.25);
    } else {
      this.changeDirectionTimer = 0;
    }

    this.legs.forEach((leg, idx) => {
      leg.rotation.x = Math.sin(time * 5 + idx) * 0.35;
    });
  }
}

// 🐔 方塊小雞
class VoxelChicken {
  constructor(x, z) {
    this.group = new THREE.Group();

    const featherMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const beakMat = new THREE.MeshLambertMaterial({ color: 0xf4a261 });
    const combMat = new THREE.MeshLambertMaterial({ color: 0xe63946 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.7), featherMat);
    body.position.y = 0.45;
    this.group.add(body);

    this.head = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.35), featherMat);
    this.head.position.set(0, 0.75, 0.3);

    const beak = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.1, 0.15), beakMat);
    beak.position.set(0, -0.05, 0.22);

    const comb = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.12), combMat);
    comb.position.set(0, 0.2, 0.05);

    this.head.add(beak);
    this.head.add(comb);
    this.group.add(this.head);

    this.legs = [];
    [[-0.12, 0.15, 0], [0.12, 0.15, 0]].forEach(pos => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.3, 0.08), beakMat);
      leg.position.set(...pos);
      this.group.add(leg);
      this.legs.push(leg);
    });

    const groundY = getGroundHeight(x, z);
    this.group.position.set(x, groundY, z);
    scene.add(this.group);

    this.health = 3;
    this.targetDir = new THREE.Vector3();
    this.changeDirectionTimer = 0;
  }

  hit() {
    this.health--;
    sounds.playHitZombie();
    spawnBlockDebris(this.group.position.clone().add(new THREE.Vector3(0, 0.4, 0)), 0xffffff);
    if (this.health <= 0) {
      scene.remove(this.group);
      const count = 1 + Math.floor(Math.random() * 2);
      spawnDroppedItem(this.group.position, 'CHICKEN_MEAT', count);
      return true;
    }
    return false;
  }

  update(delta, time, playerPos) {
    const dx = this.group.position.x - playerPos.x;
    const dz = this.group.position.z - playerPos.z;
    const distSq = dx * dx + dz * dz;

    if (distSq > 3600) {
      this.group.visible = false;
      return;
    }
    this.group.visible = true;

    this.changeDirectionTimer -= delta;
    if (this.changeDirectionTimer <= 0) {
      const angle = Math.random() * Math.PI * 2;
      this.targetDir.set(Math.cos(angle), 0, Math.sin(angle));
      this.group.rotation.y = Math.atan2(this.targetDir.x, this.targetDir.z);
      this.changeDirectionTimer = 2 + Math.random() * 3;
    }

    const nextX = this.group.position.x + this.targetDir.x * delta * 0.9;
    const nextZ = this.group.position.z + this.targetDir.z * delta * 0.9;
    const targetY = getGroundHeight(nextX, nextZ);

    if (targetY - this.group.position.y <= 1.1) {
      this.group.position.x = nextX;
      this.group.position.z = nextZ;
      this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, targetY, 0.25);
    } else {
      this.changeDirectionTimer = 0;
    }

    this.legs.forEach((leg, idx) => {
      leg.rotation.x = Math.sin(time * 9 + idx) * 0.5;
    });
  }
}

// 🐎 方塊馬 & 自動裝備馬鞍 (Saddle) 可騎乘奔馳
class VoxelHorse {
  constructor(x, z) {
    this.group = new THREE.Group();

    const coatMat = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
    const maneMat = new THREE.MeshLambertMaterial({ color: 0x3a1e05 });
    const saddleMat = new THREE.MeshLambertMaterial({ color: 0x5c3317 });
    const ironMat = new THREE.MeshLambertMaterial({ color: 0xc0c0c0 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 2.2), coatMat);
    body.position.y = 1.2;
    this.group.add(body);

    // 自動配備馬鞍 (Saddle)
    const saddle = new THREE.Mesh(new THREE.BoxGeometry(1.26, 0.2, 1.0), saddleMat);
    saddle.position.set(0, 1.82, -0.1);
    this.group.add(saddle);

    const stirrupL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.4, 0.2), ironMat);
    stirrupL.position.set(-0.64, 1.3, -0.1);
    const stirrupR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.4, 0.2), ironMat);
    stirrupR.position.set(0.64, 1.3, -0.1);
    this.group.add(stirrupL);
    this.group.add(stirrupR);

    this.neck = new THREE.Group();
    this.neck.position.set(0, 1.6, 0.9);

    const neckMesh = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.2, 0.6), coatMat);
    neckMesh.rotation.x = -0.3;
    this.neck.add(neckMesh);

    this.head = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 1.0), coatMat);
    this.head.position.set(0, 0.6, 0.4);

    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.5), coatMat);
    snout.position.set(0, -0.1, 0.5);

    const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.04), new THREE.MeshBasicMaterial({ color: 0x111111 }));
    eyeL.position.set(-0.31, 0.1, 0.2);
    const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.04), new THREE.MeshBasicMaterial({ color: 0x111111 }));
    eyeR.position.set(0.31, 0.1, 0.2);

    const earL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.3, 0.12), coatMat);
    earL.position.set(-0.2, 0.4, -0.2);
    const earR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.3, 0.12), coatMat);
    earR.position.set(0.2, 0.4, -0.2);

    const mane = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.4, 0.3), maneMat);
    mane.position.set(0, 0.2, -0.35);

    this.head.add(snout);
    this.head.add(eyeL);
    this.head.add(eyeR);
    this.head.add(earL);
    this.head.add(earR);
    this.neck.add(this.head);
    this.neck.add(mane);
    this.group.add(this.neck);

    this.legs = [];
    [[-0.45, 0.6, 0.75], [0.45, 0.6, 0.75], [-0.45, 0.6, -0.75], [0.45, 0.6, -0.75]].forEach(pos => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.2, 0.35), coatMat);
      leg.position.set(...pos);
      this.group.add(leg);
      this.legs.push(leg);
    });

    const groundY = getGroundHeight(x, z);
    this.group.position.set(x, groundY, z);
    scene.add(this.group);

    this.health = 8;
    this.isRidden = false;
    this.targetDir = new THREE.Vector3();
    this.changeDirectionTimer = 0;
  }

  hit() {
    this.health--;
    sounds.playHitZombie();
    spawnBlockDebris(this.group.position.clone().add(new THREE.Vector3(0, 1.0, 0)), 0x8b4513);
    if (this.health <= 0) {
      scene.remove(this.group);
      if (mountedHorse === this) {
        mountedHorse = null;
      }
      spawnDroppedItem(this.group.position, 'LEATHER_SADDLE', 1);
      return true;
    }
    return false;
  }

  update(delta, time, playerPos) {
    if (this.isRidden) return;

    if (this.group.position.distanceTo(playerPos) > 60) return;

    this.changeDirectionTimer -= delta;
    if (this.changeDirectionTimer <= 0) {
      const angle = Math.random() * Math.PI * 2;
      this.targetDir.set(Math.cos(angle), 0, Math.sin(angle));
      this.group.rotation.y = Math.atan2(this.targetDir.x, this.targetDir.z);
      this.changeDirectionTimer = 3 + Math.random() * 4;
    }

    const nextPos = this.group.position.clone().addScaledVector(this.targetDir, delta * 1.0);
    const targetY = getGroundHeight(nextPos.x, nextPos.z);

    if (targetY - this.group.position.y <= 1.1) {
      this.group.position.x = nextPos.x;
      this.group.position.z = nextPos.z;
      this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, targetY, 0.25);
    } else {
      this.changeDirectionTimer = 0;
    }

    this.legs.forEach((leg, idx) => {
      leg.rotation.x = Math.sin(time * 6 + idx) * 0.4;
    });
  }
}

// 🧟 殭屍 Mob
class VoxelZombie {
  constructor(x, z) {
    this.group = new THREE.Group();

    const skinMat = new THREE.MeshLambertMaterial({ color: 0x48793b });
    const shirtMat = new THREE.MeshLambertMaterial({ color: 0x3b8595 });
    const pantsMat = new THREE.MeshLambertMaterial({ color: 0x223652 });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff2222 });
    const mouthMat = new THREE.MeshBasicMaterial({ color: 0x152e12 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.2, 0.4), shirtMat);
    body.position.y = 1.2;
    this.group.add(body);

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
    this.health = 5;
    this.attackCooldown = 0;
  }

  hit() {
    this.health--;
    sounds.playHitZombie();
    spawnBlockDebris(this.group.position.clone().add(new THREE.Vector3(0, 1.5, 0)), 0x48793b);
    if (this.health <= 0) {
      scene.remove(this.group);
      const count = 1 + Math.floor(Math.random() * 2);
      spawnDroppedItem(this.group.position, 'BONE_ITEM', count);
      return true;
    }
    return false;
  }

  update(delta, playerPos, hurtPlayerCb) {
    if (currentMode === GAME_MODES.SPECTATOR) return;
    this.attackCooldown -= delta;

    const dx = playerPos.x - this.group.position.x;
    const dz = playerPos.z - this.group.position.z;
    const distSq = dx * dx + dz * dz;

    if (distSq > 3600) {
      this.group.visible = false;
      return;
    }
    this.group.visible = true;

    const heightDiff = playerPos.y - 1.6 - this.group.position.y;

    if (distSq > 0.64 && distSq < 625) {
      const invDist = 1.0 / Math.sqrt(distSq);
      const dirX = dx * invDist;
      const dirZ = dz * invDist;

      const nextX = this.group.position.x + dirX * delta * 1.5;
      const nextZ = this.group.position.z + dirZ * delta * 1.5;
      const targetY = getGroundHeight(nextX, nextZ);

      if (targetY - this.group.position.y <= 1.1) {
        this.group.position.x = nextX;
        this.group.position.z = nextZ;
        this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, targetY, 0.25);
      }
      this.group.rotation.y = Math.atan2(dirX, dirZ);

      const t = performance.now() / 200;
      this.legL.rotation.x = Math.sin(t) * 0.5;
      this.legR.rotation.x = -Math.sin(t) * 0.5;
    }

    if (distSq <= 1.69 && Math.abs(heightDiff) < 1.5 && this.attackCooldown <= 0) {
      this.attackCooldown = 1.5;
      hurtPlayerCb(1);
    }
  }
}

// 🦔 1.20.6 犰狳
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

    this.health = 5;
    this.isRolledUp = false;
    this.changeDirTimer = 0;
    this.targetDir = new THREE.Vector3();
  }

  hit() {
    this.health--;
    sounds.playHitZombie();
    spawnBlockDebris(this.group.position.clone().add(new THREE.Vector3(0, 0.4, 0)), 0x9c6644);
    if (this.health <= 0) {
      scene.remove(this.group);
      spawnDroppedItem(this.group.position, 'WOLF_ARMOR', 1);
      return true;
    }
    return false;
  }

  update(delta, time, playerPos) {
    const dx = this.group.position.x - playerPos.x;
    const dz = this.group.position.z - playerPos.z;
    const distSq = dx * dx + dz * dz;

    if (distSq > 3600) {
      this.group.visible = false;
      return;
    }
    this.group.visible = true;

    if (distSq < 12.25 && !this.isRolledUp) {
      this.isRolledUp = true;
      this.head.scale.set(0.1, 0.1, 0.1);
      this.body.scale.set(1.1, 1.1, 1.1);
    } else if (distSq >= 20.25 && this.isRolledUp) {
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

    const nextX = this.group.position.x + this.targetDir.x * delta * 0.6;
    const nextZ = this.group.position.z + this.targetDir.z * delta * 0.6;
    const targetY = getGroundHeight(nextX, nextZ);
    if (targetY - this.group.position.y <= 1.1) {
      this.group.position.x = nextX;
      this.group.position.z = nextZ;
      this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, targetY, 0.25);
    } else {
      this.changeDirTimer = 0;
    }

    this.legs.forEach((leg, idx) => {
      leg.rotation.x = Math.sin(time * 5 + idx) * 0.3;
    });
  }
}

// 🐺 1.20.6 可馴服/反擊野生狼
class VoxelWolf {
  constructor(x, z) {
    this.group = new THREE.Group();
    this.skinMat = new THREE.MeshLambertMaterial({ color: 0xd3d3d3 });
    this.armorMat = new THREE.MeshLambertMaterial({ color: 0x9c6644 });
    this.collarMat = new THREE.MeshBasicMaterial({ color: 0xe63946 });

    this.eyeNormalMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    this.eyeAngryMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });

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

    this.eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.04), this.eyeNormalMat);
    this.eyeL.position.set(-0.14, 0.08, 0.26);

    this.eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.04), this.eyeNormalMat);
    this.eyeR.position.set(0.14, 0.08, 0.26);

    const nose = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.05), new THREE.MeshBasicMaterial({ color: 0x1a1a1a }));
    nose.position.set(0, 0.02, 0.16);

    snout.add(nose);
    this.head.add(earL);
    this.head.add(earR);
    this.head.add(snout);
    this.head.add(this.eyeL);
    this.head.add(this.eyeR);
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

    this.health = 5;
    this.isTamed = false;
    this.isAngry = false;
    this.attackCooldown = 0;
    this.attackTarget = null;
    this.targetDir = new THREE.Vector3();
    this.changeDirTimer = 0;
  }

  setAttackTarget(mob) {
    if (this.isTamed && mob && mob !== this) {
      this.attackTarget = mob;
    }
  }

  hit() {
    this.health--;
    sounds.playHitZombie();
    spawnBlockDebris(this.group.position.clone().add(new THREE.Vector3(0, 0.6, 0)), 0xd3d3d3);

    if (!this.isTamed) {
      this.isAngry = true;
      this.eyeL.material = this.eyeAngryMat;
      this.eyeR.material = this.eyeAngryMat;
    }

    if (this.health <= 0) {
      scene.remove(this.group);
      spawnDroppedItem(this.group.position, 'BONE_ITEM', 1);
      return true;
    }
    return false;
  }

  tame() {
    this.isTamed = true;
    this.isAngry = false;
    this.attackTarget = null;
    this.eyeL.material = this.eyeNormalMat;
    this.eyeR.material = this.eyeNormalMat;
    this.collar.visible = true;
    this.body.material = this.armorMat;
    sounds.playWolfBark();
    spawnHeartParticles(this.group.position.clone());
  }

  update(delta, playerPos, zombies, hurtPlayerCb) {
    this.attackCooldown -= delta;

    const dxPlayer = playerPos.x - this.group.position.x;
    const dzPlayer = playerPos.z - this.group.position.z;
    const distSqPlayer = dxPlayer * dxPlayer + dzPlayer * dzPlayer;

    if (!this.isTamed && !this.isAngry && distSqPlayer > 3600) {
      this.group.visible = false;
      return;
    }
    this.group.visible = true;

    const groundY = getGroundHeight(this.group.position.x, this.group.position.z);

    if (this.isTamed) {
      if (this.attackTarget && this.attackTarget.health > 0 && this.attackTarget.group.parent === scene) {
        const targetPos = this.attackTarget.group.position;
        const dx = targetPos.x - this.group.position.x;
        const dz = targetPos.z - this.group.position.z;
        const distSq = dx * dx + dz * dz;

        if (distSq > 1.44) {
          const invDist = 1.0 / Math.sqrt(distSq);
          const dirX = dx * invDist;
          const dirZ = dz * invDist;

          this.group.position.x += dirX * delta * 5.5;
          this.group.position.z += dirZ * delta * 5.5;
          this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, groundY, 0.3);
          this.group.rotation.y = Math.atan2(dirX, dirZ);

          const t = performance.now() / 90;
          this.legs.forEach((leg, idx) => {
            leg.rotation.x = Math.sin(t + idx * Math.PI) * 0.6;
          });
        } else {
          this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, groundY, 0.3);
          if (this.attackCooldown <= 0) {
            this.attackCooldown = 0.6;
            sounds.playHitZombie();
            const isDead = this.attackTarget.hit();
            if (isDead) {
              removeMobFromArray(this.attackTarget);
              this.attackTarget = null;
            }
          }
        }
      } else {
        this.attackTarget = null;

        let nearestZombie = null;
        let minDistSq = 324;
        for (let i = 0; i < zombies.length; i++) {
          const zombie = zombies[i];
          if (!zombie.group.visible) continue;
          const zdx = zombie.group.position.x - this.group.position.x;
          const zdz = zombie.group.position.z - this.group.position.z;
          const zDistSq = zdx * zdx + zdz * zdz;
          if (zDistSq < minDistSq) {
            minDistSq = zDistSq;
            nearestZombie = zombie;
          }
        }

        if (nearestZombie) {
          const zdx = nearestZombie.group.position.x - this.group.position.x;
          const zdz = nearestZombie.group.position.z - this.group.position.z;
          const zDistSq = zdx * zdx + zdz * zdz;

          if (zDistSq > 1.0) {
            const invDist = 1.0 / Math.sqrt(zDistSq);
            const dirX = zdx * invDist;
            const dirZ = zdz * invDist;

            this.group.position.x += dirX * delta * 4.5;
            this.group.position.z += dirZ * delta * 4.5;
            this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, groundY, 0.3);
            this.group.rotation.y = Math.atan2(dirX, dirZ);

            const t = performance.now() / 110;
            this.legs.forEach((leg, idx) => {
              leg.rotation.x = Math.sin(t + idx * Math.PI) * 0.5;
            });
          } else if (this.attackCooldown <= 0) {
            this.attackCooldown = 0.8;
            sounds.playHitZombie();
            const isDead = nearestZombie.hit();
            if (isDead) {
              const idx = zombies.indexOf(nearestZombie);
              if (idx !== -1) zombies.splice(idx, 1);
            }
          }
        } else {
          const distSq = distSqPlayer;
          if (distSq > 625.0) {
            const tpGround = getGroundHeight(playerPos.x + 1.5, playerPos.z + 1.5);
            this.group.position.set(playerPos.x + 1.5, tpGround, playerPos.z + 1.5);
          } else if (distSq > 4.84) {
            const invDist = 1.0 / Math.sqrt(distSq);
            const dirX = dxPlayer * invDist;
            const dirZ = dzPlayer * invDist;
            const speed = distSq > 49.0 ? 5.5 : 3.2;

            this.group.position.x += dirX * delta * speed;
            this.group.position.z += dirZ * delta * speed;
            this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, groundY, 0.3);
            this.group.rotation.y = Math.atan2(dirX, dirZ);

            const t = performance.now() / 130;
            this.legs.forEach((leg, idx) => {
              leg.rotation.x = Math.sin(t + idx * Math.PI) * 0.4;
            });
          } else {
            this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, groundY, 0.3);
            this.legs.forEach(leg => leg.rotation.x = 0);
          }
        }
      }
    } else if (this.isAngry) {
      const distSq = distSqPlayer;

      if (distSq > 0.64 && distSq < 900) {
        const invDist = 1.0 / Math.sqrt(distSq);
        const dirX = dxPlayer * invDist;
        const dirZ = dzPlayer * invDist;

        this.group.position.x += dirX * delta * 3.2;
        this.group.position.z += dirZ * delta * 3.2;
        this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, groundY, 0.3);
        this.group.rotation.y = Math.atan2(dirX, dirZ);

        const t = performance.now() / 110;
        this.legs.forEach((leg, idx) => {
          leg.rotation.x = Math.sin(t + idx * Math.PI) * 0.5;
        });
      }

      if (distSq <= 1.69 && this.attackCooldown <= 0) {
        this.attackCooldown = 1.0;
        sounds.playHitZombie();
        hurtPlayerCb(2);
      }
    } else {
      this.changeDirTimer -= delta;
      if (this.changeDirTimer <= 0) {
        const angle = Math.random() * Math.PI * 2;
        this.targetDir.set(Math.cos(angle), 0, Math.sin(angle));
        this.group.rotation.y = Math.atan2(this.targetDir.x, this.targetDir.z);
        this.changeDirTimer = 3 + Math.random() * 4;
      }

      const nextX = this.group.position.x + this.targetDir.x * delta * 0.8;
      const nextZ = this.group.position.z + this.targetDir.z * delta * 0.8;
      const targetY = getGroundHeight(nextX, nextZ);
      if (targetY - this.group.position.y <= 1.1) {
        this.group.position.x = nextX;
        this.group.position.z = nextZ;
        this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, targetY, 0.25);
      } else {
        this.changeDirTimer = 0;
      }
      const t = performance.now() / 160;
      this.legs.forEach((leg, idx) => {
        leg.rotation.x = Math.sin(t + idx) * 0.3;
      });
    }
  }
}

// 輔助函式：從列表中移除死亡生物
function removeMobFromArray(mobObj) {
  if (!mobObj) return;
  let idx = pigList.indexOf(mobObj);
  if (idx !== -1) { pigList.splice(idx, 1); return; }
  idx = sheepList.indexOf(mobObj);
  if (idx !== -1) { sheepList.splice(idx, 1); return; }
  idx = cowList.indexOf(mobObj);
  if (idx !== -1) { cowList.splice(idx, 1); return; }
  idx = chickenList.indexOf(mobObj);
  if (idx !== -1) { chickenList.splice(idx, 1); return; }
  idx = zombieList.indexOf(mobObj);
  if (idx !== -1) { zombieList.splice(idx, 1); return; }
  idx = horseList.indexOf(mobObj);
  if (idx !== -1) { horseList.splice(idx, 1); return; }
  idx = armadilloList.indexOf(mobObj);
  if (idx !== -1) { armadilloList.splice(idx, 1); return; }
  idx = wolfList.indexOf(mobObj);
  if (idx !== -1) { wolfList.splice(idx, 1); return; }
}

// 輔助函式：通知所有馴服狼圍剿攻擊目標
function notifyTamedWolvesAttack(targetMob) {
  if (!targetMob) return;
  wolfList.forEach(w => {
    if (w.isTamed && w !== targetMob) {
      w.setAttackTarget(targetMob);
    }
  });
}
// 1140x1140 1.20.6 擴大 10 倍巨幅世界地圖
function generateInitialWorld() {
  const WORLD_SIZE = 1140;
  const HALF_SIZE = WORLD_SIZE / 2;

  for (let x = -HALF_SIZE; x < HALF_SIZE; x++) {
    for (let z = -HALF_SIZE; z < HALF_SIZE; z++) {
      const height = Math.floor(Math.sin(x * 0.04) * Math.cos(z * 0.04) * 3.5) + 3;
      for (let y = 0; y < height; y++) {
        if (y === 0) addBlock(x, y, z, 'STONE', false);
        else addBlock(x, y, z, 'DIRT', false);
      }

      if (x > 0 && z > 0) {
        addBlock(x, height, z, 'GRASS', false);
        if (Math.random() < 0.015 && Math.abs(x) > 3) {
          generateCherryTree(x, height + 1, z);
        }
      } else if (x < -20 && z < -20) {
        addBlock(x, height, z, Math.random() < 0.3 ? 'SUSPICIOUS_SAND' : 'DIRT', false);
      } else {
        addBlock(x, height, z, 'GRASS', false);
        if (Math.random() < 0.010 && Math.abs(x) > 3) {
          generateTree(x, height + 1, z);
        }
      }
    }
  }
  blockRenderManager.markDirty();
}

function generateTree(trX, trY, trZ) {
  const treeHeight = 4 + Math.floor(Math.random() * 2);
  for (let i = 0; i < treeHeight; i++) {
    addBlock(trX, trY + i, trZ, 'WOOD', false);
  }
  const leafBaseY = trY + treeHeight - 1;
  for (let lx = -2; lx <= 2; lx++) {
    for (let lz = -2; lz <= 2; lz++) {
      for (let ly = 0; ly <= 2; ly++) {
        if (Math.abs(lx) === 2 && Math.abs(lz) === 2 && ly === 2) continue;
        if (lx === 0 && lz === 0 && ly < 2) continue;
        addBlock(trX + lx, leafBaseY + ly, trZ + lz, 'LEAVES', false);
      }
    }
  }
}

function generateCherryTree(trX, trY, trZ) {
  const treeHeight = 5 + Math.floor(Math.random() * 2);
  for (let i = 0; i < treeHeight; i++) {
    addBlock(trX, trY + i, trZ, 'CHERRY_LOG', false);
  }
  const leafBaseY = trY + treeHeight - 1;
  for (let lx = -2; lx <= 2; lx++) {
    for (let lz = -2; lz <= 2; lz++) {
      for (let ly = 0; ly <= 2; ly++) {
        if (Math.abs(lx) === 2 && Math.abs(lz) === 2 && ly === 2) continue;
        if (lx === 0 && lz === 0 && ly < 2) continue;
        addBlock(trX + lx, leafBaseY + ly, trZ + lz, 'CHERRY_LEAVES', false);
      }
    }
  }
}

generateInitialWorld();

const sheepList = [];
const pigList = [];
const cowList = [];
const chickenList = [];
const horseList = [];
const zombieList = [];
const armadilloList = [];
const wolfList = [];
let mountedHorse = null;
let horseVelocityY = 0;

// 生物生成：羊 350隻、豬 300隻、牛 250隻、雞 250隻、馬 150隻、狼 100隻、殭屍 60隻、犰狳 40隻 (共 1500隻 精密動態載入，穩動 60 FPS)
function spawnInitialMobs() {
  const spawnWidth = 1100;
  for (let i = 0; i < 350; i++) {
    const rx = (Math.random() - 0.5) * spawnWidth;
    const rz = (Math.random() - 0.5) * spawnWidth;
    sheepList.push(new VoxelSheep(rx, rz));
  }
  for (let i = 0; i < 300; i++) {
    const rx = (Math.random() - 0.5) * spawnWidth;
    const rz = (Math.random() - 0.5) * spawnWidth;
    pigList.push(new VoxelPig(rx, rz));
  }
  for (let i = 0; i < 250; i++) {
    const rx = (Math.random() - 0.5) * spawnWidth;
    const rz = (Math.random() - 0.5) * spawnWidth;
    cowList.push(new VoxelCow(rx, rz));
  }
  for (let i = 0; i < 250; i++) {
    const rx = (Math.random() - 0.5) * spawnWidth;
    const rz = (Math.random() - 0.5) * spawnWidth;
    chickenList.push(new VoxelChicken(rx, rz));
  }
  for (let i = 0; i < 150; i++) {
    const rx = (Math.random() - 0.5) * spawnWidth;
    const rz = (Math.random() - 0.5) * spawnWidth;
    horseList.push(new VoxelHorse(rx, rz));
  }
  for (let i = 0; i < 100; i++) {
    const rx = (Math.random() - 0.5) * spawnWidth;
    const rz = (Math.random() - 0.5) * spawnWidth;
    wolfList.push(new VoxelWolf(rx, rz));
  }
  for (let i = 0; i < 60; i++) {
    const rx = (Math.random() - 0.5) * spawnWidth;
    const rz = (Math.random() - 0.5) * spawnWidth;
    if (Math.abs(rx) > 15 || Math.abs(rz) > 15) {
      zombieList.push(new VoxelZombie(rx, rz));
    }
  }
  for (let i = 0; i < 40; i++) {
    const rx = (Math.random() - 0.5) * spawnWidth;
    const rz = (Math.random() - 0.5) * spawnWidth;
    armadilloList.push(new VoxelArmadillo(rx, rz));
  }
}
spawnInitialMobs();

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

  const targets = blockRenderManager.getRenderableMeshes();
  const intersects = raycaster.intersectObjects(targets, false);

  if (intersects.length > 0 && intersects[0].distance < 8) {
    const hit = intersects[0];
    const hitPoint = hit.point.clone().sub(hit.face.normal.clone().multiplyScalar(0.5));
    const vx = Math.floor(hitPoint.x);
    const vy = Math.floor(hitPoint.y);
    const vz = Math.floor(hitPoint.z);

    selectionBox.position.set(vx + 0.5, vy + 0.5, vz + 0.5);
    selectionBox.visible = true;

    return {
      object: hit.object,
      face: hit.face,
      distance: hit.distance,
      vx, vy, vz,
      typeKey: hit.object.userData.typeKey
    };
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

// 玩家物理與血量/飽食度系統
let playerHealth = 10;
let playerHunger = 10;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let moveUp = false, moveDown = false;
let canJump = false;
let velocity = new THREE.Vector3();
let prevTime = performance.now();
let dayTime = 0.25;
let isFastTime = false;

let sprintRunDistance = 0;
let healTimer = 0;
let highestYInAir = 0;
let wasInAir = false;

function hurtPlayer(amount = 1) {
  if (currentMode === GAME_MODES.CREATIVE || currentMode === GAME_MODES.SPECTATOR) return;
  playerHealth = Math.max(0, playerHealth - amount);
  sounds.playPlayerHurt();
  updateHealthBar();
  if (playerHealth <= 0) {
    alert('💀 你已被擊敗！世界已重置重生。');
    if (mountedHorse) {
      mountedHorse.isRidden = false;
      mountedHorse = null;
    }
    playerHealth = 10;
    playerHunger = 10;
    const respawnY = getGroundHeight(0, 0) + 1.6;
    camera.position.set(0, respawnY, 0);
    updateHealthBar();
    updateHungerBar();
  }
}

function updateHealthBar() {
  const heartContainer = document.getElementById('heart-container');
  if (!heartContainer) return;
  heartContainer.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const span = document.createElement('span');
    span.className = 'heart';
    span.innerText = i < playerHealth ? '❤️' : '🖤';
    heartContainer.appendChild(span);
  }
}

function updateHungerBar() {
  const hungerContainer = document.getElementById('hunger-container');
  if (!hungerContainer) return;
  hungerContainer.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const span = document.createElement('span');
    span.className = 'hunger';
    span.innerText = i < playerHunger ? '🍗' : '🦴';
    hungerContainer.appendChild(span);
  }
}

function eatFood(foodBlock) {
  if (playerHunger >= 10 && playerHealth >= 10) return;
  sounds.playEatSound();
  playerHunger = Math.min(10, playerHunger + (foodBlock.restoresHunger || 3));
  if (playerHealth < 10) {
    playerHealth = Math.min(10, playerHealth + 1);
  }
  updateHungerBar();
  updateHealthBar();

  HOTBAR_BLOCKS[selectedBlockIndex] = null;
  initHotbarUI();
}

// 背包 UI
const invModal = document.getElementById('inventory-modal');
const closeInvBtn = document.getElementById('close-inv-btn');
const invGrid = document.getElementById('inventory-grid');

function initInventoryUI() {
  if (!invGrid) return;
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
  if (!invModal) return;
  if (invModal.classList.contains('hidden')) {
    controls.unlock();
    invModal.classList.remove('hidden');
    initInventoryUI();
  } else {
    invModal.classList.add('hidden');
    controls.lock();
  }
}

if (closeInvBtn) {
  closeInvBtn.addEventListener('click', () => {
    if (invModal) invModal.classList.add('hidden');
    controls.lock();
  });
}

// 按鍵監聽
document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyE') {
    toggleInventory();
    return;
  }

  if (event.code === 'Backspace') {
    event.preventDefault();
    if (mountedHorse) {
      mountedHorse.isRidden = false;
      mountedHorse = null;
      alert('🏇 已下馬 (Dismounted)');
      return;
    }
    currentMode = (currentMode === GAME_MODES.SPECTATOR) ? GAME_MODES.SURVIVAL : GAME_MODES.SPECTATOR;
    updateModeDisplay();
    return;
  }

  if (event.key === 'Shift' || event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    if (mountedHorse) {
      mountedHorse.isRidden = false;
      mountedHorse = null;
      alert('🏇 已下馬 (Dismounted)');
      return;
    }
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
      if (canJump && currentMode !== GAME_MODES.SPECTATOR && !mountedHorse) {
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
    case 'Digit7': selectHotbarSlot(7); break;
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

// 滑鼠點擊與騎馬機制
document.addEventListener('mousedown', (e) => {
  if (!controls.isLocked) return;
  if (currentMode === GAME_MODES.SPECTATOR) return;

  swingArm();

  // 若已騎馬，按右鍵 dismount 下馬
  if (mountedHorse && e.button === 2) {
    mountedHorse.isRidden = false;
    mountedHorse = null;
    sounds.playJump();
    alert('🏇 已下馬 (Dismounted)');
    return;
  }

  const selectedBlock = HOTBAR_BLOCKS[selectedBlockIndex];

  if (selectedBlock && selectedBlock.isFood) {
    eatFood(selectedBlock);
    return;
  }

  // 生物點擊打擊、餵食與上馬騎乘測試
  raycaster.setFromCamera(centerVector, camera);
  const mobIntersects = raycaster.intersectObjects(scene.children, true);
  if (mobIntersects.length > 0 && mobIntersects[0].distance < 8) {
    let parentObj = mobIntersects[0].object;
    while (parentObj && parentObj.parent && parentObj.parent !== scene) {
      parentObj = parentObj.parent;
    }

    // 點擊馬匹：右鍵上馬/下馬，左鍵攻擊打馬
    const targetHorseIdx = horseList.findIndex(h => h.group === parentObj);
    if (targetHorseIdx !== -1) {
      const targetHorse = horseList[targetHorseIdx];
      if (e.button === 2) {
        if (mountedHorse === targetHorse) {
          mountedHorse.isRidden = false;
          mountedHorse = null;
          sounds.playJump();
          alert('🏇 已下馬 (Dismounted)');
        } else {
          if (mountedHorse) mountedHorse.isRidden = false;
          mountedHorse = targetHorse;
          mountedHorse.isRidden = true;
          sounds.playJump();
          alert('🏇 成功騎上駿馬！使用 WASD 快速奔馳，按 Shift 或 Backspace 可下馬，再按右鍵也可下馬。');
        }
        return;
      } else if (e.button === 0) {
        const isDead = targetHorse.hit();
        if (isDead) {
          if (mountedHorse === targetHorse) mountedHorse = null;
          horseList.splice(targetHorseIdx, 1);
        } else {
          notifyTamedWolvesAttack(targetHorse);
        }
        return;
      }
    }

    // 點擊狼：骨頭或右鍵餵食馴服，左鍵打狼
    const targetWolfIdx = wolfList.findIndex(w => w.group === parentObj);
    if (targetWolfIdx !== -1) {
      const targetWolf = wolfList[targetWolfIdx];
      if ((selectedBlock === BLOCKS.BONE_ITEM || e.button === 2) && !targetWolf.isTamed) {
        targetWolf.tame();
        alert('🐺 成功拿骨頭餵食並馴服狼！狼會冒出愛心 ❤️ 貼地跟隨並為你圍剿打死目標！');
        return;
      }
      if (e.button === 0) {
        const isDead = targetWolf.hit();
        if (isDead) {
          wolfList.splice(targetWolfIdx, 1);
        } else {
          notifyTamedWolvesAttack(targetWolf);
        }
        return;
      }
    }

    const targetZombieIdx = zombieList.findIndex(z => z.group === parentObj);
    if (targetZombieIdx !== -1 && e.button === 0) {
      const targetZombie = zombieList[targetZombieIdx];
      const isDead = targetZombie.hit();
      if (isDead) {
        zombieList.splice(targetZombieIdx, 1);
      } else {
        notifyTamedWolvesAttack(targetZombie);
      }
      return;
    }

    const targetSheepIdx = sheepList.findIndex(s => s.group === parentObj);
    if (targetSheepIdx !== -1 && e.button === 0) {
      const targetSheep = sheepList[targetSheepIdx];
      const isDead = targetSheep.hit();
      if (isDead) {
        sheepList.splice(targetSheepIdx, 1);
      } else {
        notifyTamedWolvesAttack(targetSheep);
      }
      return;
    }

    const targetPigIdx = pigList.findIndex(p => p.group === parentObj);
    if (targetPigIdx !== -1 && e.button === 0) {
      const targetPig = pigList[targetPigIdx];
      const isDead = targetPig.hit();
      if (isDead) {
        pigList.splice(targetPigIdx, 1);
      } else {
        notifyTamedWolvesAttack(targetPig);
      }
      return;
    }

    const targetCowIdx = cowList.findIndex(c => c.group === parentObj);
    if (targetCowIdx !== -1 && e.button === 0) {
      const targetCow = cowList[targetCowIdx];
      const isDead = targetCow.hit();
      if (isDead) {
        cowList.splice(targetCowIdx, 1);
      } else {
        notifyTamedWolvesAttack(targetCow);
      }
      return;
    }

    const targetChickenIdx = chickenList.findIndex(ch => ch.group === parentObj);
    if (targetChickenIdx !== -1 && e.button === 0) {
      const targetChicken = chickenList[targetChickenIdx];
      const isDead = targetChicken.hit();
      if (isDead) {
        chickenList.splice(targetChickenIdx, 1);
      } else {
        notifyTamedWolvesAttack(targetChicken);
      }
      return;
    }

    const targetArmadilloIdx = armadilloList.findIndex(a => a.group === parentObj);
    if (targetArmadilloIdx !== -1 && e.button === 0) {
      const targetArmadillo = armadilloList[targetArmadilloIdx];
      const isDead = targetArmadillo.hit();
      if (isDead) {
        armadilloList.splice(targetArmadilloIdx, 1);
      } else {
        notifyTamedWolvesAttack(targetArmadillo);
      }
      return;
    }
  }

  // 方塊點擊與放置測試
  const hit = updateRaycaster();
  if (!hit) return;

  const { vx, vy, vz, typeKey } = hit;

  if (e.button === 0) {
    if (typeKey === 'TNT') triggerTNT(vx, vy, vz);
    else hitBlock(vx, vy, vz);
  } else if (e.button === 2) {
    if (selectedBlock === BLOCKS.BRUSH_TOOL && typeKey === 'SUSPICIOUS_SAND') {
      sounds.playBrushSound();
      spawnBlockDebris(new THREE.Vector3(vx + 0.5, vy + 0.5, vz + 0.5), 0xe0c068);
      const key = getVoxelKey(vx, vy, vz);
      const brushCount = (blockHitsMap.get(key) || 0) + 1;
      blockHitsMap.set(key, brushCount);
      if (brushCount >= 3) {
        removeBlock(vx, vy, vz, false);
        addBlock(vx, vy, vz, 'DIRT');
        spawnDroppedItem(new THREE.Vector3(vx + 0.5, vy + 0.5, vz + 0.5), 'DIAMOND', 1);
        alert('🏺 1.20.6 考古挖掘成功！發現古代陶罐與鑽石寶物！');
      }
      return;
    }

    sounds.playPlace();
    const normal = hit.face.normal;
    const targetX = vx + Math.round(normal.x);
    const targetY = vy + Math.round(normal.y);
    const targetZ = vz + Math.round(normal.z);

    const keys = Object.keys(BLOCKS);
    const blockKey = keys.find(k => BLOCKS[k] === selectedBlock);

    if (blockKey) {
      addBlock(targetX, targetY, targetZ, blockKey);
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
  if (!hotbarEl) return;
  hotbarEl.innerHTML = '';
  HOTBAR_BLOCKS.forEach((block, index) => {
    const slot = document.createElement('div');
    slot.className = `hotbar-slot ${index === selectedBlockIndex ? 'active' : ''}`;

    const keyLabel = document.createElement('span');
    keyLabel.className = 'hotbar-key';
    keyLabel.innerText = (index + 1) % 10;
    slot.appendChild(keyLabel);

    if (block) {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = `#${block.color.toString(16).padStart(6, '0')}`;
      ctx.fillRect(4, 4, 24, 24);
      ctx.strokeStyle = '#ffffff';
      ctx.strokeRect(4, 4, 24, 24);
      slot.appendChild(canvas);
    }

    slot.addEventListener('click', () => selectHotbarSlot(index));
    hotbarEl.appendChild(slot);
  });
  updateSelectedBlockText();
}

function selectHotbarSlot(index) {
  selectedBlockIndex = index;
  if (hotbarEl) {
    const slots = hotbarEl.querySelectorAll('.hotbar-slot');
    slots.forEach((s, idx) => {
      if (idx === index) s.classList.add('active');
      else s.classList.remove('active');
    });
  }
  updateSelectedBlockText();
}

function updateSelectedBlockText() {
  const b = HOTBAR_BLOCKS[selectedBlockIndex];
  const nameStr = b ? b.name : '(空 Empty)';
  if (blockNameDisplay) blockNameDisplay.innerText = nameStr;
  if (selectedBlockInfo) selectedBlockInfo.innerText = nameStr;
}

initHotbarUI();
updateHealthBar();
updateHungerBar();

const overlay = document.getElementById('overlay');
const startBtn = document.getElementById('start-btn');
const posDisplay = document.getElementById('pos-display');

const saveBtn = document.getElementById('save-world-btn');
if (saveBtn) {
  saveBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    saveWorldToStorage();
  });
}

const loadBtn = document.getElementById('load-world-btn');
if (loadBtn) {
  loadBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    loadWorldFromStorage();
  });
}

function enterGame() {
  sounds.init();
  if (overlay) overlay.classList.add('hidden');
  try {
    controls.lock();
  } catch (err) {}
}

if (startBtn) {
  startBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    enterGame();
  });
}

if (overlay) {
  overlay.addEventListener('click', (e) => {
    if (e.target !== saveBtn && e.target !== loadBtn) {
      enterGame();
    }
  });
}

container.addEventListener('click', () => {
  if (invModal && invModal.classList.contains('hidden')) {
    if (overlay) overlay.classList.add('hidden');
    try {
      controls.lock();
    } catch (err) {}
  }
});

controls.addEventListener('lock', () => {
  if (overlay) overlay.classList.add('hidden');
});
controls.addEventListener('unlock', () => {
  if (invModal && invModal.classList.contains('hidden')) {
    if (overlay) overlay.classList.remove('hidden');
  }
});

// 實體 AABB 碰撞檢查
function checkPlayerCollision(newPos) {
  if (currentMode === GAME_MODES.SPECTATOR) return false;
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
  const minY = Math.floor(feetY + 0.2);
  const maxY = Math.floor(headY);

  for (let bx = minX; bx <= maxX; bx++) {
    for (let bz = minZ; bz <= maxZ; bz++) {
      for (let by = minY; by <= maxY; by++) {
        if (hasBlock(bx, by, bz)) {
          return true;
        }
      }
    }
  }
  return false;
}

// 主遊戲循環
function animate() {
  requestAnimationFrame(animate);

  blockRenderManager.update();

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
  if (timeDisplay) {
    timeDisplay.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  // 生物、掉落物與愛心粒子更新
  const nowTime = performance.now() / 1000;
  sheepList.forEach(sheep => sheep.update(delta, nowTime, camera.position));
  pigList.forEach(pig => pig.update(delta, nowTime, camera.position));
  cowList.forEach(cow => cow.update(delta, nowTime, camera.position));
  chickenList.forEach(chicken => chicken.update(delta, nowTime, camera.position));
  horseList.forEach(horse => horse.update(delta, nowTime, camera.position));
  zombieList.forEach(zombie => zombie.update(delta, camera.position, hurtPlayer));
  armadilloList.forEach(armadillo => armadillo.update(delta, nowTime, camera.position));
  wolfList.forEach(wolf => wolf.update(delta, camera.position, zombieList, hurtPlayer));
  updateParticles(delta);
  updateHeartParticles(delta);
  updateDroppedItems(delta, camera.position);

  updateRaycaster();

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

  if (mountedHorse) {
    // 🐎 騎馬快速奔馳控制機制
    const rideSpeed = 15.0 * delta;
    const oldHorsePos = mountedHorse.group.position.clone();

    if (moveVec.lengthSq() > 0) {
      mountedHorse.group.position.x += moveVec.x * rideSpeed;
      if (checkPlayerCollision(mountedHorse.group.position)) {
        mountedHorse.group.position.x = oldHorsePos.x;
      }

      mountedHorse.group.position.z += moveVec.z * rideSpeed;
      if (checkPlayerCollision(mountedHorse.group.position)) {
        mountedHorse.group.position.z = oldHorsePos.z;
      }

      mountedHorse.group.rotation.y = Math.atan2(moveVec.x, moveVec.z);

      const t = performance.now() / 80;
      mountedHorse.legs.forEach((leg, idx) => {
        leg.rotation.x = Math.sin(t + idx) * 0.6;
      });
    }

    horseVelocityY -= 25.0 * delta;
    mountedHorse.group.position.y += horseVelocityY * delta;

    const targetGroundY = getGroundHeightAtFeet(mountedHorse.group.position.x, mountedHorse.group.position.y, mountedHorse.group.position.z);
    if (mountedHorse.group.position.y <= targetGroundY) {
      horseVelocityY = 0;
      mountedHorse.group.position.y = targetGroundY;
      if (moveUp) {
        horseVelocityY = 8.5; // 駿馬大跳躍！
        sounds.playJump();
      }
    }

    camera.position.copy(mountedHorse.group.position).add(new THREE.Vector3(0, 2.2, 0));

  } else if (currentMode === GAME_MODES.SPECTATOR) {
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
    velocity.y -= 25.0 * delta;

    const moveSpeed = (isFastTime ? 10.0 : 5.5) * delta;
    const oldPos = camera.position.clone();

    if (moveVec.lengthSq() > 0) {
      camera.position.x += moveVec.x * moveSpeed;
      if (checkPlayerCollision(camera.position)) {
        camera.position.x = oldPos.x;
      }

      camera.position.z += moveVec.z * moveSpeed;
      if (checkPlayerCollision(camera.position)) {
        camera.position.z = oldPos.z;
      }

      sprintRunDistance += moveSpeed;
      if (sprintRunDistance >= 135) {
        sprintRunDistance = 0;
        if (playerHunger > 0) {
          playerHunger--;
          updateHungerBar();
        }
      }
    }

    if (playerHunger >= 9 && playerHealth < 10) {
      healTimer += delta;
      if (healTimer >= 3.5) {
        healTimer = 0;
        playerHealth = Math.min(10, playerHealth + 1);
        updateHealthBar();
      }
    } else {
      healTimer = 0;
    }

    camera.position.y += velocity.y * delta;
    const playerFeetY = camera.position.y - 1.6;
    const targetGroundY = getGroundHeightAtFeet(camera.position.x, playerFeetY, camera.position.z) + 1.6;

    if (camera.position.y > targetGroundY + 0.1) {
      if (!wasInAir) {
        wasInAir = true;
        highestYInAir = camera.position.y;
      } else {
        highestYInAir = Math.max(highestYInAir, camera.position.y);
      }
    } else {
      if (wasInAir) {
        const fallDistance = highestYInAir - camera.position.y;
        if (fallDistance >= 2.8) {
          const damageAmount = Math.floor((fallDistance - 2.3) * 1.0);
          if (damageAmount > 0) {
            hurtPlayer(damageAmount);
          }
        }
        wasInAir = false;
      }

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

  if (posDisplay) {
    posDisplay.innerText = `X: ${Math.floor(camera.position.x)}, Y: ${Math.floor(camera.position.y - 1.6)}, Z: ${Math.floor(camera.position.z)}`;
  }

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

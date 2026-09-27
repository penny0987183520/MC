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
}

const sounds = new SoundFx();

// --- 方塊種類定義 ---
const BLOCKS = {
  GRASS: { id: 1, name: '草地方塊 (Grass)', color: 0x557a2b, requiredHits: 3 },
  DIRT: { id: 2, name: '泥土 (Dirt)', color: 0x866043, requiredHits: 3 },
  STONE: { id: 3, name: '石頭 (Stone)', color: 0x808080, requiredHits: 5 },
  WOOD: { id: 4, name: '原木 (Wood)', color: 0x674d3c, requiredHits: 4 },
  LEAVES: { id: 5, name: '樹葉 (Leaves)', color: 0x3a5f0b, transparent: true, opacity: 0.9, requiredHits: 2 },
  BRICK: { id: 6, name: '磚塊 (Brick)', color: 0x9b4738, requiredHits: 4 },
  GLASS: { id: 7, name: '玻璃 (Glass)', color: 0xadd8e6, transparent: true, opacity: 0.5, requiredHits: 2 },
  DIAMOND: { id: 8, name: '鑽石塊 (Diamond)', color: 0x4eedd8, requiredHits: 5 },
  TNT: { id: 9, name: '💣 TNT 炸藥', color: 0xd93829, requiredHits: 1 },
  GLOWSTONE: { id: 10, name: '✨ 螢光石 (Glowstone)', color: 0xffe885, emissive: 0xffaa00, requiredHits: 3 }
};

let HOTBAR_BLOCKS = [
  BLOCKS.GRASS,
  BLOCKS.DIRT,
  BLOCKS.STONE,
  BLOCKS.WOOD,
  BLOCKS.LEAVES,
  BLOCKS.BRICK,
  BLOCKS.GLASS,
  BLOCKS.DIAMOND,
  BLOCKS.TNT,
  BLOCKS.GLOWSTONE
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
  } else if (type === 'WOOD') {
    if (face === 'top' || face === 'bottom') {
      ctx.fillStyle = '#9c734e';
      ctx.fillRect(0, 0, 32, 32);
      ctx.strokeStyle = '#5c3e23';
      ctx.strokeRect(4, 4, 24, 24);
      ctx.strokeRect(10, 10, 12, 12);
    } else {
      for (let x = 0; x < 32; x++) {
        for (let y = 0; y < 32; y++) {
          ctx.fillStyle = (x % 8 < 2) ? '#4a331c' : randomNoise(95, 68, 44, 20);
          ctx.fillRect(x, y, 1, 1);
        }
      }
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
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  return texture;
}

const blockMaterials = {};
function getBlockMaterials(blockTypeKey) {
  if (blockMaterials[blockTypeKey]) return blockMaterials[blockTypeKey];

  if (blockTypeKey === 'GRASS') {
    const topMat = new THREE.MeshLambertMaterial({ map: createPixelTexture('GRASS', 'top') });
    const sideMat = new THREE.MeshLambertMaterial({ map: createPixelTexture('GRASS', 'side') });
    const bottomMat = new THREE.MeshLambertMaterial({ map: createPixelTexture('DIRT') });
    blockMaterials[blockTypeKey] = [sideMat, sideMat, topMat, bottomMat, sideMat, sideMat];
  } else if (blockTypeKey === 'WOOD') {
    const topMat = new THREE.MeshLambertMaterial({ map: createPixelTexture('WOOD', 'top') });
    const sideMat = new THREE.MeshLambertMaterial({ map: createPixelTexture('WOOD', 'side') });
    blockMaterials[blockTypeKey] = [sideMat, sideMat, topMat, topMat, sideMat, sideMat];
  } else if (blockTypeKey === 'GLOWSTONE') {
    const mat = new THREE.MeshStandardMaterial({
      map: createPixelTexture('GLOWSTONE'),
      emissive: 0xffaa00,
      emissiveIntensity: 0.6
    });
    blockMaterials[blockTypeKey] = mat;
  } else {
    const config = BLOCKS[blockTypeKey];
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

// 挖掘打擊邏輯（需要 3~5 次）
function hitBlock(x, y, z) {
  const key = getVoxelKey(x, y, z);
  if (!voxelMap.has(key)) return;

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

// 取得精確地面高度
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

// 48x48 擴大世界地圖
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
      addBlock(x, height, z, 'GRASS');

      if (Math.random() < 0.015 && Math.abs(x) > 3 && Math.abs(z) > 3) {
        generateTree(x, height + 1, z);
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

generateInitialWorld();

const sheepList = [new VoxelSheep(4, 4), new VoxelSheep(-6, -6), new VoxelSheep(10, -8)];
const zombieList = [new VoxelZombie(-10, -10), new VoxelZombie(12, 12)];

camera.position.set(0, 7, 10);

// 準心高亮
const selectionGeo = new THREE.BoxGeometry(1.02, 1.02, 1.02);
const selectionMat = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, wireframeLinewidth: 2 });
const selectionBox = new THREE.Mesh(selectionGeo, selectionMat);
selectionBox.visible = false;
scene.add(selectionBox);

const raycaster = new THREE.Raycaster();
const centerVector = new THREE.Vector2(0, 0);

function updateRaycaster() {
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

// 玩家物理（最大跳躍 1 格高、實體防穿牆）
let playerHealth = 10;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let canJump = false;
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
let prevTime = performance.now();
let dayTime = 0.25;
let isFastTime = false;

function hurtPlayer() {
  playerHealth--;
  sounds.playPlayerHurt();
  updateHealthBar();
  if (playerHealth <= 0) {
    alert('💀 你已被殭屍擊敗！世界已重置重生。');
    playerHealth = 10;
    camera.position.set(0, 7, 10);
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

  switch (event.code) {
    case 'KeyW': moveForward = true; break;
    case 'KeyS': moveBackward = true; break;
    case 'KeyA': moveLeft = true; break;
    case 'KeyD': moveRight = true; break;
    case 'Space':
      if (canJump) {
        velocity.y = 8.5; // 調校跳躍力：精確限制最多只能跳 1 格高！
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
      const typeKey = hit.object.userData.typeKey;
      if (typeKey === 'TNT') triggerTNT(vx, vy, vz);
      else hitBlock(vx, vy, vz);
    } else if (e.button === 2) {
      sounds.playPlace();
      const normal = hit.face.normal;
      const targetPos = position.clone().add(normal);
      const selectedBlock = HOTBAR_BLOCKS[selectedBlockIndex];
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

document.getElementById('save-world-btn').addEventListener('click', saveWorldToStorage);
document.getElementById('load-world-btn').addEventListener('click', loadWorldFromStorage);

const overlay = document.getElementById('overlay');
const startBtn = document.getElementById('start-btn');
const posDisplay = document.getElementById('pos-display');

startBtn.addEventListener('click', () => {
  sounds.init();
  controls.lock();
});

controls.addEventListener('lock', () => overlay.classList.add('hidden'));
controls.addEventListener('unlock', () => {
  if (invModal.classList.contains('hidden')) overlay.classList.remove('hidden');
});

// 實體碰撞檢查 (Player AABB Wall & Floor Collision)
function checkPlayerCollision(newPos) {
  const px = newPos.x;
  const py = newPos.y;
  const pz = newPos.z;
  const radius = 0.3;

  // 檢查玩家腳底與身高的周圍方塊，阻擋穿牆！
  for (let yOffset of [-1.5, -0.5, 0.2]) {
    const checkY = Math.floor(py + yOffset);
    for (let xOffset of [-radius, radius]) {
      for (let zOffset of [-radius, radius]) {
        const checkX = Math.floor(px + xOffset);
        const checkZ = Math.floor(pz + zOffset);
        if (hasBlock(checkX, checkY, checkZ)) {
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
  updateParticles(delta);
  updateDroppedItems(delta, camera.position);

  if (controls.isLocked) {
    updateRaycaster();

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;
    velocity.y -= 25.0 * delta; // 重力

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize();

    if (moveForward || moveBackward) velocity.z -= direction.z * 55.0 * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * 55.0 * delta;

    // 分步移動與實體防穿牆 (Wall collision prevents clipping through blocks)
    const oldPos = camera.position.clone();

    // X 軸移動碰撞
    controls.moveRight(-velocity.x * delta);
    if (checkPlayerCollision(camera.position)) {
      camera.position.x = oldPos.x;
    }

    // Z 軸移動碰撞
    controls.moveForward(-velocity.z * delta);
    if (checkPlayerCollision(camera.position)) {
      camera.position.z = oldPos.z;
    }

    // Y 軸重力與地面碰撞
    camera.position.y += velocity.y * delta;
    const playerX = camera.position.x;
    const playerY = camera.position.y;
    const playerZ = camera.position.z;

    const groundY = getGroundHeight(playerX, playerZ) + 0.6;
    if (camera.position.y <= groundY) {
      velocity.y = 0;
      camera.position.y = groundY;
      canJump = true;
    }

    if (camera.position.y < -10) {
      velocity.y = 0;
      camera.position.set(0, 7, 10);
    }

    posDisplay.innerText = `X: ${Math.floor(playerX)}, Y: ${Math.floor(playerY - 1.6)}, Z: ${Math.floor(playerZ)}`;
  }

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

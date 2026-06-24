document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // --- State ---
  let width, height, radius;
  let autoRotateY = 0;
  let autoRotateX = 0;
  let mouseX = 0;
  let mouseY = 0;
  const FOCAL_LENGTH = 400;
  const LAT_COUNT = 20;
  const LON_COUNT = 30;

  // --- Geometry ---
  const vertices = [];
  const edges = [];

  /** Build a latitude/longitude sphere mesh and store edges. */
  function buildSphere() {
    vertices.length = 0;
    edges.length = 0;

    // Generate vertices on a unit sphere
    for (let lat = 0; lat <= LAT_COUNT; lat++) {
      const theta = (lat / LAT_COUNT) * Math.PI; // 0 → π
      for (let lon = 0; lon < LON_COUNT; lon++) {
        const phi = (lon / LON_COUNT) * 2 * Math.PI; // 0 → 2π
        vertices.push({
          x: Math.sin(theta) * Math.cos(phi),
          y: Math.cos(theta),
          z: Math.sin(theta) * Math.sin(phi),
        });
      }
    }

    // Connect adjacent vertices to form the wireframe grid
    for (let lat = 0; lat <= LAT_COUNT; lat++) {
      for (let lon = 0; lon < LON_COUNT; lon++) {
        const i = lat * LON_COUNT + lon;
        // Horizontal edge (along longitude)
        const nextLon = lat * LON_COUNT + ((lon + 1) % LON_COUNT);
        edges.push([i, nextLon]);
        // Vertical edge (along latitude)
        if (lat < LAT_COUNT) {
          edges.push([i, i + LON_COUNT]);
        }
      }
    }
  }

  // --- Math helpers ---

  /** Rotate a point around the Y axis. */
  function rotateY(p, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return { x: p.x * cos - p.z * sin, y: p.y, z: p.x * sin + p.z * cos };
  }

  /** Rotate a point around the X axis. */
  function rotateX(p, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
  }

  /** Perspective-project a 3D point to 2D canvas coordinates. */
  function project(p) {
    const scale = FOCAL_LENGTH / (FOCAL_LENGTH + p.z);
    return { x: p.x * scale + width / 2, y: p.y * scale + height / 2, scale };
  }

  // --- Sizing ---

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    radius = Math.min(width, height) * 0.3;
  }

  // --- Mouse interaction (subtle parallax) ---

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;  // -1 → 1
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  });

  canvas.addEventListener('mouseleave', () => {
    mouseX = 0;
    mouseY = 0;
  });

  // --- Animation loop ---

  function draw(time) {
    ctx.clearRect(0, 0, width, height);

    // Advance auto-rotation and blend in mouse influence
    autoRotateY += 0.003;
    autoRotateX += 0.001;
    const rotY = autoRotateY + mouseX * 0.15;
    const rotX = autoRotateX + mouseY * 0.15;

    // Transform all vertices once per frame
    const projected = vertices.map((v) => {
      let p = { x: v.x * radius, y: v.y * radius, z: v.z * radius };
      p = rotateY(p, rotY);
      p = rotateX(p, rotX);
      const p2 = project(p);
      // Normalised depth: 0 (far) → 1 (near)
      const depth = (p.z + radius) / (2 * radius);
      return { ...p2, z: p.z, depth };
    });

    // --- Draw edges ---
    ctx.lineWidth = 0.8;
    for (const [a, b] of edges) {
      const pa = projected[a];
      const pb = projected[b];
      // Average depth drives transparency (further = more transparent)
      const avgDepth = (pa.depth + pb.depth) / 2;
      const alpha = 0.05 + avgDepth * 0.35; // range 0.05 → 0.4
      ctx.strokeStyle = `rgba(99, 102, 241, ${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.stroke();
    }

    // --- Draw vertices ---
    const timeSec = time * 0.001;
    for (let i = 0; i < projected.length; i++) {
      const p = projected[i];
      const alpha = 0.05 + p.depth * 0.35;

      // Some vertices glow brighter on a sin wave for an ethereal pulse
      const glow = Math.sin(timeSec * 2 + i * 0.4) * 0.5 + 0.5; // 0 → 1
      const r = 1.5 + glow * 0.5; // radius 1.5 – 2 px
      const glowAlpha = alpha + glow * 0.3;

      ctx.fillStyle = `rgba(6, 182, 212, ${Math.min(glowAlpha, 1).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  // --- Initialise ---
  window.addEventListener('resize', resize);
  buildSphere();
  resize();
  requestAnimationFrame(draw);
});

import * as THREE from 'three'

export const createSigilMaterial = () =>
  new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uGlow: { value: 0.52 },
      uHeartbeat: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
    },
    transparent: true,
    depthWrite: false,
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying vec2 vUv;
      uniform float uTime;
      uniform float uHeartbeat;
      uniform vec2 uPointer;

      float hash(vec3 p) {
        p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }

      void main() {
        vUv = uv;
        float pointerInfluence = length(uPointer) * 0.08;
        float wave = sin(uTime * 0.8 + position.y * 4.0 + hash(position) * 6.28) * 0.03;
        float heartbeat = sin(uHeartbeat * 6.2831) * 0.02;
        vec3 transformed = position + normal * (wave + heartbeat + pointerInfluence);

        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vViewDir = normalize(-mvPosition.xyz);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying vec2 vUv;
      uniform float uGlow;
      uniform float uTime;

      void main() {
        float fresnel = pow(1.0 - dot(vNormal, vViewDir), 2.2);
        float heartbeatPulse = 0.88 + 0.12 * sin(uTime * 1.2);
        float radial = smoothstep(0.85, 0.1, length(vUv - 0.5));
        vec3 base = mix(vec3(0.12, 0.18, 0.45), vec3(0.55, 0.85, 1.0), fresnel);
        vec3 color = base * heartbeatPulse * (0.8 + radial * 0.2);
        float alpha = (fresnel * 0.7 + radial * 0.25 + 0.15) * uGlow;
        gl_FragColor = vec4(color, alpha);
      }
    `,
  })

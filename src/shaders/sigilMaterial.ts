import * as THREE from 'three'

export const createSigilMaterial = () =>
  new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uGlow: { value: 0.45 },
    },
    transparent: true,
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      uniform float uTime;
      void main() {
        vec3 transformed = position + normal * sin(uTime * 0.7 + position.y * 6.0) * 0.03;
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vViewDir = normalize(-mvPosition.xyz);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      uniform float uGlow;
      void main() {
        float fresnel = pow(1.0 - dot(vNormal, vViewDir), 2.5);
        float pulse = 0.7 + 0.3 * sin(gl_FragCoord.y * 0.03);
        vec3 color = mix(vec3(0.2, 0.35, 0.8), vec3(0.7, 0.9, 1.0), fresnel);
        gl_FragColor = vec4(color * pulse, (fresnel + 0.3) * uGlow);
      }
    `,
  })

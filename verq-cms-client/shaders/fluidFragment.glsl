uniform float uTime;
uniform vec2 uMouse;
uniform float uVelocity;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float dist = length(uv - uMouse);
  
  // Stronger, more visible trail
  float strength = smoothstep(0.45, 0.0, dist);
  strength = pow(strength, 2.0) * 1.8;
  
  // Velocity makes it pulse when moving fast
  strength *= (0.7 + uVelocity * 2.0);
  
  vec3 color = vec3(0.4, 0.7, 1.0); // Bright cyan-blue
  float alpha = strength * 0.9;

  gl_FragColor = vec4(color, alpha);
}uniform float uTime;
uniform vec2 uMouse;
uniform float uVelocity;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float dist = length(uv - uMouse);
  
  // Stronger, more visible trail
  float strength = smoothstep(0.45, 0.0, dist);
  strength = pow(strength, 2.0) * 1.8;
  
  // Velocity makes it pulse when moving fast
  strength *= (0.7 + uVelocity * 2.0);
  
  vec3 color = vec3(0.4, 0.7, 1.0); // Bright cyan-blue
  float alpha = strength * 0.9;

  gl_FragColor = vec4(color, alpha);
}
/*!
 * Package: ripple-effect v1.0.0
 * Author: Essam Abed
 * License: MIT
 */

const RippleEffect = function (opts) {
    let vertex = `
        varying vec2 vUv;
        
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    let fragment = `
        uniform sampler2D image;
        uniform sampler2D image2;
        uniform float time;
        uniform float mouseOver;
        uniform float intensity;
        uniform float strength;
        uniform float area;
        uniform float waveSpeed;
        varying vec2 vUv;

        #define NUM_OCTAVES 5

        float rand(vec2 n) { 
            return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
            vec2 ip = floor(p);
            vec2 u = fract(p);
            u = u*u*(3.0-2.0*u);
            
            float res = mix(
                mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
                mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
            return res*res;
        }

        float fbm(vec2 x) {
            float v = 0.0;
            float a = 0.5;
            vec2 shift = vec2(100);
            // Rotate to reduce axial bias
            mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
            for (int i = 0; i < NUM_OCTAVES; ++i) {
                v += a * noise(x);
                x = rot * x * 2.0 + shift;
                a *= 0.5;
            }
            return v;
        }

        void main(void) {
            vec2 uv = vUv;
            
            vec2 surface = strength * vec2(
                mix(-0.1, 0.2, fbm(5.*uv + waveSpeed * time)),
                mix(-0.1, 0.2, fbm(5.*uv + waveSpeed * time))
            );

            uv += mouseOver * intensity * refract(
                vec2(0, 0), 
                surface, 
                1.0 / 1.333
            );

            vec3 _texture = texture2D(image, uv).rgb;
            gl_FragColor = vec4(_texture,1.0);            
        }   
    `;

    const rand = function (a, b) {
        return a + (b - a) * Math.random();
    };

    let time = 0;
    let mouseOver = 0;
    let playhead = rand(1, 2);

    const parent = opts.parent || console.warn("no parent!");
    const intensity = opts.intensity || 1;
    const strength = opts.strength || 2;
    const area = opts.area || 6;
    const waveSpeed = opts.waveSpeed || 0.01;
    const speedIn = opts.speedIn || 1.4;
    const speedOut = opts.speedOut || 1.2;

    let texture = opts.texture || console.error("no texture!");
    let userHover = (opts.hover === undefined) ? true : opts.hover;
    let easing = opts.easing || 'Expo.easeOut';

    const mobileAndTabletcheck = function () {
        let check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
        parent.offsetWidth / -2,
        parent.offsetWidth / 2,
        parent.offsetHeight / 2,
        parent.offsetHeight / -2,
        1,
        1000
    );
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: false });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 0.0);
    renderer.setSize(parent.offsetWidth, parent.offsetHeight);
    parent.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "";
    texture = loader.load(texture);

    texture.minFilter = THREE.LinearFilter;
    texture.anisotropy = renderer.getMaxAnisotropy();

    const mat = new THREE.ShaderMaterial({
        uniforms: {
            time: { type: 'f', value: 0 },
            image: { type: 't', value: texture },
            mouseOver: { type: 'f', value: mouseOver },
            intensity: { type: 'f', value: intensity * playhead },
            strength: { type: 'f', value: strength * playhead },
            area: { type: 'f', value: area * playhead },
            waveSpeed: { type: 'f', value: waveSpeed * playhead },
        },
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
    });

    const geometry = new THREE.PlaneBufferGeometry(
        parent.offsetWidth,
        parent.offsetHeight,
        1
    );
    const object = new THREE.Mesh(geometry, mat);
    scene.add(object);

    const addEvents = function () {
        const evtIn = "mouseenter";
        const evtOut = "mouseleave";
        if (mobileAndTabletcheck()) {
            evtIn = "touchstart";
            evtOut = "touchend";
        }
        parent.addEventListener(evtIn, function () {
            gsap.to(mat.uniforms.mouseOver, {
                duration: speedIn,
                value: 1,
                ease: easing
            });
        });

        parent.addEventListener(evtOut, function () {
            gsap.to(mat.uniforms.mouseOver, {
                duration: speedOut,
                value: 0,
                ease: easing
            });
        });
    };

    if (userHover) {
        addEvents();
    }

    window.addEventListener("resize", function () {
        renderer.setSize(parent.offsetWidth, parent.offsetHeight);
    });


    this.start = function () {
        gsap.to(mat.uniforms.mouseOver, {
            duration: speedIn,
            value: 1,
            ease: easing
        });
    }

    this.stop = function () {
        gsap.to(mat.uniforms.mouseOver, {
            duration: speedOut,
            value: 0,
            ease: easing
        });
    };

    const animate = function () {
        time++;

        mat.uniforms.time.value = time;
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    animate();
};
function init() {
    const scene = new THREE.Scene();
    const gui = new dat.GUI();

    const box = getBox(1, 1, 1);
    const plane = getPlane(4);
    const pointLight = getPointLight(1);
    const sphere = getSphere(0.04)

    plane.name = 'plane-1'
    box.name = 'box-1'
    let enableFog = false;

    if (enableFog) {
        scene.fog = new THREE.FogExp2(0xfffff, 0.2)
    }

    scene.add(box);
    scene.add(plane);
    scene.add(pointLight);
    pointLight.add(sphere)

    box.position.y = box.geometry.parameters.height / 2;
    plane.rotation.x = Math.PI / 2;
    pointLight.intensity = 2;

    gui.add(pointLight, 'intensity', 0, 10).name("Light intensity")
    gui.add(pointLight.position, 'x', -5, 5).name("Light X")
    gui.add(pointLight.position, 'y', 0, 5).name("Light Y")


    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );

    camera.position.z = 5;
    camera.position.x = 2;
    camera.position.y = 10;
    pointLight.position.y = 2;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgb(0,0,0)')
    document.getElementById('webgl').appendChild(renderer.domElement);
    update(renderer, scene, camera)
    return scene;
}

function getPointLight(intensity) {
    const light = new THREE.PointLight("rgb(255, 255, 255)", intensity);
    return light

}

function getBox(w, h, d) {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const material = new THREE.MeshPhongMaterial({
        color: "rgb(255,255,255)"
    });

    const mesh = new THREE.Mesh(
        geometry,
        material
    );
    return mesh;
}

function getSphere(size) {
    const geometry = new THREE.SphereGeometry(size, 24, 24);
    const material = new THREE.MeshBasicMaterial({
        color: "rgb(255,255,255)"
    });

    const mesh = new THREE.Mesh(
        geometry,
        material
    );
    return mesh;
}


function getPlane(size) {
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.MeshPhongMaterial({
        color: "rgb(128,128,128)",
        side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(
        geometry,
        material
    );
    return mesh;
}
function update(renderer, scene, camera) {
    renderer.render(
        scene,
        camera
    )

    const box = scene.getObjectByName('box-1');
    box.rotation.y += 0.001
    requestAnimationFrame(function () {
        update(renderer, scene, camera);
    })

}
const scene = init();

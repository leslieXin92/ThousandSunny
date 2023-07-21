import { ref, onMounted, onUnmounted } from 'vue'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  HemisphereLight,
  TextureLoader,
  SpotLight,
  SpotLightHelper,
  PlaneGeometry,
  MeshLambertMaterial,
  Mesh,
  PCFSoftShadowMap,
  sRGBEncoding,
  ACESFilmicToneMapping,
  LinearFilter
} from 'three'
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const useThree = () => {
  const threeEl = ref<HTMLDivElement>()

  let renderer: WebGLRenderer,
    scene: Scene,
    camera: PerspectiveCamera,
    spotLight: SpotLight,
    lightHelper: SpotLightHelper

  const initThree = () => {
    renderer = new WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)

    const width = Number(threeEl.value?.offsetWidth) < 960 ? 960 : Number(threeEl.value?.offsetWidth)
    const height = Number(threeEl.value?.offsetHeight)
    renderer.setSize(width, height)

    threeEl.value?.appendChild(renderer.domElement)

    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = PCFSoftShadowMap

    renderer.outputEncoding = sRGBEncoding

    renderer.toneMapping = ACESFilmicToneMapping
    renderer.toneMappingExposure = 1

    renderer.setAnimationLoop(render)

    scene = new Scene()

    camera = new PerspectiveCamera(40, width / height, 1, 1000)
    camera.position.set(70, 50, 10)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.minDistance = 20
    controls.maxDistance = 100
    controls.maxPolarAngle = Math.PI / 2
    controls.target.set(0, 18, 0)
    controls.update()

    const ambient = new HemisphereLight(0xffffff, 0x444444, 0.05)
    scene.add(ambient)

    const loader = new TextureLoader().setPath('three/')
    const filenames = ['disturb.jpg', 'colors.png', 'uv_grid_opengl.jpg']

    const textures: { [key: string]: any } = { none: null }

    for (let i = 0; i < filenames.length; i++) {
      const filename = filenames[i]
      const texture = loader.load(filename)
      texture.minFilter = LinearFilter
      texture.magFilter = LinearFilter
      texture.encoding = sRGBEncoding
      textures[filename] = texture
    }

    spotLight = new SpotLight(0xffffff, 5)
    spotLight.position.set(25, 50, 25)
    spotLight.angle = Math.PI / 6
    spotLight.penumbra = 1
    spotLight.decay = 2
    spotLight.distance = 100
    spotLight.map = textures['disturb.jpg']

    spotLight.castShadow = true
    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024
    spotLight.shadow.camera.near = 10
    spotLight.shadow.camera.far = 200
    spotLight.shadow.focus = 1
    scene.add(spotLight)

    lightHelper = new SpotLightHelper(spotLight)
    scene.add(lightHelper)

    const geometry = new PlaneGeometry(1000, 1000)
    const material = new MeshLambertMaterial({ color: 0x808080 })

    const mesh = new Mesh(geometry, material)
    mesh.position.set(0, -1, 0)
    mesh.rotation.x = -Math.PI / 2
    mesh.receiveShadow = true
    scene.add(mesh)

    new PLYLoader().load('three/Lucy100k.ply', (geometry) => {
      geometry.scale(0.024, 0.024, 0.024)
      geometry.computeVertexNormals()

      const material = new MeshLambertMaterial()

      const mesh = new Mesh(geometry, material)
      mesh.rotation.y = -Math.PI / 2
      mesh.position.y = 18
      mesh.castShadow = true
      mesh.receiveShadow = true
      scene.add(mesh)
    })

    window.addEventListener('resize', onWindowResize)
  }

  const onWindowResize = () => {
    const width = Number(threeEl.value?.offsetWidth) < 960 ? 960 : Number(threeEl.value?.offsetWidth)
    const height = Number(threeEl.value?.offsetHeight)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  const render = () => {
    const time = performance.now() / 3000
    spotLight.position.x = Math.cos(time) * 25
    spotLight.position.z = Math.sin(time) * 25
    lightHelper.update()
    renderer.render(scene, camera)
  }

  onMounted(() => {
    threeEl.value && initThree()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onWindowResize)
  })

  return { threeEl }
}

export default useThree
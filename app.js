import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Box from './box.js'
import Player from './player.js'
import { Platform } from './platform.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)

const canvas = document.querySelector('#c')
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })
renderer.setSize(window.innerWidth, window.innerHeight)

const controls = new OrbitControls(camera, canvas)

// Setting up game objects
const player = new Player({
	width: 0.8,
	height: 1.3,
	depth: 0.5,
	velocity: { x: 0, y: -0.04, z: 0 }, // (-) means towards bottom
})
player.castShadow = true
scene.add(player)

const ground = new Box({ width: 10, height: 0.5, depth: 10, color: 0x0000ff })

ground.position.y = -2
ground.receiveShadow = true
scene.add(ground)

const platformColor = '#4f0f0f'
let platforms = generatePlatforms({ platformColor })

scene.add(...platforms)

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.y = 3
light.position.z = 4
light.castShadow = true

// scene.add(light)

camera.position.z = 5
camera.position.x = 4
camera.position.y = 1
camera.rotateY(Math.PI * 0.2)

controls.update()

requestAnimationFrame(animate)

function animate() {
	requestAnimationFrame(animate)

	checkGameOver(player, ground)

	controls.update()

	player.update([ground].concat(platforms))

	renderer.render(scene, camera)

	// 3.90'ı gecince
	if (player.position.y > 3.9) {
		platforms = generatePlatforms({ platformColor })
		scene.add(...platforms)
	}

	// console.log([ground, platform].some(item => checkCollision(player, item)))
}

/**
 *
 * @param {Player} player
 * @param {Box} ground
 */
function checkGameOver(player, ground) {
	if (player.top < ground.bottom - 3) {
		// You fell down
		// Game over
		// const gameOver = true
	}
}

export const keys = {
	left: {
		pressed: false,
	},
	right: {
		pressed: false,
	},
	up: {
		pressed: false,
	},
	down: {
		pressed: false,
	},
	space: {
		pressed: false,
	},
}

window.onkeydown = function (e) {
	// console.log('click!', e.code)

	switch (e.code) {
		case 'Space':
			keys.space.pressed = true
			break

		case 'ArrowUp':
			keys.up.pressed = true
			break

		case 'ArrowLeft':
			keys.left.pressed = true
			break

		case 'ArrowRight':
			keys.right.pressed = true
			break
	}
}

window.onkeyup = function (e) {
	switch (e.code) {
		case 'Space':
			keys.space.pressed = false
			break

		case 'ArrowUp':
			keys.up.pressed = false
			break

		case 'ArrowLeft':
			keys.left.pressed = false
			break

		case 'ArrowRight':
			keys.right.pressed = false
			break
	}
}

/**
 * Check if `box1` is colliding with `box2`
 * @param {Box} box1
 * @param {Box} box2
 * @returns {boolean}
 */
export function checkCollision(box1, box2) {
	// predict next frame
	const xCollision = box1.right + 0 >= box2.left && box1.left + 0 <= box2.right

	// consider gravity too
	const yCollision =
		box1.bottom + box1.velocity.y <= box2.top && box1.top >= box2.bottom

	const zCollision = box1.front >= box2.back && box1.back <= box2.front

	return xCollision && yCollision && zCollision
}

export function generatePlatforms({ platformColor }) {
	const plt = new Array(4)

	const platform_1 = new Platform({
		width: 2,
		height: 0.5,
		depth: 1,
		color: platformColor,
	})
	const platform_2 = new Platform({
		width: 2,
		height: 0.5,
		depth: 1,
		color: platformColor,
	})

	const platform_3 = new Platform({
		width: 2,
		height: 0.5,
		depth: 1,
		color: platformColor,
	})

	const platform_4 = new Platform({
		width: 2,
		height: 0.5,
		depth: 1,
		color: platformColor,
	})

	plt[0] = platform_1
	plt[1] = platform_2
	plt[2] = platform_3
	plt[3] = platform_4

	plt[0].position.y = 1
	plt[1].position.y = 2
	plt[2].position.y = 2
	plt[3].position.y = 3

	plt[0].position.x = 1
	plt[1].position.x = -3
	plt[2].position.x = 2
	plt[3].position.x = 3

	return plt
}


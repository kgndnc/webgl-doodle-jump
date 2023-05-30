import { checkCollision, keys } from './app.js'
import Box from './box.js'

const ACC = 0.01
const FRIC_HOR = 0.95
const FRIC_VER = 0.4
const GRAVITY = -0.01
const HORIZONTAL_SPEED = 0.04

class Player extends Box {
	constructor({
		width,
		height,
		depth,
		color = 0xff0000,
		velocity = {
			x: 0,
			y: 0,
			z: 0,
		},
	}) {
		super({ width, height, depth, color })

		this.acc = { x: 0, y: 0, z: 0 }
		this.velocity = velocity
	}

	// place here things to check collision for
	// collisionList: ground and platforms
	update(collisionList) {
		// movement
		this.handleXAxisMovement(collisionList)
		this.handleYAxisMovement(collisionList)

		if (this.position.y > 3.9) {
			this.position.y -= 2
			collisionList.forEach(item => (item.position.y -= 2))
		}
	}

	/**
	 * Apply gravity and check for collision on y-axis
	 * @param {Box[]} collisionList
	 */
	handleYAxisMovement(collisionList) {
		// Constant effect of gravity
		this.velocity.y += GRAVITY
		this.acc.y = 0

		// jump
		if (
			(keys.space.pressed || keys.up.pressed) &&
			collisionList.some(item => checkCollision(this, item))

			// checkCollision(this, ground)
		) {
			this.acc.y = 0.25
		}

		this.velocity.y += this.acc.y

		if (
			// checkCollision(this, ground)
			collisionList.some(item => checkCollision(this, item))
		) {
			// Bounce
			// // Apply friction
			// this.velocity.y *= FRIC_VER
			// this.velocity.y *= -1

			// Without bounce
			this.velocity.y = 0
			this.position.y += this.velocity.y
		} else {
			this.position.y += this.velocity.y
		}
	}

	/**
	 *
	 * @param { Box[] } collisionList
	 */
	handleXAxisMovement(collisionList) {
		this.acc.x = 0

		if (keys.left.pressed) {
			this.acc.x = -ACC
		}

		if (keys.right.pressed) {
			this.acc.x = ACC
		}

		this.velocity.x += this.acc.x

		// Apply friction
		this.velocity.x *= FRIC_HOR

		if (collisionList.some(item => checkCollision(this, item))) {
			this.velocity.x = 0

			this.position.x += -0.005

			return
		}

		this.position.x += this.velocity.x
	}
}

export default Player


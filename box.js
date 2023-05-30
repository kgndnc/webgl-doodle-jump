import { Mesh, BoxGeometry, MeshBasicMaterial } from 'three'

export default class Box extends Mesh {
	/**
	 *
	 * @param {{ width:number, height:number, depth:number, color?: ColorRepresentation  }} { width, height, depth, color }
	 */
	constructor({ width, height, depth, color = 0xff0000 }) {
		super(
			new BoxGeometry(width, height, depth),
			new MeshBasicMaterial({ color })
		)

		this.width = width
		this.height = height
		this.depth = depth
	}

	get bottom() {
		return this.position.y - this.height / 2
	}

	get top() {
		return this.position.y + this.height / 2
	}

	get left() {
		return this.position.x - this.width / 2
	}

	get right() {
		return this.position.x + this.width / 2
	}

	get front() {
		return this.position.z + this.depth / 2
	}

	get back() {
		return this.position.z - this.depth / 2
	}

	update() {
		console.log(`Calling update method from Box class`)
	}
}


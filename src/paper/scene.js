import paper, { Group, Layer, Point, PointText, Path, Raster, Rectangle, Size } from 'paper'
import PaperApp from './app.js'
import Scenes from './scenes/index.js'


class PaperScene extends PaperApp {
  constructor() {
    super()
    this.scenes =  Object.keys(Scenes) // TODO: remove this useless array
    this.scenesLayers = {}
    this.scenesInteractions = {}
    this.idx = 0

    this.populate()
    this.drawScene()
  }

  setScene(name) {
    const idx = this.scenes.indexOf(name)
    if(idx < 0) throw new Error(`there is no such scene as ${name}`)
    this.idx = idx
  }

  getScene() {
    return this.scenes[this.idx]
  }

  populate() {
    this.scenes.forEach(sc => {
      const scene = Scenes[sc](this)
      this.scenesLayers[sc] = scene.layer()
      this.scenesInteractions[sc] = scene.interactions
    })

    // this should be animated
    const right = 250 // go to 350
    const bottom = 350 // go to 250 but with a sinusoidal way
    const myPath = new Path();
    myPath.strokeColor = 'black';
    myPath.add(new Point(-65, -6));
    myPath.add(new Point(-65, bottom));
    myPath.add(new Point(right, 300));
    myPath.add(new Point(right, -6));
    myPath.fillColor = {
      gradient: {
        stops: [
          'rgba(99, 41, 232, 1.0)', // '#328E9',
          'rgba(233, 40, 40, 0.37)',
        ],
      },
      origin: new Point(0, 0),
      destination: new Point(300, 300),
    }
    myPath.opacity = .1

    myPath.closed = true;


    const l = new Layer([myPath])
    l.selected = true
    l.visible = true

        // background: linear-gradient(173.15deg, #6328E9 12.12%, rgba(233, 40, 40, 0.37) 93.65%);
        // opacity: 0.1;

  }

  drawScene() { // rename to draw :-)


    this.scenes.forEach((sc, i) => {
      console.log(sc, this.scenesLayers[sc])
      this.scenesLayers[sc].visible = i === this.idx
    })
  }

  pipeInteraction(type, ev, that) {
    // patch this interaction to the scene interactions
    return this.scenesInteractions[this.getScene()][type](ev, that)
  }

  down(ev) {
    this.cursor.drag = true
    this.cursor.start = [ev.x, ev.y]
    this.cursor.curr = [ev.x, ev.y]
    this.pipeInteraction('down', ev, this)
  }

  up(ev) {
    this.cursor.drag = false
    this.debugText.content = `
      x: ${this.cursor.curr[0]} y: ${this.cursor.curr[1]} |
      scroll: ${/*this.cities.position*/ true} |
      cursor: ${this.cursor.drag? 'down' : 'up'}
    `
    this.pipeInteraction('up', ev, this)
  }

  move(ev) {
    this.cursor.curr = [ev.x, ev.y]

    // this.debugLine.segments[1].point = new Point(ev.x, ev.y)
    this.debugText.content = `
      x: ${ev.x} y: ${ev.y} |
      scroll: ${/*this.cities.position*/true} |
      cursor: ${this.cursor.drag? 'down' : 'up'}
    `
    this.pipeInteraction('move', ev, this)
  }

}

export default PaperScene

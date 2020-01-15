import paper, { Group, Layer, Point, PointText, Path, Raster, Rectangle, Size } from 'paper'

import Burger from '../components/burger.js'

const explore = that  => {
  // this is a component
  const radius = new Size(6, 6);

  const burger = Burger()
  // // this is a component
  // const burger = new Group([
  //   new Path({segments: [[24, 45], [42, 45]]}),
  //   new Path({segments: [[24, 52], [42, 52]]}),
  //   new Path({segments: [[24, 59], [33, 59]]}),
  // ])
  // burger.strokeColor = '#ff0000'
  // burger.strokeWidth = 2
  // burger.strokeCap = 'round'

  const search = new Group([
    (() => {
      const exploreText = new PointText(new Point(22, 122))
      exploreText.style = {
        fontFamily: 'CircularStd',
        fontWeight: 400,
        fontSize: 16,
        fillColor: 'red',
        justification: 'left',
      }
      exploreText.content = 'Explore appartments in'
      return exploreText
    })(),
    (() => {
      const placeHolderText = new PointText(new Point(22, 160))
      placeHolderText.style = {
        fontFamily: 'CircularStd',
        fontWeight: 400,
        fontSize: 32,
        fillColor: 'red',
        justification: 'left',
        opacity: .1
      }
      placeHolderText.content = 'Madrid, ES'
      return placeHolderText
    })(),
    // magnifying glass
    new Group(
      (() => {
        const r = new Path.Circle(new Point(340, 150), 10)
        r.strokeWidth = 2
        r.strokeColor = '#000'
        return r
      })(),
      (() => {
        const ln = new Path.Line(new Point(346, 157), new Point(350, 163))
        ln.strokeColor = '#000'
        ln.strokeWidth = 2
        // ln.opacity = .1
        return ln
      })(),
    ),
    // line above
    (() => {
      const lineAbove = new Path.Line(new Point(22, 184), new Point(354, 184))
      lineAbove.strokeColor = '#000'
      lineAbove.opacity = .1
      return lineAbove
    })(),
    // filters
    new Group(
      // date
      new Group(
        (() => {
          const rect = new Rectangle(
            new Point(22, 204),
            new Point(22 + 80, 204 + 30)
          )
          const fil = new Path.Rectangle(rect, radius)
          fil.fillColor = '#efeafd'
          return fil
        })(),
        (() => {
          const pad = 20
          const tex = new PointText(new Point(22 + 40, 204 + pad))
          tex.style = {
            fontFamily: 'Sailec, arial',
            fontWeight: 400,
            fontSize: 16,
            fillColor: '#6328E9',
            justification: 'center',
            opacity: .1
          }
          tex.content = 'Apr 22-24'
          return tex
        })(),
      ),
      // ppl
      new Group(
        (() => {
          const rect = new Rectangle(
            new Point(110, 204),
            new Point(110 + 80, 204 + 30)
          )
          const fil = new Path.Rectangle(rect, radius)
          fil.fillColor = '#efeafd'
          return fil
        })(),
        (() => {
          const pad = 20
          const tex = new PointText(new Point(110 + 40, 204 + pad))
          tex.style = {
            fontFamily: 'Sailec, arial',
            fontWeight: 400,
            fontSize: 16,
            fillColor: '#6328E9',
            justification: 'center',
            opacity: .1
          }
          tex.content = '2 People'
          return tex
        })(),
      ),
      // price
      new Group(
        (() => {
          const rect = new Rectangle(
            new Point(200, 204),
            new Point(200 + 80, 204 + 30)
          )
          const fil = new Path.Rectangle(rect, radius)
          fil.fillColor = '#efeafd'
          return fil
        })(),
        (() => {
          const pad = 20
          const tex = new PointText(new Point(200 + 40, 204 + pad))
          tex.style = {
            fontFamily: 'Sailec, arial',
            fontWeight: 400,
            fontSize: 16,
            fillColor: '#6328E9',
            justification: 'center',
            opacity: .1
          }
          tex.content = '< £100'
          return tex
        })(),
      ),
    ),
  ])
  search.selected = true


  const satisLine = (x, y, note = 5) => {
    const dots = []
    for (let i = 0; i < 5; i++) {
      const dot = new Path.Circle(new Point(x + i * 12, y), 4)
      dot.fillColor = i < note ? '#FFAD28' : '#D8D8D8'
      dots.push(dot)
    }
    return new Group(dots)
  }

  const madThumb = new Raster('/assets/madrid.png')
  madThumb.scale(.25)
  madThumb.position = new Point(95, 390)

  const lonThumb = new Raster('/assets/london.png')
  lonThumb.scale(.25)
  lonThumb.position = new Point(255, 408)


  const berThumb = new Raster('/assets/berlin.png')
  berThumb.scale(.20)
  berThumb.position = new Point(415, 370)

  const city = (p, title, appts, rank, price) => {
    return new Group([
      // title
      (() => {
        const tit = new PointText(p)
        tit.style = {
          fontFamily: 'CircularStd',
          fontWeight: 600,
          fontSize: 18,
          fillColor: 'red',
          justification: 'left',
        }
        tit.content = title
        return tit
      })(),
      // appts
      (() => {
        const app = new PointText([p.x, p.y + 20])
        app.style = {
          fontFamily: 'CircularStd',
          fontWeight: 400,
          fontSize: 12,
          fillColor: '#999',
          justification: 'left',
        }
        app.content = `${appts}+ Appartments`
        return app
      })(),
      // price
      (() => {
        const pri = new PointText([p.x + 65, p.y + 40])
        pri.style = {
          fontFamily: 'CircularStd',
          fontWeight: 400,
          fontSize: 12,
          fillColor: '#999',
          justification: 'left',
        }
        pri.content = price
        return pri
      })(),
      satisLine(p.x, p.y+38, rank),
    ])
  }

  const cities = new Group([
    // madrid
    new Group([
      madThumb,
      city(new Point(27, 500), 'Madrid, ES', '2,000', 4, '$ $'),
    ]),
    // london
    new Group([
      lonThumb,
      city(new Point(180, 530), 'London, UK', '3,000', 5, '$ $ $'),

    ]),
    // berlin
    new Group([
      berThumb,
      city(new Point(340, 450), 'Berlin, DE', '1,500', 3, '$'),
    ])

  ])

  const popular = new Layer([
    (() => {
      const title = new PointText([22, 290])
      title.content = 'Popular places'
      title.style = {
        fontFamily: 'Sailec, arial',
        fontWeight: 400,
        fontSize: 16,
        fillColor: 'red',
        justification: 'left',
      }
      return title
    })(),
    (() => {
      const exp = new PointText([354, 290])
      exp.content = 'Explore'
      exp.style = {
        fontFamily: 'Sailec, arial',
        fontWeight: 400,
        fontSize: 16,
        fillColor: '#6328E9',
        justification: 'right',
      }
      return exp
    })(),
    // this slider might be independant... wait and see
    cities,
  ])

  popular.selected = true
  that.cities = cities

  const exploreLayer = new Layer([
    burger,
    search,
    popular
  ])

  that.exploreLayer = exploreLayer
  return exploreLayer
}

export default explore
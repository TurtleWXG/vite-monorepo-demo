<script setup lang="ts">
import { onMounted } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map.js'
import OSM from 'ol/source/OSM.js'
import TileLayer from 'ol/layer/Tile.js'
import View from 'ol/View.js'
import { GeoJSON } from 'ol/format'
import BYGeoJson from './geojson/bai-yun.json'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import { XYZ } from 'ol/source'
import { asString } from 'ol/color'
import Fill from 'ol/style/Fill'
import { toContext } from 'ol/render'
import { getHeight, getWidth } from 'ol/extent'

onMounted(() => {
  let angle = 0 // 初始旋转角度

  /** 白云区中心点坐标 */
  const BYCenter = [113.30584893014779, 23.28496975471382]

  const mapZoom = 11.4

  const map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new XYZ({
          url: 'http://t4.tianditu.com/DataServer?T=img_w&tk=80b2dd117767276fc707129a73c0a4ca&x={x}&y={y}&l={z}',
        }),
      }),

      new VectorLayer({
        className: `by-vector-layer`,
        source: new VectorSource({
          features: new GeoJSON().readFeatures(BYGeoJson),
        }),
        style: new Style({
          renderer(coordinates, state) {
            const { context } = state
            const geometry: any = state.geometry.clone()

            geometry.setCoordinates(coordinates)

            const extent = geometry.getExtent()
            // const center = getCenter(extent)
            const width = getWidth(extent)
            const height = getHeight(extent)
            // const radius = (width > height ? width : height) / 2
            // context.save()
            const renderContext = toContext(context, {
              pixelRatio: 1,
            })

            // const gradient = context.createLinearGradient(
            //   width * 0.4,
            //   height,
            //   width * 0.9,
            //   0
            // )

            // 计算旋转后的渐变坐标
            const centerX = width / 2
            const centerY = height / 2
            const radius = Math.max(width, height) / 2

            const x1 = centerX + radius * Math.cos(angle)
            const y1 = centerY + radius * Math.sin(angle)
            const x2 = centerX - radius * Math.cos(angle)
            const y2 = centerY - radius * Math.sin(angle)

            // 创建旋转后的渐变
            const gradient = context.createLinearGradient(x1, y1, x2, y2)

            // const colorArray = asArray('rgb(142, 228, 255)')

            // gradient.addColorStop(0, asString(colorArray.toSpliced(-1, 1, 0.9)))
            // gradient.addColorStop(0.5, asString(colorArray.toSpliced(-1, 1, 0.7)))
            // gradient.addColorStop(1, asString(colorArray.toSpliced(-1, 1, 0.5)))
            gradient.addColorStop(0, asString('rgba(0, 134, 209, 0.9)'))
            gradient.addColorStop(1, asString('rgba(142, 228, 255, 0.9)'))

            renderContext.setFillStrokeStyle(
              new Fill({
                color: gradient,
              }),
              new Stroke({
                color: '#fff',
                // lineDash: [4],
                width: 2,
              }),
            )

            renderContext.drawGeometry(geometry)
          },
        }),
      }),
    ],
    view: new View({
      projection: 'EPSG:4326',
      center: BYCenter,
      zoom: mapZoom,
    }),
  })

  // 动画函数，更新旋转角度并重新渲染
  function animate() {
    angle += 0.01 // 每次更新旋转角度
    if (angle >= 2 * Math.PI) {
      angle = 0 // 重置角度
    }
    map.render() // 重新渲染地图
    requestAnimationFrame(animate) // 循环动画
  }
  animate() // 启动动画
})
</script>

<template>
  <div id="map"></div>
</template>

<style lang="scss" scoped>
#map {
  position: absolute;
  inset: 0;
}
</style>

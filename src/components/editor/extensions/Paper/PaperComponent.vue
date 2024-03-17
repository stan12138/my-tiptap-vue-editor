<template>
  <node-view-wrapper class="draw">
    <n-grid x-gap="12" :cols="10" v-if="this.editor.isEditable">
      <n-gi >
        <n-color-picker :modes="['hex']" v-model:value="color"></n-color-picker>
      </n-gi>
      <n-gi>
        <n-input-number v-model:value="size" :min="1"></n-input-number>
      </n-gi>
      <n-gi>
        <n-button strong secondary circle>
          <template #icon>
            <n-icon><Eraser></Eraser></n-icon>
          </template>
        </n-button>
      </n-gi>
    </n-grid>
    <svg viewBox="0 0 500 250" ref="canvas" style="cursor: crosshair;">
      <template v-for="item in node.attrs.lines">
        <path
          v-if="item.id !== id"
          :key="item.id"
          :d="item.path"
          :id="`id-${item.id}`"
          :stroke="item.color"
          :stroke-width="item.size"
        />
      </template>
    </svg>
  </node-view-wrapper>
</template>

<script>
import { Eraser } from '@vicons/tabler'
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import * as d3 from 'd3'
import { v4 as uuid } from 'uuid'

const getRandomElement = list => {
  return list[Math.floor(Math.random() * list.length)]
}

export default {
  name: 'Paper',

  components: {
    NodeViewWrapper,
    Eraser
  },

  props: ['editor'],

  data() {
    return {
      color: getRandomElement([
        '#A975FF',
        '#FB5151',
        '#FD9170',
        '#FFCB6B',
        '#68CEF8',
        '#80CBC4',
        '#9DEF8F',
      ]),
      size: Math.ceil(Math.random() * Math.floor(10)),
      svg: null,
      path: null,
      points: [],
      drawing: false,
      id: uuid(),
    }
  },

  methods: {
    onStartDrawing(event) {
      this.drawing = true
      this.points = []
      this.path = this.svg
        .append('path')
        .data([this.points])
        .attr('id', `id-${this.id}`)
        .attr('stroke', this.color)
        .attr('stroke-width', this.size)

      const moveEvent = event.type === 'mousedown'
        ? 'mousemove'
        : 'touchmove'

      this.svg.on(moveEvent, this.onMove)
    },

    onMove(event) {
      event.preventDefault()
      this.points.push(d3.pointers(event)[0])
      this.tick()
    },

    onEndDrawing() {
      this.svg.on('mousemove', null)
      this.svg.on('touchmove', null)

      if (!this.drawing) {
        return
      }

      this.drawing = false
      this.svg.select(`#id-${this.id}`).remove()
      this.id = uuid()
    },

    tick() {
      requestAnimationFrame(() => {
        this.path.attr('d', points => {
          const path = d3.line().curve(d3.curveBasis)(points)
          const lines = this.node.attrs.lines.filter(item => item.id !== this.id)

          this.updateAttributes({
            lines: [
              ...lines,
              {
                id: this.id,
                color: this.color,
                size: this.size,
                path,
              },
            ],
          })

          return path
        })
      })
    },

    clear() {
      this.updateAttributes({
        lines: [],
      })
    },
  },

  mounted() {
    this.svg = d3.select(this.$refs.canvas)
    // console.log(this.editor)
    if(this.editor.isEditable) {
      this.svg
      .on('mousedown', this.onStartDrawing)
      .on('mouseup', this.onEndDrawing)
      .on('mouseleave', this.onEndDrawing)
      .on('touchstart', this.onStartDrawing)
      .on('touchend', this.onEndDrawing)
      .on('touchleave', this.onEndDrawing)
    }

  },
}
</script>

<style scoped>
:deep() .n-base-icon {
cursor: pointer;
}
</style>

<style lang="scss">
.draw {
  svg {
    background: #f1f3f5;
    // cursor: crosshair;
  }

  path {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}
</style>
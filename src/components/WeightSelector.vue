<template>
  <div class="weight-selector">
    <!-- 刻度尺容器 -->
    <div class="scale" ref="scale" @click="handleClick">
      <!-- 显示刻度 -->
      <div class="ticks">
        <div v-for="i in numTicks" :key="i" class="tick" :class="{'major-tick': i % 5 === 0}" :style="{ left: `${(i / (numTicks - 1)) * 100}%` }"></div>
      </div>
      <!-- 选中区域 -->
      <div class="selected-area" :style="selectedStyle"></div>
      <!-- 滑块 -->
      <div class="slider" ref="slider" :style="sliderStyle" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd"></div>
    </div>
    <!-- 显示选中的重量 -->
    <div class="weight-display">{{ selectedWeight }} kg</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minWeight: 0,
      maxWeight: 100,
      selectedWeight: 0,
      isDragging: false,
      scaleWidth: 0,
      sliderPosition: 0, // 滑块的当前位置，0-100 之间
      numTicks: 21, // 刻度的数量 (包括小格与大格)
    };
  },
  computed: {
    selectedStyle() {
      const width = (this.sliderPosition / 100) * this.scaleWidth;
      return {
        width: `${width}px`,
        backgroundColor: '#ff7f00',
        height: '100%',
        position: 'absolute',
        left: '0',
        top: '0',
        zIndex: '1',
      };
    },
    sliderStyle() {
      return {
        left: `${(this.sliderPosition / 100) * this.scaleWidth}px`,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '20px',
        height: '20px',
        backgroundColor: '#ff7f00',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: '2',
      };
    },
  },
  mounted() {
    this.scaleWidth = this.$refs.scale.offsetWidth;
    this.selectedWeight = this.minWeight; // 默认初始重量为最小值
  },
  methods: {
    handleTouchStart(event) {
      this.isDragging = true;
      const startX = event.touches[0].clientX;
      const initialPosition = this.sliderPosition;

      const handleTouchMove = (moveEvent) => {
        if (!this.isDragging) return;
        const delta = moveEvent.touches[0].clientX - startX;
        let newPosition = (initialPosition * this.scaleWidth + delta) / this.scaleWidth * 100;
        newPosition = Math.max(0, Math.min(newPosition, 100)); // 限制在0-100之间
        this.sliderPosition = newPosition;
        this.selectedWeight = ((this.maxWeight - this.minWeight) * newPosition) / 100 + this.minWeight;
      };

      const handleTouchEnd = () => {
        this.isDragging = false;
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };

      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    },
    handleClick(event) {
      const rect = this.$refs.scale.getBoundingClientRect();
      const clickPosition = event.clientX - rect.left; // 点击相对于刻度尺的偏移位置
      const newPosition = (clickPosition / this.scaleWidth) * 100;
      this.sliderPosition = Math.max(0, Math.min(newPosition, 100)); // 限制在0-100之间
      this.selectedWeight = ((this.maxWeight - this.minWeight) * this.sliderPosition) / 100 + this.minWeight;
    },
  },
};
</script>

<style scoped>
.weight-selector {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.scale {
  width: 100%;
  height: 20px;
  background-color: #ddd;
  position: relative;
  cursor: pointer;
}

.ticks {
  position: absolute;
  width: 100%;
  top: 0;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.tick {
  width: 1px;
  height: 100%;
  background-color: #aaa;
}

.major-tick {
  background-color: #000;
}

.selected-area {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 0;
}

.slider {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-color: #ff7f00;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
}

.weight-display {
  margin-top: 10px;
  font-size: 18px;
}
</style>

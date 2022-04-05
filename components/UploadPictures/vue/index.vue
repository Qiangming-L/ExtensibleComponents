<template>
  <div class="upload-pictures">
    <label for="uploadFile">
      <input ref="fileInput" type="file" accept="image/*" @change="initializePic" id="uploadFile" />
    </label>
    <div
      v-if="showPopup"
      class="upload-pictures-popup"
      @click.stop="popupClick"
      @keyup.esc="popupClick"
    >
      <div class="upload-pictures-show" @mousewheel="fileWheel" ref="picturesShow">
        <p class="upload-pictures-title">{{ popupText }}</p>
        <slot name="upload"></slot>
        <div
          @mousewheel="fileWheel"
          ref="already"
          :class="['upload-pictures-already', { animation: isAnimation }]"
          :style="underlyingStyle"
        >
          <img :src="imgUrl" alt="img" />
          <div
            ref="maskLayer"
            :style="[maskLayerStyle, alreadyStyle]"
            class="upload-pictures-mask-layer"
            @mousemove="fileMove"
            @mousedown.left="fileClick"
            @mouseup.left="fileClick"
            @focusout="fileClick"
            @mouseleave="fileClick"
          />
        </div>
        <div class="upload-pictures-sure">
          <button @click="tailorPic">{{ buttonText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type UploadPic = {
  width: number;
  height: number;
};

export default defineComponent({
  name: "UploadPictures",
  props: {
    imgSize: {
      type: Number,
      default: 5
    },
    exhibitionWidth: {
      type: Number,
      default: 800
    },
    canvasWidth: {
      type: Number,
      default: 200
    },
    canvasHeight: {
      type: Number,
      default: 200
    },
    zoom: {
      type: Number,
      default: 50
    },
    popupText: {
      type: String,
      default: "修改头像"
    },
    buttonText: {
      type: String,
      default: "确定"
    },
    imgType: {
      type: String,
      default: "jpge"
    },
    confirmUpload: {
      type: Function
    }
  },
  data() {
    return {
      imgElement: null as HTMLImageElement | null,
      exhibitionHeight: 0,
      imgUrl: "",
      showPopup: false,
      isAnimation: false,
      startMove: false,
      underlyingStyle: { width: `${this.exhibitionWidth}px`, height: `0px` },
      maskLayerStyle: { width: `${this.canvasWidth}px`, height: `${this.canvasHeight}px` },
      mouseLocation: {
        clientX: 0,
        clientY: 0
      },
      uploadPic: {} as UploadPic,
      alreadyStyle: {
        top: `0`,
        left: `0`
      }
    };
  },
  methods: {
    initializePic(event: any) {
      if (event.target.files.length > 0) {
        this.showPopup = true;
        const file = event.target.files[0];
        const src = URL.createObjectURL(file);
        if (file.size / 1024 / 1024 > this.imgSize) {
          alert(`The uploaded picture is larger than ${this.imgSize}M, please upload it again`);
          return;
        }
        this.imgUrl = src;
        const img = new Image();
        img.src = src;
        img.onload = () => {
          (this.$refs.fileInput as HTMLInputElement).blur();
          const { children } = this.$refs.picturesShow as HTMLElement;
          let childrenHeight = 40;
          for (let i = 0; i < children.length; i += 1) {
            if (!children[i].className.includes("upload-pictures-already")) {
              childrenHeight += children[i].clientHeight;
            }
          }
          const { clientWidth, clientHeight } = document.documentElement;
          const imgWidth = img.width;
          const imgHeight = img.height;
          let temporaryWidth = this.exhibitionWidth;
          if (this.exhibitionWidth > clientWidth) {
            temporaryWidth = clientWidth * 0.9 - 60;
          }
          if (imgWidth < this.canvasWidth) {
            temporaryWidth = this.canvasWidth;
          }
          let temporaryHeight = Math.ceil((temporaryWidth / imgWidth) * imgHeight);
          if (temporaryHeight < this.canvasHeight) {
            temporaryHeight = this.canvasHeight;
            temporaryWidth = Math.ceil((temporaryHeight / imgHeight) * imgWidth);
          } else if (temporaryHeight > clientHeight * 0.9 - childrenHeight) {
            temporaryHeight = clientHeight * 0.9 - childrenHeight;
            temporaryWidth = Math.ceil((temporaryHeight / imgHeight) * imgWidth);
          }
          window.addEventListener("keydown", this.keydownFun);
          this.imgElement = img;
          this.exhibitionHeight = temporaryHeight;
          Object.assign(this.uploadPic, { width: imgWidth, height: imgHeight });
          Object.assign(this.underlyingStyle, {
            width: `${temporaryWidth}px`,
            height: `${temporaryHeight}px`
          });
          Object.assign(this.alreadyStyle, {
            top: `${(temporaryHeight - this.canvasHeight) / 2}px`,
            left: `${(temporaryWidth - this.canvasWidth) / 2}px`
          });
        };
      }
    },
    tailorPic() {
      const canvas = document.createElement("canvas");
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
      const canvasTx = canvas.getContext("2d") as CanvasRenderingContext2D;
      const already = (this.$refs.already as HTMLElement).getBoundingClientRect();
      const maskLayer = (this.$refs.maskLayer as HTMLElement).getBoundingClientRect();
      const imgElement = this.imgElement as HTMLImageElement;
      const width = parseFloat(this.underlyingStyle.width);
      const height = parseFloat(this.underlyingStyle.height);
      const top = ((maskLayer.top - already.top) / height) * imgElement.height;
      const left = ((maskLayer.left - already.left) / width) * imgElement.width;
      canvasTx.drawImage(
        imgElement,
        left,
        top,
        this.canvasWidth / (width / imgElement.width),
        this.canvasHeight / (height / imgElement.height),
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      );
      this.clearData();
      if (this.confirmUpload) {
        const imgBase = canvas.toDataURL(`image/${this.imgType}`) as string;
        this.confirmUpload(imgBase);
      }
    },
    fileWheel(event: WheelEvent) {
      this.isAnimation = true;
      const { width, height } = this.uploadPic;
      const alreadyWidth = parseFloat(this.underlyingStyle.width);
      const alreadyHeight = parseFloat(this.underlyingStyle.height);
      let temporaryWidth = alreadyWidth - this.zoom;
      let temporaryHeight = Math.ceil((temporaryWidth / width) * height);
      let maskLayerTop = parseFloat(this.alreadyStyle.top);
      let maskLayerLeft = parseFloat(this.alreadyStyle.left);
      if (event.detail > 0 || event.deltaY > 0) {
        if (temporaryWidth < this.canvasWidth) {
          temporaryWidth = this.canvasWidth;
          temporaryHeight = Math.ceil((temporaryWidth / width) * height);
        }
        if (temporaryHeight < this.canvasHeight) {
          temporaryHeight = this.canvasHeight;
          temporaryWidth = Math.ceil((temporaryHeight / height) * width);
        }
      } else {
        if (temporaryWidth >= this.exhibitionWidth) return;
        temporaryWidth = alreadyWidth + this.zoom;
        if (temporaryWidth > this.exhibitionWidth) {
          temporaryWidth = this.exhibitionWidth;
        }
        temporaryHeight = Math.ceil((temporaryWidth / width) * height);
        if (temporaryHeight > this.exhibitionHeight) {
          temporaryHeight = this.exhibitionHeight;
          temporaryWidth = Math.ceil((temporaryHeight / height) * width);
        }
      }
      maskLayerTop = ((maskLayerTop + this.canvasHeight / 2) / alreadyHeight) * temporaryHeight
        - this.canvasHeight / 2;
      maskLayerLeft = ((maskLayerLeft + this.canvasWidth / 2) / alreadyWidth) * temporaryWidth
        - this.canvasWidth / 2;
      if (maskLayerTop < 0) {
        maskLayerTop = 0;
      } else if (maskLayerTop > temporaryHeight - this.canvasHeight) {
        maskLayerTop = temporaryHeight - this.canvasHeight;
      }
      if (maskLayerLeft < 0) {
        maskLayerLeft = 0;
      } else if (maskLayerLeft > temporaryWidth - this.canvasWidth) {
        maskLayerLeft = temporaryWidth - this.canvasWidth;
      }
      Object.assign(this.underlyingStyle, {
        width: `${temporaryWidth}px`,
        height: `${temporaryHeight}px`
      });
      Object.assign(this.alreadyStyle, { top: `${maskLayerTop}px`, left: `${maskLayerLeft}px` });
    },
    fileMove(event: MouseEvent) {
      if (this.startMove) {
        const { clientX, clientY } = this.mouseLocation;
        const x = Math.floor(event.clientX - clientX);
        const y = Math.floor(event.clientY - clientY);
        const { top, left } = this.alreadyStyle;
        const alreadyWidth = parseFloat(this.underlyingStyle.width);
        const alreadyHeight = parseFloat(this.underlyingStyle.height);
        let temporaryTop = parseFloat(top as string) + y;
        let temporaryLeft = parseFloat(left as string) + x;
        if (temporaryTop < 0) {
          temporaryTop = 0;
        } else if (temporaryTop > alreadyHeight - this.canvasHeight) {
          temporaryTop = alreadyHeight - this.canvasHeight;
        }
        if (temporaryLeft < 0) {
          temporaryLeft = 0;
        } else if (temporaryLeft > alreadyWidth - this.canvasWidth) {
          temporaryLeft = alreadyWidth - this.canvasWidth;
        }
        Object.assign(this.mouseLocation, { clientX: event.clientX, clientY: event.clientY });
        Object.assign(this.alreadyStyle, {
          top: `${temporaryTop}px`,
          left: `${temporaryLeft}px`
        });
      }
    },
    fileClick(event: MouseEvent) {
      if (event.stopPropagation) event.stopPropagation();
      if (event.preventDefault) event.preventDefault();
      this.isAnimation = false;
      if (event.type === "mousedown") {
        this.startMove = true;
        Object.assign(this.mouseLocation, {
          clientX: event.clientX,
          clientY: event.clientY
        });
      } else if (event.type === "mouseup" || event.type === "mouseleave") {
        this.startMove = false;
      }
    },
    keydownFun(event: any) {
      if (event.keyCode === 27) {
        this.clearData();
      } else if (event.keyCode === 13) {
        this.tailorPic();
      }
    },
    popupClick(event: MouseEvent) {
      const { target } = event;
      if ((target as HTMLElement).className.includes("upload-pictures-popup")) {
        this.clearData();
      }
    },
    clearData() {
      (this.$refs.fileInput as HTMLInputElement).value = "";
      this.showPopup = false;
      this.imgUrl = "";
      this.imgElement = null;
      this.isAnimation = false;
      this.startMove = false;
      Object.assign(this.alreadyStyle, { top: `0`, left: `0` });
      Object.assign(this.mouseLocation, { clientX: 0, clientY: 0 });
      window.removeEventListener("keydown", this.keydownFun);
    }
  }
});
</script>
<style>
.upload-pictures-popup * {
  margin: 0;
  padding: 0;
}
</style>
<style scoped>
.upload-pictures-popup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
.upload-pictures-show {
  max-width: 90%;
  max-height: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 8px;
  padding: 0 30px 0;
  box-sizing: border-box;
}
.upload-pictures-show img {
  vertical-align: bottom;
  width: 100%;
  height: 100%;
}
.upload-pictures-title {
  padding: 20px 0;
}
.upload-pictures-mask-layer {
  position: absolute;
  box-shadow: 0 0 0 3000px rgba(0, 0, 0, 0.3);
  cursor: move;
}
.upload-pictures-already {
  position: relative;
  overflow: hidden;
  margin: 0 auto;
}
.upload-pictures-show,
.animation,
.animation * {
  transition: all 0.2s;
  transform-origin: center center;
}
.upload-pictures-clip {
  position: absolute;
  top: 0;
  left: 0;
}
.upload-pictures-clip img {
  width: 100%;
  height: 100%;
}
.upload-pictures-sure {
  margin: 20px auto;
}
.upload-pictures-sure button {
  margin: 0 auto;
  display: block;
  cursor: pointer;
  outline: none;
  border: none;
  min-width: 100px;
  min-height: 40px;
  border-radius: 5px;
  background-color: #3eaf7c;
  color: #fff;
}
</style>

<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{'image-uploader__preview-loading': imageId}"
      :style="imageId ? `--bg-image: url(${getImageUrl(imageId)})` : ''"
    >
      <span v-if="loading === false && imageId === null">Загрузить изображение</span>
      <span v-if="loading && imageId === null">Загрузка...</span>
      <span v-if="imageId !== null">Удалить изображение</span>

      <input
        type="file"
        accept="image/*"
        class="form-control-file"
        ref="fileControl"
        @change="uploadFile"
        @click="removeImage($event)"
        :disabled="loading"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from '../image-service';

export default {
  name: 'ImageUploader',

  data() {
    return {
      loading: false,
    }
  },

  props: {
    imageId: {
      default: null,
      type: Number
    }
  },

  model: {
    prop: 'imageId',
    event: 'change'
  },

  methods: {
    uploadFile() {
      if (!this.imageId) {
        let file = this.$refs.fileControl.files[0];
        this.loading = true;
        ImageService.uploadImage(file).then((obj) => {
          this.loading = false;
          this.$emit('change', obj.id);
        });
      }
    },

    removeImage($event) {
      if (this.imageId) {
        this.$emit('change', null);
        this.$refs.fileControl.value = '';
        $event.preventDefault();
      }
    },

    getImageUrl(id) {
      return ImageService.getImageURL(id);
    }
  }
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>

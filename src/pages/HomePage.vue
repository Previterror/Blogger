<script setup>
import { computed, onMounted } from 'vue';
import { blogsService } from '../services/BlogsService.js';
import { AppState } from '../AppState.js';
import BlogCard from '../components/BlogCard.vue';

import ModalForm from '../components/ModalForm.vue';


const blogs = computed(() => AppState.blogs)
onMounted(() => getBlogPosts())

async function getBlogPosts() {
  try {
    await blogsService.getBlogPosts()
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <section class="container">
    <div class="row justify-content-center m-3">
      <button v-if="AppState.account" class="btn btn-info col-6" data-bs-toggle="modal"
        data-bs-target="#exampleModal">New Post <i class="mdi mdi-plus"></i></button>
    </div>
    <ModalForm />
    <BlogCard class="" v-for="blog in blogs" :key="blog.id" :blog="blog" />
  </section>
</template>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>

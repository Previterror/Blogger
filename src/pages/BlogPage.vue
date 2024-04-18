<script setup>
import { onMounted, computed } from 'vue';
import { AppState } from '../AppState.js';
import { useRoute } from 'vue-router';
import { blogsService } from '../services/BlogsService.js';


const route = useRoute()
const blog = computed(() => AppState.activeBlog)


onMounted(() => setActive())

function setActive() {
    blogsService.getBlogById(route.params.blogId)
}
</script>


<template>
    <section v-if="blog" class="container border border-dark m-3">
        <div class="row">
            <div class="col">
                <div class="row p-3">
                    <img :src="blog.imgUrl" alt="" class="img-fluid">
                </div>
                <div class="row justify-content-around">
                    <RouterLink :to="{ name: 'Profile', params: { profileId: blog.creatorId } }"
                        class="col-3 profile justify-content-center">
                        <img :src="blog.creator.picture" alt="" class="img-fluid">
                    </RouterLink>
                    <div class="col-8">
                        <h5>{{ blog.title }}</h5>
                        <RouterLink :to="{ name: 'Profile', params: { profileId: blog.creatorId } }">{{
                            blog.creator.name }}
                        </RouterLink>
                        <p>Last updated: {{ blog.updatedAt.toLocaleDateString() }}</p>
                    </div>
                </div>
                <div class="row p-3">
                    <p>{{ blog.body }}</p>
                </div>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
.project-img {
    width: 100%;
    height: 20vh;
    object-fit: cover;
    object-position: center;
}

.profile {
    display: flex;
    align-items: baseline;

    img {
        height: 70px;
        aspect-ratio: 1/1;
        border-radius: 50em;
        object-fit: cover;
        object-position: center
    }
}

img {
    height: 30dvh;
    object-fit: cover;
    object-position: center;
    border-radius: 50px;
}
</style>
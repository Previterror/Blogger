<script setup>
import { onMounted, computed } from 'vue';
import { AppState } from '../AppState.js';
import { useRoute } from 'vue-router';
import { blogsService } from '../services/BlogsService.js';
import BlogCard from '../components/BlogCard.vue';


const route = useRoute()
const profile = computed(() => AppState.activeProfile)
const blogs = computed(() => AppState.blogs)
//let profblog = blogs.value.filter(blog => blog.creatorId == profile.value.id)

onMounted(() => getProfileById())
onMounted(() => getBlogPosts())

async function getProfileById() {
    try {
        await blogsService.getProfileById(route.params.profileId)
    } catch (error) {
        console.log(error)
    }
}

async function getBlogPosts() {
    try {
        await blogsService.getBlogPosts()
        AppState.blogs = AppState.blogs.filter(blog => blog.creatorId == profile.value.id)
        console.log("filtered blogs", blogs)
    } catch (error) {
        console.log(error)
    }
}

</script>


<template>
    <section v-if="profile" class="container">
        <div class="row profile p-3">
            <div class="col-3">
                <img :src="profile.picture" alt="" class="img-fluid">
            </div>
            <div class="col">
                <p class="fs-3">{{ profile.name }}</p>

            </div>
            <BlogCard v-for="blog in blogs" :key="blog.id" :blog="blog" />

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
        width: 140px;
        aspect-ratio: 1/1;
        border-radius: 50em;
        object-fit: cover;
        object-position: center
    }
}
</style>
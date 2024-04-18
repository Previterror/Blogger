<script setup>
import { AppState } from '../AppState.js';
import { Account } from '../models/Account.js';
import { Blog } from '../models/Blog.js';
import { blogsService } from '../services/BlogsService.js';
import Pop from '../utils/Pop.js';



defineProps({ blog: { type: Blog, required: true } })

function setActiveBlogPost(blogId) {
    blogsService.setActiveBlogPost(blogId)
}

async function destroyPost(blogId) {
    try {
        const confirm = await Pop.confirm("Delete Post?")
        if (!confirm) return
        await blogsService.destroyPost(blogId)
    } catch (error) {
        console.log(error)
    }
}

</script>


<template>
    <section class="row border border-dark rounded m-3 shadow p-2">
        <div class="col-8">
            <RouterLink :to="{ name: 'Profile', params: { profileId: blog.creatorId } }" class="profile m-1 p-1">
                <img :src="blog.creator.picture" alt=""><span>{{ blog.creator.name }}</span>
            </RouterLink>

            <RouterLink :to="{ name: 'ActiveBlog', params: { blogId: blog.id } }" @click="setActiveBlogPost(blog.id)">{{
                blog.title }}
            </RouterLink>

            <!-- <p>{{ blog.body }}</p> -->
            <p>{{ blog.createdAt.toLocaleDateString() }}</p>
        </div>
        <div class="col-4 d-flex align-items-center">
            <img :src="blog.imgUrl" alt="" class="img-fluid rounded">
        </div>

        <div v-if="AppState.account?.id == blog.creatorId">
            <button class="btn btn-danger" @click="destroyPost(blog.id)"><i class="mdi mdi-delete"></i></button>
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
        height: 35px;
        aspect-ratio: 1/1;
        border-radius: 50em;
        object-fit: cover;
        object-position: center
    }
}
</style>
<script setup>
import { onMounted, ref } from 'vue';
import { blogsService } from '../services/BlogsService.js';
import { Modal } from 'bootstrap';

const blogPostData = ref({
    title: '',
    body: '',
    imgUrl: '',
    tags: [],
})

async function createBlogPost() {
    try {
        await blogsService.createBlogPost(blogPostData.value)

        blogPostData.value = {
            title: '',
            body: '',
            imgUrl: '',
            tags: [],
        }
        Modal.getOrCreateInstance('#exampleModal').hide()
    } catch (error) {
        console.log(error)
    }
}

</script>


<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">New Blog Post!</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <form @submit.prevent="createBlogPost()">
                        <div class="form-floating mb-3">
                            <input v-model="blogPostData.title" type="text" class="form-control" id="title"
                                placeholder="Blog Title" required maxLength="100">
                            <label for="title">Post Title</label>
                        </div>

                        <div class="form-floating mb-3">
                            <textarea v-model="blogPostData.body" type="text" class="form-control" id="body"
                                placeholder="Blog Body" cols="30" rows="10" required maxLength="10000"></textarea>
                            <label for="body">Blog</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input v-model="blogPostData.tags" type="text" class="form-control" id="tags"
                                placeholder="Blog Tags" required maxLength="50">
                            <label for="tags">Tags</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input v-model="blogPostData.imgUrl" type="url" class="form-control" id="imgUrl"
                                placeholder="Blog Image" required maxLength="500">
                            <label for="imgUrl">ImgUrl</label>
                        </div>
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>
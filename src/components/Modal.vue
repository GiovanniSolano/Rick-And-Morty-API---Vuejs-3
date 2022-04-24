<template>
    <div class="modal modal-active animate__animated animate__fadeIn animate__fast" tabindex="-1" role="dialog">

        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content rounded-0">
                <div class="modal-header">
                    <h5 class="modal-title">{{newTitle}}</h5>
                    <button type="button" @click="$emit('on:close')" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <slot name="body_title" />
                    <slot name="body" />

                    <!-- <slot name="exposed" :newTitle="newTitle"></slot> -->
                </div>
                <div class="modal-footer">
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </div>
  
</template>

<script>
export default {
    props: ['title'],
    emits: ['on:close'],
    setup(props) {

        return {
            newTitle: props.title?.toUpperCase()
        }

    }

}
</script>

<style scoped>

.modal-active{
	display: block;    
}

.modal-content {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;}
</style>
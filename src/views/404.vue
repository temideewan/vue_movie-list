<template>
    <div class="notFound">
        <h2>404</h2>
        <p>Looks like you might have missed a turn 🙁</p>
        <div class="navigate">
            <button @click="pop">Back where you came from</button>
            <button @click="home">Back home</button>
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            pop(){
                this.$router.go(-1);
            },
            home(){
                this.$router.push({path:"/"})
            }

        }
    }
</script>

<style scoped>

.notFound{
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.034);
    padding: 20px 120px;
    height: 100vh;
}

.notFound h2{
    font-size: 70px;
    margin-bottom: 20px;
}

.notFound p{
    margin-bottom: 10px;
    font-size: 21px;
    color: rgb(6, 5, 17);
}

.navigate button{
    margin: 0 10px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 13px;
    letter-spacing: 1.2px;
    cursor: pointer;
    background-color:rgb(199, 195, 156);
    box-shadow: 0 5px 10px rgba(0,0,0,0.12);
    transition: all .3s ease;
}
.navigate button:hover{
    transform: translateY(-1px);
    background-color:  rgb(245, 234, 192);
}
</style>
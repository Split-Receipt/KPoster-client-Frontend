<template>
	<div class="passRestore">
		<h2 class="passRestore-title">Recuperación de contraseña</h2>
		<span class="passRestore-info">Se enviará un correo electrónico con instrucciones para restablecer la contraseña.</span>
		<cp-text-input class="passRestore-email" type="email" placeholder="email"/>
		<cp-button 
			class="passRestore-btn"
			text="Recuperar contraseña"
			size="small"
		/>
	</div>
</template>

<script setup lang="ts">
import CpButton from '@shared/gui/CpButton.vue';
import CpTextInput from '@shared/gui/CpTextInput.vue';
</script>

<style scoped lang="scss">
 .passRestore {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center; 

    &-title {
        margin-bottom: 40px;
        margin-top: 80px;
        font-size: 30px;
        width: 100%;
        line-height: 42px;
        font-weight: 500;
        text-align: center;
        color: #353333;
        cursor: default
    }

    &-info {
        text-align: center;
        font-size: 22px;
        line-height: 35.2px;
        font-weight: 400;
        color: #888888;
    }

    &-email {
        margin-top: 25px;
        margin-bottom: 25px;
    }

    &-btn {
        width: 100%;
    }

    span {
        text-decoration: none;
        cursor: pointer;
        color: #888888;
        font-size: 14px;
        font-weight: 500;
        line-height: 22.4px;
        margin-top: 5px;
    }
 }
</style>
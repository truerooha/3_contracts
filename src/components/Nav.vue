<template>
  <Dialog
      v-show="isDialogVisible"
      question="Будет выполнен выход из системы. Продолжить?"
      confirmText="Да"
      cancelText="Нет"
      buttonType = "success"
      @close="closeModal"
      @confirm="handleConfirm"
    />
  <div class="navigation">
    <div class="lists">
      <div @click="gotoMain" class="comp-details">
        <div class="logo"><span class="green">.</span>contracts</div>
      </div>
      <div class="mini-profile">
        <img src="@/assets/user.jpeg" alt="" class="mp-logo">
        <div class="user-name">
           <div class="user-firstname">Владимиров</div>
           <div class="user-secondname">Касила</div>
        </div>
      </div>
      <ul class="top-links">
        <router-link class="nav-link" :class="{ active: $route.path === '/main' }" to="/main">
          <div class="icon-container">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.14383 10.035V20.5715C4.14383 20.761 4.21909 20.9427 4.35306 21.0766C4.48702 21.2106 4.66872 21.2859 4.85817 21.2859H9.14421V15.214C9.14421 14.9298 9.2571 14.6572 9.45805 14.4563C9.659 14.2554 9.93154 14.1425 10.2157 14.1425H13.7874C14.0716 14.1425 14.3441 14.2554 14.5451 14.4563C14.746 14.6572 14.8589 14.9298 14.8589 15.214V21.2859H19.145C19.3344 21.2859 19.5161 21.2106 19.6501 21.0766C19.784 20.9427 19.8593 20.761 19.8593 20.5715V10.035M22.0005 11.9994L12.486 2.89155C12.2627 2.65582 11.7408 2.65314 11.5136 2.89155L1.99902 11.9994M18.4302 8.56169V3.42737H16.2872V6.50796" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          Главная
        </router-link>
        <router-link class="nav-link" :class="{ active: $route.path === '/contracts' }" to="/contracts">
          <div class="icon-container">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.4993 10.368V19.4969C19.4993 20.0937 19.2622 20.666 18.8403 21.0879C18.4183 21.5099 17.846 21.7469 17.2493 21.7469H6.74927C6.15253 21.7469 5.58023 21.5099 5.15828 21.0879C4.73632 20.666 4.49927 20.0937 4.49927 19.4969V4.49695C4.49927 3.90021 4.73632 3.32791 5.15828 2.90596C5.58023 2.484 6.15253 2.24695 6.74927 2.24695H11.3782C11.7759 2.24701 12.1572 2.40499 12.4385 2.68617L19.06 9.30773C19.3412 9.58897 19.4992 9.97035 19.4993 10.368Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              <path d="M11.9989 2.62207V8.24707C11.9989 8.6449 12.1569 9.02643 12.4382 9.30773C12.7195 9.58904 13.1011 9.74707 13.4989 9.74707H19.1239" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.24915 13.4971H15.7491" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.24915 17.2471H15.7491" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          Договоры
        </router-link>
        <router-link class="nav-link" :class="{ active: $route.path === '/counterparties' }" to="/counterparties">
          <div class="icon-container">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.8417 7.8717C18.7043 9.77811 17.2901 11.2467 15.7479 11.2467C14.2057 11.2467 12.7892 9.77858 12.6542 7.8717C12.5135 5.88842 13.8903 4.4967 15.7479 4.4967C17.6056 4.4967 18.9823 5.92452 18.8417 7.8717Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15.748 14.2468C12.6931 14.2468 9.75548 15.7642 9.01955 18.7192C8.92205 19.1101 9.1672 19.4968 9.56892 19.4968H21.9275C22.3292 19.4968 22.573 19.1101 22.4769 18.7192C21.741 15.7168 18.8033 14.2468 15.748 14.2468Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"/>
              <path d="M9.37496 8.71289C9.26527 10.2354 8.12246 11.4344 6.89058 11.4344C5.65871 11.4344 4.51402 10.2359 4.40621 8.71289C4.29418 7.12898 5.40652 5.99695 6.89058 5.99695C8.37465 5.99695 9.48699 7.15804 9.37496 8.71289Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.65512 14.3403C8.80903 13.9527 7.87715 13.8036 6.8895 13.8036C4.452 13.8036 2.10356 15.0153 1.51528 17.3755C1.43793 17.6877 1.63387 17.9966 1.9545 17.9966H7.21762" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
            </svg>

          </div>
          Контрагенты
        </router-link>
        <router-link class="nav-link" :class="{ active: $route.path === '/search' }" to="/search">
          <div class="icon-container">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.6972 13.6995L16.1901 16.1924M11.9997 2.99902C10.2195 2.99902 8.47935 3.5269 6.9992 4.51591C5.51904 5.50492 4.3654 6.91063 3.68416 8.55529C3.00292 10.1999 2.82468 12.0097 3.17197 13.7556C3.51927 15.5016 4.3765 17.1054 5.63526 18.3641C6.89403 19.6229 8.4978 20.4801 10.2438 20.8274C11.9897 21.1747 13.7995 20.9965 15.4441 20.3152C17.0888 19.634 18.4945 18.4804 19.4835 17.0002C20.4725 15.5201 21.0004 13.7799 21.0004 11.9997C21.0004 9.61257 20.0521 7.32321 18.3641 5.63526C16.6762 3.94731 14.3868 2.99902 11.9997 2.99902ZM11.2359 7.81269C10.5579 7.81269 9.89514 8.01374 9.33141 8.39041C8.76768 8.76708 8.32831 9.30246 8.06885 9.92884C7.8094 10.5552 7.74151 11.2445 7.87378 11.9094C8.00605 12.5744 8.33254 13.1852 8.81195 13.6646C9.29136 14.144 9.90217 14.4705 10.5671 14.6028C11.2321 14.7351 11.9213 14.6672 12.5477 14.4077C13.1741 14.1483 13.7095 13.7089 14.0862 13.1452C14.4628 12.5814 14.6639 11.9187 14.6639 11.2407C14.6639 10.7905 14.5752 10.3447 14.4029 9.92884C14.2307 9.51294 13.9782 9.13504 13.6598 8.81672C13.3415 8.49841 12.9636 8.2459 12.5477 8.07363C12.1318 7.90136 11.6861 7.81269 11.2359 7.81269Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
            </svg>
          </div>
          Поиск
        </router-link>
      
      </ul>
      <ul class="bottom-links">
        <router-link class="nav-link" :class="{ active: $route.path === '/settings' }" to="/settings">
          <div class="icon-container">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.2975 9.01136C11.6819 8.95057 11.0627 9.08152 10.5244 9.38627C9.98622 9.69103 9.55534 10.1547 9.29082 10.7138C9.02629 11.2729 8.94104 11.9001 9.04675 12.5095C9.15245 13.1189 9.44393 13.6808 9.88129 14.1182C10.3187 14.5555 10.8805 14.847 11.4899 14.9527C12.0993 15.0584 12.7265 14.9732 13.2856 14.7086C13.8447 14.4441 14.3084 14.0132 14.6132 13.475C14.9179 12.9368 15.0489 12.3175 14.9881 11.702C14.9188 11.012 14.613 10.3671 14.1227 9.87677C13.6323 9.3864 12.9875 9.08066 12.2975 9.01136V9.01136ZM19.5209 11.9968C19.519 12.3229 19.495 12.6485 19.4492 12.9714L21.5684 14.6335C21.6607 14.71 21.7229 14.8168 21.7439 14.9348C21.7649 15.0528 21.7434 15.1744 21.6832 15.2781L19.6784 18.7468C19.6175 18.8495 19.5223 18.9274 19.4097 18.9667C19.297 19.0061 19.174 19.0044 19.0625 18.962L16.9578 18.1145C16.8417 18.0683 16.716 18.0516 16.5919 18.0659C16.4678 18.0802 16.3492 18.1251 16.2467 18.1965C15.9255 18.4177 15.5879 18.6142 15.237 18.7843C15.1267 18.8379 15.0312 18.9179 14.9591 19.0172C14.887 19.1164 14.8405 19.2319 14.8236 19.3534L14.5081 21.5982C14.4874 21.7168 14.4261 21.8245 14.3348 21.9029C14.2435 21.9813 14.1278 22.0255 14.0075 22.0281H9.99778C9.87944 22.026 9.76532 21.9837 9.67424 21.9082C9.58315 21.8326 9.52053 21.7282 9.49668 21.6123L9.18168 19.3707C9.16399 19.2479 9.11622 19.1313 9.04262 19.0314C8.96902 18.9315 8.87187 18.8513 8.75981 18.7979C8.40928 18.6287 8.07289 18.4317 7.75387 18.2087C7.65173 18.1376 7.53351 18.0931 7.40986 18.0791C7.28622 18.0651 7.16103 18.0821 7.04559 18.1285L4.94137 18.9756C4.82986 19.018 4.70694 19.0198 4.59426 18.9805C4.48159 18.9412 4.38639 18.8635 4.32543 18.7609L2.32059 15.2921C2.26031 15.1885 2.23877 15.0668 2.2598 14.9488C2.28083 14.8308 2.34307 14.724 2.43543 14.6476L4.22653 13.2414C4.32465 13.1635 4.40177 13.0623 4.45089 12.947C4.5 12.8318 4.51956 12.7061 4.50778 12.5814C4.4909 12.3859 4.48059 12.1909 4.48059 11.9954C4.48059 11.8 4.49043 11.6078 4.50778 11.4165C4.51827 11.2925 4.49776 11.1679 4.44809 11.0538C4.39842 10.9398 4.32115 10.8398 4.22324 10.7631L2.43309 9.35683C2.34223 9.27999 2.2813 9.17364 2.26099 9.05639C2.24068 8.93915 2.26227 8.81849 2.32199 8.71558L4.32684 5.24683C4.38772 5.14416 4.48289 5.06629 4.59557 5.02693C4.70825 4.98757 4.83121 4.98925 4.94278 5.03167L7.04746 5.87917C7.16353 5.92538 7.28924 5.94208 7.41335 5.92776C7.53745 5.91344 7.65606 5.86856 7.75856 5.79714C8.07977 5.57595 8.4173 5.37944 8.76824 5.20933C8.87858 5.1557 8.97401 5.07573 9.04611 4.97649C9.11822 4.87724 9.16478 4.76177 9.18168 4.64026L9.49715 2.39542C9.51787 2.27686 9.57912 2.16918 9.67043 2.09078C9.76174 2.01238 9.87745 1.96812 9.99778 1.96558H14.0075C14.1258 1.96762 14.2399 2.00992 14.331 2.0855C14.4221 2.16108 14.4847 2.26543 14.5086 2.38136L14.8236 4.62292C14.8412 4.74576 14.889 4.86233 14.9626 4.96227C15.0362 5.0622 15.1334 5.1424 15.2454 5.19573C15.596 5.36493 15.9323 5.56197 16.2514 5.78495C16.3535 5.85602 16.4717 5.90056 16.5954 5.91455C16.719 5.92854 16.8442 5.91155 16.9597 5.86511L19.0639 5.01808C19.1754 4.97561 19.2983 4.97386 19.411 5.01314C19.5237 5.05241 19.6189 5.13019 19.6798 5.23276L21.6847 8.70151C21.7449 8.80515 21.7665 8.92681 21.7454 9.04484C21.7244 9.16287 21.6622 9.26961 21.5698 9.34604L19.7787 10.7523C19.6802 10.8299 19.6026 10.931 19.5531 11.0463C19.5035 11.1615 19.4836 11.2874 19.4951 11.4123C19.5106 11.6064 19.5209 11.8014 19.5209 11.9968Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          Настройки
        </router-link>
        <router-link class="nav-link" :class="{ active: $route.path === '/support' }" to="/support">
          <div class="icon-container">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9997 2.99915C10.2195 2.99915 8.47935 3.52703 6.9992 4.51603C5.51904 5.50504 4.3654 6.91075 3.68416 8.55541C3.00292 10.2001 2.82468 12.0098 3.17197 13.7558C3.51927 15.5017 4.3765 17.1055 5.63526 18.3643C6.89403 19.623 8.4978 20.4803 10.2438 20.8276C11.9897 21.1748 13.7995 20.9966 15.4441 20.3154C17.0888 19.6341 18.4945 18.4805 19.4835 17.0003C20.4725 15.5202 21.0004 13.78 21.0004 11.9998C21.0004 9.61269 20.0521 7.32334 18.3641 5.63538C16.6762 3.94743 14.3868 2.99915 11.9997 2.99915Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"/>
              <path d="M9.1344 9.25349C9.1344 9.25349 9.17736 8.35853 10.1352 7.58785C10.7034 7.13014 11.3846 6.99769 11.9983 6.98849C12.5572 6.98133 13.0563 7.07389 13.355 7.21606C13.8664 7.45949 14.8621 8.05374 14.8621 9.31741C14.8621 10.6471 13.9927 11.251 13.0021 11.9153C12.0115 12.5796 11.7425 13.3007 11.7425 14.0458" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
              <path d="M11.6957 17.7278C12.2605 17.7278 12.7184 17.2699 12.7184 16.705C12.7184 16.1402 12.2605 15.6823 11.6957 15.6823C11.1309 15.6823 10.673 16.1402 10.673 16.705C10.673 17.2699 11.1309 17.7278 11.6957 17.7278Z" fill="currentColor"/>
            </svg>
          </div>
          Помощь
        </router-link>
        <div class="spacer"></div>
        <div id="logout" @click="showModal" class="nav-link">
          <div class="icon-container">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.2482 15.7469V17.6219C14.2482 18.1192 14.0622 18.5961 13.7309 18.9478C13.3997 19.2994 12.9504 19.4969 12.482 19.4969H5.4169C4.94846 19.4969 4.4992 19.2994 4.16796 18.9478C3.83672 18.5961 3.65063 18.1192 3.65063 17.6219V6.37195C3.65063 5.87467 3.83672 5.39775 4.16796 5.04612C4.4992 4.69449 4.94846 4.49695 5.4169 4.49695H12.1287C13.1041 4.49695 14.2482 5.33648 14.2482 6.37195V8.24695" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17.2501 15.7469L21.0001 11.9969L17.2501 8.24695" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.25024 11.9968H20.2502" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          Выход
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import Dialog from './Dialog.vue';

export default {
  components: { Dialog },
    name: 'Navigation',
    methods: {
      gotoMain() {
        this.$router.push('/main');  
      },
      handleConfirm() {
        this.$router.push('/login');
        localStorage.removeItem('token');
      },
      showModal() {
      this.isDialogVisible = true;
      },
      closeModal() {
        this.isDialogVisible = false;
      },
    },
  data() {
    return {
      isDialogVisible: false,
    };
  }
}
</script>

<style scoped>
#logout {
  cursor: pointer;
}

.user-name {
  display: flex;
  flex-direction: column;
  align-items:flex-start;
  padding-left: 20px;
  width: 100%;
  font-weight: 700;
}

.mini-profile {
  margin-top: 40px;
  display: flex;
  width: 100%;
}

.mini-profile:hover {
  cursor: pointer;
  background: #F7FAFC;
  border-radius: 30px;
}

.mp-logo {
  width: 48px;
  border-radius: 100%;
}

.logo {
  font-size: 24px;
}

.green {
  color: #31C48D
}

.ava {
  width: 36px;
  margin-right: 10px;
  border-radius: 50%;
}

.comp-details {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  width: 100%;
  border-bottom: 1px solid #EDF2F7;
  cursor: pointer;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  width: 28px;
}

.icon {
  width: 24px;
  margin-right: 10px;
  color: currentColor;
}

.icon-search {
  width: 28px;
  margin-right: 10px;
  color: currentColor;
}

.navigation {
    width: 240px;
    height: 100vh;
    padding: 10px;
}

.lists {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
}

.lists ul {
    list-style-type: none;
    padding: 0;
}

.bottom-links {
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: auto;
  margin-bottom: 40px; 
}

.bottom-links .nav-link {
    margin-top: 10px;
}

.spacer {
  border-bottom: 1px solid #EDF2F7;
  height: 10px;
  margin-left: 20px;
}

.lists .nav-link {
    display: flex;
    text-decoration: none;
    align-items: center;
    padding: 10px;
    margin-left: 10px;
    margin-top: 10px;
    font-size: 11pt;
    color: #666952;

}

.lists .nav-link:hover {
  color: #718096;
  background: #F3FAF7;
  border-radius: 12px;

}

.lists .nav-link.active {
  font-weight: 900;
  color: #31C48D;
  border-radius: 12px;
  background: #F3FAF7;
}

</style>
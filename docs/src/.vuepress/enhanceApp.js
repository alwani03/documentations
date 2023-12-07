import { checkAuth } from './login/helper'
import Login from './login/Login'

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.mixin({
    mounted() {
      const doCheck = () => {
        if (!checkAuth()) {
          this.$dlg.modal(Login, {
            width: 300,
            height: 350,
            title: 'Login Documentations',
            singletonKey: 'employee-login',
            maxButton: false,
            closeButton: false,
            callback: data => {
              console.log('----',data)
              if (data === true) {
                // do some stuff after login
              }else{
                Swal.fire({
                  title: 'Error!',
                  text: 'gagal login',
                  icon: 'error',
                  confirmButtonText: 'Cool'
  })
              }
            }
          })
        }
      }

      if (this.$dlg) {
        doCheck()
      } else {
        import('v-dialogs').then(resp => {
          Vue.use(resp.default)
          this.$nextTick(() => {
            doCheck()
          })
        })
      }
    }
  })
}
import { checkAuth } from './login/helper'
import Login from './login/Login'
import Swal from 'sweetalert2'

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
              if (data === true) {
                Swal.fire({
                  title: "Berhasil",
                  text: "Login",
                  icon: "success"
                });
              }else{
                Swal.fire({
                  title: "Username atau Password Salah",
                  icon: "error",
                  confirmButtonText: "Okk",
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    location.reload()
                  } 
                });
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
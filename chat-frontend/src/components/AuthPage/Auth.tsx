import { Field, Form, Formik } from "formik"
import Cookies from "js-cookie"
import { useHistory } from "react-router"
import { getApiUrl } from "../../shared/api"
import "./style.css"
export const AuthPage = () => {
    const history = useHistory()
    return(
        <div className="root">
            <Formik onSubmit={(value,event) => {
                const data = {
                    login: value.login,
                    password: value.password
                 }
                value.login && value.password && fetch(getApiUrl("login"), {
                    method: "POST",
                    body: JSON.stringify(data) ,
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }).then(async (response) => {
                    await response.json().then(res => Cookies.set("token", res.access_token))
                    
                    history.push('chat')
                    window.location.reload(true)
                  }).catch(error => {
                      alert(`${error}`)
                  })
            }} initialValues={{login: '', password: ''}}>
             {() => {
                 return(
                    <Form className="form">
                       <div className="title"> Авторизация </div>
                     <Field className="input" placeholder="Логин" name={'login'} />
                     <Field className="input" placeholder="Пароль" type="password" name={'password'} />
                     <br />
                     <button className="btn_submit" type='submit'>Войти</button>
                     <div style={{color: 'white'}} onClick={() =>  history.push('rega') }>Регистрация</div>
                    </Form>
                 )
             }}
            </Formik>
        </div>
    )
}
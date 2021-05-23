import { Field, Form, Formik } from "formik"
import { useState } from "react"
import { getApiUrl } from "../../shared/api"
import "./style.css"
import {useHistory} from 'react-router-dom'
export const RegPage = () => {
    const [status, setStatus] = useState('')
    const colorPicker = status === "Имя занято" ? "red" : status === "Регистрация успешна" ? "#00ff2a" : "red"
    const history = useHistory()
    return(
        <div className="root">
            <Formik onSubmit={(value) => {
                const data = {
                    login: value.login,
                    password: value.password
                 }
                value.login && value.password && fetch(getApiUrl("user/create"), {
                    method: "POST",
                    body: JSON.stringify(data) ,
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }).then(res => {
                    setStatus(res.status === 400 ? "Имя занято" : "Регистрация успешна")
                   res.status === 201 && setTimeout(() => history.push('/login'), 1000)
                  }).catch(error => {
                      setStatus(`${error}`)
                  })
            }} initialValues={{login: '', password: ''}}>
             {() => {
                 return(
                    <Form className="form">
                       <div className="title"> Регистрация </div>
                     <Field className="input" placeholder="Логин" name={'login'} />
                     <Field className="input" placeholder="Пароль" type="password" name={'password'} />
                     <br />
                     <button className="btn_submit" type='submit'>Submit</button>
                     <div style={{fontSize: 14,fontWeight: "bold",color: colorPicker }}>{status}</div>
                    </Form>
                 )
             }}
            </Formik>
        </div>
    )
}
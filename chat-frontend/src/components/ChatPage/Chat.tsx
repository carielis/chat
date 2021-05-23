import Cookies from "js-cookie"
import { createRef, useEffect, useRef, useState } from "react"
import { getApiUrl } from "../../shared/api"
import { WS } from "../../shared/socket"
import { getToken } from "../../shared/token"
import {useHistory} from 'react-router-dom'
import './style.css'


export const ChatPage = () => {
    const [user,setUser] = useState('')
    const [text, setText] = useState('')
    const [messages,setMessages] = useState([])
    const chat: any = useRef(null)
    
    const history = useHistory()
    useEffect(() => {
      fetch(getApiUrl("login/checkMe"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.statusCode === 401) {
            Cookies.remove("token")
            history.push('login')
          }
          setUser(response.username)
         
        })
        WS.on("init", (message: any) => {
          setMessages(message)
        })
        chat.current.scrollTop = chat.current.scrollHeight
        chat.current.scrollIntoView({
          behavior: 'smooth'
        })
    },[history, user, messages,setMessages])
    return (
        <div>
            <div style={{color: 'white'}} onClick={() => {{
               Cookies.remove("token")
               setUser('')
            }}}>press for logout</div>
            <div className="chatRoot">
              <div ref={chat} className="content">
                {messages.map((el: any) => {
                  return(
                   <div>{el.send_by}: {el.text_message}</div>
                  )
                })}
              </div>
              <div className="boxInput">
                <textarea value={text} onChange={event => setText(event.target.value) }  className="inputMessage" />
                <button className="btnMessage" onClick={async () => {
                   await WS.emit("create", {
                    send: user,
                    text: text,
                  })
                  setText('')
                }} >Отправить</button>
              </div>
            </div>
        </div>
    )
}
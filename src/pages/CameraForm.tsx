import { useState } from "react";
import Header from "../components/header/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styled.css"
import { faArrowCircleLeft, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const URL_API =  "http://localhost:5000/cameras"

interface CameraFormProps {
    navigation: Navigation;
}


function CameraForm({ navigation }: CameraFormProps){

    const [title, setTitle] = useState("")
    const [external, setExternal] = useState(false)
    const [plan, setPlan] = useState("1dia")
    
    const onSubmitFunction = () => {
        
            const newCam = {title, external, plan}
            
            const requestOptions = {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify (newCam)
            }

            async function postApi(){
                const response = await fetch(URL_API, requestOptions)
            }
            postApi()
        }



    return(
    <>
    <Header button = {<FontAwesomeIcon className="returnButton" icon={faArrowLeft} color = "red" size = '2x' onClick={() => navigation.goBack()}/>}/>
    <form onSubmit = {(e) => {e.preventDefault(), onSubmitFunction(), navigation.goBack()}}>
    <label>Nome da Câmera</label>
    <input value={title} type="text" onChange={(e) => setTitle(e.target.value)} />
    <label>Plano  de gravação</label> 
    <select value = {plan}  onChange={(e) => setPlan(e.target.value)}>
        <option value="1dia">1 dia gravação</option>
        <option value="3dia">3 dias gravação</option>
        <option value="7dia">7 dias gravação</option>
    </select>
    <div>
    <label>Câmera Externa</label> <input type="checkbox" onChange={(e) => setExternal(e.target.checked)}/>
    </div>
    <button className="saveButton" type="submit"  >Salvar</button>
    </form>
    </>
    )

}


export default CameraForm
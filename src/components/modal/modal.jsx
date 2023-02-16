import { useState } from "react";
import "./styled.css"

const URL_API =  "http://localhost:5000/cameras"

function CameraPut({cam,exit}){
    const [title, setTitle] = useState(cam.title)
    const [external, setExternal] = useState(cam.external)
    const [plan, setPlan] = useState(cam.plan)

    const onSubmitFunction = () => {
        
            const updateCam = {title, external, plan}
             
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(updateCam)
            }

            async function updateApi(){
                const response = await fetch(`http://localhost:5000/cameras/${cam.id}`, requestOptions)
            }
            updateApi()
            exit(false)
        }

    return(
    <>
    <div className="background">
    <div>
    <h1>Atualize suas informações</h1>
    <button onClick={() => exit(false)}>X</button>
    </div>
    <form className = "modal"  onSubmit = {(e) => {e.preventDefault(), onSubmitFunction()}}>
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
    </div>
    </>
    )

}


export default CameraPut
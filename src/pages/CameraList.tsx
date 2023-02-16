import { StatusBar } from 'expo-status-bar';
import { useState,  useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../components/header/header';
import "./styled.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil} from '@fortawesome/free-solid-svg-icons';
import CameraPut from '../components/modal/modal';


const URL_API =  "http://localhost:5000/cameras"

interface CameraListProps {
    navigation: Navigation;
}
interface Camera {
    image_url: string;
    title: string;
    external: boolean;
    id: number;
    plan: "1dia" | "3dias" | "7dias"
}

export default function CameraList({ navigation }: CameraListProps) {

    const [updatePage, setUpdatePage] = useState(false)
    const [text,setText] =  useState('')
    const [camera, setCamera] = useState < Camera[] > ([])
    const [modal, setModal] = useState(false)
    const [updateCam, setUpdateCam] = useState({})

    async function getApi(){
        const response = await fetch(URL_API, {
            method: 'GET'
        })
        const data = await response.json()
        if(!data){
            setText(data.text)
            throw 'Requisition problems'
        }
        setCamera(data)
}
    async function deleteApi(id: number){
        const response = await fetch(`${URL_API}/${id}`, {
            method: 'DELETE'
        })
        await getApi()
    }

    function edit(cam, open: boolean){
        setModal(open)
        setUpdateCam(cam)
    }

    const cameraView = camera.map(item => {
        return (
            <li className='card' key={item.id}>
            <img src={item.image_url}/>
            <div>
                <FontAwesomeIcon icon={faPencil} color = "orange" size = '1x' onClick={() => edit(item, true)}/> <p>{item.title}</p> <FontAwesomeIcon icon={faTrashCan} color = "orange" size = '1x' onClick={() => deleteApi(item.id)}/>
            </div>
            </li>
        )
    })

    useEffect(() => {
        const interval = setInterval(() => {
            getApi();
        },  1000);
        return () => {
            if(interval) {
                clearInterval(interval);
            }
        };
    },[modal, updatePage])

    
    return (<>
            <Header button = {<button className="addButton" onClick={() => navigation.navigate("CameraForm")}>+</button>} />
             
        <View style={styles.container}>
            {modal === true ? (
                <CameraPut cam = {updateCam} exit = {setModal}/>
            ):(
                <>
                </>
                )}
            <ul>
            {cameraView}
            </ul>
            <StatusBar style="auto" />
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

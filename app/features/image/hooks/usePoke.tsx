import { useState } from "react";
import { apiPoke } from "../services/pokeApi";

export function usePoke() {
    const [name, setName] = useState('')
    const [namePoke, setNomePoke] = useState('')
    const [imagePoke, setImagePoke] = useState('')

    const sendNameApi = async () => {

        console.log(name)
        if (validateDate() == false)
            return false

        const dados = await apiPoke.getPokeName(name)

        const filterData = dados.kind === 'ok' ? dados.episodes : null
        if (!filterData)
            return false

        const stringHandle = filterData?.image.split(filterData.name)

        setNomePoke(filterData?.name + '')

        setImagePoke(stringHandle[0] + filterData.id + '.png')

        console.log(imagePoke)
        return true


    }
    const validateDate = () => {
        if (!name)
            return false

        return true
    }

    return {
        name,
        setName,
        sendNameApi,
        namePoke,
        imagePoke
    }






}
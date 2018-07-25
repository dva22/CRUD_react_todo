import axios from "axios/index";

export default function loadNotesUsers(url)
{
    return axios.get(url, {});
}
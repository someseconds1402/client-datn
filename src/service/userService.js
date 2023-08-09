import axios from "axios";
import { PATH_API } from "../constant/constant";

const handleLoginAPI = async(email, password) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.LOGIN_API, { email, password })).data;
    } catch (err) {
        console.log(err);
    }
}

const getProvinceDataAPI = async() => {
    try {
        return (await axios.get(PATH_API.BASE_URL + PATH_API.GET_PROVINCE_DATA)).data;
    } catch (err) {
        console.log(err);
    }
}

const getPandemicDataAPI = async() => {
    try {
        return (await axios.get(PATH_API.BASE_URL + PATH_API.GET_PANDEMIC_DATA)).data;
    } catch (err) {
        console.log(err);
    }
}

const getSupplyTypeDataAPI = async() => {
    try {
        return (await axios.get(PATH_API.BASE_URL + PATH_API.GET_SUPPLY_TYPE_DATA)).data;
    } catch (err) {
        console.log(err);
    }
}

const getMedicalSupplyDataAPI = async() => {
    try {
        return (await axios.get(PATH_API.BASE_URL + PATH_API.GET_MEDICAL_SUPPLY_DATA)).data;
    } catch (err) {
        console.log(err);
    }
}

const getEpidemicDataAPI = async(province_id, pandemic_id, date) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.GET_EPIDEMIC_DATA, { province_id, pandemic_id, date })).data;
    } catch (err) {
        console.log(err);
    }
}

const getSupplyQuantityAPI = async(province_id, pandemic_id) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.GET_SUPPLY_QUANTITY, { province_id, pandemic_id })).data;
    } catch (err) {
        console.log(err);
    }
}

const getAllEmail = async(email) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.GET_ALL_EMAIL, { email })).data;
    } catch (err) {
        console.log(err);
    }
}

const addUser = async(email, password) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.ADD_USER, { email, password })).data;
    } catch (err) {
        console.log(err);
    }
}

const deleteUser = async(email) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.DELETE_USER, { email })).data;
    } catch (err) {
        console.log(err);
    }
}

const getEpidemicDataOfAllProvincesAPI = async(pandemic_id, date) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.GET_EPIDEMIC_DATA_OF_ALL_PROVINCES, { pandemic_id, date })).data;
    } catch (err) {
        console.log(err);
    }
}

const getSupplyQuantityOfAllProvincesAPI = async(pandemic_id) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.GET_SUPPLY_QUANTITY_OF_ALL_PROVINCES, { pandemic_id })).data;
    } catch (err) {
        console.log(err);
    }
}

const clusterAPI = async(U, C, tagField, keys, weightList) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.CLUSTER, { U, C, tagField, keys, weightList })).data;
    } catch (err) {
        console.log(err);
    }
}

const getSupplyAbilityAPI = async(pandemic_id, supply_type_id) => {
    try {
        return (await axios.post(PATH_API.GET_SUPPLY_ABILITY, { pandemic_id, supply_type_id })).data;
    } catch (err) {
        console.log(err);
    }
}

const getDistributionDataAPI = async(start, end) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.GET_DISTRIBUTION_DATA, { start, end })).data;
    } catch (err) {
        console.log(err);
    }
}

const insertProvinceAPI = async(data) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.INSERT_PROVINCE, { data })).data;
    } catch (err) {
        console.log(err);
    }
}

const insertDistanceAPI = async(data) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.INSERT_DISTANCE, { data })).data;
    } catch (err) {
        console.log(err);
    }
}

const insertPandemicAPI = async(data) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.INSERT_PANDEMIC, { data })).data;
    } catch (err) {
        console.log(err);
    }
}

const insertSupplyTypeAPI = async(data) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.INSERT_SUPPLY_TYPE, { data })).data;
    } catch (err) {
        console.log(err);
    }
}

const insertSupplyMapPandemicAPI = async(data) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.INSERT_SUPPLY_MAP_PANDEMIC, { data })).data;
    } catch (err) {
        console.log(err);
    }
}

const insertMedicalSupplyAPI = async(data) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.INSERT_MEDICAL_SUPPY, { data })).data;
    } catch (err) {
        console.log(err);
    }
}


const insertInfectionSituationAPI = async(data) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.INSERT_INFECTION_SITUATION, { data })).data;
    } catch (err) {
        console.log(err);
    }
}

const insertRecoveredSituationAPI = async(data) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.INSERT_RECOVERED_SITUATION, { data })).data;
    } catch (err) {
        console.log(err);
    }
}

const insertDeathSituationAPI = async(data) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.INSERT_DEATH_SITUATION, { data })).data;
    } catch (err) {
        console.log(err);
    }
}

const insertLevelAPI = async(data) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.INSERT_LEVEL, { data })).data;
    } catch (err) {
        console.log(err);
    }
}

const insertSupplyQuantityAPI = async(data) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.INSERT_SUPPLY_QUANTITY, { data })).data;
    } catch (err) {
        console.log(err);
    }
}


const insertSupplyAbilityAPI = async(data) => {
    try {
        return (await axios.post(PATH_API.BASE_URL + PATH_API.INSERT_SUPPLY_ABILITY, { data })).data;
    } catch (err) {
        console.log(err);
    }
}

export {
    handleLoginAPI,
    getProvinceDataAPI,
    getPandemicDataAPI,
    getSupplyTypeDataAPI,
    getMedicalSupplyDataAPI,
    getEpidemicDataAPI,
    getSupplyQuantityAPI,
    getAllEmail,
    addUser,
    deleteUser,
    getEpidemicDataOfAllProvincesAPI,
    getSupplyQuantityOfAllProvincesAPI,
    clusterAPI,
    getSupplyAbilityAPI,
    getDistributionDataAPI,

    // IMPORT DATA
    insertProvinceAPI,
    insertDistanceAPI,
    insertPandemicAPI,
    insertSupplyTypeAPI,
    insertSupplyMapPandemicAPI,
    insertMedicalSupplyAPI,

    insertInfectionSituationAPI,
    insertRecoveredSituationAPI,
    insertDeathSituationAPI,
    insertLevelAPI,
    insertSupplyQuantityAPI,
    insertSupplyAbilityAPI,
}
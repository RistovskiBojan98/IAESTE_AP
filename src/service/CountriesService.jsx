import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { getCountryDbName } from "../components/global/global_functions";
import { isTokenValid } from "./AuthService";

const COUNTRIES_CACHE_KEY = "countriesData"

export async function fetchDbData() {
    const token = isTokenValid()
    if (token) {
        const storedData = localStorage.getItem(COUNTRIES_CACHE_KEY);
        if (storedData) return JSON.parse(storedData)
    }

    const fetchCountriesData = async () => {
        const querySnapshot = await getDocs(collection(db, "countries"))
        const result = []
        querySnapshot.forEach((doc) => {
            const countryData = doc.data()
            result.push(countryData)
        })
        localStorage.setItem(COUNTRIES_CACHE_KEY, JSON.stringify(result))
        return result
    }

    return fetchCountriesData();
}

export async function fetchCountryData(country) {
    const countries = await fetchDbData()
    const countryDbName = getCountryDbName(country)
    return countries.find(data => data.name === countryDbName)
}
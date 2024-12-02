import { doc, getDoc, getDocs, collection, getFirestore, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getCountryDbName } from "../components/global/global_functions";

const COUNTRIES_CACHE_KEY = "countriesData"

export async function fetchDbData() {
    const storedData = localStorage.getItem(COUNTRIES_CACHE_KEY);

    if (storedData) return JSON.parse(storedData)

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
    return countries.find(data => data.name === country)
}
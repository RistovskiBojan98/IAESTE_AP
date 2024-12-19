import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { getCountryDbName } from "../components/global/global_functions";
import { isTokenValid } from "./AuthService";
import { CountryType } from "../types/Types";

const COUNTRIES_CACHE_KEY = "countriesData"

export async function fetchDbData(): Promise<CountryType[]> {
    const token = isTokenValid()
    if (token) {
        const storedData = localStorage.getItem(COUNTRIES_CACHE_KEY);
        if (storedData) return JSON.parse(storedData)
    }

    const fetchCountriesData = async () => {
        const querySnapshot = await getDocs(collection(db, "countries"))
        const result: CountryType[] = []
        querySnapshot.forEach((doc) => {
            const countryData = doc.data() as CountryType
            result.push(countryData)
        })
        localStorage.setItem(COUNTRIES_CACHE_KEY, JSON.stringify(result))
        return result
    }

    return fetchCountriesData();
}

export async function fetchCountryData(country: string): Promise<CountryType | undefined> {
    const countries = await fetchDbData() as CountryType[]
    const countryDbName = getCountryDbName(country)
    return countries.find(data => data.name === countryDbName)
}
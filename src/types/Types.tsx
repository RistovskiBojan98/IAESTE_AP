export interface CountryType {
    id: number
    name: string
    href: string
    imageSrc: string
    imageAlt: string
    pdf: string
    banner?: string
    socialLinks: SocialLinkType[]
    cities: CityType[]
    committees: string[]
    emergencyContacts: EmergencyContactsType[]
    facts: string[]
    food: OtherType[]
    drinks: OtherType[]
    information: InformationType[]
    summerReception: WeekendType[]
    otherInformation: OtherType[]
    gallery: string[]
    transport: TransportType[]
    region: string
}

export interface CityType {
    name: string
    description: string
}

export interface OtherType {
    title: string
    description: string
}

export interface CuisineType {
    food: OtherType[]
    drinks: OtherType[]
}

export interface EmergencyContactsType {
    [key: string] : string
}

export interface InformationType {
    name: string
    role: string
    icon?: string
    imageUrl?: string
}

export interface WeekendType {
    name: string
    startDate: string
    endDate: string
    location: string
    link: string
    limit: number
    description: string
}

export interface GalleryImageType {
    imageUrl: string
    isDefault?: boolean
}

export interface TransportFeature {
    name: string
    link?: string
}

export interface TransportType {
    id: number
    features: TransportFeature[]
    icon: string
    title: string
}

export interface CardType {
    title: string
    icon: string
    content?: any
    isSectionEmpty?: boolean
}

export interface SocialLinkType {
    name: string
    icon?: string
    value: string
}

export interface CountryComponent {
    country: CountryType
    ref?: React.RefObject<HTMLDivElement>
}

export interface SummerReceptionWeekend {
    country: string
    location: string
    limit: number
    startDate: Date
    endDate: Date
    start: string
    end: string
    title: string
    date: string
    name: string
    description: string
    link: string
}

export interface FilterType {
    [key: string]: string
}
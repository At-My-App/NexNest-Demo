import type { AtMyAppClient, AmaImageDef} from "@atmyapp/core"
import { F } from "@atmyapp/core/dist/client/collections"
import type { AmaCollectionDef } from "@atmyapp/core/dist/definitions/AmaCollection"

type Property = {
    name: string
    image: AmaImageDef<any, {}>
    price: number
    location: string
    bedrooms: number
    bathrooms: number
    size: number
    featured: boolean
}

type ReturnProperty = {
    id: string
    name: string
    image: string
    price: number
    location: string
    bedrooms: number
    bathrooms: number
    size: number
    featured: boolean
}

export type AmaProperties = AmaCollectionDef<'properties', Property, {}>

export type ATMYAPP = [AmaProperties]


export const getProperties = async (client: AtMyAppClient, _?: any): Promise<ReturnProperty[]> => {
    const properties: any = await client.collections.list<AmaProperties>('properties')
    return properties as ReturnProperty[]
}


export const getFeaturedProperties = async (client: AtMyAppClient): Promise<ReturnProperty[]> => {
    const filter = F.eq('featured', true)
    const properties: any = await client.collections.list<AmaProperties>('properties', {filter})
    return properties as ReturnProperty[]
}

export const getPropertyById = async (client: AtMyAppClient, id: string): Promise<ReturnProperty | null> => {
    const property: any = await client.collections.getById<AmaProperties>('properties', id)
    console.log(property)
    return property as ReturnProperty
}

export const getInBudgetProperties = async (client: AtMyAppClient, minPrice: number | undefined, maxPrice: number | undefined): Promise<ReturnProperty[]> => {
   let filter: any;
   const hasMin = typeof minPrice !== 'undefined';
   const hasMax = typeof maxPrice !== 'undefined';
   if (hasMin && hasMax) {
     filter = F.and(F.gte('price', minPrice as number), F.lte('price', maxPrice as number));
   } else if (hasMin) {
     filter = F.gte('price', minPrice as number);
   } else if (hasMax) {
     filter = F.lte('price', maxPrice as number);
   }
   const properties: any = filter
     ? await client.collections.list<AmaProperties>('properties', { filter })
     : await client.collections.list<AmaProperties>('properties');
   return properties as ReturnProperty[]
}
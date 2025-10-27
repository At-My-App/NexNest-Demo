import type { AmaContentDef, AtMyAppClient } from "@atmyapp/core"

export type HeroStats = {
    listedProperties: number
    happyCustomers: number
    awards: number
}

type HeroStatsContent = AmaContentDef<'hero.json', HeroStats>

export type ATMYAPP = [HeroStatsContent]

export const getHero = async (client: AtMyAppClient) => {
    const hero = await client.storage.get<HeroStatsContent>("hero.json", "content")
    console.log(hero)
    return hero.data
}

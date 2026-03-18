export const getNamePoke = async (name: string) => {



};


/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "@/config"
import type { ApiConfig } from "@/services/api/types"
import { PokeItem } from "./types";
import { GeneralApiProblem, getGeneralApiProblem } from "@/services/api/apiProblem";

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
    url: Config.API_URL,
    timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class ApiPoke {
    apisauce: ApisauceInstance
    config: ApiConfig

    constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
        this.config = config
        this.apisauce = create({
            baseURL: this.config.url,
            timeout: this.config.timeout,
            headers: {
                Accept: "application/json",
            },
        })
    }

    async getPokeName(namePoke: string): Promise<{ kind: "ok"; episodes: PokeItem } | GeneralApiProblem> {
        // make the api call
        const response: ApiResponse<PokeItem> = await this.apisauce.get(
            `https://pokeapi.co/api/v2/pokemon/ditto`,
        )
        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }

        // transform the data into the format we are expecting
        try {
            const rawData = response.data
            // This is where we transform the data into the shape we expect for our model.
            const episodes: PokeItem = {
                id: rawData?.id ?? 0,
                name: rawData?.name ?? "teste do nome",
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${rawData?.name}.png`,
            }



            return { kind: "ok", episodes }
        } catch (e) {
            if (__DEV__ && e instanceof Error) {
                console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
            }
            return { kind: "bad-data" }
        }
    }
}

// Singleton instance of the API for convenience
export const apiPoke = new ApiPoke()
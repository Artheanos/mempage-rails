import { apiRoot } from "../api/routesBuilder";

export const jsonFetch = (path: string): any => fetch(`${apiRoot}/${path}`).then(res => res.json())
